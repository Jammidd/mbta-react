import React, { useState, useEffect } from "react";

import "./RouteSelector.css";

export const RouteSelector = (props) => {
    const {
        updateRoute
    } = props;
    const [lightRoutes, setLightRoutes] = useState([]);
    const [heavyRoutes, setHeavyRoutes] = useState([]);

    const API_KEY = "f8517454b65c44bc8544eddfeebe030e";
    const headers = {
        "x-api-key": API_KEY
    }
    const baseUrl = "https://api-v3.mbta.com";
    const LIGHT_RAIL = 0;
    const HEAVY_RAIL = 1;

    const getLightRoutes = () => {
        fetch(`${baseUrl}/routes?filter[type]=${LIGHT_RAIL}`, headers)
            .then(res => res.json())
            .then(
                (result) => {
                    setLightRoutes(result.data);
                }
            );
    };

    const getHeavyRoutes = () => {
        fetch(`${baseUrl}/routes?filter[type]=${HEAVY_RAIL}`, headers)       
            .then(res => res.json())
            .then(
                (result) => {
                    setHeavyRoutes(result.data);
                }
            );
    };

    useEffect(() => {
        getLightRoutes();
        getHeavyRoutes();
    }, []);

    const setRoute = (routeType, event) => {
        const routeIndex = event.target.value;
        const routeInfo = routeType === "light" ? lightRoutes[routeIndex] : heavyRoutes[routeIndex];
        const attributes = routeInfo?.attributes;

        const directions = attributes?.direction_names.map((item, index) => {
            return `${item} to ${attributes?.direction_destinations?.[index]}`;
        });

        const route = {
            name: routeInfo?.id,
            directions: directions
        };
        updateRoute?.(route);
    };

    return (
        <div className="route-selector">
            <h1>Routes</h1>
            <div className="route-type-group">
                <h2>Light Rail</h2>

                { lightRoutes.map((item, index) => (
                    <label className="route-button" key={`light-${index}`}>
                        <input
                            type="radio"
                            name="routes"
                            value={index}
                            onChange={(e) => {setRoute("light", e)}}
                        />
                        {item.id}
                    </label>
                ))}
            </div>

            <div className="route-type-group">
                <h2>Heavy Rail</h2>
                { heavyRoutes.map((item, index) => (
                    <label className="route-button" key={`heavy-${index}`}>
                        <input
                            type="radio"
                            name="routes"
                            value={index}
                            onChange={(e) => {setRoute("heavy", e)}}
                        />
                        {item.id}
                    </label>
                ))}
            </div>
        </div>
    );
};

