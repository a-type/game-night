module.exports = {
  src: './',
  schema: '../game-night-api/src/schema/schema.graphql',
  exclude: [
    '**/node_modules/**',
    '**/__mocks__/**',
    '**/__generated__/**',
    '**/.next/**',
    '**/server/**',
    '**/data/**',
    '**/build/**',
  ],
  include: ['**/*'],
  language: 'typescript',
};
