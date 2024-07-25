// Import necessary Firebase modules
const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const admin = require('firebase-admin');
const serviceAccount = require('./config/vxh110-brickbarn-firebase-adminsdk-7dgxc-518dc96cfe.json'); // Path to service JSON

// Initialize Firebase app
initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Initialize Firestore
const db = getFirestore();

// Colors with up to 4 variants each
const colors = [
  // Grays
  { name: "Light Gray", hex: "#D3D3D3", imageURL: "https://cdn.rebrickable.com/media/thumbs/parts/ldraw/1015/3003.png/85x85p.png?1658325895.4278088" },
  { name: "Dark Gray", hex: "#A9A9A9", imageURL: "https://cdn.rebrickable.com/media/thumbs/parts/ldraw/148/3003.png/85x85p.png?1658325897.6638088" },
  { name: "Pearl Light Gray", hex: "#B0B0B0", imageURL: "https://cdn.rebrickable.com/media/thumbs/parts/ldraw/135/3003.png/85x85p.png?1658325897.711809" },
  { name: "Dark Bluish Gray", hex: "#696969", imageURL: "https://cdn.rebrickable.com/media/thumbs/parts/ldraw/72/3003.png/85x85p.png?1658325897.6598089" },

  // Whites and Blacks
  { name: "White", hex: "#FFFFFF", imageURL: "https://cdn.rebrickable.com/media/thumbs/parts/ldraw/15/3003.png/85x85p.png?1658325897.619809" },
  { name: "Black", hex: "#000000", imageURL: "https://cdn.rebrickable.com/media/thumbs/parts/ldraw/0/3003.png/85x85p.png?1658325897.639809" },
  { name: "Pearl Black", hex: "#2B2B2B", imageURL: "https://cdn.rebrickable.com/media/thumbs/parts/ldraw/1018/3003.png/85x85p.png?1658325927.7318106" },
  { name: "Chrome Black", hex: "#1C1C1C", imageURL: "https://cdn.rebrickable.com/media/thumbs/parts/ldraw/64/3003.png/85x85p.png?1658325897.6838088" },

  // Reds
  { name: "Red", hex: "#FF0000", imageURL: "https://cdn.rebrickable.com/media/thumbs/parts/ldraw/4/3003.png/85x85p.png?1658325926.2678106" },
  { name: "Dark Red", hex: "#8B0000", imageURL: "https://cdn.rebrickable.com/media/thumbs/parts/ldraw/320/3003.png/85x85p.png?1658326016.147817" },
  { name: "Vintage Red", hex: "#B22222", imageURL: "https://cdn.rebrickable.com/media/thumbs/parts/ldraw/1010/3003.png/85x85p.png?1658326006.7198162" },
  { name: "Trans-Red", hex: "#D70040", imageURL: "https://cdn.rebrickable.com/media/thumbs/parts/ldraw/36/3003.png/85x85p.png?1658325926.2598107" },

  // Blues
  { name: "Blue", hex: "#0000FF", imageURL: "https://cdn.rebrickable.com/media/thumbs/parts/ldraw/1/3003.png/85x85p.png?1658326015.259817" },
  { name: "Dark Blue", hex: "#00008B", imageURL: "https://cdn.rebrickable.com/media/thumbs/parts/ldraw/272/3003.png/85x85p.png?1658326015.251817" },
  { name: "Light Blue", hex: "#ADD8E6", imageURL: "https://cdn.rebrickable.com/media/thumbs/parts/ldraw/9/3003.png/85x85p.png?1658325930.519811" },
  { name: "Bright Light Blue", hex: "#1E90FF", imageURL: "https://cdn.rebrickable.com/media/thumbs/parts/ldraw/212/3003.png/85x85p.png?1658325930.0878108" },

  // Greens
  { name: "Green", hex: "#008000", imageURL: "https://cdn.rebrickable.com/media/thumbs/parts/ldraw/2/3003.png/85x85p.png?1658326012.4318166" },
  { name: "Dark Green", hex: "#006400", imageURL: "https://cdn.rebrickable.com/media/thumbs/parts/ldraw/288/3003.png/85x85p.png?1658326012.4558167" },
  { name: "Bright Green", hex: "#32CD32", imageURL: "https://cdn.rebrickable.com/media/thumbs/parts/ldraw/10/3003.png/85x85p.png?1658326012.4358168" },
  { name: "Vintage Green", hex: "#3CB371", imageURL: "https://cdn.rebrickable.com/media/thumbs/parts/ldraw/1009/3003.png/85x85p.png?1658325932.3558109" },

  // Yellows
  { name: "Yellow", hex: "#FFFF00", imageURL: "https://cdn.rebrickable.com/media/thumbs/parts/ldraw/14/3003.png/85x85p.png?1658326008.0758164" },
  { name: "Bright Light Yellow", hex: "#FFEA00", imageURL: "https://cdn.rebrickable.com/media/thumbs/parts/ldraw/226/3003.png/85x85p.png?1658326008.0878162" },
  { name: "Pearl Gold", hex: "#D4AF37", imageURL: "https://cdn.rebrickable.com/media/thumbs/parts/ldraw/297/3003.png/85x85p.png?1658326007.8198164" },
  { name: "Chrome Gold", hex: "#FFD700", imageURL: "https://cdn.rebrickable.com/media/thumbs/parts/ldraw/334/3003.png/85x85p.png?1658325939.5398114" },

  // Browns
  { name: "Brown", hex: "#A52A2A", imageURL: "https://cdn.rebrickable.com/media/thumbs/parts/ldraw/6/3003.png/85x85p.png?1658326007.2598164" },
  { name: "Reddish Brown", hex: "#8B4513", imageURL: "https://cdn.rebrickable.com/media/thumbs/parts/ldraw/70/3003.png/85x85p.png?1658326006.7238162" },
  { name: "Dark Brown", hex: "#5C4033", imageURL: "https://cdn.rebrickable.com/media/thumbs/parts/ldraw/308/3003.png/85x85p.png?1658326007.8998163" },
  { name: "Light Brown", hex: "#A0522D", imageURL: "https://cdn.rebrickable.com/media/thumbs/parts/ldraw/86/3003.png/85x85p.png?1658326006.8078163" },

  // Oranges
  { name: "Orange", hex: "#FFA500", imageURL: "https://cdn.rebrickable.com/media/thumbs/parts/ldraw/25/3003.png/85x85p.png?1658326007.1838162" },
  { name: "Bright Light Orange", hex: "#FFB84D", imageURL: "https://cdn.rebrickable.com/media/thumbs/parts/ldraw/191/3003.png/85x85p.png?1658326007.9278164" },
  { name: "Dark Orange", hex: "#FF8C00", imageURL: "https://cdn.rebrickable.com/media/thumbs/parts/ldraw/484/3003.png/85x85p.png?1658326007.1998162" },
  { name: "Trans-Orange", hex: "#FF4500", imageURL: "https://cdn.rebrickable.com/media/thumbs/parts/ldraw/182/3003.png/85x85p.png?1658326007.2038162" },

  // Purples
  { name: "Purple", hex: "#800080", imageURL: "https://cdn.rebrickable.com/media/thumbs/parts/ldraw/22/3003.png/85x85p.png?1658326015.655817" },
  { name: "Dark Purple", hex: "#4B0082", imageURL: "https://cdn.rebrickable.com/media/thumbs/parts/ldraw/85/3003.png/85x85p.png?1658326015.359817" },
  { name: "Lavender", hex: "#E6E6FA", imageURL: "https://cdn.rebrickable.com/media/thumbs/parts/ldraw/31/3003.png/85x85p.png?1658326015.287817" },
  { name: "Bright Pink", hex: "#FF69B4", imageURL: "https://cdn.rebrickable.com/media/thumbs/parts/ldraw/29/3003.png/85x85p.png?1658326015.755817" }
];

// List of dimensions with details
const dimensions = [
  { size: "1x1", price: 0.10, description: "Single stud brick, often used for small details or as filler pieces." },
  { size: "1x2", price: 0.15, description: "Two studs in a row, versatile and commonly used in various builds." },
  { size: "1x3", price: 0.20, description: "Three studs in a row, useful for creating varied lengths in structures." },
  { size: "1x4", price: 0.25, description: "Four studs in a row, frequently used in walls and long structures." },
  { size: "1x6", price: 0.30, description: "Six studs in a row, ideal for longer spans in building designs." },
  { size: "1x8", price: 0.40, description: "Eight studs in a row, provides stability in longer sections of a build." },
  { size: "2x2", price: 0.25, description: "Two studs by two studs, square base, common and versatile." },
  { size: "2x3", price: 0.30, description: "Two studs by three studs, slightly longer, useful in various constructions." },
  { size: "2x4", price: 0.35, description: "Two studs by four studs, classic LEGO brick size, very common and versatile." },
  { size: "2x6", price: 0.45, description: "Two studs by six studs, good for larger, stable builds." },
  { size: "2x8", price: 0.60, description: "Two studs by eight studs, provides strong support in structures." },
  { size: "2x10", price: 0.75, description: "Two studs by ten studs, often used for base structures and longer spans." },
  { size: "2x12", price: 0.90, description: "Two studs by twelve studs, large size for extensive builds, good for base layers." },
  { size: "2x16", price: 1.20, description: "Two studs by sixteen studs, very large, used in big projects for support and stability." },
  { size: "3x3", price: 0.35, description: "Three studs by three studs, uncommon size, used for specific builds." },
  { size: "4x4", price: 0.50, description: "Four studs by four studs, square base, common in bases and larger structures." },
  { size: "4x6", price: 0.75, description: "Four studs by six studs, used for larger surface areas in builds." },
  { size: "4x8", price: 1.00, description: "Four studs by eight studs, versatile size for stable structures." },
  { size: "4x10", price: 1.25, description: "Four studs by ten studs, provides a large, stable base or top layer." },
  { size: "6x6", price: 1.00, description: "Six studs by six studs, square base, useful for building platforms or bases." },
  { size: "6x8", price: 1.25, description: "Six studs by eight studs, larger surface area for stable builds." },
  { size: "6x10", price: 1.50, description: "Six studs by ten studs, provides extensive surface coverage in structures." },
  { size: "6x12", price: 1.80, description: "Six studs by twelve studs, large size for robust structures." },
  { size: "6x14", price: 2.10, description: "Six studs by fourteen studs, very large, used in big, stable builds." },
  { size: "6x16", price: 2.40, description: "Six studs by sixteen studs, substantial size for extensive constructions." },
  { size: "8x8", price: 1.50, description: "Eight studs by eight studs, square base, great for building large bases." },
  { size: "8x10", price: 1.75, description: "Eight studs by ten studs, large size, used in substantial building projects." },
  { size: "8x16", price: 2.50, description: "Eight studs by sixteen studs, ideal for very large base layers or walls." },
  { size: "10x10", price: 2.00, description: "Ten studs by ten studs, square base, used in extensive, stable builds." },
  { size: "12x12", price: 2.50, description: "Twelve studs by twelve studs, large square base, excellent for substantial base structures." }
];

// Mark 10 random products as out of stock
const markOutOfStock = (products) => {
  let count = 0;
  while (count < 10) {
    const index = Math.floor(Math.random() * products.length);
    if (products[index].availability) {
      products[index].availability = false;
      count++;
    }
  }
  return products;
};

// Add colors and dimensions to Firestore
async function addData() {
  for (const color of colors) {
    const colorRef = db.collection("colors").doc(color.name);
    await colorRef.set({ name: color.name, hex: color.hex, availableDimensions: dimensions.filter(dim => dim.available).map(dim => dim.size) });
    console.log(`Added color: ${color.name}`);

    // Add corresponding products
    let products = [];
    for (const dimension of dimensions) {
      products.push({
        color: color.name,
        colorCategory: "Colors", // Update based on your categorization
        dimension: dimension.size,
        price: dimension.price,
        description: dimension.description,
        availability: true, // Default to available
        imageURL: color.imageURL,
      });
    }

    // Mark some products as out of stock
    products = markOutOfStock(products);

    for (const product of products) {
      const productRef = db.collection("products").doc(`${product.color}_${product.dimension}`);
      await productRef.set(product);
      console.log(`Added product: ${product.color} ${product.dimension}`);
    }
  }
}

addData().catch(console.error);
