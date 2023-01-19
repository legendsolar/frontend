import ParentComponent from "./parent";

interface eg {
  n: number;
}

const test = (n: eg = { n: 5 }) => n;

test();

export default () => <ParentComponent />;
