import { Category } from "@/components/Category/Category";
import Navigation from "@/components/Navigation/Navigation";
import styles from "../../page.module.css";

export default async function FlokkaPage({
  params,
}: {
  params: Promise<{ flokkur: string }>;
}) {
  const { flokkur } = await params;

  return (
    <div className={styles.page}>
      <Navigation />
      <Category slug={flokkur} />
    </div>
  );
}
