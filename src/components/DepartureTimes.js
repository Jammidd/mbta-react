import React, { useState, useEffect } from "react";
import { format } from "date-fns";

import "./RouteSelector.css";

export const DepartureTimes = (props) => {
    const {
        route,
        stop,
        direction
    } = props;

    const [activeRoute, setActiveRoute] = useState(null);
    const [activeStop, setActiveStop] = useState(null);
    const [activeDirection, setActiveDirection] = useState(null);

    const [nextDeparture, setNextDeparture] = useState(null);

    const API_KEY = "f8517454b65c44bc8544eddfeebe030e";
    const headers = {
        "x-api-key": API_KEY
    }
    const baseUrl = "https://api-v3.mbta.com";

    const getDepartureTimes = () => {
        fetch(`${baseUrl}/predictions?filter[stop]=${stop}&filter[direction_id]=${direction}`, headers)
            .then(res => res.json())
            .then(
                (result) => {
                    const departureTimes = result.data;
                    const departure = departureTimes?.[0]?.attributes?.departure_time;
                    setNextDeparture(departure);
                }
            );
    };

    const formatDate = (dateStr) => {
        return format(new Date(dateStr), "EEEE LLL d h:mm aaa");
    };

    useEffect(() => {
        getDepartureTimes();
    }, [
        route,
        stop,
        direction
    ]);

    return (
        <div className="route-selector">
            <h1>Next Departure Time</h1>
            <div className="result-container">
                <p>The next scheduled departure for {stop} on {route} heading {direction} is:</p>
                {formatDate(nextDeparture)}
            </div>
        </div>
    );
};

