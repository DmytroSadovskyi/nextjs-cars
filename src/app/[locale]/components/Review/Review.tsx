import Image from "next/image";
import styles from "./Review.module.css";
import { useTranslations } from "next-intl";
export type CustomerReview = {
  id?: number;
  avatar: string;
  name: string;
  review: string;
};
export default function Review({ avatar, name, review, id }: CustomerReview) {
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
