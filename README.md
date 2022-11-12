# GitHub Page and source for tomfern.com

Source is located at `/src`
Published site located at `/docs`

## Adding content

1. Add your post to src/_posts
2. Test with `make serve`
3. Build with `make build`
4. Push changes

Static site is located in the `/docs` folder.

Adding Gems:
1. Add gem to Gemfile
2. `make install`
3. Keep gems updated with `make update`

## Folder structure

Theme: https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/

- `data`: contains top bar navigation
- `_drafts`: are ignored on build but shown on local
- `_pages`: contain about, tags, and 404 pages
- `_posts`: are where the Markdown posts sources are
- `images`: the images to be referenced as `![](/images/mountains.jpg)`
- `_config.yml`: main config file
- `index.html`: homepage


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
