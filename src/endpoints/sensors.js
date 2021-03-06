import SensorsResponse from '../responses/sensors';
import Sensor from '../models/sensor';

/**
 * Class for /sensors/* endpoints.
 */
export default class SensorsEndpoints {
    /**
     * @constructor SensorsEndpoints
     * @param {SensorlabApi} api - parent api
     */
    constructor(api) {
        /**
         * @member SensorsEndpoints#api
         * @type {SensorlabApi}
         */
        this.api = api;
    }

    /**
     * Get sensors list.
     *
     * @method SensorsEndpoints#list
     * @param {object} options - method options
     * @param {number} options.page - page number to display. Default is `1`.
     * @param {string} options.name - filter by name.
     * @param {string} options.id - filter by id.
     * @param {string} options.imei - filter by imei.
     * @param {string} options.sort - sorting parameter
     * @param {string} options.online_status - pass "online" to search for online sensors or "offline" for offline sensors.
     * @param {string} options.battery_charge_min - filter sensors by battery charge
     * @param {string} options.battery_charge_max - filter sensors by battery charge
     * @returns {Promise.<ApiResponse>}
     */
    async list(options) {
        if (options === undefined) options = {};
        if (options.page === undefined) options.page = 1;
        if (options.name === undefined) options.name = null;
        if (options.id === undefined) options.id = null;
        if (options.imei === undefined) options.imei = null;
        if (options.sort === undefined) options.sort = null;
        if (options.online_status === undefined) options.online_status = null;
        if (options.battery_charge_min === undefined) options.battery_charge_min = null;
        if (options.battery_charge_max === undefined) options.battery_charge_max = null;

        let params = {
            page: options.page,
            name: options.name,
            id: options.id,
            imei: options.imei,
            sort: options.sort,
            online_status: options.online_status,
            battery_charge_min: options.battery_charge_min,
            battery_charge_max: options.battery_charge_max
        }
        let response = await this.api._makeApiRequest('/v1/sensors', 'GET', {}, params, true);
        return this.api._prepareApiResponse(response, this._successSensorsListResponse);
    }

    /**
     * Get sensor by id.
     *
     * @method SensorsEndpoints#one
     * @param {string} sensor_id - sensor's id
     * @returns {Promise.<ApiResponse>}
     */
    async get(sensor_id) {
        let response = await this.api._makeApiRequest('/v1/sensors/' + sensor_id, 'GET', {}, {}, true);
        return this.api._prepareApiResponse(response, this._successSensorResponse);
    }

    /**
     * Update sensors.
     *
     * @method SensorsEndpoints#update
     * @param {string} sensor_id - id of sensor to update
     * @param {string} name - sensor's name
     * @param {string} application - application id to assign to
     * @param {boolean} is_public - set sensor private or public
     */
    async update(sensor_id, name, application = null, is_public = null) {
        let data = {
            'name': name,
        };
        if (application !== null) {
            data['application'] = application;
        }
        if (is_public !== null) {
            data['is_public'] = is_public;
        }
        let response = await this.api._makeApiRequest('/v1/sensors/' + sensor_id, 'PATCH', data);
        return this.api._prepareApiResponse(response);
    }

    /**
     * Return success result.
     *
     * @param {SensorlabApi} api
     * @param {object} response
     * @returns {SensorsResponse}
     * @private
     */
    _successSensorsListResponse(api, response) {
        return new SensorsResponse(api, response.data);
    }

    /**
     * Return success result.
     *
     * @param {SensorlabApi} api
     * @param {object} response
     * @returns {Sensor}
     * @private
     */
    _successSensorResponse(api, response) {
        return new Sensor(api, response.data);
    }
}