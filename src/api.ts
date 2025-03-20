import { Category, Question, PostQuestion, PostCategory } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:8000";

export class QuestionsApi {
  async fetchFromApi<T>(url: string): Promise<T | null> {
    let response: Response | undefined;
    try {
      response = await fetch(url);
    } catch (e) {
      console.error("error fetching from api", url, e);
      return null;
    }

    if (!response.ok) {
      console.error("non 2xx status from API", url);
      return null;
    }

    let json: unknown;
    try {
      json = await response.json();
    } catch (e) {
      console.error("error parsing json", url, e);
      return null;
    }

    return json as T;
  }

  async getCategory(slug: string): Promise<Category | null> {
    const url = BASE_URL + `/categories/${slug}`;

    const response = await this.fetchFromApi<Category | null>(url);

    return response;
  }

  async getCategories(): Promise<Array<Category> | null> {
    const url = BASE_URL + "/categories";
    const response = await this.fetchFromApi<Array<Category> | null>(url);

    // TODO hér gæti ég staðfest gerð gagna

    return response;
  }

  async getQuestions(slug: string): Promise<Array<Question> | null> {
    const url = BASE_URL + `/questions/${slug}`;

    const response = await this.fetchFromApi<Array<Question> | null>(url);

    return response;
  }

  async postToApi<T>(url: string, body: T): Promise<Response | null> {
    let response: Response | undefined;
    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    } catch (e) {
      console.error("error fetching from api", url, e);
      return null;
    }

    return response;
  }

  async postQuestion(question: PostQuestion): Promise<[boolean, unknown]> {
    const url = BASE_URL + "/questions";
    const response: Response | null = await this.postToApi<PostQuestion>(
      url,
      question
    );

    if (!response) {
      return [
        false,
        JSON.parse('{"message": "error fetching from api, try again"}'),
      ];
    }

    if (response.ok) {
      return [true, JSON.parse('{"message": "question successfully posted"}')];
    }

    const message = response.json();
    return [false, message];
  }

  async postCategory(category: PostCategory) {
    const url = BASE_URL + "/categories";
    const response: Response | null = await this.postToApi<PostCategory>(
      url,
      category
    );

    if (!response) {
      return [
        false,
        JSON.parse('{"message": "error fetching from api, try again"}'),
      ];
    }

    if (response.ok) {
      return [true, JSON.parse('{"message": "category successfully posted"}')];
    }

    const message = response.json();
    return [false, message];
  }

  async patchCategory(category: PostCategory, slug: string) {
    const url = BASE_URL + `/categories/${slug}`;
    let response: Response | undefined;
    try {
      console.log(url);
      response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      });
    } catch (e) {
      console.error("error fetching from api", url, e);
      return [
        false,
        JSON.parse('{"message": "error fetching from api, try again"}'),
      ];
    }
    if (!response) {
      return [
        false,
        JSON.parse('{"message": "error fetching from api, try again"}'),
      ];
    }

    if (response.ok) {
      return [true, JSON.parse('{"message": "category successfully patched"}')];
    }

    const message = response.json();
    return [false, message];
  }

  async deleteCategory(slug: string) {
    const url = BASE_URL + `/categories/${slug}`;
    let response: Response | undefined;
    try {
      response = await fetch(url, {
        method: "DELETE",
      });
    } catch (e) {
      console.error("error fetching from api", url, e);
      return [
        false,
        JSON.parse('{"message": "error fetching from api, try again"}'),
      ];
    }
    if (!response) {
      return [
        false,
        JSON.parse('{"message": "error fetching from api, try again"}'),
      ];
    }

    if (response.ok) {
      return [true, JSON.parse('{"message": "category successfully deleted"}')];
    }

    const message = response.json();
    return [false, message];
  }
}
