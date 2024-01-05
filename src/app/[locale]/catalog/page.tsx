import AllCars from "../components/AllCars/AllCars";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("catalog"),
  };
}
export default function Catalog() {
  return <AllCars />;
}
