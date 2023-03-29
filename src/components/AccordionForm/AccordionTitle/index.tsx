import React from 'react';
import * as S from './styles';

type AccordionTitleProps = {
  title: string;
  stepIsOk: boolean;
  step: number;
};

export const AccordionTitle: React.FC<AccordionTitleProps> = ({
  title,
  stepIsOk,
  step,
}) => {
  return (
    <S.SectionTitle>
      {stepIsOk ? (
        <S.SvgConteiner>
          <span>icon</span>
        </S.SvgConteiner>
      ) : (
        <S.StepConteiner>
          <span>{step}</span>
        </S.StepConteiner>
      )}
      <span>{title}</span>
    </S.SectionTitle>
  );
};
