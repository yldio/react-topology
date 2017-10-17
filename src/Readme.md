```
const data = require('./data/index.js');
<Topology services={data.graphql} />
```


```js static
{
    id: 'af6a5cd2-291f-490b-bf3b-asdasads',
    name: 'GraphQL',
    status: 'active',
    connections: ['af6a5cd2-291f-490b-bf3b-141b010635db'],
    instances: [
      {
        id: 'f1fb3c1d-9e0e-4538-b2ad-1124bce2459e',
        status: 'running',
        healthy: 'UNKNOWN'
      },
      {
        id: 'c5c7ae33-cfe1-43cc-9e9b-6f453de3888d',
        status: 'failed',
        healthy: 'UNAVAILABLE'
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
    isConsul: true
  }


```