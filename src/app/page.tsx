import styles from "./Home.module.css";
import Link from "next/link";
import reviews from "../reviews.json";
import ReviewsSlider from "./components/ReviewsSlider/ReviewsSlider";

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>DreamCar Rental</h1>
          <p className={styles.heroDescription}>
            Unforgettable adventures start here! Explore the open road,
            experience the joy of discovery, and enjoy hassle-free mobility
          </p>
          <Link href="/catalog" className={styles.link}>
            Explore Our Cars
          </Link>
        </div>
      </section>

      <section className={styles.benefitsSection}>
        <div className="container">
          <h2 className={styles.benefitsTitle}>Why choose DreamCar Rental?</h2>
          <ul className={styles.benefitsList}>
            <li className={styles.benefitsItem}>
              <h3 className={styles.benefitTitle}>Wide Selection</h3>
              <p className={styles.benefitText}>
                Choose from a diverse range of cars, from elegant sedans to
                adventurous SUVs.
              </p>
            </li>
            <li className={styles.benefitsItem}>
              <h3 className={styles.benefitTitle}>Easy Booking</h3>
              <p className={styles.benefitText}>
                Our user-friendly website make booking a breeze. Reserve your
                dream car in seconds.
              </p>
            </li>
            <li className={styles.benefitsItem}>
              <h3 className={styles.benefitTitle}>Quality Assurance</h3>
              <p className={styles.benefitText}>
                Rest easy knowing our vehicles are meticulously maintained and
                cleaned for your safety.
              </p>
            </li>
            <li className={styles.benefitsItem}>
              <h3 className={styles.benefitTitle}>Competitive Pricing</h3>
              <p className={styles.benefitText}>
                Affordable Luxury: Experience high-end comfort without the high
                price tag.
              </p>
            </li>
          </ul>
        </div>
      </section>
      <section className={styles.reviewsSection}>
        <div className={styles.reviewsContainer}>
          <h2 className={styles.reviewsTitle}>What our Customers Say?</h2>
          <ReviewsSlider reviews={reviews} />
        </div>
      </section>
    </>
  );
}
