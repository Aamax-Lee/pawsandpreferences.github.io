const API_KEY = "";
const BASE_URL = "https://cataas.com";

export const getCatsId = async () => {
  const response = await fetch(`${BASE_URL}/api/cats?limit=20&skip=0`);
  if (!response.ok) {
    throw new Error("Failed to fetch cats");
  }
  const data = await response.json();
  console.log("Fetched cats:", data);
  return data;
};

export const getCatsImage = async (id) => {
  const response = await fetch(`${BASE_URL}/cat/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch cat");
  }
  const data = await response.json();
  //   console.log("Fetched cats:", data);
  return data;
};

export const getRandomCats = async (count = 20) => {
  const requests = Array.from({ length: count }, () =>
    fetch(`${BASE_URL}/cat?position=center&html=false&json=true`).then(
      (res) => {
        if (!res.ok) throw new Error("Failed to fetch cat");
        return res.json();
      }
    )
  );

  return Promise.all(requests);
};
