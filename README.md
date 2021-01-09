# task-managment

## build:
```bash
# build frond
cd ui
NODE_ENV=production npm run build

# build back
cd ../backend
mvn package
```

## deploy:

```bash
cd deploy
APP_POSTGRES_DIR=/path/to/postgres/data docker-compose up -d
```
