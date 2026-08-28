import React from "react";

const Loading = ({
    text = "Loading..."
}) => {

    return (

        <main className="loading-screen">

            <div className="loading-content">

                <div className="loading-spinner"></div>

                <h2>
                    {text}
                </h2>

                <p>
                    Please wait while we prepare
                    everything for you.
                </p>

            </div>

        </main>

    );
};

export default Loading;