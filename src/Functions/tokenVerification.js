export default async function tokenVerification(url, os, token) {
  let obj = { headers: { Platform: os } };
  if (os !== "web") {
    obj.headers = { ...obj.headers, Token: token };
  }
  if (os == "web") {
    obj.credentials = "include";
  }
  let result = await fetch(url, obj)
    .then((res) => {
      return res.text();
    })
    .then((res) => {
      if (res == "okay") {
        return true;
      } else {
        return false;
      }
    })
    .catch((a) => {
      return false;
    });
  return result;
}
