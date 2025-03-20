import Navigation from "@/components/Navigation/Navigation";
import styles from "../page.module.css";
import Form from "@/components/Form/Form";

export default function Home() {
  return (
    <div className={styles.page}>
      <Navigation />
      <Form />
    </div>
  );
}
