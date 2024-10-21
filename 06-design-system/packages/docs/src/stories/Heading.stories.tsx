
import { Heading, HeadingProps } from '@ignite-ui/react'
import type { Meta, StoryObj } from '@storybook/react'

export default {
  title: 'Typography/Heading',
  component: Heading,
  args: {
    children: 'Heading example'
  }
} as Meta<HeadingProps>

export const Primary: StoryObj<HeadingProps> = {}

export const CustomTag: StoryObj<HeadingProps> = {
  args: {
    children: 'h1 heading',
    as: 'h1',
    size: 'xl'
  },
  parameters: {
    docs: {
      description: {
        story: 'By default, a heding will always be a `h2`, but we can change this by passing the property `as`'
      }
    }
  }
}

