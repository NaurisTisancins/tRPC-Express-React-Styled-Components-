import React, { FC } from 'react';
import styled from 'styled-components';

interface IButtonProps {
  label: string;
  type: string;
  disabled?: boolean;
}

export const Button: FC<IButtonProps> = ({ label, type, disabled }) => {
  return (
    <>
      <BasicButton type={'submit'} disabled={disabled}>
        {label}
      </BasicButton>
    </>
  );
};

const BasicButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  width: 100px;
  background-color: purple;
  color: whitesmoke;
  border-radius: 8px;
  align-self: flex-end;
  cursor: pointer;
  &:disabled {
    background-color: gray;
  }
`;
