import { ConflictError, UnauthorizedError } from "../errors/http_errors";
import { Item } from "../models/item";

export interface ItemInput {
  title: string;
  text?: string;
}

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    if (response.status === 401) {
      throw new UnauthorizedError(errorMessage);
    } else if (response.status === 409) {
      throw new ConflictError(errorMessage);
    } else {
      throw Error(
        "Request failed with status: " +
          response.status +
          "message:" +
          errorMessage
      );
    }
  }
}

export async function fetchItems(): Promise<Item[]> {
  const response = await fetchData("/api/vms", { method: "GET" });
  return response.json();
}
export async function updateItemToStop(item: Item) {
  await fetchData(`http://127.0.0.1:8000/api/vms/${item.name}/stop/`, {
    method: "POST",
  });
}
export async function updateItemToResume(item: Item) {
  await fetchData(`http://127.0.0.1:8000/api/vms/${item.name}/resume/`, {
    method: "POST",
  });
}
export async function deleteItem(item: Item) {
  await fetchData(`http://127.0.0.1:8000/api/vms/${item.name}/delete/`, {
    method: "POST",
  });
}
