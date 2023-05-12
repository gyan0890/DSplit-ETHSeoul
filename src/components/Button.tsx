import React from 'react';

interface ButtonProps {
  label: string;
}

const Button = ({ label }: ButtonProps) => {
  return (
    <button className="bg-black text-white rounded-full py-1 px-4 w-40">{label}</button>
  );
};

export default Button;
