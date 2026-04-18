import fetchReq from "./FetchReq";

export async function authenticateUsers(parentUrl, url, data) {
  let response = await fetchReq(parentUrl, url, data);
  return response;
}
