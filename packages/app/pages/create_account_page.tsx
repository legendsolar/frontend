import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "@project/hooks/use_user";
import { useState } from "react";

import DualPaneView from "@project/components/views/dual_pane_view";
import WomanPanelsSVG from "@project/components/assets/images/women_panel.svg";
import PanelInfinitySVG from "@project/components/assets/images/panel_infinity.svg";
import CreateAccountContent from "content/create_account_content";
import AccountCreateInfoContent from "content/account_create_info_content";
import { ROUTES } from "../routes/routes";
import { BackButton } from "@project/components/buttons/back_button";

enum States {
  CREATE_ACCOUNT = "create_account",
  BASIC_INFO = "basic_info",
}

const CreateAccountPage = () => {
  const [state, setState] = useState(States.CREATE_ACCOUNT);

  const navigate = useNavigate();

  const { useCreateNewUser } = useUser();

  const { createNewUser } = useCreateNewUser();

  const states = (state: States): JSX.Element => {
    switch (state) {
      case States.CREATE_ACCOUNT:
        return (
          <CreateAccountContent
            onSignUpWithEmail={() => setState(States.BASIC_INFO)}
            onSignUpWithGoogle={() => {}}
            onNavigateToSignIn={() => {
              navigate(ROUTES.SIGN_IN);
            }}
            onNavigateToPrivacyPolicy={() => navigate(ROUTES.PRIVACY_POLICY)}
            onNavigateToTermsOfService={() =>
              navigate(ROUTES.TERMS_AND_CONDITIONS)
            }
          ></CreateAccountContent>
        );

      case States.BASIC_INFO:
        return (
          <AccountCreateInfoContent
            color={"light"}
            onCreateAccount={async ({
              email,
              firstName,
              lastName,
              password,
              phone,
            }: any) => {
              return createNewUser({
                firstName,
                lastName,
                password,
                email,
                phone,
              }).then(() => {
                navigate(ROUTES.COMPLETE_ACCOUNT);
              });
            }}
          ></AccountCreateInfoContent>
        );
    }
  };

  const rightPaneStates = (state: States): JSX.Element => {
    switch (state) {
      case States.CREATE_ACCOUNT:
        return <img src={WomanPanelsSVG} width="375px"></img>;

      case States.BASIC_INFO:
        return <img src={PanelInfinitySVG}></img>;
    }
  };

  const rightPaneJustify = (state: States): string => {
    switch (state) {
      case States.CREATE_ACCOUNT:
        return "center";

      case States.BASIC_INFO:
        return "flex-end";
    }
  };

  const upperLeftStates = (state: States): JSX.Element => {
    switch (state) {
      case States.CREATE_ACCOUNT:
        return (
          <BackButton
            label="Back to Homepage"
            linkText="https://www.legends.solar"
          ></BackButton>
        );

      case States.BASIC_INFO:
        return (
          <BackButton
            onClick={() => {
              navigate(ROUTES.SIGN_IN);
            }}
          ></BackButton>
        );
    }
  };

  return (
    <DualPaneView
      leftPane={states(state)}
      rightPane={rightPaneStates(state)}
      upperLeftCorner={upperLeftStates(state)}
      options={{
        rightPane: {
          justifyContent: rightPaneJustify(state),
        },
      }}
    ></DualPaneView>
  );
};

export default CreateAccountPage;
