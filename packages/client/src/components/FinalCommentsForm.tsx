import React, { FC, ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';
import { TextInput } from './TextInput';
import { DropDown } from './DropDown';
import { Button } from './Button';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { trpc } from '../trpc';

interface IFinalCommentsFormData {
  comments: string;
}

const initialFormValues: IFinalCommentsFormData = {
  comments: '',
};

const validationSchema: Yup.SchemaOf<IFinalCommentsFormData> =
  Yup.object().shape({
    comments: Yup.string().required().trim(),
  });

interface IFinalCommentsProps {
  nextStep?: (id: number) => void;
}

export const FinalCommentsForm: FC<IFinalCommentsProps> = () => {
  const finalComments = trpc.useMutation(['finalComments']);
  const handleSubmit = (values: IFinalCommentsFormData) => {
    finalComments.mutate({
      comments: values.comments,
    });
  };

  return (
    <Container>
      <Formik
        initialValues={initialFormValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          try {
            handleSubmit(values);
            resetForm();
          } catch (err) {
            console.log(err);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          status,
          isValid,
          dirty,
        }) => (
          <FormContainer onSubmit={handleSubmit}>
            <InputRow>
              <TextInput
                label={'Final comments'}
                bordererror={!!(errors.comments && touched.comments)}
                placeholder='Final comments'
                type='text-area'
                name='comments'
                id='comments'
                onBlur={handleBlur}
                value={values.comments}
                onChange={handleChange}
              />
              {errors.comments && touched.comments && (
                <ErrorMessage name='comments'>
                  {(msg): ReactNode => {
                    return <ErrorText>{msg}</ErrorText>;
                  }}
                </ErrorMessage>
              )}
            </InputRow>
            <ButtonContainer>
              <Button
                label={'Next >'}
                type={'submit'}
                disabled={!(dirty && isValid)}
              />
            </ButtonContainer>
          </FormContainer>
        )}
      </Formik>
    </Container>
  );
};

const Container = styled.div`
  display: flex;

  justify-content: center;
  flex-direction: column;
  padding: 16px;

  width: 100%;
  height: 100%;
`;

const FormContainer = styled(Form)`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
`;

const InputRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`;

const ErrorText = styled.label`
  color: red;
`;
