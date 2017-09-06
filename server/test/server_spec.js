'use strict';
const request = require('supertest');
const express = require('express');
const expect = require('chai').expect;
const assert = require('chai').assert;
const app = require('../app.js');
const dbUtils = require('../../db/lib/utils.js');
const models = require('../../db/models');

describe('server', function() {
  beforeEach(function (done) {
    dbUtils.rollbackMigrate(done);
  });

  // Resets database back to original settings
  afterEach(function (done) {
    dbUtils.rollback(done);
  });

  it('sends back hello world', function(done) {
    request(app)
      .get('/api')
      .expect(200)
      .expect(function(res) {
        expect(res.text).to.equal('Hello World!');
      })
      .end(done);
  });

  it('accepts POST request', function(done) {
    request(app)
      .post('/api')
      .expect(201)
      .expect(function(res) {
        expect(res.body.data).to.equal('Posted!');
      })
      .end(done);
  });
});

describe('trip route', () => {
  beforeEach(function (done) {
    dbUtils.rollbackMigrate(done);
  });

  // Resets database back to original settings
  afterEach(function (done) {
    dbUtils.rollback(done);
  });
  it ('should create a trip', (done)=>{
    var body = {
      tripname: 'Family Reunion',
      location: 'San Francisco',
      description: 'Friends and family gathering',
      rangeStart: '20180709',
      rangeEnd: '20180723',
      user_id: 1

    };
    request(app)
      .post('/trips/create')
      .send(body)
      .expect(201)
      .expect((res)=>{
        expect(res.body.id).to.equal(2);
        expect(res.body.tripname).to.equal(body.tripname);
        expect(res.body.description).to.equal(body.description);
        expect(res.body.location).to.equal(body.location);
        expect(res.body.rangeStart).to.equal(body.rangeStart);
        expect(res.body.rangeEnd).to.equal(body.rangeEnd);
        expect(res.body.user_id).to.equal(body.user_id);
      })
      .end(done);
    
  });

  it ('should fetch all trips data', (done)=>{
    request(app)
      .get('/trips/allTrips')
      .expect(200)
      .expect((res)=>{
        expect(res.body).to.be.an('array');
        expect(res.body[0].id).to.equal(1);
        expect(res.body[0].tripname).to.equal(`Adam's bachelors party`);
        expect(res.body[0].description).to.equal('You know the drill. Anything happens in LV, stays in LV');
        expect(res.body[0].location).to.equal('Las Vegas');
        expect(res.body[0].rangeStart).to.equal('20171001');
        expect(res.body[0].rangeEnd).to.equal('20171021');
        expect(res.body[0].user_id).to.equal(1);
      })
      .end(done);
  });
  it ('should fetch all trips by useremail', (done) => {
    request(app)
      .get('/trips/byEmail')
      .send({email:'example@example.com'})
      .expect(200)
      .expect((res)=>{
        expect(res.body[0].id).to.equal(1);
        expect(res.body[0].tripname).to.equal(`Adam's bachelors party`);
        expect(res.body[0].description).to.equal('You know the drill. Anything happens in LV, stays in LV');
        expect(res.body[0].location).to.equal('Las Vegas');
        expect(res.body[0].rangeStart).to.equal('20171001');
        expect(res.body[0].rangeEnd).to.equal('20171021');
        expect(res.body[0].user_id).to.equal(1);
      })
      .end(done);

  });


});

































