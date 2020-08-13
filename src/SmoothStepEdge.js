import React, { memo, useState } from "react";

import EdgeText from "./EdgeText";
import { getCenter } from "./utils";

// These are some helper methods for drawing the round corners
// The name indicates the direction of the path. "bottomLeftCorner" goes
// from bottom to the left and "leftBottomCorner" goes from left to the bottom.
// We have to consider the direction of the paths because of the animated lines.

const bottomLeftCorner = (cornerX, cornerY, cornerSize) =>
  `L ${cornerX},${cornerY - cornerSize}Q ${cornerX},${cornerY} ${
    cornerX + cornerSize
  },${cornerY}`;

const leftBottomCorner = (cornerX, cornerY, cornerSize) =>
  `L ${cornerX + cornerSize},${cornerY}Q ${cornerX},${cornerY} ${cornerX},${
    cornerY - cornerSize
  }`;

const bottomRightCorner = (cornerX, cornerY, cornerSize) =>
  `L ${cornerX},${cornerY - cornerSize}Q ${cornerX},${cornerY} ${
    cornerX - cornerSize
  },${cornerY}`;

const rightBottomCorner = (cornerX, cornerY, cornerSize) =>
  `L ${cornerX - cornerSize},${cornerY}Q ${cornerX},${cornerY} ${cornerX},${
    cornerY - cornerSize
  }`;

const leftTopCorner = (cornerX, cornerY, cornerSize) =>
  `L ${cornerX + cornerSize},${cornerY}Q ${cornerX},${cornerY} ${cornerX},${
    cornerY + cornerSize
  }`;

const topLeftCorner = (cornerX, cornerY, cornerSize) =>
  `L ${cornerX},${cornerY + cornerSize}Q ${cornerX},${cornerY} ${
    cornerX + cornerSize
  },${cornerY}`;

const topRightCorner = (cornerX, cornerY, cornerSize) =>
  `L ${cornerX},${cornerY + cornerSize}Q ${cornerX},${cornerY} ${
    cornerX - cornerSize
  },${cornerY}`;

const rightTopCorner = (cornerX, cornerY, cornerSize) =>
  `L ${cornerX - cornerSize},${cornerY}Q ${cornerX},${cornerY} ${cornerX},${
    cornerY + cornerSize
  }`;

export function getSmoothStepPath({
  sourceX,
  sourceY,
  sourcePosition = "bottom",
  targetX,
  targetY,
  targetPosition = "top",
  borderRadius = 5,
}) {
  const [centerX, centerY, offsetX, offsetY] = getCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  const cornerWidth = Math.min(borderRadius, Math.abs(targetX - sourceX));
  const cornerHeight = Math.min(borderRadius, Math.abs(targetY - sourceY));
  const cornerSize = Math.min(cornerWidth, cornerHeight, offsetX, offsetY);

  const leftAndRight = ["left", "right"];

  let firstCornerPath = null;
  let secondCornerPath = null;

  // default case: source and target positions are top or bottom
  if (sourceX <= targetX) {
    firstCornerPath =
      sourceY <= targetY
        ? bottomLeftCorner(sourceX, centerY, cornerSize)
        : topLeftCorner(sourceX, centerY, cornerSize);
    secondCornerPath =
      sourceY <= targetY
        ? rightTopCorner(targetX, centerY, cornerSize)
        : rightBottomCorner(targetX, centerY, cornerSize);
  } else {
    firstCornerPath =
      sourceY < targetY
        ? bottomRightCorner(sourceX, centerY, cornerSize)
        : topRightCorner(sourceX, centerY, cornerSize);
    secondCornerPath =
      sourceY < targetY
        ? leftTopCorner(targetX, centerY, cornerSize)
        : leftBottomCorner(targetX, centerY, cornerSize);
  }

  if (
    leftAndRight.includes(sourcePosition) &&
    leftAndRight.includes(targetPosition)
  ) {
    if (sourceX <= targetX) {
      firstCornerPath =
        sourceY <= targetY
          ? rightTopCorner(centerX, sourceY, cornerSize)
          : rightBottomCorner(centerX, sourceY, cornerSize);
      secondCornerPath =
        sourceY <= targetY
          ? bottomLeftCorner(centerX, targetY, cornerSize)
          : topLeftCorner(centerX, targetY, cornerSize);
    }
  } else if (
    leftAndRight.includes(sourcePosition) &&
    !leftAndRight.includes(targetPosition)
  ) {
    if (sourceX <= targetX) {
      firstCornerPath =
        sourceY <= targetY
          ? rightTopCorner(targetX, sourceY, cornerSize)
          : rightBottomCorner(targetX, sourceY, cornerSize);
    } else {
      firstCornerPath =
        sourceY <= targetY
          ? bottomRightCorner(sourceX, targetY, cornerSize)
          : topRightCorner(sourceX, targetY, cornerSize);
    }
    secondCornerPath = "";
  } else if (
    !leftAndRight.includes(sourcePosition) &&
    leftAndRight.includes(targetPosition)
  ) {
    if (sourceX <= targetX) {
      firstCornerPath =
        sourceY <= targetY
          ? bottomLeftCorner(sourceX, targetY, cornerSize)
          : topLeftCorner(sourceX, targetY, cornerSize);
    } else {
      firstCornerPath =
        sourceY <= targetY
          ? bottomRightCorner(sourceX, targetY, cornerSize)
          : topRightCorner(sourceX, targetY, cornerSize);
    }
    secondCornerPath = "";
  }

  return `M ${sourceX},${sourceY}${firstCornerPath}${secondCornerPath}L ${targetX},${targetY}`;
}

export default memo(
  ({
    data,
    sourceX,
    sourceY,
    targetX,
    targetY,
    label,
    labelStyle,
    labelShowBg,
    labelBgStyle,
    labelBgPadding,
    sourcePosition = "bottom",
    targetPosition = "top",
    borderRadius = 5,
  }) => {
    const [centerX, centerY] = getCenter({
      sourceX,
      sourceY,
      targetX,
      targetY,
    });

    const path = getSmoothStepPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
      borderRadius,
    });

    let [isEdgeHovered, setEdgeHovered] = useState(false);
    const text = (
      <EdgeText
        x={centerX}
        y={centerY}
        label={label}
        labelStyle={labelStyle}
        labelShowBg={labelShowBg}
        labelBgStyle={labelBgStyle}
        labelBgPadding={labelBgPadding}
        data={data}
        setEdgeHovered={setEdgeHovered}
      />
    );
    return (
      <>
        <defs>
          <marker
            className="react-flow__arrowhead"
            id={data.id}
            markerWidth="20"
            markerHeight="20"
            viewBox="-10 -10 20 20"
            orient="auto"
            refX="0"
            refY="0"
          >
            <polyline
              stroke={isEdgeHovered ? "red" : "#3C639B"}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="0"
              fill={isEdgeHovered ? "red" : "#3C639B"}
              points="-5,-4 0,0 -5,4 -5,-4"
            />
          </marker>
        </defs>
        <path
          style={{
            stroke: isEdgeHovered ? "red" : "#3C639B",
            cursor: "pointer",
            pointerEvents: "auto",
            strokeWidth: isEdgeHovered ? "3px" : "1.5px",
          }}
          className="react-flow__edge-path"
          d={path}
          markerEnd={`url(#${data.id})`}
          onMouseEnter={() => {
            setEdgeHovered(true);
          }}
          onMouseLeave={() => setEdgeHovered(false)}
        />
        {isEdgeHovered && text}
      </>
    );
  }
);
