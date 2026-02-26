const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Rental Admin API',
      version: '1.0.0',
      description: 'API documentation for the Rental Admin Backend',
    },
    servers: [
      {
        url: 'https://rental-admin-backend.onrender.com',
        description: 'Production',
      },
      {
        url: 'http://localhost:5000',
        description: 'Local Development',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Paste your JWT token from /api/admin/login',
        },
      },
      schemas: {

        AuthBody: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', example: 'admin@example.com' },
            password: { type: 'string', example: 'secret123' },
          },
        },
        TokenResponse: {
          type: 'object',
          properties: {
            token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIs...' },
          },
        },
        Profile: {
          type: 'object',
          properties: {
            email: { type: 'string' },
            role: { type: 'string' },
          },
        },

        CreatedByRef: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
          },
        },
        PaginatedMeta: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            count: { type: 'integer', example: 10 },
            total: { type: 'integer', example: 100 },
            page: { type: 'integer', example: 1 },
            pages: { type: 'integer', example: 5 },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Something went wrong' },
            error: { type: 'string' },
          },
        },

        CustomerBody: {
          type: 'object',
          required: ['name'],
          properties: {
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', example: 'john@example.com' },
            phone: { type: 'string', example: '+1234567890' },
          },
        },
        Customer: {
          allOf: [
            { $ref: '#/components/schemas/CustomerBody' },
            {
              type: 'object',
              properties: {
                _id: { type: 'string' },
                createdBy: { $ref: '#/components/schemas/CreatedByRef' },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' },
              },
            },
          ],
        },

        VendorBody: {
          type: 'object',
          required: ['name'],
          properties: {
            name: { type: 'string', example: 'Vendor Co.' },
            email: { type: 'string', example: 'vendor@example.com' },
            phone: { type: 'string', example: '+1234567890' },
            numberOfEquipments: { type: 'integer', example: 5 },
          },
        },
        Vendor: {
          allOf: [
            { $ref: '#/components/schemas/VendorBody' },
            {
              type: 'object',
              properties: {
                _id: { type: 'string' },
                createdBy: { $ref: '#/components/schemas/CreatedByRef' },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' },
              },
            },
          ],
        },

        EquipmentBody: {
          type: 'object',
          required: ['title', 'type'],
          properties: {
            title: { type: 'string', example: 'Excavator' },
            type: { type: 'string', example: '64abc123def456ghi789jkl0', description: 'MasterType ObjectId' },
            description: { type: 'string', example: 'Heavy duty excavator' },
            keySpecs: {
              type: 'array',
              items: { type: 'string' },
              example: ['500HP', '20-ton', 'Hydraulic arm'],
            },
          },
        },
        Equipment: {
          allOf: [
            { $ref: '#/components/schemas/EquipmentBody' },
            {
              type: 'object',
              properties: {
                _id: { type: 'string' },
                createdBy: { $ref: '#/components/schemas/CreatedByRef' },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' },
              },
            },
          ],
        },

        TypeBody: {
          type: 'object',
          required: ['name'],
          properties: {
            name: { type: 'string', example: 'Heavy Machinery' },
          },
        },
        Type: {
          allOf: [
            { $ref: '#/components/schemas/TypeBody' },
            {
              type: 'object',
              properties: {
                _id: { type: 'string' },
                createdAt: { type: 'string', format: 'date-time' },
              },
            },
          ],
        },
      },

      parameters: {
        searchParam: {
          in: 'query', name: 'search', schema: { type: 'string' },
          description: 'Search keyword',
        },
        pageParam: {
          in: 'query', name: 'page', schema: { type: 'integer', default: 1 },
          description: 'Page number',
        },
        limitParam: {
          in: 'query', name: 'limit', schema: { type: 'integer', default: 20 },
          description: 'Items per page',
        },
        sortByParam: {
          in: 'query', name: 'sortBy', schema: { type: 'string', default: 'createdAt' },
          description: 'Field to sort by',
        },
        orderParam: {
          in: 'query', name: 'order',
          schema: { type: 'string', enum: ['asc', 'desc'], default: 'desc' },
          description: 'Sort order',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./routes/**/*.js', './routes/*.js'],
};

module.exports = swaggerJsdoc(options);