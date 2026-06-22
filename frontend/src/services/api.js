const API_URL = "http://localhost:8080/api";

export async function getMasters() {
  const response =
    await fetch(
      `${API_URL}/masters`
    );

  return response.json();
}

export async function submitFeedback(data) {

  const response =
    await fetch(
      `${API_URL}/feedback`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json"
        },
        body: JSON.stringify(data)
      }
    );

  return response.text();
}

export async function getDashboard() {

  const response =
    await fetch(
      `${API_URL}/dashboard`
    );

  return response.json();
}

export async function getEntries() {

  const response =
    await fetch(
      `${API_URL}/admin/entries`
    );

  return response.json();
}

export async function getRatingStats() {

  const response =
    await fetch(
      `${API_URL}/admin/rating-stats`
    );

  return response.json();
}