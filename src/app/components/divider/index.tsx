import React from 'react';
import styled from 'styled-components';

export interface IDividerProps {
  width?: string;
  height?: string;
  bg?: string;
  direction?: 'horizontal' | 'vertical'; // qo‘shimcha yo‘nalish
  margin?: string;
}

const DividerComponent = styled.span<IDividerProps>`
  display: block;
  background: ${({ bg }) => bg || '#e0e0e0'};
  margin: ${({ margin }) => margin || '8px 0'};
  
  width: ${({ direction, width }) =>
    direction === 'vertical' ? width || '1px' : width || '100%'};

  height: ${({ direction, height }) =>
    direction === 'vertical' ? height || '100%' : height || '1px'};
`;

function Divider(props: IDividerProps) {
  return <DividerComponent {...props} />;
};

export default Divider;
