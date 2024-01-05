import { useTranslations } from "next-intl";

export default function NotFoundPage() {
  const t = useTranslations("NotFoundPage");
  return (
    <>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
    </>
  );
}
