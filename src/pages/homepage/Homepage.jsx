import React, { useContext, useEffect, useState } from "react";
import "./Homepage.scss";
import { VehicleBrandContext } from "../../contexts/VehicleBrandContext";
import Loader from "../../components/loader/Loader";
import VehicleBrandCard from "../../components/vehicle-brand/vehicle-brand-card/VehicleBrandCard";
function Homepage() {
  const { getVehicleBrands, isLoading } = useContext(VehicleBrandContext);
  const [models, setModels] = useState();

  const fetchData = async () => {
    const loadedModels = await getVehicleBrands(true);
    console.log(loadedModels);
    setModels(loadedModels);
  };

  useEffect(() => {
    fetchData();
  }, [getVehicleBrands]);

  return (
    <>
      <section className="wrapper background">
        <div className="width-wrapper row">
          <div className="side">
            <h1 className="title">Easy and fast way to rent your car</h1>
            <p>
              At our rent a car service, we pride ourselves on providing
              excellent customer service and high-quality vehicles. We know that
              renting a car can be stressful, which is why we aim to make the
              process as easy and straightforward as possible.
            </p>
            <button type="button" className="cta">
              Rent a car
            </button>
          </div>
          <div className="side">
            <img
              draggable="false"
              className="banner"
              src="https://firebasestorage.googleapis.com/v0/b/rentilio-be577.appspot.com/o/Touareg.png?alt=media&token=782ac7b1-9cad-4f02-aa43-2acc1441a9d5"
              alt="Touareg"
            />
          </div>
        </div>
      </section>
      <section className="wrapper">
        <div className="width-wrapper column">
          <h2>Why choose Rentilio?</h2>
          <div className="cards-wrapper">
            <div className="card">
              <img
                draggable="false"
                className="card-icon"
                src="./spaceship.png"
                alt="Spaceship"
              />
              <div className="bottom">
                <h3 className="subtitle">Fast & easy booking</h3>
                <p>
                  Book your car online or offline. Follow the easy process to
                  book your car online. Or just call us any time from anywhere.
                </p>
              </div>
            </div>
            <div className="card">
              <img
                draggable="false"
                className="card-icon"
                src="./distance.png"
                alt="Distance"
              />
              <div className="bottom">
                <h3 className="subtitle">Many pickup location</h3>
                <p>
                  We have an extensive number of cars that will be available to
                  pick you up from any location throughout the country.
                </p>
              </div>
            </div>
            <div className="card">
              <img
                draggable="false"
                className="card-icon"
                src="./reputation.png"
                alt="Reputation"
              />
              <div className="bottom">
                <h3 className="subtitle">Satisfied customers</h3>
                <p>
                  We have 10000+ happy customers and it's increasing. View our
                  review section to get their feedback about our service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="wrapper background" id="cars">
          <div className="width-wrapper column">
            <h2>Book your suitable car</h2>
            <div className="cars">

            {models.map((model) => (
              <VehicleBrandCard key={model.id} model={model}/>
          
            ))}
            </div>
          </div>
        </section>
      )}

      <section className="wrapper">
        <div className="width-wrapper column">
          <div className="review-wrapper">
            <h2 className="subtitle">
              What are our customers saying about our company?
            </h2>
            <div className="picture-wrapper">
              <img
                draggable="false"
                className="yoda"
                src="./yoda.png"
                alt="Yoda"
              />
            </div>
            <div className="text">
              <p>Reviewed, your rent a car service, I have. Impressed, I am!</p>
              <p>
                A smooth, seamless booking experience, you offer. Great cars,
                you have, with features that make driving a pleasure, they come.
                Exceptional customer service, you provide, with staff that are
                always ready to help.
              </p>
              <p>
                Easy to find, your locations are, and the rental process,
                straightforward it is. Affordable prices, you have, making it
                possible for everyone to rent a car and explore the world.
              </p>
              <p>
                Overall, happy with your service, I am. Recommend it, I will, to
                anyone looking to rent a car, they are. May the force be with
                you, always!
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Homepage;
