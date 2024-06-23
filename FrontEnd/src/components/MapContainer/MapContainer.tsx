// src/components/MapContainer/MapContainer.tsx
import React, { useEffect } from 'react';
import { useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { useGetQueryParamObj, createQueryString } from '../../utils/urlUtils';
import {useSetData } from '../../context/AppDataContext';
import { HttpReq, wSCall } from '../../services/apiService'
import urls from '../../urls.json';
import { FeatureCollection } from '../../types/allTypesAndInterfaces';


mapboxgl.accessToken = process.env?.REACT_APP_MAPBOX_KEY ?? "";
mapboxgl.setRTLTextPlugin(
  'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
  () => { }
);


const MapContainer: React.FC = () => {

  const queryParamObj = useGetQueryParamObj();
  const catalogueDatasetId = queryParamObj.get("catalogue_dataset_id");

  const [geoPoints, setGeoPoints] = useState<FeatureCollection | ''>('');
  const [wsResMessage, setWsResMessage] = useState<string>('');
  const [wsResId, setWsResId] = useState<string>('');
  const [wsResloading, setWsResLoading] = useState<boolean>(true);
  const [wsReserror, setWsResError] = useState<Event | null>(null);


  const [resData, setResData] = useState<string>('');
  const [resMessage, setResMessage] = useState<string>('');
  const [resId, setResId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);


  // Store the catalogue_dataset_id in the context when it changes
  const setData = useSetData();
  // useEffect(function () {
  //   if (catalogueDatasetId) {
  //     setData("catalogue_dataset_id", catalogueDatasetId);
  //     HttpReq<string>(
  //       urls.fetch_acknowlg_id,
  //       setResData,
  //       setResMessage,
  //       setResId,
  //       setLoading,
  //       setError
  //     );
  //   }
  // }, [catalogueDatasetId]);
  
  // useEffect(function () {
  //   if (resId) {
  //     const apiJsonRequest = { catalogue_dataset_id: catalogueDatasetId };
  //     wSCall<FeatureCollection>(
  //       urls.ws_dataset_load,
  //       resId,
  //       apiJsonRequest,
  //       setGeoPoints,
  //       setWsResMessage,
  //       setWsResId,
  //       setWsResLoading,
  //       setWsResError
  //     );
  //   }
  // }, [resId, catalogueDatasetId]);


  useEffect(function () {
    if (catalogueDatasetId) {
      setData("catalogue_dataset_id", catalogueDatasetId);
      const apiJsonRequest = { catalogue_dataset_id: catalogueDatasetId };
      HttpReq<string>(
        urls.http_catlog_data,
        setResData,
        setResMessage,
        setResId,
        setLoading,
        setError,
        "post",
        apiJsonRequest
      );
    }
  }, [catalogueDatasetId]);


  useEffect(function () {
    if (geoPoints != ''){
      setData("geoPoints", geoPoints);
  }
  }, [geoPoints]);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map-container",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [39.6074258, 24.4738121],
      attributionControl: true,
      zoom: 13,
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");
    if (geoPoints) {
      map.on("load", () => {
        if (!!geoPoints?.features && geoPoints?.features?.length) {
          map.setCenter(geoPoints?.features[0]?.geometry?.coordinates);
          map.addSource("circle", {
            type: "geojson",
            data: geoPoints,
          });

          map.addLayer({
            id: "circle-layer",
            type: "circle",
            source: "circle",
            paint: {
              "circle-radius": 13,
              "circle-color": "#12939A",
              "circle-opacity": 0.8,
              "circle-stroke-width": 0.4,
              "circle-stroke-color": "#898989",
            },
          });
        }
      });
      return () => map.remove();
    }
  }, [geoPoints]);

  return (
    <div
      id="map-container"
      style={{ width: "96%", height: "100vh", zIndex: 99 }}
    />
  );
};

export default MapContainer;
