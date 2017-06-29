export PATH := $(PATH):node_modules/.bin

SOURCES = \
	$(wildcard src/plonereact/*) \
	webpack.config.js

all: build

build: purge node_modules $(SOURCES)
	yarn run build

watch: purge node_modules $(SOURCES)
	yarn run watch

clean: purge
	$(RM) -r .plone

purge:
	$(RM) -r theme

###

.PHONY: all build watch clean purge

node_modules: package.json
	yarn install
	touch node_modules

