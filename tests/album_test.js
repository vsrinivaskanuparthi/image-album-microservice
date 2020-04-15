
'use strict';
process.env.NODE_ENV = 'test';
let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;

var dataStoreLib = require('./utils/dataStore');
var config = require('./utils/config');
let mocha = require('mocha');
chai.use(chaiHttp);

let dataStore = new dataStoreLib('./tests/data/album.json');
let albumId;


describe('Album Test Cases', () => {

    describe('/POST album', () => {
        it('it should create a album', (done) => {
            var data = dataStore.getEntity('saveAlbum');
            data.name = data.name + Date.now()
            chai.request(config.server)
                .post('/album')
                .send(data)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('_id')
                    albumId = res.body._id.toString()
                    done();
                });
        });
    });

    describe('/GET album images', () => {
        it('it should get all images of album by albumId', (done) => {
            chai.request(config.server)
                .get('/album/images/' + albumId)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });

    describe('/DELETE album', () => {
        it('it should delete a album along with its images', (done) => {
            chai.request(config.server)
                .delete('/album/' + albumId)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    done();
                });
        });

    });

});