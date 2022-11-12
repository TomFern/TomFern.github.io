# GitHub Page and source for tomfern.com

## Adding content

1. Add your post to src/_posts
2. Test with `make serve`
3. Build with `make build`
4. Push changes

Static site is located in the `/docs` folder.

## Info

This repository was initialized with:

```bash
$ docker run --rm --platform linux/amd64 \
  --volume="$PWD:/srv/jekyll" \
  -it jekyll/jekyll \
  sh -c "chown -R jekyll /usr/gem/ && jekyll new tomfern.com" \
  && cd tomfern.com
```

## LICENSE

MIT License Copyright 2022 Tomas Fernandez
