const baseUrl = "http://localhost:8080";
const getRequest = async (url) => {
  return fetch(`${baseUrl}/${url}`)
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return { success: false, message: "Something Went Wrong" };
    });
};

const updateRequest = (url, data) => {
  return fetch(`${baseUrl}/${url}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return { success: false, message: "Something Went Wrong" };
    });
};

module.exports = { getRequest, updateRequest };
