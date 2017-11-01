const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const app = require('../app.js')
const Station = require('../models/Station')

chai.use(chaiHttp)

const newStation = {
  coordinate: [0,0],
  stationName: 'dummy station',
  imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Harmoni_Central_Busway_Transjakarta_1.JPG',
  description: 'dummy station description bla bla bla'
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
})
