const BASE_URL = "http://localhost:5000/api";

export const request = async (path, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${path}`, options);
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}