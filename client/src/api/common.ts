import { API_URL } from './const';

type Body = Record<string | number, unknown>;

export async function post(path: string, body?: Body) {
  return fetch(API_URL + path, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify(body ?? {}),
  });
}

export async function get(path: string, query?: Record<string, string>) {
  return fetch(`${API_URL}${path}${query ? '?' + new URLSearchParams(query) : ''}`, {
    method: 'GET',
    credentials: 'include',
  });
}

export async function del(path: string, body?: Body) {
  return fetch(API_URL + path, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify(body ?? {}),
  });
}

export async function patch(path: string, body?: Body) {
  return await fetch(API_URL + path, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify(body ?? {}),
  });
}
