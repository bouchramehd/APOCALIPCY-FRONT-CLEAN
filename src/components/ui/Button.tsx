import { ButtonHTMLAttributes, forwardRef } from 'react';
import styled from '@emotion/styled';

const StyledButton = styled.button`
  width: 100%;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius);
  font-weight: 500;
  color: hsl(var(--primary-foreground));
  background-color: hsl(var(--primary));
  transition: all 0.2s;
  
  &:hover {
    background-color: hsl(var(--accent));
  }
  
  &:focus {
    outline: none;
    ring: 2px;
    ring-offset: 2px;
    ring-color: hsl(var(--ring));
  }
`;

export const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>((props, ref) => {
  return <StyledButton ref={ref} {...props} />;
});

Button.displayName = 'Button';
 