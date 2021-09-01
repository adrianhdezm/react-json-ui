import React from 'react';

interface HelloProps {
  name: string;
}

export const Hello = ({ name }: HelloProps): JSX.Element => {
  const message = `Hello ${name}!`;
  return <div>{message}</div>;
};
