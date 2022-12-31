import * as functions from "firebase-functions";
import admin from "firebase-admin";
import * as key from "../sv_key.json";
import axios from "axios";

interface Settings {
  hasura_url: string;
  hasura_admin_secret: string;
}

const settings: Settings =
  process.env?.NODE_ENV === "production"
    ? {
        hasura_url: "https://moved-pheasant-62.hasura.app/v1/graphql",
        hasura_admin_secret:
          "wH7i2R1l1EyEKE7p7UdH8LZajea8R7WrhEDj3XNH6Qg2RJQ0PDthzN0j7x60vWyp",
      }
    : {
        hasura_url: "http://localhost:8080/v1/graphql",
        hasura_admin_secret: "myadminsecretkey",
      };

admin.initializeApp({
  credential: admin.credential.cert(key as any),
});

export const beforeCreateUser = functions.auth
  .user()
  .beforeCreate(async (user, context) => {
    console.log({ user, context });

    await axios.post(
      settings.hasura_url,
      {
        query: `
        mutation MyMutation($id: String, $name: String, $created: date) {
            insert_users(objects: {id: $id, name: $name, created_account: $created}) {
                returning {
                id
                name
                }
            }
        }
  `,
        variables: { id: user.uid, created: new Date().toISOString() },
        operationName: "MyMutation",
      },
      {
        headers: {
          "x-hasura-admin-secret": settings.hasura_admin_secret,
          "content-type": "application/json",
        },
      }
    );

    return {
      customClaims: {
        "https://hasura.io/jwt/claims": {
          "x-hasura-default-role": "user",
          "x-hasura-allowed-roles": ["user"],
          "x-hasura-user-id": user.uid,
        },
      },
    };
  });

export const fakeApiEndpoint = functions.https.onRequest((req, res) => {
  console.log({ req });

  res
    .status(200)
    .send({
      respData: "respData",
      test: "hi",
      headers: req.headers,
      body: req.body,
    });
});
