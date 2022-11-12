---
title: "Always use ImagePullSecrets"
date: "2020-11-14T07:00:00-03:00"
permalink: "/post/always-use-imagepullsecrets"

tags: kubernetes docker
description: "Kubernetes users: don't get bitten by rate limits."
image: /images/speed-limit.jpg
---

![Speed Limit](/images/speed-limit.jpg)

Docker Hub [introduced rate limits](https://www.docker.com/increase-rate-limits) for image pulls earlier this month. Being the default registry for Docker images, this is one of the biggest in the ecosystem in the last few years, and it will affect not only Docker users but also Kubernetes setups.

## The limits

The new limits affect free users. No more unlimited free pulls, the party is over.

- **Anonymous free users**: 100 container pulls every 6 hours.
- **Authenticated free users**: 200 container pulls every 6 hours.
- **Paid accounts**: unlimited.

At first, 100 pulls may sound like a lot. But think what happens when you start a Kubernetes deployment. Each pod pulls independently: if you spin up a ReplicaSet with 100 replicas, that's 100 pulls at once.

The same thing happens when we're doing a rolling update, a rollback, a canary release, or a blue-green deployment. As pods keep spawning, the chance of hitting the limit increases, and we face the most annoying of problems: random, unexpected, avoidable failures.

## What to do?

What can you do? To see if you're affected, check if you're pulling images from Docker Hub with the following command:

```bash
kubectl get pods --all-namespaces -ojson | jq -r '.items[].spec | .containers[] // [] += .initContainers[] // [] | .image' | sort -u
```

If you see images with no registry (just the image name) or where the registry is `docker.io`, you're pulling from Docker Hub, so keep reading.

Next, check if you're using authentication. All images should be pulled with authentication. Anonymous pulls are rate limited by IP. Even if you don't need a lot of pulls, you may still be affected by other users sharing the network.

The bright side is that adding authentication is really easy. It only takes two steps. Here's how to do it.

### Step 1: tell Kubernetes how to authenticate

The first step is to add your Docker Hub username and password to the cluster. We can do this with kubectl. You only have to do this once per cluster.

```bash
$ kubectl create secret docker-registry my-dockerhub-account \
    --docker-server=docker.io \
    --docker-username=DOCKER_HUB_USERNAME \
    --docker-password=DOCKER_HUB_PASSWORD
```

### Step 2: add ImagePullSecrets in the deployment

Once the secret is safely stored in Kubernetes, we only need to mention it on the deployment manifest. For this, add `imagePullSecrets` in the `spec.template.spec` tree:

```yaml
      imagePullSecrets:
      - name: my-dockerhub-account
```

For example, if I want to run a deployment with three [nginx](https://www.nginx.com/) pods, the end result would be:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      imagePullSecrets:
      - name: my-dockerhub-secret
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80
```

That's all you need. When you have the chance, `kubectl apply` the new manifest to start using authentication.

## Better safe than sorry

I hope this helps you to prevent avoidable errors. Once authenticated, you should have a more consistent experience and a higher limit. 

I've not heard of anyone hitting the limit yet. Docker Hub said they'll enforce them gradually, so I'm sure it's a matter of time until someone gets bitten by the new caps.