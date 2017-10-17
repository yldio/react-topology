'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TopologyLink = exports.TopologyNode = undefined;
var _jsxFileName = 'src/index.js';

var _node = require('./node');

Object.defineProperty(exports, 'TopologyNode', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_node).default;
  }
});

var _link = require('./link');

Object.defineProperty(exports, 'TopologyLink', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_link).default;
  }
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _normalizedStyledComponents = require('normalized-styled-components');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash.difference');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.differenceby');

var _lodash4 = _interopRequireDefault(_lodash3);

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

var _simulation = require('./simulation');

var _node2 = _interopRequireDefault(_node);

var _link2 = _interopRequireDefault(_link);

var _arrow = require('./link/arrow');

var _arrow2 = _interopRequireDefault(_arrow);

var _functions = require('./functions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const StyledSvg = _normalizedStyledComponents.Svg.extend`
  width: 100%;
  height: 1000px;
  font-family: arial;
`;

class Topology extends _react2.default.Component {
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

  shouldComponentUpdate() {
    return false;
  }

  getChangedConnections(services, nextServices) {
    return nextServices.reduce((changed, nextService) => {
      if (changed.added || changed.removed) {
        return changed;
      }
      const service = services.filter(service => service.id === nextService.id).shift();
      const connectionsAdded = (0, _lodash2.default)(nextService.connections, service.connections).length;
      // there's a new connection, we need to redraw
      if (connectionsAdded) {
        return { added: true };
      }
      const connectionsRemoved = (0, _lodash2.default)(service.connections, nextService.connections).length;
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
      const sourceExists = nextServices.filter(nextService => nextService.id === link.source.id);
      if (sourceExists.length) {
        const source = sourceExists.shift();
        const targetExists = nextServices.filter(nextService => nextService.id === link.target.id).length;
        const connectionExists = source.connections.filter(connection => connection === link.target.id).length;
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
      const keep = nextServices.filter(nextService => nextService.id === node.id).length;
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
    // we should forceUpdate once the state has been updated
    const nextServices = nextProps.services.sort();
    const connectedNextServices = nextServices.filter(service => service.connections.length !== 0);
    const notConnectedNextServices = nextServices.filter(service => !service.connections.length !== 0);

    const { services } = this.state;
    if (nextServices.length > services.length) {
      // new service added, we need to redraw
      this.create(nextProps);
    } else if (nextServices.length <= services.length) {
      const servicesRemoved = (0, _lodash4.default)(services, nextServices, 'id');
      const servicesChanged = (0, _lodash4.default)(nextServices, services, 'id');
      if (servicesChanged.length || servicesRemoved.length !== services.length - nextServices.length) {
        this.create(nextProps);
      } else {
        // check whether there are new connections. if so, we need to redraw
        // if we just dropped one, we need to remove it from links
        // comparison to yield 3 possible outcomes; no change, added, dropped
        const changedConnections = this.getChangedConnections(services, nextServices);
        // if connections are added, we'll need to redraw
        if (changedConnections.added) {
          this.create(nextProps);
        } else if (servicesRemoved.length || changedConnections.removed) {
          const nextNodes = this.getNextNodes(connectedNextServices);
          const notConnectedNodes = this.getNotConnectedNodes(notConnectedNextServices);
          const nextLinks = this.getNextLinks(nextServices);

          this.setState({
            services: nextServices,
            links: nextLinks,
            nodes: nextNodes,
            notConnectedNodes
          }, () => this.forceUpdate());
        } else {
          // we've got the same services, no links changed, so we just need to set them to the state
          this.setState({ services: nextServices }, () => this.forceUpdate());
        }
      }
    }
  }

  getNotConnectedNodes(notConnectedServices) {
    return notConnectedServices.map((notConnectedService, index) => {
      const svgSize = this.getSvgSize();
      const x = notConnectedService.isConsul ? svgSize.width - _constants2.default.nodeSize.width : (_constants2.default.nodeSize.width + 10) * index;

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

  create(props) {
    // other updates should also just update the services rather than recreate the simulation
    const services = props.services.sort();
    const connectedServices = services.filter(service => service.connections.length !== 0);
    const notConnectedServices = services.filter(service => !service.connections.length !== 0);
    const svgSize = this.getSvgSize();

    const { nodes, links, simulation } = (0, _simulation.createSimulation)(connectedServices, svgSize);
    const notConnectedNodes = this.getNotConnectedNodes(notConnectedServices);

    this.setState({
      notConnectedNodes,
      nodes,
      links,
      simulation,
      services
    }, () => {
      this.forceUpdate();
    });
  }

  getSvgSize() {
    if (document.getElementById('topology-svg')) {
      return document.getElementById('topology-svg').getBoundingClientRect();
    }

    const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    return {
      width: windowWidth - 2 * 24,
      height: 1000
    };
  }

  constrainNodePosition(x, y, nodeRect, children = false) {
    const svgSize = this.getSvgSize();

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

  findNode(nodeId) {
    return this.state.nodes.reduce((acc, simNode, index) => simNode.id === nodeId ? simNode : acc, {});
  }

  getConstrainedNodePosition(nodeId, nodeRect, children = false) {
    const node = this.findNode(nodeId);
    return this.constrainNodePosition(node.x, node.y, nodeRect, children);
  }

  getNotConnectedNodePosition(nodeId) {
    return this.state.notConnectedNodes.filter(ncn => ncn.id === nodeId).shift();
  }

  findNodeData(nodesData, nodeId) {
    return nodesData.filter(nodeData => nodeData.id === nodeId).shift();
  }

  setDragInfo(dragging, nodeId = null, position = {}) {
    this.dragInfo = {
      dragging,
      nodeId,
      position
    };
  }

  render() {
    const { onQuickActionsClick, onNodeTitleClick } = this.props;

    const { nodes, links, services } = this.state;

    const nodesData = services.map((service, index) => {
      const nodeRect = (0, _functions.getNodeRect)(service);
      const nodePosition = service.connections.length !== 0 ? this.getConstrainedNodePosition(service.id, nodeRect, service.children) : this.getNotConnectedNodePosition(service.id);

      return Object.assign({}, service, nodePosition, {
        nodeRect
      });
    });

    const linksData = links.map((link, index) => ({
      source: this.findNodeData(nodesData, link.source.id),
      target: this.findNodeData(nodesData, link.target.id)
    })).map((linkData, index) => {
      return (0, _functions.calculateLineLayout)(linkData, index);
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
        const x = evt.changedTouches ? evt.changedTouches[0].pageX : evt.clientX;
        const y = evt.changedTouches ? evt.changedTouches[0].pageY : evt.clientY;

        const offset = {
          x: x - this.dragInfo.position.x,
          y: y - this.dragInfo.position.y
        };

        const dragNodes = nodes.map((simNode, index) => {
          if (simNode.id === this.dragInfo.nodeId) {
            return Object.assign({}, simNode, {
              x: simNode.x + offset.x,
              y: simNode.y + offset.y
            });
          }
          return Object.assign({}, simNode);
        });

        this.setState({
          nodes: dragNodes
        }, () => this.forceUpdate());

        this.setDragInfo(true, this.dragInfo.nodeId, {
          x,
          y
        });
      }
    };

    const onDragEnd = evt => {
      this.setDragInfo(false);
    };

    const renderedNode = (n, index) => _react2.default.createElement(_node2.default, {
      key: index,
      data: n,
      index: index,
      onDragStart: onDragStart,
      onNodeTitleClick: onNodeTitleClick,
      onQuickActions: onQuickActionsClick,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 369
      },
      __self: this
    });

    const renderedLink = (l, index) => _react2.default.createElement(_link2.default, { key: index, data: l, index: index, __source: {
        fileName: _jsxFileName,
        lineNumber: 380
      },
      __self: this
    });

    const renderedLinkArrow = (l, index) => _react2.default.createElement(_arrow2.default, { key: index, data: l, index: index, __source: {
        fileName: _jsxFileName,
        lineNumber: 384
      },
      __self: this
    });

    const renderedNodes = this.dragInfo && this.dragInfo.dragging ? nodesData.filter((n, index) => n.id !== this.dragInfo.nodeId).map((n, index) => renderedNode(n, index)) : nodesData.map((n, index) => renderedNode(n, index));

    const renderedLinks = linksData.map((l, index) => renderedLink(l, index));

    const renderedLinkArrows = this.dragInfo && this.dragInfo.dragging ? linksData.filter((l, index) => l.target.id !== this.dragInfo.nodeId).map((l, index) => renderedLinkArrow(l, index)) : linksData.map((l, index) => renderedLinkArrow(l, index));

    const dragNode = !this.dragInfo || !this.dragInfo.dragging ? null : renderedNode(nodesData.reduce((dragNode, n, index) => {
      if (n.id === this.dragInfo.nodeId) {
        return n;
      }
      return dragNode;
    }, {}));

    const dragLinkArrow = !this.dragInfo || !this.dragInfo.dragging || renderedLinkArrows.length === renderedLinks.length ? null : renderedLinkArrow(linksData.reduce((dragLinkArrow, l, index) => {
      if (l.target.id === this.dragInfo.nodeId) {
        return l;
      }
      return dragLinkArrow;
    }, {}));

    return _react2.default.createElement(
      StyledSvg,
      {
        onMouseMove: onDragMove,
        onTouchMove: onDragMove,
        onMouseUp: onDragEnd,
        onTouchEnd: onDragEnd,
        onTouchCancel: onDragEnd,
        id: 'topology-svg',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 430
        },
        __self: this
      },
      _react2.default.createElement(
        'g',
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 438
          },
          __self: this
        },
        renderedNodes
      ),
      _react2.default.createElement(
        'g',
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 439
          },
          __self: this
        },
        renderedLinks
      ),
      _react2.default.createElement(
        'g',
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 440
          },
          __self: this
        },
        renderedLinkArrows
      ),
      _react2.default.createElement(
        'g',
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 441
          },
          __self: this
        },
        dragNode
      ),
      _react2.default.createElement(
        'g',
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 442
          },
          __self: this
        },
        dragLinkArrow
      )
    );
  }
}

Topology.propTypes = {
  onQuickActionsClick: _propTypes2.default.func,
  onNodeTitleClick: _propTypes2.default.func,
  services: _propTypes2.default.array
};

exports.default = Topology;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0IiwiU3R5bGVkU3ZnIiwiZXh0ZW5kIiwiVG9wb2xvZ3kiLCJDb21wb25lbnQiLCJjb21wb25lbnRXaWxsTW91bnQiLCJjcmVhdGUiLCJwcm9wcyIsImNvbXBvbmVudERpZE1vdW50IiwiYm91bmRSZXNpemUiLCJoYW5kbGVSZXNpemUiLCJiaW5kIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInNob3VsZENvbXBvbmVudFVwZGF0ZSIsImdldENoYW5nZWRDb25uZWN0aW9ucyIsInNlcnZpY2VzIiwibmV4dFNlcnZpY2VzIiwicmVkdWNlIiwiY2hhbmdlZCIsIm5leHRTZXJ2aWNlIiwiYWRkZWQiLCJyZW1vdmVkIiwic2VydmljZSIsImZpbHRlciIsImlkIiwic2hpZnQiLCJjb25uZWN0aW9uc0FkZGVkIiwiY29ubmVjdGlvbnMiLCJsZW5ndGgiLCJjb25uZWN0aW9uc1JlbW92ZWQiLCJnZXROZXh0TGlua3MiLCJsaW5rcyIsInN0YXRlIiwibmV4dExpbmtzIiwibGluayIsInNvdXJjZUV4aXN0cyIsInNvdXJjZSIsInRhcmdldEV4aXN0cyIsInRhcmdldCIsImNvbm5lY3Rpb25FeGlzdHMiLCJjb25uZWN0aW9uIiwicHVzaCIsImdldE5leHROb2RlcyIsIm5vZGVzIiwibmV4dE5vZGVzIiwibm9kZSIsImtlZXAiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwibmV4dFByb3BzIiwic29ydCIsImNvbm5lY3RlZE5leHRTZXJ2aWNlcyIsIm5vdENvbm5lY3RlZE5leHRTZXJ2aWNlcyIsInNlcnZpY2VzUmVtb3ZlZCIsInNlcnZpY2VzQ2hhbmdlZCIsImNoYW5nZWRDb25uZWN0aW9ucyIsIm5vdENvbm5lY3RlZE5vZGVzIiwiZ2V0Tm90Q29ubmVjdGVkTm9kZXMiLCJzZXRTdGF0ZSIsImZvcmNlVXBkYXRlIiwibm90Q29ubmVjdGVkU2VydmljZXMiLCJtYXAiLCJub3RDb25uZWN0ZWRTZXJ2aWNlIiwiaW5kZXgiLCJzdmdTaXplIiwiZ2V0U3ZnU2l6ZSIsIngiLCJpc0NvbnN1bCIsIndpZHRoIiwibm9kZVNpemUiLCJ5IiwiZXZ0IiwiY29ubmVjdGVkU2VydmljZXMiLCJzaW11bGF0aW9uIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIndpbmRvd1dpZHRoIiwiaW5uZXJXaWR0aCIsImRvY3VtZW50RWxlbWVudCIsImNsaWVudFdpZHRoIiwiYm9keSIsImhlaWdodCIsImNvbnN0cmFpbk5vZGVQb3NpdGlvbiIsIm5vZGVSZWN0IiwiY2hpbGRyZW4iLCJyaWdodCIsImxlZnQiLCJ0b3AiLCJib3R0b20iLCJmaW5kTm9kZSIsIm5vZGVJZCIsImFjYyIsInNpbU5vZGUiLCJnZXRDb25zdHJhaW5lZE5vZGVQb3NpdGlvbiIsImdldE5vdENvbm5lY3RlZE5vZGVQb3NpdGlvbiIsIm5jbiIsImZpbmROb2RlRGF0YSIsIm5vZGVzRGF0YSIsIm5vZGVEYXRhIiwic2V0RHJhZ0luZm8iLCJkcmFnZ2luZyIsInBvc2l0aW9uIiwiZHJhZ0luZm8iLCJyZW5kZXIiLCJvblF1aWNrQWN0aW9uc0NsaWNrIiwib25Ob2RlVGl0bGVDbGljayIsIm5vZGVQb3NpdGlvbiIsImxpbmtzRGF0YSIsImxpbmtEYXRhIiwib25EcmFnU3RhcnQiLCJjaGFuZ2VkVG91Y2hlcyIsInBhZ2VYIiwiY2xpZW50WCIsInBhZ2VZIiwiY2xpZW50WSIsIm9uRHJhZ01vdmUiLCJvZmZzZXQiLCJkcmFnTm9kZXMiLCJvbkRyYWdFbmQiLCJyZW5kZXJlZE5vZGUiLCJuIiwicmVuZGVyZWRMaW5rIiwibCIsInJlbmRlcmVkTGlua0Fycm93IiwicmVuZGVyZWROb2RlcyIsInJlbmRlcmVkTGlua3MiLCJyZW5kZXJlZExpbmtBcnJvd3MiLCJkcmFnTm9kZSIsImRyYWdMaW5rQXJyb3ciLCJwcm9wVHlwZXMiLCJmdW5jIiwiYXJyYXkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBUUE7Ozs7O3lDQStiU0EsTzs7OztBQTliVDs7Ozs7eUNBK2JTQSxPOzs7O0FBeGNUOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7O0FBR0E7Ozs7QUFDQTs7OztBQUVBLE1BQU1DLFlBQVksZ0NBQUlDLE1BQU87Ozs7Q0FBN0I7O0FBTUEsTUFBTUMsUUFBTixTQUF1QixnQkFBTUMsU0FBN0IsQ0FBdUM7QUFDckNDLHVCQUFxQjtBQUNuQixTQUFLQyxNQUFMLENBQVksS0FBS0MsS0FBakI7QUFDRDs7QUFFREMsc0JBQW9CO0FBQ2xCLFNBQUtDLFdBQUwsR0FBbUIsS0FBS0MsWUFBTCxDQUFrQkMsSUFBbEIsQ0FBdUIsSUFBdkIsQ0FBbkI7QUFDQUMsV0FBT0MsZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0MsS0FBS0osV0FBdkM7QUFDRDs7QUFFREsseUJBQXVCO0FBQ3JCRixXQUFPRyxtQkFBUCxDQUEyQixRQUEzQixFQUFxQyxLQUFLTixXQUExQztBQUNEOztBQUVETywwQkFBd0I7QUFDdEIsV0FBTyxLQUFQO0FBQ0Q7O0FBRURDLHdCQUFzQkMsUUFBdEIsRUFBZ0NDLFlBQWhDLEVBQThDO0FBQzVDLFdBQU9BLGFBQWFDLE1BQWIsQ0FBb0IsQ0FBQ0MsT0FBRCxFQUFVQyxXQUFWLEtBQTBCO0FBQ25ELFVBQUlELFFBQVFFLEtBQVIsSUFBaUJGLFFBQVFHLE9BQTdCLEVBQXNDO0FBQ3BDLGVBQU9ILE9BQVA7QUFDRDtBQUNELFlBQU1JLFVBQVVQLFNBQ2JRLE1BRGEsQ0FDTkQsV0FBV0EsUUFBUUUsRUFBUixLQUFlTCxZQUFZSyxFQURoQyxFQUViQyxLQUZhLEVBQWhCO0FBR0EsWUFBTUMsbUJBQW1CLHNCQUN2QlAsWUFBWVEsV0FEVyxFQUV2QkwsUUFBUUssV0FGZSxFQUd2QkMsTUFIRjtBQUlBO0FBQ0EsVUFBSUYsZ0JBQUosRUFBc0I7QUFDcEIsZUFBTyxFQUFFTixPQUFPLElBQVQsRUFBUDtBQUNEO0FBQ0QsWUFBTVMscUJBQXFCLHNCQUN6QlAsUUFBUUssV0FEaUIsRUFFekJSLFlBQVlRLFdBRmEsRUFHekJDLE1BSEY7QUFJQTtBQUNBLFVBQUlDLGtCQUFKLEVBQXdCO0FBQ3RCLGVBQU8sRUFBRVIsU0FBUyxJQUFYLEVBQVA7QUFDRDtBQUNELGFBQU9ILE9BQVA7QUFDRCxLQXhCTSxFQXdCSixFQXhCSSxDQUFQO0FBeUJEOztBQUVEWSxlQUFhZCxZQUFiLEVBQTJCO0FBQ3pCLFVBQU1lLFFBQVEsS0FBS0MsS0FBTCxDQUFXRCxLQUF6QjtBQUNBLFdBQU9BLE1BQU1kLE1BQU4sQ0FBYSxDQUFDZ0IsU0FBRCxFQUFZQyxJQUFaLEtBQXFCO0FBQ3ZDLFlBQU1DLGVBQWVuQixhQUFhTyxNQUFiLENBQ25CSixlQUFlQSxZQUFZSyxFQUFaLEtBQW1CVSxLQUFLRSxNQUFMLENBQVlaLEVBRDNCLENBQXJCO0FBR0EsVUFBSVcsYUFBYVAsTUFBakIsRUFBeUI7QUFDdkIsY0FBTVEsU0FBU0QsYUFBYVYsS0FBYixFQUFmO0FBQ0EsY0FBTVksZUFBZXJCLGFBQWFPLE1BQWIsQ0FDbkJKLGVBQWVBLFlBQVlLLEVBQVosS0FBbUJVLEtBQUtJLE1BQUwsQ0FBWWQsRUFEM0IsRUFFbkJJLE1BRkY7QUFHQSxjQUFNVyxtQkFBbUJILE9BQU9ULFdBQVAsQ0FBbUJKLE1BQW5CLENBQ3ZCaUIsY0FBY0EsZUFBZU4sS0FBS0ksTUFBTCxDQUFZZCxFQURsQixFQUV2QkksTUFGRjtBQUdBLFlBQUlTLGdCQUFnQkUsZ0JBQXBCLEVBQXNDO0FBQ3BDTixvQkFBVVEsSUFBVixDQUFlUCxJQUFmO0FBQ0Q7QUFDRjtBQUNELGFBQU9ELFNBQVA7QUFDRCxLQWpCTSxFQWlCSixFQWpCSSxDQUFQO0FBa0JEOztBQUVEUyxlQUFhMUIsWUFBYixFQUEyQjtBQUN6QixVQUFNMkIsUUFBUSxLQUFLWCxLQUFMLENBQVdXLEtBQXpCO0FBQ0E7QUFDQSxXQUFPQSxNQUFNMUIsTUFBTixDQUFhLENBQUMyQixTQUFELEVBQVlDLElBQVosS0FBcUI7QUFDdkMsWUFBTUMsT0FBTzlCLGFBQWFPLE1BQWIsQ0FDWEosZUFBZUEsWUFBWUssRUFBWixLQUFtQnFCLEtBQUtyQixFQUQ1QixFQUVYSSxNQUZGO0FBR0EsVUFBSWtCLElBQUosRUFBVTtBQUNSRixrQkFBVUgsSUFBVixDQUFlSSxJQUFmO0FBQ0Q7QUFDRCxhQUFPRCxTQUFQO0FBQ0QsS0FSTSxFQVFKLEVBUkksQ0FBUDtBQVNEOztBQUVERyw0QkFBMEJDLFNBQTFCLEVBQXFDO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBTWhDLGVBQWVnQyxVQUFVakMsUUFBVixDQUFtQmtDLElBQW5CLEVBQXJCO0FBQ0EsVUFBTUMsd0JBQXdCbEMsYUFBYU8sTUFBYixDQUM1QkQsV0FBV0EsUUFBUUssV0FBUixDQUFvQkMsTUFBcEIsS0FBK0IsQ0FEZCxDQUE5QjtBQUdBLFVBQU11QiwyQkFBMkJuQyxhQUFhTyxNQUFiLENBQy9CRCxXQUFXLENBQUNBLFFBQVFLLFdBQVIsQ0FBb0JDLE1BQXJCLEtBQWdDLENBRFosQ0FBakM7O0FBSUEsVUFBTSxFQUFFYixRQUFGLEtBQWUsS0FBS2lCLEtBQTFCO0FBQ0EsUUFBSWhCLGFBQWFZLE1BQWIsR0FBc0JiLFNBQVNhLE1BQW5DLEVBQTJDO0FBQ3pDO0FBQ0EsV0FBS3pCLE1BQUwsQ0FBWTZDLFNBQVo7QUFDRCxLQUhELE1BR08sSUFBSWhDLGFBQWFZLE1BQWIsSUFBdUJiLFNBQVNhLE1BQXBDLEVBQTRDO0FBQ2pELFlBQU13QixrQkFBa0Isc0JBQWFyQyxRQUFiLEVBQXVCQyxZQUF2QixFQUFxQyxJQUFyQyxDQUF4QjtBQUNBLFlBQU1xQyxrQkFBa0Isc0JBQWFyQyxZQUFiLEVBQTJCRCxRQUEzQixFQUFxQyxJQUFyQyxDQUF4QjtBQUNBLFVBQ0VzQyxnQkFBZ0J6QixNQUFoQixJQUNBd0IsZ0JBQWdCeEIsTUFBaEIsS0FBMkJiLFNBQVNhLE1BQVQsR0FBa0JaLGFBQWFZLE1BRjVELEVBR0U7QUFDQSxhQUFLekIsTUFBTCxDQUFZNkMsU0FBWjtBQUNELE9BTEQsTUFLTztBQUNMO0FBQ0E7QUFDQTtBQUNBLGNBQU1NLHFCQUFxQixLQUFLeEMscUJBQUwsQ0FDekJDLFFBRHlCLEVBRXpCQyxZQUZ5QixDQUEzQjtBQUlBO0FBQ0EsWUFBSXNDLG1CQUFtQmxDLEtBQXZCLEVBQThCO0FBQzVCLGVBQUtqQixNQUFMLENBQVk2QyxTQUFaO0FBQ0QsU0FGRCxNQUVPLElBQUlJLGdCQUFnQnhCLE1BQWhCLElBQTBCMEIsbUJBQW1CakMsT0FBakQsRUFBMEQ7QUFDL0QsZ0JBQU11QixZQUFZLEtBQUtGLFlBQUwsQ0FBa0JRLHFCQUFsQixDQUFsQjtBQUNBLGdCQUFNSyxvQkFBb0IsS0FBS0Msb0JBQUwsQ0FDeEJMLHdCQUR3QixDQUExQjtBQUdBLGdCQUFNbEIsWUFBWSxLQUFLSCxZQUFMLENBQWtCZCxZQUFsQixDQUFsQjs7QUFFQSxlQUFLeUMsUUFBTCxDQUNFO0FBQ0UxQyxzQkFBVUMsWUFEWjtBQUVFZSxtQkFBT0UsU0FGVDtBQUdFVSxtQkFBT0MsU0FIVDtBQUlFVztBQUpGLFdBREYsRUFPRSxNQUFNLEtBQUtHLFdBQUwsRUFQUjtBQVNELFNBaEJNLE1BZ0JBO0FBQ0w7QUFDQSxlQUFLRCxRQUFMLENBQWMsRUFBRTFDLFVBQVVDLFlBQVosRUFBZCxFQUEwQyxNQUFNLEtBQUswQyxXQUFMLEVBQWhEO0FBQ0Q7QUFDRjtBQUNGO0FBQ0Y7O0FBRURGLHVCQUFxQkcsb0JBQXJCLEVBQTJDO0FBQ3pDLFdBQU9BLHFCQUFxQkMsR0FBckIsQ0FBeUIsQ0FBQ0MsbUJBQUQsRUFBc0JDLEtBQXRCLEtBQWdDO0FBQzlELFlBQU1DLFVBQVUsS0FBS0MsVUFBTCxFQUFoQjtBQUNBLFlBQU1DLElBQUlKLG9CQUFvQkssUUFBcEIsR0FDTkgsUUFBUUksS0FBUixHQUFnQixvQkFBVUMsUUFBVixDQUFtQkQsS0FEN0IsR0FFTixDQUFDLG9CQUFVQyxRQUFWLENBQW1CRCxLQUFuQixHQUEyQixFQUE1QixJQUFrQ0wsS0FGdEM7O0FBSUEsYUFBTztBQUNMdEMsWUFBSXFDLG9CQUFvQnJDLEVBRG5CO0FBRUx5QyxTQUZLO0FBR0xJLFdBQUc7QUFIRSxPQUFQO0FBS0QsS0FYTSxDQUFQO0FBWUQ7O0FBRUQ5RCxlQUFhK0QsR0FBYixFQUFrQjtBQUNoQixTQUFLbkUsTUFBTCxDQUFZLEtBQUtDLEtBQWpCO0FBQ0E7QUFDRDs7QUFFREQsU0FBT0MsS0FBUCxFQUFjO0FBQ1o7QUFDQSxVQUFNVyxXQUFXWCxNQUFNVyxRQUFOLENBQWVrQyxJQUFmLEVBQWpCO0FBQ0EsVUFBTXNCLG9CQUFvQnhELFNBQVNRLE1BQVQsQ0FBZ0JELFdBQVdBLFFBQVFLLFdBQVIsQ0FBb0JDLE1BQXBCLEtBQStCLENBQTFELENBQTFCO0FBQ0EsVUFBTStCLHVCQUF1QjVDLFNBQVNRLE1BQVQsQ0FBZ0JELFdBQVcsQ0FBQ0EsUUFBUUssV0FBUixDQUFvQkMsTUFBckIsS0FBZ0MsQ0FBM0QsQ0FBN0I7QUFDQSxVQUFNbUMsVUFBVSxLQUFLQyxVQUFMLEVBQWhCOztBQUVBLFVBQU0sRUFBRXJCLEtBQUYsRUFBU1osS0FBVCxFQUFnQnlDLFVBQWhCLEtBQStCLGtDQUNuQ0QsaUJBRG1DLEVBRW5DUixPQUZtQyxDQUFyQztBQUlBLFVBQU1SLG9CQUFvQixLQUFLQyxvQkFBTCxDQUEwQkcsb0JBQTFCLENBQTFCOztBQUVBLFNBQUtGLFFBQUwsQ0FDRTtBQUNFRix1QkFERjtBQUVFWixXQUZGO0FBR0VaLFdBSEY7QUFJRXlDLGdCQUpGO0FBS0V6RDtBQUxGLEtBREYsRUFRRSxNQUFNO0FBQ0osV0FBSzJDLFdBQUw7QUFDRCxLQVZIO0FBWUQ7O0FBRURNLGVBQWE7QUFDWCxRQUFJUyxTQUFTQyxjQUFULENBQXdCLGNBQXhCLENBQUosRUFBNkM7QUFDM0MsYUFBT0QsU0FBU0MsY0FBVCxDQUF3QixjQUF4QixFQUF3Q0MscUJBQXhDLEVBQVA7QUFDRDs7QUFFRCxVQUFNQyxjQUNKbkUsT0FBT29FLFVBQVAsSUFDQUosU0FBU0ssZUFBVCxDQUF5QkMsV0FEekIsSUFFQU4sU0FBU08sSUFBVCxDQUFjRCxXQUhoQjs7QUFLQSxXQUFPO0FBQ0xaLGFBQU9TLGNBQWMsSUFBSSxFQURwQjtBQUVMSyxjQUFRO0FBRkgsS0FBUDtBQUlEOztBQUVEQyx3QkFBc0JqQixDQUF0QixFQUF5QkksQ0FBekIsRUFBNEJjLFFBQTVCLEVBQXNDQyxXQUFXLEtBQWpELEVBQXdEO0FBQ3RELFVBQU1yQixVQUFVLEtBQUtDLFVBQUwsRUFBaEI7O0FBRUE7Ozs7QUFJQSxRQUFJQyxJQUFJa0IsU0FBU0UsS0FBVCxHQUFpQixDQUF6QixFQUE0QjtBQUMxQnBCLFVBQUlrQixTQUFTRSxLQUFULEdBQWlCLENBQXJCO0FBQ0QsS0FGRCxNQUVPLElBQUlwQixJQUFJRixRQUFRSSxLQUFSLEdBQWdCZ0IsU0FBU0csSUFBekIsR0FBZ0MsQ0FBeEMsRUFBMkM7QUFDaERyQixVQUFJRixRQUFRSSxLQUFSLEdBQWdCZ0IsU0FBU0csSUFBekIsR0FBZ0MsQ0FBcEM7QUFDRDs7QUFFRCxRQUFJakIsSUFBSSxDQUFDYyxTQUFTSSxHQUFWLEdBQWdCLENBQXhCLEVBQTJCO0FBQ3pCbEIsVUFBSSxDQUFDYyxTQUFTSSxHQUFWLEdBQWdCLENBQXBCO0FBQ0QsS0FGRCxNQUVPLElBQUlsQixJQUFJTixRQUFRa0IsTUFBUixHQUFpQkUsU0FBU0ssTUFBMUIsR0FBbUMsQ0FBM0MsRUFBOEM7QUFDbkRuQixVQUFJTixRQUFRa0IsTUFBUixHQUFpQkUsU0FBU0ssTUFBMUIsR0FBbUMsQ0FBdkM7QUFDRDs7QUFFRCxXQUFPO0FBQ0x2QixPQURLO0FBRUxJO0FBRkssS0FBUDtBQUlEOztBQUVEb0IsV0FBU0MsTUFBVCxFQUFpQjtBQUNmLFdBQU8sS0FBSzFELEtBQUwsQ0FBV1csS0FBWCxDQUFpQjFCLE1BQWpCLENBQ0wsQ0FBQzBFLEdBQUQsRUFBTUMsT0FBTixFQUFlOUIsS0FBZixLQUEwQjhCLFFBQVFwRSxFQUFSLEtBQWVrRSxNQUFmLEdBQXdCRSxPQUF4QixHQUFrQ0QsR0FEdkQsRUFFTCxFQUZLLENBQVA7QUFJRDs7QUFFREUsNkJBQTJCSCxNQUEzQixFQUFtQ1AsUUFBbkMsRUFBNkNDLFdBQVcsS0FBeEQsRUFBK0Q7QUFDN0QsVUFBTXZDLE9BQU8sS0FBSzRDLFFBQUwsQ0FBY0MsTUFBZCxDQUFiO0FBQ0EsV0FBTyxLQUFLUixxQkFBTCxDQUEyQnJDLEtBQUtvQixDQUFoQyxFQUFtQ3BCLEtBQUt3QixDQUF4QyxFQUEyQ2MsUUFBM0MsRUFBcURDLFFBQXJELENBQVA7QUFDRDs7QUFFRFUsOEJBQTRCSixNQUE1QixFQUFvQztBQUNsQyxXQUFPLEtBQUsxRCxLQUFMLENBQVd1QixpQkFBWCxDQUNKaEMsTUFESSxDQUNHd0UsT0FBT0EsSUFBSXZFLEVBQUosS0FBV2tFLE1BRHJCLEVBRUpqRSxLQUZJLEVBQVA7QUFHRDs7QUFFRHVFLGVBQWFDLFNBQWIsRUFBd0JQLE1BQXhCLEVBQWdDO0FBQzlCLFdBQU9PLFVBQVUxRSxNQUFWLENBQWlCMkUsWUFBWUEsU0FBUzFFLEVBQVQsS0FBZ0JrRSxNQUE3QyxFQUFxRGpFLEtBQXJELEVBQVA7QUFDRDs7QUFFRDBFLGNBQVlDLFFBQVosRUFBc0JWLFNBQVMsSUFBL0IsRUFBcUNXLFdBQVcsRUFBaEQsRUFBb0Q7QUFDbEQsU0FBS0MsUUFBTCxHQUFnQjtBQUNkRixjQURjO0FBRWRWLFlBRmM7QUFHZFc7QUFIYyxLQUFoQjtBQUtEOztBQUVERSxXQUFTO0FBQ1AsVUFBTSxFQUFFQyxtQkFBRixFQUF1QkMsZ0JBQXZCLEtBQTRDLEtBQUtyRyxLQUF2RDs7QUFFQSxVQUFNLEVBQUV1QyxLQUFGLEVBQVNaLEtBQVQsRUFBZ0JoQixRQUFoQixLQUE2QixLQUFLaUIsS0FBeEM7O0FBRUEsVUFBTWlFLFlBQVlsRixTQUFTNkMsR0FBVCxDQUFhLENBQUN0QyxPQUFELEVBQVV3QyxLQUFWLEtBQW9CO0FBQ2pELFlBQU1xQixXQUFXLDRCQUFZN0QsT0FBWixDQUFqQjtBQUNBLFlBQU1vRixlQUFlcEYsUUFBUUssV0FBUixDQUFvQkMsTUFBcEIsS0FBK0IsQ0FBL0IsR0FDakIsS0FBS2lFLDBCQUFMLENBQ0V2RSxRQUFRRSxFQURWLEVBRUUyRCxRQUZGLEVBR0U3RCxRQUFROEQsUUFIVixDQURpQixHQU1qQixLQUFLVSwyQkFBTCxDQUFpQ3hFLFFBQVFFLEVBQXpDLENBTko7O0FBUUEsK0JBQ0tGLE9BREwsRUFFS29GLFlBRkw7QUFHRXZCO0FBSEY7QUFLRCxLQWZpQixDQUFsQjs7QUFpQkEsVUFBTXdCLFlBQVk1RSxNQUNmNkIsR0FEZSxDQUNYLENBQUMxQixJQUFELEVBQU80QixLQUFQLE1BQWtCO0FBQ3JCMUIsY0FBUSxLQUFLNEQsWUFBTCxDQUFrQkMsU0FBbEIsRUFBNkIvRCxLQUFLRSxNQUFMLENBQVlaLEVBQXpDLENBRGE7QUFFckJjLGNBQVEsS0FBSzBELFlBQUwsQ0FBa0JDLFNBQWxCLEVBQTZCL0QsS0FBS0ksTUFBTCxDQUFZZCxFQUF6QztBQUZhLEtBQWxCLENBRFcsRUFLZm9DLEdBTGUsQ0FLWCxDQUFDZ0QsUUFBRCxFQUFXOUMsS0FBWCxLQUFxQjtBQUN4QixhQUFPLG9DQUFvQjhDLFFBQXBCLEVBQThCOUMsS0FBOUIsQ0FBUDtBQUNELEtBUGUsQ0FBbEI7O0FBU0EsVUFBTStDLGNBQWMsQ0FBQ3ZDLEdBQUQsRUFBTW9CLE1BQU4sS0FBaUI7QUFDbkM7O0FBRUEsWUFBTXpCLElBQUlLLElBQUl3QyxjQUFKLEdBQXFCeEMsSUFBSXdDLGNBQUosQ0FBbUIsQ0FBbkIsRUFBc0JDLEtBQTNDLEdBQW1EekMsSUFBSTBDLE9BQWpFO0FBQ0EsWUFBTTNDLElBQUlDLElBQUl3QyxjQUFKLEdBQXFCeEMsSUFBSXdDLGNBQUosQ0FBbUIsQ0FBbkIsRUFBc0JHLEtBQTNDLEdBQW1EM0MsSUFBSTRDLE9BQWpFOztBQUVBLFdBQUtmLFdBQUwsQ0FBaUIsSUFBakIsRUFBdUJULE1BQXZCLEVBQStCO0FBQzdCekIsU0FENkI7QUFFN0JJO0FBRjZCLE9BQS9CO0FBSUQsS0FWRDs7QUFZQSxVQUFNOEMsYUFBYTdDLE9BQU87QUFDeEIsVUFBSSxLQUFLZ0MsUUFBTCxJQUFpQixLQUFLQSxRQUFMLENBQWNGLFFBQW5DLEVBQTZDO0FBQzNDLGNBQU1uQyxJQUFJSyxJQUFJd0MsY0FBSixHQUNOeEMsSUFBSXdDLGNBQUosQ0FBbUIsQ0FBbkIsRUFBc0JDLEtBRGhCLEdBRU56QyxJQUFJMEMsT0FGUjtBQUdBLGNBQU0zQyxJQUFJQyxJQUFJd0MsY0FBSixHQUNOeEMsSUFBSXdDLGNBQUosQ0FBbUIsQ0FBbkIsRUFBc0JHLEtBRGhCLEdBRU4zQyxJQUFJNEMsT0FGUjs7QUFJQSxjQUFNRSxTQUFTO0FBQ2JuRCxhQUFHQSxJQUFJLEtBQUtxQyxRQUFMLENBQWNELFFBQWQsQ0FBdUJwQyxDQURqQjtBQUViSSxhQUFHQSxJQUFJLEtBQUtpQyxRQUFMLENBQWNELFFBQWQsQ0FBdUJoQztBQUZqQixTQUFmOztBQUtBLGNBQU1nRCxZQUFZMUUsTUFBTWlCLEdBQU4sQ0FBVSxDQUFDZ0MsT0FBRCxFQUFVOUIsS0FBVixLQUFvQjtBQUM5QyxjQUFJOEIsUUFBUXBFLEVBQVIsS0FBZSxLQUFLOEUsUUFBTCxDQUFjWixNQUFqQyxFQUF5QztBQUN2QyxxQ0FDS0UsT0FETDtBQUVFM0IsaUJBQUcyQixRQUFRM0IsQ0FBUixHQUFZbUQsT0FBT25ELENBRnhCO0FBR0VJLGlCQUFHdUIsUUFBUXZCLENBQVIsR0FBWStDLE9BQU8vQztBQUh4QjtBQUtEO0FBQ0QsbUNBQ0t1QixPQURMO0FBR0QsU0FYaUIsQ0FBbEI7O0FBYUEsYUFBS25DLFFBQUwsQ0FDRTtBQUNFZCxpQkFBTzBFO0FBRFQsU0FERixFQUlFLE1BQU0sS0FBSzNELFdBQUwsRUFKUjs7QUFPQSxhQUFLeUMsV0FBTCxDQUFpQixJQUFqQixFQUF1QixLQUFLRyxRQUFMLENBQWNaLE1BQXJDLEVBQTZDO0FBQzNDekIsV0FEMkM7QUFFM0NJO0FBRjJDLFNBQTdDO0FBSUQ7QUFDRixLQXZDRDs7QUF5Q0EsVUFBTWlELFlBQVloRCxPQUFPO0FBQ3ZCLFdBQUs2QixXQUFMLENBQWlCLEtBQWpCO0FBQ0QsS0FGRDs7QUFJQSxVQUFNb0IsZUFBZSxDQUFDQyxDQUFELEVBQUkxRCxLQUFKLEtBQ25CO0FBQ0UsV0FBS0EsS0FEUDtBQUVFLFlBQU0wRCxDQUZSO0FBR0UsYUFBTzFELEtBSFQ7QUFJRSxtQkFBYStDLFdBSmY7QUFLRSx3QkFBa0JKLGdCQUxwQjtBQU1FLHNCQUFnQkQsbUJBTmxCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BREY7O0FBV0EsVUFBTWlCLGVBQWUsQ0FBQ0MsQ0FBRCxFQUFJNUQsS0FBSixLQUNuQixnREFBYyxLQUFLQSxLQUFuQixFQUEwQixNQUFNNEQsQ0FBaEMsRUFBbUMsT0FBTzVELEtBQTFDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQURGOztBQUlBLFVBQU02RCxvQkFBb0IsQ0FBQ0QsQ0FBRCxFQUFJNUQsS0FBSixLQUN4QixpREFBbUIsS0FBS0EsS0FBeEIsRUFBK0IsTUFBTTRELENBQXJDLEVBQXdDLE9BQU81RCxLQUEvQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFERjs7QUFJQSxVQUFNOEQsZ0JBQ0osS0FBS3RCLFFBQUwsSUFBaUIsS0FBS0EsUUFBTCxDQUFjRixRQUEvQixHQUNJSCxVQUNHMUUsTUFESCxDQUNVLENBQUNpRyxDQUFELEVBQUkxRCxLQUFKLEtBQWMwRCxFQUFFaEcsRUFBRixLQUFTLEtBQUs4RSxRQUFMLENBQWNaLE1BRC9DLEVBRUc5QixHQUZILENBRU8sQ0FBQzRELENBQUQsRUFBSTFELEtBQUosS0FBY3lELGFBQWFDLENBQWIsRUFBZ0IxRCxLQUFoQixDQUZyQixDQURKLEdBSUltQyxVQUFVckMsR0FBVixDQUFjLENBQUM0RCxDQUFELEVBQUkxRCxLQUFKLEtBQWN5RCxhQUFhQyxDQUFiLEVBQWdCMUQsS0FBaEIsQ0FBNUIsQ0FMTjs7QUFPQSxVQUFNK0QsZ0JBQWdCbEIsVUFBVS9DLEdBQVYsQ0FBYyxDQUFDOEQsQ0FBRCxFQUFJNUQsS0FBSixLQUFjMkQsYUFBYUMsQ0FBYixFQUFnQjVELEtBQWhCLENBQTVCLENBQXRCOztBQUVBLFVBQU1nRSxxQkFDSixLQUFLeEIsUUFBTCxJQUFpQixLQUFLQSxRQUFMLENBQWNGLFFBQS9CLEdBQ0lPLFVBQ0dwRixNQURILENBQ1UsQ0FBQ21HLENBQUQsRUFBSTVELEtBQUosS0FBYzRELEVBQUVwRixNQUFGLENBQVNkLEVBQVQsS0FBZ0IsS0FBSzhFLFFBQUwsQ0FBY1osTUFEdEQsRUFFRzlCLEdBRkgsQ0FFTyxDQUFDOEQsQ0FBRCxFQUFJNUQsS0FBSixLQUFjNkQsa0JBQWtCRCxDQUFsQixFQUFxQjVELEtBQXJCLENBRnJCLENBREosR0FJSTZDLFVBQVUvQyxHQUFWLENBQWMsQ0FBQzhELENBQUQsRUFBSTVELEtBQUosS0FBYzZELGtCQUFrQkQsQ0FBbEIsRUFBcUI1RCxLQUFyQixDQUE1QixDQUxOOztBQU9BLFVBQU1pRSxXQUNKLENBQUMsS0FBS3pCLFFBQU4sSUFBa0IsQ0FBQyxLQUFLQSxRQUFMLENBQWNGLFFBQWpDLEdBQ0ksSUFESixHQUVJbUIsYUFDRXRCLFVBQVVoRixNQUFWLENBQWlCLENBQUM4RyxRQUFELEVBQVdQLENBQVgsRUFBYzFELEtBQWQsS0FBd0I7QUFDdkMsVUFBSTBELEVBQUVoRyxFQUFGLEtBQVMsS0FBSzhFLFFBQUwsQ0FBY1osTUFBM0IsRUFBbUM7QUFDakMsZUFBTzhCLENBQVA7QUFDRDtBQUNELGFBQU9PLFFBQVA7QUFDRCxLQUxELEVBS0csRUFMSCxDQURGLENBSE47O0FBWUEsVUFBTUMsZ0JBQ0osQ0FBQyxLQUFLMUIsUUFBTixJQUNBLENBQUMsS0FBS0EsUUFBTCxDQUFjRixRQURmLElBRUEwQixtQkFBbUJsRyxNQUFuQixLQUE4QmlHLGNBQWNqRyxNQUY1QyxHQUdJLElBSEosR0FJSStGLGtCQUNFaEIsVUFBVTFGLE1BQVYsQ0FBaUIsQ0FBQytHLGFBQUQsRUFBZ0JOLENBQWhCLEVBQW1CNUQsS0FBbkIsS0FBNkI7QUFDNUMsVUFBSTRELEVBQUVwRixNQUFGLENBQVNkLEVBQVQsS0FBZ0IsS0FBSzhFLFFBQUwsQ0FBY1osTUFBbEMsRUFBMEM7QUFDeEMsZUFBT2dDLENBQVA7QUFDRDtBQUNELGFBQU9NLGFBQVA7QUFDRCxLQUxELEVBS0csRUFMSCxDQURGLENBTE47O0FBY0EsV0FDRTtBQUFDLGVBQUQ7QUFBQTtBQUNFLHFCQUFhYixVQURmO0FBRUUscUJBQWFBLFVBRmY7QUFHRSxtQkFBV0csU0FIYjtBQUlFLG9CQUFZQSxTQUpkO0FBS0UsdUJBQWVBLFNBTGpCO0FBTUUsWUFBRyxjQU5MO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBUUU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUlNO0FBQUosT0FSRjtBQVNFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFJQztBQUFKLE9BVEY7QUFVRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBSUM7QUFBSixPQVZGO0FBV0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUlDO0FBQUosT0FYRjtBQVlFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFJQztBQUFKO0FBWkYsS0FERjtBQWdCRDtBQXphb0M7O0FBNGF2Q2hJLFNBQVNpSSxTQUFULEdBQXFCO0FBQ25CekIsdUJBQXFCLG9CQUFVMEIsSUFEWjtBQUVuQnpCLG9CQUFrQixvQkFBVXlCLElBRlQ7QUFHbkJuSCxZQUFVLG9CQUFVb0g7QUFIRCxDQUFyQjs7a0JBTWVuSSxRIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFN2ZyB9IGZyb20gJ25vcm1hbGl6ZWQtc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBkaWZmZXJlbmNlIGZyb20gJ2xvZGFzaC5kaWZmZXJlbmNlJztcbmltcG9ydCBkaWZmZXJlbmNlQnkgZnJvbSAnbG9kYXNoLmRpZmZlcmVuY2VieSc7XG5cbmltcG9ydCBDb25zdGFudHMgZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgY3JlYXRlU2ltdWxhdGlvbiB9IGZyb20gJy4vc2ltdWxhdGlvbic7XG5pbXBvcnQgVG9wb2xvZ3lOb2RlIGZyb20gJy4vbm9kZSc7XG5pbXBvcnQgVG9wb2xvZ3lMaW5rIGZyb20gJy4vbGluayc7XG5pbXBvcnQgVG9wb2xvZ3lMaW5rQXJyb3cgZnJvbSAnLi9saW5rL2Fycm93JztcbmltcG9ydCB7IGdldE5vZGVSZWN0LCBjYWxjdWxhdGVMaW5lTGF5b3V0IH0gZnJvbSAnLi9mdW5jdGlvbnMnO1xuXG5jb25zdCBTdHlsZWRTdmcgPSBTdmcuZXh0ZW5kYFxuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAwcHg7XG4gIGZvbnQtZmFtaWx5OiBhcmlhbDtcbmA7XG5cbmNsYXNzIFRvcG9sb2d5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIHRoaXMuY3JlYXRlKHRoaXMucHJvcHMpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5ib3VuZFJlc2l6ZSA9IHRoaXMuaGFuZGxlUmVzaXplLmJpbmQodGhpcyk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuYm91bmRSZXNpemUpO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuYm91bmRSZXNpemUpO1xuICB9XG5cbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldENoYW5nZWRDb25uZWN0aW9ucyhzZXJ2aWNlcywgbmV4dFNlcnZpY2VzKSB7XG4gICAgcmV0dXJuIG5leHRTZXJ2aWNlcy5yZWR1Y2UoKGNoYW5nZWQsIG5leHRTZXJ2aWNlKSA9PiB7XG4gICAgICBpZiAoY2hhbmdlZC5hZGRlZCB8fCBjaGFuZ2VkLnJlbW92ZWQpIHtcbiAgICAgICAgcmV0dXJuIGNoYW5nZWQ7XG4gICAgICB9XG4gICAgICBjb25zdCBzZXJ2aWNlID0gc2VydmljZXNcbiAgICAgICAgLmZpbHRlcihzZXJ2aWNlID0+IHNlcnZpY2UuaWQgPT09IG5leHRTZXJ2aWNlLmlkKVxuICAgICAgICAuc2hpZnQoKTtcbiAgICAgIGNvbnN0IGNvbm5lY3Rpb25zQWRkZWQgPSBkaWZmZXJlbmNlKFxuICAgICAgICBuZXh0U2VydmljZS5jb25uZWN0aW9ucyxcbiAgICAgICAgc2VydmljZS5jb25uZWN0aW9uc1xuICAgICAgKS5sZW5ndGg7XG4gICAgICAvLyB0aGVyZSdzIGEgbmV3IGNvbm5lY3Rpb24sIHdlIG5lZWQgdG8gcmVkcmF3XG4gICAgICBpZiAoY29ubmVjdGlvbnNBZGRlZCkge1xuICAgICAgICByZXR1cm4geyBhZGRlZDogdHJ1ZSB9O1xuICAgICAgfVxuICAgICAgY29uc3QgY29ubmVjdGlvbnNSZW1vdmVkID0gZGlmZmVyZW5jZShcbiAgICAgICAgc2VydmljZS5jb25uZWN0aW9ucyxcbiAgICAgICAgbmV4dFNlcnZpY2UuY29ubmVjdGlvbnNcbiAgICAgICkubGVuZ3RoO1xuICAgICAgLy8gd2UnbGwgbmVlZCB0byByZW1vdmUgdGhlIG9mZmVuZGluZyBjb25uZWN0aW9ucyBmcm9tIGxpbmtzXG4gICAgICBpZiAoY29ubmVjdGlvbnNSZW1vdmVkKSB7XG4gICAgICAgIHJldHVybiB7IHJlbW92ZWQ6IHRydWUgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjaGFuZ2VkO1xuICAgIH0sIHt9KTtcbiAgfVxuXG4gIGdldE5leHRMaW5rcyhuZXh0U2VydmljZXMpIHtcbiAgICBjb25zdCBsaW5rcyA9IHRoaXMuc3RhdGUubGlua3M7XG4gICAgcmV0dXJuIGxpbmtzLnJlZHVjZSgobmV4dExpbmtzLCBsaW5rKSA9PiB7XG4gICAgICBjb25zdCBzb3VyY2VFeGlzdHMgPSBuZXh0U2VydmljZXMuZmlsdGVyKFxuICAgICAgICBuZXh0U2VydmljZSA9PiBuZXh0U2VydmljZS5pZCA9PT0gbGluay5zb3VyY2UuaWRcbiAgICAgICk7XG4gICAgICBpZiAoc291cmNlRXhpc3RzLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBzb3VyY2UgPSBzb3VyY2VFeGlzdHMuc2hpZnQoKTtcbiAgICAgICAgY29uc3QgdGFyZ2V0RXhpc3RzID0gbmV4dFNlcnZpY2VzLmZpbHRlcihcbiAgICAgICAgICBuZXh0U2VydmljZSA9PiBuZXh0U2VydmljZS5pZCA9PT0gbGluay50YXJnZXQuaWRcbiAgICAgICAgKS5sZW5ndGg7XG4gICAgICAgIGNvbnN0IGNvbm5lY3Rpb25FeGlzdHMgPSBzb3VyY2UuY29ubmVjdGlvbnMuZmlsdGVyKFxuICAgICAgICAgIGNvbm5lY3Rpb24gPT4gY29ubmVjdGlvbiA9PT0gbGluay50YXJnZXQuaWRcbiAgICAgICAgKS5sZW5ndGg7XG4gICAgICAgIGlmICh0YXJnZXRFeGlzdHMgJiYgY29ubmVjdGlvbkV4aXN0cykge1xuICAgICAgICAgIG5leHRMaW5rcy5wdXNoKGxpbmspO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV4dExpbmtzO1xuICAgIH0sIFtdKTtcbiAgfVxuXG4gIGdldE5leHROb2RlcyhuZXh0U2VydmljZXMpIHtcbiAgICBjb25zdCBub2RlcyA9IHRoaXMuc3RhdGUubm9kZXM7XG4gICAgLy8gbGV0IG5vdENvbm5lY3RlZFggPSAwO1xuICAgIHJldHVybiBub2Rlcy5yZWR1Y2UoKG5leHROb2Rlcywgbm9kZSkgPT4ge1xuICAgICAgY29uc3Qga2VlcCA9IG5leHRTZXJ2aWNlcy5maWx0ZXIoXG4gICAgICAgIG5leHRTZXJ2aWNlID0+IG5leHRTZXJ2aWNlLmlkID09PSBub2RlLmlkXG4gICAgICApLmxlbmd0aDtcbiAgICAgIGlmIChrZWVwKSB7XG4gICAgICAgIG5leHROb2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5leHROb2RlcztcbiAgICB9LCBbXSk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgIC8vIGlmIHdlIHJlbW92ZSBhIG5vZGUsIGl0IHNob3VsZCBqdXN0IGJlIHJlbW92ZWQgZnJvbSB0aGUgc2ltdWxhdGlvbiBub2RlcyBhbmQgbGlua3NcbiAgICAvLyBpZiB3ZSBhZGQgYSBub2RlLCB0aGVuIHdlIHNob3VsZCByZWNyZWF0ZSB0aGUgZGFtbiB0aGluZ1xuICAgIC8vIG9uIG90aGVyIHVwZGF0ZXMsIHdlIHNob3VsZCB1cGRhdGUgdGhlIHNlcnZpY2VzIG9uIHRoZSBzdGF0ZSBhbmQgdGhhdCdzIGl0XG4gICAgLy8gd2Ugc2hvdWxkIGZvcmNlVXBkYXRlIG9uY2UgdGhlIHN0YXRlIGhhcyBiZWVuIHVwZGF0ZWRcbiAgICBjb25zdCBuZXh0U2VydmljZXMgPSBuZXh0UHJvcHMuc2VydmljZXMuc29ydCgpO1xuICAgIGNvbnN0IGNvbm5lY3RlZE5leHRTZXJ2aWNlcyA9IG5leHRTZXJ2aWNlcy5maWx0ZXIoXG4gICAgICBzZXJ2aWNlID0+IHNlcnZpY2UuY29ubmVjdGlvbnMubGVuZ3RoICE9PSAwXG4gICAgKTtcbiAgICBjb25zdCBub3RDb25uZWN0ZWROZXh0U2VydmljZXMgPSBuZXh0U2VydmljZXMuZmlsdGVyKFxuICAgICAgc2VydmljZSA9PiAhc2VydmljZS5jb25uZWN0aW9ucy5sZW5ndGggIT09IDBcbiAgICApO1xuXG4gICAgY29uc3QgeyBzZXJ2aWNlcyB9ID0gdGhpcy5zdGF0ZTtcbiAgICBpZiAobmV4dFNlcnZpY2VzLmxlbmd0aCA+IHNlcnZpY2VzLmxlbmd0aCkge1xuICAgICAgLy8gbmV3IHNlcnZpY2UgYWRkZWQsIHdlIG5lZWQgdG8gcmVkcmF3XG4gICAgICB0aGlzLmNyZWF0ZShuZXh0UHJvcHMpO1xuICAgIH0gZWxzZSBpZiAobmV4dFNlcnZpY2VzLmxlbmd0aCA8PSBzZXJ2aWNlcy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IHNlcnZpY2VzUmVtb3ZlZCA9IGRpZmZlcmVuY2VCeShzZXJ2aWNlcywgbmV4dFNlcnZpY2VzLCAnaWQnKTtcbiAgICAgIGNvbnN0IHNlcnZpY2VzQ2hhbmdlZCA9IGRpZmZlcmVuY2VCeShuZXh0U2VydmljZXMsIHNlcnZpY2VzLCAnaWQnKTtcbiAgICAgIGlmIChcbiAgICAgICAgc2VydmljZXNDaGFuZ2VkLmxlbmd0aCB8fFxuICAgICAgICBzZXJ2aWNlc1JlbW92ZWQubGVuZ3RoICE9PSBzZXJ2aWNlcy5sZW5ndGggLSBuZXh0U2VydmljZXMubGVuZ3RoXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5jcmVhdGUobmV4dFByb3BzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGNoZWNrIHdoZXRoZXIgdGhlcmUgYXJlIG5ldyBjb25uZWN0aW9ucy4gaWYgc28sIHdlIG5lZWQgdG8gcmVkcmF3XG4gICAgICAgIC8vIGlmIHdlIGp1c3QgZHJvcHBlZCBvbmUsIHdlIG5lZWQgdG8gcmVtb3ZlIGl0IGZyb20gbGlua3NcbiAgICAgICAgLy8gY29tcGFyaXNvbiB0byB5aWVsZCAzIHBvc3NpYmxlIG91dGNvbWVzOyBubyBjaGFuZ2UsIGFkZGVkLCBkcm9wcGVkXG4gICAgICAgIGNvbnN0IGNoYW5nZWRDb25uZWN0aW9ucyA9IHRoaXMuZ2V0Q2hhbmdlZENvbm5lY3Rpb25zKFxuICAgICAgICAgIHNlcnZpY2VzLFxuICAgICAgICAgIG5leHRTZXJ2aWNlc1xuICAgICAgICApO1xuICAgICAgICAvLyBpZiBjb25uZWN0aW9ucyBhcmUgYWRkZWQsIHdlJ2xsIG5lZWQgdG8gcmVkcmF3XG4gICAgICAgIGlmIChjaGFuZ2VkQ29ubmVjdGlvbnMuYWRkZWQpIHtcbiAgICAgICAgICB0aGlzLmNyZWF0ZShuZXh0UHJvcHMpO1xuICAgICAgICB9IGVsc2UgaWYgKHNlcnZpY2VzUmVtb3ZlZC5sZW5ndGggfHwgY2hhbmdlZENvbm5lY3Rpb25zLnJlbW92ZWQpIHtcbiAgICAgICAgICBjb25zdCBuZXh0Tm9kZXMgPSB0aGlzLmdldE5leHROb2Rlcyhjb25uZWN0ZWROZXh0U2VydmljZXMpO1xuICAgICAgICAgIGNvbnN0IG5vdENvbm5lY3RlZE5vZGVzID0gdGhpcy5nZXROb3RDb25uZWN0ZWROb2RlcyhcbiAgICAgICAgICAgIG5vdENvbm5lY3RlZE5leHRTZXJ2aWNlc1xuICAgICAgICAgICk7XG4gICAgICAgICAgY29uc3QgbmV4dExpbmtzID0gdGhpcy5nZXROZXh0TGlua3MobmV4dFNlcnZpY2VzKTtcblxuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHNlcnZpY2VzOiBuZXh0U2VydmljZXMsXG4gICAgICAgICAgICAgIGxpbmtzOiBuZXh0TGlua3MsXG4gICAgICAgICAgICAgIG5vZGVzOiBuZXh0Tm9kZXMsXG4gICAgICAgICAgICAgIG5vdENvbm5lY3RlZE5vZGVzXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKCkgPT4gdGhpcy5mb3JjZVVwZGF0ZSgpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyB3ZSd2ZSBnb3QgdGhlIHNhbWUgc2VydmljZXMsIG5vIGxpbmtzIGNoYW5nZWQsIHNvIHdlIGp1c3QgbmVlZCB0byBzZXQgdGhlbSB0byB0aGUgc3RhdGVcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VydmljZXM6IG5leHRTZXJ2aWNlcyB9LCAoKSA9PiB0aGlzLmZvcmNlVXBkYXRlKCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0Tm90Q29ubmVjdGVkTm9kZXMobm90Q29ubmVjdGVkU2VydmljZXMpIHtcbiAgICByZXR1cm4gbm90Q29ubmVjdGVkU2VydmljZXMubWFwKChub3RDb25uZWN0ZWRTZXJ2aWNlLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3Qgc3ZnU2l6ZSA9IHRoaXMuZ2V0U3ZnU2l6ZSgpO1xuICAgICAgY29uc3QgeCA9IG5vdENvbm5lY3RlZFNlcnZpY2UuaXNDb25zdWxcbiAgICAgICAgPyBzdmdTaXplLndpZHRoIC0gQ29uc3RhbnRzLm5vZGVTaXplLndpZHRoXG4gICAgICAgIDogKENvbnN0YW50cy5ub2RlU2l6ZS53aWR0aCArIDEwKSAqIGluZGV4O1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBpZDogbm90Q29ubmVjdGVkU2VydmljZS5pZCxcbiAgICAgICAgeCxcbiAgICAgICAgeTogMFxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZVJlc2l6ZShldnQpIHtcbiAgICB0aGlzLmNyZWF0ZSh0aGlzLnByb3BzKTtcbiAgICAvLyByZXNpemUgc2hvdWxkIGp1c3QgcmVqaWcgdGhlIHBvc2l0aW9uc1xuICB9XG5cbiAgY3JlYXRlKHByb3BzKSB7XG4gICAgLy8gb3RoZXIgdXBkYXRlcyBzaG91bGQgYWxzbyBqdXN0IHVwZGF0ZSB0aGUgc2VydmljZXMgcmF0aGVyIHRoYW4gcmVjcmVhdGUgdGhlIHNpbXVsYXRpb25cbiAgICBjb25zdCBzZXJ2aWNlcyA9IHByb3BzLnNlcnZpY2VzLnNvcnQoKTtcbiAgICBjb25zdCBjb25uZWN0ZWRTZXJ2aWNlcyA9IHNlcnZpY2VzLmZpbHRlcihzZXJ2aWNlID0+IHNlcnZpY2UuY29ubmVjdGlvbnMubGVuZ3RoICE9PSAwKTtcbiAgICBjb25zdCBub3RDb25uZWN0ZWRTZXJ2aWNlcyA9IHNlcnZpY2VzLmZpbHRlcihzZXJ2aWNlID0+ICFzZXJ2aWNlLmNvbm5lY3Rpb25zLmxlbmd0aCAhPT0gMCk7XG4gICAgY29uc3Qgc3ZnU2l6ZSA9IHRoaXMuZ2V0U3ZnU2l6ZSgpO1xuXG4gICAgY29uc3QgeyBub2RlcywgbGlua3MsIHNpbXVsYXRpb24gfSA9IGNyZWF0ZVNpbXVsYXRpb24oXG4gICAgICBjb25uZWN0ZWRTZXJ2aWNlcyxcbiAgICAgIHN2Z1NpemVcbiAgICApO1xuICAgIGNvbnN0IG5vdENvbm5lY3RlZE5vZGVzID0gdGhpcy5nZXROb3RDb25uZWN0ZWROb2Rlcyhub3RDb25uZWN0ZWRTZXJ2aWNlcyk7XG5cbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAge1xuICAgICAgICBub3RDb25uZWN0ZWROb2RlcyxcbiAgICAgICAgbm9kZXMsXG4gICAgICAgIGxpbmtzLFxuICAgICAgICBzaW11bGF0aW9uLFxuICAgICAgICBzZXJ2aWNlc1xuICAgICAgfSxcbiAgICAgICgpID0+IHtcbiAgICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBnZXRTdmdTaXplKCkge1xuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9wb2xvZ3ktc3ZnJykpIHtcbiAgICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9wb2xvZ3ktc3ZnJykuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgfVxuXG4gICAgY29uc3Qgd2luZG93V2lkdGggPVxuICAgICAgd2luZG93LmlubmVyV2lkdGggfHxcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCB8fFxuICAgICAgZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aDtcblxuICAgIHJldHVybiB7XG4gICAgICB3aWR0aDogd2luZG93V2lkdGggLSAyICogMjQsXG4gICAgICBoZWlnaHQ6IDEwMDBcbiAgICB9O1xuICB9XG5cbiAgY29uc3RyYWluTm9kZVBvc2l0aW9uKHgsIHksIG5vZGVSZWN0LCBjaGlsZHJlbiA9IGZhbHNlKSB7XG4gICAgY29uc3Qgc3ZnU2l6ZSA9IHRoaXMuZ2V0U3ZnU2l6ZSgpO1xuXG4gICAgLyogY29uc3Qgbm9kZVJlY3QgPSBjaGlsZHJlblxuICAgICAgPyBDb25zdGFudHMubm9kZVJlY3RXaXRoQ2hpbGRyZW5cbiAgICAgIDogQ29uc3RhbnRzLm5vZGVSZWN0OyAqL1xuXG4gICAgaWYgKHggPCBub2RlUmVjdC5yaWdodCArIDIpIHtcbiAgICAgIHggPSBub2RlUmVjdC5yaWdodCArIDI7XG4gICAgfSBlbHNlIGlmICh4ID4gc3ZnU2l6ZS53aWR0aCArIG5vZGVSZWN0LmxlZnQgLSAyKSB7XG4gICAgICB4ID0gc3ZnU2l6ZS53aWR0aCArIG5vZGVSZWN0LmxlZnQgLSAyO1xuICAgIH1cblxuICAgIGlmICh5IDwgLW5vZGVSZWN0LnRvcCArIDIpIHtcbiAgICAgIHkgPSAtbm9kZVJlY3QudG9wICsgMjtcbiAgICB9IGVsc2UgaWYgKHkgPiBzdmdTaXplLmhlaWdodCAtIG5vZGVSZWN0LmJvdHRvbSAtIDIpIHtcbiAgICAgIHkgPSBzdmdTaXplLmhlaWdodCAtIG5vZGVSZWN0LmJvdHRvbSAtIDI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHgsXG4gICAgICB5XG4gICAgfTtcbiAgfVxuXG4gIGZpbmROb2RlKG5vZGVJZCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLm5vZGVzLnJlZHVjZShcbiAgICAgIChhY2MsIHNpbU5vZGUsIGluZGV4KSA9PiAoc2ltTm9kZS5pZCA9PT0gbm9kZUlkID8gc2ltTm9kZSA6IGFjYyksXG4gICAgICB7fVxuICAgICk7XG4gIH1cblxuICBnZXRDb25zdHJhaW5lZE5vZGVQb3NpdGlvbihub2RlSWQsIG5vZGVSZWN0LCBjaGlsZHJlbiA9IGZhbHNlKSB7XG4gICAgY29uc3Qgbm9kZSA9IHRoaXMuZmluZE5vZGUobm9kZUlkKTtcbiAgICByZXR1cm4gdGhpcy5jb25zdHJhaW5Ob2RlUG9zaXRpb24obm9kZS54LCBub2RlLnksIG5vZGVSZWN0LCBjaGlsZHJlbik7XG4gIH1cblxuICBnZXROb3RDb25uZWN0ZWROb2RlUG9zaXRpb24obm9kZUlkKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUubm90Q29ubmVjdGVkTm9kZXNcbiAgICAgIC5maWx0ZXIobmNuID0+IG5jbi5pZCA9PT0gbm9kZUlkKVxuICAgICAgLnNoaWZ0KCk7XG4gIH1cblxuICBmaW5kTm9kZURhdGEobm9kZXNEYXRhLCBub2RlSWQpIHtcbiAgICByZXR1cm4gbm9kZXNEYXRhLmZpbHRlcihub2RlRGF0YSA9PiBub2RlRGF0YS5pZCA9PT0gbm9kZUlkKS5zaGlmdCgpO1xuICB9XG5cbiAgc2V0RHJhZ0luZm8oZHJhZ2dpbmcsIG5vZGVJZCA9IG51bGwsIHBvc2l0aW9uID0ge30pIHtcbiAgICB0aGlzLmRyYWdJbmZvID0ge1xuICAgICAgZHJhZ2dpbmcsXG4gICAgICBub2RlSWQsXG4gICAgICBwb3NpdGlvblxuICAgIH07XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBvblF1aWNrQWN0aW9uc0NsaWNrLCBvbk5vZGVUaXRsZUNsaWNrIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgeyBub2RlcywgbGlua3MsIHNlcnZpY2VzIH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgY29uc3Qgbm9kZXNEYXRhID0gc2VydmljZXMubWFwKChzZXJ2aWNlLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3Qgbm9kZVJlY3QgPSBnZXROb2RlUmVjdChzZXJ2aWNlKTtcbiAgICAgIGNvbnN0IG5vZGVQb3NpdGlvbiA9IHNlcnZpY2UuY29ubmVjdGlvbnMubGVuZ3RoICE9PSAwXG4gICAgICAgID8gdGhpcy5nZXRDb25zdHJhaW5lZE5vZGVQb3NpdGlvbihcbiAgICAgICAgICAgIHNlcnZpY2UuaWQsXG4gICAgICAgICAgICBub2RlUmVjdCxcbiAgICAgICAgICAgIHNlcnZpY2UuY2hpbGRyZW5cbiAgICAgICAgICApXG4gICAgICAgIDogdGhpcy5nZXROb3RDb25uZWN0ZWROb2RlUG9zaXRpb24oc2VydmljZS5pZCk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnNlcnZpY2UsXG4gICAgICAgIC4uLm5vZGVQb3NpdGlvbixcbiAgICAgICAgbm9kZVJlY3RcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICBjb25zdCBsaW5rc0RhdGEgPSBsaW5rc1xuICAgICAgLm1hcCgobGluaywgaW5kZXgpID0+ICh7XG4gICAgICAgIHNvdXJjZTogdGhpcy5maW5kTm9kZURhdGEobm9kZXNEYXRhLCBsaW5rLnNvdXJjZS5pZCksXG4gICAgICAgIHRhcmdldDogdGhpcy5maW5kTm9kZURhdGEobm9kZXNEYXRhLCBsaW5rLnRhcmdldC5pZClcbiAgICAgIH0pKVxuICAgICAgLm1hcCgobGlua0RhdGEsIGluZGV4KSA9PiB7XG4gICAgICAgIHJldHVybiBjYWxjdWxhdGVMaW5lTGF5b3V0KGxpbmtEYXRhLCBpbmRleCk7XG4gICAgICB9KTtcblxuICAgIGNvbnN0IG9uRHJhZ1N0YXJ0ID0gKGV2dCwgbm9kZUlkKSA9PiB7XG4gICAgICAvLyBJdCdzIHRoaXMgbm9kZSdzIHBvc2l0aW9uIHRoYXQgd2UnbGwgbmVlZCB0byB1cGRhdGVcblxuICAgICAgY29uc3QgeCA9IGV2dC5jaGFuZ2VkVG91Y2hlcyA/IGV2dC5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWCA6IGV2dC5jbGllbnRYO1xuICAgICAgY29uc3QgeSA9IGV2dC5jaGFuZ2VkVG91Y2hlcyA/IGV2dC5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWSA6IGV2dC5jbGllbnRZO1xuXG4gICAgICB0aGlzLnNldERyYWdJbmZvKHRydWUsIG5vZGVJZCwge1xuICAgICAgICB4LFxuICAgICAgICB5XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25EcmFnTW92ZSA9IGV2dCA9PiB7XG4gICAgICBpZiAodGhpcy5kcmFnSW5mbyAmJiB0aGlzLmRyYWdJbmZvLmRyYWdnaW5nKSB7XG4gICAgICAgIGNvbnN0IHggPSBldnQuY2hhbmdlZFRvdWNoZXNcbiAgICAgICAgICA/IGV2dC5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWFxuICAgICAgICAgIDogZXZ0LmNsaWVudFg7XG4gICAgICAgIGNvbnN0IHkgPSBldnQuY2hhbmdlZFRvdWNoZXNcbiAgICAgICAgICA/IGV2dC5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWVxuICAgICAgICAgIDogZXZ0LmNsaWVudFk7XG5cbiAgICAgICAgY29uc3Qgb2Zmc2V0ID0ge1xuICAgICAgICAgIHg6IHggLSB0aGlzLmRyYWdJbmZvLnBvc2l0aW9uLngsXG4gICAgICAgICAgeTogeSAtIHRoaXMuZHJhZ0luZm8ucG9zaXRpb24ueVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGRyYWdOb2RlcyA9IG5vZGVzLm1hcCgoc2ltTm9kZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICBpZiAoc2ltTm9kZS5pZCA9PT0gdGhpcy5kcmFnSW5mby5ub2RlSWQpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIC4uLnNpbU5vZGUsXG4gICAgICAgICAgICAgIHg6IHNpbU5vZGUueCArIG9mZnNldC54LFxuICAgICAgICAgICAgICB5OiBzaW1Ob2RlLnkgKyBvZmZzZXQueVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnNpbU5vZGVcbiAgICAgICAgICB9O1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5vZGVzOiBkcmFnTm9kZXNcbiAgICAgICAgICB9LFxuICAgICAgICAgICgpID0+IHRoaXMuZm9yY2VVcGRhdGUoKVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuc2V0RHJhZ0luZm8odHJ1ZSwgdGhpcy5kcmFnSW5mby5ub2RlSWQsIHtcbiAgICAgICAgICB4LFxuICAgICAgICAgIHlcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IG9uRHJhZ0VuZCA9IGV2dCA9PiB7XG4gICAgICB0aGlzLnNldERyYWdJbmZvKGZhbHNlKTtcbiAgICB9O1xuXG4gICAgY29uc3QgcmVuZGVyZWROb2RlID0gKG4sIGluZGV4KSA9PiAoXG4gICAgICA8VG9wb2xvZ3lOb2RlXG4gICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgIGRhdGE9e259XG4gICAgICAgIGluZGV4PXtpbmRleH1cbiAgICAgICAgb25EcmFnU3RhcnQ9e29uRHJhZ1N0YXJ0fVxuICAgICAgICBvbk5vZGVUaXRsZUNsaWNrPXtvbk5vZGVUaXRsZUNsaWNrfVxuICAgICAgICBvblF1aWNrQWN0aW9ucz17b25RdWlja0FjdGlvbnNDbGlja31cbiAgICAgIC8+XG4gICAgKTtcblxuICAgIGNvbnN0IHJlbmRlcmVkTGluayA9IChsLCBpbmRleCkgPT4gKFxuICAgICAgPFRvcG9sb2d5TGluayBrZXk9e2luZGV4fSBkYXRhPXtsfSBpbmRleD17aW5kZXh9IC8+XG4gICAgKTtcblxuICAgIGNvbnN0IHJlbmRlcmVkTGlua0Fycm93ID0gKGwsIGluZGV4KSA9PiAoXG4gICAgICA8VG9wb2xvZ3lMaW5rQXJyb3cga2V5PXtpbmRleH0gZGF0YT17bH0gaW5kZXg9e2luZGV4fSAvPlxuICAgICk7XG5cbiAgICBjb25zdCByZW5kZXJlZE5vZGVzID1cbiAgICAgIHRoaXMuZHJhZ0luZm8gJiYgdGhpcy5kcmFnSW5mby5kcmFnZ2luZ1xuICAgICAgICA/IG5vZGVzRGF0YVxuICAgICAgICAgICAgLmZpbHRlcigobiwgaW5kZXgpID0+IG4uaWQgIT09IHRoaXMuZHJhZ0luZm8ubm9kZUlkKVxuICAgICAgICAgICAgLm1hcCgobiwgaW5kZXgpID0+IHJlbmRlcmVkTm9kZShuLCBpbmRleCkpXG4gICAgICAgIDogbm9kZXNEYXRhLm1hcCgobiwgaW5kZXgpID0+IHJlbmRlcmVkTm9kZShuLCBpbmRleCkpO1xuXG4gICAgY29uc3QgcmVuZGVyZWRMaW5rcyA9IGxpbmtzRGF0YS5tYXAoKGwsIGluZGV4KSA9PiByZW5kZXJlZExpbmsobCwgaW5kZXgpKTtcblxuICAgIGNvbnN0IHJlbmRlcmVkTGlua0Fycm93cyA9XG4gICAgICB0aGlzLmRyYWdJbmZvICYmIHRoaXMuZHJhZ0luZm8uZHJhZ2dpbmdcbiAgICAgICAgPyBsaW5rc0RhdGFcbiAgICAgICAgICAgIC5maWx0ZXIoKGwsIGluZGV4KSA9PiBsLnRhcmdldC5pZCAhPT0gdGhpcy5kcmFnSW5mby5ub2RlSWQpXG4gICAgICAgICAgICAubWFwKChsLCBpbmRleCkgPT4gcmVuZGVyZWRMaW5rQXJyb3cobCwgaW5kZXgpKVxuICAgICAgICA6IGxpbmtzRGF0YS5tYXAoKGwsIGluZGV4KSA9PiByZW5kZXJlZExpbmtBcnJvdyhsLCBpbmRleCkpO1xuXG4gICAgY29uc3QgZHJhZ05vZGUgPVxuICAgICAgIXRoaXMuZHJhZ0luZm8gfHwgIXRoaXMuZHJhZ0luZm8uZHJhZ2dpbmdcbiAgICAgICAgPyBudWxsXG4gICAgICAgIDogcmVuZGVyZWROb2RlKFxuICAgICAgICAgICAgbm9kZXNEYXRhLnJlZHVjZSgoZHJhZ05vZGUsIG4sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgIGlmIChuLmlkID09PSB0aGlzLmRyYWdJbmZvLm5vZGVJZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBkcmFnTm9kZTtcbiAgICAgICAgICAgIH0sIHt9KVxuICAgICAgICAgICk7XG5cbiAgICBjb25zdCBkcmFnTGlua0Fycm93ID1cbiAgICAgICF0aGlzLmRyYWdJbmZvIHx8XG4gICAgICAhdGhpcy5kcmFnSW5mby5kcmFnZ2luZyB8fFxuICAgICAgcmVuZGVyZWRMaW5rQXJyb3dzLmxlbmd0aCA9PT0gcmVuZGVyZWRMaW5rcy5sZW5ndGhcbiAgICAgICAgPyBudWxsXG4gICAgICAgIDogcmVuZGVyZWRMaW5rQXJyb3coXG4gICAgICAgICAgICBsaW5rc0RhdGEucmVkdWNlKChkcmFnTGlua0Fycm93LCBsLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICBpZiAobC50YXJnZXQuaWQgPT09IHRoaXMuZHJhZ0luZm8ubm9kZUlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGw7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIGRyYWdMaW5rQXJyb3c7XG4gICAgICAgICAgICB9LCB7fSlcbiAgICAgICAgICApO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxTdHlsZWRTdmdcbiAgICAgICAgb25Nb3VzZU1vdmU9e29uRHJhZ01vdmV9XG4gICAgICAgIG9uVG91Y2hNb3ZlPXtvbkRyYWdNb3ZlfVxuICAgICAgICBvbk1vdXNlVXA9e29uRHJhZ0VuZH1cbiAgICAgICAgb25Ub3VjaEVuZD17b25EcmFnRW5kfVxuICAgICAgICBvblRvdWNoQ2FuY2VsPXtvbkRyYWdFbmR9XG4gICAgICAgIGlkPVwidG9wb2xvZ3ktc3ZnXCJcbiAgICAgID5cbiAgICAgICAgPGc+e3JlbmRlcmVkTm9kZXN9PC9nPlxuICAgICAgICA8Zz57cmVuZGVyZWRMaW5rc308L2c+XG4gICAgICAgIDxnPntyZW5kZXJlZExpbmtBcnJvd3N9PC9nPlxuICAgICAgICA8Zz57ZHJhZ05vZGV9PC9nPlxuICAgICAgICA8Zz57ZHJhZ0xpbmtBcnJvd308L2c+XG4gICAgICA8L1N0eWxlZFN2Zz5cbiAgICApO1xuICB9XG59XG5cblRvcG9sb2d5LnByb3BUeXBlcyA9IHtcbiAgb25RdWlja0FjdGlvbnNDbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uTm9kZVRpdGxlQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICBzZXJ2aWNlczogUHJvcFR5cGVzLmFycmF5XG59O1xuXG5leHBvcnQgZGVmYXVsdCBUb3BvbG9neTtcblxuZXhwb3J0IHsgZGVmYXVsdCBhcyBUb3BvbG9neU5vZGUgfSBmcm9tICcuL25vZGUnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBUb3BvbG9neUxpbmsgfSBmcm9tICcuL2xpbmsnO1xuIl19