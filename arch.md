## Quick Architecture Overview

## Frontend
React based, heavily utilizes context and Apollo's client library.

#### Caching
- Caching is complex on the frontend
- Queries are cached infinitely
- Edit mutations, when they return, update queries based on `id` and `type`
  - ie. a mutation that returns a type of `Transfer` with an `id` of `1234` would update queries with this type and id 
- Create mutations have a custom `forceCacheUpdate` that adds the returned, created object to caches where appropraite. This is perhaps the crux of the problem and where issues could arise.
- Delete mutations are currently not supported, but they would function similar to create mutations
- Currently the cache isn't wiped on user log in/out which is obviously a huge vulnerability. Will do this soon

#### Authentication
Uses Firebase auth, passes tokens to backend.

#### Deployment
Currently automatic, new `dev` pushes update the dev endpoint.

## Backend
Currently the backend consists of a GraphQL-based Apollo Server running with Express. These are build into Cloud Run docker images.

I could potentially add more REST-like endpoints as I see fit, and asset time series data might be more amenable to that.

#### Authentication
- Every and any query is required to be authenticated. User `uid`s are defined implicitly, ie contained in the `token` that is handed to the server on authentication.

#### Caching
- Currently using a very simple in-memory cache
  - Want to mitigate any potential security vulnerabilities 
- Only Dwolla transfers and accounts are cached with a 100s TTL
- Closely spaced queries (ie page load) should be able to utilize cache 
- Cloud likely increase TTL to ~minutes range
- Current issues:
  - Accessing cached resource with different or lower permissions (?)
    - Should cache keys always include user UID or similar field to prevent this?

#### Database
- Currently the RT database is still be used
- Have completely locked down permissions, only `admin` allowed to `r/w` anything
- User data
  - Metadata, such as address ect
  - Status if user is a `verfied` dwolla user
  - Linked accounts (bank accounts ect)
  - Dwolla wallet information, but not amount
- To think about:
  - Limited permissions for the server:
    - Limit access to specific user? ect?
  - Adding completed transfers to the database to reduce dwolla hits

#### Dwolla
- Wallet
  - Most wallet metadata is stored on database, but the server will always refresh the wallet's current amount from Dwolla
- Accounts
  - Accounts data will currently only be fetched from Dwolla once
  - TODO: hanle cases where an account isn't fully verified
- Transfers
  - No transfer data is stored outside of the cache, Dwolla is queried every time a transfer query is initiated

#### Asset Data
- Haven't touched this problem in a while
- Need to move data off of the RT database but not super urgent, this is a relatively easy problem

#### Deployment
- Currently deployment is entirely manual, but I'm going to work on changing this soon
- Would like to utilize Cloud build to remote build and update new image version