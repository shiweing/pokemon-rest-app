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
        let poke = new Pokemon({ _id: 1, name: 'Charmander' });
        poke.save(() => {
            chai.request(app)
                .get('/api/pokemons')
                .then((res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a('array')
                    res.body.data[0].name.should.be.equal("Charmander");
                    done();
                })
                .catch((err) => {
                    console.error(err)
                })
        })
    })

    // Test POST api
    it("POST", (done) => {
        chai.request(app)
            .post("/api/pokemons")
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                _id: 1,
                name: "Charmander"
            })
            .then((res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('New pokemon added!');
                res.body.data.should.have.property('name');
                res.body.data.name.should.be.equal('Charmander')
                done()
            })
            .catch((err) => {
                console.error(err)
            })
    })
})

describe("/api/pokemons/:id", (done) => {
    beforeEach((done) => {
        db.collections.pokemons.drop(() => {
            //this function runs after the drop is completed
            done(); //go ahead everything is done now.
        });
    });

    // test Get api
    it("GET", (done) => {
        let poke = new Pokemon({ _id: 1, name: 'Charmander' });
        poke.save(() => {
            chai.request(app)
                .get('/api/pokemons/1')
                .then((res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.data.name.should.be.equal("Charmander");
                    done();
                })
                .catch((err) => {
                    console.error(err)
                })
        })
    })

    // Test PUT api
    it("PUT", (done) => {
        let poke = new Pokemon({ _id: 1, name: 'Charmander' });
        poke.save(() => {
            chai.request(app)
            .put("/api/pokemons/1")
            .send({
                name: 'Bulbasaur'
            })
            .then((res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Pokemon Info updated');
                res.body.data.should.have.property('name');
                res.body.data.name.should.be.equal('Bulbasaur');
                done();
            })
            .catch((err) => {
                console.error(err)
            })
        })
    })

    // Test DELTE api
    it("DELETE", (done) => {
        let poke = new Pokemon({ _id: 1, name: 'Charmander' });
        poke.save(() => {
            chai.request(app)
            .delete("/api/pokemons/1")
            .then((res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Pokemon deleted');
                res.body.should.have.property('status').eql('success');
                done();
            })
            .catch((err) => {
                console.error(err)
            })
        })
    })
})


