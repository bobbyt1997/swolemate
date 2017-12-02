process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('/POST /users', () => {
      it('it should POST a new user', (done) => {
        var newUser = {
        "name" : "John Smith",
        "weight": 0,
        "height": 0,
        "sex": "male"
      };
        chai.request(server)
            .post('/users')
            .send(newUser)
            .end((err, res) => {
                res.should.have.status(200);
              done();
            });
      });
 });

describe('/GET /users/:userId', () => {
  it('it should GET relevant user information', (done) => {
    chai.request(server)
      .get('/users/0')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.eql({"name":"John Smith","weight":0,"height":0,"sex":"male","stats":{"bench":0,"overheadpress":0,"deadlift":0,"squats":0},"workouts":{},"weights":{},"caloricCount":{"actual":0,"goal":0}});
        done();
      });
  });
});