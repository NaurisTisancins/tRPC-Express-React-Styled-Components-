import React, { FC, ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';
import { TextInput } from './TextInput';
import { DropDown } from './DropDown';
import { Button } from './Button';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { trpc } from '../trpc';

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
  None = 'None',
}
interface IMoreCommentsFormData {
  telephoneNumber: string;
  gender: Gender;
  dateOfBirth: string;
}

const initialFormValues: IMoreCommentsFormData = {
  telephoneNumber: '',
  gender: Gender.None,
  dateOfBirth: '',
};

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema: Yup.SchemaOf<IMoreCommentsFormData> =
  Yup.object().shape({
    telephoneNumber: Yup.string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required(),
    gender: Yup.mixed<Gender>().oneOf(Object.values(Gender)).required(),
    dateOfBirth: Yup.string().required().trim(),
  });

interface IMoreCommentsProps {
  nextStep: (id: number) => void;
}

export const MoreCommentsForm: FC<IMoreCommentsProps> = ({ nextStep }) => {
  const moreComments = trpc.useMutation(['moreComments']);

  const handleSubmit = (values: IMoreCommentsFormData) => {
    moreComments.mutate({
      telephoneNumber: values.telephoneNumber,
      gender: values.gender,
      dateOfBirth: values.dateOfBirth,
    });
    nextStep(3);
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
                  label={'Telephone number'}
                  bordererror={
                    !!(errors.telephoneNumber && touched.telephoneNumber)
                  }
                  placeholder='Telephone number'
                  type='tel'
                  name='telephoneNumber'
                  id='telephoneNumber'
                  onBlur={handleBlur}
                  value={values.telephoneNumber}
                  onChange={handleChange}
                />
                {errors.telephoneNumber && touched.telephoneNumber && (
                  <ErrorMessage name='telephoneNumber'>
                    {(msg): ReactNode => {
                      return <ErrorText>{msg}</ErrorText>;
                    }}
                  </ErrorMessage>
                )}
              </InputRow>
              <InputRow>
                <DropDown
                  label={'Gender'}
                  bordererror={!!(errors.gender && touched.gender)}
                  name='gender'
                  id='gender'
                  onBlur={handleBlur}
                  value={values.gender}
                  onChange={handleChange}
                />
                {errors.gender && touched.gender && (
                  <ErrorMessage name='gender'>
                    {(msg): ReactNode => {
                      return <ErrorText>{msg}</ErrorText>;
                    }}
                  </ErrorMessage>
                )}
              </InputRow>
            </RowContainer>
            <InputRow>
              <TextInput
                label='Date of birth'
                bordererror={!!(errors.dateOfBirth && touched.dateOfBirth)}
                placeholder='Date Of Birth'
                type='date'
                name='dateOfBirth'
                id='dateOfBirth'
                onBlur={handleBlur}
                value={values.dateOfBirth}
                onChange={handleChange}
              />
              {errors.dateOfBirth && touched.dateOfBirth && (
                <ErrorMessage name='dateOfBirth'>
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
