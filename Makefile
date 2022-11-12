
serve:
	(cd src && bundler exec jekyll serve)

build:
	rm -rf docs
	(cd src && bundler exec jekyll build)
	cp CNAME docs

install:
	(cd src && bundler install)

update:
	(cd src && bundler update)
