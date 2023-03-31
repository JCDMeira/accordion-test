import styled, { css } from 'styled-components';

type AccordionContentProps = {
  isOpen: boolean;
  arrow: any;
  isDisabled: boolean;
};
export const AccordionContent = styled.div<AccordionContentProps>`
  ${({ isOpen, arrow, isDisabled }) => css`
    width: 100%;

    padding: 24px;
    gap: 32px;
    border-radius: 8px;

    background-color: #ffff;

    position: relative;
    margin-bottom: 16px;

    .click {
      cursor: ${isDisabled ? 'not-allowed' : 'pointer'};
    }

    :after {
      ${isOpen && 'transform: rotate(180deg);'};
      cursor: ${isDisabled ? 'not-allowed' : 'pointer'};
      transition: all 0.3s ease-in;
      content: url(${arrow});
      position: absolute;
      right: 28px;
      top: 24px;
    }
  `}
`;

export const FormSection = styled.div`
  margin-top: 24px;
  width: 100%;
`;

export const ButtonConteiner = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    cursor: pointer;
  }
`;
