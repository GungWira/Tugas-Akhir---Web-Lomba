export async function fetchUser() {
  try {
    const response = await fetch(
      "https://lomba-backend.vercel.app/auth/verify",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    if (!response.ok) {
      return {
        id: null,
        name: "Guest User",
        firstName: "User Firstname",
        lastName: "User Lastname",
        nim: "0000000000",
        major: "User Major",
        role: "UNROLE",
        imageUrl: "/imgs/dashboard-imgs/Default-Profile-Img.svg",
        isLogin: false,
      };
    }
    const data = await response.json();
    return {
      id: data.user.User.id || null,
      name: data.user.User.name || "Guest User",
      firstName: data.user.User.firstName || "User Firstname",
      lastName: data.user.User.lastName || "User Lastname",
      nim: data.user.User.student_id || "0000000000",
      major: data.user.User.major || "User Major",
      role: data.user.User.role || "USER",
      imageUrl:
        data.user.User.profile ||
        "/imgs/dashboard-imgs/Default-Profile-Img.svg",
      isLogin: data.loggedIn,
    };
  } catch (error) {
    console.log("Error fetching user:", error);
    return {
      name: "Guest User",
      firstName: "User Firstname",
      lastName: "User Lastname",
      major: "User Major",
      imageUrl: "/imgs/dashboard-imgs/Default-Profile-Img.svg",
      nim: "0000000000",
      role: "USER",
      isLogin: false,
    };
  }
}
