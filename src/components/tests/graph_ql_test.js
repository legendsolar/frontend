const GraphQlTest = ({data}) => {
    console.log(data);
    if (!data) {
        return <div>no data</div>;
    }
    return <div>{JSON.stringify(data)}</div>;
};

export default GraphQlTest;
