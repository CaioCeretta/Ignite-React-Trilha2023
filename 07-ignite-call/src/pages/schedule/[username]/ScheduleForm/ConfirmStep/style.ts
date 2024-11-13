import { Box, styled, Text } from '@ignite-ui/react'

export const ConfirmForm = styled(Box, {
  maxWidth: 540,
  margin: '$6 auto 0',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4 ',

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$4',
  },
})

export const FormHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',

  paddingBottom: '$6',
  marginBottom: '$2',
  borderBottom: '1px solid $gray600',

  [`> ${Text}`]: {
    display: 'flex',
    alignItems: 'center',
    gap: '$1',

    svg: {
      color: '$gray200',
      marginRight: '$2',
    },
  },
})

export const FormError = styled(Text, {
  color: '#F75A68',
})

export const FormActions = styled('div', {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '$2',
  marginTop: '$2',
})
