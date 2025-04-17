import React from "react";

export default function Advertisement() {
    return (
        <div className={"ads-apple-store-frame"}>
            <video
                className={"ads-video"}
                autoPlay={true}
                loop
                muted
                playsInline
                data-videp-media=""
            >
                <source type="video/mp4" src="video/apple-ads.mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};