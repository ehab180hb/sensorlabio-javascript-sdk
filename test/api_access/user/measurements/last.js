import {SensorlabApi} from '../../../../src';

//@todo change url to real public test server
let api = new SensorlabApi(process.env.TEST_REST_API_URL); //we must test on test server only

let test_email = 'test@sensorlab.io';
let test_passw = 'test';

describe('User: /measurements last endpoint', () => {
    describe('Get /measurements/last', () => {
        it('should authorize with correct email/password and get a token', (done) => {
            api.auth.user_token(test_email, test_passw)
                .then(function(user) {
                    user.token.should.not.be.empty;
                    done();
                });
        });

        it('should have access to endpoint', (done) => {
            api.measurements.last()
                .catch((response) => {
                    response.should.have.property('status').not.eq(401);
                    done();
                });
        });
    });
});