import { ConflictError, UnauthorizedError } from "../errors/http_errors";
import { Item } from "../models/item";

export interface ItemInput {
  name: string;
  ram: number;
  cpu: number;
  storage: number;
  iso_path: string;
}

async function fetchData(input: RequestInfo, init?: RequestInit) {
  try {
    const response = await fetch(input, init);
    if (response.ok) {
      return response;
    }
  } catch (error) {
    throw error;
  }
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = Object.values(errorBody).join(
      Object.keys(errorBody).length > 1 ? ", " : " "
    );
    if (response.status === 401) {
      throw new UnauthorizedError(errorMessage);
    } else if (response.status === 409) {
      throw new ConflictError(errorMessage);
    } else {
      throw Error(errorMessage);
    }
  }
}

export async function fetchItems(): Promise<Item[]> {
  const response = await fetchData("/api/vms", { method: "GET" });
  return response.json();
}
export async function updateItemToStop(item: Item): Promise<Item> {
  const response = await fetchData(
    `http://127.0.0.1:8000/api/vms/${item.name}/stop/`,
    {
      method: "POST",
    }
  );

  return response.json();
}
export async function updateItemToStart(item: Item) {
  const response = await fetchData(
    `http://127.0.0.1:8000/api/vms/${item.name}/start/`,
    {
      method: "POST",
    }
  );

  return response.json();
}

export async function updateItemToShutdown(item: Item) {
  const response = await fetchData(
    `http://127.0.0.1:8000/api/vms/${item.name}/shutdown/`,
    {
      method: "POST",
    }
  );

  return response.json();
}
export async function updateItemToResume(item: Item) {
  const response = await fetchData(
    `http://127.0.0.1:8000/api/vms/${item.name}/resume/`,
    {
      method: "POST",
    }
  );

  return response.json();
}
export async function deleteItem(item: Item) {
  await fetchData(`http://127.0.0.1:8000/api/vms/${item.name}/delete/`, {
    method: "POST",
  });
}
export async function createVm(item: ItemInput): Promise<Item> {
  const response = await fetchData("http://127.0.0.1:8000/api/vms/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  return response.json();
}
