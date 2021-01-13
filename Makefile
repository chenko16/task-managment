DOCKER_COMPOSE=docker-compose
MAVEN=mvn
NPM=npm
NPM_BUILD_ENV=production
PSQL_DATA_PATH=data/postgres

JAVA_SRC := $(shell find backend/src -type f -print)

backend/target/task_management-1.0.jar: backend/pom.xml $(JAVA_SRC)
	cd backend && $(MAVEN) package


UI_SRC := $(shell find ui/src -type f -print)
NPM_CONF := $(shell find ui -maxdepth 1 -name package*.json -print)

ui/dist: $(NPM_CONF) ui/tsconfig.json ui/webpack.config-release.js $(UI_SRC)
	cd ui && npm install && NODE_ENV=$(NPM_BUILD_ENV) $(NPM) run build

docker:
	cd deploy && $(DOCKER_COMPOSE) build

mkdirs:
	mkdir -p $(PSQL_DATA_PATH)

build: ui/dist backend/target/task_management-1.0.jar docker

run: build mkdirs
	export APP_POSTGRES_DIR=$(shell realpath $(PSQL_DATA_PATH)) && cd deploy && $(DOCKER_COMPOSE) up -d

stop:
	cd deploy && $(DOCKER_COMPOSE) stop

logs:
	cd deploy && $(DOCKER_COMPOSE) logs

pg-logs:
	docker exec -it deploy_appbackend_1 cat /var/log/postgresql/postgresql-13-main.log
