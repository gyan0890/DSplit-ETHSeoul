import React from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
}

const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <button
      className="bg-black text-white rounded-full py-1 px-4 w-40 text-base"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
