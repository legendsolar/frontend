# Legends Frontend App

## Running

1. Start backend by starting Firebase emulator in `backend`
2. Start react app with `npm start`


## Dev vs Production
The `main` branch is linked to the production firebase project, [legends alpha](https://console.firebase.google.com/u/1/project/legends-alpha-prod/overview) while the `dev` branch is linked to [legends alpha dev](https://console.firebase.google.com/u/1/project/legends-alpha/overview)


## Emulation 
Emulation is controlled by the `emulator` flag in `Firebase.js`

## Deployment

The actions defined in `.github/workflows` should automatically update their respective firebase projects. However, hosting can manually be updated with 

    firebase deploy --only hosting