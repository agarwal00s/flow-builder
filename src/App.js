import React, { useState } from "react";
import ReactFlow, {
  removeElements,
  addEdge,
  Controls,
  Background,
  isNode,
} from "react-flow-renderer";
import "./App.css";
import ColorSelectorNode from './ColorSelectorNode';
// import CustomEdge from './CustomEdge';
import SmoothStepEdge from './SmoothStepEdge';
const nodeTypes = {
  selectorNode: ColorSelectorNode,
};
const edgeTypes = {
  custom: SmoothStepEdge,
};
let reactFlowMethod = null;
const onNodeDragStart = (node) => console.log("drag start", node);
const onNodeDragStop = (node) => console.log("drag stop", node);
const onElementClick = (element) =>
  console.log(`${isNode(element) ? "node" : "edge"} click:`, element);
const onSelectionChange = (elements) =>
  console.log("selection change", elements);
const onLoad = (reactFlowInstance) => {
  console.log("flow loaded:", reactFlowInstance);
  reactFlowInstance.fitView();
  reactFlowMethod = reactFlowInstance;
};

const connectionLineStyle = { stroke: "#3C639B" };

const App = () => {
  const deleteEdge = () => {
    console.log("Delete Edge Called");
    setElements([
      {
        id: "9",
        type: 'selectorNode',
        data: {
          label: (
            <>
              Nine
              {/* <div className="addItem" onClick={() => addNode()}>
                ADD
              </div> */}
            </>
          ),
        },
        style: {
          background: '#FFECA4',
          borderRadius: '20px',
        },
        position: { x: 200, y: 500 },
      },
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
          label: <div><input type="text" placeholder="Three"/></div>,
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
        id: "e1-3",
        source: "1",
        target: "3",
        label: <>Sourav2</>,
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
    ]);
  }
  const initialElements = [
    {
      id: "9",
      type: 'selectorNode',
      data: {
        label: (
          <>
            Nine
            {/* <div className="addItem" onClick={() => addNode()}>
              ADD
            </div> */}
          </>
        ),
      },
      style: {
        background: '#FFECA4',
        borderRadius: '20px',
      },
      position: { x: 200, y: 500 },
    },
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
        label: <div><input type="text" placeholder="Three"/></div>,
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
      // label: <div onClick={() => console.log('sourav')}>Sourav</div>,
      markerEndId: "check",
      arrowHeadType: "arrowclosed",
      label: <>Sourav</>,
      type: "custom",
      data: { deleteEdge: deleteEdge },
    },
    {
      id: "e1-3",
      source: "1",
      target: "3",
      label: <>Sourav2</>,
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
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onLoad={onLoad}
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
        paneMoveable={true}
        onConnectStart={(e, { nodeId }) => {
          currentDragNode = nodeId;
        }}
        onConnectStop={(e) => {
          console.log(currentHoveredNode, currentDragNode);
          if (
            currentDragNode &&
            currentHoveredNode &&
            currentDragNode !== currentHoveredNode.id
          ) {
            let label =null;
            if(currentDragNode.endsWith('a')){
              label = 'true';
            }
            else if(currentDragNode.endsWith('b')){
              label = 'false';
            }
            setElements([
              ...elements,
              {
                id: `e${currentDragNode}-${currentHoveredNode.id}`,
                source: currentDragNode,
                target: currentHoveredNode.id,
                arrowHeadType: "arrowclosed",
                label: label,
                type: "smoothstep",
                style: { stroke: "#3C639B" },
              },
            ]);
          } else {
            const pos = reactFlowMethod.project(e);
            setElements([
              ...initialElements,
              {
                id: "8",
                data: {
                  label: <>Eight</>,
                },
                className: "otherNode",
                position: { x: pos.x, y: pos.y},
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
        <Controls />
        <Background variant="dots" color="#E4E7E9" gap={8} size={1} />
      </ReactFlow>
    </div>
  );
};

export default App;
