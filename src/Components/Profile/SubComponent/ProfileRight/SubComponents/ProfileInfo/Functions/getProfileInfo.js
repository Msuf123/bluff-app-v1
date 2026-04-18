import fetchWithToken from "../../../../../../../Functions/fetchWithToken";

export default async function getProfileInfo(url) {
  try {
    let response = await fetchWithToken(url, {}, { credentials: "include" });
    const jsonValue = await response.json();
    return jsonValue;
  } catch (e) {
    console.log(e);
    return null;
  }
}
