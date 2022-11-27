import React, { ChangeEvent, FC, ReactNode, useState } from 'react';
import styled from 'styled-components';
import { Field, ErrorMessage, FormikTouched, FormikErrors } from 'formik';
import { Gender } from './MoreCommentsForm';

interface IInputProps {
  label: string;
  bordererror: boolean;
  name: string;
  id: string;
  onBlur: {
    (e: FocusEvent): void;
  };
  touched?: string;
  value: string;
  onChange: {
    (e: ChangeEvent): void;
  };
  errors?: string;
}

export const DropDown: FC<IInputProps> = ({
  label,
  bordererror,
  name,
  id,
  onBlur,
  touched,
  value,
  onChange,
  errors,
}) => {
  return (
    <>
      <InpuContainer>
        <InputLabel>{label}</InputLabel>
        <Field
          as='select'
          name={name}
          id={id}
          onBlur={onBlur}
          value={value}
          onChange={onChange}
          bordererror={bordererror}
        >
          <option value={Gender.Male}>Male</option>
          <option value={Gender.Female}>Female</option>
          <option value={Gender.Other}>Other</option>
          <option value={Gender.None}>None</option>
        </Field>
      </InpuContainer>
      {errors && touched && (
        <ErrorContainer>
          <ErrorMessage name={name}>
            {(msg): ReactNode => {
              return <ErrorText>{msg}</ErrorText>;
            }}
          </ErrorMessage>
        </ErrorContainer>
      )}
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

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 0.4em;
  width: 100%;
  margin-top: 8px;
`;

const ErrorText = styled.label`
  color: red;
  max-width: 300px;
`;
