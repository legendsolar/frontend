# Legends Frontend App

This is the central repository for the Legends App. It primarily leverages [React](https://reactjs.org/) and [MUI](https://mui.com/).

The two main branches, `main` and `dev` are each connected to separate firebase projects.

The `main` branch is linked to the production firebase project, [legends alpha](https://console.firebase.google.com/u/1/project/legends-alpha-prod/overview) while the `dev` branch is linked to [legends alpha dev](https://console.firebase.google.com/u/1/project/legends-alpha/overview).


## Running

1. If using the emulator, start backend by starting Firebase emulator in `backend`. Generally not required.
2. Start react app with `npm start`

## Emulation 
Emulation is controlled by the `emulator` flag in `Firebase.js`

## Deployment

The actions defined in `.github/workflows` should automatically update their respective firebase projects. However, hosting can manually be updated with 

    firebase deploy --only hosting