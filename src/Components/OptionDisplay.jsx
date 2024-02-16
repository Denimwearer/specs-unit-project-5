import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPotentials } from "../redux/slices/potentialCountriesSlice";
import { setDisplayCountry } from "../redux/slices/displayCountrySlice";

const OptionDisplay = () => {
  let currentPotentials = useSelector(selectPotentials);
  console.log(currentPotentials);
  const dispatch = useDispatch();
  return (
    <div className="stack">
      {currentPotentials.map((country, i) => {
        return (
          <h2
            key={i}
            className="country-option"
            onClick={() => {
              dispatch(setDisplayCountry(currentPotentials[i]));
            }}
          >
            {country.name.common}
          </h2>
        );
      })}
    </div>
  );
};

export default OptionDisplay;
