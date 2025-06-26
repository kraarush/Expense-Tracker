import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Expensio API',
    description: 'API documentation for Expensio - Expense Tracker App',
  },
  host: 'expense-tracker-tyna.onrender.com',
  schemes: ['https'],
  tags: [
    {
      name: 'User',
      description: 'APIs related to user authentication and session',
    },
    {
      name: 'Expenses',
      description: 'APIs related to expense tracking',
    },
  ],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./index.js'];

swaggerAutogen()(outputFile, endpointsFiles, doc);
