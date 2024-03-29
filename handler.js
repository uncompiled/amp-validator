'use strict'

const request = require('request-promise')
const amphtmlValidator = require('amphtml-validator')

function sendResult(docUrl, validationResult, callback) {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      url: docUrl,
      status: validationResult.status,
      errors: validationResult.errors
    })
  })
}

function sendError(error, docUrl, callback) {
  return callback(null, {
    statusCode: 400,
    body: JSON.stringify({
      url: docUrl,
      status: 'FAIL',
      errors: [{
        severity: 'ERROR',
        message: error
      }]
    })
  })
}

module.exports.validate = (event, context, callback) => {
  const docUrl = (event.queryStringParameters) ? event.queryStringParameters.url : null
  if (!docUrl) {
    sendError('No URL provided', null, callback)
  }

  const requestPromise = request({
    uri: docUrl,
    headers: {
      'User-Agent': 'Google-AMPHTML'
    }
  }).catch(error => {
    sendError(error, docUrl, callback)
  })
  const validatorPromise = amphtmlValidator.getInstance()

  Promise.all([requestPromise, validatorPromise])
    .then(([document, validator]) => {
      const validationResult = validator.validateString(document)
      sendResult(docUrl, validationResult, callback)
    })
}
