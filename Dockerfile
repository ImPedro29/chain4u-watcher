FROM node:18
WORKDIR /app
COPY . .
RUN yarn
RUN yarn build
RUN rm -rf ./node_modules
RUN yarn --production
CMD yarn prod
