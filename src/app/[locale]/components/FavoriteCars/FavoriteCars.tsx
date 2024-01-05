"use client";
import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useStore } from "../../../store";
import CarCard from "../../components/CarCard/CarCard";
import AscendingIcon from "../../../../icons/sort-amount-asc.svg";
import DescendingIcon from "../../../../icons/sort-amount-desc.svg";
import { Toaster, toast } from "react-hot-toast";

import styles from "./FavoriteCars.module.css";
import { Car } from "../../components/CarCard/CarCard";
import Filter from "../Filter/Filter";

export default function FavoriteCars() {
  const t = useTranslations("other");
  const { cars } = useStore();
  const [makes, setMakes] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const [filteredCars, setFilteredCars] = useState<Car[]>(cars);
  const [applyFiltersFlag, setApplyFiltersFlag] = useState(false);
  const [showNoCarsMessage, setShowNoCarsMessage] = useState(false);
  const [makeFilter, setMakeFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [mileageFilter, setMileageFilter] = useState<{
    min: string;
    max: string;
  }>({
    min: "",
    max: "",
  });

  const [sortOrder, setSortOrder] = useState("ascending");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const uniqMakes: string[] = Array.from(
      new Set(cars.map((car: Car) => car.make))
    );
    setMakes(uniqMakes);
    setFilteredCars(cars);
  }, [cars]);

  const filterCars = useCallback(
    (car: Car) => {
      if (makeFilter !== "" && car.make !== makeFilter) {
        return false;
      }

      const rentalPriceNumeric = parseInt(
        car.rentalPrice.replace(/\D/g, ""),
        10
      );

      if (
        priceFilter !== "" &&
        rentalPriceNumeric >= parseInt(priceFilter, 10)
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
        toast.error(t("errorMessage"));
      } else {
        setShowNoCarsMessage(false);
      }
      setApplyFiltersFlag(false);
    }
  }, [applyFiltersFlag, cars, filterCars, t]);

  const sortedCars = [...filteredCars].sort((a, b) => {
    if (sortOrder === "ascending") {
      return (
        parseInt(a.rentalPrice.replace(/\D/g, ""), 10) -
        parseInt(b.rentalPrice.replace(/\D/g, ""), 10)
      );
    } else {
      return (
        parseInt(b.rentalPrice.replace(/\D/g, ""), 10) -
        parseInt(a.rentalPrice.replace(/\D/g, ""), 10)
      );
    }
  });

  const handleReset = () => {
    setMakeFilter("");
    setPriceFilter("");
    setMileageFilter({ min: "", max: "" });
    setApplyFiltersFlag(true);
    setFilteredCars(cars);
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
          className={styles.sort}
          type="button"
          aria-label="sorting-button"
          onClick={toggleSortOrder}
        >
          {sortOrder === "ascending" ? <DescendingIcon /> : <AscendingIcon />}
        </button>
      </Filter>
      <div className="container">
        {mounted &&
          (sortedCars.length > 0 && !showNoCarsMessage ? (
            <ul className={styles.carsList}>
              {sortedCars.map((car) => (
                <li key={car.id}>{<CarCard car={car} />}</li>
              ))}
            </ul>
          ) : (
            <p>{t("emptyListText")}</p>
          ))}
      </div>
    </>
  );
}
