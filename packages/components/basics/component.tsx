// @ts-nocheck
import { forwardRef, ReactNode } from 'react';
import { Paper, Stack } from '@mui/material';
import { useState } from 'react';
import shadows from '@mui/material/styles/shadows';

export interface ComponentProps {
  inactive?: boolean;
  disabled?: boolean;
  shadow?: boolean;
  standardWidth?: boolean;
  resize?: boolean;
  children?: ReactNode;
  haze?: boolean;
  sx?: any;
  background?: boolean;
  onClick?(): void;
}

export const Component = forwardRef(
  (
    {
      inactive = false,
      disabled = false,
      children = {},
      sx = {},
      standardWidth = true,
      resize = false,
      onClick = () => {},
      shadow = false,
      haze = false,
      background = true,
    }: ComponentProps,
    ref
  ) => {
    const opacity = inactive || disabled ? 0.5 : 1;
    const pointerEvents = disabled ? 'none' : 'all';

    const content = (
      <Stack
        sx={{
          opacity: opacity,
        }}
        spacing={4}
      >
        {children}
      </Stack>
    );

    if (standardWidth && !sx.width) {
      sx.maxWidth = '400px';

      if (!resize) {
        sx.width = '400px';
      }
    }

    if (shadow) {
      sx.boxShadow = '0px 0px 25px rgba(99, 110, 114, 0.25);';
    }

    if (haze) {
      sx.backgroundColor = 'whiteHaze.main';
    }

    if (!background) {
      sx.background = 'None';
    }

    const variant = shadow ? 'shadow' : 'flat';

    return (
      <Paper
        ref={ref}
        onClick={onClick}
        variant={variant as any}
        sx={
          {
            p: 4,
            boxSizing: 'border-box',
            ...sx,
            pointerEvents: pointerEvents,
          } as any
        }
      >
        {content}
      </Paper>
    );
  }
);
