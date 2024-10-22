import type { Meta, StoryObj } from '@storybook/react'
import { Box, Text, TextArea, TextAreaProps } from '@ignite-ui/react'

export default {
  title: 'Typography/Text Area',
  component: TextArea,
  args: {},
  decorators: ([
    (Story) => {
      return (
        <Box
          as="label"
          css={{display: 'flex', flexDirection: 'column', gap: '$2'}}
        >
          <Text size="sm">Observations</Text>
          {Story()}
        </Box>
      )
    }
  ])
} as Meta<TextAreaProps>

export const Primary: StoryObj<TextAreaProps> = {
  args: {
    placeholder: 'Type your name'
  }
}

export const CustomTag: StoryObj<TextAreaProps> = {
  args: {
    placeholder: 'Type your name',
    disabled: true
  }
}
