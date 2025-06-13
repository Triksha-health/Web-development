import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hoverable = false 
}) => {
  return (
    <div 
      className={`
        bg-white
        rounded-xl shadow-md overflow-hidden 
        border border-slate-200
        ${hoverable ? 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;