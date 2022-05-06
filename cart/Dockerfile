FROM node:16-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install --silent
COPY . .

CMD ["node","-r","@splunk/otel/instrument","index.js"]