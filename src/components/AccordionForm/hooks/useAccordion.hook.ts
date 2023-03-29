import { useState } from 'react';
import { UseFormTrigger } from 'react-hook-form';

interface useAccordionDTO<T extends object> {
  trigger: UseFormTrigger<any>;
  initialState: T;
}

export function useAccordion<T extends object>({
  trigger,
  initialState,
}: useAccordionDTO<T>) {
  const [withStepIsOpen, setWithStepIsOpen] = useState(initialState);
  const [actualStep, setActualStep] = useState(0);

  const baseProgressiveStep = Object.keys(initialState).reduce(
    (acc, actual) => {
      return { ...acc, [actual]: false } as T;
    },
    {} as T,
  );

  const handleUpdateStep =
    (step: number, fieldsToValidate = []) =>
    async (e: any) => {
      e.stopPropagation();

      const isAbleToGO = await trigger(fieldsToValidate);
      if (!isAbleToGO) return;

      if (step === actualStep) {
        setActualStep((current) => current + 1);
        const keyStep = Object.keys(baseProgressiveStep).filter(
          (_, index) => index === step + 1,
        )[0];
        setWithStepIsOpen({ ...baseProgressiveStep, [keyStep]: true });
      } else if (step < actualStep) {
        const keyStep = Object.keys(baseProgressiveStep).filter(
          (_, index) => index === step + 1,
        )[0];
        setWithStepIsOpen({ ...baseProgressiveStep, [keyStep]: true });
      }
    };

  const toggleOpen = (name: keyof T, step: number) => {
    if (step > actualStep) return;
    setWithStepIsOpen({
      ...baseProgressiveStep,
      [name]: !withStepIsOpen[name],
    });
  };

  return { withStepIsOpen, actualStep, handleUpdateStep, toggleOpen };
}
