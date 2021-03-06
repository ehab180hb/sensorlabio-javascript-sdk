let chai = require('chai');
import {SensorlabApi} from '../../../src';

//@todo change url to real public test server
let api = new SensorlabApi(process.env.TEST_REST_API_URL); //we must test on test server only

let test_email = 'test@sensorlab.io';
let test_passw = 'test';

describe('Authorization endpoints', () => {
    /**
     * Get user token.
     */
    describe('Get token', () => {
        it('should get an 401 status error with wrong email/password', (done) => {
            api.auth.user_token('somegibberishemail@someotherlongstring.com', 'someuknownpasswordverylongbutitdoesntexits')
                .catch(function(response) {
                    response.should.have.property('status').eq(401);
                    done();
                });
        });

        it('should get an 401 status error with correct email but wrong password', (done) => {
            api.auth.user_token(test_email, 'someuknownpasswordverylongbutitdoesntexits')
                .catch(function(response) {
                    response.status.should.eq(401);
                    done();
                });
        });

        it('passwords should work correctly', (done) => {
            api.auth.user_token(test_email, test_passw.toUpperCase())
                .catch(function(response) {
                    response.status.should.eq(401);
                    done();
                });
        });

        it('should authorize correctly', (done) => {
            api.auth.user_token(test_email, test_passw)
                .then(function(user) {
                    user.token.should.not.be.empty;
                    done();
                }).catch((_e) => {
                    console.log(_e);
                });
        });

    });
});