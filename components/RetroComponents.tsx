import React from 'react';

// A heavy, retro button
export const RetroButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
}> = ({ children, onClick, className = '', variant = 'primary' }) => {
  const baseStyle = "font-mono font-bold uppercase tracking-wider transition-all duration-75 active:translate-y-1 border-2 border-black px-6 py-2 cursor-pointer flex items-center justify-center";
  
  const variants = {
    primary: "bg-retro-orange text-black hover:bg-black hover:text-retro-orange shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none",
    secondary: "bg-retro-bg text-black hover:bg-black hover:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none",
    outline: "bg-transparent text-black border-black hover:bg-black hover:text-white",
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

// A container box with heavy borders and header
export const RetroCard: React.FC<{
  title?: string;
  label?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}> = ({ title, label, children, className = '', onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`relative bg-white border-2 border-black p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.15)] transition-transform hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(255,85,0,0.3)] ${className} ${onClick ? 'cursor-pointer' : ''}`}
    >
      {(title || label) && (
        <div className="flex justify-between items-center mb-4 border-b-2 border-black pb-2">
          {title && <h3 className="font-sans font-bold text-lg text-black">{title}</h3>}
          {label && <span className="font-mono text-xs bg-black text-white px-2 py-0.5">{label}</span>}
        </div>
      )}
      {children}
    </div>
  );
};

export const LoadingBar: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div className="w-full border-2 border-retro-orange h-6 p-1 relative">
      <div 
        className="h-full bg-retro-orange transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};