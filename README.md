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
