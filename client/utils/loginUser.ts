export async function loginUser(data: { nim: string; password: string }) {
  try {
    const response = await fetch(
      "https://lomba-backend.vercel.app/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      }
    );

    if (!response.ok) throw new Error("Login failed");
    const userdata = await response.json();
    return {
      id: userdata.user.id || null,
      name: userdata.user.lastName || "Guest User",
      firstName: userdata.user.firstName || "User Firstname",
      lastName: userdata.user.lastName || "User Lastname",
      nim: userdata.user.student_id || "0000000000",
      major: userdata.user.major || "User Major",
      role: userdata.user.role || "USER",
      gender: userdata.user.gender || "Hide",
      imageUrl:
        userdata.user.profile || "/imgs/dashboard-imgs/Default-Profile-Img.svg",
      isLogin: true,
    };
  } catch (error) {
    console.log("Error fetching user:", error);
    return {
      name: "Guest User",
      firstName: "User Firstname",
      lastName: "User Lastname",
      imageUrl: "/imgs/dashboard-imgs/Default-Profile-Img.svg",
      major: "User Major",
      nim: "0000000000",
      role: "USER",
      gender: "Hide",
      isLogin: false,
    };
  }
}
