console.log("theme types imported")

declare module "@mui/material/styles" {
    interface TypographyVariants {
      h1Bold: React.CSSProperties;
    }
  
    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
      h1Bold?: React.CSSProperties;
    }
  }
  
  // Update the Typography's variant prop options
  declare module "@mui/material/Typography" {
    interface TypographyPropsVariantOverrides {
      h1Bold: true;
    }
  }
  