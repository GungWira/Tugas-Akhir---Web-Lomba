export async function loginUser(data : {nim : string, password : string}){
    try {
      const response = await fetch("https://lomba-backend.vercel.app/auth/login", {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(data),
        credentials: 'include',
      })
  
      if(!response.ok) throw new Error("Login failed")
      const userdata = await response.json()
      return{
        id : userdata.user.id || null,
        name: userdata.user.lastName || "Guest User",
        nim : userdata.user.student_id || null,
        imageUrl: userdata.user.profile || "/imgs/dashboard-imgs/Default-Profile-Img.svg",
        isLogin : true,
      }
    } catch (error) {
      console.log("Error fetching user:", error);
      return { 
        name: "Guest User", 
        imageUrl: "/imgs/dashboard-imgs/Default-Profile-Img.svg" ,
        isLogin : false,
        };
    }
  }