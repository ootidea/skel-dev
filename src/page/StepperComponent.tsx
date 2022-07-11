import { Stepper } from '../lib/Stepper'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'
import { SectionTitle } from '../SectionTitle'

export function StepperComponent() {
  return (
    <article>
      <PageTitle>Stepper</PageTitle>

      <Sample>
        <Stepper titles={['first', 'second', 'third']} currentStep={0} />
        <Stepper titles={['first', 'second', 'third']} currentStep={1} />
        <Stepper titles={['first', 'second', 'third']} currentStep={2} />
      </Sample>

      <SectionTitle>Out of range</SectionTitle>
      <Sample>
        <Stepper titles={['first', 'second', 'third']} currentStep={-1} />
        <Stepper titles={['first', 'second', 'third']} currentStep={3} />
      </Sample>
    </article>
  )
}
