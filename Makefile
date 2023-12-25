build:
	npm run build

install:
	npm ci

lint:
	npx eslint --ext js,jsx --no-eslintrc --config .eslintrc.yml .

start:
	npm start