import { useState } from 'react';
import { UseFormTrigger } from 'react-hook-form';

interface useAccordionDTO<T extends object, R extends object> {
  trigger: UseFormTrigger<R>;
  initialState: T;
}

interface handleUpdateStepDTO<T, R> {
  step: keyof T;
  fieldsToValidate?: Array<keyof R>;
}

export function useAccordion<T extends object, R extends object>({
  trigger,
  initialState,
}: useAccordionDTO<T, R>) {
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

  const getNextStep = (stepNumber: number) =>
    Object.keys(baseProgressiveStep).filter(
      (_, index) => index === stepNumber + 1,
    )[0];

  const setStepStatus = (keyStep: string) =>
    setWithStepIsOpen({ ...baseProgressiveStep, [keyStep]: true });

  const isAbleToSubmit = () => {
    const totalSteps = Object.keys(initialState).map((step) => step).length - 1;
    return actualStep > totalSteps;
  };

  const handleUpdateStep =
    ({ step, fieldsToValidate = [] }: handleUpdateStepDTO<T, R>) =>
    async (e: any) => {
      e.stopPropagation();

      const isAbleToGO = await trigger(fieldsToValidate as any);
      if (!isAbleToGO) return;

      const stepNumber = getStepNumber(step);
      const keyStep = getNextStep(stepNumber);

      if (stepNumber === actualStep) {
        setActualStep((current) => current + 1);
      }
      setStepStatus(keyStep);
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
    isAbleToSubmit,
  };
}
