import React from 'react';

interface ColorSwatchProps {
  color: string;
}

export const ColorSwatch: React.FC<ColorSwatchProps> = ({
  color = 'indigo',
}): JSX.Element => {
  return <div className={`w-4 h-4 border bg-${color}-500`}></div>;
};
