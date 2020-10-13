// process.env.NODE_ENV = 'test';

// Import the dependencies for testing
const app = require('../src/index').app;
const db = require('../src/index').db;
const Pokemon = require('../src/pokemon/pokemonModel');
const mongoose = require('mongoose');

var chai = require('chai');
var chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

describe("/api/pokemons", () => {
    beforeEach((done) => {
        db.collections.pokemons.drop(() => {
            //this function runs after the drop is completed
            done(); //go ahead everything is done now.
        });
    });

    // test Get api
    it("GET", (done) => {
        let poke = new Pokemon({ _id: 1, name: 'poke' });
        poke.save()

        chai.request(app)
            .get('/api/pokemons')
            .then((res) => {
                res.should.have.status(200);
                res.body.data.should.be.a('array')
                res.body.data[0].name.should.be.equal("poke");
                done();
            })
            .catch((err) => {
                console.error(err)
            })
    })

    // Test POST api
    it("POST", (done) => {
        chai.request(app)
            .post("/api/pokemons")
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                _id: 1,
                name: "poke"
            })
            .then((res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('New pokemon added!');
                res.body.data.should.have.property('name');
                res.body.data.name.should.be.equal('poke')
                done()
            })
            .catch((err) => {
                console.error(err)
            })
    })
})


