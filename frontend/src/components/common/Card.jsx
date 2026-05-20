import React from 'react';

const Card = ({ children, title, extra, className = '', noPadding = false }) => {
  return (
    <div className={`bg-card shadow-card rounded-xl border border-border overflow-hidden transition-all duration-300 hover:shadow-hover ${className}`}>
      {(title || extra) && (
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          {title && <h3 className="text-lg font-bold text-textPrimary">{title}</h3>}
          {extra && <div>{extra}</div>}
        </div>
      )}
      <div className={noPadding ? '' : 'p-6'}>
        {children}
      </div>
    </div>
  );
};

export default Card;
