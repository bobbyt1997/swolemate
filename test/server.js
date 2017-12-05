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
              res.should.have.status(200);
              done();
            });
      });
 });

describe('/POST /users/:userId/weights/', () => {
      it('it should POST a new weight change', (done) => {
        var newWeight = {
          "date": "12/04/2017",
          "weight": 0
        }
        chai.request(server)
            .post('/users/0/weights')
            .send(newWeight)
            .end((err, res) => {
              res.should.have.status(200);
              done();
            });
      });
 });

describe('/POST /users/:userId/workouts/:workoutId/:exerciseName', () => {
      it('it should POST a new exercise', (done) => {
        var newObject = {
          "sets": 5,
          "reps": 10
        }
        chai.request(server)
            .post('/users/0/workouts/0/pushups')
            .send(newObject)
            .end((err, res) => {
              res.should.have.status(200);
              done();
            });
      });
 });

describe('/PUT /users/:userId/stats', () => {
      it('it should PUT or update a user\s major lifts', (done) => {
        var newStats = {
          "bench": 1,
          "overheadpress": 1,
          "deadlift": 1,
          "squats": 1
        }
        chai.request(server)
            .put('/users/0/stats')
            .send(newStats)
            .end((err, res) => {
              res.should.have.status(200);
              done();
            });
      });
 });

describe('/PUT /users/:userId/caloricCount', () => {
      it('it should PUT or add a new calorie intake amount for specified user and calculate the goal', (done) => {
        var actual = {
          "actual":250
        }
        chai.request(server)
            .put('/users/0/caloricCount')
            .send(actual)
            .end((err, res) => {
              res.should.have.status(200);
              done();
            });
      });
 });

describe('/GET /users/:userId/stats', () => {
      it('it should GET caloric information', (done) => {
        chai.request(server)
            .get('/users/0/stats')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.eql({"bench": 1,"overheadpress": 1,"deadlift": 1,"squats": 1});
              done();
            });
      });
 });

describe('/GET /users/:userId/weights', () => {
      it('it should GET caloric information', (done) => {
        chai.request(server)
            .get('/users/0/weights')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body.should.eql([{"date": "12/04/2017","weight": 0}]);
              done();
            });
      });
 });

describe('/GET /users/:userId/caloricCount', () => {
      it('it should GET caloric information', (done) => {
        chai.request(server)
            .get('/users/0/caloricCount')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.eql({"actual": 250, "goal": 66.473});
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
        res.body.should.eql({
  "name":"John Smith",
  "weight":0,
  "height":0,
  "sex":"male",
  "stats":{
    "bench":1,
    "overheadpress":1,
    "deadlift":1,
    "squats":1
  },
  "workouts":{
    "0":{
      "name" : "Chest Workout",
      "bench": {"sets": 5,"reps": 10},
      "flies": {"sets": 5,"reps": 10},
      "pushups": {"sets": 5, "reps": 10}
    },
  },
  "weights":[{
          "date": "12/04/2017",
          "weight": 0
        }],
  "caloricCount":{
    "actual":250,
    "goal":66.473}
});
        done();
      });
  });
});

describe('/GET /users/:userId/workouts/:workoutId/:exerciseName', () => {
  it('it should GET information of a specific workout', (done) => {
    chai.request(server)
      .get('/users/0/workouts/0/pushups')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.eql({"sets": 5, "reps": 10});
        done();
      });
  });
}); 

describe('/GET /users/:userId/workouts', () => {
  it('it should GET workout information from user with id 0', (done) => {
    chai.request(server)
      .get('/users/0/workouts')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.eql({"0":{
      "name" : "Chest Workout",
      "bench": {"sets": 5,"reps": 10},
      "flies": {"sets": 5,"reps": 10},
      "pushups": {"sets": 5, "reps": 10}
    }});
        done();
      });
  });
}); 

describe('/GET /users/:userId/workouts/:workoutId', () => {
  it('it should GET workout information with specified id from specified user', (done) => {
    chai.request(server)
      .get('/users/0/workouts/0')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.eql({
        "name" : "Chest Workout",
        "bench": {
          "sets": 5,
          "reps": 10
        },
        "flies": {
          "sets": 5,
          "reps": 10
        },
        "pushups": {
          "sets": 5,
          "reps": 10
        }
      });
        done();
      });
  });
}); 

describe('/DELETE /users/:userId/workouts/:workoutId/:exerciseName', () => {
  it('it should DELETE an exercise', (done) => {
    chai.request(server)
      .delete('/users/0/workouts/0/pushups')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('/DELETE /users/:userId/workouts/:workoutId ', () => {
  it('it should DELETE an entire workout', (done) => {
    chai.request(server)
      .delete('/users/0/workouts/0')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('/DELETE /users/:userId/workouts ', () => {
  it('it should DELETE all of a user\'s workouts', (done) => {
    chai.request(server)
      .delete('/users/0/workouts')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('/DELETE /users/:userId', () => {
  it('it should DELETE relevant user information', (done) => {
    chai.request(server)
      .delete('/users/0')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});