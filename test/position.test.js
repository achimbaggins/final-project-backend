const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const app = require('../app.js')
const Bus = require('../models/Bus')
const Station = require('../models/Station')

chai.use(chaiHttp)

var newStation = {
  lat: '0',
  lng: '0',
  stationName: 'dummy_station',
  imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Harmoni_Central_Busway_Transjakarta_1.JPG',
  description: 'dummy_station description bla bla bla'
}

var newBus = {
  name: 'testing bus name',
  bus_code: 'testing bus code'
}

let id = null

describe('TESTING (CREATE, READ, UPDATE, DELETE) POSITION DATA: ', () => {

  let bus_id = null
  let station_id = null

  beforeEach(done => {
    Bus.create(newBus)
    .then(response => {
      bus_id = response._id

      Station.create(newStation)
      .then(response => {
        station_id = response._id
        done()
      })
      .catch(err => console.log(err))

    })
    .catch(err => console.log(err))
  })

  afterEach(done => {
    Bus.remove({
      _id: bus_id
    })
    .then(response => {

      Station.remove({
        _id: station_id
      })
      .then(response => done())
      .catch(err => console.log(err))

    })
    .catch(err => console.log(err))
  })

  it('post position data', function (done) {
    chai.request(app)
    .post('/position')
    .send({
      bus_id: bus_id,
      station_id: station_id
    })
    .end((err,res) => {
      res.status.should.equal(200)
      res.body.should.have.property('_id')
      res.body.should.have.property('bus_id')
      res.body.should.have.property('station_id')
      res.body._id.should.be.a('String')
      res.body.bus_id.should.be.a('array')
      res.body.station_id.should.be.a('array')
      id = res.body._id
      done()
    })
  })

  it('get bus data', (done) => {
    chai.request(app)
    .get('/position')
    .end((err, res) => {
      res.should.have.status(200)
      done()
    })
  })


  // it('delete bus data', (done) => {
  //   chai.request(app)
  //   .delete(`/position/${id}`)
  //   .end((err,res) => {
  //     res.should.have.status(200)
  //     res.should.not.have.property('_id')
  //     res.should.not.have.property('bus_id')
  //     res.should.not.have.property('station_id')
  //   })
  // })

})
