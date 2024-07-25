// src/utils/userData.js
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { auth } from "../firebase"; // Assuming you have Firebase auth set up

const db = getFirestore();

export const storeUserCart = async (userCart) => {
  const userId = auth.currentUser.uid; // Get current user ID from auth
  const userRef = doc(db, "users", userId);
  try {
    await setDoc(userRef, { cart: userCart }, { merge: true });
    console.log("User cart stored successfully.");
  } catch (error) {
    console.error("Error storing user cart: ", error);
  }
};

export const storeUserOrder = async (userOrder) => {
  const userId = auth.currentUser.uid; // Get current user ID from auth
  const userRef = doc(db, "users", userId);
  try {
    await setDoc(userRef, { orders: userOrder }, { merge: true });
    console.log("User order stored successfully.");
  } catch (error) {
    console.error("Error storing user order: ", error);
  }
};
