

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


 # Running RabbitMq and MongDB locally in containers
 
 1. RabbitMQ 

    Command :
    
     docker run -d --hostname my-rabbit --name rabbit13 -p 8080:15672 -p 5672:5672 -p 25676:25676 rabbitmq:3-management

 2. MongoDB

    Command:

     docker run -d -p 27071:27107 mongo

  once the both containers are in running state start the server. and executed the flow.


  # Mocha-Chai Unit Tests

   1. to run test cases individully run command `./node_modules/.bin/mocha tests/testFileName.js`

   2. to run all unit test cases synchronously run command `npm run test`
   
   
   
@ Author

****
# Srinivas Kanuparthi

Portfolio :  http://srinivas-kanuparthi-portfolio.s3-website.us-east-2.amazonaws.com/#/
Linkedin  :  https://www.linkedin.com/in/srinivas-kanuparthi-367a36186

****

