let chai = require('chai');
import {SensorlabApi} from '../../../src';

let api = new SensorlabApi(process.env.TEST_REST_API_URL); //we must test on test server only

let test_email = 'test@sensorlab.io';
let test_passw = 'test';

let app = null;

describe('Applications endpoints', () => {
    describe('POST /applications', () => {
        it('should get an 401 status error without authorization', (done) => {
            api.applications.create()
                .catch((response) => {
                    response.status.should.eq(401);
                    done();
                });
        });

        it('should authorize with correct email/password and get a token', (done) => {
            api.auth.user_token(test_email, test_passw)
                .then(function(user) {
                    user.token.should.not.be.empty;
                    done();
                });
        });

        it('should return error if there is no `name` field', (done) => {
            api.applications.create()
                .catch((response) => {
                    response.status.should.eq(422);
                    response.should.have.property('errors');
                    response.errors.should.be.a('array');
                    response.errors.should.containSubset([{code: 1, param: 'name'}]);
                    done();
                });
        });

        it('should create application', (done) => {
            let data = {
                name: 'Test Application',
                description: 'Test Description',
            };
            api.applications.create(data.name, data.description)
                .then((application) => {
                    application.should.be.a('object');
                    application.should.have.property('id');
                    application.should.have.property('name').eq('Test Application');
                    application.should.have.property('description').eq('Test Description');
                    application.should.have.property('public_api_key');
                    application.should.have.property('private_api_key');
                    app = application;
                    done();
                });
        });

        it('should get newly created app', (done) => {
            api.applications.get(app.id)
                .then((application) => {
                    application.should.have.property('id').eq(app.id);
                    application.should.have.property('name').eq(app.name);
                    application.should.have.property('description').eq(app.description);
                    application.should.have.property('created');
                    done();
                });
        });
    });
});