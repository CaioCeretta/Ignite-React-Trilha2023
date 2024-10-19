# Monorepo

## What is monorepo?

Monorepo is basically we put many projects inside a single repository and by repository we are not saying a single git
repository or github, we can think of it of a same folder to all these projects.  

But monorepo isn't simply allocating many projects in the same folder, the deal is, this strattegy is mainly used when
projects are dependent on each other.

Let's say we're building some sort of application and i'm working on a specific folder, but on the meanwhile, inside of the
same folder, i have another package, for a different purpose, such as programming language. 

This other package, he has as a dependency the tokens package, and it is very common we having to make updates both on
the tokens package and the other package at the same time, but it wouldn't make sense that both of these applications are
in separated projects, because then we would need to make a change on the tokens project, publish it on npm, then on the
other language package, download this new update to then, be able to use these updates.

When we work with monorepos inside js, we are able to work on many "different" projects, inside the same structure and at
the same time. We can say that this other language package has a dependency which is the tokens package, make the imports
of the tokens package, directly into this one, and vice versa, without having to publish any of them inside the npm.

## How to work with mono repos?

Let's say that this other project we were talking about is a react project. and i'm going to write down the steps we are
going to execute

- Run a npm init
- Install typescript and tsup
- update the package name to which name we want according to our monorepo
- Add these two scripts for the build 
    "build": "tsup src/index.ts --format esm,cjs --dts",
    "dev": "tsup src/index.ts --format esm,cjs --dts --watch"
- Create a src folder and a file with a simple console.log to check if the ts build is working
- Run the build and we'll see that it is working.

Now after this process is done, we'll go back to the root project folder, which is the parent folder of the packages
that encloses the tokens and react folder, and inside of it, we will also run a npm init. This will turn to be a global
package json for our design system.

The name of this package json is not important, because it's not going to be published, only the packages inside the
packages folder.

Inside the package.json we are going to erase everything and leave only an object with the properties private as true,
which is saying that this package won't be published to npm, but be a private package. Then, another property named "packages"
which are going to be our monorepo's packages, here we pass an array as the value and the name of the folder that will contain
our packages folder, our subrepositories, and it will be something as

  "workspaces": [
    "packages/*"
  ]

so the packages/* will make ts understand that every folder inside the packages folder, are part of the repositories of our
monorepo.

Now we can simply delete the node modules inside the projects folder (token, react), and now we are going to, inside our
react package.json, say that this package has a development dependency of the tokens package like

"@ignite-ui/tokens": "*",

by not specifying the package version, as long as we are developing the package tokens, we want it to be already reflected
to the react package, any alterations that happen to it

Now, if we save this, and go back to our root folder and run an npm install, we are going to see one big benefit of monorepos
because every dependency we've set on the folders inside the packages, are going to be installed globally for us. based on
the root package.json

because both of these packages depended on tsup and typescript, we don't need to have them two times installed individually
on each package, we can have only one node_modules and these packages are going to be shared between the child packages.

We are going to notice that inside our node_modules we have a @ignite-ui, which is the prefix we are using in our packages,
and inside of this folder, we'll have both the react and the token. Both of these packages have a symbolic link, which is
a little arrow on the side of their names, a symbolic link inside unix, means that they are a reference to a folder that is
inside other place of our computer. It does not mean that the react and the tokens folder are allocated inside the @ignite-ui
folder, it's just a reference to the real directories located inside the folder packages.

Now, for us to be able to do an import, of, for example, a file that is inside the tokens into our react package, we need
inside of our package json, inside the tokens folder, inform the main.js which is going to be the first file to be executed
and instruct other projects that are going to import these tokens, to know how to import it.

In this case, we are going to say to vscode, that our main is 'dist/index.js', and an attribute of
module that we are going to tell the main file when we use ecmascript modules, which would be
"module": "./dist/index.mjs", and the last option added will be the types that is an option used only
by typescript to say what are the typings of the project. Now we do the same thing on the react package.

Now, inside our react project, we are going to be able to import everything related to the tokens project

So if we now type import {} from '@ignite-ui/tokens', and press ctrl + space inside the {}, we will see everything exported
from the index located on the tokens folder.

If we try to build now, we are going to have a typescript problem

## Add Typescript

to fix this issue, inside the packages folder we are going to create a ts-config folder, just as the other folders, init
a package.json, this package is also going to be a private
one because it's only going to be used internally. then, inside the ts-config folder, we'll add a base.json with some
base configurations and also a react.json, with more specific ones. It will extend the base configurations and some others
for typescript to understand react code.

Now we can reference this tsconfigs inside the other packages, such as going to the token folder, package.json and on the
devDependencies, adding another one with the name of the ts-config package name we just created, then go up to the root of
the monorepo, run an npm install to update all the packages then, go into each smaller package, create a tsconfig.json with
this content, for example, and extending for each ones we need

{
  "extends": "@ignite-ui/ts-config/base.json",
  "include": ["src"],
}

Now the build is going to execute successfully, and the build in the react project, because we imported the colors in a file
we will see that it'll also be available. Now for the linting

## Eslint Code

For eslint be reused, we are also going to create a package folder for the eslint, inside of it, add a package.json, change
its name.

The eslint will be very similar to the typescript, is also going to be private, but in here we are also going to pass an
attribute named main with the main file that is going to be executed

inside this file we are going to install the eslint library and the @rocketseat/eslint-plugin

now on our index.js we are simply writing the basic setup extending the @rocketseat plugin, and now adding this new package
as our devDependency to our other projects, and on our react and token projects we create a .eslinrrc.json file that will
extend the package we've just installed.


## Breakdown

So for a breakdown, our outer package.json specifies the monorepo configuration, it prevents accidental publication of the
root package, and the workspaces tells the package manager, like yarn orn pm, to treat all folders under packages as separate
packages. This allows them to share dependencies and makes it easier to stall them together.

Inside the individual packages, on react we have the name o @ignite-ui/react and include the other @ignite-ui/tokens, this 
line specifies that it depends on the tokens package and the tokens package have a similar structure

They are connected because of the workspace management, so when we run commands like npm install in the root directory, the
package manager resolves the dependencies for all packages at once. It knows about the interdependencies due to the
devDependencies linking, and the shared node modules is because they are in the same workspace, so they can share a single
instance of their dependencies, reducing duplication.














