import type { Meta, StoryObj } from '@storybook/react'
import { Text, TextProps } from '@ignite-ui/react'

export default {
  title: 'Typography/Text',
  component: Text,
  args: {
    size: 'md',
    children:
      `Lorem ipsum dolorsit amet consectetur adipisicing elit. Quaerat doloribus voluptas blanditiis unde autem? Autem
      minus ipsa consequatur itaque, unde, voluptas saepe, expedita hic ab alias ullam exercitationem! Similique, tenetur.`
  },
  argTypes: {
    size: {
      options: ["sm", "md", "lg", "xl", "2xl", "4xl", "5xl", "6xl", undefined],
      control: {
        type: 'inline-radio'
      }
    }
  }
} as Meta<TextProps>


export const Primary: StoryObj<TextProps> = {}

export const CustomTag: StoryObj<TextProps> = {
  args: {
    children: 'Strong Text',
    as: 'strong'
  }
}
