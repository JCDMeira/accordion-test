import styled from 'styled-components';

export const SectionTitle = styled.div`
  height: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const StepConteiner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 16px;

  width: 32px;
  height: 16px;

  background: #ffaa;
  border-radius: 90px;

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const SvgConteiner = styled(StepConteiner)`
  color: #ffffff;
  background: #00ff00;
`;
