const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp)

let id = null

describe('testing position database', () => {
  it('post position data', function (done) {
    chai.request('http://localhost:3000')
    .post('/position')
    .end((err,res) => {
      res.status.should.equal(200)
      res.body.should.have.property('_id')
      res.body.should.have.property('bus_id')
      res.body.should.have.property('station_id')
      res.body._id.should.be.a('String')
      res.body.bus_id.should.be.a('String')
      res.body.station_id.should.be.a('String')
      id = res.body._id
      done()
    })
  })

  it('get bus data', (done) => {
    chai.request('http://localhost:3000')
    .get('/position')
    .end((err, res) => {
      res.should.have.status(200)
      done()
    })
  })


  it('delete bus data', (done) => {
    chai.request('http://localhost:3000')
    .delete(`position/${id}`)
    .end((err,res) => {
      res.should.have.status(200)
      res.should.not.have.property('_id')
      res.should.not.have.property('bus_id')
      res.should.not.have.property('station_id')
    })
  })

})
