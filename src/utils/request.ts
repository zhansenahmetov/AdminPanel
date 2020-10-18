import ky from "ky";

const localStorageKey = "__aloha_auth_token__";

const url = "http://78.140.223.104";
const token = window.localStorage.getItem(localStorageKey);

export const api = ky.create({
  prefixUrl: url,
  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set("token", `${token}`);
      },
    ],
  },
});

export function setToken(token) {
  window.localStorage.setItem(localStorageKey, token);
}

export function getToken() {
  return window.localStorage.getItem(localStorageKey);
}

export function removeToken() {
  window.localStorage.removeItem(localStorageKey);
}
