export async function fetchUser() {
    try {
      const response = await fetch("https://lomba-backend.vercel.app/auth/verify", {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (!response.ok) throw new Error("Failed to fetch user");
      const data = await response.json();
      return {
        id : data.user.user.id || null,
        name: data.user.user.lastName || "Guest User",
        nim : data.user.user.student_id || null,
        imageUrl: data.user.user.profile || "/imgs/dashboard-imgs/Default-Profile-Img.svg",
        isLogin : data.loggedIn,
      };
    } catch (error) {
      console.log("Error fetching user:", error);
      return { 
        name: "Guest User", 
        imageUrl: "/imgs/dashboard-imgs/Default-Profile-Img.svg" ,
        isLogin : false,
        };
    }
  };


  
  