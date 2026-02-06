
import React from 'react';

const FluidBackground: React.FC = () => {
  return (
    <iframe
      src="/fluid.html"
      title="Fluid Background"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 'none',
        zIndex: -1,
      }}
    />
  );
};

export default FluidBackground;
