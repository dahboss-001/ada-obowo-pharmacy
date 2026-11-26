/* ===== Ada Obowo Pharmacy — app ===== */

/* ---- EDIT THESE DETAILS FOR THE REAL PHARMACY ---- */
const CONFIG = {
  name: "Ada Obowo Pharmacy & Wellness",
  // WhatsApp number in international format, digits only (no +, spaces or dashes).
  whatsapp: "2349069626804",
  phoneDisplay: "+234 906 962 6804",
  phoneTel: "+2349069626804",
  email: "hello@example.com",
  address: "123 Market Road, Aba, Abia State",
  hours: "Mon-Sat: 8am - 9pm  •  Sun: 12pm - 6pm"
};
/* -------------------------------------------------- */

const PRODUCTS = [
  { id: 1,  name: "Paracetamol 500mg",        desc: "16 tablets. Relief for headaches, fever and body pain.",        price: 800,   cat: "Pain Relief",  emoji: "💊" },
  { id: 2,  name: "Ibuprofen 400mg",          desc: "12 tablets. For pain, swelling and inflammation.",            price: 1200,  cat: "Pain Relief",  emoji: "💊" },
  { id: 3,  name: "Vitamin C 1000mg",         desc: "20 effervescent tablets. Daily immune support.",              price: 3500,  cat: "Vitamins",     emoji: "🍊" },
  { id: 4,  name: "Multivitamin Daily",       desc: "30 tablets. Complete A-Z daily supplement.",                  price: 5200,  cat: "Vitamins",     emoji: "🌟" },
  { id: 5,  name: "Cough Syrup (Honey)",      desc: "100ml. Soothes dry and chesty coughs.",                       price: 2800,  cat: "Cold & Flu",   emoji: "🍯" },
  { id: 6,  name: "Cold & Flu Relief",        desc: "10 caplets. Eases blocked nose, fever and aches.",            price: 2200,  cat: "Cold & Flu",   emoji: "🤧" },
  { id: 7,  name: "Antacid Suspension",       desc: "200ml. Fast relief from heartburn and indigestion.",          price: 2600,  cat: "Digestive",    emoji: "🥛" },
  { id: 8,  name: "ORS Sachets",              desc: "Pack of 5. Rehydration salts for diarrhoea recovery.",        price: 1500,  cat: "Digestive",    emoji: "🧂" },
  { id: 9,  name: "Antiseptic Liquid",        desc: "250ml. For first aid, bathing and surface hygiene.",          price: 3100,  cat: "First Aid",    emoji: "🧴" },
  { id: 10, name: "Plasters & Bandage Kit",   desc: "Assorted pack. Everyday wound care for home and travel.",     price: 1900,  cat: "First Aid",    emoji: "🩹" },
  { id: 11, name: "Baby Vitamin Drops",       desc: "25ml. Gentle daily vitamins for infants.",                    price: 4300,  cat: "Mother & Baby",emoji: "🍼" },
  { id: 12, name: "Moisturising Lotion",      desc: "400ml. Daily hydration for sensitive skin.",                  price: 4700,  cat: "Skin Care",    emoji: "🧴" },
  { id: 13, name: "Sunscreen SPF 50",         desc: "100ml. Broad-spectrum sun protection.",                       price: 6500,  cat: "Skin Care",    emoji: "🧴" },
  { id: 14, name: "Digital Thermometer",      desc: "Fast, accurate readings for the whole family.",               price: 5500,  cat: "First Aid",    emoji: "🌡️" },
  { id: 15, name: "Blood Pressure Monitor",   desc: "Automatic upper-arm monitor with memory.",                    price: 28500, cat: "Devices",      emoji: "🩺" },
  { id: 16, name: "Folic Acid 400mcg",        desc: "28 tablets. Daily support for expecting mothers.",            price: 1800,  cat: "Mother & Baby",emoji: "🤰" }
];

const CATEGORIES = ["All", ...new Set(PRODUCTS.map(p => p.cat))];
const fmt = n => "₦" + n.toLocaleString("en-NG");
const waLink = msg => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;

/* ---- Wire up contact details ---- */
function applyConfig() {
  const waGeneral = waLink(`Hello ${CONFIG.name}! I'd like to make an enquiry.`);
  ["navWhatsapp", "waFloat", "cta-wa"].forEach(id => {
    const el = document.getElementById(id) || document.querySelector("." + id);
    if (el) el.href = waGeneral;
  });
  document.querySelector(".rx-wa").href = waLink(`Hello ${CONFIG.name}! I'd like to send my prescription. I will attach a clear photo of it in this chat.`);
  document.querySelector(".rx-email").href = `mailto:${CONFIG.email}?subject=${encodeURIComponent("My prescription")}&body=${encodeURIComponent("Hello, please find my prescription attached.")}`;
  document.querySelector(".consult-wa").href = waLink(`Hello ${CONFIG.name}! I'd like to speak with a pharmacist, please.`);
  const sp = document.getElementById("storePhone"); sp.textContent = CONFIG.phoneDisplay; sp.href = "tel:" + CONFIG.phoneTel;
  const fp = document.getElementById("footerPhone"); fp.textContent = CONFIG.phoneDisplay; fp.href = "tel:" + CONFIG.phoneTel;
  const fe = document.getElementById("footerEmail"); fe.textContent = CONFIG.email; fe.href = "mailto:" + CONFIG.email;
  document.getElementById("storeAddress").textContent = CONFIG.address;
  document.getElementById("storeHours").innerHTML = CONFIG.hours;
  document.getElementById("year").textContent = new Date().getFullYear();
}

/* ---- Product rendering, search and filters ---- */
let activeCat = "All";
let query = "";

function renderPills() {
  const wrap = document.getElementById("categoryPills");
  wrap.innerHTML = "";
  CATEGORIES.forEach(cat => {
    const b = document.createElement("button");
    b.className = "pill" + (cat === activeCat ? " active" : "");
    b.type = "button";
    b.textContent = cat;
    b.onclick = () => { activeCat = cat; renderPills(); renderProducts(); };
    wrap.appendChild(b);
  });
}

function renderProducts() {
  const grid = document.getElementById("productGrid");
  const q = query.trim().toLowerCase();
  const items = PRODUCTS.filter(p =>
    (activeCat === "All" || p.cat === activeCat) &&
    (!q || p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q))
  );
  grid.innerHTML = "";
  if (!items.length) {
    grid.innerHTML = `<p class="empty-products">No products match "${query}". Try another search, or <a href="${waLink(`Hello ${CONFIG.name}! Do you have: ${query}`)}" target="_blank" rel="noopener">ask us on WhatsApp</a> - we stock much more in store.</p>`;
    return;
  }
  items.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-emoji">${p.emoji}</div>
      <span class="product-cat">${p.cat}</span>
      <h3 class="product-name">${p.name}</h3>
      <p class="product-desc">${p.desc}</p>
      <div class="product-foot">
        <span class="product-price">${fmt(p.price)}</span>
        <button class="add-btn" type="button" data-id="${p.id}">+ Add</button>
      </div>`;
    grid.appendChild(card);
  });
  grid.querySelectorAll(".add-btn").forEach(btn => {
    btn.onclick = () => addToCart(Number(btn.dataset.id), btn);
  });
}

/* ---- Cart ---- */
const cart = new Map(); // id -> qty

function cartQtyTotal() { let n = 0; cart.forEach(q => n += q); return n; }
function cartMoneyTotal() { let n = 0; cart.forEach((q, id) => n += q * PRODUCTS.find(p => p.id === id).price); return n; }

function addToCart(id, btn) {
  cart.set(id, (cart.get(id) || 0) + 1);
  updateCartUI();
  const p = PRODUCTS.find(x => x.id === id);
  showToast(`${p.name} added to your order`);
  if (btn) { btn.classList.add("added"); btn.textContent = "✓ Added"; setTimeout(() => { btn.classList.remove("added"); btn.textContent = "+ Add"; }, 1200); }
}

function changeQty(id, delta) {
  const q = (cart.get(id) || 0) + delta;
  if (q <= 0) cart.delete(id); else cart.set(id, q);
  updateCartUI();
}

function updateCartUI() {
  document.getElementById("cartCount").textContent = cartQtyTotal();
  document.getElementById("cartTotal").textContent = fmt(cartMoneyTotal());
  const wrap = document.getElementById("cartItems");
  wrap.innerHTML = "";
  if (!cart.size) {
    wrap.innerHTML = `<p class="cart-empty">Your list is empty.<br>Add products from the shop and check out on WhatsApp.</p>`;
  } else {
    cart.forEach((qty, id) => {
      const p = PRODUCTS.find(x => x.id === id);
      const row = document.createElement("div");
      row.className = "cart-item";
      row.innerHTML = `
        <div class="cart-item-emoji">${p.emoji}</div>
        <div>
          <div class="cart-item-name">${p.name}</div>
          <div class="cart-item-price">${fmt(p.price)} × ${qty}</div>
        </div>
        <div class="qty-controls">
          <button class="qty-btn" type="button" data-id="${id}" data-d="-1">−</button>
          <span>${qty}</span>
          <button class="qty-btn" type="button" data-id="${id}" data-d="1">+</button>
        </div>`;
      wrap.appendChild(row);
    });
    wrap.querySelectorAll(".qty-btn").forEach(b => {
      b.onclick = () => changeQty(Number(b.dataset.id), Number(b.dataset.d));
    });
  }
  // Checkout message
  const lines = [];
  cart.forEach((qty, id) => {
    const p = PRODUCTS.find(x => x.id === id);
    lines.push(`• ${p.name} x${qty} — ${fmt(p.price * qty)}`);
  });
  const msg = `Hello ${CONFIG.name}! I'd like to order:\n\n${lines.join("\n")}\n\nTotal: ${fmt(cartMoneyTotal())}\n\nMy delivery address is: `;
  document.getElementById("checkoutWa").href = waLink(msg);
}

/* ---- Drawer, toast, search, menu ---- */
function openCart() { document.getElementById("cartDrawer").classList.add("open"); document.getElementById("cartOverlay").classList.add("open"); }
function closeCart() { document.getElementById("cartDrawer").classList.remove("open"); document.getElementById("cartOverlay").classList.remove("open"); }

let toastTimer;
function showToast(text) {
  const t = document.getElementById("toast");
  t.textContent = text;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2000);
}

function scrollToShop() { document.getElementById("shop").scrollIntoView({ behavior: "smooth" }); }

document.addEventListener("DOMContentLoaded", () => {
  applyConfig();
  renderPills();
  renderProducts();
  updateCartUI();

  document.getElementById("cartBtn").onclick = openCart;
  document.getElementById("cartClose").onclick = closeCart;
  document.getElementById("cartOverlay").onclick = closeCart;
  document.getElementById("menuToggle").onclick = () => document.getElementById("mainNav").classList.toggle("open");
  document.querySelectorAll("#mainNav a").forEach(a => a.onclick = () => document.getElementById("mainNav").classList.remove("open"));

  const shopSearch = document.getElementById("shopSearch");
  shopSearch.addEventListener("input", e => { query = e.target.value; renderProducts(); });

  const heroSearch = document.getElementById("heroSearch");
  const runHeroSearch = () => {
    query = heroSearch.value;
    shopSearch.value = query;
    activeCat = "All";
    renderPills(); renderProducts(); scrollToShop();
  };
  document.getElementById("heroSearchBtn").onclick = runHeroSearch;
  heroSearch.addEventListener("keydown", e => { if (e.key === "Enter") runHeroSearch(); });
});
