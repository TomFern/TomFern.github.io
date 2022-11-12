
serve:
	(cd tomfern.com && bundler exec jekyll serve)

build:
	(cd tomfern.com && bundler exec jekyll build)
	mv tomfern.com/_site docs

install:
	(cd tomfern.com && bundler install)

update:
	(cd tomfern.com && bundler update)
