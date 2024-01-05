import FavoriteCars from "../components/FavoriteCars/FavoriteCars";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("favorites"),
  };
}
export default function Favorites() {
  return <FavoriteCars />;
}
