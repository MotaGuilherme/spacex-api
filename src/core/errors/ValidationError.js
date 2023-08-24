import BaseError from './BaseError.js';
export default class ValidationError extends BaseError{
    constructor(errorMessage) {
        super({
            message: errorMessage,
            name: 'ValidationError'
        })
    }
}