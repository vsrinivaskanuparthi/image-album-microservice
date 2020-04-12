# image-album-microservice
sample image album node.js microservice

# how to run server in local machine ?

1. Machine should have Node.js Installed.

2. Enter into project location run command   # npm install #

3. after npm installing run command    # npm start #

4. the server will come to running start on localhost on PORT 8080


# endpoints of microservice

# 1. http://localhost:8080/helath  (to check status of microservice)

# 2. http://localhost:8080/docs    (swagger documentation) (it will provide you all endpoints with details and     request samples).


# docker file information

there is alreday written docker file.

# steps to run application in docker container

# 1. docker build -t image-album-microservice:tag .

# 2. docker run -d -p 8080:8080 image-album-microservice

