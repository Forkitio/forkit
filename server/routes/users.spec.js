const expect = require('chai').expect;
const supertest = require('supertest');
const app = supertest(require('../app'));
const {User} = require('./../db/models');
const conn = require('./../db/conn')

describe('User Routes - /api/users/', () => {

    beforeEach(() => {
        return conn.sync()
            .then(() => {
                console.log('AAA', User)
                return Promise.all([
                    User.create({
                        firstName: "Moe",
                        lastName: "Smith",
                        username: "moe",
                        password: "smith",
                        email: "moe@email.com",
                        pinterestId: 1,
                        instagramId: 2,
                        img: "http://via.placeholder.com/640x360"
                    }),
                    User.create({
                        firstName: "Larry",
                        lastName: "Smith",
                        username: "larry",
                        password: "smith",
                        email: "larry@email.com",
                        pinterestId: 2,
                        instagramId: 3,
                        img: "http://via.placeholder.com/640x360"
                    })
                ]);
        });
    });

    it('Gets all users', () => {
        return app.get('/api/users')
            .expect(200)
            .then(response => {
                expect(response.text).to.contain('Moe');
                expect(response.text).to.contain('Larry');
            });
    });

    it('Gets user by id', () => {
        return User.findOne({ where: { firstName: "Moe" } })
            .then(user => {
                return app.get(`/api/users/${user.id}`)
                    .expect(200)
                    .then(response => {
                        expect(response.text).to.contain('Moe');
                    });
            });
    });

    it('Posts creates new user', () => {
        return app.post('/api/users')
            .send({ firstName: "John", lastName: "Doe", userName: "john.doe", password: "john", email: "john.doe@email.com"})
            .expect(201)
            .then(response => {
                expect(response.text).to.contain('John');
            });
    });

    it('Put updates user by id', () => {
        return User.findOne({ where: { firstName: "Moe" } })
            .then(user => {
                return app.put(`/api/users/${user.id}`)
                    .send({ pinterestId: 5 })
                    .expect(200)
                    .then(response => {
                        expect(response.text).to.contain('Moe');
                        expect(response.text).to.contain(`"pinterestId":5`);
                    });
            });
    });

    it('Delete removes user by id', () => {
        return User.findOne({ where: { firstName: "Moe" } })
            .then(user => {
                return app.delete(`/api/users/${user.id}`)
                    .expect(204)
                    .then(() => {
                        return app.get('/api/users')
                            .expect(200)
                            .then(response => {
                                expect(response.text).to.not.contain('Moe');
                                expect(response.text).to.contain('Larry');
                                expect(response.text).to.contain('Curly');
                            });
                    });
            });
    });

});