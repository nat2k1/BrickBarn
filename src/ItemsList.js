// src/ItemsList.js
import React, { useEffect, useState } from "react";
import { db } from "./firebase"; // Import the db instance from firebase.js
import { collection, getDocs } from "firebase/firestore"; // Import Firestore functions

function ItemsList() {
  const [items, setItems] = useState([]); // State to hold items

  useEffect(() => {
    // Function to fetch items from Firestore
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "items"));
        setItems(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching items: ", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="ItemsList">
      <h1>Items</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ItemsList;
