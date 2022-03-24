# Legends Frontend App

This is the central repository for the Legends App. It primarily leverages [React](https://reactjs.org/) and [MUI](https://mui.com/).

## Commands

### `start`
Starts a locally hosted version of the site running on the [legends alpha dev](https://console.firebase.google.com/u/1/project/legends-alpha/overview) backend.

### `start:prod`
Starts a locally hosted version of the site running on the [legends alpha prod](https://console.firebase.google.com/u/1/project/legends-alpha-prod/overview) backend.

### `start:emulator`
Starts a locally hosted version of the site running on the emulator backend. Emulators must be started in the `backend` project for this to work properly.

### `build`
Builds app to `./build` using the [legends alpha dev](https://console.firebase.google.com/u/1/project/legends-alpha/overview) backend.

### `build:prod`
Builds app to `./build` using the [legends alpha prod](https://console.firebase.google.com/u/1/project/legends-alpha-prod/overview) backend.

### `preview`
Deploys site to a public preview url based on current branch and commit. The `legends alpha dev` project will be used. Url will be of form: `https://legends-alpha--<branch name>-<hash>-<random string>.web.app`.

### `preview:prod`
Deploys site to a public preview url based on current branch and commit. The `legends alpha prod` project will be used. Url will be of form: `https://legends-alpha-prod--<branch name>-<hash>-<random string>.web.app`.

## Deploying
Commits are automatically deployed to the staging project [legends alpha dev](https://console.firebase.google.com/u/1/project/legends-alpha/overview).

Tags are deployed to the production environment, [legends alpha prod](https://console.firebase.google.com/u/1/project/legends-alpha-prod/overview).
## Sizing
- Figma:
  - Total Width: 1440 px
  - Content Width: 1235 px
- Cutoffs:
  - xs: 0px
  - sm: 478px (Webflow Phone)
    - Content Width: 10px margin left and right
    - Thus width can 0px to 458px 
  - md: 767px (Webflow Landscape Phone)
    - Content Width: 10px margin left and right
    - Thus width can be 458px to 767px 
  - lg: 991px (Webflow tablet)
    - Content Width: 20px margin left and right
    - Thus width can be 767px to 971px
  - xl: >991px (Webflow desktop)
    - Content Width: 20px margin left and right to max width of 1100px
    - Bumped to 1235px max width to match Figma
    - Width can be 971px to 1235px 
