import React, { FC, ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';
import { TextInput } from './TextInput';
import { Button } from './Button';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { trpc } from '../trpc';

export interface IYourDetailsFormData {
  firstName: string;
  surname: string;
  email: string;
}

const initialFormValues: IYourDetailsFormData = {
  firstName: '',
  surname: '',
  email: '',
};

const validationSchema: Yup.SchemaOf<IYourDetailsFormData> = Yup.object().shape(
  {
    firstName: Yup.string()
      .required('Required')
      .trim()
      .min(2, 'First name should contain atleast 2 characters.')
      .max(30, 'First name should contain less than 30 characters.'),
    surname: Yup.string()
      .required('Required')
      .trim()
      .min(2, 'Surname should contain atleast 2 characters.')
      .max(30, 'Surname should contain less than 30 characters.'),
    email: Yup.string()
      .email('Incorect email. Please try again!')
      .required('Required'),
  }
);

interface IPersonalDetailsProps {
  nextStep: (id: number) => void;
}

export const PersonalDetailsForm: FC<IPersonalDetailsProps> = ({
  nextStep,
}) => {
  const saveYourDetails = trpc.useMutation(['saveYourDetails']);

  const handleSubmit = (values: IYourDetailsFormData) => {
    saveYourDetails.mutate({
      firstName: values.firstName,
      surname: values.surname,
      email: values.email,
    });
    nextStep(2);
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
            <RowContainer>
              <InputRow>
                <TextInput
                  label={'First Name'}
                  bordererror={!!(errors.firstName && touched.firstName)}
                  placeholder='First name'
                  type='text'
                  name='firstName'
                  id='firstName'
                  onBlur={handleBlur}
                  value={values.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && touched.firstName && (
                  <ErrorMessage name='firstName'>
                    {(msg): ReactNode => {
                      return <ErrorText>{msg}</ErrorText>;
                    }}
                  </ErrorMessage>
                )}
              </InputRow>
              <InputRow>
                <TextInput
                  label={'Surname'}
                  bordererror={!!(errors.surname && touched.surname)}
                  placeholder='Surname'
                  type='text'
                  name='surname'
                  id='surname'
                  onBlur={handleBlur}
                  value={values.surname}
                  onChange={handleChange}
                />
                {errors.surname && touched.surname && (
                  <ErrorMessage name='surname'>
                    {(msg): ReactNode => {
                      return <ErrorText>{msg}</ErrorText>;
                    }}
                  </ErrorMessage>
                )}
              </InputRow>
            </RowContainer>
            <InputRow>
              <TextInput
                label={'Email'}
                bordererror={!!(errors.email && touched.email)}
                placeholder='Email'
                type='email'
                name='email'
                id='email'
                onBlur={handleBlur}
                value={values.email}
                onChange={handleChange}
              />
              {errors.email && touched.email && (
                <ErrorMessage name='email'>
                  {(msg): ReactNode => {
                    return <ErrorText>{msg}</ErrorText>;
                  }}
                </ErrorMessage>
              )}
            </InputRow>
            <ButtonContainer>
              <Button
                disabled={!(isValid && dirty)}
                label={'Next >'}
                type={'submit'}
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

const RowContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: row;
  gap: 16px;
`;

const InputRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
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
