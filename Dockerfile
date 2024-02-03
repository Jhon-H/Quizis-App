FROM node:18-alpine3.19 AS base

# RUN mkdir -p /home/app

ENV DIR /proyect

WORKDIR $DIR

# ----------------------------------------------------------------------------------------

FROM base AS dev

ENV NODE_ENV=development

COPY package*.json $DIR
COPY yarn.lock $DIR

RUN yarn install

COPY tsconfig*.json $DIR
COPY src $DIR/src
COPY .env $DIR

EXPOSE $PORT

CMD ["yarn", "run", "dev"]


# ----------------------------------------------------------------------------------------

FROM base AS build

# Fix signals errors
RUN apk update && apk add --no-cache dumb-init

COPY package*.json $DIR
COPY yarn.lock $DIR

# Similar to npm ci, yarn install --frozen-lockfile ensures that the yarn.lock file is strictly respected during installation.
RUN yarn install --frozen-lockfile 

COPY tsconfig*.json $DIR
COPY src $DIR/src
COPY .env $DIR

RUN yarn build

# Similar to npm prune --production, remove devDependencies
RUN yarn install --production --ignore-scripts --prefer-offline --frozen-lockfile

# ----------------------------------------------------------------------------------------

FROM base AS production

ENV USER node

COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
COPY --from=build $DIR/node_modules $DIR/node_modules
COPY --from=build $DIR/dist $DIR/dist
COPY --from=build $DIR/.env $DIR/.env

ENV NODE_ENV=production

EXPOSE $PORT

# More optimized that npm run start
CMD ["dumb-init", "node", "dist/app.js"]
