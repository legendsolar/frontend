import React, { useState, useEffect, lazy } from "react";

const componentPaths = [
    "./components/basics/test", 
    "./tests/transaction_test", 
    "./tests/metric_gauge_test"];

const importView = (subreddit) =>
    lazy(() =>
        import(`${subreddit}`).catch((e) => {
            console.log(e);
            return import(`./views/error`);
        })
    );

function ComponentView() {
    const [views, setViews] = useState([]);
    const [selectedComponent, setSelectedComponent] = useState(componentPaths[0]);

    useEffect(() => {
        async function loadViews() {
            const componentPromises = componentPaths.filter((path) => path === selectedComponent).map(
                async (subreddit, idx) => {
                    const Component = await importView(subreddit);
                    return <Component key={idx} />;
                }
            );

            Promise.all(componentPromises).then(setViews);
        }

        loadViews();
    }, [componentPaths, selectedComponent]);

    const renderedComponents = componentPaths.map((component) => (<option>{component}</option>))

    return (
        <div>
           <select value={selectedComponent} onChange={(event)=>setSelectedComponent(event.target.value)}>
                {renderedComponents}
           </select>
           <p>selected component: {selectedComponent}</p> 
            <hr></hr>
        <React.Suspense fallback="Loading component...">
            <div className="container">{views}</div>
        </React.Suspense>

        </div>
    );
}

export default ComponentView;
