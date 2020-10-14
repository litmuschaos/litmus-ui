## STEPS TO CONTRIBUTE

1. Find an issue to work on or create a new issue at [https://github.com/mayadata-io/kubera-ui/issues](https://github.com/mayadata-io/kubera-ui/issues) if you find a bug/suggest a new feature addition/change.
2. Fork the main repository to create a duplicate copy for yourself.
3. Create a feature branch in the forked repository and always send a PR from the feature-branch to the dev branch of the main repository.

    ```
    Example- S-ayanide/modal-component -> kubera-ui/dev
    ```

## BRANCH SPECIFICATIONS

`dev` - This branch is for incomplete unstable components, accepting and reviewing PRs for the same.

`next` - This branch is for components which are complete but don't have all the required specification (tests, stories, etc) shifted from `dev`

`master` - This branch is for stable components shifted from `next`

## PULL REQUEST SPECIFICATIONS


To ensure that your PR is of high quality and to maintain the coding standards there are some best practices which we need to adhere to in order to successfully merge the PRs


1. Always send a PR from the feature-branch of the forked repository to the test of the main, until mentioned otherwise by our maintainers.
2. While committing the changes please ensure you sign your commits by using -s flag
    ```
    git commit -s -m “<YOUR COMMIT MESSAGE>”
    ```

3. Please fill in the details of the changes that have been made/modified with the respective PR and also check of the necessary checklist in the PR checklist itself.
4. Always lint your project locally before sending a PR
    ```
    yarn run lint
    ```

5. Don’t skip husky pre-commit checks as it ensures your code is well formatted and linted as well. Please don’t bypass husky since non-formatted code are very easy to detect.
6. Always ensure all the necessary CircleCI builds (frontend, backend, docker, etc) are passing, if not please open a detailed view and check the exact problem for the build failure.
7. Please provide `<component>.stories.tsx` and `__tests__` along with each component you send a PR for.
8. Keep the main repository as an upstream in order to always fetch from the main repository and keep your local branch as updated as possible to not hinder your work.
