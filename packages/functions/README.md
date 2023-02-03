# Cloud Functions

Cloud functions for the new, public Legends app. 

The only currently required function is a blocking function on user creation. It essentially ensures that each user has an assocated record in the Hasura `user` table. Finally, it adds a custom cliam to allow Hasura to authenticate the user with Google.