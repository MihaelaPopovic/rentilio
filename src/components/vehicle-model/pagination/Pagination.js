import React, { useContext, useEffect, useState } from "react";
import VehicleBrandCard from "../../vehicle-brand/vehicle-brand-card/VehicleBrandCard";
import { VehicleBrandContext } from "../../../contexts/VehicleBrandContext";
import Loader from "../../loader/Loader";
import "./Pagination.scss";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";

function Pagination() {
  const { getVehicleBrands, isLoading } = useContext(VehicleBrandContext);
  const [models, setModels] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = models
    ? models.slice(indexOfFirstItem, indexOfLastItem)
    : [];
  const totalPages = models ? Math.ceil(models.length / itemsPerPage) : 0;

  useEffect(() => {
    fetchData();
  }, [getVehicleBrands]);

  const fetchData = async () => {
    const loadedModels = await getVehicleBrands(true);
    setModels(loadedModels);
  };

  const handleClick = (e, pageNumber) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          onClick={(e) => handleClick(e, i)}
          className={i === currentPage ? "page-number active" : "page-number"}
        >
          {i}
        </li>
      );
    }
    return pageNumbers;
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="cars-wrapper">
          <div className="cars">
            {currentItems.map((model) => (
              <VehicleBrandCard key={model.id} model={model} />
            ))}
          </div>
          <div className="pagination-wrapper">
            <ul className="pagination">
              <li
                className={currentPage === 1 ? "page-number disable" : "page-number"}
                onClick={(e) => handleClick(e, currentPage - 1)}
              >
                <AiOutlineLeft />
              </li>
              {renderPageNumbers()}
              <li
                className={currentPage === totalPages ? "page-number disable" : "page-number"}
                onClick={(e) => handleClick(e, currentPage + 1)}
              >
                <AiOutlineRight />
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default Pagination;
