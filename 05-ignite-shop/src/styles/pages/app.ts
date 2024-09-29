import { styled } from '..'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  /* We have also the possibility of using dvh instead of vh, dvh is dynamic view height, it can sometimes, make it a bit
  awkward to the user because it can cause layout shifts */
  minHeight: '100vh',
  justifyContent: 'center'
})

export const Header = styled('header', {
  padding: '2rem 0',
  /* The reason for this styling is
  The width 110% makes the element expand to fill 100% of its parent container, ensuring it can adapt to smaller screens
  or containers, if we don't put the width as 100%, it will only take the content length, if we put it to width: 1180,
  it will work as it was working, but 


  max width 1180 caps the width at 1180 pixels, preventing it from getting too wide on larger screens, basically
  largetWidth will make the element never exceed the defined pixels, and allow it to stay centered on larger screens
  while remaining responsive, without maxWidth, the element can stretch beyond the desired width, which might no be
  visuallly appealing to the user.

  But for responsitivity it's usually best to use width: 100% along with max-width: 1180px. Because this way the element
  can scale down when necessary while still having and upper limite on larger screen

  */



  width: '100%', 
  maxWidth: 1180,
  margin: '0 auto'
})