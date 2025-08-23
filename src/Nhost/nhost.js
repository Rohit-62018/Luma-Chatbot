import { toast } from "react-toastify";
import nhost from './nhostClient';

const signup = async (name, email, password) => {
  try {
    const { error } = await nhost.auth.signUp({
      email,
      password,
      options: {
        displayName: name 
      }
    });

    if (error) throw error;
    toast.success("Signup successful! Please verify your email.");
  } catch (err) {
    toast.error(err.message);
  }
};

// Login function
const login = async (email, password) => {
  try {
    const { error } = await nhost.auth.signIn({
      email,
      password
    });
    if (error) throw error;
    toast.success("Login successful!");
  } catch (err) {
    toast.error(err.message);
  }
};

// Logout function
const logout = async () => {
  await nhost.auth.signOut();
};

export {signup, login, logout };