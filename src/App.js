import React, { useState } from "react";
import ReactFlow, {
  removeElements,
  addEdge,
  // Controls,
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

const connectionLineStyle = { stroke: "#3C639B" };

const App = () => {

  const initialElements = [
    {
      id: "1",
      type: "input",
      data: {
        label: (
          <>
            Start
            {/* <div className="addItem" onClick={() => addNode()}>
              ADD
            </div> */}
          </>
        ),
      },
      className: "node",
      position: { x: 100, y: 0 },
      sourcePosition: "right",
    },
    {
      id: "2",
      data: {
        label: <>Two</>,
      },
      className: "otherNode",
      position: { x: 50, y: 100 },
      targetPosition: "left",
      sourcePosition: "right",
    },
    {
      id: "3",
      data: {
        label: <div>Three</div>,
      },
      className: "otherNode",
      position: { x: 350, y: 100 },
      style: {
        backgroundColor: "#FFECA4",
      },
      targetPosition: "left",
      sourcePosition: "right",
    },
    {
      id: "4",
      position: { x: 200, y: 200 },
      data: {
        label: <>Four</>,
      },
      className: "otherNode",
      targetPosition: "left",
      sourcePosition: "right",
    },
    {
      id: "5",
      data: {
        label: <>Five</>,
      },
      className: "otherNode",
      position: { x: 200, y: 325 },
      targetPosition: "left",
      sourcePosition: "right",
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
      position: { x: 200, y: 400 },
      targetPosition: "left",
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
        connectionLineType={"smoothstep"}
        connectionLineStyle={connectionLineStyle}
        arrowHeadColor={"#3C639B"}
        selectNodesOnDrag={false}
        paneMoveable={false}
        onConnectStart={(e, { nodeId }) => {
          currentDragNode = nodeId;
        }}
        onConnectStop={(e) => {
          console.log(currentHoveredNode, currentDragNode, e);
          if (
            currentDragNode &&
            currentHoveredNode &&
            currentDragNode !== currentHoveredNode.id
          ) {
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
          } else {
            setElements([
              ...initialElements,
              {
                id: "8",
                data: {
                  label: <>Eight</>,
                },
                className: "otherNode",
                position: { x: e.clientX, y: e.clientY },
                targetPosition: "left",
                sourcePosition: "right",
              },
              {
                id: "e2-8",
                source: "2",
                target: "8",
                arrowHeadType: "arrowclosed",
                type: "smoothstep",
                style: { stroke: "#3C639B" },
              },
            ]);
          }
        }}
      >
        {/* <Controls /> */}
        <Background variant="dots" color="#E4E7E9" gap={8} size={1} />
      </ReactFlow>
    </div>
  );
};

export default App;
