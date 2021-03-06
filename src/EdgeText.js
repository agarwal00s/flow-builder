import React, { memo, useRef, useState, useEffect } from 'react';


export default memo(
  ({ x, y, labelShowBg = true, labelBgPadding = [1, 4], data,setEdgeHovered }) => {
    const edgeRef = useRef(null);
    const [edgeTextBbox, setEdgeTextBbox] = useState({ x: 0, y: 0, width: 0, height: 0 });

    useEffect(() => {
      if (edgeRef.current) {
        const textBbox = edgeRef.current.getBBox();

        setEdgeTextBbox({
          x: textBbox.x,
          y: textBbox.y,
          width: textBbox.width,
          height: textBbox.height,
        });
      }
    }, []);

    return (
      <g transform={`translate(${x - edgeTextBbox.width / 2} ${y - edgeTextBbox.height / 2})`} onMouseEnter={() => setEdgeHovered(true)} onMouseLeave={() => setEdgeHovered(false)}>
        {labelShowBg && (
          <rect
            onClick={()=> {console.log('text click'); data.deleteEdge()}}
            width={edgeTextBbox.width + 2 * labelBgPadding[0]}
            x={-labelBgPadding[0]}
            y={-labelBgPadding[1]}
            height={edgeTextBbox.height + 2 * labelBgPadding[1]}
            className="react-flow__edge-textbg"
            // style={labelBgStyle}
            style={{cursor: 'pointer', pointerEvents: 'auto'}}
          />
        )}
        <text className="react-flow__edge-text" y={edgeTextBbox.height / 2} dy="0.3em" ref={edgeRef} style={{fontFamily: 'FontAwesome'}}>
            &#xf1f8;
        </text>
      </g>
    );
  }
);
