"use client";
import { MouseEvent, useCallback, useEffect } from "react";
import { useTranslations } from "next-intl";
import styles from "./Modal.module.css";
import CloseIcon from "../../../../icons/close-icon.svg";

interface ModalProps {
  image: string;
  onClose: () => void;
  id: number;
  year: number;
  make: string;
  model: string;
  type: string;
  functionalities: string[];
  rentalPrice: string;
  address: string;
  accessories: string[];
  fuelConsumption: string;
  engineSize: string;
  mileage: number;
  rentalConditions: string;
  description: string;
}

export default function Modal({
  image,
  onClose,
  id,
  year,
  make,
  model,
  type,
  functionalities,
  rentalPrice,
  address,
  accessories,
  fuelConsumption,
  engineSize,
  mileage,
  rentalConditions,
  description,
}: ModalProps) {
  const t = useTranslations("card");
  const addressWithoutComa = address.replaceAll(",", "");
  const splittedAddress = addressWithoutComa.split(" ");
  const city = splittedAddress[3];
  const country = splittedAddress[4];

  const splittedRentalConditions = rentalConditions.split("\n", 3);
  const firstElement = splittedRentalConditions[0];
  const match = firstElement.match(/\d+/);
  const number = match ? parseInt(match[0], 10) : null;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modalWrapper}>
        <div className={styles.wrapper}>
          <button
            className={styles.closeButton}
            type="button"
            aria-label="close button"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
          <img className={styles.image} src={image} alt={`${make} ${model}`} />
          <div className={styles.carInfoWrapper}>
            <p className={styles.carName}>
              {make}
              <span className={styles.carModel}>{model}</span>, {year}
            </p>
            <ul className={styles.carInfo}>
              <li className={styles.carInfoItem}>
                <span className={styles.city}>{city}</span>
                <span>{country}</span>
              </li>
              <li className={styles.carInfoItem}>id: {id}</li>
              <li className={styles.carInfoItem}>
                {t("year")}: {year}
              </li>
              <li className={styles.carInfoItem}>
                {t("type")}: {type}
              </li>
              <li className={styles.carInfoItem}>
                {t("fuelConsumption")}: {fuelConsumption}
              </li>
              <li className={styles.carInfoItem}>
                {t("engineSize")}: {engineSize}
              </li>
            </ul>
          </div>
          <p className={styles.description}>{description}</p>
          <div className={styles.accessoriesInfo}>
            <p className={styles.title}>{t("functionalities")}:</p>
            <ul className={styles.accessoriesList}>
              <li className={styles.accessoriesListItem}>{accessories[0]}</li>
              <li className={styles.accessoriesListItem}>{accessories[1]}</li>
              <li className={styles.accessoriesListItem}>{accessories[2]}</li>
              <li className={styles.accessoriesListItem}>
                {functionalities[0]}
              </li>
              <li className={styles.accessoriesListItem}>
                {functionalities[1]}
              </li>
              <li className={styles.accessoriesListItem}>
                {functionalities[2]}
              </li>
            </ul>
          </div>

          <p className={styles.rentalInfoTitle}>{t("rentalConditions")}:</p>
          <ul className={styles.rentalInfo}>
            <li className={styles.rentalInfoItem}>
              {t("minimumAge")}: <span>{number}</span>
            </li>
            <li className={styles.rentalInfoItem}>
              {splittedRentalConditions[1]}
            </li>
            <li className={styles.rentalInfoItem}>
              {splittedRentalConditions[2]}
            </li>
            <li className={styles.rentalInfoItem}>
              {t("mileage")}: <span>{mileage.toLocaleString("en-EN")}</span>
            </li>
            <li className={styles.rentalInfoItem}>
              {t("rentalPrice")}: <span>{rentalPrice}</span>
            </li>
          </ul>
          <a href="tel:+380730000000" className={styles.rentalLink}>
            {t("rentalButton")}
          </a>
        </div>
      </div>
    </div>
  );
}
