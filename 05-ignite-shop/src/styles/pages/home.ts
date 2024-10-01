import image from "next/image";
import { styled } from "..";

/*
  HomeContainer: styled main, which is of display flex, meaning the images will be one to the right of the other and will
  be parent of the whole code, including the products

  Product: styled div, it has a display of flex, contains the image and the footer, which is where we are going to display
  the product informations

  One thing we need to do here, is that we have the gap between the images, but we have a bigger margin on the left side.

  And as we style, we may think: "Ok, i just need to add a margin left to the container" , but the problem here lies on
  if we, for example, zoom out the page, because, for instance

  We have a container of 1200px, our box is occupying 80% of it, that is the specific size plus the remaining margin it has
  on the right, and this margin on the left, should also exist.

  The is when we have to figure out what's going to happen if we zoom out the page. What should happen is, the left margin,
  could increase but the box must remain "glued" to the right. 

  So in pure css, it's not so simple to do this, what we'll need to do is:

  1. The images container will have a fixed width, it will start showing two images and will eventually show more with the
  carousel
  2. We are going to need that the elements container have the width be 1180px + the additional margin we have to the right
  3. To obtain the number we'll have to do a CSS calculation, which is 1180 + the right margin, and to get this number we
  will take the screen width as a whole - 1180, that will return both the left and the right margin. Because now we have the
  width of these 2 little boxes, we will divide this number by 2 so in the end it will be

  1180 + ((screenWidth - 1180) / 2)

  4. Now that we got this value, we are going to set it on the maxWidth of the container, set a marginLeft of auto, which
  will cause the component to be pushed to the right, because now the left margin is all the remaining space

  5. If we zoom out now, the div will keep growing to the right, because the left margin is the remaining space.


  EXPLANATION OF THE INIFINITE BEHAVIOR

  The reason this appears to be infinite to the right is mainly because the maxWidth calculation, and for these reasons.

  1. 100vw is the width of the viewport, we're subtracting (100vw - 1180px) / 2, which ensures that the container is
  centered and maintains a maximum width of 1180px within a viewport larget than that.

  2. marginLeft: 'auto' pushes the container to the right, occupying all the remaining space on the left side. Since the
  width is 100% of its parent container, due to width: '100%', and the maxWidth is restricting it only to a specific size,
  the element appears to grow towards the right without boundaries beyond its maximum width.

  So while the width is controlled by maxWidth, the margin-left makes it look like it expands indefinetly to the right within
  the available space. In essence, the container isn't tryly infinite but sretches to fill the space until restricted by
  the maxWidth rule.

  The maxWidth in this case, is dynamic, because this calculation is responsive to the viewport width, so as the viewport
  increases, the result of the calculation grows as well

  ** END OF EXPLANATION **

  Now, after we finally adjusted that behavior, for styling the product, which is a styled anchor
  we'll start by adding a background linear gradient for each product

  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)

  0deg: Starts from the top and goes down
  90 deg: Starts from the left and goes to the right
  180deg: Starts from the bottom and goes to the top
  270deg: starts from the right and goes to the left

  


*/


export const HomeContainer = styled('main', {
  display: 'flex',
  width: '100%',
  // gap: 3,
  /*  if we use this gap to the separate the items inside the container, the slider won't understand this gap to contabilize
    in the size of the slider and it will cause the container to be smaller. A visual effect of this will be the container
    to be smaller than it should. So we'll utilize a padding in the product file
  */
  maxWidth: 'calc(100vw - (100vw - 1180px) / 2)',
  marginLeft: 'auto',
  minHeight: '656px'
})

export const Product = styled('a', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  cursor: 'pointer',
  /* to indicate this is a link (if the link had an href the pointer woudln't be needed), */
  padding: '0.25rem',
  // Because the footer will have a position absolute, so it will be right at the bottom. over the image
  position: 'relative',
  overflow: "hidden",
  

  /* For the image to be completely centralized in the container, it will be a flex, with both justify and align center. */
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: { 
    /* We imported that image with the dimensions of 520 x 480, one thing we can do, is everytime we do this, to keep the
    ratio, to work with the property objectFit, in this case, we'll use the cover value,

    cover: Makes the image keep the ratio and fit the container
    
    */
    objectFit: 'cover'
  },

  footer: {
    /* This style will ensure that the footer be absolute to its parent, which is this container, and with its position
    right at the bottom of the container
    
    the right and left of 0.25 rem, is just to make sure that the div takes all the width from the container, but with
    0,25 rem on each "margin"
    */

    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    padding: '2rem',

    

    borderRadius: 6,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: 'rgba(0, 0, 0, 0.6)',

    transform: 'translateY(110%)',
    /* So the text will be below the container height, so when we hover, it slides up*/
    opacity: 0,
    transition: 'all 0.2s ease-in-out',

    strong: {
      fontSize: '$lg',
      color: '$gray-100',
    },

    span: {
      fontSize: '$md',
      fontWeight: 'bold',
      color: '$green-300'
    },
  },


    /* When we hover over our link, the footer will show up */
    '&:hover': {
      footer: {
        transform: 'translateY(0%)',
        opacity: 1
      }
    }

})