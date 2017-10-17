var _jsxFileName = 'src/index.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  width: 100%;\n  height: 1000px;\n  font-family: arial;\n'], ['\n  width: 100%;\n  height: 1000px;\n  font-family: arial;\n']);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React from 'react';
import { Svg } from 'normalized-styled-components';
import PropTypes from 'prop-types';
import difference from 'lodash.difference';
import differenceBy from 'lodash.differenceby';

import Constants from './constants';
import { createSimulation } from './simulation';
import TopologyNode from './node';
import TopologyLink from './link';
import TopologyLinkArrow from './link/arrow';
import { getNodeRect, calculateLineLayout } from './functions';

var StyledSvg = Svg.extend(_templateObject);

var Topology = function (_React$Component) {
  _inherits(Topology, _React$Component);

  function Topology() {
    _classCallCheck(this, Topology);

    return _possibleConstructorReturn(this, (Topology.__proto__ || Object.getPrototypeOf(Topology)).apply(this, arguments));
  }

  _createClass(Topology, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.create(this.props);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.boundResize = this.handleResize.bind(this);
      window.addEventListener('resize', this.boundResize);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.boundResize);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: 'getChangedConnections',
    value: function getChangedConnections(services, nextServices) {
      return nextServices.reduce(function (changed, nextService) {
        if (changed.added || changed.removed) {
          return changed;
        }
        var service = services.filter(function (service) {
          return service.id === nextService.id;
        }).shift();
        var connectionsAdded = difference(nextService.connections, service.connections).length;
        // there's a new connection, we need to redraw
        if (connectionsAdded) {
          return { added: true };
        }
        var connectionsRemoved = difference(service.connections, nextService.connections).length;
        // we'll need to remove the offending connections from links
        if (connectionsRemoved) {
          return { removed: true };
        }
        return changed;
      }, {});
    }
  }, {
    key: 'getNextLinks',
    value: function getNextLinks(nextServices) {
      var links = this.state.links;
      return links.reduce(function (nextLinks, link) {
        var sourceExists = nextServices.filter(function (nextService) {
          return nextService.id === link.source.id;
        });
        if (sourceExists.length) {
          var source = sourceExists.shift();
          var targetExists = nextServices.filter(function (nextService) {
            return nextService.id === link.target.id;
          }).length;
          var connectionExists = source.connections.filter(function (connection) {
            return connection === link.target.id;
          }).length;
          if (targetExists && connectionExists) {
            nextLinks.push(link);
          }
        }
        return nextLinks;
      }, []);
    }
  }, {
    key: 'getNextNodes',
    value: function getNextNodes(nextServices) {
      var nodes = this.state.nodes;
      // let notConnectedX = 0;
      return nodes.reduce(function (nextNodes, node) {
        var keep = nextServices.filter(function (nextService) {
          return nextService.id === node.id;
        }).length;
        if (keep) {
          nextNodes.push(node);
        }
        return nextNodes;
      }, []);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      // if we remove a node, it should just be removed from the simulation nodes and links
      // if we add a node, then we should recreate the damn thing
      // on other updates, we should update the services on the state and that's it
      // we should forceUpdate once the state has been updated
      var nextServices = nextProps.services.sort();
      var connectedNextServices = nextServices.filter(function (service) {
        return service.connections.length !== 0;
      });
      var notConnectedNextServices = nextServices.filter(function (service) {
        return !service.connections.length !== 0;
      });

      var services = this.state.services;

      if (nextServices.length > services.length) {
        // new service added, we need to redraw
        this.create(nextProps);
      } else if (nextServices.length <= services.length) {
        var servicesRemoved = differenceBy(services, nextServices, 'id');
        var servicesChanged = differenceBy(nextServices, services, 'id');
        if (servicesChanged.length || servicesRemoved.length !== services.length - nextServices.length) {
          this.create(nextProps);
        } else {
          // check whether there are new connections. if so, we need to redraw
          // if we just dropped one, we need to remove it from links
          // comparison to yield 3 possible outcomes; no change, added, dropped
          var changedConnections = this.getChangedConnections(services, nextServices);
          // if connections are added, we'll need to redraw
          if (changedConnections.added) {
            this.create(nextProps);
          } else if (servicesRemoved.length || changedConnections.removed) {
            var nextNodes = this.getNextNodes(connectedNextServices);
            var notConnectedNodes = this.getNotConnectedNodes(notConnectedNextServices);
            var nextLinks = this.getNextLinks(nextServices);

            this.setState({
              services: nextServices,
              links: nextLinks,
              nodes: nextNodes,
              notConnectedNodes: notConnectedNodes
            }, function () {
              return _this2.forceUpdate();
            });
          } else {
            // we've got the same services, no links changed, so we just need to set them to the state
            this.setState({ services: nextServices }, function () {
              return _this2.forceUpdate();
            });
          }
        }
      }
    }
  }, {
    key: 'getNotConnectedNodes',
    value: function getNotConnectedNodes(notConnectedServices) {
      var _this3 = this;

      return notConnectedServices.map(function (notConnectedService, index) {
        var svgSize = _this3.getSvgSize();
        var x = notConnectedService.isConsul ? svgSize.width - Constants.nodeSize.width : (Constants.nodeSize.width + 10) * index;

        return {
          id: notConnectedService.id,
          x: x,
          y: 0
        };
      });
    }
  }, {
    key: 'handleResize',
    value: function handleResize(evt) {
      this.create(this.props);
      // resize should just rejig the positions
    }
  }, {
    key: 'create',
    value: function create(props) {
      var _this4 = this;

      // other updates should also just update the services rather than recreate the simulation
      var services = props.services.sort();
      var connectedServices = services.filter(function (service) {
        return service.connections.length !== 0;
      });
      var notConnectedServices = services.filter(function (service) {
        return !service.connections.length !== 0;
      });
      var svgSize = this.getSvgSize();

      var _createSimulation = createSimulation(connectedServices, svgSize),
          nodes = _createSimulation.nodes,
          links = _createSimulation.links,
          simulation = _createSimulation.simulation;

      var notConnectedNodes = this.getNotConnectedNodes(notConnectedServices);

      this.setState({
        notConnectedNodes: notConnectedNodes,
        nodes: nodes,
        links: links,
        simulation: simulation,
        services: services
      }, function () {
        _this4.forceUpdate();
      });
    }
  }, {
    key: 'getSvgSize',
    value: function getSvgSize() {
      if (document.getElementById('topology-svg')) {
        return document.getElementById('topology-svg').getBoundingClientRect();
      }

      var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

      return {
        width: windowWidth - 2 * 24,
        height: 1000
      };
    }
  }, {
    key: 'constrainNodePosition',
    value: function constrainNodePosition(x, y, nodeRect) {
      var children = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      var svgSize = this.getSvgSize();

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
        x: x,
        y: y
      };
    }
  }, {
    key: 'findNode',
    value: function findNode(nodeId) {
      return this.state.nodes.reduce(function (acc, simNode, index) {
        return simNode.id === nodeId ? simNode : acc;
      }, {});
    }
  }, {
    key: 'getConstrainedNodePosition',
    value: function getConstrainedNodePosition(nodeId, nodeRect) {
      var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var node = this.findNode(nodeId);
      return this.constrainNodePosition(node.x, node.y, nodeRect, children);
    }
  }, {
    key: 'getNotConnectedNodePosition',
    value: function getNotConnectedNodePosition(nodeId) {
      return this.state.notConnectedNodes.filter(function (ncn) {
        return ncn.id === nodeId;
      }).shift();
    }
  }, {
    key: 'findNodeData',
    value: function findNodeData(nodesData, nodeId) {
      return nodesData.filter(function (nodeData) {
        return nodeData.id === nodeId;
      }).shift();
    }
  }, {
    key: 'setDragInfo',
    value: function setDragInfo(dragging) {
      var nodeId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var position = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      this.dragInfo = {
        dragging: dragging,
        nodeId: nodeId,
        position: position
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var _props = this.props,
          onQuickActionsClick = _props.onQuickActionsClick,
          onNodeTitleClick = _props.onNodeTitleClick;
      var _state = this.state,
          nodes = _state.nodes,
          links = _state.links,
          services = _state.services;


      var nodesData = services.map(function (service, index) {
        var nodeRect = getNodeRect(service);
        var nodePosition = service.connections.length !== 0 ? _this5.getConstrainedNodePosition(service.id, nodeRect, service.children) : _this5.getNotConnectedNodePosition(service.id);

        return Object.assign({}, service, nodePosition, {
          nodeRect: nodeRect
        });
      });

      var linksData = links.map(function (link, index) {
        return {
          source: _this5.findNodeData(nodesData, link.source.id),
          target: _this5.findNodeData(nodesData, link.target.id)
        };
      }).map(function (linkData, index) {
        return calculateLineLayout(linkData, index);
      });

      var onDragStart = function onDragStart(evt, nodeId) {
        // It's this node's position that we'll need to update

        var x = evt.changedTouches ? evt.changedTouches[0].pageX : evt.clientX;
        var y = evt.changedTouches ? evt.changedTouches[0].pageY : evt.clientY;

        _this5.setDragInfo(true, nodeId, {
          x: x,
          y: y
        });
      };

      var onDragMove = function onDragMove(evt) {
        if (_this5.dragInfo && _this5.dragInfo.dragging) {
          var x = evt.changedTouches ? evt.changedTouches[0].pageX : evt.clientX;
          var y = evt.changedTouches ? evt.changedTouches[0].pageY : evt.clientY;

          var offset = {
            x: x - _this5.dragInfo.position.x,
            y: y - _this5.dragInfo.position.y
          };

          var dragNodes = nodes.map(function (simNode, index) {
            if (simNode.id === _this5.dragInfo.nodeId) {
              return Object.assign({}, simNode, {
                x: simNode.x + offset.x,
                y: simNode.y + offset.y
              });
            }
            return Object.assign({}, simNode);
          });

          _this5.setState({
            nodes: dragNodes
          }, function () {
            return _this5.forceUpdate();
          });

          _this5.setDragInfo(true, _this5.dragInfo.nodeId, {
            x: x,
            y: y
          });
        }
      };

      var onDragEnd = function onDragEnd(evt) {
        _this5.setDragInfo(false);
      };

      var renderedNode = function renderedNode(n, index) {
        return React.createElement(TopologyNode, {
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
          __self: _this5
        });
      };

      var renderedLink = function renderedLink(l, index) {
        return React.createElement(TopologyLink, { key: index, data: l, index: index, __source: {
            fileName: _jsxFileName,
            lineNumber: 380
          },
          __self: _this5
        });
      };

      var renderedLinkArrow = function renderedLinkArrow(l, index) {
        return React.createElement(TopologyLinkArrow, { key: index, data: l, index: index, __source: {
            fileName: _jsxFileName,
            lineNumber: 384
          },
          __self: _this5
        });
      };

      var renderedNodes = this.dragInfo && this.dragInfo.dragging ? nodesData.filter(function (n, index) {
        return n.id !== _this5.dragInfo.nodeId;
      }).map(function (n, index) {
        return renderedNode(n, index);
      }) : nodesData.map(function (n, index) {
        return renderedNode(n, index);
      });

      var renderedLinks = linksData.map(function (l, index) {
        return renderedLink(l, index);
      });

      var renderedLinkArrows = this.dragInfo && this.dragInfo.dragging ? linksData.filter(function (l, index) {
        return l.target.id !== _this5.dragInfo.nodeId;
      }).map(function (l, index) {
        return renderedLinkArrow(l, index);
      }) : linksData.map(function (l, index) {
        return renderedLinkArrow(l, index);
      });

      var dragNode = !this.dragInfo || !this.dragInfo.dragging ? null : renderedNode(nodesData.reduce(function (dragNode, n, index) {
        if (n.id === _this5.dragInfo.nodeId) {
          return n;
        }
        return dragNode;
      }, {}));

      var dragLinkArrow = !this.dragInfo || !this.dragInfo.dragging || renderedLinkArrows.length === renderedLinks.length ? null : renderedLinkArrow(linksData.reduce(function (dragLinkArrow, l, index) {
        if (l.target.id === _this5.dragInfo.nodeId) {
          return l;
        }
        return dragLinkArrow;
      }, {}));

      return React.createElement(
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
        React.createElement(
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
        React.createElement(
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
        React.createElement(
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
        React.createElement(
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
        React.createElement(
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
  }]);

  return Topology;
}(React.Component);

Topology.propTypes = {
  onQuickActionsClick: PropTypes.func,
  onNodeTitleClick: PropTypes.func,
  services: PropTypes.array
};

export default Topology;

export { default as TopologyNode } from './node';
export { default as TopologyLink } from './link';
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIlN2ZyIsIlByb3BUeXBlcyIsImRpZmZlcmVuY2UiLCJkaWZmZXJlbmNlQnkiLCJDb25zdGFudHMiLCJjcmVhdGVTaW11bGF0aW9uIiwiVG9wb2xvZ3lOb2RlIiwiVG9wb2xvZ3lMaW5rIiwiVG9wb2xvZ3lMaW5rQXJyb3ciLCJnZXROb2RlUmVjdCIsImNhbGN1bGF0ZUxpbmVMYXlvdXQiLCJTdHlsZWRTdmciLCJleHRlbmQiLCJUb3BvbG9neSIsImNyZWF0ZSIsInByb3BzIiwiYm91bmRSZXNpemUiLCJoYW5kbGVSZXNpemUiLCJiaW5kIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJzZXJ2aWNlcyIsIm5leHRTZXJ2aWNlcyIsInJlZHVjZSIsImNoYW5nZWQiLCJuZXh0U2VydmljZSIsImFkZGVkIiwicmVtb3ZlZCIsInNlcnZpY2UiLCJmaWx0ZXIiLCJpZCIsInNoaWZ0IiwiY29ubmVjdGlvbnNBZGRlZCIsImNvbm5lY3Rpb25zIiwibGVuZ3RoIiwiY29ubmVjdGlvbnNSZW1vdmVkIiwibGlua3MiLCJzdGF0ZSIsIm5leHRMaW5rcyIsImxpbmsiLCJzb3VyY2VFeGlzdHMiLCJzb3VyY2UiLCJ0YXJnZXRFeGlzdHMiLCJ0YXJnZXQiLCJjb25uZWN0aW9uRXhpc3RzIiwiY29ubmVjdGlvbiIsInB1c2giLCJub2RlcyIsIm5leHROb2RlcyIsIm5vZGUiLCJrZWVwIiwibmV4dFByb3BzIiwic29ydCIsImNvbm5lY3RlZE5leHRTZXJ2aWNlcyIsIm5vdENvbm5lY3RlZE5leHRTZXJ2aWNlcyIsInNlcnZpY2VzUmVtb3ZlZCIsInNlcnZpY2VzQ2hhbmdlZCIsImNoYW5nZWRDb25uZWN0aW9ucyIsImdldENoYW5nZWRDb25uZWN0aW9ucyIsImdldE5leHROb2RlcyIsIm5vdENvbm5lY3RlZE5vZGVzIiwiZ2V0Tm90Q29ubmVjdGVkTm9kZXMiLCJnZXROZXh0TGlua3MiLCJzZXRTdGF0ZSIsImZvcmNlVXBkYXRlIiwibm90Q29ubmVjdGVkU2VydmljZXMiLCJtYXAiLCJub3RDb25uZWN0ZWRTZXJ2aWNlIiwiaW5kZXgiLCJzdmdTaXplIiwiZ2V0U3ZnU2l6ZSIsIngiLCJpc0NvbnN1bCIsIndpZHRoIiwibm9kZVNpemUiLCJ5IiwiZXZ0IiwiY29ubmVjdGVkU2VydmljZXMiLCJzaW11bGF0aW9uIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIndpbmRvd1dpZHRoIiwiaW5uZXJXaWR0aCIsImRvY3VtZW50RWxlbWVudCIsImNsaWVudFdpZHRoIiwiYm9keSIsImhlaWdodCIsIm5vZGVSZWN0IiwiY2hpbGRyZW4iLCJyaWdodCIsImxlZnQiLCJ0b3AiLCJib3R0b20iLCJub2RlSWQiLCJhY2MiLCJzaW1Ob2RlIiwiZmluZE5vZGUiLCJjb25zdHJhaW5Ob2RlUG9zaXRpb24iLCJuY24iLCJub2Rlc0RhdGEiLCJub2RlRGF0YSIsImRyYWdnaW5nIiwicG9zaXRpb24iLCJkcmFnSW5mbyIsIm9uUXVpY2tBY3Rpb25zQ2xpY2siLCJvbk5vZGVUaXRsZUNsaWNrIiwibm9kZVBvc2l0aW9uIiwiZ2V0Q29uc3RyYWluZWROb2RlUG9zaXRpb24iLCJnZXROb3RDb25uZWN0ZWROb2RlUG9zaXRpb24iLCJsaW5rc0RhdGEiLCJmaW5kTm9kZURhdGEiLCJsaW5rRGF0YSIsIm9uRHJhZ1N0YXJ0IiwiY2hhbmdlZFRvdWNoZXMiLCJwYWdlWCIsImNsaWVudFgiLCJwYWdlWSIsImNsaWVudFkiLCJzZXREcmFnSW5mbyIsIm9uRHJhZ01vdmUiLCJvZmZzZXQiLCJkcmFnTm9kZXMiLCJvbkRyYWdFbmQiLCJyZW5kZXJlZE5vZGUiLCJuIiwicmVuZGVyZWRMaW5rIiwibCIsInJlbmRlcmVkTGlua0Fycm93IiwicmVuZGVyZWROb2RlcyIsInJlbmRlcmVkTGlua3MiLCJyZW5kZXJlZExpbmtBcnJvd3MiLCJkcmFnTm9kZSIs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QkFBZUEsU0FMakI7QUFNRSxjQUFHLGNBTkw7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFRRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBSU07QUFBSixTQVJGO0FBU0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUlDO0FBQUosU0FURjtBQVVFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFJQztBQUFKLFNBVkY7QUFXRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBSUM7QUFBSixTQVhGO0FBWUU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUlDO0FBQUo7QUFaRixPQURGO0FBZ0JEOzs7O0VBemFvQnZJLE1BQU13SSxTOztBQTRhN0IxSCxTQUFTMkgsU0FBVCxHQUFxQjtBQUNuQjlCLHVCQUFxQnpHLFVBQVV3SSxJQURaO0FBRW5COUIsb0JBQWtCMUcsVUFBVXdJLElBRlQ7QUFHbkJuSCxZQUFVckIsVUFBVXlJO0FBSEQsQ0FBckI7O0FBTUEsZUFBZTdILFFBQWY7O0FBRUEsU0FBUzhILFdBQVdySSxZQUFwQixRQUF3QyxRQUF4QztBQUNBLFNBQVNxSSxXQUFXcEksWUFBcEIsUUFBd0MsUUFBeEMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgU3ZnIH0gZnJvbSAnbm9ybWFsaXplZC1zdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IGRpZmZlcmVuY2UgZnJvbSAnbG9kYXNoLmRpZmZlcmVuY2UnO1xuaW1wb3J0IGRpZmZlcmVuY2VCeSBmcm9tICdsb2Rhc2guZGlmZmVyZW5jZWJ5JztcblxuaW1wb3J0IENvbnN0YW50cyBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBjcmVhdGVTaW11bGF0aW9uIH0gZnJvbSAnLi9zaW11bGF0aW9uJztcbmltcG9ydCBUb3BvbG9neU5vZGUgZnJvbSAnLi9ub2RlJztcbmltcG9ydCBUb3BvbG9neUxpbmsgZnJvbSAnLi9saW5rJztcbmltcG9ydCBUb3BvbG9neUxpbmtBcnJvdyBmcm9tICcuL2xpbmsvYXJyb3cnO1xuaW1wb3J0IHsgZ2V0Tm9kZVJlY3QsIGNhbGN1bGF0ZUxpbmVMYXlvdXQgfSBmcm9tICcuL2Z1bmN0aW9ucyc7XG5cbmNvbnN0IFN0eWxlZFN2ZyA9IFN2Zy5leHRlbmRgXG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMDBweDtcbiAgZm9udC1mYW1pbHk6IGFyaWFsO1xuYDtcblxuY2xhc3MgVG9wb2xvZ3kgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgdGhpcy5jcmVhdGUodGhpcy5wcm9wcyk7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLmJvdW5kUmVzaXplID0gdGhpcy5oYW5kbGVSZXNpemUuYmluZCh0aGlzKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5ib3VuZFJlc2l6ZSk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5ib3VuZFJlc2l6ZSk7XG4gIH1cblxuICBzaG91bGRDb21wb25lbnRVcGRhdGUoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0Q2hhbmdlZENvbm5lY3Rpb25zKHNlcnZpY2VzLCBuZXh0U2VydmljZXMpIHtcbiAgICByZXR1cm4gbmV4dFNlcnZpY2VzLnJlZHVjZSgoY2hhbmdlZCwgbmV4dFNlcnZpY2UpID0+IHtcbiAgICAgIGlmIChjaGFuZ2VkLmFkZGVkIHx8IGNoYW5nZWQucmVtb3ZlZCkge1xuICAgICAgICByZXR1cm4gY2hhbmdlZDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHNlcnZpY2UgPSBzZXJ2aWNlc1xuICAgICAgICAuZmlsdGVyKHNlcnZpY2UgPT4gc2VydmljZS5pZCA9PT0gbmV4dFNlcnZpY2UuaWQpXG4gICAgICAgIC5zaGlmdCgpO1xuICAgICAgY29uc3QgY29ubmVjdGlvbnNBZGRlZCA9IGRpZmZlcmVuY2UoXG4gICAgICAgIG5leHRTZXJ2aWNlLmNvbm5lY3Rpb25zLFxuICAgICAgICBzZXJ2aWNlLmNvbm5lY3Rpb25zXG4gICAgICApLmxlbmd0aDtcbiAgICAgIC8vIHRoZXJlJ3MgYSBuZXcgY29ubmVjdGlvbiwgd2UgbmVlZCB0byByZWRyYXdcbiAgICAgIGlmIChjb25uZWN0aW9uc0FkZGVkKSB7XG4gICAgICAgIHJldHVybiB7IGFkZGVkOiB0cnVlIH07XG4gICAgICB9XG4gICAgICBjb25zdCBjb25uZWN0aW9uc1JlbW92ZWQgPSBkaWZmZXJlbmNlKFxuICAgICAgICBzZXJ2aWNlLmNvbm5lY3Rpb25zLFxuICAgICAgICBuZXh0U2VydmljZS5jb25uZWN0aW9uc1xuICAgICAgKS5sZW5ndGg7XG4gICAgICAvLyB3ZSdsbCBuZWVkIHRvIHJlbW92ZSB0aGUgb2ZmZW5kaW5nIGNvbm5lY3Rpb25zIGZyb20gbGlua3NcbiAgICAgIGlmIChjb25uZWN0aW9uc1JlbW92ZWQpIHtcbiAgICAgICAgcmV0dXJuIHsgcmVtb3ZlZDogdHJ1ZSB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNoYW5nZWQ7XG4gICAgfSwge30pO1xuICB9XG5cbiAgZ2V0TmV4dExpbmtzKG5leHRTZXJ2aWNlcykge1xuICAgIGNvbnN0IGxpbmtzID0gdGhpcy5zdGF0ZS5saW5rcztcbiAgICByZXR1cm4gbGlua3MucmVkdWNlKChuZXh0TGlua3MsIGxpbmspID0+IHtcbiAgICAgIGNvbnN0IHNvdXJjZUV4aXN0cyA9IG5leHRTZXJ2aWNlcy5maWx0ZXIoXG4gICAgICAgIG5leHRTZXJ2aWNlID0+IG5leHRTZXJ2aWNlLmlkID09PSBsaW5rLnNvdXJjZS5pZFxuICAgICAgKTtcbiAgICAgIGlmIChzb3VyY2VFeGlzdHMubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IHNvdXJjZUV4aXN0cy5zaGlmdCgpO1xuICAgICAgICBjb25zdCB0YXJnZXRFeGlzdHMgPSBuZXh0U2VydmljZXMuZmlsdGVyKFxuICAgICAgICAgIG5leHRTZXJ2aWNlID0+IG5leHRTZXJ2aWNlLmlkID09PSBsaW5rLnRhcmdldC5pZFxuICAgICAgICApLmxlbmd0aDtcbiAgICAgICAgY29uc3QgY29ubmVjdGlvbkV4aXN0cyA9IHNvdXJjZS5jb25uZWN0aW9ucy5maWx0ZXIoXG4gICAgICAgICAgY29ubmVjdGlvbiA9PiBjb25uZWN0aW9uID09PSBsaW5rLnRhcmdldC5pZFxuICAgICAgICApLmxlbmd0aDtcbiAgICAgICAgaWYgKHRhcmdldEV4aXN0cyAmJiBjb25uZWN0aW9uRXhpc3RzKSB7XG4gICAgICAgICAgbmV4dExpbmtzLnB1c2gobGluayk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXh0TGlua3M7XG4gICAgfSwgW10pO1xuICB9XG5cbiAgZ2V0TmV4dE5vZGVzKG5leHRTZXJ2aWNlcykge1xuICAgIGNvbnN0IG5vZGVzID0gdGhpcy5zdGF0ZS5ub2RlcztcbiAgICAvLyBsZXQgbm90Q29ubmVjdGVkWCA9IDA7XG4gICAgcmV0dXJuIG5vZGVzLnJlZHVjZSgobmV4dE5vZGVzLCBub2RlKSA9PiB7XG4gICAgICBjb25zdCBrZWVwID0gbmV4dFNlcnZpY2VzLmZpbHRlcihcbiAgICAgICAgbmV4dFNlcnZpY2UgPT4gbmV4dFNlcnZpY2UuaWQgPT09IG5vZGUuaWRcbiAgICAgICkubGVuZ3RoO1xuICAgICAgaWYgKGtlZXApIHtcbiAgICAgICAgbmV4dE5vZGVzLnB1c2gobm9kZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV4dE5vZGVzO1xuICAgIH0sIFtdKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgLy8gaWYgd2UgcmVtb3ZlIGEgbm9kZSwgaXQgc2hvdWxkIGp1c3QgYmUgcmVtb3ZlZCBmcm9tIHRoZSBzaW11bGF0aW9uIG5vZGVzIGFuZCBsaW5rc1xuICAgIC8vIGlmIHdlIGFkZCBhIG5vZGUsIHRoZW4gd2Ugc2hvdWxkIHJlY3JlYXRlIHRoZSBkYW1uIHRoaW5nXG4gICAgLy8gb24gb3RoZXIgdXBkYXRlcywgd2Ugc2hvdWxkIHVwZGF0ZSB0aGUgc2VydmljZXMgb24gdGhlIHN0YXRlIGFuZCB0aGF0J3MgaXRcbiAgICAvLyB3ZSBzaG91bGQgZm9yY2VVcGRhdGUgb25jZSB0aGUgc3RhdGUgaGFzIGJlZW4gdXBkYXRlZFxuICAgIGNvbnN0IG5leHRTZXJ2aWNlcyA9IG5leHRQcm9wcy5zZXJ2aWNlcy5zb3J0KCk7XG4gICAgY29uc3QgY29ubmVjdGVkTmV4dFNlcnZpY2VzID0gbmV4dFNlcnZpY2VzLmZpbHRlcihcbiAgICAgIHNlcnZpY2UgPT4gc2VydmljZS5jb25uZWN0aW9ucy5sZW5ndGggIT09IDBcbiAgICApO1xuICAgIGNvbnN0IG5vdENvbm5lY3RlZE5leHRTZXJ2aWNlcyA9IG5leHRTZXJ2aWNlcy5maWx0ZXIoXG4gICAgICBzZXJ2aWNlID0+ICFzZXJ2aWNlLmNvbm5lY3Rpb25zLmxlbmd0aCAhPT0gMFxuICAgICk7XG5cbiAgICBjb25zdCB7IHNlcnZpY2VzIH0gPSB0aGlzLnN0YXRlO1xuICAgIGlmIChuZXh0U2VydmljZXMubGVuZ3RoID4gc2VydmljZXMubGVuZ3RoKSB7XG4gICAgICAvLyBuZXcgc2VydmljZSBhZGRlZCwgd2UgbmVlZCB0byByZWRyYXdcbiAgICAgIHRoaXMuY3JlYXRlKG5leHRQcm9wcyk7XG4gICAgfSBlbHNlIGlmIChuZXh0U2VydmljZXMubGVuZ3RoIDw9IHNlcnZpY2VzLmxlbmd0aCkge1xuICAgICAgY29uc3Qgc2VydmljZXNSZW1vdmVkID0gZGlmZmVyZW5jZUJ5KHNlcnZpY2VzLCBuZXh0U2VydmljZXMsICdpZCcpO1xuICAgICAgY29uc3Qgc2VydmljZXNDaGFuZ2VkID0gZGlmZmVyZW5jZUJ5KG5leHRTZXJ2aWNlcywgc2VydmljZXMsICdpZCcpO1xuICAgICAgaWYgKFxuICAgICAgICBzZXJ2aWNlc0NoYW5nZWQubGVuZ3RoIHx8XG4gICAgICAgIHNlcnZpY2VzUmVtb3ZlZC5sZW5ndGggIT09IHNlcnZpY2VzLmxlbmd0aCAtIG5leHRTZXJ2aWNlcy5sZW5ndGhcbiAgICAgICkge1xuICAgICAgICB0aGlzLmNyZWF0ZShuZXh0UHJvcHMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gY2hlY2sgd2hldGhlciB0aGVyZSBhcmUgbmV3IGNvbm5lY3Rpb25zLiBpZiBzbywgd2UgbmVlZCB0byByZWRyYXdcbiAgICAgICAgLy8gaWYgd2UganVzdCBkcm9wcGVkIG9uZSwgd2UgbmVlZCB0byByZW1vdmUgaXQgZnJvbSBsaW5rc1xuICAgICAgICAvLyBjb21wYXJpc29uIHRvIHlpZWxkIDMgcG9zc2libGUgb3V0Y29tZXM7IG5vIGNoYW5nZSwgYWRkZWQsIGRyb3BwZWRcbiAgICAgICAgY29uc3QgY2hhbmdlZENvbm5lY3Rpb25zID0gdGhpcy5nZXRDaGFuZ2VkQ29ubmVjdGlvbnMoXG4gICAgICAgICAgc2VydmljZXMsXG4gICAgICAgICAgbmV4dFNlcnZpY2VzXG4gICAgICAgICk7XG4gICAgICAgIC8vIGlmIGNvbm5lY3Rpb25zIGFyZSBhZGRlZCwgd2UnbGwgbmVlZCB0byByZWRyYXdcbiAgICAgICAgaWYgKGNoYW5nZWRDb25uZWN0aW9ucy5hZGRlZCkge1xuICAgICAgICAgIHRoaXMuY3JlYXRlKG5leHRQcm9wcyk7XG4gICAgICAgIH0gZWxzZSBpZiAoc2VydmljZXNSZW1vdmVkLmxlbmd0aCB8fCBjaGFuZ2VkQ29ubmVjdGlvbnMucmVtb3ZlZCkge1xuICAgICAgICAgIGNvbnN0IG5leHROb2RlcyA9IHRoaXMuZ2V0TmV4dE5vZGVzKGNvbm5lY3RlZE5leHRTZXJ2aWNlcyk7XG4gICAgICAgICAgY29uc3Qgbm90Q29ubmVjdGVkTm9kZXMgPSB0aGlzLmdldE5vdENvbm5lY3RlZE5vZGVzKFxuICAgICAgICAgICAgbm90Q29ubmVjdGVkTmV4dFNlcnZpY2VzXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb25zdCBuZXh0TGlua3MgPSB0aGlzLmdldE5leHRMaW5rcyhuZXh0U2VydmljZXMpO1xuXG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc2VydmljZXM6IG5leHRTZXJ2aWNlcyxcbiAgICAgICAgICAgICAgbGlua3M6IG5leHRMaW5rcyxcbiAgICAgICAgICAgICAgbm9kZXM6IG5leHROb2RlcyxcbiAgICAgICAgICAgICAgbm90Q29ubmVjdGVkTm9kZXNcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoKSA9PiB0aGlzLmZvcmNlVXBkYXRlKClcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIHdlJ3ZlIGdvdCB0aGUgc2FtZSBzZXJ2aWNlcywgbm8gbGlua3MgY2hhbmdlZCwgc28gd2UganVzdCBuZWVkIHRvIHNldCB0aGVtIHRvIHRoZSBzdGF0ZVxuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZXJ2aWNlczogbmV4dFNlcnZpY2VzIH0sICgpID0+IHRoaXMuZm9yY2VVcGRhdGUoKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXROb3RDb25uZWN0ZWROb2Rlcyhub3RDb25uZWN0ZWRTZXJ2aWNlcykge1xuICAgIHJldHVybiBub3RDb25uZWN0ZWRTZXJ2aWNlcy5tYXAoKG5vdENvbm5lY3RlZFNlcnZpY2UsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBzdmdTaXplID0gdGhpcy5nZXRTdmdTaXplKCk7XG4gICAgICBjb25zdCB4ID0gbm90Q29ubmVjdGVkU2VydmljZS5pc0NvbnN1bFxuICAgICAgICA/IHN2Z1NpemUud2lkdGggLSBDb25zdGFudHMubm9kZVNpemUud2lkdGhcbiAgICAgICAgOiAoQ29uc3RhbnRzLm5vZGVTaXplLndpZHRoICsgMTApICogaW5kZXg7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlkOiBub3RDb25uZWN0ZWRTZXJ2aWNlLmlkLFxuICAgICAgICB4LFxuICAgICAgICB5OiAwXG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlUmVzaXplKGV2dCkge1xuICAgIHRoaXMuY3JlYXRlKHRoaXMucHJvcHMpO1xuICAgIC8vIHJlc2l6ZSBzaG91bGQganVzdCByZWppZyB0aGUgcG9zaXRpb25zXG4gIH1cblxuICBjcmVhdGUocHJvcHMpIHtcbiAgICAvLyBvdGhlciB1cGRhdGVzIHNob3VsZCBhbHNvIGp1c3QgdXBkYXRlIHRoZSBzZXJ2aWNlcyByYXRoZXIgdGhhbiByZWNyZWF0ZSB0aGUgc2ltdWxhdGlvblxuICAgIGNvbnN0IHNlcnZpY2VzID0gcHJvcHMuc2VydmljZXMuc29ydCgpO1xuICAgIGNvbnN0IGNvbm5lY3RlZFNlcnZpY2VzID0gc2VydmljZXMuZmlsdGVyKHNlcnZpY2UgPT4gc2VydmljZS5jb25uZWN0aW9ucy5sZW5ndGggIT09IDApO1xuICAgIGNvbnN0IG5vdENvbm5lY3RlZFNlcnZpY2VzID0gc2VydmljZXMuZmlsdGVyKHNlcnZpY2UgPT4gIXNlcnZpY2UuY29ubmVjdGlvbnMubGVuZ3RoICE9PSAwKTtcbiAgICBjb25zdCBzdmdTaXplID0gdGhpcy5nZXRTdmdTaXplKCk7XG5cbiAgICBjb25zdCB7IG5vZGVzLCBsaW5rcywgc2ltdWxhdGlvbiB9ID0gY3JlYXRlU2ltdWxhdGlvbihcbiAgICAgIGNvbm5lY3RlZFNlcnZpY2VzLFxuICAgICAgc3ZnU2l6ZVxuICAgICk7XG4gICAgY29uc3Qgbm90Q29ubmVjdGVkTm9kZXMgPSB0aGlzLmdldE5vdENvbm5lY3RlZE5vZGVzKG5vdENvbm5lY3RlZFNlcnZpY2VzKTtcblxuICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICB7XG4gICAgICAgIG5vdENvbm5lY3RlZE5vZGVzLFxuICAgICAgICBub2RlcyxcbiAgICAgICAgbGlua3MsXG4gICAgICAgIHNpbXVsYXRpb24sXG4gICAgICAgIHNlcnZpY2VzXG4gICAgICB9LFxuICAgICAgKCkgPT4ge1xuICAgICAgICB0aGlzLmZvcmNlVXBkYXRlKCk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIGdldFN2Z1NpemUoKSB7XG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b3BvbG9neS1zdmcnKSkge1xuICAgICAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b3BvbG9neS1zdmcnKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB9XG5cbiAgICBjb25zdCB3aW5kb3dXaWR0aCA9XG4gICAgICB3aW5kb3cuaW5uZXJXaWR0aCB8fFxuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIHx8XG4gICAgICBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHdpZHRoOiB3aW5kb3dXaWR0aCAtIDIgKiAyNCxcbiAgICAgIGhlaWdodDogMTAwMFxuICAgIH07XG4gIH1cblxuICBjb25zdHJhaW5Ob2RlUG9zaXRpb24oeCwgeSwgbm9kZVJlY3QsIGNoaWxkcmVuID0gZmFsc2UpIHtcbiAgICBjb25zdCBzdmdTaXplID0gdGhpcy5nZXRTdmdTaXplKCk7XG5cbiAgICAvKiBjb25zdCBub2RlUmVjdCA9IGNoaWxkcmVuXG4gICAgICA/IENvbnN0YW50cy5ub2RlUmVjdFdpdGhDaGlsZHJlblxuICAgICAgOiBDb25zdGFudHMubm9kZVJlY3Q7ICovXG5cbiAgICBpZiAoeCA8IG5vZGVSZWN0LnJpZ2h0ICsgMikge1xuICAgICAgeCA9IG5vZGVSZWN0LnJpZ2h0ICsgMjtcbiAgICB9IGVsc2UgaWYgKHggPiBzdmdTaXplLndpZHRoICsgbm9kZVJlY3QubGVmdCAtIDIpIHtcbiAgICAgIHggPSBzdmdTaXplLndpZHRoICsgbm9kZVJlY3QubGVmdCAtIDI7XG4gICAgfVxuXG4gICAgaWYgKHkgPCAtbm9kZVJlY3QudG9wICsgMikge1xuICAgICAgeSA9IC1ub2RlUmVjdC50b3AgKyAyO1xuICAgIH0gZWxzZSBpZiAoeSA+IHN2Z1NpemUuaGVpZ2h0IC0gbm9kZVJlY3QuYm90dG9tIC0gMikge1xuICAgICAgeSA9IHN2Z1NpemUuaGVpZ2h0IC0gbm9kZVJlY3QuYm90dG9tIC0gMjtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgeCxcbiAgICAgIHlcbiAgICB9O1xuICB9XG5cbiAgZmluZE5vZGUobm9kZUlkKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUubm9kZXMucmVkdWNlKFxuICAgICAgKGFjYywgc2ltTm9kZSwgaW5kZXgpID0+IChzaW1Ob2RlLmlkID09PSBub2RlSWQgPyBzaW1Ob2RlIDogYWNjKSxcbiAgICAgIHt9XG4gICAgKTtcbiAgfVxuXG4gIGdldENvbnN0cmFpbmVkTm9kZVBvc2l0aW9uKG5vZGVJZCwgbm9kZVJlY3QsIGNoaWxkcmVuID0gZmFsc2UpIHtcbiAgICBjb25zdCBub2RlID0gdGhpcy5maW5kTm9kZShub2RlSWQpO1xuICAgIHJldHVybiB0aGlzLmNvbnN0cmFpbk5vZGVQb3NpdGlvbihub2RlLngsIG5vZGUueSwgbm9kZVJlY3QsIGNoaWxkcmVuKTtcbiAgfVxuXG4gIGdldE5vdENvbm5lY3RlZE5vZGVQb3NpdGlvbihub2RlSWQpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5ub3RDb25uZWN0ZWROb2Rlc1xuICAgICAgLmZpbHRlcihuY24gPT4gbmNuLmlkID09PSBub2RlSWQpXG4gICAgICAuc2hpZnQoKTtcbiAgfVxuXG4gIGZpbmROb2RlRGF0YShub2Rlc0RhdGEsIG5vZGVJZCkge1xuICAgIHJldHVybiBub2Rlc0RhdGEuZmlsdGVyKG5vZGVEYXRhID0+IG5vZGVEYXRhLmlkID09PSBub2RlSWQpLnNoaWZ0KCk7XG4gIH1cblxuICBzZXREcmFnSW5mbyhkcmFnZ2luZywgbm9kZUlkID0gbnVsbCwgcG9zaXRpb24gPSB7fSkge1xuICAgIHRoaXMuZHJhZ0luZm8gPSB7XG4gICAgICBkcmFnZ2luZyxcbiAgICAgIG5vZGVJZCxcbiAgICAgIHBvc2l0aW9uXG4gICAgfTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IG9uUXVpY2tBY3Rpb25zQ2xpY2ssIG9uTm9kZVRpdGxlQ2xpY2sgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCB7IG5vZGVzLCBsaW5rcywgc2VydmljZXMgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICBjb25zdCBub2Rlc0RhdGEgPSBzZXJ2aWNlcy5tYXAoKHNlcnZpY2UsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBub2RlUmVjdCA9IGdldE5vZGVSZWN0KHNlcnZpY2UpO1xuICAgICAgY29uc3Qgbm9kZVBvc2l0aW9uID0gc2VydmljZS5jb25uZWN0aW9ucy5sZW5ndGggIT09IDBcbiAgICAgICAgPyB0aGlzLmdldENvbnN0cmFpbmVkTm9kZVBvc2l0aW9uKFxuICAgICAgICAgICAgc2VydmljZS5pZCxcbiAgICAgICAgICAgIG5vZGVSZWN0LFxuICAgICAgICAgICAgc2VydmljZS5jaGlsZHJlblxuICAgICAgICAgIClcbiAgICAgICAgOiB0aGlzLmdldE5vdENvbm5lY3RlZE5vZGVQb3NpdGlvbihzZXJ2aWNlLmlkKTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc2VydmljZSxcbiAgICAgICAgLi4ubm9kZVBvc2l0aW9uLFxuICAgICAgICBub2RlUmVjdFxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGxpbmtzRGF0YSA9IGxpbmtzXG4gICAgICAubWFwKChsaW5rLCBpbmRleCkgPT4gKHtcbiAgICAgICAgc291cmNlOiB0aGlzLmZpbmROb2RlRGF0YShub2Rlc0RhdGEsIGxpbmsuc291cmNlLmlkKSxcbiAgICAgICAgdGFyZ2V0OiB0aGlzLmZpbmROb2RlRGF0YShub2Rlc0RhdGEsIGxpbmsudGFyZ2V0LmlkKVxuICAgICAgfSkpXG4gICAgICAubWFwKChsaW5rRGF0YSwgaW5kZXgpID0+IHtcbiAgICAgICAgcmV0dXJuIGNhbGN1bGF0ZUxpbmVMYXlvdXQobGlua0RhdGEsIGluZGV4KTtcbiAgICAgIH0pO1xuXG4gICAgY29uc3Qgb25EcmFnU3RhcnQgPSAoZXZ0LCBub2RlSWQpID0+IHtcbiAgICAgIC8vIEl0J3MgdGhpcyBub2RlJ3MgcG9zaXRpb24gdGhhdCB3ZSdsbCBuZWVkIHRvIHVwZGF0ZVxuXG4gICAgICBjb25zdCB4ID0gZXZ0LmNoYW5nZWRUb3VjaGVzID8gZXZ0LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VYIDogZXZ0LmNsaWVudFg7XG4gICAgICBjb25zdCB5ID0gZXZ0LmNoYW5nZWRUb3VjaGVzID8gZXZ0LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VZIDogZXZ0LmNsaWVudFk7XG5cbiAgICAgIHRoaXMuc2V0RHJhZ0luZm8odHJ1ZSwgbm9kZUlkLCB7XG4gICAgICAgIHgsXG4gICAgICAgIHlcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBjb25zdCBvbkRyYWdNb3ZlID0gZXZ0ID0+IHtcbiAgICAgIGlmICh0aGlzLmRyYWdJbmZvICYmIHRoaXMuZHJhZ0luZm8uZHJhZ2dpbmcpIHtcbiAgICAgICAgY29uc3QgeCA9IGV2dC5jaGFuZ2VkVG91Y2hlc1xuICAgICAgICAgID8gZXZ0LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VYXG4gICAgICAgICAgOiBldnQuY2xpZW50WDtcbiAgICAgICAgY29uc3QgeSA9IGV2dC5jaGFuZ2VkVG91Y2hlc1xuICAgICAgICAgID8gZXZ0LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VZXG4gICAgICAgICAgOiBldnQuY2xpZW50WTtcblxuICAgICAgICBjb25zdCBvZmZzZXQgPSB7XG4gICAgICAgICAgeDogeCAtIHRoaXMuZHJhZ0luZm8ucG9zaXRpb24ueCxcbiAgICAgICAgICB5OiB5IC0gdGhpcy5kcmFnSW5mby5wb3NpdGlvbi55XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgZHJhZ05vZGVzID0gbm9kZXMubWFwKChzaW1Ob2RlLCBpbmRleCkgPT4ge1xuICAgICAgICAgIGlmIChzaW1Ob2RlLmlkID09PSB0aGlzLmRyYWdJbmZvLm5vZGVJZCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgLi4uc2ltTm9kZSxcbiAgICAgICAgICAgICAgeDogc2ltTm9kZS54ICsgb2Zmc2V0LngsXG4gICAgICAgICAgICAgIHk6IHNpbU5vZGUueSArIG9mZnNldC55XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4uc2ltTm9kZVxuICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAgICAge1xuICAgICAgICAgICAgbm9kZXM6IGRyYWdOb2Rlc1xuICAgICAgICAgIH0sXG4gICAgICAgICAgKCkgPT4gdGhpcy5mb3JjZVVwZGF0ZSgpXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5zZXREcmFnSW5mbyh0cnVlLCB0aGlzLmRyYWdJbmZvLm5vZGVJZCwge1xuICAgICAgICAgIHgsXG4gICAgICAgICAgeVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgb25EcmFnRW5kID0gZXZ0ID0+IHtcbiAgICAgIHRoaXMuc2V0RHJhZ0luZm8oZmFsc2UpO1xuICAgIH07XG5cbiAgICBjb25zdCByZW5kZXJlZE5vZGUgPSAobiwgaW5kZXgpID0+IChcbiAgICAgIDxUb3BvbG9neU5vZGVcbiAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgZGF0YT17bn1cbiAgICAgICAgaW5kZXg9e2luZGV4fVxuICAgICAgICBvbkRyYWdTdGFydD17b25EcmFnU3RhcnR9XG4gICAgICAgIG9uTm9kZVRpdGxlQ2xpY2s9e29uTm9kZVRpdGxlQ2xpY2t9XG4gICAgICAgIG9uUXVpY2tBY3Rpb25zPXtvblF1aWNrQWN0aW9uc0NsaWNrfVxuICAgICAgLz5cbiAgICApO1xuXG4gICAgY29uc3QgcmVuZGVyZWRMaW5rID0gKGwsIGluZGV4KSA9PiAoXG4gICAgICA8VG9wb2xvZ3lMaW5rIGtleT17aW5kZXh9IGRhdGE9e2x9IGluZGV4PXtpbmRleH0gLz5cbiAgICApO1xuXG4gICAgY29uc3QgcmVuZGVyZWRMaW5rQXJyb3cgPSAobCwgaW5kZXgpID0+IChcbiAgICAgIDxUb3BvbG9neUxpbmtBcnJvdyBrZXk9e2luZGV4fSBkYXRhPXtsfSBpbmRleD17aW5kZXh9IC8+XG4gICAgKTtcblxuICAgIGNvbnN0IHJlbmRlcmVkTm9kZXMgPVxuICAgICAgdGhpcy5kcmFnSW5mbyAmJiB0aGlzLmRyYWdJbmZvLmRyYWdnaW5nXG4gICAgICAgID8gbm9kZXNEYXRhXG4gICAgICAgICAgICAuZmlsdGVyKChuLCBpbmRleCkgPT4gbi5pZCAhPT0gdGhpcy5kcmFnSW5mby5ub2RlSWQpXG4gICAgICAgICAgICAubWFwKChuLCBpbmRleCkgPT4gcmVuZGVyZWROb2RlKG4sIGluZGV4KSlcbiAgICAgICAgOiBub2Rlc0RhdGEubWFwKChuLCBpbmRleCkgPT4gcmVuZGVyZWROb2RlKG4sIGluZGV4KSk7XG5cbiAgICBjb25zdCByZW5kZXJlZExpbmtzID0gbGlua3NEYXRhLm1hcCgobCwgaW5kZXgpID0+IHJlbmRlcmVkTGluayhsLCBpbmRleCkpO1xuXG4gICAgY29uc3QgcmVuZGVyZWRMaW5rQXJyb3dzID1cbiAgICAgIHRoaXMuZHJhZ0luZm8gJiYgdGhpcy5kcmFnSW5mby5kcmFnZ2luZ1xuICAgICAgICA/IGxpbmtzRGF0YVxuICAgICAgICAgICAgLmZpbHRlcigobCwgaW5kZXgpID0+IGwudGFyZ2V0LmlkICE9PSB0aGlzLmRyYWdJbmZvLm5vZGVJZClcbiAgICAgICAgICAgIC5tYXAoKGwsIGluZGV4KSA9PiByZW5kZXJlZExpbmtBcnJvdyhsLCBpbmRleCkpXG4gICAgICAgIDogbGlua3NEYXRhLm1hcCgobCwgaW5kZXgpID0+IHJlbmRlcmVkTGlua0Fycm93KGwsIGluZGV4KSk7XG5cbiAgICBjb25zdCBkcmFnTm9kZSA9XG4gICAgICAhdGhpcy5kcmFnSW5mbyB8fCAhdGhpcy5kcmFnSW5mby5kcmFnZ2luZ1xuICAgICAgICA/IG51bGxcbiAgICAgICAgOiByZW5kZXJlZE5vZGUoXG4gICAgICAgICAgICBub2Rlc0RhdGEucmVkdWNlKChkcmFnTm9kZSwgbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKG4uaWQgPT09IHRoaXMuZHJhZ0luZm8ubm9kZUlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIGRyYWdOb2RlO1xuICAgICAgICAgICAgfSwge30pXG4gICAgICAgICAgKTtcblxuICAgIGNvbnN0IGRyYWdMaW5rQXJyb3cgPVxuICAgICAgIXRoaXMuZHJhZ0luZm8gfHxcbiAgICAgICF0aGlzLmRyYWdJbmZvLmRyYWdnaW5nIHx8XG4gICAgICByZW5kZXJlZExpbmtBcnJvd3MubGVuZ3RoID09PSByZW5kZXJlZExpbmtzLmxlbmd0aFxuICAgICAgICA/IG51bGxcbiAgICAgICAgOiByZW5kZXJlZExpbmtBcnJvdyhcbiAgICAgICAgICAgIGxpbmtzRGF0YS5yZWR1Y2UoKGRyYWdMaW5rQXJyb3csIGwsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgIGlmIChsLnRhcmdldC5pZCA9PT0gdGhpcy5kcmFnSW5mby5ub2RlSWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gZHJhZ0xpbmtBcnJvdztcbiAgICAgICAgICAgIH0sIHt9KVxuICAgICAgICAgICk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFN0eWxlZFN2Z1xuICAgICAgICBvbk1vdXNlTW92ZT17b25EcmFnTW92ZX1cbiAgICAgICAgb25Ub3VjaE1vdmU9e29uRHJhZ01vdmV9XG4gICAgICAgIG9uTW91c2VVcD17b25EcmFnRW5kfVxuICAgICAgICBvblRvdWNoRW5kPXtvbkRyYWdFbmR9XG4gICAgICAgIG9uVG91Y2hDYW5jZWw9e29uRHJhZ0VuZH1cbiAgICAgICAgaWQ9XCJ0b3BvbG9neS1zdmdcIlxuICAgICAgPlxuICAgICAgICA8Zz57cmVuZGVyZWROb2Rlc308L2c+XG4gICAgICAgIDxnPntyZW5kZXJlZExpbmtzfTwvZz5cbiAgICAgICAgPGc+e3JlbmRlcmVkTGlua0Fycm93c308L2c+XG4gICAgICAgIDxnPntkcmFnTm9kZX08L2c+XG4gICAgICAgIDxnPntkcmFnTGlua0Fycm93fTwvZz5cbiAgICAgIDwvU3R5bGVkU3ZnPlxuICAgICk7XG4gIH1cbn1cblxuVG9wb2xvZ3kucHJvcFR5cGVzID0ge1xuICBvblF1aWNrQWN0aW9uc0NsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25Ob2RlVGl0bGVDbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gIHNlcnZpY2VzOiBQcm9wVHlwZXMuYXJyYXlcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRvcG9sb2d5O1xuXG5leHBvcnQgeyBkZWZhdWx0IGFzIFRvcG9sb2d5Tm9kZSB9IGZyb20gJy4vbm9kZSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFRvcG9sb2d5TGluayB9IGZyb20gJy4vbGluayc7XG4iXX0=