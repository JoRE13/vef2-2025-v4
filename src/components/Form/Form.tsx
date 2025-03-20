"use client";

import { useEffect, useState } from "react";
import { QuestionsApi } from "@/api";
import { Category } from "@/types";
import styles from "./Form.module.css";

export default function Form() {
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("");
  const [answers, setAnswers] = useState([
    { answer: "", correct: false },
    { answer: "", correct: false },
    { answer: "", correct: false },
    { answer: "", correct: false },
  ]);
  const [error, setError] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      const api = new QuestionsApi();
      const categoriesResponse = await api.getCategories();
      if (categoriesResponse) {
        setCategories(categoriesResponse);
      }
      setLoading(false);
    }
    fetchCategories();
  }, []);

  const handleAnswerChange = (
    index: number,
    field: "answer" | "correct",
    value: string | boolean
  ) => {
    const newAnswers = [...answers];
    newAnswers[index] = { ...newAnswers[index], [field]: value };
    setAnswers(newAnswers);
    setMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = {
      question,
      category,
      answers,
    };

    try {
      const api = new QuestionsApi();
      const result = await api.postQuestion(data);
      if (result[0]) {
        setMessage("Question uploaded successfully");
        setQuestion("");
        setCategory("");
        setAnswers([
          { answer: "", correct: false },
          { answer: "", correct: false },
          { answer: "", correct: false },
          { answer: "", correct: false },
        ]);
      } else {
        setError(true);
        setMessage(JSON.stringify(await result[1]));
      }
    } catch {
      setError(true);
      setMessage(`Failed to post the question. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.page} onSubmit={handleSubmit}>
      <h2>Bæta við spurningu</h2>

      {error && <p style={{ color: "red" }}>{message}</p>}
      {!error && <p style={{ color: "green" }}>{message}</p>}
      {!categories && loading && <p>Hleður inn flokkum...</p>}

      <div>
        <label htmlFor="question">Spurning</label>
        <input
          type="text"
          id="question"
          value={question}
          onChange={(e) => {
            setQuestion(e.target.value);
            setMessage(null);
          }}
          required
        />
      </div>

      <div>
        <label htmlFor="category">Flokkur</label>
        <select
          id="category"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value); // Set category to the selected slug
            setMessage(null);
          }}
          required
        >
          <option value="" disabled>
            Veldu flokk
          </option>
          {categories?.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.title}
            </option>
          ))}
        </select>
      </div>

      <h3>Svör</h3>
      {answers.map((answer, index) => (
        <div key={index}>
          <div>
            <label htmlFor={`answer-${index}`}>Svar {index + 1}</label>
            <input
              type="text"
              id={`answer-${index}`}
              value={answer.answer}
              onChange={(e) =>
                handleAnswerChange(index, "answer", e.target.value)
              }
              required
            />
          </div>
          <div>
            <label htmlFor={`correct-${index}`}>Rétt?</label>
            <input
              type="checkbox"
              id={`correct-${index}`}
              checked={answer.correct}
              onChange={(e) =>
                handleAnswerChange(index, "correct", e.target.checked)
              }
            />
          </div>
        </div>
      ))}

      <button className={styles.button} type="submit" disabled={loading}>
        {loading ? "Að bæta við..." : "Bæta við spurningu"}
      </button>
    </form>
  );
}
