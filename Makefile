
serve:
	(cd src && bundler exec jekyll serve)

build:
	rm -rf docs
	(cd src && bundler exec jekyll build)
	mv src/_site docs
	cp CNAME docs

install:
	(cd src && bundler install)

update:
	(cd src && bundler update)
