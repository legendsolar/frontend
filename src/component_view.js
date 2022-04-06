import React, { useState, useEffect, lazy } from "react";

const subredditsToShow = ["./views/c", "./components/basics/test"];

const importView = (subreddit) =>
    lazy(() =>
        import(`${subreddit}`).catch((e) => {
            console.log(e);
            return import(`./views/error`);
        })
    );

function ComponentView() {
    const [views, setViews] = useState([]);

    useEffect(() => {
        async function loadViews() {
            const componentPromises = subredditsToShow.map(
                async (subreddit, idx) => {
                    const Component = await importView(subreddit);
                    return <Component key={idx} />;
                }
            );

            Promise.all(componentPromises).then(setViews);
        }

        loadViews();
    }, [subredditsToShow]);

    return (
        <React.Suspense fallback="Loading views...">
            <div className="container">{views}</div>
        </React.Suspense>
    );
}

export default ComponentView;
