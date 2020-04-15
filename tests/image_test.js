
'use strict';
process.env.NODE_ENV = 'test';
let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;

var dataStoreLib = require('./utils/dataStore');
var config = require('./utils/config');
let mocha = require('mocha');
chai.use(chaiHttp);

let dataStore = new dataStoreLib('./tests/data/image.json');
let imageId;


describe('Image Test Cases', () => {

    describe('/POST image', () => {
        it('it should create a image', (done) => {
            var data = dataStore.getEntity('saveImage');
            data.name = data.name + Date.now()
            chai.request(config.server)
                .post('/image')
                .send(data)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('_id')
                    imageId = res.body._id.toString()
                    done();
                });
        });
    });

    describe('/DELETE image', () => {
        it('it should delete a image', (done) => {
            chai.request(config.server)
                .delete('/image/' + imageId)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    done();
                });
        });

    });

});