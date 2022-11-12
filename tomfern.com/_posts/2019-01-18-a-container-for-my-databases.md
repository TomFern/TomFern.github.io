---
title: A Container for My Databases
date: "2019-01-18T17:59:00-03:00"
permalink: "/post/a-container-for-my-dbs"
layout: "post"
tags: docker mysql databases benchmarks
description: "Benchmarking databases and containers."
image: /images/database.jpg
---

![](/images/database.jpg)

Who doesn't like containers? Anyone doesn't like to have most of the benefits of virtual machines with much, much less overhead?

They've been around since forever (anyone still remember chroot?)
but only in recent years their popularity boomed, mainly due to cloud computing, I'm sure.

I've been running databases in docker for a while now. I was curious about other alternatives, so I did a bit of benchmarking.


## Docker

It's not a coincidence that Docker appeared around the same time container technology began its popularity rise.

It's main selling point is its easy of use and an enormous ecosystem of ready to use images.


## rkt

rkt is an interesting alternative to Docker. rkt has the same features and can even download and run Docker images.

rkt takes security-minded approach to containers. It supports signed images, a feature sorely needed in Docker.


## LXC

LXC (linux containers) is the technology that was originally behind docker.

LXC just runs containers, that's it. We can regain some of Docker-like features if we mix in some additional
components like LXD (hypervisor and management) and LXCFS (an overlay filesystem).
For snapshots we can use LVM or an snapshot-capable filesystem.


## systemd-spawn

systemd-nspawn is "chroot on steroids".
A much simpler tool, it doesn't provide any form of image management. It requires a more DIY approach, we need to set up everything by ourselves.

nspawn, unlike chroot, does provide a network virtualization and it's capable of fully booting a linux container.

It's a lightweight alternative worth considering if your linux distribution uses systemd.


## Benchmarks

The databases tested are MariaDB 10.3.12 and Postgres 11.1.

I'm using [sysbench](./sysbench-guide-2)'s OLTP read+write test, using 1 and 10 threads.
I've run each test 3 times, 20 minutes each test. The graph consists of the max, median and min _average_ TPS values.


### Single thread

![MariaDB 1 Thread](/media/plots/a-container-for-my-dbs/mariadb-rw-1.png)
![PostgreSQL - 1 thread](/media/plots/a-container-for-my-dbs/postgres-rw-1.png)

I was surprised that docker did so well, I wouldn't have been shocked if it were the worst, but it performed best.


### 10 Threads

How does performance change with a higher thread count?

![MariaDB - 10 threads](/media/plots/a-container-for-my-dbs/mariadb-rw-10.png)
![PostgreSQL - 10 threads](/media/plots/a-container-for-my-dbs/postgres-rw-10.png)

A higher load tends to even out things. Docker suffers a bit more with MariaDB.
All in all it doesn't look like there is much of a speed difference between container types.


## Related links

-   benchmark data:  <https://github.com/TomFern/benchmark-data/tree/master/a-container-for-my-dbs>
-   docker: <https://docs.docker.com/>
-   lxc: <https://linuxcontainers.org/>
-   rkt: <https://coreos.com/rkt/>
-   systemd-nspawn: <https://wiki.archlinux.org/index.php/systemd-nspawn>


## That's it

Hope you enjoyed this post. It was fun for me playing around with containers.

Given that there is not a clear winner yet, I think I'll stick with Docker for now.

Have a good one.

Tomas
