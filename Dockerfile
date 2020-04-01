FROM node-13.10

WORKDIR /app
COPY package.json /app/package.json
RUN npm install
COPY . /app
RUN npm run build