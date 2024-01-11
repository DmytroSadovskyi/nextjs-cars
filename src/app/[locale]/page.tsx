import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import reviews from "../../reviews.json";
import styles from "../Home.module.css";
import ReviewsSlider from "./components/ReviewsSlider";

export default function Home() {
  const t = useTranslations("homePage");
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>DreamCar Rental</h1>
          <p className={styles.heroDescription}>{t("hero")}</p>
          <Link href="/catalog" className={styles.link}>
            {t("buttonText")}
          </Link>
        </div>
      </section>

      <section className={styles.benefitsSection}>
        <div className="container">
          <h2 className={styles.benefitsTitle}>{t("benefitsTitle")}</h2>
          <ul className={styles.benefitsList}>
            <li className={styles.benefitsItem}>
              <h3 className={styles.benefitTitle}>{t("firstBenefitTitle")}</h3>
              <p className={styles.benefitText}>{t("firstBenefitDesc")}</p>
            </li>
            <li className={styles.benefitsItem}>
              <h3 className={styles.benefitTitle}>{t("secondBenefitTitle")}</h3>
              <p className={styles.benefitText}>{t("secondBenefitDesc")}</p>
            </li>
            <li className={styles.benefitsItem}>
              <h3 className={styles.benefitTitle}>{t("thirdBenefitTitle")}</h3>
              <p className={styles.benefitText}>{t("thirdBenefitDesc")}</p>
            </li>
            <li className={styles.benefitsItem}>
              <h3 className={styles.benefitTitle}>{t("fourthBenefitTitle")}</h3>
              <p className={styles.benefitText}>{t("fourthBenefitDesc")}</p>
            </li>
          </ul>
        </div>
      </section>
      <section className={styles.reviewsSection}>
        <div className={styles.reviewsContainer}>
          <h2 className={styles.reviewsTitle}>{t("reviewsTitle")}</h2>
          <ReviewsSlider reviews={reviews} />
        </div>
      </section>
    </>
  );
}
