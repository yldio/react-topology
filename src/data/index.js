export const graphql = [
  {
    index: 0,
    id: 'af6a5cd2-291f-490b-bf3b-141b010635db',
    name: 'frontend',
    status: 'ACTIVE',
    connections: ['aea06a05-830a-46d3-bdc1-9dcba97303de'],
    instances: [
      {
        id: 'f1fb3c1d-9e0e-4538-b2ad-1124bce2459e',
        status: 'RUNNING',
        healthy: 'UNKNOWN'
      },
      {
        id: 'c5c7ae33-cfe1-43cc-9e9b-6f453de3888d',
        status: 'FAILED',
        healthy: 'UNAVAILABLE'
      }
    ],
    instanceStatuses: [
      {
        status: 'RUNNING',
        count: 1
      },
      {
        status: 'FAILED',
        count: 1
      }
    ],
    instancesActive: true,
    instancesHealthy: {
      total: 2,
      healthy: 0
    },
    transitionalStatus: false,
    isConsul: false
  },
  {
    index: 1,
    id: 'af6a5cd2-291f-490b-bf3b-asdasads',
    name: 'GraphQL',
    status: 'ACTIVE',
    connections: ['af6a5cd2-291f-490b-bf3b-141b010635db'],
    instances: [
      {
        id: 'f1fb3c1d-9e0e-4538-b2ad-1124bce2459e',
        status: 'RUNNING',
        healthy: 'UNKNOWN'
      },
      {
        id: 'c5c7ae33-cfe1-43cc-9e9b-6f453de3888d',
        status: 'FAILED',
        healthy: 'UNAVAILABLE'
      }
    ],
    instanceStatuses: [
      {
        status: 'RUNNING',
        count: 2
      }
    ],
    instancesActive: true,
    instancesHealthy: {
      total: 2,
      healthy: 2
    },
    transitionalStatus: false,
    isConsul: false
  },
  {
    index: 2,
    id: 'af6a5cd2-291f-490b-bf3b-141b010635dbs',
    name: 'API',
    status: 'ACTIVE',
    connections: ['af6a5cd2-291f-490b-bf3b-asdasads'],
    instances: [
      {
        id: 'f1fb3c1d-9e0e-4538-b2ad-1124bce2459e',
        status: 'RUNNING',
        healthy: 'UNKNOWN'
      },
      {
        id: 'c5c7ae33-cfe1-43cc-9e9b-6f453de3888d',
        status: 'FAILED',
        healthy: 'UNAVAILABLE'
      },
      {
        id: 'c5c7ae33-cfe1-43cc-9e9b-6f453de3888d',
        status: 'FAILED',
        healthy: 'UNAVAILABLE'
      }
    ],
    instanceStatuses: [
      {
        status: 'RUNNING',
        count: 1
      },
      {
        status: 'FAILED',
        count: 1
      },
      {
        status: 'UNKNOWN',
        count: 1
      }
    ],
    instancesActive: true,
    instancesHealthy: {
      total: 3,
      healthy: 2
    },
    transitionalStatus: false,
    isConsul: false
  }
];
