![react-topology logo](https://i.imgur.com/T1uJKdx.png)

[![Build Status](https://travis-ci.org/yldio/react-topology.svg?branch=master)](https://travis-ci.org/yldio/react-topology)
[![Greenkeeper badge](https://badges.greenkeeper.io/yldio/react-topology.svg)](https://greenkeeper.io/)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

>  topology is the arrangement of the various elements (links, nodes, etc.) of a communication network.

React Topology allows you to create complicated network topologies in a very simple manner.

### Install

```bash static
npm install react-topology
or
yarn add react-topology
```

### Use

```js static
import Topology from 'react-topology'
const services =  [
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

const Network = () =>
    <Topology services={services} primaryColor="#BADA55" />


export default Network;
```

### Contribute

We're delighted that you'd like to contribute to the toolkit, as we're always looking for ways to improve it.

If there is anything that you'd like to improve or propose, please submit a pull request. And remember to check the contribution [guidelines](CONTRIBUTING.md)!.

#### Start

```bash static
git clone git@github.com:yldio/react-topology.git
cd react-topology
yarn
yarn start
```

### License

[MPL-2.0](LICENSE)

Icon: Network by Brennan Novak from the Noun Project
