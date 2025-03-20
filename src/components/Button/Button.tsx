"use client";

import styles from "./Button.module.css";

type Props = {
  text: string;
  onClick: () => void;
};

export default function Button({ text, onClick }: Props) {
  return (
    <button className={styles.button} onClick={onClick}>
      {text}
    </button>
  );
}
