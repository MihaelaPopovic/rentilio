import React, { useContext, useEffect, useState } from "react";
import VehicleBrandCard from "../../vehicle-brand/vehicle-brand-card/VehicleBrandCard";
import { VehicleBrandContext } from "../../../contexts/VehicleBrandContext";
import Loader from "../../loader/Loader";
import "./Pagination.scss";
import {
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineArrowUp,
  AiOutlineArrowDown,
} from "react-icons/ai";
import { Button, Dropdown } from "antd";

function Pagination() {
  const { getVehicleBrands, isLoading } = useContext(VehicleBrandContext);
  const [models, setModels] = useState();

  useEffect(() => {
    fetchData();
  }, [getVehicleBrands]);

  const fetchData = async () => {
    const loadedModels = await getVehicleBrands(true);
    setModels(loadedModels);
  };
  //Filtering
  const [filteredModels, setFilteredModels] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const searchModels = (search) => {
    setSearchQuery(search);
    if (search) {
      const filteredItems = models.filter((item) => {
        return (
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.abrv.toLowerCase().includes(search.toLowerCase()) ||
          item.fuelConsumption.toString().includes(search) ||
          item.gearShift.toLowerCase().includes(search.toLowerCase()) ||
          item.price.toString().includes(search.toLowerCase()) ||
          item.seats.includes(search.toLowerCase()) ||
          item.brand.name.toLowerCase().includes(search.toLowerCase())
        );
      });
      setFilteredModels(filteredItems);
    } else {
      setFilteredModels([]);
    }
    setCurrentPage(1);
  };
  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentModels = filteredModels.length
    ? filteredModels.slice(indexOfFirstItem, indexOfLastItem)
    : models
    ? models.slice(indexOfFirstItem, indexOfLastItem)
    : [];
  const totalPages = filteredModels.length
    ? Math.ceil(filteredModels.length / itemsPerPage)
    : models
    ? Math.ceil(models.length / itemsPerPage)
    : 0;
  const pageChanged = (e, pageNumber) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          onClick={(e) => pageChanged(e, i)}
          className={i === currentPage ? "page-number active" : "page-number"}
        >
          {i}
        </li>
      );
    }
    return pageNumbers;
  };

  //Sorting
  const items = [
    {
      key: "priceAscending",
      label: "Price ascending",
      icon: <AiOutlineArrowUp />,
    },
    {
      key: "priceDescending",
      label: "Price descending",
      icon: <AiOutlineArrowDown />,
    },
    {
      key: "nameAscending",
      label: "Name ascending",
      icon: <AiOutlineArrowUp />,
    },
    {
      key: "nameDescending",
      label: "Name descending",
      icon: <AiOutlineArrowDown />,
    },
  ];

  const onClick = ({ key }) => {
    switch (key) {
      case "priceAscending":
        return setFilteredModels([...models].sort((a, b) => a.price - b.price));
      case "priceDescending":
        return setFilteredModels([...models].sort((a, b) => b.price - a.price));
      case "nameAscending":
        return setFilteredModels(
          [...models].sort((a, b) => a.name.localeCompare(b.name))
        );
      case "nameDescending":
        return setFilteredModels(
          [...models].sort((a, b) => b.name.localeCompare(a.name))
        );
      default:
        setFilteredModels(filteredModels);
    }
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="cars-wrapper">
          <div className="input-wrapper">
            <input
              className="input"
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => searchModels(e.target.value)}
            />
          </div>
          <Dropdown menu={{ items, onClick }} placement="bottom" arrow>
            <Button type="primary" className="sort">
              Sort by
            </Button>
          </Dropdown>
          <div className="cars">
            {currentModels.map((model) => (
              <VehicleBrandCard key={model.id} model={model} />
            ))}
          </div>
          <div className="pagination-wrapper">
            <ul className="pagination">
              <li
                className={
                  currentPage === 1 ? "page-number disable" : "page-number"
                }
                onClick={(e) => pageChanged(e, currentPage - 1)}
              >
                <AiOutlineLeft />
              </li>
              {renderPageNumbers()}
              <li
                className={
                  currentPage === totalPages
                    ? "page-number disable"
                    : "page-number"
                }
                onClick={(e) => pageChanged(e, currentPage + 1)}
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
