export const graphql = [
  {
    id: 'frontend-app',
    name: 'Frontend',
    status: 'active',
    connections: ['graphql-server'],
    nodes: [
      {
        status: 'running',
        count: 1
      },
      {
        status: 'failed',
        count: 1
      }
    ],
    instancesActive: true,
    instancesHealthy: {
      total: 2,
      healthy: 0
    },
    transitionalStatus: false,
    reversed: true
  },
  {
    id: 'graphql-server',
    name: 'GraphQL',
    status: 'active',
    connections: ['api-server'],
    nodes: [
      {
        status: 'running',
        count: 2
      }
    ],
    instancesActive: true,
    instancesHealthy: {
      total: 2,
      healthy: 2
    },
    transitionalStatus: false,
    reversed: true
  },
  {
    id: 'api-server',
    name: 'API',
    status: 'active',
    connections: ['graphql-server'],
    nodes: [
      {
        status: 'running',
        count: 1
      },
      {
        status: 'failed',
        count: 1
      },
      {
        status: 'unknown',
        count: 1
      }
    ],
    instancesActive: true,
    instancesHealthy: {
      total: 3,
      healthy: 2
    },
    transitionalStatus: false,
    reversed: false
  }
];

export const graphqlJoyent = [
  {
    id: 'af6a5cd2-291f-490b-bf3b-141b010635db',
    name: 'Frontend really long frontend man',
    status: 'active',
    connections: ['aea06a05-830a-46d3-bdc1-9dcba97303de'],
    nodes: [
      {
        status: 'running',
        count: 1
      },
      {
        status: 'failed',
        count: 1
      }
    ],
    instancesActive: true,
    instancesHealthy: {
      total: 2,
      healthy: 0
    },
    transitionalStatus: false,
    reversed: true
  },
  {
    id: 'af6a5cd2-291f-490b-bf3b-asdasads',
    name: 'GraphQL',
    status: 'active',
    connections: ['af6a5cd2-291f-490b-bf3b-141b010635db'],
    nodes: [
      {
        status: 'running',
        count: 2
      }
    ],
    instancesActive: true,
    instancesHealthy: {
      total: 2,
      healthy: 2
    },
    transitionalStatus: false,
    reversed: true
  },
  {
    id: 'af6a5cd2-291f-490b-bf3b-141b010635dbs',
    name: 'API',
    status: 'active',
    connections: ['af6a5cd2-291f-490b-bf3b-asdasads'],
    nodes: [
      {
        status: 'running',
        count: 1
      },
      {
        status: 'failed',
        count: 1
      },
      {
        status: 'unknown',
        count: 1
      }
    ],
    instancesActive: true,
    instancesHealthy: {
      total: 3,
      healthy: 2
    },
    transitionalStatus: false,
    reversed: false
  }
];

export const one = {
  name: 'stuff'
};
