const chai = require('chai')
const should = chai.should()
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../app.js')
const Station = require('../models/Station')

chai.use(chaiHttp)

var newStation = {
  coordinate: [0,0],
  stationName: 'dummy_station',
  imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Harmoni_Central_Busway_Transjakarta_1.JPG',
  description: 'dummy_station description bla bla bla'
}

describe ('CREATE NEW STATION: ', () => {

  afterEach(done => {
    Station.remove()
    .then(response => done())
    .catch(err => console.log(err))
  })

  it ('should return response status = 200', (done) => {
    chai.request(app)
    .post('/stations')
    .send(newStation)
    .end((err, response) => {
      response.status.should.equal(200)
      done()
    })
  })

  it ('should return response.body.data as an "object"', (done) => {
    chai.request(app)
    .post('/stations')
    .send(newStation)
    .end((err, response) => {
      response.body.data.should.be.an('object')
      done()
    })
  })

  it ('should return response.body.data.coordinate = "[0,0]"', (done) => {
    chai.request(app)
    .post('/stations')
    .send(newStation)
    .end((err, response) => {
      response.body.data.coordinate.should.equal('testing title')
      done()
    })
  })

  it ('should return response.body.data.stationName = "dummy_station"', (done) => {
    chai.request(app)
    .post('/stations')
    .send(newStation)
    .end((err, response) => {
      response.body.data.stationName.should.equal('dummy_station')
      done()
    })
  })

  it ('should return response.body.data.imageUrl = "https://upload.wikimedia.org/wikipedia/commons/0/03/Harmoni_Central_Busway_Transjakarta_1.JPG"', (done) => {
    chai.request(app)
    .post('/stations')
    .send(newStation)
    .end((err, response) => {
      response.body.data.imageUrl.should.equal('https://upload.wikimedia.org/wikipedia/commons/0/03/Harmoni_Central_Busway_Transjakarta_1.JPG')
      done()
    })
  })

  it ('should return response.body.data.description = "dummy_station description bla bla bla"', (done) => {
    chai.request(app)
    .post('/stations')
    .send(newStation)
    .end((err, response) => {
      response.body.data.description.should.equal('dummy_station description bla bla bla')
      done()
    })
  })

  it('should return response.body.errors.coordinate.message = "Path `coordinate` is required."', done => {
    delete newStation.coordinate
    chai.request(app)
    .post('/stations')
    .send(newStation)
    .end((err, response) => {
      response.body.errors.coordinate.message.should.equal('Path `coordinate` is required.')
      done()
    })
  })

  it('should return response.body.errors.stationName.message = "Path `stationName` is required."', done => {
    delete newStation.stationName
    chai.request(app)
    .post('/stations')
    .send(newStation)
    .end((err, response) => {
      response.body.errors.stationName.message.should.equal('Path `stationName` is required.')
      done()
    })
  })

  it('should return response.body.errors.imageUrl.message = "Path `imageUrl` is required."', done => {
    delete newStation.imageUrl
    chai.request(app)
    .post('/stations')
    .send(newStation)
    .end((err, response) => {
      response.body.errors.imageUrl.message.should.equal('Path `imageUrl` is required.')
      done()
    })
  })

  it('should return response.body.errors.description.message = "Path `description` is required."', done => {
    delete newStation.description
    chai.request(app)
    .post('/stations')
    .send(newStation)
    .end((err, response) => {
      response.body.errors.description.message.should.equal('Path `description` is required.')
      done()
    })
  })

})

var id_station_dummy = null

describe('DELETE STATION: ', () => {

  beforeEach(done => {
    Station.create(newStation)
    .then(response => {
      id_station_dummy = response._id
      done()
    })
    .catch(err => console.log(err))
  })

  it ('should return response status = 200', (done) => {
    chai.request(app)
    .delete(`/stations/${id_station_dummy}`)
    .end((err, response) => {
      response.status.should.equal(200)
      done()
    })
  })

  it ('expect response2.body to not have property "data"', (done) => {
    chai.request(app)
    .delete(`/stations/${id_station_dummy}`)
    .end((err, response) => {

      chai.request(app)
      .get(`/stations/${id_station_dummy}`)
      .end((err2, response2) => {
        expect(response2.body).to.not.have.property('data');
        done()
      })

    })
  })

})
