'use strict'

const request = require('request')
const amphtmlValidator = require('amphtml-validator')

module.exports.validate = (event, context, callback) => {
  const docUrl = event.query.url
  request(docUrl, (err, resp, body) => {
    if (err) {
      callback(null, {
        url: docUrl,
        status: 'FAIL',
        errors: [{
          severity: 'ERROR',
          message: 'Document could not be retrieved.'
        }]
      })
    } else {
      amphtmlValidator.getInstance().then(validator => {
        const result = validator.validateString(body)
        callback(null, {
          url: docUrl,
          status: result.status,
          errors: result.errors
        })
      })
    }
  })
}
