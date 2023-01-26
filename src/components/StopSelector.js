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

    // useEffect(() => {
    //     setSelectedRoute(route);
    //     getStops();
    // }, []);

    useEffect(() => {
        setSelectedRoute(route);
        getStops();
    }, [route]);

    const setStop = (event) => {
        const stop = event.target.value;
        updateStop?.(stop);
    };

    return (
        <div className="route-selector">
            <h1>Select a stop</h1>
            <div className="route-stop-group">
                { stops.map((item) => (
                    <label
                        key={`stops-${item.id}`}
                        className="stop-button"
                    >
                        <input
                            type="radio"
                            name="stops"
                            value={item.id}
                            onChange={setStop}
                        />
                        {item?.attributes?.name}
                    </label>
                ))}
            </div>
        </div>
    );
};

