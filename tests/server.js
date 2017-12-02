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
    		"sex": null
   		};
        chai.request(server)
            .post('/users')
            .send(newUser)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.eql(0);
              done();
            });
      });

 });