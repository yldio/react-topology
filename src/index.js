import React from 'react';
import { Svg } from 'normalized-styled-components';
import PropTypes from 'prop-types';
import difference from 'lodash.difference';
import differenceBy from 'lodash.differenceby';

import Constants from './constants';
import createSimulation from './simulation';
import TopologyNode from './node';
import TopologyLink from './link';
import TopologyLinkArrow from './link/arrow';
import { getNodeRect, calculateLineLayout } from './functions';
import { instanceStatuses, instances, instancesHealthy } from './prop-types';

const StyledSvg = Svg.extend`
  width: ${props => props.size.width}px;
  height: ${props => props.size.height}px;
  max-width: 100%;
  font-family: arial;
`;

class Topology extends React.Component {
  componentWillMount() {
    this.create(this.props);
  }

  componentDidMount() {
    this.boundResize = this.handleResize.bind(this);
    window.addEventListener('resize', this.boundResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.boundResize);
  }

  shouldComponentUpdate = () => false;

  getChangedConnections(services, nextServices) {
    return nextServices.reduce((changed, nextService) => {
      if (changed.added || changed.removed) {
        return changed;
      }
      const service = services
        .filter(service => service.id === nextService.id)
        .shift();
      const connectionsAdded = difference(
        nextService.connections || [],
        service.connections || []
      ).length;
      // there's a new connection, we need to redraw
      if (connectionsAdded) {
        return { added: true };
      }
      const connectionsRemoved = difference(
        service.connections || [],
        nextService.connections || []
      ).length;
      // we'll need to remove the offending connections from links
      if (connectionsRemoved) {
        return { removed: true };
      }
      return changed;
    }, {});
  }

  getNextLinks(nextServices) {
    const links = this.state.links;
    return links.reduce((nextLinks, link) => {
      const sourceExists = nextServices.filter(
        nextService => nextService.id === link.source.id
      );
      if (sourceExists.length) {
        const source = sourceExists.shift();
        const targetExists = nextServices.filter(
          nextService => nextService.id === link.target.id
        ).length;
        const connectionExists = source.connections.filter(
          connection => connection === link.target.id
        ).length;
        if (targetExists && connectionExists) {
          nextLinks.push(link);
        }
      }
      return nextLinks;
    }, []);
  }

  getNextNodes(nextServices) {
    const nodes = this.state.nodes;
    // let notConnectedX = 0;
    return nodes.reduce((nextNodes, node) => {
      const keep = nextServices.filter(
        nextService => nextService.id === node.id
      ).length;
      if (keep) {
        nextNodes.push(node);
      }
      return nextNodes;
    }, []);
  }

  componentWillReceiveProps(nextProps) {
    // if we remove a node, it should just be removed from the simulation nodes and links
    // if we add a node, then we should recreate the damn thing
    // on other updates, we should update the services on the state and that's it
    const nextServices = Array.isArray(nextProps.services)
      ? nextProps.services.sort()
      : [nextProps.services];

    const connectedNextServices = nextServices.filter(
      service => (service.connections || []).length !== 0
    );
    const notConnectedNextServices = nextServices.filter(
      service => !(service.connections || []).length !== 0
    );

    const { services } = this.state;
    if (nextServices.length > services.length) {
      // new service added, we need to redraw
      this.create(nextProps);
    } else if (nextServices.length <= services.length) {
      const servicesRemoved = differenceBy(services, nextServices, 'id');
      const servicesChanged = differenceBy(nextServices, services, 'id');
      if (
        servicesChanged.length ||
        servicesRemoved.length !== services.length - nextServices.length
      ) {
        this.create(nextProps);
      } else {
        // check whether there are new connections. if so, we need to redraw
        // if we just dropped one, we need to remove it from links
        // comparison to yield 3 possible outcomes; no change, added, dropped
        const changedConnections = this.getChangedConnections(
          services,
          nextServices
        );
        // if connections are added, we'll need to redraw
        if (changedConnections.added) {
          this.create(nextProps);
        } else if (servicesRemoved.length || changedConnections.removed) {
          const nextNodes = this.getNextNodes(connectedNextServices);
          const notConnectedNodes = this.getNotConnectedNodes(
            notConnectedNextServices
          );
          const nextLinks = this.getNextLinks(nextServices);

          this.setState(
            {
              services: nextServices,
              links: nextLinks,
              nodes: nextNodes,
              notConnectedNodes
            },
            () => this.forceUpdate()
          );
        } else {
          // we've got the same services, no links changed, so we just need to set them to the state
          this.setState({ services: nextServices }, () => this.forceUpdate());
        }
      }
    }
  }

  getNotConnectedNodes(notConnectedServices) {
    return notConnectedServices.map((notConnectedService, index) => {
      const svgSize = this.getContentSize();
      const x =
        notConnectedService.isConsul || notConnectedService.reversed
          ? svgSize.width - Constants.nodeSize.width
          : (Constants.nodeSize.width + 10) * index;

      return {
        id: notConnectedService.id,
        x,
        y: 0
      };
    });
  }

  handleResize(evt) {
    this.create(this.props);
    // resize should just rejig the positions
  }

  renameProperty = (service, map) =>
    Object.assign(
      ...Object.keys(map).map(k => ({
        ...service,
        [k]: service[map[k]]
      }))
    );

  create(props) {
    let services = Array.isArray(props.services)
      ? props.services.sort()
      : [props.services];
    if (props.map) {
      services = props.services.map(service =>
        this.renameProperty(service, props.map)
      );
    }
    const connectedServices = services.filter(
      service => (service.connections || []).length !== 0
    );
    const notConnectedServices = services.filter(
      service => !(service.connections || []).length !== 0
    );
    const svgSize = this.getContentSize();

    const { nodes, links, simulation } = createSimulation(
      connectedServices,
      svgSize
    );
    const notConnectedNodes = this.getNotConnectedNodes(notConnectedServices);

    this.setState(
      {
        notConnectedNodes,
        nodes,
        links,
        simulation,
        services
      },
      () => {
        this.forceUpdate();
      }
    );
  }

  getContentSize() {
    const { parentId, width, height } = this.props;
    if (parentId && document.getElementById(parentId)) {
      const size = document.getElementById(parentId).getBoundingClientRect();

      return {
        width: window.innerWidth < size.width ? window.innerWidth : size.width,
        height: size.height
      };
    }

    return {
      width: window.innerWidth < width ? window.innerWidth : width,
      height
    };
  }

  constrainNodePosition(x, y, nodeRect, children = false) {
    const svgSize = this.getContentSize();

    /* const nodeRect = children
      ? Constants.nodeRectWithChildren
      : Constants.nodeRect; */

    if (x < nodeRect.right + 2) {
      x = nodeRect.right + 2;
    } else if (x > svgSize.width + nodeRect.left - 2) {
      x = svgSize.width + nodeRect.left - 2;
    }

    if (y < -nodeRect.top + 2) {
      y = -nodeRect.top + 2;
    } else if (y > svgSize.height - nodeRect.bottom - 2) {
      y = svgSize.height - nodeRect.bottom - 2;
    }

    return {
      x,
      y
    };
  }

  findNode = nodeId =>
    this.state.nodes.reduce(
      (acc, simNode, index) => (simNode.id === nodeId ? simNode : acc),
      {}
    );

  getConstrainedNodePosition(nodeId, nodeRect, children = false) {
    const node = this.findNode(nodeId);
    return this.constrainNodePosition(node.x, node.y, nodeRect, children);
  }

  getNotConnectedNodePosition = nodeId =>
    this.state.notConnectedNodes.filter(ncn => ncn.id === nodeId).shift();

  findNodeData = (nodesData, nodeId) =>
    nodesData.filter(nodeData => nodeData.id === nodeId).shift();

  setDragInfo(dragging, nodeId = null, position = {}) {
    this.dragInfo = {
      dragging,
      nodeId,
      position
    };
  }

  render() {
    const { onQuickActionsClick, onTitleClick } = this.props;

    const { nodes, links, services } = this.state;

    const nodesData = services.map((service, index) => {
      const nodeRect = getNodeRect(service);
      const nodePosition =
        (service.connections || []).length === 0
          ? this.getNotConnectedNodePosition(service.id)
          : this.getConstrainedNodePosition(
              service.id,
              nodeRect,
              service.children
            );

      return {
        ...service,
        ...nodePosition,
        nodeRect
      };
    });

    const linksData = links
      .map((link, index) => ({
        source: this.findNodeData(nodesData, link.source.id),
        target: this.findNodeData(nodesData, link.target.id)
      }))
      .map((linkData, index) => {
        return calculateLineLayout(linkData, index);
      });

    const onDragStart = (evt, nodeId) => {
      // It's this node's position that we'll need to update

      const x = evt.changedTouches ? evt.changedTouches[0].pageX : evt.clientX;
      const y = evt.changedTouches ? evt.changedTouches[0].pageY : evt.clientY;

      this.setDragInfo(true, nodeId, {
        x,
        y
      });
    };

    const onDragMove = evt => {
      if (this.dragInfo && this.dragInfo.dragging) {
        const x = evt.changedTouches
          ? evt.changedTouches[0].pageX
          : evt.clientX;
        const y = evt.changedTouches
          ? evt.changedTouches[0].pageY
          : evt.clientY;

        const offset = {
          x: x - this.dragInfo.position.x,
          y: y - this.dragInfo.position.y
        };

        const dragNodes = nodes.map((simNode, index) => {
          if (simNode.id === this.dragInfo.nodeId) {
            return {
              ...simNode,
              x: simNode.x + offset.x,
              y: simNode.y + offset.y
            };
          }
          return {
            ...simNode
          };
        });

        this.setState(
          {
            nodes: dragNodes
          },
          () => this.forceUpdate()
        );

        this.setDragInfo(true, this.dragInfo.nodeId, {
          x,
          y
        });
      }
    };

    const onDragEnd = evt => {
      this.setDragInfo(false);
    };

    const renderedNode = (n, index) => {
      const { primaryColor, secondaryColor } = this.props;
      return (
        <TopologyNode
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          key={index}
          data={n}
          index={index}
          onDragStart={onDragStart}
          onTitleClick={onTitleClick}
          onQuickActions={onQuickActionsClick}
        />
      );
    };

    const renderedLink = (l, index) => (
      <TopologyLink key={index} data={l} index={index} />
    );

    const renderedLinkArrow = (l, index) => (
      <TopologyLinkArrow key={index} data={l} index={index} />
    );

    const renderedNodes =
      this.dragInfo && this.dragInfo.dragging
        ? nodesData
            .filter((n, index) => n.id !== this.dragInfo.nodeId)
            .map((n, index) => renderedNode(n, index))
        : nodesData.map((n, index) => renderedNode(n, index));

    const renderedLinks = linksData.map((l, index) => renderedLink(l, index));

    const renderedLinkArrows =
      this.dragInfo && this.dragInfo.dragging
        ? linksData
            .filter((l, index) => l.target.id !== this.dragInfo.nodeId)
            .map((l, index) => renderedLinkArrow(l, index))
        : linksData.map((l, index) => renderedLinkArrow(l, index));

    const dragNode =
      !this.dragInfo || !this.dragInfo.dragging
        ? null
        : renderedNode(
            nodesData.reduce((dragNode, n, index) => {
              if (n.id === this.dragInfo.nodeId) {
                return n;
              }
              return dragNode;
            }, {})
          );

    const dragLinkArrow =
      !this.dragInfo ||
      !this.dragInfo.dragging ||
      renderedLinkArrows.length === renderedLinks.length
        ? null
        : renderedLinkArrow(
            linksData.reduce((dragLinkArrow, l, index) => {
              if (l.target.id === this.dragInfo.nodeId) {
                return l;
              }
              return dragLinkArrow;
            }, {})
          );

    return (
      <StyledSvg
        size={this.getContentSize()}
        onMouseMove={onDragMove}
        onTouchMove={onDragMove}
        onMouseUp={onDragEnd}
        onTouchEnd={onDragEnd}
        onTouchCancel={onDragEnd}
        id="topology-svg"
      >
        <g>{renderedNodes}</g>
        <g>{renderedLinks}</g>
        <g>{renderedLinkArrows}</g>
        <g>{dragNode}</g>
        <g>{dragLinkArrow}</g>
      </StyledSvg>
    );
  }
}

Topology.propTypes = {
  /** What should happen when the quick actions are clicked */
  onQuickActionsClick: PropTypes.func,
  /** What should happen when the title of any node is clicked */
  onTitleClick: PropTypes.func,
  /** 
   * The real magic , this is where you pass all of the services you want to see shown
  */
  services: PropTypes.arrayOf(
    PropTypes.shape({
      /** 
       * id of node
      */
      id: PropTypes.string.isRequired,
      /** 
       * name of the node
      */
      name: PropTypes.string.isRequired,
      /** 
       * How this node is doing
       * ```js
['active', 'running', 'failed', 'unknown']
      * ```
      */
      status: PropTypes.oneOf(['active', 'running', 'failed', 'unknown']),
      /** 
       * id of the nodes this node is connected to
      */
      connections: PropTypes.array,
      /** 
       * instances inside this node
       * ```js
{
  id: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['active', 'running', 'failed', 'unknown']),
  healthy: PropTypes.string
}
      * ```
      */
      instances: PropTypes.arrayOf(instances),
      /** 
       * the status of the instances inside this node
       * ```js
{
  count: PropTypes.number.isRequired,
  status: PropTypes.oneOf(['active', 'running', 'failed', 'unknown']),
  healthy: PropTypes.string
}
      * ```
      */
      instanceStatuses: PropTypes.arrayOf(instanceStatuses),
      /** 
       * Are the instances active ?
      */
      instancesActive: PropTypes.bool,
      /** 
       * The count of instances that are healthy
       * ```js
{
  total: PropTypes.number, // Total instances
  healthy: PropTypes.number
}
      * ```
      */
      instancesHealthy,
      /** 
       * The transitional status
      */
      transitionalStatus: PropTypes.bool,
      /** 
       * Should this use the reverse color scheme ?
      */
      reversed: PropTypes.bool
    })
  ),
  /** 
   * Width of the svg.
   * Needs to be a number and will always be converted into px
  */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** 
   * Height of the svg.
   * Needs to be a number and will always be converted into px
  */
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** If you have a parent already with a width and height you can pass the id and that will be used */
  parentId: PropTypes.string,
  /** 
   * Color of each node
  */
  primaryColor: PropTypes.string,
  /** 
   * Color of each node when reversed
  */
  secondaryColor: PropTypes.string
};

Topology.defaultProps = {
  width: 600,
  height: 600,
  onQuickActionsClick: () => {},
  onTitleClick: () => {},
  services: [],
  primaryColor: '#343434',
  secondaryColor: '#FFF'
};

export default Topology;

export { default as TopologyNode } from './node';
export { default as TopologyLink } from './link';
