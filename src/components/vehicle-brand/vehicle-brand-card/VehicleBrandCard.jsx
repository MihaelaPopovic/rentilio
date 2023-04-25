import React from "react";
import "./VehicleBrandCard.scss";
function VehicleBrandCard({ model }) {
  return (
    <div className="car-wrapper">
      <h4>{model.name}</h4>
      <img
        draggable="false"
        className="car-picture"
        src={model.picture}
        alt={model.abrv}
      />
      <div className="details">
        <div className="detail">
          <img
            draggable="false"
            className="icon"
            src="./car-seat.png"
            alt="Seat"
          />
          <p>{model.seats}</p>
        </div>
        <div className="detail">
          <img
            draggable="false"
            className="icon"
            src="./gas-station.png"
            alt="Gas station"
          />
          <p>{model.fuelConsumption} L/100km</p>
        </div>
        <div className="detail">
          <img
            draggable="false"
            className="icon"
            src="./gearshift.png"
            alt="Gear shift"
          />
          <p>{model.gearShift}</p>
        </div>
      </div>
    </div>
  );
}

export default VehicleBrandCard;
