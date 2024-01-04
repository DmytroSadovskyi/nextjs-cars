"use client";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import fetchCars from "../../../services/carsApi";
import CarCard from "../../components/CarCard/CarCard";
import { Car } from "../../components/CarCard/CarCard";
import Filter from "../Filter/Filter";
import DescendingIcon from "../../../icons/sort-amount-desc.svg";
import AscendingIcon from "../../../icons/sort-amount-asc.svg";
import styles from "./AllCars.module.css";

export default function AllCars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [makes, setMakes] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage] = useState(8);
  const indexOfLastCar = currentPage * carsPerPage;
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [applyFiltersFlag, setApplyFiltersFlag] = useState(false);

  const [makeFilter, setMakeFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  const [showNoCarsMessage, setShowNoCarsMessage] = useState(false);

  const [mileageFilter, setMileageFilter] = useState<{
    min: string;
    max: string;
  }>({
    min: "",
    max: "",
  });

  const [sortOrder, setSortOrder] = useState("ascending");

  const handleLoadMore = () => setCurrentPage((prevPage) => prevPage + 1);
  useEffect(() => {
    const controller = new AbortController();
    const getAllCars = async () => {
      try {
        const result = await fetchCars(controller);
        setCars(result);
        const uniqMakes: string[] = Array.from(
          new Set(result.map((car: Car) => car.make))
        );
        setMakes(uniqMakes);
        setFilteredCars(result);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Запит було скасовано", error.message);
        } else {
          console.error("Помилка при виконанні запиту", error);
        }
      }
    };

    getAllCars();

    return () => {
      controller.abort();
    };
  }, []);

  const filterCars = useCallback(
    (car: Car) => {
      if (makeFilter !== "" && car.make !== makeFilter) {
        return false;
      }

      const rentalPriceNumeric = parseInt(
        (car.rentalPrice || "0").replace(/\D/g, ""),
        10
      );

      if (
        priceFilter !== "" &&
        rentalPriceNumeric > parseInt(priceFilter, 10)
      ) {
        return false;
      }

      if (
        (mileageFilter.min !== "" &&
          !isNaN(Number(mileageFilter.min)) &&
          car.mileage < Number(mileageFilter.min)) ||
        (mileageFilter.max !== "" &&
          !isNaN(Number(mileageFilter.max)) &&
          car.mileage > Number(mileageFilter.max))
      ) {
        return false;
      }

      return true;
    },
    [makeFilter, priceFilter, mileageFilter]
  );

  useEffect(() => {
    if (applyFiltersFlag) {
      const filteredCars = cars.filter(filterCars);
      setFilteredCars(filteredCars);
      if (filteredCars.length === 0) {
        setShowNoCarsMessage(true);
        toast.error("There are no cars");
      } else {
        setShowNoCarsMessage(false);
      }

      setApplyFiltersFlag(false);
    }
  }, [applyFiltersFlag, cars, filterCars]);

  const sortedCars = [...filteredCars].sort((a, b) => {
    const rentalPriceA = parseInt(a.rentalPrice.replace(/\D/g, ""), 10) || 0;
    const rentalPriceB = parseInt(b.rentalPrice.replace(/\D/g, ""), 10) || 0;

    return sortOrder === "ascending"
      ? rentalPriceA - rentalPriceB
      : rentalPriceB - rentalPriceA;
  });

  const currentCars = sortedCars.slice(0, indexOfLastCar);

  const handleReset = () => {
    setMakeFilter("");
    setPriceFilter("");
    setMileageFilter({ min: "", max: "" });
    setApplyFiltersFlag(true);
    setShowNoCarsMessage(false);
  };

  const toggleSortOrder = () => {
    setSortOrder((prevSortOrder) =>
      prevSortOrder === "ascending" ? "descending" : "ascending"
    );
  };

  return (
    <>
      <Toaster />
      <Filter
        makeFilter={makeFilter}
        priceFilter={priceFilter}
        mileageFilter={mileageFilter}
        setMakeFilter={setMakeFilter}
        setPriceFilter={setPriceFilter}
        setMileageFilter={setMileageFilter}
        makes={makes}
        handleReset={handleReset}
        onApplyFilters={() => {
          setApplyFiltersFlag(true);
        }}
      >
        <button
          type="button"
          aria-label="sorting-button"
          onClick={toggleSortOrder}
          className={styles.sort}
        >
          {sortOrder === "ascending" ? <DescendingIcon /> : <AscendingIcon />}
        </button>
      </Filter>

      <div className="container">
        {currentCars.length === 0 && showNoCarsMessage && (
          <>
            <p>No cars</p>
          </>
        )}

        <ul className={styles.carsList}>
          {currentCars.map((car: Car) => (
            <li key={car.id}>
              <CarCard car={car} />
            </li>
          ))}
        </ul>
        {filteredCars.length > indexOfLastCar && (
          <button
            type="button"
            onClick={handleLoadMore}
            className={styles.loadMore}
          >
            Load more
          </button>
        )}
      </div>
    </>
  );
}
