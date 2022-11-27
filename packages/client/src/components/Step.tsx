import React, { FC, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { FormType } from '../types/formTypes';
import { PersonalDetailsForm } from './PersonalDetailsForm';
import { MoreCommentsForm } from './MoreCommentsForm';
import { FinalCommentsForm } from './FinalCommentsForm';

interface IStepProps {
  id: number;
  title: string;
  formType: FormType;
  expanded: boolean;
  expand: (id: number) => void;
}

export const Step: FC<IStepProps> = ({
  id,
  title,
  formType,
  expanded,
  expand,
}) => {
  // switch for form type
  const switchFormtype = useMemo(() => {
    switch (formType) {
      case FormType.personalDetails:
        return <PersonalDetailsForm nextStep={expand} />;
      case FormType.moreComments:
        return <MoreCommentsForm nextStep={expand} />;
      case FormType.finalComments:
        return <FinalCommentsForm />;
    }
  }, [formType]);

  return (
    <CollapsableConatainer onClick={() => expand(id)}>
      <Collapsable type='checkbox' checked={expanded} />
      <Label expanded={expanded}>{title}</Label>
      <CollapsableContent expanded={expanded}>
        {switchFormtype}
      </CollapsableContent>
    </CollapsableConatainer>
  );
};

const CollapsableConatainer = styled.div`
  width: 100%;
  font-family: monospace;
`;

const Collapsable = styled.input`
  display: none;
`;

const Label = styled.label<{ expanded: boolean }>`
  display: flex;
  font-weight: bold;
  font-size: 1.2rem;

  text-align: center;

  padding: 1rem;

  color: whitesmoke;
  background: orange;

  cursor: pointer;

  border-radius: 7px;
  transition: all 0.25s ease-out;
  &:hover {
    color: #7c5a0b;
  }
  ${({ expanded }) =>
    expanded &&
    `
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    `}
`;

const CollapsableContent = styled.div<{ expanded: boolean }>`
  max-height: 0px;
  overflow: hidden;

  transition: max-height 0.25s ease-in-out;

  background: lightgray;

  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
  ${({ expanded }) =>
    expanded &&
    `
    max-height: 100vh;`}
`;
