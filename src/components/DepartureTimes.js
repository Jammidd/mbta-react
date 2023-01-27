import React, { useState, useEffect } from "react";
import { format } from "date-fns";

import "./RouteSelector.css";

export const DepartureTimes = (props) => {
    const {
        route,
        stop,
        direction
    } = props;

    const [, setActiveRoute] = useState(null);
    const [, setActiveStop] = useState(null);
    const [, setActiveDirection] = useState(null);

    const [nextDeparture, setNextDeparture] = useState(null);

    const API_KEY = "f8517454b65c44bc8544eddfeebe030e";
    const headers = {
        "x-api-key": API_KEY
    }
    const baseUrl = "https://api-v3.mbta.com";

    const getDepartureTimes = () => {
        fetch(`${baseUrl}/predictions?filter[stop]=${stop.id}&filter[direction_id]=${direction.id}`, headers)
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
        setActiveDirection(direction);
        setActiveRoute(route);
        setActiveStop(stop);
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
                <p className="result-summary">The next scheduled departure from <b>{stop.name}</b> on <b>{route}</b> heading <b>{direction.name}</b> is:</p>
                <p className="result-time">{formatDate(nextDeparture)}</p>
            </div>
        </div>
    );
};

