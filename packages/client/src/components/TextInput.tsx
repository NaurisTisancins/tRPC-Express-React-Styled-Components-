import React, { ChangeEvent, FC, ReactNode } from 'react';
import styled from 'styled-components';
import { Field, ErrorMessage, FormikErrors, FormikTouched } from 'formik';

interface IInputProps {
  label: string;
  bordererror: boolean;
  placeholder: string;
  type: string;
  name: string;
  id: string;
  onBlur: {
    (e: FocusEvent): void;
  };
  value: string;
  onChange: {
    (e: ChangeEvent): void;
  };
}

export const TextInput: FC<IInputProps> = ({
  label,
  bordererror,
  placeholder,
  type = 'text',
  name,
  id,
  onBlur,
  value,
  onChange,
}) => {
  if (type === 'text-area') {
    return (
      <>
        <InpuContainer>
          <InputLabel>{label}</InputLabel>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment  */}
          {/* @ts-ignore */}
          <InputTextArea
            className={'className'}
            as={'textarea'}
            placeholder={placeholder}
            name={name}
            id={id}
            onBlur={onBlur}
            value={value}
            onChange={onChange}
            bordererror={bordererror}
          />
        </InpuContainer>
      </>
    );
  }
  return (
    <>
      <InpuContainer>
        <InputLabel>{label}</InputLabel>
        <Input
          type={type}
          placeholder={placeholder}
          name={name}
          id={id}
          onBlur={onBlur}
          value={value}
          onChange={onChange}
          bordererror={bordererror}
        />
      </InpuContainer>
    </>
  );
};

const InpuContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
`;

const InputLabel = styled.div``;

const Input = styled(Field)<{ bordererror: boolean }>`
  height: 32px;
  border-radius: 12px;
  padding: 8px;
  ${({ bordererror }) => {
    return (
      bordererror &&
      `
      border: 1px solid red;
    `
    );
  }}
`;
const InputTextArea = styled(Field)<{
  bordererror: boolean;
  className: string;
}>`
  height: 200px;
  width: 300px;
  border-radius: 12px;
  padding: 8px;
  ${({ bordererror }) => {
    return (
      bordererror &&
      `
      border: 1px solid red;
    `
    );
  }}
`;
