// hacked together solution to post user data to hubspot without exposing api keys ect on client

export const getHubspotUserId = () => {};

export const submitUserDataToHubspot = async ({
  firstName,
  lastName,
  email,
  panelCount,
}: {
  firstName: string;
  lastName: string;
  email: string;
  panelCount: number;
}) => {
  // eventObj.preventDefault();
  const portalId = 20857852;
  const formGuid = "eb418990-8eaf-4483-b9f6-6d157c8c2080";

  const resp = await submit_hubspot_form(
    portalId,
    formGuid,
    email,
    firstName,
    lastName,
    panelCount
  );
  console.log({ hubspotResponse: resp });
};

export const submit_hubspot_form = async (
  portalId: number,
  formGuid: string,
  email: string,
  firstname: string,
  lastname: string,
  panelCount: number
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const fields = [
    {
      objectTypeId: "0-1",
      name: "firstname",
      value: firstname,
    },
    {
      objectTypeId: "0-1",
      name: "lastname",
      value: lastname,
    },
    {
      objectTypeId: "0-1",
      name: "email",
      value: email,
    },
  ];

  if (panelCount) {
    fields.push({
      objectTypeId: "0-1",
      name: "panel_count",
      value: panelCount.toFixed(0),
    });
  }

  console.log(fields);

  const hutk = document.cookie.replace(
    /(?:(?:^|.*;\s*)hubspotutk\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  var context = {};
  if (hutk) {
    context = {
      hutk: hutk,
    };
  }

  const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`;

  const postObj = {
    data: {
      portalId,
      formGuid,
      fields: fields,
      context: context,
    },
    config,
  };
  console.log(url);
  console.log(postObj);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      portalId,
      formGuid,
      fields: fields,
      context: context,
    }),
  });

  return res.json();
};
