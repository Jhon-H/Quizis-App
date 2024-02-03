FROM node:18

RUN mkdir -p /home/app

COPY . /home/app

EXPOSE 3000

WORKDIR /home/app

CMD ["yarn", "run", "start"]
