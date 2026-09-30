const products = [
  {
    id: 1,
    name: "Aurelia Wireless Headphones",
    category: "Electronics",
    price: 149.99,
    rating: 4.8,
    stock: 18,
    featured: true,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 2,
    name: "Noir Leather Tote",
    category: "Accessories",
    price: 119,
    rating: 4.7,
    stock: 12,
    featured: false,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 3,
    name: "Obsidian Smart Watch",
    category: "Electronics",
    price: 229,
    rating: 4.6,
    stock: 9,
    featured: true,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 4,
    name: "Midnight Oversized Tee",
    category: "Apparel",
    price: 49,
    rating: 4.5,
    stock: 30,
    featured: false,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 5,
    name: "Luxe Gold Sneakers",
    category: "Apparel",
    price: 139,
    rating: 4.9,
    stock: 7,
    featured: true,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 6,
    name: "Minimal Desk Lamp",
    category: "Home",
    price: 79,
    rating: 4.4,
    stock: 21,
    featured: false,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 7,
    name: "Onyx Mechanical Keyboard",
    category: "Electronics",
    price: 129,
    rating: 4.8,
    stock: 14,
    featured: false,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 8,
    name: "Gold Frame Sunglasses",
    category: "Accessories",
    price: 89,
    rating: 4.6,
    stock: 16,
    featured: true,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 9,
    name: "Velvet Accent Chair",
    category: "Home",
    price: 319,
    rating: 4.7,
    stock: 4,
    featured: false,
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 10,
    name: "Signature Fragrance No. 7",
    category: "Beauty",
    price: 99,
    rating: 4.9,
    stock: 25,
    featured: true,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 11,
    name: "Premium Travel Backpack",
    category: "Accessories",
    price: 109,
    rating: 4.5,
    stock: 11,
    featured: false,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 12,
    name: "Ceramic Coffee Set",
    category: "Home",
    price: 64,
    rating: 4.3,
    stock: 20,
    featured: false,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=85"
  }
];

let cart = JSON.parse(localStorage.getItem("shopzone-cart") || "[]");
let wishlist = JSON.parse(localStorage.getItem("shopzone-wishlist") || "[]");

const $ = (s) => document.querySelector(s); const $$ = (s) => [...document.querySelectorAll(s)];


function renderProducts() {
  const term = $("#search").value.toLowerCase().trim();   const categories = $$(".category:checked").map((x) => x.value);
  const maxPrice = Number($("#price").value);
  const ratingValue = Number($('input[name="rating"]:checked').value);
  const stockOnly = $("#stockFilter").checked;
  const featuredOnly = $("#featuredFilter").checked;

  let list = products.filter((p) => {
    const matchesTerm = !term || `${p.name} ${p.category}`.toLowerCase().includes(term);
    const matchesCategory = !categories.length || categories.includes(p.category);
    const matchesPrice = p.price <= maxPrice;

    // Rating matching logic
    let matchesRating = true;
    if (ratingValue === 5) {
      matchesRating = p.rating >= 4.8;
    } else if (ratingValue === 4) {
      matchesRating = p.rating >= 4.0 && p.rating < 4.8;
    }

    // Availability toggle filters
    const matchesStock = !stockOnly || p.stock > 0;
    const matchesFeatured = !featuredOnly || p.featured;

    return matchesTerm && matchesCategory && matchesPrice && matchesRating && matchesStock && matchesFeatured;
  });

  const sort = $("#sort").value;
  if (sort === "low") list.sort((a, b) => a.price - b.price);
  if (sort === "high") list.sort((a, b) => b.price - a.price);
  if (sort === "rating") list.sort((a, b) => b.rating - a.rating);

  $("#resultCount").textContent = list.length;
  $("#showing").textContent = `Showing ${list.length} of ${products.length} products`;
  $("#empty").hidden = list.length > 0;
  $("#productGrid").innerHTML = list.map(card).join("");
}

function card(p) {
  const wished = wishlist.includes(p.id);
  const fullStars = Math.round(p.rating);
  const stars = `<span class="stars-gold">${"★".repeat(fullStars)}</span><span class="stars-muted">${"☆".repeat(5 - fullStars)}</span>`;

  return `
    <article class="card">
      <div class="card-image">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        ${p.featured ? `<span class="badge">Featured</span>` : ""}
        <button class="wish ${wished ? "active" : ""}" onclick="toggleWish(${p.id})">${wished ? "♥" : "♡"}</button>
      </div>
      <div class="card-info">
        <div class="category">${p.category}</div>
        <div class="name" title="${p.name}">${p.name}</div>
        <div class="rating">${stars}<span>${p.rating}</span></div>
        <div class="card-bottom">
          <strong class="price">$${p.price.toFixed(2)}</strong>
          <span class="stock">${p.stock} in stock</span>
        </div>
        <div class="card-actions">
          <button class="add" onclick="addToCart(${p.id})">Add to bag</button>
          <button class="buy" onclick="buyNow(${p.id})">Buy now</button>
        </div>
      </div>
    </article>
  `;
}

function renderWishlist() {
  const wishItems = products.filter((p) => wishlist.includes(p.id));
  $("#wishCount").textContent = wishlist.length;
  $("#wishDrawerCount").textContent = wishlist.length;

  $("#wishlistEmpty").style.display = wishItems.length ? "none" : "block";

  $("#wishlistList").innerHTML = wishItems
    .map(
      (p) => `
    <div class="cart-row">
      <img src="${p.image}" alt="${p.name}">
      <div>
        <div class="cart-name">${p.name}</div>
        <div class="cart-price">$${p.price.toFixed(2)}</div>
        <button class="add-from-wish" onclick="addToCart(${p.id})">Add to bag</button>
      </div>
      <button class="remove" onclick="toggleWish(${p.id})">×</button>
    </div>
  `
    )
    .join("");
}

function renderCart() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  $("#cartCount").textContent = count;
  $("#drawerCount").textContent = count;

  $("#cartEmpty").style.display = count ? "none" : "block";

  $("#cartList").innerHTML = cart
    .map((item) => {
      const p = products.find((x) => x.id === item.id);
      return `
      <div class="cart-row">
        <img src="${p.image}" alt="">
        <div>
          <div class="cart-name">${p.name}</div>
          <div class="cart-price">$${p.price.toFixed(2)}</div>
          <div class="qty">
            <button onclick="changeQty(${p.id}, -1)">−</button>
            <span>${item.qty}</span>
            <button onclick="changeQty(${p.id}, 1)">+</button>
          </div>
        </div>
        <button class="remove" onclick="removeCart(${p.id})">×</button>
      </div>
    `;
    })
    .join("");

  const subtotal = cart.reduce((sum, item) => {
    const p = products.find((x) => x.id === item.id);
    return sum + p.price * item.qty;
  }, 0);

  $("#subtotal").textContent = `$${subtotal.toFixed(2)}`;
  saveCart();
}

function addToCart(id) {
  const product = products.find((p) => p.id === id);
  const item = cart.find((x) => x.id === id);

  if (item) {
    if (item.qty >= product.stock) return toast("Maximum available stock reached.");
    item.qty++;
  } else {
    cart.push({ id, qty: 1 });
  }

  saveCart();
  renderCart();
  toast(`${product.name} added to your bag.`);
}

function buyNow(id) {
  addToCart(id);
  openCart();
}

function toggleWish(id) {
  wishlist = wishlist.includes(id)
    ? wishlist.filter((x) => x !== id)
    : [...wishlist, id];

  localStorage.setItem("shopzone-wishlist", JSON.stringify(wishlist));
  renderWishlist();
  renderProducts();
}

function changeQty(id, delta) {
  const item = cart.find((x) => x.id === id);
  const p = products.find((x) => x.id === id);
  item.qty += delta;

  if (item.qty > p.stock) item.qty = p.stock;
  if (item.qty <= 0) cart = cart.filter((x) => x.id !== id);

  renderCart();
}

function removeCart(id) {
  cart = cart.filter((x) => x.id !== id);
  renderCart();
}

function saveCart() {
  localStorage.setItem("shopzone-cart", JSON.stringify(cart));
}

function openCart() {
  closeWishlist();
  $("#cart").classList.add("open");
  $("#overlay").classList.add("active");
  document.body.classList.add("lock");
}

function closeCart() {
  $("#cart").classList.remove("open");
  $("#overlay").classList.remove("active");
  document.body.classList.remove("lock");
}

function openWishlist() {
  closeCart();
  $("#wishlistDrawer").classList.add("open");
  $("#overlay").classList.add("active");
  document.body.classList.add("lock");
}

function closeWishlist() {
  $("#wishlistDrawer").classList.remove("open");
  $("#overlay").classList.remove("active");   document.body.classList.remove("lock"); }  function resetFilters() {   $$(".category").forEach((x) => (x.checked = false));
  $('input[name="rating"][value="0"]').checked = true;
  $("#price").value = 400;
  $("#priceLabel").textContent = "$400";
  $("#stockFilter").checked = false;
  $("#featuredFilter").checked = false;
  $("#search").value = "";
  renderProducts();
}

function toast(message) {
  const el = $("#toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
}


$("#search").addEventListener("input", (e) => {
  renderProducts();
  if (e.target.value.trim() !== "") {
    $("#shop").scrollIntoView({ behavior: "smooth" });
  }
});

$("#sort").addEventListener("change", renderProducts);
$("#price").addEventListener("input", () => {
  $("#priceLabel").textContent = `$${$("#price").value}`;
  renderProducts();
});

$$(".category").forEach((x) => x.addEventListener("change", renderProducts)); $$
('input[name="rating"]').forEach((x) => x.addEventListener("change", renderProducts));

$("#stockFilter").addEventListener("change", (e) => {
  if (e.target.checked) {
    $("#featuredFilter").checked = false;
  }
  renderProducts();
});

$("#featuredFilter").addEventListener("change", (e) => {
  if (e.target.checked) {
    $("#stockFilter").checked = false;
  }
  renderProducts();
});

$("#clearBtn").addEventListener("click", resetFilters);
$("#filterMobile").addEventListener("click", () => $("#sidebar").classList.toggle("open"));
$("#cartBtn").addEventListener("click", openCart);
$("#closeCart").addEventListener("click", closeCart);
$("#wishlistBtn").addEventListener("click", openWishlist);
$("#closeWishlist").addEventListener("click", closeWishlist);

$("#overlay").addEventListener("click", () => {
  closeCart();
  closeWishlist();
});

$("#checkout").addEventListener("click", () => {
  if (!cart.length) return toast("Your bag is empty.");
  cart = [];
  renderCart();
  closeCart();
  toast("Demo checkout complete.");
});

$("#menuBtn").addEventListener("click", () => toast("Mobile navigation ready"));


renderProducts();
renderCart();
renderWishlist();