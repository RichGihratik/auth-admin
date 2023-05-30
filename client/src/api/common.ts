import { API_URL } from './const';

type Body = Record<string | number, unknown>;

export async function post(path: string, body?: Body) {
  return fetch(API_URL + path, {
    method: 'POST',
    body: JSON.stringify(body ?? {}),
  });
}

export async function get(path: string, query?: Record<string, string>) {
  return fetch(`${API_URL}${path}${query ? '?' + new URLSearchParams(query) : ''}`, {
    method: 'GET',
  });
}

export async function del(path: string, body?: Body) {
  return fetch(API_URL + path, {
    method: 'DELETE',
    body: JSON.stringify(body ?? {}),
  });
}

export async function patch(path: string, body?: Body) {
  return await fetch(API_URL + path, {
    method: 'PATCH',
    body: JSON.stringify(body ?? {}),
  });
}
