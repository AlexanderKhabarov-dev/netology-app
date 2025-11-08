FROM node:22.14.0-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
ENV PATH /app/node_modules/.bin:$PATH
COPY . .
RUN vite build
EXPOSE 3000
CMD ["node", "dist/index.js"]