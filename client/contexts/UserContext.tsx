"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchUser } from "@/utils/fetchUser";
import { loginUser } from "@/utils/loginUser";
import { updateUser } from "@/utils/updateUser";

// Tipe User
type User = {
  id?: string | undefined;
  name: string;
  firstName: string;
  lastName: string;
  major: string;
  role: string;
  imageUrl: string;
  nim: string;
  gender: string;
  isLogin: boolean;
};

// Tipe Context
interface UserContextType {
  user: User | null; // Data user saat ini
  loading: boolean; // Indikator proses
  isLogin: boolean; // Status login
  login: (credentials: { nim: string; password: string }) => Promise<void>; // Fungsi login
  logout: () => Promise<void>; // Fungsi logout
  update: (credentials: {
    id: string;
    firstname: string;
    lastname: string;
    major: string;
    password: string;
    profile: File | null;
  }) => Promise<Response>; // Fungsi update user
}

// Membuat Context
const UserContext = createContext<UserContextType | null>(null);

// Provider untuk UserContext
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch data user saat pertama kali di-load
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userData = await fetchUser();
        if (userData.isLogin) {
          setIsLogin(true);
        } else {
          setIsLogin(false);
        }
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser(null);
        setIsLogin(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Fungsi untuk login
  const login = async (credentials: { nim: string; password: string }) => {
    setLoading(true); // Set loading true sebelum proses dimulai
    try {
      const userData = await loginUser(credentials);
      setUser(userData);
      setIsLogin(true);
    } catch (error) {
      console.error("Login failed:", error);
      setUser(null);
      setIsLogin(false);
    } finally {
      setLoading(false); // Proses selesai
    }
  };

  // Fungsi untuk mengupdate data user
  const update = async (credentials: {
    id: string;
    firstname: string;
    lastname: string;
    major: string;
    password: string;
    profile: File | null;
  }): Promise<Response> => {
    setLoading(true); // Set loading true sebelum proses dimulai
    try {
      const response = await updateUser(credentials);
      if (response.ok) {
        const updatedUser = await response.json(); // Asumsikan server mengembalikan data user yang telah diperbarui
        setUser(updatedUser);
      }
      return response; // Mengembalikan response untuk dicek di tempat lain
    } catch (error) {
      console.error("Update failed:", error);
      throw error; // Lempar error agar dapat ditangkap di sisi pemanggil
    } finally {
      setLoading(false); // Proses selesai
    }
  };

  // Fungsi untuk logout
  const logout = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://lomba-backend.vercel.app/auth/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Logout gagal");
      }

      // Hapus state user dan status login
      setUser(null);
      setIsLogin(false);

      // Redirect ke halaman login jika diperlukan
      window.location.href = "/"; // Opsional, sesuaikan dengan kebutuhan
    } catch (error) {
      console.error("Logout gagal:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, loading, isLogin, login, update, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Hook untuk menggunakan UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
