import React from "react";

import "./RouteSelector.css";

export const RouteDirectionInput = (props) => {
    const {
        directions,
        updateDirection
    } = props;

    return (
        <div className="route-selector">
            <h1>Direction</h1>
            <div className="route-list">
                { directions.map((item, index) => (
                    <label
                        className="route-button"
                        key={item}
                    >
                        <input
                            type="radio"
                            name="directions"
                            value={item}
                            onChange={(e) => updateDirection({
                                name: item,
                                id: index
                            })}
                        />
                        {item}
                    </label>
                ))}
            </div>
        </div>
    );
};

