import React, { useState } from "react";
import ReactFlow, {
  removeElements,
  addEdge,
  Controls,
  Background,
  isNode,
} from "react-flow-renderer";
import "./App.css";

const onNodeDragStart = (node) => console.log("drag start", node);
const onNodeDragStop = (node) => console.log("drag stop", node);
const onElementClick = (element) =>
  console.log(`${isNode(element) ? "node" : "edge"} click:`, element);
const onSelectionChange = (elements) =>
  console.log("selection change", elements);
const onLoad = (reactFlowInstance) => {
  console.log("flow loaded:", reactFlowInstance);
  reactFlowInstance.fitView();
};

const onMoveEnd = (transform) => console.log("zoom/move end", transform);

const connectionLineStyle = { stroke: "#3C639B" };
const snapGrid = [16, 16];

const App = () => {
  const addNode = () =>
    setElements([
      ...initialElements,
      {
        id: "7",
        data: {
          label: <>Seven</>,
        },
        className: "otherNode",
        position: { x: 500, y: 200 },
      },
      {
        id: "e1-7",
        source: "1",
        target: "7",
        arrowHeadType: "arrowclosed",
        type: "smoothstep",
        style: { stroke: "#3C639B" },
      },
    ]);

  const initialElements = [
    {
      id: "1",
      type: "input",
      data: {
        label: (
          <>
            Start
            <div className="addItem" onClick={() => addNode()}>
              ADD
            </div>
          </>
        ),
      },
      className: "node",
      position: { x: 250, y: 0 },
    },
    {
      id: "2",
      type: {

      },
      data: {
        label: <>Two</>,
      },
      className: "otherNode",
      position: { x: 100, y: 100 },
    },
    {
      id: "3",
      data: {
        label: <>Three</>,
      },
      className: "otherNode",
      position: { x: 400, y: 100 },
    },
    {
      id: "4",
      position: { x: 250, y: 200 },
      data: {
        label: <>Four</>,
      },
      className: "otherNode",
    },
    {
      id: "5",
      data: {
        label: <>Five</>,
      },
      className: "otherNode",
      position: { x: 250, y: 325 },
    },
    {
      id: "6",
      type: "output",
      data: {
        label: <>Response</>,
      },
      style: {
        background: "#BAFFBF",
        color: "#1E6825",
        borderRadius: "20px",
        boxShadow: "10px 10px 10px rgba(0, 21, 31, 0.08)",
      },
      position: { x: 250, y: 400 },
    },
    {
      id: "e1-2",
      source: "1",
      target: "2",
      arrowHeadType: "arrowclosed",
      type: "smoothstep",
      style: { stroke: "#3C639B" },
    },
    {
      id: "e1-3",
      source: "1",
      target: "3",
      arrowHeadType: "arrowclosed",
      type: "smoothstep",
      style: { stroke: "#3C639B" },
    },
    {
      id: "e3-4",
      source: "3",
      target: "4",
      arrowHeadType: "arrowclosed",
      type: "smoothstep",
      style: { stroke: "#3C639B" },
    },
    {
      id: "e4-5",
      source: "4",
      target: "5",
      arrowHeadType: "arrowclosed",
      type: "smoothstep",
      style: { stroke: "#3C639B" },
    },
    {
      id: "e5-6",
      source: "5",
      target: "6",
      arrowHeadType: "arrowclosed",
      type: "smoothstep",
      style: { stroke: "#3C639B" },
    },
  ];

  let currentHoveredNode = null;
  let currentDragNode = null;
  const [elements, setElements] = useState(initialElements);
  const onElementsRemove = (elementsToRemove) => {
    console.log(elementsToRemove);
    setElements((els) => removeElements(elementsToRemove, els));
  };

  const onConnect = (params) =>
    setElements((els) =>
      addEdge(
        {
          ...params,
          arrowHeadType: "arrowclosed",
          type: "smoothstep",
          style: { stroke: "#3C639B" },
        },
        els
      )
    );
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <ReactFlow
        elements={elements}
        onElementClick={onElementClick}
        onElementsRemove={onElementsRemove}
        onConnectStart={({ nodeId }) => {
          currentDragNode = nodeId;
        }}
        onConnectStop={() => {
          console.log(currentHoveredNode, currentDragNode);
          if (currentDragNode && currentHoveredNode) {
            setElements([
              ...elements,
              {
                id: `e${currentDragNode}-${currentHoveredNode.id}`,
                source: currentDragNode,
                target: currentHoveredNode.id,
                arrowHeadType: "arrowclosed",
                type: "smoothstep",
                style: { stroke: "#3C639B" },
              },
            ]);
          }
        }}
        onConnect={onConnect}
        onNodeDragStart={onNodeDragStart}
        onNodeDragStop={onNodeDragStop}
        onSelectionChange={onSelectionChange}
        onNodeMouseEnter={(e, node) => {
          currentHoveredNode = { ...node };
        }}
        onNodeMouseLeave={(e, node) => {
          currentHoveredNode = null;
        }}
        onMoveEnd={onMoveEnd}
        onLoad={onLoad}
        connectionLineType={"smoothstep"}
        connectionLineStyle={connectionLineStyle}
        snapToGrid={true}
        snapGrid={snapGrid}
        arrowHeadColor={"#3C639B"}
        selectNodesOnDrag={false}
      >
        <Controls />
        <Background variant="dots" color="#E4E7E9" gap={8} size={1} />
      </ReactFlow>
    </div>
  );
};

export default App;
