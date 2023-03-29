import React, { ReactNode } from 'react';
import Arrow from '../../../assets/arrow.svg';
import { AccordionTitle } from '../AccordionTitle';

import * as S from './styles';

type AccordionItemProps = {
  title: string;
  isOpen: boolean;
  step: number;
  actualStep: number;
  handleUpdateStep: (e: any) => Promise<void>;
  toggleOpen: () => void;
  children: ReactNode;
  isAbleToGO?: boolean;
  isFinalStep?: boolean;
};

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  isOpen,
  step,
  actualStep,
  handleUpdateStep,
  toggleOpen,
  children,
  isAbleToGO = true,
  isFinalStep = false,
}) => {
  const stepIsOk = isAbleToGO && step < actualStep;
  return (
    <S.AccordionContent
      arrow={Arrow}
      isOpen={isOpen}
      onClick={toggleOpen}
      isDisabled={step > actualStep}
    >
      <AccordionTitle title={title} stepIsOk={stepIsOk} step={step + 1} />

      {isOpen && (
        <S.FormSection onClick={(e: any) => e.stopPropagation()}>
          {children}
          <S.ButtonConteiner>
            <button onClick={handleUpdateStep} disabled={!isAbleToGO}>
              {isFinalStep ? 'Salvar' : 'Próximo passo'}
            </button>
          </S.ButtonConteiner>
        </S.FormSection>
      )}
    </S.AccordionContent>
  );
};
