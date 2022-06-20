FROM node:latest
RUN mkdir app
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 5000
CMD [ "npm", "start" ]