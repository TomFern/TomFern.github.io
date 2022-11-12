# tomfern.com Blog

## Posting

1. Add your post to tomfern.com/_posts
2. `make build`
3. Push changes

### Info

This repository was initialized with:

```bash
$ docker run --rm --platform linux/amd64 \
  --volume="$PWD:/srv/jekyll" \
  -it jekyll/jekyll \
  sh -c "chown -R jekyll /usr/gem/ && jekyll new tomfern.com" \
  && cd tomfern.com
```
