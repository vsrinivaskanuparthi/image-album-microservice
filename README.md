# image-album-microservice
sample image album node.js microservice

# how to run server in local machine ?

1. Machine should have Node.js Installed.

2. Enter into project location run command   # npm install #

3. after npm installing run command    # npm start #

4. the server will come to running state on localhost on PORT 8080




# swagger documentation of microservice endpoints

1. open http://localhost:/docs to read more about swagger documentation




# docker file information

# there is alreday written docker file.

# steps to run application in docker container

 1. docker build -t image-album-microservice:tag .

 2. docker run -d -p 8080:8080 image-album-microservice

