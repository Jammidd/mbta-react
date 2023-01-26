import React, { useState, useEffect } from "react";

import "./RouteSelector.css";

export const RouteDirectionInput = (props) => {
    const {
        directions,
        updateDirection
    } = props;

    return (
        <div className="route-selector">
            <h1>Select a Direction</h1>
            <div className="route-direction-group">
                { directions.map((item) => (
                    <label
                        className="direction-button"
                        key={item}
                    >
                        <input
                            type="radio"
                            name="directions"
                            value={item}
                            onChange={(e) => updateDirection(item)}
                        />
                        {item}
                    </label>
                ))}
            </div>
        </div>
    );
};

