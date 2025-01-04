export async function updateUser(data: {
  id: string;
  firstname: string;
  lastname: string;
  major: string;
  password: string;
  profile: File | null;
}): Promise<Response> {
  try {
    const formData = new FormData();
    formData.append("firstName", data.firstname);
    formData.append("lastName", data.lastname);
    formData.append("major", data.major);
    formData.append("password", data.password);
    if (data.profile) {
      formData.append("profile", data.profile);
    }

    const response = await fetch(
      `https://lomba-backend.vercel.app/profile/${data.id}`,
      {
        method: "PATCH",
        body: formData,
        credentials: "include", // Pastikan cookie dikirim
      }
    );
    return response;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error; // Lempar error ke pemanggil untuk ditangani
  }
}
