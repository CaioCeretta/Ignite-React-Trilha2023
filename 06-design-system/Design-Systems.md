# What are Design Systems?

## What are design systems? 

Let's use a big enterprise such as the own rocketseat. Design systems are important because, let's think about a company
with large teams on it, Each team is developing a front end project, it's very common that the applications layout end up
going out of the company pattern, but we want them to be followed in all applications, so in the end of the day, the user
won't notice the transition between all those apps and everytime the same kind of layout, spacings, colors, are used throughout
all the layouts.
It's very common, inside the design area, as well as the programming area, many times these patterns aren't followed and
we end up having some minimal alterations on the patterns and differences between all these layouts.

A design system must be agnostic of technologies as much as possible, even though our apps component are not entirely agnostic,
unless we utilize a solidjs, which is a library we can write a component format, and are able to use them in many languages
like react, vue, angular... We need to understand that there are some things about design systems that  are not specific
to our react package, but global code, such as the tokens, the colors, font sizes, widths, all of these they are independent
of react, the components we can only write them with the use some sort of library, such as react, vue or web components.

The tokens are easilly shared throughout all of these projects, so it's very common for us to divide our projects into
much smaller packages, and one these packages is the Token package, that is a package where all the shared variables are
going to be in.


## Design Systems Concept

Because of all of that that has been said, this is where the design system concept came in. A design system is a docummentation
of the patterns to be followed on the layout of many applications inside the company.

A design system is all and any visual element that can be shared inside any company application. So it's not a UI library.
It's common to think that we are going to include inside the design system, any component we may have in more than one
application, but this is not the concept.

The concept of a design system is for us to include inside of it, only visual elements that can be reused in ANY application,
not in two or three. So if we have visual elements that we understand that cannot be shared to ANY application of the company,
for those cases we create a UI Kit.

In rocketseat design systems, we are able to find things that are very specific and can be shared with any application.
So we'll find the avatar element, dropdowns, tooltips, modals, many elements which can be shared, so they can be in an
app that is an admin panel, or a end user front end, or any application we want.

## What are UI Kits, and why to use tem?

As said before, if one element, cannot be used in one other application, it's not meant to be placed on the design system,
this is where the UI Kit comes in, they are a collection of components reusable between the apps, so if we see that two
applications are using the same menu layout, we can create a UI kit to install many smaller packages of components.


## Design Systems Components

- Text

Even though this component does not have many behaviors, because at the end of the day, it's just a text, it's useful for
us to standardize the family font that is being used, the font size, font color, and so on.
This text element can be used for each text on the page, such as paragraphs, labels, etc.

- Heading

Our app headings, it standardizes the font, because many times in our app, we have the font we use for the headings, and
the font we use for the text, the font weight also differs, so is normally created two different components for this part.

- Box / Card

Box is the component which is easily reused in many places of the application, in the rocketseat, for example. it has a box
with a default padding, default border, and is reutilized in many places.

- Button

Button is one of the most common components to be in a design system.

- Text input

- Textarea
- 
- Checkboxk 

Checkbox are also standarized, because many times they have a different styling from the default html styling, such as
different sizes, different fill colors, etc.

- Avatar

Avatars can have different sizes, border-radius, so it's also common to be reused in many places.

-  MultiStep Form
  
This is a component where we have the steps indicator for forms that have more than one step to finish. 

## What we are not going to put in our Design System?

If we look more deeper into the app, things like a calendar, a calendar may not be something that can't be easily reused
in different apps, only in applications that are specific to bookings. It is a component that won't be useful in other types
of apps. So in summary it does not belong to the design system but a possible UI Kit.

## Storybook

First of all, we are going to create, inside the packages folder a doc folder and inside that folder we'll run:

npx sb init --builder @storybook/builder-vite --type react

Now, because we are using a monorepo and we already have a eslint package to extend from, we'll remove the package.json
eslint property, delete all the eslints from the package.json, and import our @ignite-ui/eslint-config in our package.json
and then create a .eslintrc.json just like the others.

For creating our first story, we'll create a Button.stories.tsx where we are going to be able to use the button we exported
from our index.ts in our react package, with:

import { Button } from '@ignite-ui/react'

Now, on every story file, we'll import two things from @storybook/react, which are StoryObj, Meta, that are two ts typings
and the reason why we import meta, is because on the stories we export an object as default and cast it as Meta, so now
we are going to know the object shape and know which parameters we can pass.

Now for the Button, besides exporting the Button, we need to export a variation of this button. 

The storybook needs the component to have at least one variation, in our case, we exporting another const named `Primary`
and for that object, we can pass args, args are arguments we can pass properties inside of it. In the end the could will
look something like, e.g.

```ts
export const Primary: StoryObj = {
  args: {
    children: 'Send',
  },
}
```






