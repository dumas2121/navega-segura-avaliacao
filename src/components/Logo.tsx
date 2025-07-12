
import React from 'react';

const Logo = ({ className = "h-12" }: { className?: string }) => {
  return (
    <div className="flex justify-center">
      <img 
        src="/lovable-uploads/a81a908e-897a-4dac-b0f7-38335ec6f9c7.png" 
        alt="TECMED - Soluções em Tecnologia" 
        className={className}
      />
    </div>
  );
};

export default Logo;
