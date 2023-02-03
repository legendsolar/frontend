# Next App

Next-based build of the app. This is the "new" way to build the app, after it was ported from the `create-react-app` focused build in `app_react`.

## Server Side

Currently a lot of the server side capabilities of Next are under utilized as I haven't finished porting the app over. Improvements in user state management, server side caches of hydrated pages among others could certainly be made. 

Apollo Client and MUI both have some advanced features for Next, but I haven't dived to deep into them. I've mostly utilized them as I did in the `cra` based app.

## Dependancies

This app expects to connected to a Hasura-based GraphQL server as pointed to by `NEXT_PUBLIC_GRAPH_QL_URL`. This is significantly different from the `app_react` build. 

Authentication leverages Gooogle Identity Platform through Firebase. 

All of the waitlist information utilizes the `V3` viral loops API to grab user state.

## Deployment

Deployment and associated paramaeters are managed through Vercel