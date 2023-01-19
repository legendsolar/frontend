import ChildComponent from "./child";

export interface ParentComponentProps {
  parent: string;
}

export const ParentComponent = (props: ParentComponentProps) => (
  <div>
    <div>{props.parent}</div>
    <ChildComponent />
  </div>
);

export default (props: ParentComponentProps = { parent: "default" }) => (
  <ParentComponent {...props} />
);
