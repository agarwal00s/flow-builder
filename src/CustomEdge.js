import React from "react";
import { getSmoothStepPath } from "react-flow-renderer";

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
}) {
  const edgePath = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <defs>
        <marker
          className="react-flow__arrowhead"
          id={'check1'}
          markerWidth="20"
          markerHeight="20"
          viewBox="-10 -10 20 20"
          orient="auto"
          refX="0"
          refY="0"
        >
          <polyline
            stroke={"green"}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            fill={"green"}
            points="-5,-4 0,0 -5,4 -5,-4"
          />
        </marker>
      </defs>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={`url(#check1)`}
      />
      <text className="react-flow__edge-text" style={{cursor: 'pointer', pointerEvents: 'auto'}} onClick={()=> {console.log('text click')}}>
        <textPath
          href={`#${id}`}
          style={{ fontSize: "12px" }}
          startOffset="50%"
          textAnchor="middle"
        >
          {data.text}
        </textPath>
      </text>
    </>
  );
}
