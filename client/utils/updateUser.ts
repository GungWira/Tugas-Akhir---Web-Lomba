export async function updateUser(data: {
  firstname: string;
  lastname: string;
  major: string;
  profileImage: string;
  password: string;
}): Promise<Response> {
  try {
    const response = await fetch(
      "https://lomba-backend.vercel.app/auth/update",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include", // Pastikan cookie dikirim
      }
    );

    // Jika response gagal, lempar error
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Update failed");
    }

    // Response berhasil
    return response;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error; // Lempar error ke pemanggil untuk ditangani
  }
}
