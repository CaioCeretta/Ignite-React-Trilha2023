import { styled } from "..";

export const SuccessContainer = styled('main', {
  display: 'flex',
  flexDirection: "column",
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',

  h1: {
    fontSize: '$2xl',
    color: '$gray-100'
  },

  p: {
    fontSize: '$xl',
    color: '$gray-300',
    maxWidth: 560,
    textAlign: "center",
    marginTop: '2rem',
    lineHeight: 1.4
  },

  a: {
    display: 'block',
    paddingTop: '5rem',
    fontSize: '$lg',
    color: '$green-500',
    textDecoration: "none",
    fontWeight: "bold",

    '&:hover': {
      color: '$green-300'
    }

  }

})

export const ImageContainer = styled('main', {
  width: '100%',
  maxWidth: 130,
  height: 145,
  background: 'linear-gradient(180deg, #1EA483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',
  marginTop: "4rem",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",



  img: {
    objectFit: "cover"
  }
})