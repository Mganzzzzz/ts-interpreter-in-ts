
install-be:
	npm install --registry=https://registry.npm.taobao.org
build-be:
	npm run build:prod

install-fe:
	cd fe-utility-tools && npm install --registry=https://registry.npm.taobao.org
build-fe:
	cd fe-utility-tools && npm run build

build:
	make install-be
	make build-be
	make install-fe
	make build-fe
	tar czf dist.tar.gz  dist node_modules package.json public
