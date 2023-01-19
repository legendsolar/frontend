export interface ChildComponentProps {
  a: string;
}

export const ChildComponent = ({ a }: ChildComponentProps) => <div>{a}</div>;

export default (props: ChildComponentProps = { a: "default" }) => (
  <ChildComponent {...props} />
);
