class Responses{
    constructor(){

    }
    success (res, options) {
        let {status, data, validations} = options;
        status = status || 'success';
        data = data || undefined;
        validations = validations || undefined;
        return res.status(200).json({
            status,
            data,
            validations
        })
    }
    validation_error (res, options) {
        let {status, data, validations} = options;
        status = status || 'VALIDATION_ERROR';
        data = data || undefined;
        validations = validations || undefined;
        return res.status(200).json({
            status,
            data,
            validations
        })
    }
    not_matched (res, options) {
        let {status, data, validations} = options;
        status = status || 'USERNAME_PASSWORD_NOT_MATCHED';
        data = data || undefined;
        validations = validations || undefined;
        return res.status(200).json({
            status,
            data,
            validations
        })
    }
    username_exist (res, options) {
        let {status, data, validations} = options;
        status = status || 'USERNAME_EXISTED';
        data = data || undefined;
        validations = validations || undefined;
        return res.status(200).json({
            status,
            data,
            validations
        })
    }
}

module.exports = Responses;