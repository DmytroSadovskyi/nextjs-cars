"use client";
import { useTranslations } from "next-intl";
import Select from "react-select";
import { useState, useEffect } from "react";
import styles from "./Filter.module.css";

interface FilterProps {
  makeFilter: string;
  priceFilter: string;
  mileageFilter: { min: string; max: string };
  setMakeFilter: (make: string) => void;
  setPriceFilter: (price: string) => void;
  setMileageFilter: (mileage: { min: string; max: string }) => void;
  handleReset: () => void;
  makes: string[];
  onApplyFilters: () => void;
  children: React.ReactNode;
}

export default function Filter({
  makeFilter,
  priceFilter,
  mileageFilter,
  setMakeFilter,
  setPriceFilter,
  setMileageFilter,
  handleReset,
  makes,
  onApplyFilters,
  children,
}: FilterProps) {
  const t = useTranslations("filter");
  const [makeMenuIsOpen, setMakeMenuIsOpen] = useState(false);
  const [priceMenuIsOpen, setPriceMenuIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const handleMakeChange = (selectedOption: { value: string } | null) => {
    setMakeFilter(selectedOption ? selectedOption.value : "");
  };

  const handlePriceChange = (selectedOption: { value: string } | null) => {
    setPriceFilter(selectedOption ? selectedOption.value : "");
  };

  const handleMakeKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      setMakeMenuIsOpen(!makeMenuIsOpen);
    }
  };

  const handlePriceKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      setPriceMenuIsOpen(!priceMenuIsOpen);
    }
  };

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      width: "224px",
      height: "48px",
      border: "none",
      padding: "0px 14px",
      borderRadius: "14px",
      background: "#F7F7FB",
    }),
    input: (provided: any) => ({
      ...provided,
      border: "none",
    }),
    menuList: (provided: any) => ({
      ...provided,
      "&::-webkit-scrollbar": {
        width: "8px",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "rgba(18, 20, 23, 0.05)",
        borderRadius: "10px",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        background: "#555",
      },
      "&::-webkit-scrollbar-track": {
        background: "#fff",
      },
    }),
    indicatorSeparator: () => ({}),
    menu: (provided: any) => ({
      ...provided,
      width: "200px",
      padding: "14px 8px 14px 18px",
      borderRadius: "14px",
      border: "1px solid rgba(18, 20, 23, 0.05)",
      background: "#FFF",
      boxShadow: "0px 4px 36px 0px rgba(0, 0, 0, 0.02)",
      color: "rgba(18, 20, 23, 0.20)",
      fontFamily: "Manrope",
      fontSize: "16px",
      fontWeight: " 500",
      lineHeight: "1.25",
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: " #121417",
      fontFamily: "Manrope",
      fontSize: "18px",
      fontWeight: 500,
      lineHeight: "1.11",
    }),
    indicatorsContainer: (provided: any) => ({
      ...provided,
      transform: makeMenuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
      transition: "transform 0.3s ease",
      "& svg": {
        width: "20px",
        height: "20px",
        color: "rgba(18, 20, 23, 1)",
      },
    }),
  };

  const priceSelectStyles = {
    ...customStyles,
    control: (provided: any) => ({
      ...provided,
      width: "125px",
      height: "48px",
      border: "none",
      padding: "0px 14px",
      borderRadius: "14px",
      background: "#F7F7FB",
    }),
    indicatorsContainer: (provided: any) => ({
      ...provided,
      transform: priceMenuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
      transition: "transform 0.3s ease",
      "& svg": {
        width: "20px",
        height: "20px",
        color: "rgba(18, 20, 23, 1)",
      },
    }),
  };

  const priceOptions = [];
  for (let price = 30; price <= 500; price += 10) {
    priceOptions.push({ label: price.toString(), value: price.toString() });
  }

  const makeOptions = [...makes].sort().map((make) => ({
    label: make,
    value: make,
  }));
  return isMounted ? (
    <div className={styles.filterContainer}>
      <div className={styles.selectWrapper}>
        <div className={styles.mileageInputsWrapper}>
          <label className={styles.label} htmlFor="brand">
            {t("brandInput")}
          </label>
          <Select
            inputId="brand"
            options={makeOptions}
            value={makeFilter ? { label: makeFilter, value: makeFilter } : null}
            onChange={handleMakeChange}
            styles={customStyles}
            menuIsOpen={makeMenuIsOpen}
            onMenuOpen={() => setMakeMenuIsOpen(true)}
            onMenuClose={() => setMakeMenuIsOpen(false)}
            placeholder={t("brandPlaceholder")}
            onKeyDown={handleMakeKeyDown}
          />
        </div>
        <div className={styles.mileageInputsWrapper}>
          <label className={styles.label} htmlFor="price">
            {t("priceInput")}
          </label>
          <Select
            inputId="price"
            options={priceOptions}
            value={
              priceFilter ? { label: priceFilter, value: priceFilter } : null
            }
            onChange={handlePriceChange}
            styles={priceSelectStyles}
            menuIsOpen={priceMenuIsOpen}
            onMenuOpen={() => setPriceMenuIsOpen(true)}
            onMenuClose={() => setPriceMenuIsOpen(false)}
            placeholder={t("pricePlaceholder")}
            onKeyDown={handlePriceKeyDown}
          />
        </div>
      </div>
      <div className={styles.mileageInputsWrapper}>
        <label className={styles.label} htmlFor="mileage">
          {t("mileageInput")}
        </label>
        <div className={styles.inputsWrapper}>
          <input
            className={styles.mileageInputLeft}
            id="mileage"
            type="text"
            value={mileageFilter.min}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMileageFilter({
                ...mileageFilter,
                min: e.target.value,
              })
            }
            placeholder={t("leftPlaceholder")}
          />
          <input
            className={styles.mileageInputRight}
            type="text"
            value={mileageFilter.max}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMileageFilter({
                ...mileageFilter,
                max: e.target.value,
              })
            }
            placeholder={t("rightPlaceholder")}
          />
        </div>
      </div>

      <div className={styles.buttonsWrapper}>
        <button
          className={styles.filterButton}
          type="button"
          onClick={() => {
            onApplyFilters();
          }}
        >
          {t("search")}
        </button>
        <button
          className={styles.filterButton}
          type="button"
          onClick={handleReset}
        >
          {t("reset")}
        </button>
      </div>
      {children}
    </div>
  ) : null;
}
