import { useState } from 'react';
import { UseFormTrigger } from 'react-hook-form';

interface useAccordionDTO<T extends object> {
  trigger: UseFormTrigger<any>;
  initialState: T;
}

interface handleUpdateStepDTO<T> {
  step: keyof T;
  fieldsToValidate?: string[];
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

  const getStepNumber = (key: keyof T) =>
    Object.keys(initialState).reduce<any>((acc, current, index) => {
      if (key === current) return index;
      return acc;
    }, 0);

  const getNextStep = (stepNumbem: number) =>
    Object.keys(baseProgressiveStep).filter(
      (_, index) => index === stepNumbem + 1,
    )[0];

  const handleUpdateStep =
    ({ step, fieldsToValidate = [] }: handleUpdateStepDTO<T>) =>
    async (e: any) => {
      const stepNumber = getStepNumber(step);
      e.stopPropagation();

      const isAbleToGO = await trigger(fieldsToValidate);
      if (!isAbleToGO) return;

      if (stepNumber === actualStep) {
        setActualStep((current) => current + 1);
        const keyStep = getNextStep(stepNumber);
        setWithStepIsOpen({ ...baseProgressiveStep, [keyStep]: true });
      } else if (stepNumber < actualStep) {
        const keyStep = getNextStep(stepNumber);
        setWithStepIsOpen({ ...baseProgressiveStep, [keyStep]: true });
      }
    };

  const toggleOpen = (name: keyof T) => {
    const step = getStepNumber(name);
    if (step > actualStep) return;
    setWithStepIsOpen({
      ...baseProgressiveStep,
      [name]: !withStepIsOpen[name],
    });
  };

  return {
    withStepIsOpen,
    actualStep,
    handleUpdateStep,
    toggleOpen,
    getStepNumber,
  };
}
