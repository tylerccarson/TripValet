'use strict';
const request = require('supertest');
const express = require('express');
const expect = require('chai').expect;
const assert = require('chai').assert;
const app = require('../app.js');
const dbUtils = require('../../db/lib/utils.js');
const models = require('../../db/models');
const Promise = require('bluebird');

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
  xit ('should create a trip', (done)=>{
    var body = {
      tripname: 'Family Reunion',
      location: 'San Francisco',
      description: 'Friends and family gathering',
      rangeStart: '2018/07/09',
      rangeEnd: '2018/07/23',
      user_id: 1, 
      invited: ['fake1@fake.com', 'fake2@fake.com', 'fake3@fake.com']

    };
    request(app)
      .post('/trips/create')
      .send(body)
      .expect(201)
      .expect((res)=>{
        console.log(res);
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
        expect(res.body[0].tripname).to.equal('Adam\'s bachelors party');
        expect(res.body[0].description).to.equal('You know the drill. Anything happens in LV, stays in LV');
        expect(res.body[0].location).to.equal('Las Vegas');
        expect(res.body[0].rangeStart).to.equal('2017/10/01');
        expect(res.body[0].rangeEnd).to.equal('2017/10/30');
        expect(res.body[0].user_id).to.equal(1);
      })
      .end(done);
  });
  it ('should fetch all trips by useremail', (done) => {
    request(app)
      .get('/trips/byEmail')
      .send({email: 'example@example.com'})
      .expect(200)
      .expect((res)=>{
        expect(res.body[0].id).to.equal(1);
        expect(res.body[0].tripname).to.equal('Adam\'s bachelors party');
        expect(res.body[0].description).to.equal('You know the drill. Anything happens in LV, stays in LV');
        expect(res.body[0].location).to.equal('Las Vegas');
        expect(res.body[0].rangeStart).to.equal('2017/10/01');
        expect(res.body[0].rangeEnd).to.equal('2017/10/30');
        expect(res.body[0].user_id).to.equal(1);
      })
      .end(done);

  });


});

































