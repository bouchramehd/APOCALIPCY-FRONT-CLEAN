import styled from '@emotion/styled';

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  
  &:focus {
    outline: none;
    border-color: hsl(var(--ring));
    ring: 1px;
    ring-color: hsl(var(--ring));
  }
`;
 