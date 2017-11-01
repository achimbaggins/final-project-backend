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

var newStation2 = {
  coordinate: [1,1],
  stationName: 'dummy_station_2',
  imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Harmoni_Central_Busway_Transjakarta_2.JPG',
  description: 'dummy_station_2 description bla bla bla'
}

describe ('CREATE NEW STATION: ', () => {

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

  it ('should return response.body.coordinate = "[0,0]"', (done) => {
    chai.request(app)
    .post('/stations')
    .send(newStation)
    .end((err, response) => {
      newStation._id = response.body._id
      response.body.coordinate[0].should.equal('0')
      response.body.coordinate[1].should.equal('0')
      done()
    })
  })

  it ('should return response.body.stationName = "dummy_station"', (done) => {
    chai.request(app)
    .post('/stations')
    .send(newStation)
    .end((err, response) => {
      newStation._id = response.body._id
      response.body.stationName.should.equal('dummy_station')
      done()
    })
  })

  it ('should return response.body.imageUrl = "https://upload.wikimedia.org/wikipedia/commons/0/03/Harmoni_Central_Busway_Transjakarta_1.JPG"', (done) => {
    chai.request(app)
    .post('/stations')
    .send(newStation)
    .end((err, response) => {
      newStation._id = response.body._id
      response.body.imageUrl.should.equal('https://upload.wikimedia.org/wikipedia/commons/0/03/Harmoni_Central_Busway_Transjakarta_1.JPG')
      done()
    })
  })

  it ('should return response.body.description = "dummy_station description bla bla bla"', (done) => {
    chai.request(app)
    .post('/stations')
    .send(newStation)
    .end((err, response) => {
      newStation._id = response.body._id
      response.body.description.should.equal('dummy_station description bla bla bla')
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

describe('DELETE STATION: ', () => {

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

  it ('expect response2.body to not have property "data"', (done) => {
    chai.request(app)
    .delete(`/stations/${newStation._id}`)
    .end((err, response) => {

      chai.request(app)
      .get(`/stations/${newStation._id}`)
      .end((err2, response2) => {
        expect(response2.body).to.not.have.property('data');
        done()
      })

    })
  })

})

describe('GET ALL STATIONS: ', () => {

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

  it (`should return response.body[0].coordinate = ${newStation.coordinate}`, (done) => {
    chai.request(app)
    .get(`/stations`)
    .end((err, response) => {
      response.body[0].coordinate[0].should.equal('0')
      response.body[0].coordinate[1].should.equal('0')
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

  it (`should return response.body[1].coordinate = ${newStation2.coordinate}`, (done) => {
    chai.request(app)
    .get(`/stations`)
    .end((err, response) => {
      response.body[1].coordinate[0].should.equal('1')
      response.body[1].coordinate[1].should.equal('1')
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

describe('GET ONE STATION: ', () => {

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

  it (`should return response.body.coordinate = ${newStation.coordinate}`, (done) => {
    chai.request(app)
    .get(`/stations/${newStation._id}`)
    .end((err, response) => {
      response.body.coordinate[0].should.equal('0')
      response.body.coordinate[1].should.equal('0')
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
