import React from "react";
import "./VehicleBrandCard.scss";
function VehicleBrandCard({ model }) {
  return (
    <div className="car-wrapper">
      <h4 className="sub">{model.name}</h4>
      <img
        draggable="false"
        className="car-picture"
        src={model.picture}
        alt={model.abrv}
      />
      <h5>€{model.price}/day</h5>
      <div className="details">
        <div className="detail">
          <img
            draggable="false"
            className="icon"
            src="./car-chair.png"
            alt="Seat"
          />
          <p className="small-font">{model.seats}</p>
        </div>
        <div className="detail">
          <img
            draggable="false"
            className="icon"
            src="./gas-station.png"
            alt="Gas station"
          />
          <p className="small-font">{model.fuelConsumption} L/100km</p>
        </div>
        <div className="detail">
          <img
            draggable="false"
            className="icon"
            src="./gearshift.png"
            alt="Gear shift"
          />
          <p className="small-font">{model.gearShift}</p>
        </div>
      </div>
    </div>
  );
}

export default VehicleBrandCard;
