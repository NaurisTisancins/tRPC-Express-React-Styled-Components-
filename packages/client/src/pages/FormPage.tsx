import React, { useState } from 'react';
import styled from 'styled-components';
import { Step } from '../components/Step';
import { FormType } from '../types/formTypes';

const steps = [
  { id: 1, name: 'Step 1: Your details', formType: FormType.personalDetails },
  { id: 2, name: 'Step 2: More comments', formType: FormType.moreComments },
  { id: 3, name: 'Step 3: Final Coments', formType: FormType.finalComments },
];

type StepType = {
  id: number;
  name: string;
  formType: FormType;
};

export const FormPage = () => {
  const [step, setStep] = useState<StepType>(steps[0]);

  const isExpanded = (id: number): boolean => {
    return id === step.id;
  };

  const expandStep = (id: number) => {
    console.log('setting next step');
    const filter = steps.filter((item) => {
      return item.id === id;
    });
    setStep(() => {
      return filter[0];
    });
  };

  return (
    <FormPageContainer>
      {steps.map((item) => {
        return (
          <Step
            id={item.id}
            key={item.id}
            title={item.name}
            formType={item.formType}
            expanded={isExpanded(item.id)}
            expand={expandStep}
          />
        );
      })}
    </FormPageContainer>
  );
};

const FormPageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 8px;
  gap: 8px;
  width: 70vw;
  background-color: white;
  border-radius: 16px;
`;
