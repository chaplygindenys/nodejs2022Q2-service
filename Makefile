run:
	docker run -d -p  100:2000 --env-file ./.env -v ts:/app/src --rm --name  rest rest:volumes
run-dev:
	docker run -d -p  100:2000 --env-file ./.env -v "/home/chaplygindenys/1/RS-School/node22/5Task/nodejs2022Q2-service:/app" -v /app/node_modules --rm --name  rest rest:volumes
stop:
	docker stop rest