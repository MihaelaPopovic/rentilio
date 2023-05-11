import React, { useEffect, useState, useRef } from "react";
import VehicleBrandCard from "../../vehicle-brand/card/VehicleBrandCard";

import Loader from "../../loader/Loader";
import "./VehicleModelsList.scss";
import {
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineArrowUp,
  AiOutlineArrowDown,
} from "react-icons/ai";
import { Button, Dropdown } from "antd";
import { orderBy, getPaginateModels, getAllModels, filterBy } from "./../../../services/VehicleModelsService";
import { message } from "antd";
function VehicleModelsList() {
  const [ nextPageToken, setNextPageToken ] = useState('');
  const [ nextOrderByPageToken, setNextOrderByPageToken ] = useState('');

  const [models, setModels] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [orderByKey, setOrderByKey] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const cars = useRef(null);

  const scrollToCars = () => {
    cars.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchData();
  }, [getPaginateModels, orderBy, getAllModels]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const totalModels = await getAllModels();
      setTotalPages(Math.ceil(totalModels.length / itemsPerPage));

      const loadedModels = await getPaginateModels(nextPageToken);
      if (loadedModels.nextPageToken) {
        setNextPageToken(loadedModels.nextPageToken);
      }
      setModels(loadedModels.models);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      message.open({
        type: "warning",
        content: "Something went wrong!",
      });
    }
  };

  //Filtering
  const [searchQuery, setSearchQuery] = useState("");

  const searchModels = (search) => {
    setSearchQuery(search);
    if (search) {
     filterModels(search);
    } else {
      setModels([]);
    }
    setCurrentPage(1);
  };

  const filterModels = async (search) => {
    try {
      setIsLoading(true);
      console.log(search);
      const loadedModels = await filterBy(search)
    /*    if (loadedModels.nextPageToken) {
         setNextOrderByPageToken(loadedModels.nextPageToken);
       } */
       setModels(loadedModels.models);
       setIsLoading(false);
     } catch (error) {
       setIsLoading(false);
 
       message.open({
         type: "warning",
         content: "Something went wrong!",
       });
     }
  }

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const pageChanged = (pageNumber) => {
    scrollToCars();
    setCurrentPage(pageNumber);
    if(orderByKey !== '') {
      orderByRequest(orderByKey, nextOrderByPageToken);
    } else {
      fetchData();
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          onClick={(e) => pageChanged(i)}
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
    setNextOrderByPageToken(null);
    orderByRequest(key, '');
    setCurrentPage(1);
  };
  
  const orderByRequest = async (sortBy, nextToken ) => {
    try {
      setIsLoading(true);

     const loadedModels = await orderBy(sortBy, nextToken)
      if (loadedModels.nextPageToken) {
        setNextOrderByPageToken(loadedModels.nextPageToken);
      }
      setOrderByKey(sortBy);
      setModels(loadedModels.models);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      message.open({
        type: "warning",
        content: "Something went wrong!",
      });
    }
  };

  return (
    <div id="cars" ref={cars}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="cars-wrapper" >
          <div className="input-wrapper">
            <input
              className="input"
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => searchModels(e.target.value)}
            />
          </div>
          <Dropdown
            menu={{
              items,
              onClick,
            }}
            placement="bottom"
            arrow
          >
            <Button type="primary" className="sort">
              Sort by
            </Button>
          </Dropdown>
          <div className="cars">
            {models.map((model) => (
              <VehicleBrandCard key={model.id} model={model} />
            ))}
          </div>
          <div className="pagination-wrapper">
            <ul className="pagination">
              <li
                className={
                  currentPage === 1 ? "page-number disable" : "page-number"
                }
                onClick={(e) => pageChanged(currentPage - 1)}
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
                onClick={(e) => pageChanged(currentPage + 1)}
              >
                <AiOutlineRight />
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default VehicleModelsList;
