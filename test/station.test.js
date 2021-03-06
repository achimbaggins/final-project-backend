const chai = require('chai')
const should = chai.should()
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../app.js')
const Station = require('../models/Station')

chai.use(chaiHttp)

var newStation = {
  lat: '0',
  lng: '0',
  stationName: 'dummy_station',
  imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Harmoni_Central_Busway_Transjakarta_1.JPG',
  description: 'dummy_station description bla bla bla'
}

var newStation2 = {
  lat: '0',
  lng: '0',
  stationName: 'dummy_station_2',
  imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Harmoni_Central_Busway_Transjakarta_2.JPG',
  description: 'dummy_station_2 description bla bla bla'
}

describe ('TESTING CREATE STATION DATA: ', () => {

  afterEach(done => {
    Station.remove({
      _id: newStation._id
    })
    .then(response => done())
    .catch(err => console.log(err))
  })

  it ('should return response status = 200', (done) => {
    chai.request(app)
    .post('/stations')
    .send(newStation)
    .end((err, response) => {
      newStation._id = response.body._id
      response.status.should.equal(200)
      done()
    })
  })

  it ('should return response.body as an "object"', (done) => {
    chai.request(app)
    .post('/stations')
    .send(newStation)
    .end((err, response) => {
      newStation._id = response.body._id
      response.body.should.be.an('object')
      done()
    })
  })

  it (`should return response.body.lat = "${newStation.lat}"`, (done) => {
    chai.request(app)
    .post('/stations')
    .send(newStation)
    .end((err, response) => {
      newStation._id = response.body._id
      response.body.lat.should.equal(newStation.lat)
      done()
    })
  })

  it (`should return response.body.lat = "${newStation.lng}"`, (done) => {
    chai.request(app)
    .post('/stations')
    .send(newStation)
    .end((err, response) => {
      newStation._id = response.body._id
      response.body.lng.should.equal(newStation.lng)
      done()
    })
  })

  it (`should return response.body.stationName = ${newStation.stationName}`, (done) => {
    chai.request(app)
    .post('/stations')
    .send(newStation)
    .end((err, response) => {
      newStation._id = response.body._id
      response.body.stationName.should.equal(newStation.stationName)
      done()
    })
  })

  it (`should return response.body.imageUrl = "${newStation.imageUrl}"`, (done) => {
    chai.request(app)
    .post('/stations')
    .send(newStation)
    .end((err, response) => {
      newStation._id = response.body._id
      response.body.imageUrl.should.equal(newStation.imageUrl)
      done()
    })
  })

  it (`should return response.body.description = "${newStation.description}"`, (done) => {
    chai.request(app)
    .post('/stations')
    .send(newStation)
    .end((err, response) => {
      newStation._id = response.body._id
      response.body.description.should.equal(newStation.description)
      done()
    })
  })

  // it('should return response.body.errors.coordinate.message = "Path `coordinate` is required."', done => {
  //   delete newStation.coordinate
  //   chai.request(app)
  //   .post('/stations')
  //   .send(newStation)
  //   .end((err, response) => {
  //     newStation._id = response.body._id
  //     response.body.errors.coordinate.message.should.equal('Path `coordinate` is required.')
  //     done()
  //   })
  // })
  //
  // it('should return error message = "Path `stationName` is required."', done => {
  //   delete newStation.stationName
  //   chai.request(app)
  //   .post('/stations')
  //   .send(newStation)
  //   .end((err, response) => {
  //     console.log('==================== ', response);
  //     // console.log('==================== ERR: ', err);
  //     response.error.stationName.message.should.equal('Path `stationName` is required.')
  //     done()
  //   })
  // })
  //
  // it('should return response.body.errors.imageUrl.message = "Path `imageUrl` is required."', done => {
  //   delete newStation.imageUrl
  //   chai.request(app)
  //   .post('/stations')
  //   .send(newStation)
  //   .end((err, response) => {
  //     response.body.errors.imageUrl.message.should.equal('Path `imageUrl` is required.')
  //     done()
  //   })
  // })
  //
  // it('should return response.body.errors.description.message = "Path `description` is required."', done => {
  //   delete newStation.description
  //   chai.request(app)
  //   .post('/stations')
  //   .send(newStation)
  //   .end((err, response) => {
  //     response.body.errors.description.message.should.equal('Path `description` is required.')
  //     done()
  //   })
  // })

})






describe('TESTING DELETE STATION DATA: ', () => {

  beforeEach(done => {
    Station.create(newStation)
    .then(response => {
      newStation._id = response._id
      done()
    })
    .catch(err => console.log(err))
  })

  it ('should return response status = 200', (done) => {
    chai.request(app)
    .delete(`/stations/${newStation._id}`)
    .end((err, response) => {
      response.status.should.equal(200)
      done()
    })
  })

  it ('expect response2.body to not have property "lat"', (done) => {
    chai.request(app)
    .delete(`/stations/${newStation._id}`)
    .end((err, response) => {

      chai.request(app)
      .get(`/stations/${newStation._id}`)
      .end((err2, response2) => {
        expect(response2.body).to.not.have.property('lat');
        done()
      })

    })
  })

  it ('expect response2.body to not have property "lng"', (done) => {
    chai.request(app)
    .delete(`/stations/${newStation._id}`)
    .end((err, response) => {

      chai.request(app)
      .get(`/stations/${newStation._id}`)
      .end((err2, response2) => {
        expect(response2.body).to.not.have.property('lng');
        done()
      })

    })
  })

  it ('expect response2.body to not have property "stationName"', (done) => {
    chai.request(app)
    .delete(`/stations/${newStation._id}`)
    .end((err, response) => {

      chai.request(app)
      .get(`/stations/${newStation._id}`)
      .end((err2, response2) => {
        expect(response2.body).to.not.have.property('stationName');
        done()
      })

    })
  })

  it ('expect response2.body to not have property "imageUrl"', (done) => {
    chai.request(app)
    .delete(`/stations/${newStation._id}`)
    .end((err, response) => {

      chai.request(app)
      .get(`/stations/${newStation._id}`)
      .end((err2, response2) => {
        expect(response2.body).to.not.have.property('imageUrl');
        done()
      })

    })
  })

  it ('expect response2.body to not have property "description"', (done) => {
    chai.request(app)
    .delete(`/stations/${newStation._id}`)
    .end((err, response) => {

      chai.request(app)
      .get(`/stations/${newStation._id}`)
      .end((err2, response2) => {
        expect(response2.body).to.not.have.property('description');
        done()
      })

    })
  })

})






describe('TESTING GET ALL STATIONS DATA: ', () => {

  beforeEach(done => {
    Station.create(newStation)
    .then(response => {
      newStation._id = response._id

      Station.create(newStation2)
      .then(response2 => {
        newStation2._id = response2._id
        done()
      })
      .catch(err2 => console.log(err2))

    })
    .catch(err => console.log(err))
  })

  afterEach(done => {
    Station.remove({
      _id: newStation._id
    })
    .then(response => {

      Station.remove({
        _id: newStation2._id
      })
      .then(response2 => done())
      .catch(err2 => console.log(err2))

    })
    .catch(err => console.log(err))
  })

  it ('should return response status = 200', (done) => {
    chai.request(app)
    .get('/stations')
    .end((err, response) => {
      response.status.should.equal(200)
      done()
    })
  })

  it ('should return response.body as an "array"', (done) => {
    chai.request(app)
    .get('/stations')
    .end((err, response) => {
      response.body.should.be.an('array')
      done()
    })
  })

  // it ('should return response.body.length = 2', (done) => {
  //   chai.request(app)
  //   .get('/stations')
  //   .end((err, response) => {
  //     response.body.length.should.equal(2)
  //     done()
  //   })
  // })

  it (`should return response.body[0].lat = ${newStation.lat}`, (done) => {
    chai.request(app)
    .get(`/stations`)
    .end((err, response) => {
      response.body[0].lat.should.equal(newStation.lat)
      done()
    })
  })

  it (`should return response.body[0].lng = ${newStation.lng}`, (done) => {
    chai.request(app)
    .get(`/stations`)
    .end((err, response) => {
      response.body[0].lng.should.equal(newStation.lng)
      done()
    })
  })

  it (`should return response.body[0].stationName = ${newStation.stationName}`, (done) => {
    chai.request(app)
    .get(`/stations`)
    .end((err, response) => {
      response.body[0].stationName.should.equal(newStation.stationName)
      done()
    })
  })

  it (`should return response.body[0].imageUrl = ${newStation.imageUrl}`, (done) => {
    chai.request(app)
    .get(`/stations`)
    .end((err, response) => {
      response.body[0].imageUrl.should.equal(newStation.imageUrl)
      done()
    })
  })

  it (`should return response.body[0].description = ${newStation.description}`, (done) => {
    chai.request(app)
    .get(`/stations`)
    .end((err, response) => {
      response.body[0].description.should.equal(newStation.description)
      done()
    })
  })

  it (`should return response.body[1].lat = ${newStation2.lat}`, (done) => {
    chai.request(app)
    .get(`/stations`)
    .end((err, response) => {
      response.body[1].lat.should.equal(newStation2.lat)
      done()
    })
  })

  it (`should return response.body[1].lng = ${newStation2.lng}`, (done) => {
    chai.request(app)
    .get(`/stations`)
    .end((err, response) => {
      response.body[1].lng.should.equal(newStation2.lng)
      done()
    })
  })

  it (`should return response.body[1].stationName = ${newStation2.stationName}`, (done) => {
    chai.request(app)
    .get(`/stations`)
    .end((err, response) => {
      response.body[1].stationName.should.equal(newStation2.stationName)
      done()
    })
  })

  it (`should return response.body[1].imageUrl = ${newStation2.imageUrl}`, (done) => {
    chai.request(app)
    .get(`/stations`)
    .end((err, response) => {
      response.body[1].imageUrl.should.equal(newStation2.imageUrl)
      done()
    })
  })

  it (`should return response.body[1].description = ${newStation2.description}`, (done) => {
    chai.request(app)
    .get(`/stations`)
    .end((err, response) => {
      response.body[1].description.should.equal(newStation2.description)
      done()
    })
  })

})






describe('TESTING GET ONE STATION DATA: ', () => {

  beforeEach(done => {
    Station.create(newStation)
    .then(response => {
      newStation._id = response._id
      done()
    })
    .catch(err => console.log(err))
  })

  afterEach(done => {
    Station.remove({
      _id: newStation._id
    })
    .then(response => done())
    .catch(err => console.log(err))
  })

  it ('should return response status = 200', (done) => {
    chai.request(app)
    .get(`/stations/${newStation._id}`)
    .end((err, response) => {
      response.status.should.equal(200)
      done()
    })
  })

  it ('should return response.body as an "object"', (done) => {
    chai.request(app)
    .get(`/stations/${newStation._id}`)
    .end((err, response) => {
      response.body.should.be.an('object')
      done()
    })
  })

  it (`should return response.body.lat = ${newStation.lat}`, (done) => {
    chai.request(app)
    .get(`/stations/${newStation._id}`)
    .end((err, response) => {
      response.body.lat.should.equal(newStation.lat)
      done()
    })
  })

  it (`should return response.body.lng = ${newStation.lng}`, (done) => {
    chai.request(app)
    .get(`/stations/${newStation._id}`)
    .end((err, response) => {
      response.body.lng.should.equal(newStation.lng)
      done()
    })
  })

  it (`should return response.body.stationName = ${newStation.stationName}`, (done) => {
    chai.request(app)
    .get(`/stations/${newStation._id}`)
    .end((err, response) => {
      response.body.stationName.should.equal(newStation.stationName)
      done()
    })
  })

  it (`should return response.body.imageUrl = ${newStation.imageUrl}`, (done) => {
    chai.request(app)
    .get(`/stations/${newStation._id}`)
    .end((err, response) => {
      response.body.imageUrl.should.equal(newStation.imageUrl)
      done()
    })
  })

  it (`should return response.body.description = ${newStation.description}`, (done) => {
    chai.request(app)
    .get(`/stations/${newStation._id}`)
    .end((err, response) => {
      response.body.description.should.equal(newStation.description)
      done()
    })
  })

})






describe('TESTING UPDATE STATION DATA: ', () => {

  beforeEach(done => {
    Station.create(newStation)
    .then(response => {
      newStation._id = response._id
      done()
    })
    .catch(err => console.log(err))
  })

  afterEach(done => {
    Station.remove({
      _id: newStation._id
    })
    .then(response => done())
    .catch(err => console.log(err))
  })

  it ('should return response status = 200', (done) => {
    delete newStation2._id
    chai.request(app)
    .put(`/stations/${newStation._id}`)
    .send(newStation2)
    .end((err, response) => {
      response.status.should.equal(200)
      done()
    })
  })

  it (`should return response2.body.lat = "${newStation2.lat}"`, (done) => {
    delete newStation2._id
    chai.request(app)
    .put(`/stations/${newStation._id}`)
    .send(newStation2)
    .end((err, response) => {

      chai.request(app)
      .get(`/stations/${newStation._id}`)
      .end((err2, response2) => {
        response2.body.lat.should.equal(newStation2.lat)
        done()
      })

    })
  })

  it (`should return response2.body.lng = "${newStation2.lng}"`, (done) => {
    delete newStation2._id
    chai.request(app)
    .put(`/stations/${newStation._id}`)
    .send(newStation2)
    .end((err, response) => {

      chai.request(app)
      .get(`/stations/${newStation._id}`)
      .end((err2, response2) => {
        response2.body.lng.should.equal(newStation2.lng)
        done()
      })

    })
  })

  it ('should return response2.body.stationName = "dummy_station_2"', (done) => {
    delete newStation2._id
    chai.request(app)
    .put(`/stations/${newStation._id}`)
    .send(newStation2)
    .end((err, response) => {

      chai.request(app)
      .get(`/stations/${newStation._id}`)
      .end((err2, response2) => {
        response2.body.stationName.should.equal('dummy_station_2')
        done()
      })

    })
  })

  it ('should return response2.body.imageUrl = "https://upload.wikimedia.org/wikipedia/commons/c/cf/Harmoni_Central_Busway_Transjakarta_2.JPG"', (done) => {
    delete newStation2._id
    chai.request(app)
    .put(`/stations/${newStation._id}`)
    .send(newStation2)
    .end((err, response) => {

      chai.request(app)
      .get(`/stations/${newStation._id}`)
      .end((err2, response2) => {
        response2.body.imageUrl.should.equal('https://upload.wikimedia.org/wikipedia/commons/c/cf/Harmoni_Central_Busway_Transjakarta_2.JPG')
        done()
      })

    })
  })

  it ('should return response2.body.description = "dummy_station_2 description bla bla bla"', (done) => {
    delete newStation2._id
    chai.request(app)
    .put(`/stations/${newStation._id}`)
    .send(newStation2)
    .end((err, response) => {

      chai.request(app)
      .get(`/stations/${newStation._id}`)
      .end((err2, response2) => {
        response2.body.description.should.equal('dummy_station_2 description bla bla bla')
        done()
      })

    })
  })

})
