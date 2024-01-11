import Image from "next/image";
import { useTranslations } from "next-intl";
import { CustomerReview } from "@/types/customerReview";
import styles from "./Review.module.css";

export default function Review({ avatar, name, review }: CustomerReview) {
  const t = useTranslations();
  return (
    <>
      <Image
        src={avatar}
        alt={name}
        className={styles.image}
        width={50}
        height={50}
      />
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.review}>{review}</p>
    </>
  );
}
