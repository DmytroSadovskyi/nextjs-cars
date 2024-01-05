"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import HeartIcon from "../../../../icons/heart.svg";
import HeartIconFavorite from "../../../../icons/heart-favorite.svg";
import Modal from "../Modal/Modal";
import styles from "./CarCard.module.css";
import { useStore } from "@/app/store";

export type Car = {
  id: number;
  year: number;
  make: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string;
  engineSize: string;
  accessories: string[];
  functionalities: string[];
  rentalPrice: string;
  rentalCompany: string;
  address: string;
  rentalConditions: string;
  mileage: number;
};

export default function CarCard({ car }: { car: Car }) {
  const {
    id,
    year,
    make,
    model,
    type,
    img,
    description,
    fuelConsumption,
    engineSize,
    accessories,
    functionalities,
    rentalPrice,
    rentalCompany,
    rentalConditions,
    address,
    mileage,
  } = car;
  const { cars, addToFavorites, removeFromFavorites } = useStore();
  const t = useTranslations("card");

  const isFavorite = cars.some((favoriteCar) => favoriteCar.id === car.id);

  const addFavorite = () => addToFavorites(car);
  const removeFavorite = () => removeFromFavorites(car.id);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const addressWithoutComa = address.replaceAll(",", "");

  const splittedAddress = addressWithoutComa.split(" ");
  const city = splittedAddress[3];
  const country = splittedAddress[4];

  const openModal = () => {
    setIsModalOpen(true);
    document.body.classList.add("no-scroll");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove("no-scroll");
  };

  return (
    <div className={styles.carWrapper}>
      <div className={styles.imageWrapper}>
        <button
          className={styles.iconWrapper}
          onClick={!isFavorite ? addFavorite : removeFavorite}
        >
          {isFavorite ? <HeartIconFavorite /> : <HeartIcon />}
        </button>
        <img className={styles.carImage} src={img} alt={`${make} ${model}`} />
      </div>

      <div className={styles.wrapper}>
        <p className={styles.carName}>
          {make}
          <span className={styles.model}>{model}</span>, {year}
        </p>
        <span>{rentalPrice}</span>
      </div>
      <ul className={styles.carInfo}>
        <li className={styles.carInfoItem}>
          <span className={styles.city}>{city}</span>
          <span>{country}</span>
        </li>
        <li className={styles.carInfoItem}>{rentalCompany}</li>
        <li className={styles.carInfoItem}>{type}</li>
        <li className={styles.carInfoItem}>{model}</li>
        <li className={styles.carInfoItem}>{id}</li>
        <li className={styles.carInfoItem}>{functionalities[0]}</li>
      </ul>
      <button type="button" onClick={openModal} className={styles.learnMore}>
        {t("learnMore")}
      </button>
      {isModalOpen && (
        <Modal
          image={img}
          onClose={closeModal}
          id={id}
          year={year}
          make={make}
          model={model}
          type={type}
          functionalities={functionalities}
          rentalPrice={rentalPrice}
          address={address}
          accessories={accessories}
          engineSize={engineSize}
          fuelConsumption={fuelConsumption}
          rentalConditions={rentalConditions}
          mileage={mileage}
          description={description}
        />
      )}
    </div>
  );
}
