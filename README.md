# Kubera UI

[![DeepScan grade](https://deepscan.io/api/teams/11347/projects/14259/branches/260658/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=11347&pid=14259&bid=260658)

React component library for faster and easier web development. Build your own design system, or start with Kubera UI.

## Table of Contents

1. [Project Structure](#1-project-structure)
2. [Available Scripts](#2-available-scripts)
3. [Tech Stack](#3-tech-stack)
4. [Contribution Guidelines](#4-contribution-guidelines)
5. [Adding a Component](#5-adding-a-new-component)
6. [Branch](#6-branch)
7. [Publishing your Library on NPM](#7-publishing-your-library-on-npm)
<br><br><br>


### `1. Project Structure`

```
├── .storybook
|   ├── main.js
├── coverage
├── dist
├── mocks
|   ├── styleMock.js
├── node_modules
├── scripts
|   ├── postBuild.js
├── src
│   ├── core
|   |   ├── <Stable Components>
|   |   |   ├── __tests__
|   |   |   ├── <components>.stories.tsx
|   |   |   ├── index.ts
|   |   |   ├── <components>.tsx
|   |   |   ├── styles.tsx
|   |   ├── index.ts
│   ├── labs
|   |   ├── <UnStable Components>
|   |   |   ├── __tests__
|   |   |   ├── <components>.stories.tsx
|   |   |   ├── index.ts
|   |   |   ├── <components>.tsx
|   |   |   ├── styles.tsx
|   |   ├── index.ts
|   ├── index.ts
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── .prettierrc.js
├── jest.config.js
├── LICENSE
├── package.json
├── package.lock.json
├── README.md
├── CONTRIBUTION.md
├── rollup.config.js
├── stylelint.config.js
├── tsconfig.json
├── yarn.lock
```


### `2. Available Scripts`

| Script          | Description                                                                         |
| --------------- | :---------------------------------------------------------------------------------- |
| `dev`           | Start the development storybook server with hot module reloading.                   |
| `format`        | Format your code with Prettier                                                      |
| `format:check`  | Formats only the changed code with Prettier.                                        |
| `clean`         | Safely remove files and folders on all platforms directories.                       |
| `test`          | Run your Jest tests once.                                                           |
| `test:watch`    | Run your Jest tests in watch mode.                                                  |
| `test:coverage` | Run your Jest tests and check for code coverage.                                    |
| `lint`          | Lint both your code and style with ESLint.                                          |
| `lint:script`   | Lint only your code with ESLint.                                                    |
| `lint:watch`    | Lint your code with ESLint in watch mode.                                           |
| `lint:style`    | Lint your css with ESLint.                                                          |
| `storybook`     | Start the storybook server.                                                         |
| `build`         | Compile your application and make it ready for deployment                           |


### `3. Tech Stack`

Kubera UI is built using the following:

- Typescript
- Rollup
- Prettier
- ESLint
- StyleLint
- Storybook
- Husky
- Material UI
- Jest
- React Testing Library

### `4. Contribution Guidelines`

Check our [official contribution guidelines](https://github.com/arkajyotiMukherjee/kubera-ui/blob/v1.0.0/CONTRIBUTION.md)

### `5. Adding a new component`

- add the new component directory in the `src/labs` directory following this folder structure

```
├── MyComponent
|   ├── index.ts
|   ├── styles.ts
|   ├── MyComponent.tsx
|   ├── MyComponent.stories.tsx
|   ├── __tests__
|   |   ├── MyComponent.test.tsx
```

Once you have created your new component make sure you have exported it in the `src/labs/index.ts` file. Doing so allows the component to be compiled into the final bundle using rollup.

```
// src/labs/index.ts
export * from './MyComponent';
export * from './SomeOtherComponent';
```

You can develope your new component using storybook as your playground. Once you have added the `.stories.tsx` file for you new component, you can run `yarn storybook` to start the service.

### `6. Branch`

`dev` - This branch is for incomplete unstable components, accepting and reviewing PRs for the same.

`next` - This branch is for components which are complete but don't have all the required specification (tests, stories, etc) shifted from `dev`

`master` - This branch is for stable components shifted from `next`

### `7. Publishing your Library on NPM`

Once you have created an account on NPM you will be able to publish your library using these commands

```
$ yarn build
$ cd dist
$ npm pack
$ npm publish
```

> Note: You will have to manually bump your versions in the `package.json` file.

> Note: You will need to update the package.json name property with the name your library will be using on npm.
