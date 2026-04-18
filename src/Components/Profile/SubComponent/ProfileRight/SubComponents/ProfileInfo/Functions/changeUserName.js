import fetchWithToken from "../../../../../../../Functions/fetchWithToken";

export default async function changeUserName(backendUrl, userName) {
  let result;
  try {
    const respose = await fetchWithToken(
      backendUrl + "/profile/userName",
      {},
      {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ userName }),
      }
    );

    if (!respose.ok) {
      throw new Error("repsoe fialed");
    }
    result = await respose.json();

    if (result.hasOwnProperty("success")) {
      return { success: result["success"] };
    } else {
      throw new Error("backend is returning respose in another schema");
    }
  } catch (e) {
    return { success: false };
  }
}
