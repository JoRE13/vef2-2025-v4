import Navigation from "@/components/Navigation/Navigation";
import styles from "../page.module.css";
import CategoryEditor from "@/components/CategoryEditor/CategoryEditor";

export default function Home() {
  return (
    <div className={styles.page}>
      <Navigation />
      <CategoryEditor />
    </div>
  );
}
