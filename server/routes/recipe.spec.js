const expect = require('chai').expect;
const supertest = require('supertest');
const app = supertest(require('../app'));
const {Recipe} = require('./../db/models');
const conn = require('./../db/conn')

describe('Recipe Routes - /api/recipes/', () => {

    beforeEach(() => {
        return conn.sync()
            .then(() => {
                return Promise.all([
                    Recipe.create({
                        title: 'mashed potatoes',
                        directions: ['step one', 'step two'],
                        ingredients: ['potatoes', 'butter'],
                        time: 20,
                        serving: 2,
                        nutrition: {},
                        healthLabels: ['not healthy'],
                        dietLabels:['high carb'],
                        ancestoryId: null,
                        img: 'http://via.placeholder.com/640x360',
                        parentId: null,
                        //used id
                        createdBy: 2
                    }),
                    Recipe.create({
                        title: 'baked potatoes',
                        directions: ['step one', 'step two'],
                        ingredients: ['potatoes', 'butter'],
                        time: 10,
                        serving: 3,
                        nutrition: {},
                        healthLabels: ['not healthy'],
                        dietLabels:['high carb'],
                        ancestoryId: null,
                        img: 'http://via.placeholder.com/640x360',
                        parentId: null,
                        //used id
                        createdBy: 1
                    })
                ]);
        });
    });

    it('Gets all recipes', () => {
        return app.get('/api/recipes')
            .expect(200)
            .then(response => {
                expect(response.text).to.contain('mashed potatoes');
                expect(response.text).to.contain('baked potatoes');
            });
    });

    it('Gets recipe by id', () => {
        return Recipe.findOne({ where: { title: 'mashed potatoes' } })
            .then(recipe => {
                return app.get(`/api/recipes/${recipe.id}`)
                    .expect(200)
                    .then(response => {
                        expect(response.text).to.contain('mashed potatoes');
                    });
            });
    });

    it('Posts creates new recipe', () => {
        return app.post('/api/recipes')
            .send({
                title: 'fried potatoes',
                directions: ['step one', 'step two'],
                ingredients: ['potatoes', 'butter'],
                time: 20,
                serving: 2,
                nutrition: {},
                healthLabels: ['not healthy'],
                dietLabels:['high carb'],
                ancestoryId: null,
                img: 'http://via.placeholder.com/640x360',
                parentId: null,
                //used id
                createdBy: 2
            })
            .expect(201)
            .then(response => {
                expect(response.text).to.contain('fried potatoes');
            });
    });

    it('Put updates recipe by id', () => {
        return Recipe.findOne({ where: { title: 'mashed potatoes' } })
            .then(recipe => {
                return app.put(`/api/recipes/${recipe.id}`)
                    .send({ parentId: 5 })
                    .expect(200)
                    .then(response => {
                        expect(response.text).to.contain('mashed potatoes');
                        expect(response.text).to.contain(`"parentId":5`);
                    });
            });
    });

    it('Delete removes user by id', () => {
        return Recipe.findOne({ where: { title: 'mashed potatoes' } })
            .then(recipe => {
                return app.delete(`/api/recipes/${recipe.id}`)
                    .expect(204)
                    .then(() => {
                        return app.get('/api/recipes')
                            .expect(200)
                            .then(response => {
                                expect(response.text).to.not.contain('mashed potatoes');
                                expect(response.text).to.contain('baked potatoes');
                            });
                    });
            });
    });

});