docker compose -f ./docker-compose.dev.yml cp ./src/ code_runner-service:/usr/src/app && `
docker compose -f ./docker-compose.dev.yml exec code_runner-service npm run start:ts
