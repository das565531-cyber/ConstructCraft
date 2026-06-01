import { useEffect, useState } from "react";

function UserLocation() {
  const [location, setLocation] =
    useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      }
    );
  }, []);

  return (
    <div>
      {location ? (
        <p>
          Latitude: {location.lat}
          <br />
          Longitude: {location.lng}
        </p>
      ) : (
        <p>Getting location...</p>
      )}
    </div>
  );
}

export default UserLocation;