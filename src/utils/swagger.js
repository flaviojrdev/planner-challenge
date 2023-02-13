exports.swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Event Planner API',
      version: '1.0.0'
    },
    host: 'localhost:3000',
    basePath: '/api/v1',
    paths: {
      '/events': {
        get: {
          tags: ['Events'],
          description: 'Get all events',
          produces: ['application/json'],
          responses: {
            '200': {
              description: 'Success',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        _id: {
                          type: 'string'
                        },
                        createdAt: {
                          type: 'string'
                        },
                        description: {
                          type: 'string'
                        },
                        dateTime: {
                          type: 'string'
                        }
                      }
                    }
                  }
                }
              }
            },
            '404': {
              description: 'Not found'
            }
          }
        },
        post: {
          tags: ['Events'],
          description: 'Create a new event',
          produces: ['application/json'],
          responses: {
            '201': {
              description: 'Success'
            },
            '404': {
              description: 'Not found'
            }
          }
        }
      },
      '/events/{param}': {
        get: {
          tags: ['Events'],
          description: 'Get an event by ID',
          produces: ['application/json'],
          parameters: [
            {
              name: 'param',
              in: 'path',
              required: true,
              type: 'string'
            }
          ],
          responses: {
            '200': {
              description: 'Success',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      _id: {
                        type: 'string'
                      },
                      createdAt: {
                        type: 'string'
                      },
                      description: {
                        type: 'string'
                      },
                      dateTime: {
                        type: 'string'
                      }
                    }
                  }
                }
              }
            },
            '404': {
              description: 'Not found'
            }
          }
        },
        delete: {
          tags: ['Events'],
          description: 'Delete an event by ID',
          parameters: [
            {
              name: 'param',
              in: 'path',
              required: true,
              type: 'string'
            }
          ],
          responses: {
            '200': {
              description: 'Success'
            },
            '404': {
              description: 'Not found'
            }
          }
        }
      }
    }
  },
  apis: ['app.js']
};