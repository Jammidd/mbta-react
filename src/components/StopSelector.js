import React, { useState, useEffect } from "react";

import "./RouteSelector.css";

export const StopSelector = (props) => {
    const {
        route,
        updateStop
    } = props;
    const [, setSelectedRoute] = useState(null);
    const [stops, setStops] = useState([]);

    const API_KEY = "f8517454b65c44bc8544eddfeebe030e";
    const headers = {
        "x-api-key": API_KEY
    }
    const baseUrl = "https://api-v3.mbta.com";

    const getStops = () => {
        fetch(`${baseUrl}/stops?filter[route]=${route}`, headers)
            .then(res => res.json())
            .then(
                (result) => {
                    setStops(result.data);
                }
            );
    };

    useEffect(() => {
        setSelectedRoute(route);
        getStops();
    }, [route]);

    const setStop = (event) => {
        const stopIndex = event.target.value;
        const stop = stops[stopIndex]
        updateStop?.({
            name: stop?.attributes?.name,
            id: stop?.id
        });
    };

    return (
        <div className="route-selector">
            <h1>Stop</h1>
            <div className="route-list">
                { stops.map((item, index) => (
                    <label
                        key={`stops-${item.id}`}
                        className="route-button"
                    >
                        <input
                            type="radio"
                            name="stops"
                            value={index}
                            onChange={setStop}
                        />
                        {item?.attributes?.name}
                    </label>
                ))}
            </div>
        </div>
    );
};

