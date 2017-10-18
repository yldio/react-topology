```
const data = require('./data/index.js');
<Topology services={data.graphql} map={{instanceStatuses: 'nodes'}}/>
```


```js static
{
    id: 'af6a5cd2-291f-490b-bf3b-asdasads',
    name: 'GraphQL',
    status: 'active',
    connections: ['af6a5cd2-291f-490b-bf3b-141b010635db'],
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