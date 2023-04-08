import React, { useContext } from 'react'
import AuthContext from '../context/Auth/AuthContext'
import useGeoLocation from "../hooks/useGeoLocation";
import './LandingPage.css'

const LandingPage = () => {

    const { user } = useContext(AuthContext)
    const location = useGeoLocation()

    /* global ol */
    const map = new ol.Map({
        layers: [            
            new ol.layer.Tile({
                source: new ol.source.TileJSON({
                    url: 'https://api.maptiler.com/maps/hybrid/tiles.json?key=0pCtCvBN2aL4eB4nNYPy',
                    tileSize: 2048,
                })
            })
        ],
        target: 'map',
        view: new ol.View({
            constrainResolution: true,
            center: ol.proj.fromLonLat([72.8210722, 22.6010415]),
            zoom: 13
        })
    });
    const layer = new ol.layer.Vector({ 
        source: new ol.source.Vector({
            features: [
                new ol.Feature({
                    geometry: new ol.geom.Point(ol.proj.fromLonLat([72.8210722, 22.6010415])),
                })
            ]
        }),
        style: new ol.style.Style({ 
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
        <div id="landing">
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
