import { Button, ButtonProps } from '@ignite-ui/react'
import type { Meta, StoryObj } from '@storybook/react'



export default {
  title: 'Button',
  component: Button,

  args: {
    children: 'Send'
  },

} as Meta<ButtonProps>

export const Primary: StoryObj<ButtonProps> = {
  args: {
    size: 'small'
  }
}

export const Big: StoryObj<ButtonProps> = {
  args: {
    size: 'big'
  }
}