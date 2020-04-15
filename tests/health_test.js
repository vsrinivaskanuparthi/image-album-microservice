
'use strict';
process.env.NODE_ENV = 'test';
let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;

var config = require('./utils/config');
chai.use(chaiHttp);


describe('Helath', () => {


    describe('/Health Check Microservice', () => {
        it('it should health check of micro service', (done) => {
            chai.request(config.server)
                .get('/health')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('status')
                    done();
                });
        });

    });

});