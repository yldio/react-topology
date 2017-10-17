export const graphql = [
  {
    id: 'af6a5cd2-291f-490b-bf3b-141b010635db',
    name: 'Frontend really long frontend man',
    status: 'active',
    connections: ['aea06a05-830a-46d3-bdc1-9dcba97303de'],
    instances: [
      {
        id: 'f1fb3c1d-9e0e-4538-b2ad-1124bce2459e',
        status: 'running',
        healthy: 'unknown'
      },
      {
        id: 'c5c7ae33-cfe1-43cc-9e9b-6f453de3888d',
        status: 'failed',
        healthy: 'unavailable'
      }
    ],
    instanceStatuses: [
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
    instances: [
      {
        id: 'f1fb3c1d-9e0e-4538-b2ad-1124bce2459e',
        status: 'running',
        healthy: 'unknown'
      },
      {
        id: 'c5c7ae33-cfe1-43cc-9e9b-6f453de3888d',
        status: 'failed',
        healthy: 'unavailable'
      }
    ],
    instanceStatuses: [
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
    instances: [
      {
        id: 'f1fb3c1d-9e0e-4538-b2ad-1124bce2459e',
        status: 'running',
        healthy: 'unknown'
      },
      {
        id: 'c5c7ae33-cfe1-43cc-9e9b-6f453de3888d',
        status: 'failed',
        healthy: 'unavailable'
      },
      {
        id: 'c5c7ae33-cfe1-43cc-9e9b-6f453de3888d',
        status: 'failed',
        healthy: 'unavailable'
      }
    ],
    instanceStatuses: [
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
}
