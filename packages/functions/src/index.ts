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
        hasura_url: "https://legends-public.hasura.app/v1/graphql",
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

    const name = user?.displayName;

    const firstLast = name?.split(" ").length
      ? name?.split(" ").length >= 2
      : false;

    const firstName = firstLast ? name?.split(" ")[0] : undefined;
    const lastName = firstLast ? name?.split(" ")[1] : undefined;

    await axios.post(
      settings.hasura_url,
      {
        query: `
        mutation MyMutation($id: String, $first_name: String, $last_name: String, $created: date) {
            insert_users(objects: {id: $id, first_name: $first_name, last_name: $last_name, created_account: $created}) {
                returning {
                id
                }
            }
        }
  `,
        variables: {
          id: user.uid,
          first_name: firstName,
          last_name: lastName,
          created: new Date().toISOString(),
        },
        operationName: "MyMutation",
      },
      {
        headers: {
          "x-hasura-admin-secret": settings.hasura_admin_secret,
          "content-type": "application/json",
        },
      }
    );

    console.log("created hasura user");

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

  res.status(200).send({
    respData: "respData",
    test: "hi",
    headers: req.headers,
    body: req.body,
  });
});
