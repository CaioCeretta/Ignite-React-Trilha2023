import type { Meta, StoryObj } from '@storybook/react'
import { Text, TextProps } from '@ignite-ui/react'

export default {
  title: 'Typography/Text',
  component: Text,
  args: {
    children:
      `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat doloribus voluptas blanditiis unde autem? Autem
      minus ipsa consequatur itaque, unde, voluptas saepe, expedita hic ab alias ullam exercitationem! Similique, tenetur.`
  }
} as Meta<TextProps>


export const Primary: StoryObj<TextProps> = {}

export const CustomTag: StoryObj<TextProps> = {
  args: {
    children: 'Strong Text',
    as: 'strong'
  }
}
