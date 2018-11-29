const expect = require('chai').expect;
const supertest = require('supertest');
const app = supertest(require('../app'));
const {RecipeComment} = require('./../db/models');
const conn = require('./../db/conn')

describe('User Routes - /api/comments/', () => {

    beforeEach(() => {
        return conn.sync()
            .then(() => {
                return Promise.all([
                    RecipeComment.create({title: 'TestCommentA', content: 'TestContentA'}),
                    RecipeComment.create({title: 'TesCommentB', content: 'TestContentB'})
                ]);
        });
    });

    it('Gets all comments', () => {
        return app.get('/api/comments')
            .expect(200)
            .then(response => {
                expect(response.text).to.contain('TestCommentA');
                expect(response.text).to.contain('TestCommentB');
            });
    });

    it('Gets comment by id', () => {
        return RecipeComment.findOne({ where: { title: 'TestCommentA' } })
            .then(comment => {
                return app.get(`/api/comments/${comment.id}`)
                    .expect(200)
                    .then(response => {
                        expect(response.text).to.contain('TestCommentA');
                    });
            });
    });

    it('Posts creates new comment', () => {
        return app.post('/api/comments')
            .send({ title: 'newComment', content: 'new content'})
            .expect(201)
            .then(response => {
                expect(response.text).to.contain('newComment');
            });
    });

    it('Put updates comment by id', () => {
        return RecipeComment.findOne({ where: { title: 'TestCommentA' } })
            .then(comment => {
                return app.put(`/api/comments/${comment.id}`)
                    .send({ content: 'updated content' })
                    .expect(200)
                    .then(response => {
                        expect(response.text).to.contain('TestCommentA');
                        expect(response.text).to.contain('updated content');
                    });
            });
    });

    it('Delete removes user by id', () => {
        return RecipeComment.findOne({ where: { title: 'TestCommentA' } })
            .then(comment => {
                return app.delete(`/api/comments/${comment.id}`)
                    .expect(204)
                    .then(() => {
                        return app.get('/api/comments')
                            .expect(200)
                            .then(response => {
                                expect(response.text).to.not.contain('TestCommentA');
                                expect(response.text).to.contain('TestCommentB');
                                expect(response.text).to.contain('TestCommentC');
                            });
                    });
            });
    });

});