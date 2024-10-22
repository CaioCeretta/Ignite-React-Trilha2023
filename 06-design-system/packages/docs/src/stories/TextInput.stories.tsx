import type { Meta, StoryObj } from '@storybook/react'
import { Box, Text, TextInput, TextInputProps } from '@ignite-ui/react'

export default {
  title: 'Form/Text Input',
  component: TextInput,
  /* Decorators is another property we can pass, they are a way for us to customize the view that shows our component, so
  besides the component, other things can be showed without being a children of the component, like functional components,
  components are functions that return us a jsx.
  These functions, receive as a parameter the Story, the Story is basically a function that will render our input

  so if we do something like decorators: [(Story) => (<Box><Story/></Box)], because the story is what will render our component
  our component will now be rendered inside the box.
  */
  decorators: [
    (Story) => {
      return (
        <Box as="label" css={{
          display: 'flex',
          flexDirection: 'column',
          gap: '$2'
        }}>
          <Text size='sm'>E-mail Address</Text>
          <Story />
        </Box>
      )
    }
  ]

} as Meta<TextInputProps>


export const Primary: StoryObj<TextInputProps> = {
  args: {
    placeholder: 'Type your name',
  }
}

export const Disabled: StoryObj<TextInputProps> = {
  args: {
    disabled: true,
    prefix: 'cal.com/'
  }
}


export const WithPrefix: StoryObj<TextInputProps> = {
  args: {
    prefix: 'cal.com/'
  }
}
