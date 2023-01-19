import PropTypes from "prop-types";
import {
  Typography,
  Stack,
  Box,
  Button,
  CircularProgress,
  Link,
  Alert,
} from "@mui/material";
import { useFormik } from "formik";
import { TextField } from "./text_field";

import * as yup from "yup";

import {
  validateEmail,
  validatePassword,
  validateSignInPassword,
} from "@p/utils/validation";
import { Error, ErrorTypes } from "@p/utils/errors";
import { LoadingText } from "../utils";
import { useEffect, useState } from "react";
import { useAuth } from "@project/hooks/use_auth";

export interface Values {
  email: string;
  password: string;
}
interface SignInComponentProps {
  initialValues?: Values;
  onSubmit(values: Values): Promise<void>;
  onForgotPassword(): void;
  error: Error | undefined;
  loading: boolean;
  color?: "dark" | "light";
}

export const SignInComponent = ({
  initialValues = { email: "", password: "" },
  onSubmit,
  onForgotPassword,
  error,
  color = "dark",
  loading,
}: SignInComponentProps) => {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: yup.object().shape({
      email: validateEmail(),
      password: validateSignInPassword(),
    }),
    onSubmit: onSubmit,
  });

  useEffect(() => {
    if (error?.source) {
      formik.setErrors({
        ...formik.errors,
        ...{ [error.source]: error.message },
      });
    }
  }, [error]);

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          color={color as any}
        />

        <TextField
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          color={color as any}
        />

        <Stack spacing={4}>
          <Button
            variant={"secondary" as any}
            onClick={(e) => formik.handleSubmit()}
            disabled={
              formik.isValidating ||
              formik.isSubmitting ||
              !formik.dirty ||
              !formik.isValid
            }
            color={"legendaryGreen" as any}
            sx={{ width: "100%", mt: 4 }}
          >
            {formik.isValidating || formik.isSubmitting || loading ? (
              <LoadingText></LoadingText>
            ) : (
              "Login"
            )}
          </Button>

          {error?.source === "system" && error?.message && (
            <Alert severity="error">{error.message}</Alert>
          )}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Button onClick={onForgotPassword}>
              <Typography variant="subtitle2" color={"blackDawn.main"}>
                {"Forgot Password?"}
              </Typography>
            </Button>
          </Box>
        </Stack>
      </form>
    </Box>
  );
};

export const SignInComponentDefault = ({
  onSubmit,
  onForgotPassword,
  color,
}: {
  onSubmit(values: Values): Promise<void>;
  onForgotPassword(): void;
  color?: "dark" | "light";
}) => {
  const { currentError, isAuthenticating } = useAuth();

  const [loading, setLoading] = useState(false);

  const onSubmitLoading = async (values: Values) => {
    setLoading(true);
    try {
      await onSubmit(values);
    } finally {
      setLoading(false);
    }
  };

  const combinedProps: SignInComponentProps = {
    onSubmit: onSubmitLoading,
    onForgotPassword,
    error: currentError,
    color,
    loading: isAuthenticating || loading,
  };

  return <SignInComponent {...combinedProps} />;
};
