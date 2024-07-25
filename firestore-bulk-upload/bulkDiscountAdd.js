const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const admin = require('firebase-admin');
const serviceAccount = require('./config/vxh110-brickbarn-firebase-adminsdk-7dgxc-518dc96cfe.json'); // Ensure the path is correct

initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = getFirestore();

// Discount codes to be added
const discountCodes = [
  { code: "SAVE10", amount: 10, type: "percentage" },
  { code: "SAVE20", amount: 20, type: "percentage" },
  { code: "SAVE30", amount: 30, type: "percentage" },
  { code: "SAVE40", amount: 40, type: "percentage" },
  { code: "SAVE50", amount: 50, type: "percentage" },
];

// Function to add discount codes to Firestore
async function addDiscountCodes() {
  try {
    for (const discount of discountCodes) {
      const discountRef = db.collection("discountCodes").doc(discount.code);
      await discountRef.set(discount);
      console.log(`Added discount code: ${discount.code}`);
    }
    console.log("All discount codes added successfully.");
  } catch (error) {
    console.error("Error adding discount codes: ", error);
  }
}

addDiscountCodes();
