import PropTypes from "prop-types";
import {
  Typography,
  Stack,
  Box,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

import { TextField } from "../inputs/text_field";
import { LoadingText } from "../utils/loading_text";
import { validateEmail } from "@p/utils/validation";
import { Error, ErrorTypes } from "@p/utils/errors";
import { useEffect, useState } from "react";
import { useAuth } from "@project/hooks/use_auth";
import Router, { useRouter } from "next/router";
import { useReservations } from "@project/hooks/use_reservations";

export interface Values {
  email: string;
}

export interface Props {
  initialValues?: Values;
  onSubmit(values: Values): Promise<void>;
  onBackToSignIn(): void;
  error: Error | undefined;
  loading: boolean;
  resetLinkSent: boolean;
  color?: string;
}

export const ForgotPasswordComponent = ({
  initialValues = { email: "" },
  error,
  loading,
  resetLinkSent,
  onSubmit,
  onBackToSignIn,
  color = "dark",
}: Props) => {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: yup.object().shape({
      email: validateEmail(),
    }),
    onSubmit,
  });

  useEffect(() => {
    if (error?.source) {
      formik.setErrors({
        ...formik.errors,
        ...{ [error.source]: error.message },
      });
    }
  }, [error]);

  const buttonString = resetLinkSent ? "Reset Link Sent" : "Send Reset Link";

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={4}>
          <Typography variant="subtitle1">Forgot Password</Typography>

          <TextField
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.errors.email}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            color={color}
          />

          <Button
            variant={"primary" as any}
            onClick={() => formik.handleSubmit()}
            disabled={
              formik.isValidating ||
              formik.isSubmitting ||
              !formik.dirty ||
              !formik.isValid ||
              resetLinkSent
            }
            color={"legendaryGreen" as any}
            sx={{ width: "100%", mt: 4 }}
          >
            {formik.isValidating || formik.isSubmitting ? (
              <LoadingText></LoadingText>
            ) : (
              buttonString
            )}
          </Button>

          <Stack direction={"row"} justifyContent={"space-between"}>
            <Button variant="text" onClick={onBackToSignIn}>
              <Typography
                variant={"smallLabel" as any}
                color="legendaryGreen.main"
                sx={{ ml: 1 }}
              >
                {"Back to Log In"}
              </Typography>
            </Button>
          </Stack>

          {error?.source === "system" && error?.message && (
            <Alert severity="error">{error.message}</Alert>
          )}
        </Stack>
      </form>
    </Box>
  );
};

export const ForgotPasswordComponentDefault = ({
  color,
}: {
  color?: "dark" | "light";
}) => {
  const { currentError, isAuthenticating, resetPassword } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [resetLinkSent, setResetLinkSent] = useState(false);

  const { redirect } = useReservations();

  const onSubmitLoading = async ({ email }: Values) => {
    setLoading(true);
    try {
      await resetPassword(email);
      setResetLinkSent(true);
    } finally {
      setLoading(false);
    }
  };

  const combinedProps: Props = {
    onSubmit: onSubmitLoading,
    error: currentError,
    color,
    loading: isAuthenticating || loading,
    resetLinkSent,
    onBackToSignIn: () => {
      redirect("./sign_in");
    },
  };

  return <ForgotPasswordComponent {...combinedProps} />;
};
