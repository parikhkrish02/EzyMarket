import React, { useContext } from 'react'
import AuthContext from '../context/Auth/AuthContext'
import useGeoLocation from "../hooks/useGeoLocation";
import './LandingPage.css'

const LandingPage = () => {

    const { user } = useContext(AuthContext)
    const location = useGeoLocation()

    // eslint-disable-next-line
    const map = new ol.Map({
        layers: [
            // eslint-disable-next-line
            new ol.layer.Tile({
                // eslint-disable-next-line
                source: new ol.source.TileJSON({
                    url: 'https://api.maptiler.com/maps/hybrid/tiles.json?key=0pCtCvBN2aL4eB4nNYPy',
                    tileSize: 2048,
                })
            })
        ],
        target: 'map',
        // eslint-disable-next-line
        view: new ol.View({
            constrainResolution: true,
            // eslint-disable-next-line
            center: ol.proj.fromLonLat([72.8210722, 22.6010415]),
            zoom: 13
        })
    });
    // eslint-disable-next-line
    const layer = new ol.layer.Vector({
        // eslint-disable-next-line
        source: new ol.source.Vector({
            features: [
                // eslint-disable-next-line
                new ol.Feature({
                    // eslint-disable-next-line
                    geometry: new ol.geom.Point(ol.proj.fromLonLat([72.8210722, 22.6010415])),
                })
            ]
        }),
        // eslint-disable-next-line
        style: new ol.style.Style({
            // eslint-disable-next-line
            image: new ol.style.Icon({
                anchor: [0.5, 1],
                crossOrigin: 'anonymous',
                src: 'https://docs.maptiler.com/openlayers/default-marker/marker-icon.png',
            })
        })
    });
    map.addLayer(layer);

    if (!user) {
        return <>Loading</>
    }

    return (
        <div>
            Welcome, {user}
            <br />
            <br />
            {location.loaded ?
                location.error ?
                    <>{location.error.message}</>
                    :
                    <>
                        Location Coordinates are :
                        <br />
                        Latitude: {location.coordinates.lat}
                        <br />
                        Longitude: {location.coordinates.lng}

                    </>
                : "User Denied Location Access"
            }

            <div id="map"></div>
        </div>
    )
}

export default LandingPage
