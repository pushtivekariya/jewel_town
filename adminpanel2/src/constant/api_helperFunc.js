import { APIRoutes } from "./api_url";

export function ApiHelperPost(url, data = {}) {
  const configOptions = {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  };
  return fetch(APIRoutes.APIHOSTNAME + url, configOptions)
    .then((res) => res.json())
    .then(
      (result) => {
        return result;
      },
      (error) => {
        error = error;
      }
    );
}

export function ApiHelperPostImage(url, data = {}) {
  const configOptions = {
    method: "POST",
    body: data,
    // headers: { "Content-Type": "application/json" },
  };
  return fetch(APIRoutes.APIHOSTNAME + url, configOptions)
    .then((res) => res.json())
    .then(
      (result) => {
        return result;
      },
      (error) => {
        error = error;
      }
    );
}

export function ApiHelperGet(url) {
  const configOptions = {
    method: "GET",
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  };

  return fetch(APIRoutes.APIHOSTNAME + url, configOptions)
    .then((res) => res.json())
    .then(
      (result) => {
        return result;
      },
      (error) => {
        error = error;
      }
    );
}
