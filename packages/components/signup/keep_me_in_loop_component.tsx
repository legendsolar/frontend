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
import { Error } from "@p/utils/errors";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useMemo, useState } from "react";
import { LoadingText } from "../utils/loading_text";
import { useAuth } from "@project/hooks/use_auth";

export interface Values {
  firstName: string;
  lastName: string;
  email: string;
}

interface Props {
  initialValues?: Values;
  onSubmit(values: Values): void;
  loading: boolean;
  error: Error | undefined;
  color?: "dark" | "light";
}

export const KeepMeInTheLoopComponent = ({
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
        },
    validationSchema: yup.object().shape({
      firstName: validateFirstName(),
      lastName: validateLastName(),
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

          <Grid item xs={12} lg={12}>
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
        </Grid>

        <Stack>
          <Button
            variant={"primary" as any}
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
              "Submit"
            )}
          </Button>

          {error?.source === "system" && error?.message && (
            <Alert severity="error">{error.message}</Alert>
          )}
        </Stack>
      </form>
    </Box>
  );
};

export const KeepMeInTheLoopComponentDefault = ({
  onSubmit,
  color,
}: {
  onSubmit(values: Values): Promise<void>;
  color?: "dark" | "light";
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const onSubmitLoading = async (values: Values) => {
    setLoading(true);
    setError(undefined);
    try {
      await onSubmit(values);
    } catch (e) {
      setError({
        source: "system",
        message: "Try again with a different email",
      });
    } finally {
      setLoading(false);
    }
  };

  const combinedProps: Props = {
    onSubmit: onSubmitLoading,
    error,
    color,
    loading,
  };

  return <KeepMeInTheLoopComponent {...combinedProps} />;
};
