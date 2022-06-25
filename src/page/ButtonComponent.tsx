import { Button } from '../lib/Button'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'
import { SectionTitle } from '../SectionTitle'

export function ButtonComponent() {
  async function awaitSomeSeconds() {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000)
    })
  }

  return (
    <article>
      <PageTitle>Button</PageTitle>

      <Sample direction="horizontal">
        <Button>Button</Button>
        <Button ghost>accept</Button>
        <Button rounded>cancel</Button>
        <Button ghost rounded>
          OK
        </Button>
      </Sample>

      <SectionTitle>Achromatic</SectionTitle>
      <Sample direction="horizontal">
        <Button tint="achromatic">Button</Button>
        <Button tint="achromatic" ghost>
          accept
        </Button>
        <Button tint="achromatic" rounded>
          cancel
        </Button>
        <Button tint="achromatic" ghost rounded>
          OK
        </Button>
      </Sample>

      <SectionTitle>Ghost</SectionTitle>
      <Sample direction="horizontal">
        <Button ghost>Button</Button>
        <Button ghost tint="achromatic">
          accept
        </Button>
        <Button ghost rounded>
          cancel
        </Button>
        <Button ghost tint="achromatic" rounded>
          OK
        </Button>
      </Sample>

      <SectionTitle>Rounded</SectionTitle>
      <Sample direction="horizontal">
        <Button rounded>Button</Button>
        <Button rounded tint="achromatic">
          accept
        </Button>
        <Button rounded ghost>
          cancel
        </Button>
        <Button rounded tint="achromatic" ghost>
          OK
        </Button>
      </Sample>

      <SectionTitle>Disabled</SectionTitle>
      <Sample direction="horizontal">
        <Button disabled>Button</Button>
        <Button tint="achromatic" disabled>
          accept
        </Button>
        <Button ghost disabled>
          cancel
        </Button>
        <Button tint="achromatic" ghost disabled>
          OK
        </Button>
      </Sample>

      <SectionTitle>onClick function that returns a Promise</SectionTitle>
      <Sample direction="horizontal">
        <Button onClick={awaitSomeSeconds}>Submit</Button>
        <Button ghost onClick={awaitSomeSeconds}>
          Send
        </Button>
        <Button tint="achromatic" onClick={awaitSomeSeconds}>
          Save
        </Button>
        <Button tint="achromatic" ghost onClick={awaitSomeSeconds}>
          Purchase
        </Button>
      </Sample>
    </article>
  )
}
