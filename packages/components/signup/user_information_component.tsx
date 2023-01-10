import PropTypes from "prop-types";
import {
  Alert,
  Grid,
  Box,
  Button,
  CircularProgress,
  Typography,
  Stack,
} from "@mui/material";

import { TextField } from "../inputs/text_field";

import {
  validateConfirmPassword,
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePassword,
  validatePhoneNumber,
} from "@p/utils/validation";
import { ErrorTypes } from "@p/utils/errors";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { LoadingText } from "../utils/loading_text";

interface Values {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Props {
  initialValues?: Values;
  onSubmit(values: Values): void;
  loading: boolean;
  error: string | undefined;
  color?: "dark" | "light";
}

export const UserInformationComponent = ({
  initialValues,
  onSubmit,
  loading,
  error,
  color = "dark",
}: Props) => {
  const formik = useFormik<Values>({
    initialValues: initialValues
      ? initialValues
      : {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        },
    validationSchema: yup.object().shape({
      firstName: validateFirstName(),
      lastName: validateLastName(),
      email: validateEmail(),
      password: validatePassword(),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Password does not match")
        .required("Required"),
    }),
    onSubmit: async (values, { setErrors }) => {
      onSubmit(values);
    },
  });

  const passwordHelper = "12 characters, 1 uppercase, 1 special or digit";

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <TextField
              color={color}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.errors.firstName}
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="firstName"
              label="First Name"
              id="firstName"
              autoComplete="given-name"
            />
          </Grid>

          <Grid item xs={12} lg={6}>
            <TextField
              color={color}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.errors.lastName}
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="lastName"
              label="Last Name"
              id="lastName"
              autoComplete="family-name"
            />
          </Grid>

          <Grid item xs={12} lg={6}>
            <TextField
              color={color}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.errors.email}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
            />
          </Grid>

          <Grid item xs={12} lg={6}>
            <TextField
              color={color}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={
                formik.errors.password ? formik.errors.password : passwordHelper
              }
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              alwaysDisplayHelper={true}
            />
          </Grid>

          <Grid item xs={12} lg={12}>
            <TextField
              color={color}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="current-password"
            />
          </Grid>
        </Grid>
        <Stack>
          <Button
            variant={"secondary" as any}
            onClick={() => formik.handleSubmit()}
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
              "Create Account"
            )}
          </Button>

          {error && <Alert severity="error">{error}</Alert>}
        </Stack>
      </form>
    </Box>
  );
};
