const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp)

let id = null

describe('testing bus database', () => {
  it('post bus data', function (done) {
    chai.request('http://localhost:3000')
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
      res.body._id.should.be.a('String')
      res.body.name.should.be.a('String')
      res.body.bus_code.should.be.a('String')
      id = res.body._id
      done()
    })
  })

  it('get bus data', function (done) => {
    chai.request('http://localhost:3000')
    .get('/bus')
    .end((err, res) => {
      res.should.have.status(200)
      done()
    })
  })
})
