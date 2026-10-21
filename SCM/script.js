/* ---------------- Icons ---------------- */
const ICONS = {
  tote:      '<path d="M5.5 8.5h13l1 11h-15l1-11z"/><path d="M9 8.5V7a3 3 0 0 1 6 0v1.5"/>',
  backpack:  '<path d="M6 10a6 6 0 0 1 12 0v9H6v-9z"/><path d="M9 10V7.5a3 3 0 0 1 6 0V10"/><path d="M9.5 15h5"/>',
  handbag:   '<path d="M5 9.5h14l-1.5 10h-11L5 9.5z"/><path d="M8.5 9.5a3.5 3.5 0 0 1 7 0"/>',
  crossbody: '<rect x="5" y="9" width="14" height="9" rx="2.5"/><path d="M5 12.5h14"/><path d="M6.5 9 12 4.5 17.5 9"/>',
  duffel:    '<rect x="3" y="9" width="18" height="9" rx="4.5"/><path d="M8 9V7.5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2V9"/>',
  watch:     '<circle cx="12" cy="12" r="4.5"/><path d="M9.5 7.8 9 3.5h6l-.5 4.3M9.5 16.2 9 20.5h6l-.5-4.3"/><path d="M12 10v2.2l1.4.9"/>',
  shades:    '<circle cx="7" cy="13.5" r="3.2"/><circle cx="17" cy="13.5" r="3.2"/><path d="M10.2 13.5h3.6"/><path d="M3.8 13.5 3 10.5h3.5M20.2 13.5l.8-3h-3.5"/>',
  wallet:    '<rect x="3" y="6.5" width="18" height="12" rx="2.5"/><path d="M3 11h18"/><circle cx="17" cy="14.8" r="1"/>',
  cap:       '<path d="M5 15.5a7 7 0 0 1 14 0"/><path d="M3.5 15.5h17"/>',
  shoe:      '<path d="M3.5 17.5v-2.8c0-.9.7-1.6 1.6-1.6h1.3l2.4-2.9 1.7 1.4 3.1 1c2.3.7 3.9 2.3 3.9 4.4v.5z"/><path d="M3.5 17.5h17"/>'
};

function iconSVG(name) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ICONS.tote}</svg>`;
}

/* ---------------- Data ---------------- */
const products = [
  { id: 1,  name: 'Classic Canvas Tote',  price: 49.99,  cat: 'Bags',        icon: 'tote',      img: 'images/tote.jpg',     rating: 4.8, reviews: 128 },
  { id: 2,  name: 'Urban Backpack',       price: 79.99,  cat: 'Bags',        icon: 'backpack',  img: 'images/backpack.jpg', rating: 4.9, reviews: 214 },
  { id: 3,  name: 'Mini Crossbody',       price: 39.99,  cat: 'Bags',        icon: 'crossbody', img: 'images/crossbody.jpg',rating: 4.6, reviews: 86 },
  { id: 4,  name: 'Leather Handbag',      price: 129.00, cat: 'Bags',        icon: 'handbag',   img: 'images/handbag.jpg',  rating: 4.9, reviews: 173 },
  { id: 5,  name: 'Weekend Duffel',       price: 89.50,  cat: 'Bags',        icon: 'duffel',    img: 'images/duffel.jpg',   rating: 4.7, reviews: 64 },
  { id: 6,  name: 'Minimal Watch',        price: 99.00,  cat: 'Accessories', icon: 'watch',     img: 'images/watch.jpg',    rating: 4.8, reviews: 142 },
  { id: 7,  name: 'Aviator Shades',       price: 59.00,  cat: 'Accessories', icon: 'shades',    img: 'images/shades.jpg',   rating: 4.5, reviews: 98 },
  { id: 8,  name: 'Leather Wallet',       price: 45.00,  cat: 'Accessories', icon: 'wallet',    img: 'images/wallet.jpg',   rating: 4.7, reviews: 210 },
  { id: 9,  name: 'Everyday Cap',         price: 25.00,  cat: 'Accessories', icon: 'cap',       img: 'images/cap.jpg',      rating: 4.4, reviews: 57 },
  { id: 10, name: 'Retro Sneakers',       price: 110.00, cat: 'Footwear',    icon: 'shoe',      img: 'images/sneakers.jpg', rating: 4.8, reviews: 301 }
];

/* ---------------- Elements ---------------- */
const grid       = document.getElementById('grid');
const filtersEl  = document.getElementById('filters');
const badge      = document.getElementById('badge');
const drawer     = document.getElementById('drawer');
const overlay    = document.getElementById('overlay');
const cartBody   = document.getElementById('cartBody');
const cartFoot   = document.getElementById('cartFoot');
const subtotalEl = document.getElementById('subtotal');
const toastEl    = document.getElementById('toast');

const searchInput = document.getElementById('searchInput');
const searchBtn   = document.getElementById('searchBtn');
const searchClear = document.getElementById('searchClear');

let searchTerm = '';
let cart = [];
let toastTimer;

const money = n => '$' + n.toFixed(2);
const findProduct = id => products.find(p => p.id === Number(id));

/* ---------------- Render products ---------------- */

function renderProducts(cat = 'all') {
  const query = searchTerm.trim().toLowerCase();

  const list = products.filter(p => {
    const matchesCategory =
      cat === 'all' || p.cat === cat;

    const matchesSearch =
      p.name.toLowerCase().includes(query) ||
      p.cat.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  grid.innerHTML = list.map((p, i) => `
    <article class="card" style="animation-delay:${i * 45}ms">
      <div class="card-media">
        <span class="tag">${p.cat}</span>
        ${iconSVG(p.icon)}
        <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.remove()">
      </div>
      <div class="card-body">
        <h3>${p.name}</h3>
        <div class="rating">★ ${p.rating} <span>· ${p.reviews} reviews</span></div>
        <div class="card-foot">
          <span class="price">${money(p.price)}</span>
          <button class="add-btn" data-id="${p.id}">Add to cart</button>
        </div>
      </div>
    </article>
  `).join('');
}


/* ---------------- Cart logic ---------------- */
function addToCart(id) {
  const item = cart.find(i => i.id === id);
  if (item) item.qty++;
  else cart.push({ id, qty: 1 });

  renderCart();
  updateBadge();
  showToast(`${findProduct(id).name} added to cart`);
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
  renderCart();
  updateBadge();
}

function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  renderCart();
  updateBadge();
}

function renderCart() {
  if (cart.length === 0) {
    cartBody.innerHTML = `
      <div class="empty">
        ${iconSVG('tote')}
        <p>Your cart is empty.<br>Add something you love!</p>
      </div>`;
    cartFoot.style.display = 'none';
    return;
  }

  cartFoot.style.display = 'block';

  cartBody.innerHTML = cart.map(item => {
    const p = findProduct(item.id);
    return `
      <div class="cart-item">
        <div class="cart-thumb">
          ${iconSVG(p.icon)}
          <img src="${p.img}" alt="${p.name}" onerror="this.remove()">
        </div>
        <div class="cart-info">
          <h4>${p.name}</h4>
          <div class="p">${money(p.price)}</div>
          <div class="qty">
            <button data-act="dec" data-id="${p.id}" aria-label="Decrease">−</button>
            <span>${item.qty}</span>
            <button data-act="inc" data-id="${p.id}" aria-label="Increase">+</button>
          </div>
        </div>
        <button class="remove" data-act="rm" data-id="${p.id}">Remove</button>
      </div>`;
  }).join('');

  const total = cart.reduce((sum, i) => sum + findProduct(i.id).price * i.qty, 0);
  subtotalEl.textContent = money(total);
}

function updateBadge() {
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  badge.textContent = count;
  badge.classList.add('pop');
  setTimeout(() => badge.classList.remove('pop'), 200);
}

/* ---------------- Drawer ---------------- */
function openCart() {
  drawer.classList.add('open');
  overlay.classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  drawer.classList.remove('open');
  overlay.classList.remove('show');
  document.body.style.overflow = '';
}

/* ---------------- Toast ---------------- */
function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2000);
}

/* ---------------- Search ---------------- */
function updateSearchUI() {
  searchClear.hidden = searchInput.value.length === 0;
}

function runSearch() {
  searchTerm = searchInput.value;
  renderProducts();
  updateSearchUI();
  if (searchTerm.trim()) {
    document.getElementById('products')
      .scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

searchBtn.addEventListener('click', runSearch);

searchInput.addEventListener('input', () => {
  searchTerm = searchInput.value;
  renderProducts();
  updateSearchUI();
});

searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    runSearch();
  }
  if (e.key === 'Escape') {
    searchInput.value = '';
    searchTerm = '';
    renderProducts();
    updateSearchUI();
  }
});

searchClear.addEventListener('click', () => {
  searchInput.value = '';
  searchTerm = '';
  renderProducts();
  updateSearchUI();
  searchInput.focus();
});

/* ---------------- Events ---------------- */
grid.addEventListener('click', e => {
  const btn = e.target.closest('.add-btn');
  if (!btn) return;

  addToCart(Number(btn.dataset.id));

  const original = btn.textContent;
  btn.textContent = 'Added ✓';
  btn.classList.add('added');
  setTimeout(() => {
    btn.textContent = original;
    btn.classList.remove('added');
  }, 1100);
});

filtersEl.addEventListener('click', e => {
  const btn = e.target.closest('.filter');
  if (!btn) return;
  filtersEl.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderProducts(btn.dataset.cat);
});

cartBody.addEventListener('click', e => {
  const btn = e.target.closest('button[data-act]');
  if (!btn) return;
  const id = Number(btn.dataset.id);
  const act = btn.dataset.act;

  if (act === 'inc') changeQty(id, 1);
  if (act === 'dec') changeQty(id, -1);
  if (act === 'rm') removeItem(id);
});

document.getElementById('cartBtn').addEventListener('click', openCart);
document.getElementById('closeBtn').addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCart(); });

document.getElementById('checkoutBtn').addEventListener('click', () => {
  if (cart.length === 0) return;
  showToast('Checkout is a demo — thanks for trying! 🎉');
});

/* ---------------- Init ---------------- */
renderProducts();
renderCart();
updateBadge();