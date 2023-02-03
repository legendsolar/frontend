# Legends Frontend App

This is the central repository for the Legends App. It primarily leverages [React](https://reactjs.org/) and [MUI](https://mui.com/).


## Dependancies

This client expects to connect to:
- a GraphQL server (user & facility data)
- Firebase storage (for document download)
- Google ID platform (user auth)

### Running Locally

The `backend` repo is requried to start an instance of firebase emulators and the backend server for this client to be run locally

## NPM Commands

### `npm run start`
Starts a locally hosted version of the site running on the [legends alpha dev](https://console.firebase.google.com/u/1/project/legends-alpha/overview) backend.

### `npm run start:prod`
Starts a locally hosted version of the site running on the [legends alpha prod](https://console.firebase.google.com/u/1/project/legends-alpha-prod/overview) backend.

### `npm run start:emulator`
Starts a locally hosted version of the site running on the emulator backend. Emulators must be started in the `backend` project for this to work properly.

### `npm run build`
Builds app to `./build` using the [legends alpha dev](https://console.firebase.google.com/u/1/project/legends-alpha/overview) backend.

### `npm run build:prod`
Builds app to `./build` using the [legends alpha prod](https://console.firebase.google.com/u/1/project/legends-alpha-prod/overview) backend.

### `npm run preview`
Deploys site to a public preview url based on current branch and commit. The `legends alpha dev` project will be used. Url will be of form: `https://legends-alpha--<branch name>-<hash>-<random string>.web.app`.

### `npm run preview:prod`
Deploys site to a public preview url based on current branch and commit. The `legends alpha prod` project will be used. Url will be of form: `https://legends-alpha-prod--<branch name>-<hash>-<random string>.web.app`.

## Deploying
Commits are automatically deployed to the staging project [legends alpha dev](https://console.firebase.google.com/u/1/project/legends-alpha/overview).

Tags are deployed to the production environment, [legends alpha prod](https://console.firebase.google.com/u/1/project/legends-alpha-prod/overview).