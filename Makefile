fetch-theme:
	git submodule init
	git submodule foreach git fetch
	git submodule update

clean:
	rm -rf public/

build:
	HUGO_ENV=production hugo --minify

deploy:
	#git clone 
	cp -r public/ /Users/tom/r/TomFern.github.io
