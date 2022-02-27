import { lazy } from "react";
import { Typography, Box, Grid } from "@mui/material";

import { DocumentIcon } from "../components/icons/document_icon";

const loadComponent = (path) => {
    const importPath = "../components/" + path;

    console.log(importPath);
    const component = lazy(() => import(importPath));
    return component;
};

const componentViewJson = [
    {
        key: "document icon",
        path: "icons/document_icon.js",
        props: {},
    },
];

const ComponentView = () => {
    return (
        <Grid container spacing={2} sx={{ width: "100%" }}>
            {componentViewJson.map((componentJson) => {
                const Component = loadComponent(componentJson.path);
                console.log(Component);
                return (
                    <Grid key={componentJson.key}>
                        <Component></Component>
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default ComponentView;
