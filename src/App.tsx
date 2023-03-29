import { useForm } from 'react-hook-form';
import { AccordionItem } from './components/AccordionForm/AccordionItem';
import { useAccordion } from './components/AccordionForm/hooks/useAccordion.hook';

const initialFormAccordion = {
  section1: true,
  section2: false,
};

type formSteps = typeof initialFormAccordion;

function App() {
  const { trigger, register } = useForm();
  const { actualStep, handleUpdateStep, toggleOpen, withStepIsOpen } =
    useAccordion<formSteps>({
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
          step={0}
          actualStep={actualStep}
          handleUpdateStep={handleUpdateStep(0)}
          toggleOpen={() => toggleOpen('section1', 0)}
        >
          <label htmlFor="name-text">Name</label>
          <input id="name-text" type="text" {...register('name')} />
        </AccordionItem>
        <AccordionItem
          title={'Sessão 2'}
          isOpen={withStepIsOpen.section2}
          step={1}
          actualStep={actualStep}
          handleUpdateStep={handleUpdateStep(1)}
          toggleOpen={() => toggleOpen('section2', 1)}
        >
          <label htmlFor="chocolate-text">Gosta de chocolate?</label>
          <input id="chocolate-text" type="text" {...register('chocolate')} />
        </AccordionItem>
      </form>
    </div>
  );
}

export default App;
