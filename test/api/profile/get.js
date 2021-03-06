let chai = require('chai');
let should = chai.should();
let expect = chai.expect;
import {SensorlabApi} from '../../../src';

//@todo change url to real public test server
let api = new SensorlabApi(process.env.TEST_REST_API_URL); //we must test on test server only

let test_email = 'test@sensorlab.io';
let test_passw = 'test';

let test_user = null;

describe('Get profile endpoint', () => {
    /**
     * Get user token.
     */
    describe('Get profile', () => {
        it('should get 401 error without token', (done) => {
            api.profile.get()
                .catch(function(response) {
                    response.status.should.eq(401);
                    done();
                });
        });

        it('should authorize with correct email/password and get a token', (done) => {
            api.auth.user_token(test_email, test_passw)
                .then(function(user) {
                    user.token.should.not.be.empty;
                    test_user = user;
                    done();
                });
        });

        it('should get a profile', (done) => {
            api.profile.get()
                .then(function(profile) {
                    profile.email.should.eq(test_email);
                    done();
                });
        });

        it('should get a profile too', (done) => {
            test_user.profile()
                .then(function(profile) {
                    profile.email.should.eq(test_email);
                    done();
                });
        });
    });
});