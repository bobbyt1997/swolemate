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

describe('/GET /users', () => {
  it('it should GET information for all users', (done) => {
    chai.request(server)
      .get('/users')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
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

describe('/DELETE /users/:userId', () => {
  it('it should GET relevant user information', (done) => {
    chai.request(server)
      .delete('/users/0')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('/POST /users/:userId/workouts', () => {
      it('it should POST a new workout with exercises if applicable', (done) => {
        var newWorkout = {
        "name" : "Chest Workout",
        "bench": {
          "sets": 5,
          "reps": 10
        },
        "flies": {
          "sets": 5,
          "reps": 10
        }
      };
        chai.request(server)
            .post('/users/0/workouts')
            .send(newWorkout)
            .end((err, res) => {
                res.should.have.status(500);
              done();
            });
      });
 });