/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { WEATHER_API } from "./apiEndPoints";
import ja from "axios-jsonp";

import "./App.css";

const latLong = [
  { lat: 19.076, long: 72.8777 },
  { lat: 28.7041, long: 77.1025 },
  { lat: 12.9716, long: 77.5946 },
  { lat: 13.0827, long: 13.0827 }
];
const cities = ["Mumbai", "Bangalore", "Delhi", "Chennai"];

function App() {
  const [data, setData] = useState([]);

  const getWeatherData = async () => {
    try {
      const promiseArray = [];
      latLong.forEach(v => {
        promiseArray.push(
          axios({
            url: WEATHER_API(v.lat, v.long),
            adapter: ja,
            callbackParamName: "c" // optional, 'callback' by default
          })
        );
        // promiseArray.push(axios.get(WEATHER_API(v.lat, v.long)));
      });

      Promise.all(promiseArray)
        .then(data => {
          const temp = data.map(v => v.data.currently);
          console.log(temp);

          setData(temp);
        })
        .catch(e => alert(e));
      setData(data);
    } catch (error) {
      alert("Something went wrong");
    }
  };
  useEffect(() => {
    getWeatherData();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <table>
          <thead>
            <tr>
              <th>City</th>
              <th>Summary</th>
            </tr>
          </thead>

          <tbody>
            {data &&
              data.map((v, i) => (
                <React.Fragment>
                  <tr>
                    <td>{cities[i]}</td>
                    <td>{v.summary}</td>
                  </tr>
                </React.Fragment>
              ))}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
