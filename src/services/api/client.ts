const API_URL = import.meta.env.VITE_SB_API_URL;
console.log("here is the url",API_URL);
async function apiClient<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);

    throw new Error(error?.message || "Something went wrong");
  }

  return response.json();
}

export default apiClient;
