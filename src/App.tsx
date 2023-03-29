import { useForm } from 'react-hook-form';
import { AccordionItem } from './components/AccordionForm/AccordionItem';
import { useAccordion } from './components/AccordionForm/hooks/useAccordion.hook';

const initialFormAccordion = {
  section1: true,
  section2: false,
  section3: false,
};

type formSteps = typeof initialFormAccordion;

function App() {
  const { trigger, register } = useForm();
  const {
    actualStep,
    handleUpdateStep,
    toggleOpen,
    withStepIsOpen,
    getStepNumber,
  } = useAccordion<formSteps>({
    trigger,
    initialState: initialFormAccordion,
  });

  return (
    <div className="App">
      <h1>hello</h1>

      <form action="" style={{ maxWidth: '400px' }}>
        <AccordionItem
          title={'Sessão 1'}
          isOpen={withStepIsOpen.section1}
          stepNumber={getStepNumber('section1')}
          actualStep={actualStep}
          handleUpdateStep={handleUpdateStep({ step: 'section1' })}
          toggleOpen={() => toggleOpen('section1')}
        >
          <label htmlFor="name-text">Name</label>
          <input id="name-text" type="text" {...register('name')} />
        </AccordionItem>
        <AccordionItem
          title={'Sessão 2'}
          isOpen={withStepIsOpen.section2}
          stepNumber={getStepNumber('section2')}
          actualStep={actualStep}
          handleUpdateStep={handleUpdateStep({ step: 'section2' })}
          toggleOpen={() => toggleOpen('section2')}
        >
          <label htmlFor="chocolate-text">Gosta de chocolate?</label>
          <input id="chocolate-text" type="text" {...register('chocolate')} />
        </AccordionItem>
        <AccordionItem
          title={'Sessão 3'}
          isOpen={withStepIsOpen.section3}
          stepNumber={getStepNumber('section3')}
          actualStep={actualStep}
          handleUpdateStep={handleUpdateStep({ step: 'section3' })}
          toggleOpen={() => toggleOpen('section3')}
        >
          <label htmlFor="coffee-text">Gosta de café?</label>
          <input id="coffee-text" type="text" {...register('coffee')} />
        </AccordionItem>
      </form>
    </div>
  );
}

export default App;
