import dynamic from "next/dynamic";
import React from "react";

const SsrDisabled = (props: any) => (
  <React.Fragment>{props.children}</React.Fragment>
);

export default dynamic(() => Promise.resolve(SsrDisabled), {
  ssr: false,
});
