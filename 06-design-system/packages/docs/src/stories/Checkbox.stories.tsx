import { Box, Checkbox, Text, type CheckBoxProps } from '@ignite-ui/react'
import type { Meta, StoryObj } from '@storybook/react'

export default {
  title: 'Form/Check Box',
  component: Checkbox,
  decorators: ([
    (Story) => {
      return (
        <Box
          as="label"
          css={{display: 'flex', flexDirection: 'row', gap: '$2'}}
        >
          {Story()}
          <Text size="sm">Accept terms of use?</Text>
        </Box>
      )
    }
  ])
} as Meta<CheckBoxProps>


export const Primary: StoryObj<CheckBoxProps> = {}
