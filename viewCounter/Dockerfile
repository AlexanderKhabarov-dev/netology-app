FROM node:22.14.0-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
VOLUME ["/app"]
EXPOSE 4000
CMD ["node", "counter.js"]
