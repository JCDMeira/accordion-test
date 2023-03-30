import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { object, string } from 'yup';
import { AccordionItem } from './components/AccordionForm/AccordionItem';
import { useAccordion } from './components/AccordionForm/hooks/useAccordion.hook';
import * as S from './style';

const initialFormAccordion = {
  section1: true,
  section2: false,
  section3: false,
};

type formSteps = typeof initialFormAccordion;
type formFields = typeof defaultValues;

const userSchema = object({
  name: string().required(),
  chocolate: string().required(),
  coffee: string().required(),
});
const defaultValues = {
  name: '',
  chocolate: '',
  coffee: '',
};

const isEmpty = (obj: object) => Object.keys(obj).length === 0;

function App() {
  const {
    trigger,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(userSchema),
    reValidateMode: 'onChange',
    mode: 'all',
  });

  const {
    actualStep,
    handleUpdateStep,
    toggleOpen,
    withStepIsOpen,
    getStepNumber,
    isAbleToSubmit,
  } = useAccordion<formSteps, formFields>({
    trigger,
    initialState: initialFormAccordion,
  });

  const onSubmit = async (formData: any) => {
    console.log(formData);
  };

  const errorS1 = !!errors.name;
  const errorS2 = !!errors.chocolate;
  const errorS3 = !!errors.coffee;

  return (
    <S.Conteiner>
      <form
        action=""
        style={{ width: '400px' }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <AccordionItem
          title={'Sessão 1'}
          isOpen={withStepIsOpen.section1}
          stepNumber={getStepNumber('section1')}
          actualStep={actualStep}
          handleUpdateStep={handleUpdateStep({
            step: 'section1',
            fieldsToValidate: ['name'],
          })}
          toggleOpen={() => toggleOpen('section1')}
          isAbleToGO={!errorS1}
        >
          <label htmlFor="name-text">Name</label>
          <input id="name-text" type="text" {...register('name')} />
          {!!errors.name?.message && (
            <S.ErrorMessage>{errors.name?.message}</S.ErrorMessage>
          )}
        </AccordionItem>

        <AccordionItem
          title={'Sessão 2'}
          isOpen={withStepIsOpen.section2}
          stepNumber={getStepNumber('section2')}
          actualStep={actualStep}
          handleUpdateStep={handleUpdateStep({
            step: 'section2',
            fieldsToValidate: ['chocolate'],
          })}
          toggleOpen={() => toggleOpen('section2')}
          isAbleToGO={!errorS2}
        >
          <label htmlFor="chocolate-text">Gosta de chocolate?</label>
          <input id="chocolate-text" type="text" {...register('chocolate')} />
          {!!errors.chocolate?.message && (
            <S.ErrorMessage>{errors.chocolate?.message}</S.ErrorMessage>
          )}
        </AccordionItem>

        <AccordionItem
          title={'Sessão 3'}
          isOpen={withStepIsOpen.section3}
          stepNumber={getStepNumber('section3')}
          actualStep={actualStep}
          handleUpdateStep={handleUpdateStep({
            step: 'section3',
            fieldsToValidate: ['coffee'],
          })}
          toggleOpen={() => toggleOpen('section3')}
          isAbleToGO={!errorS3}
          isFinalStep
        >
          <label htmlFor="coffee-text">Gosta de café?</label>
          <input id="coffee-text" type="text" {...register('coffee')} />
          {!!errors.coffee?.message && (
            <S.ErrorMessage>{errors.coffee?.message}</S.ErrorMessage>
          )}
        </AccordionItem>

        <button type="submit" disabled={!isEmpty(errors) || !isAbleToSubmit()}>
          Enviar
        </button>
      </form>
    </S.Conteiner>
  );
}

export default App;
