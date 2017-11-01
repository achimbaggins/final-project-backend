const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const app = require('../app.js')

chai.use(chaiHttp)

let id = null

describe('TESTING (CREATE, READ, UPDATE, DELETE) BUS DATA: ', () => {
  it('post bus data', function (done) {
    chai.request(app)
    .post('/bus')
    .send({
      name: 'testing bus name',
      bus_code: 'testing bus code'
    })
    .end((err,res) => {
      res.status.should.equal(200)
      res.body.name.should.equal('testing bus name')
      res.body.bus_code.should.equal('testing bus code')
      res.body.should.have.property('_id')
      res.body.should.have.property('name')
      res.body.should.have.property('bus_code')
      res.body.should.have.property('destination')
      res.body._id.should.be.a('String')
      res.body.name.should.be.a('String')
      res.body.bus_code.should.be.a('String')
      id = res.body._id
      done()
    })
  })

  it('get bus data', (done) => {
    chai.request(app)
    .get('/bus')
    .end((err, res) => {
      res.should.have.status(200)
      done()
    })
  })

  it('update bus data', (done) => {
    chai.request(app)
    .put(`/bus/${id}`)
    .send({
      name: 'testing update bus name',
      bus_code: 'testing update bus code'
    })
    .end((err,res) => {
      res.status.should.equal(200)
      // res.body.name.should.equal('testing update bus name')
      // res.body.bus_code.should.equal('testing update bus code')
      // res.body.should.have.property('_id')
      // res.body.should.have.property('name')
      // res.body.should.have.property('bus_code')
      // res.body.should.have.property('destination')
      // res.body._id.should.be.a('String')
      // res.body.name.should.be.a('String')
      // res.body.bus_code.should.be.a('String')
      // id = res.body._id
      done()
    })
  })

  it('delete bus data', (done) => {
    chai.request(app)
    .delete(`/bus/${id}`)
    .end((err,res) => {
      // console.log('===============', res);
      // console.log('=============== err! ', err);
      res.status.should.equal(200)
      res.should.not.have.property('_id')
      res.should.not.have.property('name')
      res.should.not.have.property('bus_code')
      res.should.not.have.property('destination')
      done()
    })
  })

})
