"use client";

import { PostCategory, UiState } from "@/types";
import { useEffect, useState } from "react";
import { QuestionsApi } from "@/api";
import { Category } from "@/types";
import styles from "./CategoryEdito.module.css";

export default function CategoryEditor() {
  const [uiState, setUiState] = useState<UiState>("initial");
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [postMessage, setPostMessage] = useState<string | null>(null);
  const [patchMessage, setPatchMessage] = useState<string | null>(null);
  const [deleteMessage, setDeleteMessage] = useState<string | null>(null);
  const [data, setData] = useState<PostCategory | null>(null);
  const [categoryPost, setCategoryPost] = useState<string>("");
  const [postState, setPostState] = useState<UiState>("initial");
  const [categoryPatch, setCategoryPatch] = useState<string>("");
  const [patchState, setPatchState] = useState<UiState>("initial");
  const [patchSlug, setPatchSlug] = useState<string>("");
  const [deleteSlug, setDeleteSlug] = useState<string>("");
  const [deleteState, setDeleteState] = useState<UiState>("initial");
  const [change, setChange] = useState<boolean>(false);

  useEffect(() => {
    async function fetchCategories() {
      setUiState("loading");
      const api = new QuestionsApi();
      const categoriesResponse = await api.getCategories();
      if (categoriesResponse) {
        setCategories(categoriesResponse);
        setUiState("data");
      } else {
        setUiState("error");
      }
    }
    fetchCategories();
  }, [change]);

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setPostState("loading");
    const body = { title: categoryPost };
    try {
      const api = new QuestionsApi();
      const result = await api.postCategory(body);
      if (await result[0]) {
        setPostMessage("category created!");
        setCategoryPost("");
        setChange((prev) => !prev);
      } else {
        setPostState("error");
        setPostMessage(JSON.stringify(await result[1]));
      }
    } catch {
      setPostState("error");
      setPostMessage("Failed to post category, please try again.");
    } finally {
      setPostState("initial");
    }
  };

  const handlePatch = async (e: React.FormEvent) => {
    e.preventDefault();
    setPatchState("loading");
    const body = { title: categoryPatch };
    try {
      const api = new QuestionsApi();
      const result = await api.patchCategory(body, patchSlug);
      if (await result[0]) {
        setPatchMessage("category patched!");
        setCategoryPatch("");
        setChange((prev) => !prev);
      } else {
        setPatchState("error");
        setPatchMessage(JSON.stringify(await result[1]));
      }
    } catch {
      setPatchState("error");
      setPatchMessage("Failed to patch category, please try again.");
    } finally {
      setPatchState("initial");
    }
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    setDeleteState("loading");
    try {
      const api = new QuestionsApi();
      const result = await api.deleteCategory(deleteSlug);
      if (await result[0]) {
        setDeleteMessage("category deleted!");
        setChange((prev) => !prev);
      } else {
        setDeleteState("error");
        setDeleteMessage(JSON.stringify(await result[1]));
      }
    } catch {
      setDeleteState("error");
      setDeleteMessage("Failed to delete category, please try again.");
    } finally {
      setDeleteState("initial");
    }
  };

  return (
    <div className={styles.page}>
      <h2>Lagfæra flokka</h2>
      {uiState === "error" && (
        <p>Nær ekki að sækja flokka, reynið aftur síðar.</p>
      )}
      {uiState === "loading" && <p>Sækir flokka...</p>}
      {uiState === "data" && (
        <div className={styles.forms}>
          <form className={styles.form} onSubmit={handlePost}>
            <h3>Búa til flokk</h3>
            {postState === "error" && (
              <p style={{ color: "red" }}>{postMessage}</p>
            )}
            {postState !== "error" && <p>{postMessage}</p>}
            <div>
              <label>Heiti flokks</label>
              <input
                type="text"
                id="postcategory"
                value={categoryPost}
                onChange={(e) => {
                  setCategoryPost(e.target.value), setPostMessage(null);
                }}
                required
              />
            </div>
            <button className={styles.button} type="submit">
              {postState === "loading" ? "Að bæta við..." : "Bæta við flokk"}
            </button>
          </form>

          <form className={styles.form} onSubmit={handlePatch}>
            <h3>Breyta flokk</h3>
            {patchState === "error" && (
              <p style={{ color: "red" }}>{patchMessage}</p>
            )}
            {patchState !== "error" && <p>{patchMessage}</p>}
            <div>
              <label>Flokkur til að breyta</label>
              <select
                id="category"
                value={patchSlug}
                onChange={(e) => {
                  setPatchSlug(e.target.value); // Set category to the selected slug
                  setPatchMessage(null);
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
            <div>
              <label>Nýtt heiti flokks</label>
              <input
                type="text"
                id="patchcategory"
                value={categoryPatch}
                onChange={(e) => {
                  setCategoryPatch(e.target.value), setPatchMessage(null);
                }}
                required
              />
            </div>
            <button className={styles.button} type="submit">
              {postState === "loading" ? "Að breyta..." : "Breyta flokk"}
            </button>
          </form>

          <form className={styles.form} onSubmit={handleDelete}>
            <h3>Eyða flokk</h3>
            {deleteState === "error" && (
              <p style={{ color: "red" }}>{deleteMessage}</p>
            )}
            {deleteState !== "error" && <p>{deleteMessage}</p>}
            <div>
              <label>Flokkur til að eyða</label>
              <select
                id="categorydelete"
                value={deleteSlug}
                onChange={(e) => {
                  setDeleteSlug(e.target.value);
                  setDeleteMessage(null);
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
            <button className={styles.button} type="submit">
              {deleteState === "loading" ? "Að eyða..." : "Eyða flokk"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
