import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectDisplay } from "../redux/slices/displayCountrySlice";
import { setLoadingFalse, setLoadingTrue } from "../redux/slices/loadingSlice";

const Weather = () => {
  const [weather, setWeather] = useState();
  let display = useSelector(selectDisplay);
  let latitude = display.capitalInfo.latlng[0];
  let longitude = display.capitalInfo.latlng[1];
  const dispatch = useDispatch();

  // ------------------------------------
  // PASTE RAPIDAPI CODE SNIPPET IN A USEEFFECT HERE
  // ------------------------------------

  useEffect(() => {
    dispatch(setLoadingTrue());
    const options = {
      method: "GET",
      url: "https://weatherapi-com.p.rapidapi.com/current.json",
      params: { q: `${latitude}, ${longitude}` },
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_KEY,
        "X-RapidAPI-Host": import.meta.env.VITE_HOST,
      },
    };

    axios
      .request(options)
      .then((res) => {
        console.log(res.data);
        setWeather(res.data);
        dispatch(setLoadingFalse());
      })
      .catch((error) => {
        console.log(error);
        dispatch(setLoadingFalse());
      });
  }, []);

  return (
    <div>
      <table className="overview-table">
        <tr>
          <td>Conditions: </td>
          <td>{weather?.current?.condition?.text}</td>
        </tr>
        <tr>
          <td>Temperature: </td>
          <td>{weather?.current.temp_f} degrees Fahrenheit</td>
        </tr>
        <tr>
          <td>Feels Like: </td>
          <td>{weather?.current?.feelslike_f} degrees Fahrenheit</td>
        </tr>
        <tr>
          <td>Humidity: </td>
          <td>{weather?.current?.humidity}%</td>
        </tr>
        <tr>
          <td>Wind Speed: </td>
          <td>
            {weather?.current?.wind_mph} mph{""}
            {weather?.current?.wind_dir}
          </td>
        </tr>
      </table>
    </div>
  );
};

export default Weather;
