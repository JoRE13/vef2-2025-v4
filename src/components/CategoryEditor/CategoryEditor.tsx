"use client";

import { UiState } from "@/types";
import { useEffect, useState } from "react";
import { QuestionsApi } from "@/api";
import { Category } from "@/types";

export default function CategoryEditor() {
  const [uiState, setUiState] = useState<UiState>("initial");
  const [categories, setCategories] = useState<Category[] | null>(null);

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
  }, []);

  return null;
}
