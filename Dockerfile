FROM node:alpine

# make a directory for the application, otherwise files will be copied to the root folder
RUN mkdir -p /var/opt/image-album-microservice-node
WORKDIR /var/opt/image-album-microservice-node

COPY package.json package.json
RUN npm install --production --quiet

COPY . .

ENV PORT 8000
EXPOSE 8000

CMD ["npm", "start", "-s"]
