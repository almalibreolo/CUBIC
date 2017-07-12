define(["app", "moment", "vis"], function(app, moment, vis) {

    app.directive("chartNetwork", function() {
        'use strict';
        
        return {
            restrict: "E",
            transclude: true,
            template:	'<div >' +
						'</div>',
            scope: {
				viewType:"=",
				data:"="
            },
            link: function postLink($scope, element, attrs, controller) {
                // property
				var target = angular.element(element);
				// target.css("display", "block");

				// create a network
				var id = (new Date()).getTime() + Math.floor((Math.random() *	 1000) + 1);
				var chart = angular.element('<div id="' + id + '" style="width: 630px; height: 580px; ">');
				target.children().first().append(chart);
				var container = document.getElementById(id);

				var nodes, edges, network;
				nodes = new vis.DataSet($scope.data.nodes);
				edges = new vis.DataSet($scope.data.edges);
				// network = new vis.Network(container, { nodes: nodes, edges: edges }, getNetworkOption());
				drawNetwork();

				var unbind = [
					$scope.$watch("viewType", function (value, valueOld) {
						if(!value || angular.equals(value, valueOld) || value != 1) return;
						console.log("vis network : viewType :", value);

						// network.setSize('630px', '580px');
						// network.redraw();
						// network.stabilize();

						/*network.moveTo({
							position: {x:-340, y:-330},
							scale: 0.90,
							offset: {x:0, y:0},
							animation: false
						});*/
						/*network.moveTo({
							position: {x:0, y:0},
							scale: 1.0,
							offset: {x:0, y:0},
							animation: false
						});*/

						/*var data = {
						 nodes: new vis.DataSet($scope.data.nodes),
						 edges: new vis.DataSet($scope.data.edges)
						 };
						 drawNetwork(data);*/
					}),
					$scope.$watch("data", function (value, valueOld) {
						if(!value || angular.equals(value, valueOld)) return;
						console.log("vis network : data :", value);

						/*var data = {
							nodes: new vis.DataSet(value.nodes),
							edges: new vis.DataSet(value.edges)
						};*/

						// drawNetwork();
						resetAllNodes(value);
						// resetAllNodesStabilize(value);
					})
				];
            	
            	// function
				function drawNetwork() {
					destroyNetwork();

					network = new vis.Network(container, { nodes: nodes, edges: edges }, getNetworkOption());

					// interaction event
					network.on("select", function (params) {
						console.log('vis : select Event:', params);
					});
					network.on("selectNode", function (params) {
						console.log('vis : selectNode Event:', params);
					});
					network.on("selectEdge", function (params) {
						console.log('vis : selectEdge Event:', params);
					});
					network.on("deselectNode", function (params) {
						console.log('vis : deselectNode Event:', params);
					});
					network.on("deselectEdge", function (params) {
						console.log('vis : deselectEdge Event:', params);
					});
					network.on("click", function (params) {
						params.event = "[original event]";
						console.log('vis : Click event:' + JSON.stringify(params, null, 4));
					});
					network.on("doubleClick", function (params) {
						params.event = "[original event]";
						console.log('vis : doubleClick event:' + JSON.stringify(params, null, 4));
					});
					/*network.on("showPopup", function (params) {
						console.log('vis : showPopup event:' + JSON.stringify(params, null, 4));
					});
					network.on("hidePopup", function () {
						console.log('vis : hidePopup Event');
					});*/
					// physics event
					network.on("initRedraw", function () {
						// do something like move some custom elements?
					});
					network.on("beforeDrawing", function (ctx) {
						// var nodeId = '8b4ea9e51e995bdfaf8a4b90033ca20897930f3d';
						// var nodePosition = network.getPositions([nodeId]);
						// ctx.strokeStyle = '#A6D5F7';
						// ctx.fillStyle = '#294475';
						// ctx.circle(nodePosition[nodeId].x, nodePosition[nodeId].y,50);
						// ctx.fill();
						// ctx.stroke();
					});
					network.on("afterDrawing", function (ctx) {
						// var nodeId = '8b4ea9e51e995bdfaf8a4b90033ca20897930f3d';
						// var nodePosition = network.getPositions([nodeId]);
						// ctx.strokeStyle = '#294475';
						// ctx.lineWidth = 4;
						// ctx.fillStyle = '#A6D5F7';
						// ctx.circle(nodePosition[nodeId].x, nodePosition[nodeId].y,10);
						// ctx.fill();
						// ctx.stroke();
					});
				}

				function resetAllNodes(value) {
					nodes.clear();
					edges.clear();
					nodes.add(value.nodes);
					edges.add(value.edges);
				}

				function resetAllNodesStabilize(value) {
					resetAllNodes(value);
					network.stabilize();
				}

				function initData(value) {
					nodes = new vis.DataSet(value.nodes);
					edges = new vis.DataSet(value.edges);
					network.setData({nodes:nodes, edges:edges})
				}

				function destroyNetwork() {
					if (network) {
						network.destroy();
						network = null;
					}
				}

				function getNetworkOption() {
					return {
						// autoResize: true,
						height: '630px',
						width: '580px',
						physics: false,
						interaction:{hover:true},
						/*groups: {
						 1: {
						 shape: 'icon',
						 icon: {
						 face: 'Ionicons',
						 code: '\uf47c',
						 size: 50,
						 color: '#57169a'
						 }
						 },
						 2: { color: {background:'red',border:'white'} },
						 3: {color:'rgb(0,255,140)'}
						 },*/
						edges: {
							smooth: {
								type: 'cubicBezier',
								forceDirection: 'vertical',
								roundness: 0.4
							},
							color: {
								color: '#88b83d',
								hover: '#88b83d',
								highlight: '#5F9B00'
							},
							width: 2,
							selectionWidth: function (width) {return 4;}
						},
						nodes: {
							fixed: true,
							shape: 'image',
							// size: 100,
							/*font: {
								size: 50,
								color: '#ffffff'
							},*/
							// borderWidth: 1
							/*color: {
								border: '#ff0000',
								background: '#ff0000',
								highlight: {
									border: '#ff0000',
									background: '#ff0000'
								},
								hover: {
									border: '#ff0000',
									background: '#ff0000'
								}
							},*/
							/*shapeProperties: {
								// useImageSize:true
								// useBorderWithImage: true
							}*/
						},
						layout: {
							hierarchical: {
								direction: "UD"
								// levelSeparation: 1800
							}
						}
					};
				}

            	function remove() {
            		target.off("remove", remove);

					unbind.forEach(function (fn) {
						fn();
					});

					destroyNetwork();
            	}
            	target.on("remove", remove);
            },
            controller: ["$scope", function($scope) {
                // property
            	
            	// method
            	
            	// event-handler
            	
            	// function

            	function initialize() {
            		initializeEventHandler();
            	}
            	
        		function initializeEventHandler() {
        			
        		}
            }] 
        }
    });
});