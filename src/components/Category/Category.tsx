"use client";

import { QuestionsApi } from "@/api";
import {
  Category as CategoryType,
  Question as QuestionType,
  UiState,
} from "@/types";
import { useEffect, useState } from "react";
import styles from "./Category.module.css";
import Button from "../Button/Button";

export function Category({ slug }: { slug: string }) {
  const [uiState, setUiState] = useState<UiState>("initial");
  const [category, setCategory] = useState<CategoryType | null>(null);
  const [questions, setQuestions] = useState<QuestionType[] | null>(null);
  const [showAnswers, setShowAnswers] = useState<boolean>(false);

  const toggleAnswers = () => {
    setShowAnswers((prev) => !prev);
  };

  useEffect(() => {
    async function fetchData() {
      setUiState("loading");

      const api = new QuestionsApi();
      const response = await api.getCategory(slug);

      if (!response) {
        setUiState("error");
      } else {
        setCategory(response);
        const questionsResponse = await api.getQuestions(slug);
        if (!questionsResponse) {
          setUiState("error");
        } else {
          setUiState("data");
          setQuestions(questionsResponse);
        }
      }
    }
    fetchData();
  }, [slug]);

  return (
    <div className={styles.cats}>
      <h2> Spurningar </h2>

      {uiState === "loading" && <p>Sæki flokka...</p>}
      {uiState === "error" && !category && (
        <p>404 - Villa við að sækja flokk</p>
      )}
      {uiState === "error" && category && (
        <p>404 - Villa við að sækja spurningar</p>
      )}
      {uiState === "data" && (
        <div className={styles.qcard}>
          <h3>Flokkur: {category?.title}</h3>
          <div className={styles.qcards}>
            {questions?.map((question, index) => (
              <div key={index}>
                <b>
                  {question.question
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#039;")
                    .replace(/\n/g, "<br>")}
                </b>
                {question.answers.map((answer, index) => (
                  <div
                    key={index}
                    className={
                      answer.correct && showAnswers
                        ? `${styles.trueans} ${styles.correct}`
                        : answer.correct && !showAnswers
                        ? `${styles.trueans}`
                        : !answer.correct && showAnswers
                        ? `${styles.falseans} ${styles.incorrect}`
                        : `${styles.falseans}`
                    }
                  >
                    <p>
                      {answer.answer
                        .replace(/&/g, "&amp;")
                        .replace(/</g, "&lt;")
                        .replace(/>/g, "&gt;")
                        .replace(/"/g, "&quot;")
                        .replace(/'/g, "&#039;")
                        .replace(/\n/g, "<br>")}
                    </p>
                    <input type="checkbox" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
      {uiState === "data" && questions?.length === 0 && (
        <p>Engar spurningar í flokki.</p>
      )}
      <Button
        text={showAnswers ? "Fela svör" : "Sýna svör"}
        onClick={toggleAnswers}
      />
    </div>
  );
}
