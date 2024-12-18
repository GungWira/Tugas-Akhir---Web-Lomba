"use client"; 

import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchUser } from "@/utils/fetchUser";
import { loginUser } from "@/utils/loginUser"

type User = {
  name: string;
  imageUrl: string;
};

interface UserContextType {
  user: User | null;
  loading: boolean;
  isLogin : boolean;
  login : (credentials : {nim : string; password : string}) => Promise<void>
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await fetchUser();
      setUser(userData);
      setIsLogin(userData.isLogin)
      setLoading(false);
    };
    fetchData();
  }, []);

  const login = async (credentials : {nim : string, password : string}) => {
    const userData = await loginUser(credentials)
    setUser(userData)
    setIsLogin(userData.isLogin)
    setLoading(false)
  }

  return (
    <UserContext.Provider value={{ user, loading, isLogin, login }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
