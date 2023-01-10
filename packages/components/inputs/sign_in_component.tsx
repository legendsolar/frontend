import PropTypes from "prop-types";
import {
  Typography,
  Stack,
  Box,
  Button,
  CircularProgress,
  Link,
} from "@mui/material";
import { useFormik } from "formik";
import { TextField } from "./text_field";

import * as yup from "yup";

import {
  validateEmail,
  validatePassword,
  validateSignInPassword,
} from "@p/utils/validation";
import { ErrorTypes } from "@p/utils/errors";

interface SignInComponentProps {
  initialValues?: {
    email: string;
    password: string;
  };
  onSubmit({ email, password }): Promise<void>;
  onForgotPassword(): void;
  onCreateNewAccount(): void;
  color: string;
}

export const SignInComponent = ({
  initialValues = { email: "", password: "" },
  onSubmit,
  onForgotPassword,
  onCreateNewAccount,
  color,
}: SignInComponentProps) => {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: yup.object().shape({
      email: validateEmail(),
      password: validateSignInPassword(),
    }),
    onSubmit: async (values, { setErrors }) => {
      onSubmit(values).catch((error) => {
        if (error.type === ErrorTypes.ValidationError) {
          setErrors({
            [error.source]: error.message,
          });
        }
      });
    },
  });

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
            {formik.isValidating || formik.isSubmitting ? (
              <CircularProgress color={"light" as any}></CircularProgress>
            ) : (
              "Login"
            )}
          </Button>

          <Stack direction={"row"} justifyContent={"space-between"}>
            <Button variant={"text" as any} onClick={onForgotPassword}>
              <Typography
                variant={"smallLabel" as any}
                color="legendaryGreen.main"
                sx={{ ml: 1 }}
              >
                {"Forgot Password"}
              </Typography>
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};
