const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [
    {text: 'Test todo 1'},
    {text: 'Test todo 2'},
];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

/*
beforeEach((done) => {
    Todo.remove({}).then(() => done());
});
*/


describe('POST /todos', () => {

    it('should create a new todo', (done) => {
        let text = 'Text todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(todos.length);
                    expect(todos[todos.length - 1].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });

    });


    it('should not create todo with invalid body data', (done) => {


        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(todos.length);
                    done();
                }).catch((e) => done(e));

            });

    });

});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);

    });
});
