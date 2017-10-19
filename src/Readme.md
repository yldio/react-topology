```
const data = require('./data/index.js');
const { ThemeProvider } = require('styled-components');
const theme = require('joyent-ui-toolkit/dist/es/theme').default;

<ThemeProvider theme={theme}>
  <Topology services={data.graphql} map={{instanceStatuses: 'nodes'}}/>
</ThemeProvider>
```

### A single instance:

```
const data = {
  id: 'frontend-app',
  name: 'Frontend',
  status: 'active',
  connections: ['graphql-server'],
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
};

<Topology services={data} height="200"/>
```
