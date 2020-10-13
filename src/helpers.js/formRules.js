/* eslint-disable no-restricted-globals */
/* eslint-disable prefer-promise-reject-errors */
export default {
    required: {
        required: true,
        message: 'This field is requried.',
    },
    number: {
        validator: (_, value) => (!isNaN(value)
            ? Promise.resolve()
            : Promise.reject(
                'Please provide a valid phone number.',
            )),
    },
    email: {
        type: 'email',
        message: 'Please provide a valid email address.',
    },
};
