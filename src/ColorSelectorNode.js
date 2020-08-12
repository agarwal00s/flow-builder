import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';

export default memo(({ data }) => {
  return (
    <div style={{padding: '1rem 2rem'}}>
      <Handle
        type="target"
        position="left"
        style={{ background: '#1E4CA0' }}
        onConnect={(params) => console.log('handle onConnect', params)}
      />
      <div>
        Conditional Node
      </div>
      <Handle type="source" position="right" id="a" style={{ top: 15, background: '#1E4CA0' }} />
      <Handle type="source" position="right" id="b" style={{ bottom: 5, top: 'auto', background: '#1E4CA0' }} />
    </div>
  );
});