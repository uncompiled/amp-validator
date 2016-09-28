# AMP Validator

[![Code Climate](https://codeclimate.com/github/uncompiled/amp-validator/badges/gpa.svg)](https://codeclimate.com/github/uncompiled/amp-validator)

This is a [Serverless](https://serverless.com/) implementation of the
[AMPHTML](https://www.ampproject.org/) validator.

It uses the official [AMPHTML Validator](https://github.com/ampproject/amphtml/tree/master/validator)
and returns the validation results as a JSON response.

## Getting Started

- `npm install -g serverless`
- `serverless deploy`

## Endpoint

```
GET /validate
```

PARAMS:
- **url** = urlencoded path to an AMP HTML document

### Example Responses

Valid AMP HTML:
```
{
  "url": "https://www.ampproject.org",
  "status": "PASS",
  "errors": []
}
```

Invalid AMP HTML:
```
{
  "url": "https://www.google.com",
  "status": "FAIL",
  "errors": [ ... ] // 64 items
}
```

Invalid URL:
```
{
  "url": "https://i.am.not.a.website.xyz",
  "status": "FAIL",
  "errors": [{
    "severity": "ERROR",
    "message": "Document could not be retrieved."
  }]
}
```

## Removing the service

`serverless remove -v`

## License

The MIT License (MIT)
