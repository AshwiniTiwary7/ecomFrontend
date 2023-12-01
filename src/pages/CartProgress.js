import React from "react";

export default function CartProgress(props) {
    const {progress,positionName} = props;
    return (
        <div className="progress" role="progressbar" aria-label="Example 20px high" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{height: "20px"}}>
            <div className="progress-bar fw-bolder" style={{width: `${progress}%`}}>{positionName}</div>
        </div>
    )
}