FROM node:12-alpine as buildContainer
WORKDIR /app
COPY ./package.json ./package-lock.json /app/
RUN npm install
COPY . /app
RUN npm run build:ssr
EXPOSE 4000
CMD ["npm", "run", "serve:ssr"]
