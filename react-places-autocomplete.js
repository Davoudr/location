// add the google-api to this script
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"></script>
// then, you must include it in the index.html ---> <body>HERE</body>
import { useContext, useState } from "react";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import PlacesAutocomplete from "react-places-autocomplete";
const NewSuggestion = () => {
  // ======================================================================================auto-suggestion by Google Places Api
  // ------------------------------------------------------useStates
  const [googleAddress, setGoogleAddress] = useState("");
  const [coordinates, setcoordinates] = useState({ lat: null, lng: null });
  const [fullAddress, setFullAddress] = useState([]);
  // -----------------------------------------------------handleChange
  const googleAddressHandleChange = (ev) => {
    setGoogleAddress(ev);
  };
  // -----------------------------------------------------calling Api
  const setGoogleAddressHandleSelect = async (ev) => {
    const results = await geocodeByAddress(ev); // suggestion detail
    const latLng = await getLatLng(results[0]); // suggestion ll
    setFullAddress(results);
    setGoogleAddress(ev);
    setcoordinates(latLng);
    console.log(results, latLng);
    // .then((latLng) => console.log("Success", latLng))
    // .catch((error) => console.error("Error", error));
  };
  // ------------------------------------------------------creating full address from google-res to be shown in the form
  let locationType = "";
  if (fullAddress.length > 0) {
    fullAddress[0].types.forEach((ele) => {
      locationType = locationType.concat(`, ${ele}`);
    });

    locationType = locationType.slice(2).replace(`_`, ` `);
  }

  return (
    <div className="address-box detail">
      <label
        htmlFor="address"
        form="business-form"
        className={`address-label detail-label`}
      >
        Address
      </label>
      <div>
        <PlacesAutocomplete
          value={googleAddress}
          onChange={googleAddressHandleChange}
          onSelect={setGoogleAddressHandleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div key={suggestions.description}>
              <input
                {...getInputProps({
                  placeholder: "Search Places ...",
                  className: "location-search-input",
                })}
                className="input address detail-input"
              />
              <div className="autocomplete-dropdown-container address address-results">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  return (
                    <div
                      className="address address-result"
                      key={suggestion.description}
                      {...getSuggestionItemProps(suggestion, {
                        className,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        {fullAddress.length > 0 && (
          <div className="full-address-box">
            <span className="address-type light-text">
              This address is for the types of:
            </span>
            <span className="address-type types">-- {locationType} --</span>{" "}
            <span className="full-address light-text">
              The full address is:
            </span>
            <span className="full-address">
              -- {fullAddress[0].formatted_address} --
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
// ======================================================================================
export default NewSuggestion;
