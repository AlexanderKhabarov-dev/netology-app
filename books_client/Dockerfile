FROM node:22.14.0-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
ENV PATH /app/node_modules/.bin:$PATH
COPY . .
RUN rm -rf dist
RUN vite build
EXPOSE 3001

CMD ["serve", "-s", "dist", "-l", "3001"]