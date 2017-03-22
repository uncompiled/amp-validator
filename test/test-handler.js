import test from 'ava'
import ampValidator from '../handler'

test.cb('should pass result to AWS Lambda callback', t => {
  const event = {queryStringParameters: {url: 'https://www.uncompiled.org'}}
  const context = {}
  const callback = t.end
  ampValidator.validate(event, context, callback)
})
