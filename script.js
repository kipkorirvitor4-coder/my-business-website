
const products = [
  {
    id: 1,
    name: "Modern Living Room Sofa",
    category: "Living Room",
    price: 45000,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=700",
    description: "A comfortable sofa for your living room."
  },
  {
    id: 2,
    name: "Luxury Bedroom Bed",
    category: "Bedroom",
    price: 35000,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=700",
    description: "A stylish bed for a relaxing bedroom."
  },
  {
    id: 3,
    name: "Modern Dining Table",
    category: "Dining",
    price: 28000,
    image: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=700",
    description: "A beautiful dining table for your home."
  },
  {
    id: 4,
    name: "Elegant Living Room Chair",
    category: "Living Room",
    price: 15000,
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=700",
    description: "A stylish chair for everyday comfort."
  },
  {
    id: 5,
    name: "Modern Bedroom Interior",
    category: "Bedroom",
    price: 55000,
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=700",
    description: "Give your bedroom a fresh new look."
  },
  {
    id: 6,
    name: "Dining Room Chair Set",
    category: "Dining",
    price: 18000,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=700",
    description: "Comfortable seating for your dining area."
  }
];

let cart = [];
let currentCategory = "All";

function displayProducts(items) {
  const grid = document.getElementById("product-grid");

  grid.innerHTML = "";

  if (items.length === 0) {
    grid.innerHTML = "<p>No furniture found.</p>";
    return;
  }

  items.forEach(product => {
    grid.innerHTML += `
      <article class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <div class="product-info">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="product-price">
            KES ${product.price.toLocaleString("en-KE")}
          </div>
          <button onclick="addToCart(${product.id})">
            Add to Cart
          </button>
        </div>
      </article>
    `;
  });
}

function filterProducts(category) {
  currentCategory = category;
  searchProducts();
}

function searchProducts() {
  const search = document
    .getElementById("search")
    .value.toLowerCase();

  const filtered = products.filter(product => {
    const matchesCategory =
      currentCategory === "All" ||
      product.category === currentCategory;

    const matchesSearch =
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search);

    return matchesCategory && matchesSearch;
  });

  displayProducts(filtered);
}

function addToCart(id) {
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ id, quantity: 1 });
  }

  updateCart();
}

function updateCart() {
  const count = cart.reduce(
    (total, item) => total + item.quantity, 0
  );

  document.getElementById("cart-count").textContent = count;

  const cartItems = document.getElementById("cart-items");
  const totalElement = document.getElementById("cart-total");

  let total = 0;
  cartItems.innerHTML = "";

  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);
    const subtotal = product.price * item.quantity;
    total += subtotal;

    cartItems.innerHTML += `
      <p>
        <strong>${product.name}</strong><br>
        KES ${subtotal.toLocaleString("en-KE")}<br>
        Quantity: ${item.quantity}
        <button onclick="changeQuantity(${item.id}, -1)">−</button>
        <button onclick="changeQuantity(${item.id}, 1)">+</button>
      </p>
    `;
  });

  totalElement.textContent = total.toLocaleString("en-KE");
}

function changeQuantity(id, amount) {
  const item = cart.find(item => item.id === id);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(item => item.id !== id);
  }

  updateCart();
}

function showCart() {
  document.getElementById("cart-modal").hidden = false;
}

function closeCart() {
  document.getElementById("cart-modal").hidden = true;
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  alert("Your shopping cart is working! WhatsApp ordering will be connected in the next step.");
}

displayProducts(products);
updateCart();
