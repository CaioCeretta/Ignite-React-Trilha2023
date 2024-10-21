# Turbo Repo

## What is Turbo Repo?

Turbo Repo is useful for two main purposes, mainly for when we are working with monorepos because it's able to execute
scripts in more than one package at the same time, so if we have a script named dev on all or packages, and execute a npm
run dev on the turbo repo root folder, it will run the dev inside all of the packages, despite this benefit, turbo repo
also helps us accelerating the build process of our application, in turbo repo when we run the build of our application,
he will store a cache of our build inside the node_modules folder, a local cache, and in the next time we run the build,
it will automatically detect the files that have changed and it will run an incremental build, he will update the build
previously created, with the code that has changed, instead of executing the code from scratch.

## Getting Started

First of all, we'll create a file named turbo.json, inside of it we'll pass an object like the one from the code, then add
a new script to the package.json "dev": "turbo run dev --parallel", the parallel flag is because we want all the scripts
to run on the same time. and for the build process, we'll use a script turbo:     "turbo": "turbo run build"

the dependsOn attribute is because some packages build depend on the build of other packages, so it will basically run the
build of the packages that need others only after these finishes.


