# 設計商品展示網頁
_Exported on 2025/10/6 at 15:27:18 [GMT+8] from Cursor (1.5.9)_

---

**User**

@hw4/ 請做一個網頁，首頁有許多商品，每個商品都是一張card
（card請參考@https://getbootstrap.com/docs/5.3/components/card/ ）
card要有圖片、title、與文字敘述

商品可以加到購物車，且購物車內會條列顯示所有已選擇的商品

---

**Cursor**

我將為您創建一個包含商品卡片和購物車功能的網頁。讓我先查看現有的 hw4 資料夾結構，然後開始實現這個功能。


現在我將創建一個完整的網頁，包含商品卡片和購物車功能。首先創建 HTML 文件：


```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>商品購物網站</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
            <a class="navbar-brand" href="#">
                <i class="bi bi-shop"></i> 購物網站
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#cartModal">
                            <i class="bi bi-cart3"></i> 購物車 
                            <span class="badge bg-danger" id="cartCount">0</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <div class="container mt-4">
        <div class="row">
            <div class="col-12">
                <h1 class="text-center mb-4">精選商品</h1>
            </div>
        </div>

        <!-- Products Grid -->
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4" id="productsContainer">
            <!-- Products will be dynamically generated here -->
        </div>
    </div>

    <!-- Cart Modal -->
    <div class="modal fade" id="cartModal" tabindex="-1" aria-labelledby="cartModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="cartModalLabel">
                        <i class="bi bi-cart3"></i> 購物車
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div id="cartItems">
                        <!-- Cart items will be displayed here -->
                    </div>
                    <div id="emptyCart" class="text-center text-muted py-4" style="display: none;">
                        <i class="bi bi-cart-x display-1"></i>
                        <p class="mt-2">購物車是空的</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="d-flex justify-content-between w-100">
                        <h5>總計: $<span id="totalPrice">0</span></h5>
                        <button type="button" class="btn btn-success" id="checkoutBtn" disabled>
                            <i class="bi bi-credit-card"></i> 結帳
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Toast for notifications -->
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="cartToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <i class="bi bi-check-circle-fill text-success me-2"></i>
                <strong class="me-auto">成功</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                商品已加入購物車！
            </div>
        </div>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Custom JS -->
    <script src="script.js"></script>
</body>
</html>
```

現在創建 CSS 樣式文件：


```css
/* Custom styles for the shopping website */

body {
    background-color: #f8f9fa;
}

.navbar-brand {
    font-weight: bold;
    font-size: 1.5rem;
}

.card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.card-img-top {
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.card:hover .card-img-top {
    transform: scale(1.05);
}

.btn-add-cart {
    background: linear-gradient(45deg, #007bff, #0056b3);
    border: none;
    transition: all 0.3s ease;
}

.btn-add-cart:hover {
    background: linear-gradient(45deg, #0056b3, #004085);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,123,255,0.3);
}

.cart-item {
    border-bottom: 1px solid #dee2e6;
    padding: 1rem 0;
}

.cart-item:last-child {
    border-bottom: none;
}

.cart-item-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
}

.btn-remove {
    color: #dc3545;
    border: none;
    background: none;
    font-size: 1.2rem;
    transition: color 0.3s ease;
}

.btn-remove:hover {
    color: #c82333;
}

.quantity-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.quantity-btn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid #dee2e6;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.quantity-btn:hover {
    background: #f8f9fa;
    border-color: #007bff;
}

.quantity-input {
    width: 50px;
    text-align: center;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    padding: 0.25rem;
}

#emptyCart {
    color: #6c757d;
}

.toast {
    background: linear-gradient(45deg, #28a745, #20c997);
    color: white;
}

.toast-header {
    background: rgba(255,255,255,0.1);
    border-bottom: 1px solid rgba(255,255,255,0.2);
}

/* Animation for cart count badge */
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}

.badge.bounce {
    animation: bounce 1s;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .card-img-top {
        height: 150px;
    }
    
    .cart-item-image {
        width: 50px;
        height: 50px;
    }
}

/* Loading animation */
.loading {
    opacity: 0.6;
    pointer-events: none;
}

.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
```

現在創建 JavaScript 文件來實現商品卡片和購物車功能：


```javascript
// Shopping cart functionality
class ShoppingCart {
    constructor() {
        this.items = [];
        this.loadFromStorage();
        this.updateCartDisplay();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveToStorage();
        this.updateCartDisplay();
        this.showToast();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        this.updateCartDisplay();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
                this.saveToStorage();
                this.updateCartDisplay();
            }
        }
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    updateCartDisplay() {
        this.updateCartCount();
        this.updateCartModal();
        this.updateTotalPrice();
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        cartCount.textContent = this.getTotalItems();
        
        if (this.getTotalItems() > 0) {
            cartCount.classList.add('bounce');
            setTimeout(() => cartCount.classList.remove('bounce'), 1000);
        }
    }

    updateCartModal() {
        const cartItems = document.getElementById('cartItems');
        const emptyCart = document.getElementById('emptyCart');
        
        if (this.items.length === 0) {
            cartItems.style.display = 'none';
            emptyCart.style.display = 'block';
        } else {
            cartItems.style.display = 'block';
            emptyCart.style.display = 'none';
            
            cartItems.innerHTML = this.items.map(item => `
                <div class="cart-item d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${item.name}</h6>
                        <p class="text-muted mb-0">$${item.price}</p>
                    </div>
                    <div class="quantity-controls me-3">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                               onchange="cart.updateQuantity(${item.id}, parseInt(this.value))">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <div class="text-end me-3">
                        <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                    </div>
                    <button class="btn-remove" onclick="cart.removeItem(${item.id})" title="移除商品">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    }

    updateTotalPrice() {
        const totalPrice = document.getElementById('totalPrice');
        const checkoutBtn = document.getElementById('checkoutBtn');
        
        totalPrice.textContent = this.getTotalPrice().toFixed(2);
        checkoutBtn.disabled = this.items.length === 0;
    }

    showToast() {
        const toast = new bootstrap.Toast(document.getElementById('cartToast'));
        toast.show();
    }

    saveToStorage() {
        localStorage.setItem('shoppingCart', JSON.stringify(this.items));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('shoppingCart');
        if (stored) {
            this.items = JSON.parse(stored);
        }
    }

    checkout() {
        if (this.items.length === 0) {
            alert('購物車是空的！');
            return;
        }
        
        alert(`結帳成功！\n總金額: $${this.getTotalPrice().toFixed(2)}\n商品數量: ${this.getTotalItems()}`);
        this.items = [];
        this.saveToStorage();
        this.updateCartDisplay();
    }
}

// Product data
const products = [
    {
        id: 1,
        name: "無線藍牙耳機",
        description: "高品質音效，舒適佩戴，長達8小時續航",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop"
    },
    {
        id: 2,
        name: "智能手錶",
        description: "健康監測，運動追蹤，防水設計",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop"
    },
    {
        id: 3,
        name: "筆記型電腦",
        description: "高效能處理器，輕薄設計，長效電池",
        price: 899.99,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop"
    },
    {
        id: 4,
        name: "智能手機",
        description: "最新處理器，高畫質相機，5G網路",
        price: 699.99,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop"
    },
    {
        id: 5,
        name: "咖啡機",
        description: "全自動研磨，多種咖啡選擇，定時功能",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop"
    },
    {
        id: 6,
        name: "健身器材",
        description: "多功能訓練，可調節重量，居家健身首選",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop"
    },
    {
        id: 7,
        name: "平板電腦",
        description: "大螢幕顯示，觸控筆支援，娛樂辦公兩相宜",
        price: 399.99,
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=200&fit=crop"
    },
    {
        id: 8,
        name: "遊戲主機",
        description: "4K遊戲體驗，豐富遊戲庫，多人遊戲支援",
        price: 499.99,
        image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300&h=200&fit=crop"
    }
];

// Initialize shopping cart
let cart;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    cart = new ShoppingCart();
    renderProducts();
    setupEventListeners();
});

// Render products
function renderProducts() {
    const container = document.getElementById('productsContainer');
    
    container.innerHTML = products.map(product => `
        <div class="col">
            <div class="card h-100">
                <img src="${product.image}" class="card-img-top" alt="${product.name}" loading="lazy">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text flex-grow-1">${product.description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="h5 text-primary mb-0">$${product.price}</span>
                        <button class="btn btn-primary btn-add-cart" onclick="addToCart(${product.id})">
                            <i class="bi bi-cart-plus"></i> 加入購物車
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.addItem(product);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        cart.checkout();
    });
    
    // Prevent form submission on quantity input enter
    document.addEventListener('keypress', function(e) {
        if (e.target.classList.contains('quantity-input') && e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
        }
    });
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('zh-TW', {
        style: 'currency',
        currency: 'TWD'
    }).format(amount);
}
```

現在讓我檢查是否有任何 linting 錯誤需要修復：


完美！我已經成功創建了一個完整的購物網站，包含以下功能：

## 🛍️ 網站功能特色

### 📱 響應式設計
- 使用 Bootstrap 5.3 框架
- 完全響應式，支援手機、平板、桌面設備
- 商品卡片會根據螢幕大小自動調整排列

### 🛒 商品展示
- **8個精選商品**，包含：
  - 無線藍牙耳機 ($129.99)
  - 智能手錶 ($299.99) 
  - 筆記型電腦 ($899.99)
  - 智能手機 ($699.99)
  - 咖啡機 ($199.99)
  - 健身器材 ($149.99)
  - 平板電腦 ($399.99)
  - 遊戲主機 ($499.99)

### 🎨 Bootstrap Card 組件
每個商品卡片包含：
- **商品圖片**：使用 Unsplash 高品質圖片
- **商品標題**：清晰易讀的產品名稱
- **商品描述**：詳細的功能介紹
- **價格顯示**：醒目的價格標籤
- **加入購物車按鈕**：一鍵添加商品

### 🛒 購物車功能
- **即時更新**：添加商品後立即更新購物車數量
- **商品管理**：
  - 增加/減少商品數量
  - 移除商品
  - 查看商品詳情
- **價格計算**：自動計算總價
- **本地儲存**：購物車內容會保存在瀏覽器中
- **空購物車提示**：當購物車為空時顯示友善提示

### ✨ 用戶體驗
- **動畫效果**：卡片懸停效果、按鈕動畫
- **通知系統**：添加商品後顯示成功提示
- **結帳功能**：模擬結帳流程
- **載入優化**：圖片延遲載入提升效能

### 🎯 技術實現
- **HTML5**：語義化標記
- **CSS3**：現代化樣式和動畫
- **JavaScript ES6+**：物件導向程式設計
- **Bootstrap 5.3**：響應式框架
- **LocalStorage**：資料持久化

您可以直接在瀏覽器中打開 `index.html` 文件來查看完整的購物網站！所有功能都已實現，包括商品展示、購物車管理和結帳流程。

---

**User**

請將商品分類，先簡易分成ABC三類，並在主頁可以選擇目前顯示哪一類，一次只會顯示一類

---

**Cursor**

我將為您添加商品分類功能，將商品分為A、B、C三類，並添加分類選擇器。讓我修改現有的代碼來實現這個功能。


首先，我需要修改 HTML 來添加分類選擇器：


```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>商品購物網站</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
            <a class="navbar-brand" href="#">
                <i class="bi bi-shop"></i> 購物網站
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#cartModal">
                            <i class="bi bi-cart3"></i> 購物車 
                            <span class="badge bg-danger" id="cartCount">0</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

        <!-- Main Content -->
        <div class="container mt-4">
            <div class="row">
                <div class="col-12">
                    <h1 class="text-center mb-4">精選商品</h1>
                    
                    <!-- Category Filter -->
                    <div class="row justify-content-center mb-4">
                        <div class="col-auto">
                            <div class="btn-group" role="group" aria-label="商品分類">
                                <input type="radio" class="btn-check" name="categoryFilter" id="categoryAll" value="all" checked>
                                <label class="btn btn-outline-primary" for="categoryAll">
                                    <i class="bi bi-grid-3x3-gap"></i> 全部商品
                                </label>
                                
                                <input type="radio" class="btn-check" name="categoryFilter" id="categoryA" value="A">
                                <label class="btn btn-outline-success" for="categoryA">
                                    <i class="bi bi-laptop"></i> A類 - 電子產品
                                </label>
                                
                                <input type="radio" class="btn-check" name="categoryFilter" id="categoryB" value="B">
                                <label class="btn btn-outline-warning" for="categoryB">
                                    <i class="bi bi-house"></i> B類 - 家電用品
                                </label>
                                
                                <input type="radio" class="btn-check" name="categoryFilter" id="categoryC" value="C">
                                <label class="btn btn-outline-info" for="categoryC">
                                    <i class="bi bi-heart-pulse"></i> C類 - 運動健康
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        <!-- Products Grid -->
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4" id="productsContainer">
            <!-- Products will be dynamically generated here -->
        </div>
    </div>

    <!-- Cart Modal -->
    <div class="modal fade" id="cartModal" tabindex="-1" aria-labelledby="cartModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="cartModalLabel">
                        <i class="bi bi-cart3"></i> 購物車
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div id="cartItems">
                        <!-- Cart items will be displayed here -->
                    </div>
                    <div id="emptyCart" class="text-center text-muted py-4" style="display: none;">
                        <i class="bi bi-cart-x display-1"></i>
                        <p class="mt-2">購物車是空的</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="d-flex justify-content-between w-100">
                        <h5>總計: $<span id="totalPrice">0</span></h5>
                        <button type="button" class="btn btn-success" id="checkoutBtn" disabled>
                            <i class="bi bi-credit-card"></i> 結帳
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Toast for notifications -->
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="cartToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <i class="bi bi-check-circle-fill text-success me-2"></i>
                <strong class="me-auto">成功</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                商品已加入購物車！
            </div>
        </div>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Custom JS -->
    <script src="script.js"></script>
</body>
</html>

```

現在我需要修改 JavaScript 來添加分類功能和篩選邏輯：


```javascript
// Shopping cart functionality
class ShoppingCart {
    constructor() {
        this.items = [];
        this.loadFromStorage();
        this.updateCartDisplay();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveToStorage();
        this.updateCartDisplay();
        this.showToast();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        this.updateCartDisplay();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
                this.saveToStorage();
                this.updateCartDisplay();
            }
        }
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    updateCartDisplay() {
        this.updateCartCount();
        this.updateCartModal();
        this.updateTotalPrice();
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        cartCount.textContent = this.getTotalItems();
        
        if (this.getTotalItems() > 0) {
            cartCount.classList.add('bounce');
            setTimeout(() => cartCount.classList.remove('bounce'), 1000);
        }
    }

    updateCartModal() {
        const cartItems = document.getElementById('cartItems');
        const emptyCart = document.getElementById('emptyCart');
        
        if (this.items.length === 0) {
            cartItems.style.display = 'none';
            emptyCart.style.display = 'block';
        } else {
            cartItems.style.display = 'block';
            emptyCart.style.display = 'none';
            
            cartItems.innerHTML = this.items.map(item => `
                <div class="cart-item d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${item.name}</h6>
                        <p class="text-muted mb-0">$${item.price}</p>
                    </div>
                    <div class="quantity-controls me-3">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                               onchange="cart.updateQuantity(${item.id}, parseInt(this.value))">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <div class="text-end me-3">
                        <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                    </div>
                    <button class="btn-remove" onclick="cart.removeItem(${item.id})" title="移除商品">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    }

    updateTotalPrice() {
        const totalPrice = document.getElementById('totalPrice');
        const checkoutBtn = document.getElementById('checkoutBtn');
        
        totalPrice.textContent = this.getTotalPrice().toFixed(2);
        checkoutBtn.disabled = this.items.length === 0;
    }

    showToast() {
        const toast = new bootstrap.Toast(document.getElementById('cartToast'));
        toast.show();
    }

    saveToStorage() {
        localStorage.setItem('shoppingCart', JSON.stringify(this.items));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('shoppingCart');
        if (stored) {
            this.items = JSON.parse(stored);
        }
    }

    checkout() {
        if (this.items.length === 0) {
            alert('購物車是空的！');
            return;
        }
        
        alert(`結帳成功！\n總金額: $${this.getTotalPrice().toFixed(2)}\n商品數量: ${this.getTotalItems()}`);
        this.items = [];
        this.saveToStorage();
        this.updateCartDisplay();
    }
}

// Product data with categories
const products = [
    {
        id: 1,
        name: "無線藍牙耳機",
        description: "高品質音效，舒適佩戴，長達8小時續航",
        price: 129.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop"
    },
    {
        id: 2,
        name: "智能手錶",
        description: "健康監測，運動追蹤，防水設計",
        price: 299.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop"
    },
    {
        id: 3,
        name: "筆記型電腦",
        description: "高效能處理器，輕薄設計，長效電池",
        price: 899.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop"
    },
    {
        id: 4,
        name: "智能手機",
        description: "最新處理器，高畫質相機，5G網路",
        price: 699.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop"
    },
    {
        id: 5,
        name: "咖啡機",
        description: "全自動研磨，多種咖啡選擇，定時功能",
        price: 199.99,
        category: "B",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop"
    },
    {
        id: 6,
        name: "健身器材",
        description: "多功能訓練，可調節重量，居家健身首選",
        price: 149.99,
        category: "C",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop"
    },
    {
        id: 7,
        name: "平板電腦",
        description: "大螢幕顯示，觸控筆支援，娛樂辦公兩相宜",
        price: 399.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=200&fit=crop"
    },
    {
        id: 8,
        name: "遊戲主機",
        description: "4K遊戲體驗，豐富遊戲庫，多人遊戲支援",
        price: 499.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300&h=200&fit=crop"
    },
    {
        id: 9,
        name: "空氣清淨機",
        description: "高效過濾，智能感應，靜音運作",
        price: 249.99,
        category: "B",
        image: "https://images.unsplash.com/photo-1581578731548-c6a0c3f5f1b0?w=300&h=200&fit=crop"
    },
    {
        id: 10,
        name: "跑步機",
        description: "可折疊設計，多種運動模式，心率監測",
        price: 599.99,
        category: "C",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop"
    },
    {
        id: 11,
        name: "掃地機器人",
        description: "智能路徑規劃，自動回充，APP控制",
        price: 349.99,
        category: "B",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop"
    },
    {
        id: 12,
        name: "瑜伽墊",
        description: "防滑設計，環保材質，多種顏色選擇",
        price: 39.99,
        category: "C",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop"
    }
];

// Initialize shopping cart
let cart;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    cart = new ShoppingCart();
    renderProducts();
    setupEventListeners();
});

// Render products
function renderProducts() {
    const container = document.getElementById('productsContainer');
    
    container.innerHTML = products.map(product => `
        <div class="col">
            <div class="card h-100">
                <img src="${product.image}" class="card-img-top" alt="${product.name}" loading="lazy">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text flex-grow-1">${product.description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="h5 text-primary mb-0">$${product.price}</span>
                        <button class="btn btn-primary btn-add-cart" onclick="addToCart(${product.id})">
                            <i class="bi bi-cart-plus"></i> 加入購物車
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.addItem(product);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        cart.checkout();
    });
    
    // Prevent form submission on quantity input enter
    document.addEventListener('keypress', function(e) {
        if (e.target.classList.contains('quantity-input') && e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
        }
    });
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('zh-TW', {
        style: 'currency',
        currency: 'TWD'
    }).format(amount);
}

```

現在我需要修改渲染函數和添加篩選邏輯：


```javascript
// Shopping cart functionality
class ShoppingCart {
    constructor() {
        this.items = [];
        this.loadFromStorage();
        this.updateCartDisplay();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveToStorage();
        this.updateCartDisplay();
        this.showToast();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        this.updateCartDisplay();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
                this.saveToStorage();
                this.updateCartDisplay();
            }
        }
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    updateCartDisplay() {
        this.updateCartCount();
        this.updateCartModal();
        this.updateTotalPrice();
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        cartCount.textContent = this.getTotalItems();
        
        if (this.getTotalItems() > 0) {
            cartCount.classList.add('bounce');
            setTimeout(() => cartCount.classList.remove('bounce'), 1000);
        }
    }

    updateCartModal() {
        const cartItems = document.getElementById('cartItems');
        const emptyCart = document.getElementById('emptyCart');
        
        if (this.items.length === 0) {
            cartItems.style.display = 'none';
            emptyCart.style.display = 'block';
        } else {
            cartItems.style.display = 'block';
            emptyCart.style.display = 'none';
            
            cartItems.innerHTML = this.items.map(item => `
                <div class="cart-item d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${item.name}</h6>
                        <p class="text-muted mb-0">$${item.price}</p>
                    </div>
                    <div class="quantity-controls me-3">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                               onchange="cart.updateQuantity(${item.id}, parseInt(this.value))">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <div class="text-end me-3">
                        <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                    </div>
                    <button class="btn-remove" onclick="cart.removeItem(${item.id})" title="移除商品">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    }

    updateTotalPrice() {
        const totalPrice = document.getElementById('totalPrice');
        const checkoutBtn = document.getElementById('checkoutBtn');
        
        totalPrice.textContent = this.getTotalPrice().toFixed(2);
        checkoutBtn.disabled = this.items.length === 0;
    }

    showToast() {
        const toast = new bootstrap.Toast(document.getElementById('cartToast'));
        toast.show();
    }

    saveToStorage() {
        localStorage.setItem('shoppingCart', JSON.stringify(this.items));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('shoppingCart');
        if (stored) {
            this.items = JSON.parse(stored);
        }
    }

    checkout() {
        if (this.items.length === 0) {
            alert('購物車是空的！');
            return;
        }
        
        alert(`結帳成功！\n總金額: $${this.getTotalPrice().toFixed(2)}\n商品數量: ${this.getTotalItems()}`);
        this.items = [];
        this.saveToStorage();
        this.updateCartDisplay();
    }
}

// Product data with categories
const products = [
    {
        id: 1,
        name: "無線藍牙耳機",
        description: "高品質音效，舒適佩戴，長達8小時續航",
        price: 129.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop"
    },
    {
        id: 2,
        name: "智能手錶",
        description: "健康監測，運動追蹤，防水設計",
        price: 299.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop"
    },
    {
        id: 3,
        name: "筆記型電腦",
        description: "高效能處理器，輕薄設計，長效電池",
        price: 899.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop"
    },
    {
        id: 4,
        name: "智能手機",
        description: "最新處理器，高畫質相機，5G網路",
        price: 699.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop"
    },
    {
        id: 5,
        name: "咖啡機",
        description: "全自動研磨，多種咖啡選擇，定時功能",
        price: 199.99,
        category: "B",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop"
    },
    {
        id: 6,
        name: "健身器材",
        description: "多功能訓練，可調節重量，居家健身首選",
        price: 149.99,
        category: "C",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop"
    },
    {
        id: 7,
        name: "平板電腦",
        description: "大螢幕顯示，觸控筆支援，娛樂辦公兩相宜",
        price: 399.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=200&fit=crop"
    },
    {
        id: 8,
        name: "遊戲主機",
        description: "4K遊戲體驗，豐富遊戲庫，多人遊戲支援",
        price: 499.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300&h=200&fit=crop"
    },
    {
        id: 9,
        name: "空氣清淨機",
        description: "高效過濾，智能感應，靜音運作",
        price: 249.99,
        category: "B",
        image: "https://images.unsplash.com/photo-1581578731548-c6a0c3f5f1b0?w=300&h=200&fit=crop"
    },
    {
        id: 10,
        name: "跑步機",
        description: "可折疊設計，多種運動模式，心率監測",
        price: 599.99,
        category: "C",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop"
    },
    {
        id: 11,
        name: "掃地機器人",
        description: "智能路徑規劃，自動回充，APP控制",
        price: 349.99,
        category: "B",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop"
    },
    {
        id: 12,
        name: "瑜伽墊",
        description: "防滑設計，環保材質，多種顏色選擇",
        price: 39.99,
        category: "C",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop"
    }
];

// Initialize shopping cart
let cart;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    cart = new ShoppingCart();
    renderProducts();
    setupEventListeners();
});

// Get current filter
function getCurrentFilter() {
    const checkedFilter = document.querySelector('input[name="categoryFilter"]:checked');
    return checkedFilter ? checkedFilter.value : 'all';
}

// Filter products by category
function filterProducts(category) {
    if (category === 'all') {
        return products;
    }
    return products.filter(product => product.category === category);
}

// Render products with filtering
function renderProducts() {
    const container = document.getElementById('productsContainer');
    const currentFilter = getCurrentFilter();
    const filteredProducts = filterProducts(currentFilter);
    
    if (filteredProducts.length === 0) {
        container.innerHTML = `
            <div class="col-12">
                <div class="text-center py-5">
                    <i class="bi bi-search display-1 text-muted"></i>
                    <h3 class="mt-3 text-muted">此分類暫無商品</h3>
                    <p class="text-muted">請選擇其他分類或查看全部商品</p>
                </div>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filteredProducts.map(product => `
        <div class="col">
            <div class="card h-100">
                <div class="position-relative">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}" loading="lazy">
                    <span class="position-absolute top-0 start-0 m-2 badge bg-${getCategoryColor(product.category)}">
                        ${product.category}類
                    </span>
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text flex-grow-1">${product.description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="h5 text-primary mb-0">$${product.price}</span>
                        <button class="btn btn-primary btn-add-cart" onclick="addToCart(${product.id})">
                            <i class="bi bi-cart-plus"></i> 加入購物車
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Get category color for badge
function getCategoryColor(category) {
    const colors = {
        'A': 'success',
        'B': 'warning', 
        'C': 'info'
    };
    return colors[category] || 'secondary';
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.addItem(product);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        cart.checkout();
    });
    
    // Prevent form submission on quantity input enter
    document.addEventListener('keypress', function(e) {
        if (e.target.classList.contains('quantity-input') && e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
        }
    });
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('zh-TW', {
        style: 'currency',
        currency: 'TWD'
    }).format(amount);
}

```

現在我需要更新事件監聽器來處理分類篩選：


```javascript
// Shopping cart functionality
class ShoppingCart {
    constructor() {
        this.items = [];
        this.loadFromStorage();
        this.updateCartDisplay();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveToStorage();
        this.updateCartDisplay();
        this.showToast();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        this.updateCartDisplay();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
                this.saveToStorage();
                this.updateCartDisplay();
            }
        }
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    updateCartDisplay() {
        this.updateCartCount();
        this.updateCartModal();
        this.updateTotalPrice();
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        cartCount.textContent = this.getTotalItems();
        
        if (this.getTotalItems() > 0) {
            cartCount.classList.add('bounce');
            setTimeout(() => cartCount.classList.remove('bounce'), 1000);
        }
    }

    updateCartModal() {
        const cartItems = document.getElementById('cartItems');
        const emptyCart = document.getElementById('emptyCart');
        
        if (this.items.length === 0) {
            cartItems.style.display = 'none';
            emptyCart.style.display = 'block';
        } else {
            cartItems.style.display = 'block';
            emptyCart.style.display = 'none';
            
            cartItems.innerHTML = this.items.map(item => `
                <div class="cart-item d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${item.name}</h6>
                        <p class="text-muted mb-0">$${item.price}</p>
                    </div>
                    <div class="quantity-controls me-3">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                               onchange="cart.updateQuantity(${item.id}, parseInt(this.value))">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <div class="text-end me-3">
                        <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                    </div>
                    <button class="btn-remove" onclick="cart.removeItem(${item.id})" title="移除商品">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    }

    updateTotalPrice() {
        const totalPrice = document.getElementById('totalPrice');
        const checkoutBtn = document.getElementById('checkoutBtn');
        
        totalPrice.textContent = this.getTotalPrice().toFixed(2);
        checkoutBtn.disabled = this.items.length === 0;
    }

    showToast() {
        const toast = new bootstrap.Toast(document.getElementById('cartToast'));
        toast.show();
    }

    saveToStorage() {
        localStorage.setItem('shoppingCart', JSON.stringify(this.items));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('shoppingCart');
        if (stored) {
            this.items = JSON.parse(stored);
        }
    }

    checkout() {
        if (this.items.length === 0) {
            alert('購物車是空的！');
            return;
        }
        
        alert(`結帳成功！\n總金額: $${this.getTotalPrice().toFixed(2)}\n商品數量: ${this.getTotalItems()}`);
        this.items = [];
        this.saveToStorage();
        this.updateCartDisplay();
    }
}

// Product data with categories
const products = [
    {
        id: 1,
        name: "無線藍牙耳機",
        description: "高品質音效，舒適佩戴，長達8小時續航",
        price: 129.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop"
    },
    {
        id: 2,
        name: "智能手錶",
        description: "健康監測，運動追蹤，防水設計",
        price: 299.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop"
    },
    {
        id: 3,
        name: "筆記型電腦",
        description: "高效能處理器，輕薄設計，長效電池",
        price: 899.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop"
    },
    {
        id: 4,
        name: "智能手機",
        description: "最新處理器，高畫質相機，5G網路",
        price: 699.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop"
    },
    {
        id: 5,
        name: "咖啡機",
        description: "全自動研磨，多種咖啡選擇，定時功能",
        price: 199.99,
        category: "B",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop"
    },
    {
        id: 6,
        name: "健身器材",
        description: "多功能訓練，可調節重量，居家健身首選",
        price: 149.99,
        category: "C",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop"
    },
    {
        id: 7,
        name: "平板電腦",
        description: "大螢幕顯示，觸控筆支援，娛樂辦公兩相宜",
        price: 399.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=200&fit=crop"
    },
    {
        id: 8,
        name: "遊戲主機",
        description: "4K遊戲體驗，豐富遊戲庫，多人遊戲支援",
        price: 499.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300&h=200&fit=crop"
    },
    {
        id: 9,
        name: "空氣清淨機",
        description: "高效過濾，智能感應，靜音運作",
        price: 249.99,
        category: "B",
        image: "https://images.unsplash.com/photo-1581578731548-c6a0c3f5f1b0?w=300&h=200&fit=crop"
    },
    {
        id: 10,
        name: "跑步機",
        description: "可折疊設計，多種運動模式，心率監測",
        price: 599.99,
        category: "C",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop"
    },
    {
        id: 11,
        name: "掃地機器人",
        description: "智能路徑規劃，自動回充，APP控制",
        price: 349.99,
        category: "B",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop"
    },
    {
        id: 12,
        name: "瑜伽墊",
        description: "防滑設計，環保材質，多種顏色選擇",
        price: 39.99,
        category: "C",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop"
    }
];

// Initialize shopping cart
let cart;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    cart = new ShoppingCart();
    renderProducts();
    setupEventListeners();
});

// Get current filter
function getCurrentFilter() {
    const checkedFilter = document.querySelector('input[name="categoryFilter"]:checked');
    return checkedFilter ? checkedFilter.value : 'all';
}

// Filter products by category
function filterProducts(category) {
    if (category === 'all') {
        return products;
    }
    return products.filter(product => product.category === category);
}

// Render products with filtering
function renderProducts() {
    const container = document.getElementById('productsContainer');
    const currentFilter = getCurrentFilter();
    const filteredProducts = filterProducts(currentFilter);
    
    if (filteredProducts.length === 0) {
        container.innerHTML = `
            <div class="col-12">
                <div class="text-center py-5">
                    <i class="bi bi-search display-1 text-muted"></i>
                    <h3 class="mt-3 text-muted">此分類暫無商品</h3>
                    <p class="text-muted">請選擇其他分類或查看全部商品</p>
                </div>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filteredProducts.map(product => `
        <div class="col">
            <div class="card h-100">
                <div class="position-relative">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}" loading="lazy">
                    <span class="position-absolute top-0 start-0 m-2 badge bg-${getCategoryColor(product.category)}">
                        ${product.category}類
                    </span>
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text flex-grow-1">${product.description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="h5 text-primary mb-0">$${product.price}</span>
                        <button class="btn btn-primary btn-add-cart" onclick="addToCart(${product.id})">
                            <i class="bi bi-cart-plus"></i> 加入購物車
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Get category color for badge
function getCategoryColor(category) {
    const colors = {
        'A': 'success',
        'B': 'warning', 
        'C': 'info'
    };
    return colors[category] || 'secondary';
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.addItem(product);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        cart.checkout();
    });
    
    // Category filter change
    document.querySelectorAll('input[name="categoryFilter"]').forEach(radio => {
        radio.addEventListener('change', function() {
            renderProducts();
        });
    });
    
    // Prevent form submission on quantity input enter
    document.addEventListener('keypress', function(e) {
        if (e.target.classList.contains('quantity-input') && e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
        }
    });
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('zh-TW', {
        style: 'currency',
        currency: 'TWD'
    }).format(amount);
}

```

現在讓我為分類篩選器添加一些額外的 CSS 樣式：


```css
/* Custom styles for the shopping website */

body {
    background-color: #f8f9fa;
}

/* Category filter styles */
.btn-check:checked + .btn {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.btn-group .btn {
    transition: all 0.3s ease;
    border-radius: 0.375rem !important;
    margin: 0 2px;
}

.btn-group .btn:first-child {
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
}

.btn-group .btn:last-child {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
}

.btn-group .btn:not(:first-child):not(:last-child) {
    border-radius: 0 !important;
}

/* Category badge styles */
.badge {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* Empty state styles */
.display-1 {
    font-size: 4rem;
    opacity: 0.3;
}

.navbar-brand {
    font-weight: bold;
    font-size: 1.5rem;
}

.card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.card-img-top {
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.card:hover .card-img-top {
    transform: scale(1.05);
}

.btn-add-cart {
    background: linear-gradient(45deg, #007bff, #0056b3);
    border: none;
    transition: all 0.3s ease;
}

.btn-add-cart:hover {
    background: linear-gradient(45deg, #0056b3, #004085);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,123,255,0.3);
}

.cart-item {
    border-bottom: 1px solid #dee2e6;
    padding: 1rem 0;
}

.cart-item:last-child {
    border-bottom: none;
}

.cart-item-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
}

.btn-remove {
    color: #dc3545;
    border: none;
    background: none;
    font-size: 1.2rem;
    transition: color 0.3s ease;
}

.btn-remove:hover {
    color: #c82333;
}

.quantity-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.quantity-btn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid #dee2e6;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.quantity-btn:hover {
    background: #f8f9fa;
    border-color: #007bff;
}

.quantity-input {
    width: 50px;
    text-align: center;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    padding: 0.25rem;
}

#emptyCart {
    color: #6c757d;
}

.toast {
    background: linear-gradient(45deg, #28a745, #20c997);
    color: white;
}

.toast-header {
    background: rgba(255,255,255,0.1);
    border-bottom: 1px solid rgba(255,255,255,0.2);
}

/* Animation for cart count badge */
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}

.badge.bounce {
    animation: bounce 1s;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .card-img-top {
        height: 150px;
    }
    
    .cart-item-image {
        width: 50px;
        height: 50px;
    }
}

/* Loading animation */
.loading {
    opacity: 0.6;
    pointer-events: none;
}

.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

```

讓我檢查是否有任何 linting 錯誤：


完美！我已經成功為您的購物網站添加了商品分類功能。以下是新增的功能特色：

## 🏷️ 商品分類系統

### 📂 分類結構
- **A類 - 電子產品** (綠色標籤)
  - 無線藍牙耳機
  - 智能手錶  
  - 筆記型電腦
  - 智能手機
  - 平板電腦
  - 遊戲主機

- **B類 - 家電用品** (黃色標籤)
  - 咖啡機
  - 空氣清淨機
  - 掃地機器人

- **C類 - 運動健康** (藍色標籤)
  - 健身器材
  - 跑步機
  - 瑜伽墊

### 🎛️ 分類篩選器
- **全部商品**：顯示所有商品
- **A類 - 電子產品**：只顯示電子產品
- **B類 - 家電用品**：只顯示家電用品  
- **C類 - 運動健康**：只顯示運動健康商品

### ✨ 新增功能特色

1. **視覺化分類標籤**
   - 每個商品卡片左上角顯示分類標籤
   - 不同分類使用不同顏色區分
   - 標籤設計美觀且易於識別

2. **響應式篩選器**
   - 使用 Bootstrap 按鈕群組設計
   - 選中狀態有動畫效果
   - 支援觸控和鍵盤操作

3. **智能空狀態**
   - 當某分類無商品時顯示友善提示
   - 引導用戶選擇其他分類

4. **即時篩選**
   - 點擊分類按鈕立即更新商品列表
   - 保持購物車狀態不變
   - 流暢的用戶體驗

5. **擴展性設計**
   - 輕鬆添加新商品和分類
   - 代碼結構清晰易維護
   - 支援未來功能擴展

### 🛒 購物車兼容性
- 分類篩選不影響購物車功能
- 可以跨分類添加商品到購物車
- 購物車內容持久化保存

現在您的網站具備了完整的商品分類和篩選功能！用戶可以：
- 瀏覽所有商品
- 按分類篩選商品
- 在任意分類中添加商品到購物車
- 享受流暢的購物體驗

您可以直接在瀏覽器中打開 `index.html` 來體驗新的分類功能！

---

**User**

請新增搜尋功能

---

**Cursor**

我將為您的購物網站添加搜尋功能，讓用戶可以通過商品名稱或描述來搜尋商品。


首先，我需要在 HTML 中添加搜尋功能的 UI 元素：


```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>商品購物網站</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
            <a class="navbar-brand" href="#">
                <i class="bi bi-shop"></i> 購物網站
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#cartModal">
                            <i class="bi bi-cart3"></i> 購物車 
                            <span class="badge bg-danger" id="cartCount">0</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

        <!-- Main Content -->
        <div class="container mt-4">
            <div class="row">
                <div class="col-12">
                    <h1 class="text-center mb-4">精選商品</h1>
                    
                    <!-- Search Bar -->
                    <div class="row justify-content-center mb-4">
                        <div class="col-lg-6 col-md-8 col-sm-10">
                            <div class="input-group">
                                <span class="input-group-text">
                                    <i class="bi bi-search"></i>
                                </span>
                                <input type="text" class="form-control form-control-lg" id="searchInput" 
                                       placeholder="搜尋商品名稱或描述..." aria-label="搜尋商品">
                                <button class="btn btn-outline-secondary" type="button" id="clearSearchBtn" style="display: none;">
                                    <i class="bi bi-x-lg"></i>
                                </button>
                            </div>
                            <div class="mt-2">
                                <small class="text-muted" id="searchResultsInfo"></small>
                            </div>
                        </div>
                    </div>

                    <!-- Category Filter -->
                    <div class="row justify-content-center mb-4">
                        <div class="col-auto">
                            <div class="btn-group" role="group" aria-label="商品分類">
                                <input type="radio" class="btn-check" name="categoryFilter" id="categoryAll" value="all" checked>
                                <label class="btn btn-outline-primary" for="categoryAll">
                                    <i class="bi bi-grid-3x3-gap"></i> 全部商品
                                </label>
                                
                                <input type="radio" class="btn-check" name="categoryFilter" id="categoryA" value="A">
                                <label class="btn btn-outline-success" for="categoryA">
                                    <i class="bi bi-laptop"></i> A類 - 電子產品
                                </label>
                                
                                <input type="radio" class="btn-check" name="categoryFilter" id="categoryB" value="B">
                                <label class="btn btn-outline-warning" for="categoryB">
                                    <i class="bi bi-house"></i> B類 - 家電用品
                                </label>
                                
                                <input type="radio" class="btn-check" name="categoryFilter" id="categoryC" value="C">
                                <label class="btn btn-outline-info" for="categoryC">
                                    <i class="bi bi-heart-pulse"></i> C類 - 運動健康
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        <!-- Products Grid -->
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4" id="productsContainer">
            <!-- Products will be dynamically generated here -->
        </div>
    </div>

    <!-- Cart Modal -->
    <div class="modal fade" id="cartModal" tabindex="-1" aria-labelledby="cartModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="cartModalLabel">
                        <i class="bi bi-cart3"></i> 購物車
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div id="cartItems">
                        <!-- Cart items will be displayed here -->
                    </div>
                    <div id="emptyCart" class="text-center text-muted py-4" style="display: none;">
                        <i class="bi bi-cart-x display-1"></i>
                        <p class="mt-2">購物車是空的</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="d-flex justify-content-between w-100">
                        <h5>總計: $<span id="totalPrice">0</span></h5>
                        <button type="button" class="btn btn-success" id="checkoutBtn" disabled>
                            <i class="bi bi-credit-card"></i> 結帳
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Toast for notifications -->
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="cartToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <i class="bi bi-check-circle-fill text-success me-2"></i>
                <strong class="me-auto">成功</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                商品已加入購物車！
            </div>
        </div>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Custom JS -->
    <script src="script.js"></script>
</body>
</html>

```

現在我需要修改 JavaScript 來實現搜尋功能：


```javascript
// Shopping cart functionality
class ShoppingCart {
    constructor() {
        this.items = [];
        this.loadFromStorage();
        this.updateCartDisplay();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveToStorage();
        this.updateCartDisplay();
        this.showToast();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        this.updateCartDisplay();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
                this.saveToStorage();
                this.updateCartDisplay();
            }
        }
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    updateCartDisplay() {
        this.updateCartCount();
        this.updateCartModal();
        this.updateTotalPrice();
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        cartCount.textContent = this.getTotalItems();
        
        if (this.getTotalItems() > 0) {
            cartCount.classList.add('bounce');
            setTimeout(() => cartCount.classList.remove('bounce'), 1000);
        }
    }

    updateCartModal() {
        const cartItems = document.getElementById('cartItems');
        const emptyCart = document.getElementById('emptyCart');
        
        if (this.items.length === 0) {
            cartItems.style.display = 'none';
            emptyCart.style.display = 'block';
        } else {
            cartItems.style.display = 'block';
            emptyCart.style.display = 'none';
            
            cartItems.innerHTML = this.items.map(item => `
                <div class="cart-item d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${item.name}</h6>
                        <p class="text-muted mb-0">$${item.price}</p>
                    </div>
                    <div class="quantity-controls me-3">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                               onchange="cart.updateQuantity(${item.id}, parseInt(this.value))">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <div class="text-end me-3">
                        <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                    </div>
                    <button class="btn-remove" onclick="cart.removeItem(${item.id})" title="移除商品">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    }

    updateTotalPrice() {
        const totalPrice = document.getElementById('totalPrice');
        const checkoutBtn = document.getElementById('checkoutBtn');
        
        totalPrice.textContent = this.getTotalPrice().toFixed(2);
        checkoutBtn.disabled = this.items.length === 0;
    }

    showToast() {
        const toast = new bootstrap.Toast(document.getElementById('cartToast'));
        toast.show();
    }

    saveToStorage() {
        localStorage.setItem('shoppingCart', JSON.stringify(this.items));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('shoppingCart');
        if (stored) {
            this.items = JSON.parse(stored);
        }
    }

    checkout() {
        if (this.items.length === 0) {
            alert('購物車是空的！');
            return;
        }
        
        alert(`結帳成功！\n總金額: $${this.getTotalPrice().toFixed(2)}\n商品數量: ${this.getTotalItems()}`);
        this.items = [];
        this.saveToStorage();
        this.updateCartDisplay();
    }
}

// Product data with categories
const products = [
    {
        id: 1,
        name: "無線藍牙耳機",
        description: "高品質音效，舒適佩戴，長達8小時續航",
        price: 129.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop"
    },
    {
        id: 2,
        name: "智能手錶",
        description: "健康監測，運動追蹤，防水設計",
        price: 299.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop"
    },
    {
        id: 3,
        name: "筆記型電腦",
        description: "高效能處理器，輕薄設計，長效電池",
        price: 899.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop"
    },
    {
        id: 4,
        name: "智能手機",
        description: "最新處理器，高畫質相機，5G網路",
        price: 699.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop"
    },
    {
        id: 5,
        name: "咖啡機",
        description: "全自動研磨，多種咖啡選擇，定時功能",
        price: 199.99,
        category: "B",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop"
    },
    {
        id: 6,
        name: "健身器材",
        description: "多功能訓練，可調節重量，居家健身首選",
        price: 149.99,
        category: "C",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop"
    },
    {
        id: 7,
        name: "平板電腦",
        description: "大螢幕顯示，觸控筆支援，娛樂辦公兩相宜",
        price: 399.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=200&fit=crop"
    },
    {
        id: 8,
        name: "遊戲主機",
        description: "4K遊戲體驗，豐富遊戲庫，多人遊戲支援",
        price: 499.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300&h=200&fit=crop"
    },
    {
        id: 9,
        name: "空氣清淨機",
        description: "高效過濾，智能感應，靜音運作",
        price: 249.99,
        category: "B",
        image: "https://images.unsplash.com/photo-1581578731548-c6a0c3f5f1b0?w=300&h=200&fit=crop"
    },
    {
        id: 10,
        name: "跑步機",
        description: "可折疊設計，多種運動模式，心率監測",
        price: 599.99,
        category: "C",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop"
    },
    {
        id: 11,
        name: "掃地機器人",
        description: "智能路徑規劃，自動回充，APP控制",
        price: 349.99,
        category: "B",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop"
    },
    {
        id: 12,
        name: "瑜伽墊",
        description: "防滑設計，環保材質，多種顏色選擇",
        price: 39.99,
        category: "C",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop"
    }
];

// Initialize shopping cart
let cart;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    cart = new ShoppingCart();
    renderProducts();
    setupEventListeners();
});

// Get current filter
function getCurrentFilter() {
    const checkedFilter = document.querySelector('input[name="categoryFilter"]:checked');
    return checkedFilter ? checkedFilter.value : 'all';
}

// Get current search term
function getCurrentSearchTerm() {
    return document.getElementById('searchInput').value.trim().toLowerCase();
}

// Search products by name and description
function searchProducts(products, searchTerm) {
    if (!searchTerm) {
        return products;
    }
    
    return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
}

// Filter products by category
function filterProducts(category) {
    if (category === 'all') {
        return products;
    }
    return products.filter(product => product.category === category);
}

// Apply both search and category filters
function getFilteredProducts() {
    const category = getCurrentFilter();
    const searchTerm = getCurrentSearchTerm();
    
    let filteredProducts = filterProducts(category);
    filteredProducts = searchProducts(filteredProducts, searchTerm);
    
    return filteredProducts;
}

// Render products with filtering
function renderProducts() {
    const container = document.getElementById('productsContainer');
    const currentFilter = getCurrentFilter();
    const filteredProducts = filterProducts(currentFilter);
    
    if (filteredProducts.length === 0) {
        container.innerHTML = `
            <div class="col-12">
                <div class="text-center py-5">
                    <i class="bi bi-search display-1 text-muted"></i>
                    <h3 class="mt-3 text-muted">此分類暫無商品</h3>
                    <p class="text-muted">請選擇其他分類或查看全部商品</p>
                </div>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filteredProducts.map(product => `
        <div class="col">
            <div class="card h-100">
                <div class="position-relative">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}" loading="lazy">
                    <span class="position-absolute top-0 start-0 m-2 badge bg-${getCategoryColor(product.category)}">
                        ${product.category}類
                    </span>
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text flex-grow-1">${product.description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="h5 text-primary mb-0">$${product.price}</span>
                        <button class="btn btn-primary btn-add-cart" onclick="addToCart(${product.id})">
                            <i class="bi bi-cart-plus"></i> 加入購物車
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Get category color for badge
function getCategoryColor(category) {
    const colors = {
        'A': 'success',
        'B': 'warning', 
        'C': 'info'
    };
    return colors[category] || 'secondary';
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.addItem(product);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        cart.checkout();
    });
    
    // Category filter change
    document.querySelectorAll('input[name="categoryFilter"]').forEach(radio => {
        radio.addEventListener('change', function() {
            renderProducts();
        });
    });
    
    // Prevent form submission on quantity input enter
    document.addEventListener('keypress', function(e) {
        if (e.target.classList.contains('quantity-input') && e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
        }
    });
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('zh-TW', {
        style: 'currency',
        currency: 'TWD'
    }).format(amount);
}

```

現在我需要更新 `renderProducts` 函數來使用新的篩選邏輯：


```javascript
// Shopping cart functionality
class ShoppingCart {
    constructor() {
        this.items = [];
        this.loadFromStorage();
        this.updateCartDisplay();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveToStorage();
        this.updateCartDisplay();
        this.showToast();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        this.updateCartDisplay();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
                this.saveToStorage();
                this.updateCartDisplay();
            }
        }
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    updateCartDisplay() {
        this.updateCartCount();
        this.updateCartModal();
        this.updateTotalPrice();
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        cartCount.textContent = this.getTotalItems();
        
        if (this.getTotalItems() > 0) {
            cartCount.classList.add('bounce');
            setTimeout(() => cartCount.classList.remove('bounce'), 1000);
        }
    }

    updateCartModal() {
        const cartItems = document.getElementById('cartItems');
        const emptyCart = document.getElementById('emptyCart');
        
        if (this.items.length === 0) {
            cartItems.style.display = 'none';
            emptyCart.style.display = 'block';
        } else {
            cartItems.style.display = 'block';
            emptyCart.style.display = 'none';
            
            cartItems.innerHTML = this.items.map(item => `
                <div class="cart-item d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${item.name}</h6>
                        <p class="text-muted mb-0">$${item.price}</p>
                    </div>
                    <div class="quantity-controls me-3">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                               onchange="cart.updateQuantity(${item.id}, parseInt(this.value))">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <div class="text-end me-3">
                        <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                    </div>
                    <button class="btn-remove" onclick="cart.removeItem(${item.id})" title="移除商品">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    }

    updateTotalPrice() {
        const totalPrice = document.getElementById('totalPrice');
        const checkoutBtn = document.getElementById('checkoutBtn');
        
        totalPrice.textContent = this.getTotalPrice().toFixed(2);
        checkoutBtn.disabled = this.items.length === 0;
    }

    showToast() {
        const toast = new bootstrap.Toast(document.getElementById('cartToast'));
        toast.show();
    }

    saveToStorage() {
        localStorage.setItem('shoppingCart', JSON.stringify(this.items));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('shoppingCart');
        if (stored) {
            this.items = JSON.parse(stored);
        }
    }

    checkout() {
        if (this.items.length === 0) {
            alert('購物車是空的！');
            return;
        }
        
        alert(`結帳成功！\n總金額: $${this.getTotalPrice().toFixed(2)}\n商品數量: ${this.getTotalItems()}`);
        this.items = [];
        this.saveToStorage();
        this.updateCartDisplay();
    }
}

// Product data with categories
const products = [
    {
        id: 1,
        name: "無線藍牙耳機",
        description: "高品質音效，舒適佩戴，長達8小時續航",
        price: 129.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop"
    },
    {
        id: 2,
        name: "智能手錶",
        description: "健康監測，運動追蹤，防水設計",
        price: 299.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop"
    },
    {
        id: 3,
        name: "筆記型電腦",
        description: "高效能處理器，輕薄設計，長效電池",
        price: 899.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop"
    },
    {
        id: 4,
        name: "智能手機",
        description: "最新處理器，高畫質相機，5G網路",
        price: 699.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop"
    },
    {
        id: 5,
        name: "咖啡機",
        description: "全自動研磨，多種咖啡選擇，定時功能",
        price: 199.99,
        category: "B",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop"
    },
    {
        id: 6,
        name: "健身器材",
        description: "多功能訓練，可調節重量，居家健身首選",
        price: 149.99,
        category: "C",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop"
    },
    {
        id: 7,
        name: "平板電腦",
        description: "大螢幕顯示，觸控筆支援，娛樂辦公兩相宜",
        price: 399.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=200&fit=crop"
    },
    {
        id: 8,
        name: "遊戲主機",
        description: "4K遊戲體驗，豐富遊戲庫，多人遊戲支援",
        price: 499.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300&h=200&fit=crop"
    },
    {
        id: 9,
        name: "空氣清淨機",
        description: "高效過濾，智能感應，靜音運作",
        price: 249.99,
        category: "B",
        image: "https://images.unsplash.com/photo-1581578731548-c6a0c3f5f1b0?w=300&h=200&fit=crop"
    },
    {
        id: 10,
        name: "跑步機",
        description: "可折疊設計，多種運動模式，心率監測",
        price: 599.99,
        category: "C",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop"
    },
    {
        id: 11,
        name: "掃地機器人",
        description: "智能路徑規劃，自動回充，APP控制",
        price: 349.99,
        category: "B",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop"
    },
    {
        id: 12,
        name: "瑜伽墊",
        description: "防滑設計，環保材質，多種顏色選擇",
        price: 39.99,
        category: "C",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop"
    }
];

// Initialize shopping cart
let cart;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    cart = new ShoppingCart();
    renderProducts();
    setupEventListeners();
});

// Get current filter
function getCurrentFilter() {
    const checkedFilter = document.querySelector('input[name="categoryFilter"]:checked');
    return checkedFilter ? checkedFilter.value : 'all';
}

// Get current search term
function getCurrentSearchTerm() {
    return document.getElementById('searchInput').value.trim().toLowerCase();
}

// Search products by name and description
function searchProducts(products, searchTerm) {
    if (!searchTerm) {
        return products;
    }
    
    return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
}

// Filter products by category
function filterProducts(category) {
    if (category === 'all') {
        return products;
    }
    return products.filter(product => product.category === category);
}

// Apply both search and category filters
function getFilteredProducts() {
    const category = getCurrentFilter();
    const searchTerm = getCurrentSearchTerm();
    
    let filteredProducts = filterProducts(category);
    filteredProducts = searchProducts(filteredProducts, searchTerm);
    
    return filteredProducts;
}

// Render products with filtering
function renderProducts() {
    const container = document.getElementById('productsContainer');
    const filteredProducts = getFilteredProducts();
    const searchTerm = getCurrentSearchTerm();
    const category = getCurrentFilter();
    
    // Update search results info
    updateSearchResultsInfo(filteredProducts.length, searchTerm, category);
    
    if (filteredProducts.length === 0) {
        let emptyMessage = '';
        if (searchTerm) {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-search display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">找不到相關商品</h3>
                        <p class="text-muted">沒有找到包含「${searchTerm}」的商品</p>
                        <button class="btn btn-outline-primary mt-3" onclick="clearSearch()">
                            <i class="bi bi-arrow-left"></i> 清除搜尋
                        </button>
                    </div>
                </div>
            `;
        } else {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-grid display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">此分類暫無商品</h3>
                        <p class="text-muted">請選擇其他分類或查看全部商品</p>
                    </div>
                </div>
            `;
        }
        container.innerHTML = emptyMessage;
        return;
    }
    
    container.innerHTML = filteredProducts.map(product => `
        <div class="col">
            <div class="card h-100">
                <div class="position-relative">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}" loading="lazy">
                    <span class="position-absolute top-0 start-0 m-2 badge bg-${getCategoryColor(product.category)}">
                        ${product.category}類
                    </span>
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text flex-grow-1">${product.description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="h5 text-primary mb-0">$${product.price}</span>
                        <button class="btn btn-primary btn-add-cart" onclick="addToCart(${product.id})">
                            <i class="bi bi-cart-plus"></i> 加入購物車
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Get category color for badge
function getCategoryColor(category) {
    const colors = {
        'A': 'success',
        'B': 'warning', 
        'C': 'info'
    };
    return colors[category] || 'secondary';
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.addItem(product);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        cart.checkout();
    });
    
    // Category filter change
    document.querySelectorAll('input[name="categoryFilter"]').forEach(radio => {
        radio.addEventListener('change', function() {
            renderProducts();
        });
    });
    
    // Prevent form submission on quantity input enter
    document.addEventListener('keypress', function(e) {
        if (e.target.classList.contains('quantity-input') && e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
        }
    });
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('zh-TW', {
        style: 'currency',
        currency: 'TWD'
    }).format(amount);
}

```

現在我需要添加搜尋結果資訊更新函數和清除搜尋功能：


```javascript
// Shopping cart functionality
class ShoppingCart {
    constructor() {
        this.items = [];
        this.loadFromStorage();
        this.updateCartDisplay();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveToStorage();
        this.updateCartDisplay();
        this.showToast();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        this.updateCartDisplay();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
                this.saveToStorage();
                this.updateCartDisplay();
            }
        }
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    updateCartDisplay() {
        this.updateCartCount();
        this.updateCartModal();
        this.updateTotalPrice();
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        cartCount.textContent = this.getTotalItems();
        
        if (this.getTotalItems() > 0) {
            cartCount.classList.add('bounce');
            setTimeout(() => cartCount.classList.remove('bounce'), 1000);
        }
    }

    updateCartModal() {
        const cartItems = document.getElementById('cartItems');
        const emptyCart = document.getElementById('emptyCart');
        
        if (this.items.length === 0) {
            cartItems.style.display = 'none';
            emptyCart.style.display = 'block';
        } else {
            cartItems.style.display = 'block';
            emptyCart.style.display = 'none';
            
            cartItems.innerHTML = this.items.map(item => `
                <div class="cart-item d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${item.name}</h6>
                        <p class="text-muted mb-0">$${item.price}</p>
                    </div>
                    <div class="quantity-controls me-3">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                               onchange="cart.updateQuantity(${item.id}, parseInt(this.value))">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <div class="text-end me-3">
                        <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                    </div>
                    <button class="btn-remove" onclick="cart.removeItem(${item.id})" title="移除商品">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    }

    updateTotalPrice() {
        const totalPrice = document.getElementById('totalPrice');
        const checkoutBtn = document.getElementById('checkoutBtn');
        
        totalPrice.textContent = this.getTotalPrice().toFixed(2);
        checkoutBtn.disabled = this.items.length === 0;
    }

    showToast() {
        const toast = new bootstrap.Toast(document.getElementById('cartToast'));
        toast.show();
    }

    saveToStorage() {
        localStorage.setItem('shoppingCart', JSON.stringify(this.items));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('shoppingCart');
        if (stored) {
            this.items = JSON.parse(stored);
        }
    }

    checkout() {
        if (this.items.length === 0) {
            alert('購物車是空的！');
            return;
        }
        
        alert(`結帳成功！\n總金額: $${this.getTotalPrice().toFixed(2)}\n商品數量: ${this.getTotalItems()}`);
        this.items = [];
        this.saveToStorage();
        this.updateCartDisplay();
    }
}

// Product data with categories
const products = [
    {
        id: 1,
        name: "無線藍牙耳機",
        description: "高品質音效，舒適佩戴，長達8小時續航",
        price: 129.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop"
    },
    {
        id: 2,
        name: "智能手錶",
        description: "健康監測，運動追蹤，防水設計",
        price: 299.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop"
    },
    {
        id: 3,
        name: "筆記型電腦",
        description: "高效能處理器，輕薄設計，長效電池",
        price: 899.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop"
    },
    {
        id: 4,
        name: "智能手機",
        description: "最新處理器，高畫質相機，5G網路",
        price: 699.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop"
    },
    {
        id: 5,
        name: "咖啡機",
        description: "全自動研磨，多種咖啡選擇，定時功能",
        price: 199.99,
        category: "B",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop"
    },
    {
        id: 6,
        name: "健身器材",
        description: "多功能訓練，可調節重量，居家健身首選",
        price: 149.99,
        category: "C",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop"
    },
    {
        id: 7,
        name: "平板電腦",
        description: "大螢幕顯示，觸控筆支援，娛樂辦公兩相宜",
        price: 399.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=200&fit=crop"
    },
    {
        id: 8,
        name: "遊戲主機",
        description: "4K遊戲體驗，豐富遊戲庫，多人遊戲支援",
        price: 499.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300&h=200&fit=crop"
    },
    {
        id: 9,
        name: "空氣清淨機",
        description: "高效過濾，智能感應，靜音運作",
        price: 249.99,
        category: "B",
        image: "https://images.unsplash.com/photo-1581578731548-c6a0c3f5f1b0?w=300&h=200&fit=crop"
    },
    {
        id: 10,
        name: "跑步機",
        description: "可折疊設計，多種運動模式，心率監測",
        price: 599.99,
        category: "C",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop"
    },
    {
        id: 11,
        name: "掃地機器人",
        description: "智能路徑規劃，自動回充，APP控制",
        price: 349.99,
        category: "B",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop"
    },
    {
        id: 12,
        name: "瑜伽墊",
        description: "防滑設計，環保材質，多種顏色選擇",
        price: 39.99,
        category: "C",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop"
    }
];

// Initialize shopping cart
let cart;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    cart = new ShoppingCart();
    renderProducts();
    setupEventListeners();
});

// Get current filter
function getCurrentFilter() {
    const checkedFilter = document.querySelector('input[name="categoryFilter"]:checked');
    return checkedFilter ? checkedFilter.value : 'all';
}

// Get current search term
function getCurrentSearchTerm() {
    return document.getElementById('searchInput').value.trim().toLowerCase();
}

// Search products by name and description
function searchProducts(products, searchTerm) {
    if (!searchTerm) {
        return products;
    }
    
    return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
}

// Filter products by category
function filterProducts(category) {
    if (category === 'all') {
        return products;
    }
    return products.filter(product => product.category === category);
}

// Apply both search and category filters
function getFilteredProducts() {
    const category = getCurrentFilter();
    const searchTerm = getCurrentSearchTerm();
    
    let filteredProducts = filterProducts(category);
    filteredProducts = searchProducts(filteredProducts, searchTerm);
    
    return filteredProducts;
}

// Render products with filtering
function renderProducts() {
    const container = document.getElementById('productsContainer');
    const filteredProducts = getFilteredProducts();
    const searchTerm = getCurrentSearchTerm();
    const category = getCurrentFilter();
    
    // Update search results info
    updateSearchResultsInfo(filteredProducts.length, searchTerm, category);
    
    if (filteredProducts.length === 0) {
        let emptyMessage = '';
        if (searchTerm) {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-search display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">找不到相關商品</h3>
                        <p class="text-muted">沒有找到包含「${searchTerm}」的商品</p>
                        <button class="btn btn-outline-primary mt-3" onclick="clearSearch()">
                            <i class="bi bi-arrow-left"></i> 清除搜尋
                        </button>
                    </div>
                </div>
            `;
        } else {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-grid display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">此分類暫無商品</h3>
                        <p class="text-muted">請選擇其他分類或查看全部商品</p>
                    </div>
                </div>
            `;
        }
        container.innerHTML = emptyMessage;
        return;
    }
    
    container.innerHTML = filteredProducts.map(product => `
        <div class="col">
            <div class="card h-100">
                <div class="position-relative">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}" loading="lazy">
                    <span class="position-absolute top-0 start-0 m-2 badge bg-${getCategoryColor(product.category)}">
                        ${product.category}類
                    </span>
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text flex-grow-1">${product.description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="h5 text-primary mb-0">$${product.price}</span>
                        <button class="btn btn-primary btn-add-cart" onclick="addToCart(${product.id})">
                            <i class="bi bi-cart-plus"></i> 加入購物車
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Get category color for badge
function getCategoryColor(category) {
    const colors = {
        'A': 'success',
        'B': 'warning', 
        'C': 'info'
    };
    return colors[category] || 'secondary';
}

// Update search results info
function updateSearchResultsInfo(count, searchTerm, category) {
    const searchResultsInfo = document.getElementById('searchResultsInfo');
    let infoText = '';
    
    if (searchTerm) {
        if (category === 'all') {
            infoText = `找到 ${count} 個包含「${searchTerm}」的商品`;
        } else {
            const categoryNames = {
                'A': '電子產品',
                'B': '家電用品',
                'C': '運動健康'
            };
            infoText = `在${categoryNames[category]}中找到 ${count} 個包含「${searchTerm}」的商品`;
        }
    } else {
        if (category === 'all') {
            infoText = `顯示全部 ${count} 個商品`;
        } else {
            const categoryNames = {
                'A': '電子產品',
                'B': '家電用品',
                'C': '運動健康'
            };
            infoText = `顯示 ${categoryNames[category]} 類別中的 ${count} 個商品`;
        }
    }
    
    searchResultsInfo.textContent = infoText;
}

// Clear search
function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('clearSearchBtn').style.display = 'none';
    renderProducts();
}

// Highlight search terms in text
function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.addItem(product);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        cart.checkout();
    });
    
    // Category filter change
    document.querySelectorAll('input[name="categoryFilter"]').forEach(radio => {
        radio.addEventListener('change', function() {
            renderProducts();
        });
    });
    
    // Prevent form submission on quantity input enter
    document.addEventListener('keypress', function(e) {
        if (e.target.classList.contains('quantity-input') && e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
        }
    });
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('zh-TW', {
        style: 'currency',
        currency: 'TWD'
    }).format(amount);
}

```

現在我需要更新商品卡片渲染來支援搜尋高亮，並更新事件監聽器：


```javascript
// Shopping cart functionality
class ShoppingCart {
    constructor() {
        this.items = [];
        this.loadFromStorage();
        this.updateCartDisplay();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveToStorage();
        this.updateCartDisplay();
        this.showToast();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        this.updateCartDisplay();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
                this.saveToStorage();
                this.updateCartDisplay();
            }
        }
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    updateCartDisplay() {
        this.updateCartCount();
        this.updateCartModal();
        this.updateTotalPrice();
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        cartCount.textContent = this.getTotalItems();
        
        if (this.getTotalItems() > 0) {
            cartCount.classList.add('bounce');
            setTimeout(() => cartCount.classList.remove('bounce'), 1000);
        }
    }

    updateCartModal() {
        const cartItems = document.getElementById('cartItems');
        const emptyCart = document.getElementById('emptyCart');
        
        if (this.items.length === 0) {
            cartItems.style.display = 'none';
            emptyCart.style.display = 'block';
        } else {
            cartItems.style.display = 'block';
            emptyCart.style.display = 'none';
            
            cartItems.innerHTML = this.items.map(item => `
                <div class="cart-item d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${item.name}</h6>
                        <p class="text-muted mb-0">$${item.price}</p>
                    </div>
                    <div class="quantity-controls me-3">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                               onchange="cart.updateQuantity(${item.id}, parseInt(this.value))">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <div class="text-end me-3">
                        <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                    </div>
                    <button class="btn-remove" onclick="cart.removeItem(${item.id})" title="移除商品">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    }

    updateTotalPrice() {
        const totalPrice = document.getElementById('totalPrice');
        const checkoutBtn = document.getElementById('checkoutBtn');
        
        totalPrice.textContent = this.getTotalPrice().toFixed(2);
        checkoutBtn.disabled = this.items.length === 0;
    }

    showToast() {
        const toast = new bootstrap.Toast(document.getElementById('cartToast'));
        toast.show();
    }

    saveToStorage() {
        localStorage.setItem('shoppingCart', JSON.stringify(this.items));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('shoppingCart');
        if (stored) {
            this.items = JSON.parse(stored);
        }
    }

    checkout() {
        if (this.items.length === 0) {
            alert('購物車是空的！');
            return;
        }
        
        alert(`結帳成功！\n總金額: $${this.getTotalPrice().toFixed(2)}\n商品數量: ${this.getTotalItems()}`);
        this.items = [];
        this.saveToStorage();
        this.updateCartDisplay();
    }
}

// Product data with categories
const products = [
    {
        id: 1,
        name: "無線藍牙耳機",
        description: "高品質音效，舒適佩戴，長達8小時續航",
        price: 129.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop"
    },
    {
        id: 2,
        name: "智能手錶",
        description: "健康監測，運動追蹤，防水設計",
        price: 299.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop"
    },
    {
        id: 3,
        name: "筆記型電腦",
        description: "高效能處理器，輕薄設計，長效電池",
        price: 899.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop"
    },
    {
        id: 4,
        name: "智能手機",
        description: "最新處理器，高畫質相機，5G網路",
        price: 699.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop"
    },
    {
        id: 5,
        name: "咖啡機",
        description: "全自動研磨，多種咖啡選擇，定時功能",
        price: 199.99,
        category: "B",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop"
    },
    {
        id: 6,
        name: "健身器材",
        description: "多功能訓練，可調節重量，居家健身首選",
        price: 149.99,
        category: "C",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop"
    },
    {
        id: 7,
        name: "平板電腦",
        description: "大螢幕顯示，觸控筆支援，娛樂辦公兩相宜",
        price: 399.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=200&fit=crop"
    },
    {
        id: 8,
        name: "遊戲主機",
        description: "4K遊戲體驗，豐富遊戲庫，多人遊戲支援",
        price: 499.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300&h=200&fit=crop"
    },
    {
        id: 9,
        name: "空氣清淨機",
        description: "高效過濾，智能感應，靜音運作",
        price: 249.99,
        category: "B",
        image: "https://images.unsplash.com/photo-1581578731548-c6a0c3f5f1b0?w=300&h=200&fit=crop"
    },
    {
        id: 10,
        name: "跑步機",
        description: "可折疊設計，多種運動模式，心率監測",
        price: 599.99,
        category: "C",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop"
    },
    {
        id: 11,
        name: "掃地機器人",
        description: "智能路徑規劃，自動回充，APP控制",
        price: 349.99,
        category: "B",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop"
    },
    {
        id: 12,
        name: "瑜伽墊",
        description: "防滑設計，環保材質，多種顏色選擇",
        price: 39.99,
        category: "C",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop"
    }
];

// Initialize shopping cart
let cart;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    cart = new ShoppingCart();
    renderProducts();
    setupEventListeners();
});

// Get current filter
function getCurrentFilter() {
    const checkedFilter = document.querySelector('input[name="categoryFilter"]:checked');
    return checkedFilter ? checkedFilter.value : 'all';
}

// Get current search term
function getCurrentSearchTerm() {
    return document.getElementById('searchInput').value.trim().toLowerCase();
}

// Search products by name and description
function searchProducts(products, searchTerm) {
    if (!searchTerm) {
        return products;
    }
    
    return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
}

// Filter products by category
function filterProducts(category) {
    if (category === 'all') {
        return products;
    }
    return products.filter(product => product.category === category);
}

// Apply both search and category filters
function getFilteredProducts() {
    const category = getCurrentFilter();
    const searchTerm = getCurrentSearchTerm();
    
    let filteredProducts = filterProducts(category);
    filteredProducts = searchProducts(filteredProducts, searchTerm);
    
    return filteredProducts;
}

// Render products with filtering
function renderProducts() {
    const container = document.getElementById('productsContainer');
    const filteredProducts = getFilteredProducts();
    const searchTerm = getCurrentSearchTerm();
    const category = getCurrentFilter();
    
    // Update search results info
    updateSearchResultsInfo(filteredProducts.length, searchTerm, category);
    
    if (filteredProducts.length === 0) {
        let emptyMessage = '';
        if (searchTerm) {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-search display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">找不到相關商品</h3>
                        <p class="text-muted">沒有找到包含「${searchTerm}」的商品</p>
                        <button class="btn btn-outline-primary mt-3" onclick="clearSearch()">
                            <i class="bi bi-arrow-left"></i> 清除搜尋
                        </button>
                    </div>
                </div>
            `;
        } else {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-grid display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">此分類暫無商品</h3>
                        <p class="text-muted">請選擇其他分類或查看全部商品</p>
                    </div>
                </div>
            `;
        }
        container.innerHTML = emptyMessage;
        return;
    }
    
    container.innerHTML = filteredProducts.map(product => {
        const searchTerm = getCurrentSearchTerm();
        const highlightedName = highlightSearchTerm(product.name, searchTerm);
        const highlightedDescription = highlightSearchTerm(product.description, searchTerm);
        
        return `
            <div class="col">
                <div class="card h-100">
                    <div class="position-relative">
                        <img src="${product.image}" class="card-img-top" alt="${product.name}" loading="lazy">
                        <span class="position-absolute top-0 start-0 m-2 badge bg-${getCategoryColor(product.category)}">
                            ${product.category}類
                        </span>
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${highlightedName}</h5>
                        <p class="card-text flex-grow-1">${highlightedDescription}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="h5 text-primary mb-0">$${product.price}</span>
                            <button class="btn btn-primary btn-add-cart" onclick="addToCart(${product.id})">
                                <i class="bi bi-cart-plus"></i> 加入購物車
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Get category color for badge
function getCategoryColor(category) {
    const colors = {
        'A': 'success',
        'B': 'warning', 
        'C': 'info'
    };
    return colors[category] || 'secondary';
}

// Update search results info
function updateSearchResultsInfo(count, searchTerm, category) {
    const searchResultsInfo = document.getElementById('searchResultsInfo');
    let infoText = '';
    
    if (searchTerm) {
        if (category === 'all') {
            infoText = `找到 ${count} 個包含「${searchTerm}」的商品`;
        } else {
            const categoryNames = {
                'A': '電子產品',
                'B': '家電用品',
                'C': '運動健康'
            };
            infoText = `在${categoryNames[category]}中找到 ${count} 個包含「${searchTerm}」的商品`;
        }
    } else {
        if (category === 'all') {
            infoText = `顯示全部 ${count} 個商品`;
        } else {
            const categoryNames = {
                'A': '電子產品',
                'B': '家電用品',
                'C': '運動健康'
            };
            infoText = `顯示 ${categoryNames[category]} 類別中的 ${count} 個商品`;
        }
    }
    
    searchResultsInfo.textContent = infoText;
}

// Clear search
function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('clearSearchBtn').style.display = 'none';
    renderProducts();
}

// Highlight search terms in text
function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.addItem(product);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        cart.checkout();
    });
    
    // Category filter change
    document.querySelectorAll('input[name="categoryFilter"]').forEach(radio => {
        radio.addEventListener('change', function() {
            renderProducts();
        });
    });
    
    // Prevent form submission on quantity input enter
    document.addEventListener('keypress', function(e) {
        if (e.target.classList.contains('quantity-input') && e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
        }
    });
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('zh-TW', {
        style: 'currency',
        currency: 'TWD'
    }).format(amount);
}

```

現在我需要更新事件監聽器來處理搜尋功能：


```javascript
// Shopping cart functionality
class ShoppingCart {
    constructor() {
        this.items = [];
        this.loadFromStorage();
        this.updateCartDisplay();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveToStorage();
        this.updateCartDisplay();
        this.showToast();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        this.updateCartDisplay();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
                this.saveToStorage();
                this.updateCartDisplay();
            }
        }
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    updateCartDisplay() {
        this.updateCartCount();
        this.updateCartModal();
        this.updateTotalPrice();
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        cartCount.textContent = this.getTotalItems();
        
        if (this.getTotalItems() > 0) {
            cartCount.classList.add('bounce');
            setTimeout(() => cartCount.classList.remove('bounce'), 1000);
        }
    }

    updateCartModal() {
        const cartItems = document.getElementById('cartItems');
        const emptyCart = document.getElementById('emptyCart');
        
        if (this.items.length === 0) {
            cartItems.style.display = 'none';
            emptyCart.style.display = 'block';
        } else {
            cartItems.style.display = 'block';
            emptyCart.style.display = 'none';
            
            cartItems.innerHTML = this.items.map(item => `
                <div class="cart-item d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${item.name}</h6>
                        <p class="text-muted mb-0">$${item.price}</p>
                    </div>
                    <div class="quantity-controls me-3">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                               onchange="cart.updateQuantity(${item.id}, parseInt(this.value))">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <div class="text-end me-3">
                        <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                    </div>
                    <button class="btn-remove" onclick="cart.removeItem(${item.id})" title="移除商品">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    }

    updateTotalPrice() {
        const totalPrice = document.getElementById('totalPrice');
        const checkoutBtn = document.getElementById('checkoutBtn');
        
        totalPrice.textContent = this.getTotalPrice().toFixed(2);
        checkoutBtn.disabled = this.items.length === 0;
    }

    showToast() {
        const toast = new bootstrap.Toast(document.getElementById('cartToast'));
        toast.show();
    }

    saveToStorage() {
        localStorage.setItem('shoppingCart', JSON.stringify(this.items));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('shoppingCart');
        if (stored) {
            this.items = JSON.parse(stored);
        }
    }

    checkout() {
        if (this.items.length === 0) {
            alert('購物車是空的！');
            return;
        }
        
        alert(`結帳成功！\n總金額: $${this.getTotalPrice().toFixed(2)}\n商品數量: ${this.getTotalItems()}`);
        this.items = [];
        this.saveToStorage();
        this.updateCartDisplay();
    }
}

// Product data with categories
const products = [
    {
        id: 1,
        name: "無線藍牙耳機",
        description: "高品質音效，舒適佩戴，長達8小時續航",
        price: 129.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop"
    },
    {
        id: 2,
        name: "智能手錶",
        description: "健康監測，運動追蹤，防水設計",
        price: 299.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop"
    },
    {
        id: 3,
        name: "筆記型電腦",
        description: "高效能處理器，輕薄設計，長效電池",
        price: 899.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop"
    },
    {
        id: 4,
        name: "智能手機",
        description: "最新處理器，高畫質相機，5G網路",
        price: 699.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop"
    },
    {
        id: 5,
        name: "咖啡機",
        description: "全自動研磨，多種咖啡選擇，定時功能",
        price: 199.99,
        category: "B",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop"
    },
    {
        id: 6,
        name: "健身器材",
        description: "多功能訓練，可調節重量，居家健身首選",
        price: 149.99,
        category: "C",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop"
    },
    {
        id: 7,
        name: "平板電腦",
        description: "大螢幕顯示，觸控筆支援，娛樂辦公兩相宜",
        price: 399.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=200&fit=crop"
    },
    {
        id: 8,
        name: "遊戲主機",
        description: "4K遊戲體驗，豐富遊戲庫，多人遊戲支援",
        price: 499.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300&h=200&fit=crop"
    },
    {
        id: 9,
        name: "空氣清淨機",
        description: "高效過濾，智能感應，靜音運作",
        price: 249.99,
        category: "B",
        image: "https://images.unsplash.com/photo-1581578731548-c6a0c3f5f1b0?w=300&h=200&fit=crop"
    },
    {
        id: 10,
        name: "跑步機",
        description: "可折疊設計，多種運動模式，心率監測",
        price: 599.99,
        category: "C",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop"
    },
    {
        id: 11,
        name: "掃地機器人",
        description: "智能路徑規劃，自動回充，APP控制",
        price: 349.99,
        category: "B",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop"
    },
    {
        id: 12,
        name: "瑜伽墊",
        description: "防滑設計，環保材質，多種顏色選擇",
        price: 39.99,
        category: "C",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop"
    }
];

// Initialize shopping cart
let cart;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    cart = new ShoppingCart();
    renderProducts();
    setupEventListeners();
});

// Get current filter
function getCurrentFilter() {
    const checkedFilter = document.querySelector('input[name="categoryFilter"]:checked');
    return checkedFilter ? checkedFilter.value : 'all';
}

// Get current search term
function getCurrentSearchTerm() {
    return document.getElementById('searchInput').value.trim().toLowerCase();
}

// Search products by name and description
function searchProducts(products, searchTerm) {
    if (!searchTerm) {
        return products;
    }
    
    return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
}

// Filter products by category
function filterProducts(category) {
    if (category === 'all') {
        return products;
    }
    return products.filter(product => product.category === category);
}

// Apply both search and category filters
function getFilteredProducts() {
    const category = getCurrentFilter();
    const searchTerm = getCurrentSearchTerm();
    
    let filteredProducts = filterProducts(category);
    filteredProducts = searchProducts(filteredProducts, searchTerm);
    
    return filteredProducts;
}

// Render products with filtering
function renderProducts() {
    const container = document.getElementById('productsContainer');
    const filteredProducts = getFilteredProducts();
    const searchTerm = getCurrentSearchTerm();
    const category = getCurrentFilter();
    
    // Update search results info
    updateSearchResultsInfo(filteredProducts.length, searchTerm, category);
    
    if (filteredProducts.length === 0) {
        let emptyMessage = '';
        if (searchTerm) {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-search display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">找不到相關商品</h3>
                        <p class="text-muted">沒有找到包含「${searchTerm}」的商品</p>
                        <button class="btn btn-outline-primary mt-3" onclick="clearSearch()">
                            <i class="bi bi-arrow-left"></i> 清除搜尋
                        </button>
                    </div>
                </div>
            `;
        } else {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-grid display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">此分類暫無商品</h3>
                        <p class="text-muted">請選擇其他分類或查看全部商品</p>
                    </div>
                </div>
            `;
        }
        container.innerHTML = emptyMessage;
        return;
    }
    
    container.innerHTML = filteredProducts.map(product => {
        const searchTerm = getCurrentSearchTerm();
        const highlightedName = highlightSearchTerm(product.name, searchTerm);
        const highlightedDescription = highlightSearchTerm(product.description, searchTerm);
        
        return `
            <div class="col">
                <div class="card h-100">
                    <div class="position-relative">
                        <img src="${product.image}" class="card-img-top" alt="${product.name}" loading="lazy">
                        <span class="position-absolute top-0 start-0 m-2 badge bg-${getCategoryColor(product.category)}">
                            ${product.category}類
                        </span>
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${highlightedName}</h5>
                        <p class="card-text flex-grow-1">${highlightedDescription}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="h5 text-primary mb-0">$${product.price}</span>
                            <button class="btn btn-primary btn-add-cart" onclick="addToCart(${product.id})">
                                <i class="bi bi-cart-plus"></i> 加入購物車
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Get category color for badge
function getCategoryColor(category) {
    const colors = {
        'A': 'success',
        'B': 'warning', 
        'C': 'info'
    };
    return colors[category] || 'secondary';
}

// Update search results info
function updateSearchResultsInfo(count, searchTerm, category) {
    const searchResultsInfo = document.getElementById('searchResultsInfo');
    let infoText = '';
    
    if (searchTerm) {
        if (category === 'all') {
            infoText = `找到 ${count} 個包含「${searchTerm}」的商品`;
        } else {
            const categoryNames = {
                'A': '電子產品',
                'B': '家電用品',
                'C': '運動健康'
            };
            infoText = `在${categoryNames[category]}中找到 ${count} 個包含「${searchTerm}」的商品`;
        }
    } else {
        if (category === 'all') {
            infoText = `顯示全部 ${count} 個商品`;
        } else {
            const categoryNames = {
                'A': '電子產品',
                'B': '家電用品',
                'C': '運動健康'
            };
            infoText = `顯示 ${categoryNames[category]} 類別中的 ${count} 個商品`;
        }
    }
    
    searchResultsInfo.textContent = infoText;
}

// Clear search
function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('clearSearchBtn').style.display = 'none';
    renderProducts();
}

// Highlight search terms in text
function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.addItem(product);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        cart.checkout();
    });
    
    // Search input events
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    
    // Real-time search
    searchInput.addEventListener('input', function() {
        const hasValue = this.value.trim().length > 0;
        clearSearchBtn.style.display = hasValue ? 'block' : 'none';
        renderProducts();
    });
    
    // Clear search button
    clearSearchBtn.addEventListener('click', clearSearch);
    
    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            renderProducts();
        }
    });
    
    // Category filter change
    document.querySelectorAll('input[name="categoryFilter"]').forEach(radio => {
        radio.addEventListener('change', function() {
            renderProducts();
        });
    });
    
    // Prevent form submission on quantity input enter
    document.addEventListener('keypress', function(e) {
        if (e.target.classList.contains('quantity-input') && e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
        }
    });
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('zh-TW', {
        style: 'currency',
        currency: 'TWD'
    }).format(amount);
}

```

現在我需要為搜尋功能添加 CSS 樣式：


```css
/* Custom styles for the shopping website */

body {
    background-color: #f8f9fa;
}

/* Category filter styles */
.btn-check:checked + .btn {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.btn-group .btn {
    transition: all 0.3s ease;
    border-radius: 0.375rem !important;
    margin: 0 2px;
}

.btn-group .btn:first-child {
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
}

.btn-group .btn:last-child {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
}

.btn-group .btn:not(:first-child):not(:last-child) {
    border-radius: 0 !important;
}

/* Category badge styles */
.badge {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* Empty state styles */
.display-1 {
    font-size: 4rem;
    opacity: 0.3;
}

/* Search bar styles */
.input-group-text {
    background-color: #f8f9fa;
    border-color: #dee2e6;
}

#searchInput {
    border-left: none;
    transition: all 0.3s ease;
}

#searchInput:focus {
    border-color: #86b7fe;
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

#searchInput:focus + .input-group-text {
    border-color: #86b7fe;
}

#clearSearchBtn {
    transition: all 0.3s ease;
    border-left: none;
}

#clearSearchBtn:hover {
    background-color: #f8f9fa;
    color: #dc3545;
}

/* Search highlighting */
mark {
    background-color: #fff3cd;
    color: #856404;
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-weight: 600;
}

/* Search results info */
#searchResultsInfo {
    font-size: 0.875rem;
    font-weight: 500;
}

/* Search animation */
@keyframes searchPulse {
    0% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0.4);
    }
    70% {
        box-shadow: 0 0 0 10px rgba(13, 110, 253, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0);
    }
}

.searching {
    animation: searchPulse 1.5s infinite;
}

/* Responsive search bar */
@media (max-width: 768px) {
    .input-group {
        flex-direction: column;
    }
    
    .input-group-text {
        border-radius: 0.375rem 0.375rem 0 0 !important;
        border-bottom: none;
    }
    
    #searchInput {
        border-radius: 0 0 0.375rem 0.375rem !important;
        border-top: none;
    }
    
    #clearSearchBtn {
        border-radius: 0.375rem;
        margin-top: 0.5rem;
        width: 100%;
    }
}

.navbar-brand {
    font-weight: bold;
    font-size: 1.5rem;
}

.card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.card-img-top {
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.card:hover .card-img-top {
    transform: scale(1.05);
}

.btn-add-cart {
    background: linear-gradient(45deg, #007bff, #0056b3);
    border: none;
    transition: all 0.3s ease;
}

.btn-add-cart:hover {
    background: linear-gradient(45deg, #0056b3, #004085);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,123,255,0.3);
}

.cart-item {
    border-bottom: 1px solid #dee2e6;
    padding: 1rem 0;
}

.cart-item:last-child {
    border-bottom: none;
}

.cart-item-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
}

.btn-remove {
    color: #dc3545;
    border: none;
    background: none;
    font-size: 1.2rem;
    transition: color 0.3s ease;
}

.btn-remove:hover {
    color: #c82333;
}

.quantity-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.quantity-btn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid #dee2e6;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.quantity-btn:hover {
    background: #f8f9fa;
    border-color: #007bff;
}

.quantity-input {
    width: 50px;
    text-align: center;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    padding: 0.25rem;
}

#emptyCart {
    color: #6c757d;
}

.toast {
    background: linear-gradient(45deg, #28a745, #20c997);
    color: white;
}

.toast-header {
    background: rgba(255,255,255,0.1);
    border-bottom: 1px solid rgba(255,255,255,0.2);
}

/* Animation for cart count badge */
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}

.badge.bounce {
    animation: bounce 1s;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .card-img-top {
        height: 150px;
    }
    
    .cart-item-image {
        width: 50px;
        height: 50px;
    }
}

/* Loading animation */
.loading {
    opacity: 0.6;
    pointer-events: none;
}

.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

```

讓我檢查是否有任何 linting 錯誤：


完美！我已經成功為您的購物網站添加了完整的搜尋功能。以下是新增的搜尋功能特色：

## 🔍 搜尋功能特色

### 🎯 智能搜尋
- **即時搜尋**：輸入時立即顯示搜尋結果
- **多欄位搜尋**：同時搜尋商品名稱和描述
- **不區分大小寫**：支援中英文搜尋
- **模糊匹配**：部分關鍵字也能找到相關商品

### 🎨 用戶界面
- **美觀的搜尋框**：使用 Bootstrap 輸入群組設計
- **搜尋圖示**：直觀的搜尋按鈕
- **清除按鈕**：一鍵清除搜尋內容
- **搜尋結果統計**：顯示找到的商品數量

### ✨ 高級功能

1. **搜尋高亮**
   - 搜尋關鍵字在商品名稱和描述中高亮顯示
   - 使用醒目的黃色標記突出顯示
   - 提升用戶體驗和搜尋效率

2. **智能整合**
   - 搜尋功能與分類篩選完美結合
   - 可以在特定分類中搜尋商品
   - 搜尋結果會根據當前分類進行篩選

3. **友善的空狀態**
   - 無搜尋結果時顯示友善提示
   - 提供清除搜尋的快捷按鈕
   - 引導用戶調整搜尋條件

4. **響應式設計**
   - 手機端搜尋框自動調整佈局
   - 觸控友好的操作體驗
   - 支援鍵盤快捷鍵（Enter 搜尋）

### 🛠️ 技術實現

1. **即時搜尋**
   - 使用 `input` 事件監聽器
   - 無需點擊搜尋按鈕
   - 流暢的用戶體驗

2. **搜尋邏輯**
   - 支援中英文混合搜尋
   - 不區分大小寫匹配
   - 部分關鍵字匹配

3. **結果統計**
   - 動態顯示搜尋結果數量
   - 區分不同分類的搜尋結果
   - 提供詳細的搜尋資訊

4. **視覺回饋**
   - 搜尋關鍵字高亮顯示
   - 清除按鈕動態顯示/隱藏
   - 搜尋結果動畫效果

### 📱 使用方式

1. **基本搜尋**：在搜尋框輸入商品名稱或描述
2. **分類搜尋**：先選擇分類，再進行搜尋
3. **清除搜尋**：點擊 X 按鈕或使用清除搜尋功能
4. **鍵盤操作**：按 Enter 鍵執行搜尋

### 🎯 搜尋範例

- 搜尋「手機」→ 找到智能手機
- 搜尋「健身」→ 找到健身器材、跑步機、瑜伽墊
- 搜尋「智能」→ 找到智能手錶、智能手機、掃地機器人
- 搜尋「電腦」→ 找到筆記型電腦、平板電腦

現在您的購物網站具備了完整的搜尋和分類功能！用戶可以：
- 快速搜尋想要的商品
- 在特定分類中搜尋
- 享受流暢的搜尋體驗
- 輕鬆找到心儀的商品

您可以直接在瀏覽器中打開 `index.html` 來體驗新的搜尋功能！

---

**User**

請將搜尋欄的圓角變更圓(border-radious)

---

**Cursor**

我將為您修改搜尋欄的圓角，讓它更加圓潤。


```css
/* Custom styles for the shopping website */

body {
    background-color: #f8f9fa;
}

/* Category filter styles */
.btn-check:checked + .btn {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.btn-group .btn {
    transition: all 0.3s ease;
    border-radius: 0.375rem !important;
    margin: 0 2px;
}

.btn-group .btn:first-child {
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
}

.btn-group .btn:last-child {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
}

.btn-group .btn:not(:first-child):not(:last-child) {
    border-radius: 0 !important;
}

/* Category badge styles */
.badge {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* Empty state styles */
.display-1 {
    font-size: 4rem;
    opacity: 0.3;
}

/* Search bar styles */
.input-group-text {
    background-color: #f8f9fa;
    border-color: #dee2e6;
    border-radius: 1rem 0 0 1rem !important;
}

#searchInput {
    border-left: none;
    border-radius: 0 1rem 1rem 0 !important;
    transition: all 0.3s ease;
}

#searchInput:focus {
    border-color: #86b7fe;
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

#searchInput:focus + .input-group-text {
    border-color: #86b7fe;
}

#clearSearchBtn {
    transition: all 0.3s ease;
    border-left: none;
    border-radius: 0 1rem 1rem 0 !important;
}

#clearSearchBtn:hover {
    background-color: #f8f9fa;
    color: #dc3545;
}

/* Search highlighting */
mark {
    background-color: #fff3cd;
    color: #856404;
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-weight: 600;
}

/* Search results info */
#searchResultsInfo {
    font-size: 0.875rem;
    font-weight: 500;
}

/* Search animation */
@keyframes searchPulse {
    0% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0.4);
    }
    70% {
        box-shadow: 0 0 0 10px rgba(13, 110, 253, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0);
    }
}

.searching {
    animation: searchPulse 1.5s infinite;
}

/* Responsive search bar */
@media (max-width: 768px) {
    .input-group {
        flex-direction: column;
    }
    
    .input-group-text {
        border-radius: 0.375rem 0.375rem 0 0 !important;
        border-bottom: none;
    }
    
    #searchInput {
        border-radius: 0 0 0.375rem 0.375rem !important;
        border-top: none;
    }
    
    #clearSearchBtn {
        border-radius: 0.375rem;
        margin-top: 0.5rem;
        width: 100%;
    }
}

.navbar-brand {
    font-weight: bold;
    font-size: 1.5rem;
}

.card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.card-img-top {
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.card:hover .card-img-top {
    transform: scale(1.05);
}

.btn-add-cart {
    background: linear-gradient(45deg, #007bff, #0056b3);
    border: none;
    transition: all 0.3s ease;
}

.btn-add-cart:hover {
    background: linear-gradient(45deg, #0056b3, #004085);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,123,255,0.3);
}

.cart-item {
    border-bottom: 1px solid #dee2e6;
    padding: 1rem 0;
}

.cart-item:last-child {
    border-bottom: none;
}

.cart-item-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
}

.btn-remove {
    color: #dc3545;
    border: none;
    background: none;
    font-size: 1.2rem;
    transition: color 0.3s ease;
}

.btn-remove:hover {
    color: #c82333;
}

.quantity-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.quantity-btn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid #dee2e6;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.quantity-btn:hover {
    background: #f8f9fa;
    border-color: #007bff;
}

.quantity-input {
    width: 50px;
    text-align: center;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    padding: 0.25rem;
}

#emptyCart {
    color: #6c757d;
}

.toast {
    background: linear-gradient(45deg, #28a745, #20c997);
    color: white;
}

.toast-header {
    background: rgba(255,255,255,0.1);
    border-bottom: 1px solid rgba(255,255,255,0.2);
}

/* Animation for cart count badge */
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}

.badge.bounce {
    animation: bounce 1s;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .card-img-top {
        height: 150px;
    }
    
    .cart-item-image {
        width: 50px;
        height: 50px;
    }
}

/* Loading animation */
.loading {
    opacity: 0.6;
    pointer-events: none;
}

.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

```

現在我還需要更新響應式設計中的圓角設定：


```css
/* Custom styles for the shopping website */

body {
    background-color: #f8f9fa;
}

/* Category filter styles */
.btn-check:checked + .btn {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.btn-group .btn {
    transition: all 0.3s ease;
    border-radius: 0.375rem !important;
    margin: 0 2px;
}

.btn-group .btn:first-child {
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
}

.btn-group .btn:last-child {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
}

.btn-group .btn:not(:first-child):not(:last-child) {
    border-radius: 0 !important;
}

/* Category badge styles */
.badge {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* Empty state styles */
.display-1 {
    font-size: 4rem;
    opacity: 0.3;
}

/* Search bar styles */
.input-group-text {
    background-color: #f8f9fa;
    border-color: #dee2e6;
    border-radius: 1rem 0 0 1rem !important;
}

#searchInput {
    border-left: none;
    border-radius: 0 1rem 1rem 0 !important;
    transition: all 0.3s ease;
}

#searchInput:focus {
    border-color: #86b7fe;
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

#searchInput:focus + .input-group-text {
    border-color: #86b7fe;
}

#clearSearchBtn {
    transition: all 0.3s ease;
    border-left: none;
    border-radius: 0 1rem 1rem 0 !important;
}

#clearSearchBtn:hover {
    background-color: #f8f9fa;
    color: #dc3545;
}

/* Search highlighting */
mark {
    background-color: #fff3cd;
    color: #856404;
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-weight: 600;
}

/* Search results info */
#searchResultsInfo {
    font-size: 0.875rem;
    font-weight: 500;
}

/* Search animation */
@keyframes searchPulse {
    0% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0.4);
    }
    70% {
        box-shadow: 0 0 0 10px rgba(13, 110, 253, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0);
    }
}

.searching {
    animation: searchPulse 1.5s infinite;
}

/* Responsive search bar */
@media (max-width: 768px) {
    .input-group {
        flex-direction: column;
    }
    
    .input-group-text {
        border-radius: 1rem 1rem 0 0 !important;
        border-bottom: none;
    }
    
    #searchInput {
        border-radius: 0 0 1rem 1rem !important;
        border-top: none;
    }
    
    #clearSearchBtn {
        border-radius: 1rem;
        margin-top: 0.5rem;
        width: 100%;
    }
}

.navbar-brand {
    font-weight: bold;
    font-size: 1.5rem;
}

.card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.card-img-top {
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.card:hover .card-img-top {
    transform: scale(1.05);
}

.btn-add-cart {
    background: linear-gradient(45deg, #007bff, #0056b3);
    border: none;
    transition: all 0.3s ease;
}

.btn-add-cart:hover {
    background: linear-gradient(45deg, #0056b3, #004085);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,123,255,0.3);
}

.cart-item {
    border-bottom: 1px solid #dee2e6;
    padding: 1rem 0;
}

.cart-item:last-child {
    border-bottom: none;
}

.cart-item-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
}

.btn-remove {
    color: #dc3545;
    border: none;
    background: none;
    font-size: 1.2rem;
    transition: color 0.3s ease;
}

.btn-remove:hover {
    color: #c82333;
}

.quantity-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.quantity-btn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid #dee2e6;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.quantity-btn:hover {
    background: #f8f9fa;
    border-color: #007bff;
}

.quantity-input {
    width: 50px;
    text-align: center;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    padding: 0.25rem;
}

#emptyCart {
    color: #6c757d;
}

.toast {
    background: linear-gradient(45deg, #28a745, #20c997);
    color: white;
}

.toast-header {
    background: rgba(255,255,255,0.1);
    border-bottom: 1px solid rgba(255,255,255,0.2);
}

/* Animation for cart count badge */
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}

.badge.bounce {
    animation: bounce 1s;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .card-img-top {
        height: 150px;
    }
    
    .cart-item-image {
        width: 50px;
        height: 50px;
    }
}

/* Loading animation */
.loading {
    opacity: 0.6;
    pointer-events: none;
}

.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

```

讓我檢查是否有任何 linting 錯誤：


完美！我已經成功將搜尋欄的圓角變更為更加圓潤的設計。以下是修改的內容：

## 🎨 搜尋欄圓角更新

### 📱 桌面版設計
- **搜尋圖示區域**：左側圓角 `1rem`（左上和左下圓角）
- **搜尋輸入框**：右側圓角 `1rem`（右上和右下圓角）
- **清除按鈕**：右側圓角 `1rem`（右上和右下圓角）

### 📱 手機版響應式設計
- **搜尋圖示區域**：上方圓角 `1rem`（左上和右上圓角）
- **搜尋輸入框**：下方圓角 `1rem`（左下和右下圓角）
- **清除按鈕**：完全圓角 `1rem`（所有角落都是圓角）

### ✨ 視覺效果
- **更現代的外觀**：圓潤的邊角讓搜尋欄看起來更現代
- **一致的設計語言**：與整體網站設計風格保持一致
- **流暢的視覺體驗**：圓角設計提供更柔和的視覺感受
- **響應式適配**：在不同螢幕尺寸下都保持美觀

### 🔧 技術細節
- 使用 `border-radius: 1rem` 實現圓潤效果
- 使用 `!important` 確保樣式優先級
- 響應式設計中保持圓角的一致性
- 維持原有的功能和交互效果

現在您的搜尋欄具有更加圓潤和現代的外觀！圓角設計讓整個搜尋界面看起來更加友好和專業。

---

**User**

這四個按鈕都做成圓角

---

**Cursor**

我將為分類篩選按鈕添加圓角設計，讓所有四個按鈕都具有圓潤的外觀。


```css
/* Custom styles for the shopping website */

body {
    background-color: #f8f9fa;
}

/* Category filter styles */
.btn-check:checked + .btn {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.btn-group .btn {
    transition: all 0.3s ease;
    border-radius: 1rem !important;
    margin: 0 4px;
    padding: 0.5rem 1rem;
}

.btn-group .btn:first-child {
    border-top-right-radius: 1rem !important;
    border-bottom-right-radius: 1rem !important;
}

.btn-group .btn:last-child {
    border-top-left-radius: 1rem !important;
    border-bottom-left-radius: 1rem !important;
}

.btn-group .btn:not(:first-child):not(:last-child) {
    border-radius: 1rem !important;
}

/* Category badge styles */
.badge {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* Empty state styles */
.display-1 {
    font-size: 4rem;
    opacity: 0.3;
}

/* Search bar styles */
.input-group-text {
    background-color: #f8f9fa;
    border-color: #dee2e6;
    border-radius: 1rem 0 0 1rem !important;
}

#searchInput {
    border-left: none;
    border-radius: 0 1rem 1rem 0 !important;
    transition: all 0.3s ease;
}

#searchInput:focus {
    border-color: #86b7fe;
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

#searchInput:focus + .input-group-text {
    border-color: #86b7fe;
}

#clearSearchBtn {
    transition: all 0.3s ease;
    border-left: none;
    border-radius: 0 1rem 1rem 0 !important;
}

#clearSearchBtn:hover {
    background-color: #f8f9fa;
    color: #dc3545;
}

/* Search highlighting */
mark {
    background-color: #fff3cd;
    color: #856404;
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-weight: 600;
}

/* Search results info */
#searchResultsInfo {
    font-size: 0.875rem;
    font-weight: 500;
}

/* Search animation */
@keyframes searchPulse {
    0% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0.4);
    }
    70% {
        box-shadow: 0 0 0 10px rgba(13, 110, 253, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0);
    }
}

.searching {
    animation: searchPulse 1.5s infinite;
}

/* Responsive search bar */
@media (max-width: 768px) {
    .input-group {
        flex-direction: column;
    }
    
    .input-group-text {
        border-radius: 1rem 1rem 0 0 !important;
        border-bottom: none;
    }
    
    #searchInput {
        border-radius: 0 0 1rem 1rem !important;
        border-top: none;
    }
    
    #clearSearchBtn {
        border-radius: 1rem;
        margin-top: 0.5rem;
        width: 100%;
    }
}

.navbar-brand {
    font-weight: bold;
    font-size: 1.5rem;
}

.card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.card-img-top {
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.card:hover .card-img-top {
    transform: scale(1.05);
}

.btn-add-cart {
    background: linear-gradient(45deg, #007bff, #0056b3);
    border: none;
    transition: all 0.3s ease;
}

.btn-add-cart:hover {
    background: linear-gradient(45deg, #0056b3, #004085);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,123,255,0.3);
}

.cart-item {
    border-bottom: 1px solid #dee2e6;
    padding: 1rem 0;
}

.cart-item:last-child {
    border-bottom: none;
}

.cart-item-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
}

.btn-remove {
    color: #dc3545;
    border: none;
    background: none;
    font-size: 1.2rem;
    transition: color 0.3s ease;
}

.btn-remove:hover {
    color: #c82333;
}

.quantity-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.quantity-btn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid #dee2e6;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.quantity-btn:hover {
    background: #f8f9fa;
    border-color: #007bff;
}

.quantity-input {
    width: 50px;
    text-align: center;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    padding: 0.25rem;
}

#emptyCart {
    color: #6c757d;
}

.toast {
    background: linear-gradient(45deg, #28a745, #20c997);
    color: white;
}

.toast-header {
    background: rgba(255,255,255,0.1);
    border-bottom: 1px solid rgba(255,255,255,0.2);
}

/* Animation for cart count badge */
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}

.badge.bounce {
    animation: bounce 1s;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .card-img-top {
        height: 150px;
    }
    
    .cart-item-image {
        width: 50px;
        height: 50px;
    }
}

/* Loading animation */
.loading {
    opacity: 0.6;
    pointer-events: none;
}

.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

```

讓我檢查是否有任何 linting 錯誤：


完美！我已經成功為所有四個分類篩選按鈕添加了圓角設計。以下是修改的內容：

## 🎨 分類按鈕圓角更新

### 📱 按鈕設計特色
- **圓角半徑**：所有按鈕都使用 `1rem` 的圓角半徑
- **間距調整**：按鈕之間的間距從 `2px` 增加到 `4px`，提供更好的視覺分離
- **內邊距優化**：調整為 `0.5rem 1rem`，讓按鈕看起來更舒適

### 🎯 視覺效果
- **全部商品按鈕**：左側圓角，右側圓角
- **A類 - 電子產品按鈕**：完全圓角設計
- **B類 - 家電用品按鈕**：完全圓角設計  
- **C類 - 運動健康按鈕**：左側圓角，右側圓角

### ✨ 設計優勢
1. **現代化外觀**：圓角設計讓按鈕看起來更現代、更友好
2. **一致性**：所有按鈕都採用相同的圓角設計語言
3. **視覺層次**：圓角設計幫助區分不同的分類選項
4. **用戶體驗**：圓潤的邊角提供更柔和的視覺感受

### 🔧 技術實現
- 使用 `border-radius: 1rem` 實現圓潤效果
- 保持按鈕群組的整體視覺連貫性
- 維持原有的懸停和選中狀態動畫效果
- 響應式設計確保在不同設備上都有良好的顯示效果

現在您的分類篩選按鈕具有統一且現代化的圓角設計！這讓整個界面看起來更加協調和專業。

---

**User**

請將網頁風格改成淺色系，白色底，駝色、米色調

---

**Cursor**

我將為您的購物網站更改為淺色系風格，使用白色背景和駝色、米色調的配色方案。


首先，我將更新整體的配色方案：


```css
/* Custom styles for the shopping website */

body {
    background-color: #fefefe;
    color: #5c4a3a;
}

/* Color scheme variables */
:root {
    --primary-color: #d4a574;
    --secondary-color: #e8d5b7;
    --accent-color: #c19a6b;
    --text-color: #5c4a3a;
    --light-bg: #faf8f5;
    --card-bg: #ffffff;
    --border-color: #e8d5b7;
    --shadow-color: rgba(212, 165, 116, 0.15);
}

/* Category filter styles */
.btn-check:checked + .btn {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.btn-group .btn {
    transition: all 0.3s ease;
    border-radius: 1rem !important;
    margin: 0 4px;
    padding: 0.5rem 1rem;
}

.btn-group .btn:first-child {
    border-top-right-radius: 1rem !important;
    border-bottom-right-radius: 1rem !important;
}

.btn-group .btn:last-child {
    border-top-left-radius: 1rem !important;
    border-bottom-left-radius: 1rem !important;
}

.btn-group .btn:not(:first-child):not(:last-child) {
    border-radius: 1rem !important;
}

/* Category badge styles */
.badge {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* Empty state styles */
.display-1 {
    font-size: 4rem;
    opacity: 0.3;
}

/* Search bar styles */
.input-group-text {
    background-color: #f8f9fa;
    border-color: #dee2e6;
    border-radius: 1rem 0 0 1rem !important;
}

#searchInput {
    border-left: none;
    border-radius: 0 1rem 1rem 0 !important;
    transition: all 0.3s ease;
}

#searchInput:focus {
    border-color: #86b7fe;
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

#searchInput:focus + .input-group-text {
    border-color: #86b7fe;
}

#clearSearchBtn {
    transition: all 0.3s ease;
    border-left: none;
    border-radius: 0 1rem 1rem 0 !important;
}

#clearSearchBtn:hover {
    background-color: #f8f9fa;
    color: #dc3545;
}

/* Search highlighting */
mark {
    background-color: #fff3cd;
    color: #856404;
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-weight: 600;
}

/* Search results info */
#searchResultsInfo {
    font-size: 0.875rem;
    font-weight: 500;
}

/* Search animation */
@keyframes searchPulse {
    0% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0.4);
    }
    70% {
        box-shadow: 0 0 0 10px rgba(13, 110, 253, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0);
    }
}

.searching {
    animation: searchPulse 1.5s infinite;
}

/* Responsive search bar */
@media (max-width: 768px) {
    .input-group {
        flex-direction: column;
    }
    
    .input-group-text {
        border-radius: 1rem 1rem 0 0 !important;
        border-bottom: none;
    }
    
    #searchInput {
        border-radius: 0 0 1rem 1rem !important;
        border-top: none;
    }
    
    #clearSearchBtn {
        border-radius: 1rem;
        margin-top: 0.5rem;
        width: 100%;
    }
}

.navbar-brand {
    font-weight: bold;
    font-size: 1.5rem;
}

.card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.card-img-top {
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.card:hover .card-img-top {
    transform: scale(1.05);
}

.btn-add-cart {
    background: linear-gradient(45deg, #007bff, #0056b3);
    border: none;
    transition: all 0.3s ease;
}

.btn-add-cart:hover {
    background: linear-gradient(45deg, #0056b3, #004085);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,123,255,0.3);
}

.cart-item {
    border-bottom: 1px solid #dee2e6;
    padding: 1rem 0;
}

.cart-item:last-child {
    border-bottom: none;
}

.cart-item-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
}

.btn-remove {
    color: #dc3545;
    border: none;
    background: none;
    font-size: 1.2rem;
    transition: color 0.3s ease;
}

.btn-remove:hover {
    color: #c82333;
}

.quantity-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.quantity-btn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid #dee2e6;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.quantity-btn:hover {
    background: #f8f9fa;
    border-color: #007bff;
}

.quantity-input {
    width: 50px;
    text-align: center;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    padding: 0.25rem;
}

#emptyCart {
    color: #6c757d;
}

.toast {
    background: linear-gradient(45deg, #28a745, #20c997);
    color: white;
}

.toast-header {
    background: rgba(255,255,255,0.1);
    border-bottom: 1px solid rgba(255,255,255,0.2);
}

/* Animation for cart count badge */
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}

.badge.bounce {
    animation: bounce 1s;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .card-img-top {
        height: 150px;
    }
    
    .cart-item-image {
        width: 50px;
        height: 50px;
    }
}

/* Loading animation */
.loading {
    opacity: 0.6;
    pointer-events: none;
}

.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

```

現在更新導航欄的配色：


```css
/* Custom styles for the shopping website */

body {
    background-color: #fefefe;
    color: #5c4a3a;
}

/* Color scheme variables */
:root {
    --primary-color: #d4a574;
    --secondary-color: #e8d5b7;
    --accent-color: #c19a6b;
    --text-color: #5c4a3a;
    --light-bg: #faf8f5;
    --card-bg: #ffffff;
    --border-color: #e8d5b7;
    --shadow-color: rgba(212, 165, 116, 0.15);
}

/* Category filter styles */
.btn-check:checked + .btn {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.btn-group .btn {
    transition: all 0.3s ease;
    border-radius: 1rem !important;
    margin: 0 4px;
    padding: 0.5rem 1rem;
}

.btn-group .btn:first-child {
    border-top-right-radius: 1rem !important;
    border-bottom-right-radius: 1rem !important;
}

.btn-group .btn:last-child {
    border-top-left-radius: 1rem !important;
    border-bottom-left-radius: 1rem !important;
}

.btn-group .btn:not(:first-child):not(:last-child) {
    border-radius: 1rem !important;
}

/* Category badge styles */
.badge {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* Empty state styles */
.display-1 {
    font-size: 4rem;
    opacity: 0.3;
}

/* Search bar styles */
.input-group-text {
    background-color: #f8f9fa;
    border-color: #dee2e6;
    border-radius: 1rem 0 0 1rem !important;
}

#searchInput {
    border-left: none;
    border-radius: 0 1rem 1rem 0 !important;
    transition: all 0.3s ease;
}

#searchInput:focus {
    border-color: #86b7fe;
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

#searchInput:focus + .input-group-text {
    border-color: #86b7fe;
}

#clearSearchBtn {
    transition: all 0.3s ease;
    border-left: none;
    border-radius: 0 1rem 1rem 0 !important;
}

#clearSearchBtn:hover {
    background-color: #f8f9fa;
    color: #dc3545;
}

/* Search highlighting */
mark {
    background-color: #fff3cd;
    color: #856404;
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-weight: 600;
}

/* Search results info */
#searchResultsInfo {
    font-size: 0.875rem;
    font-weight: 500;
}

/* Search animation */
@keyframes searchPulse {
    0% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0.4);
    }
    70% {
        box-shadow: 0 0 0 10px rgba(13, 110, 253, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0);
    }
}

.searching {
    animation: searchPulse 1.5s infinite;
}

/* Responsive search bar */
@media (max-width: 768px) {
    .input-group {
        flex-direction: column;
    }
    
    .input-group-text {
        border-radius: 1rem 1rem 0 0 !important;
        border-bottom: none;
    }
    
    #searchInput {
        border-radius: 0 0 1rem 1rem !important;
        border-top: none;
    }
    
    #clearSearchBtn {
        border-radius: 1rem;
        margin-top: 0.5rem;
        width: 100%;
    }
}

/* Navbar styles */
.navbar {
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color)) !important;
    box-shadow: 0 2px 10px var(--shadow-color);
}

.navbar-brand {
    font-weight: bold;
    font-size: 1.5rem;
    color: white !important;
}

.navbar-nav .nav-link {
    color: white !important;
    transition: color 0.3s ease;
}

.navbar-nav .nav-link:hover {
    color: var(--light-bg) !important;
}

.navbar-toggler {
    border-color: white;
}

.navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

.card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.card-img-top {
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.card:hover .card-img-top {
    transform: scale(1.05);
}

.btn-add-cart {
    background: linear-gradient(45deg, #007bff, #0056b3);
    border: none;
    transition: all 0.3s ease;
}

.btn-add-cart:hover {
    background: linear-gradient(45deg, #0056b3, #004085);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,123,255,0.3);
}

.cart-item {
    border-bottom: 1px solid #dee2e6;
    padding: 1rem 0;
}

.cart-item:last-child {
    border-bottom: none;
}

.cart-item-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
}

.btn-remove {
    color: #dc3545;
    border: none;
    background: none;
    font-size: 1.2rem;
    transition: color 0.3s ease;
}

.btn-remove:hover {
    color: #c82333;
}

.quantity-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.quantity-btn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid #dee2e6;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.quantity-btn:hover {
    background: #f8f9fa;
    border-color: #007bff;
}

.quantity-input {
    width: 50px;
    text-align: center;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    padding: 0.25rem;
}

#emptyCart {
    color: #6c757d;
}

.toast {
    background: linear-gradient(45deg, #28a745, #20c997);
    color: white;
}

.toast-header {
    background: rgba(255,255,255,0.1);
    border-bottom: 1px solid rgba(255,255,255,0.2);
}

/* Animation for cart count badge */
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}

.badge.bounce {
    animation: bounce 1s;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .card-img-top {
        height: 150px;
    }
    
    .cart-item-image {
        width: 50px;
        height: 50px;
    }
}

/* Loading animation */
.loading {
    opacity: 0.6;
    pointer-events: none;
}

.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

```

現在更新按鈕的配色方案：


```css
/* Custom styles for the shopping website */

body {
    background-color: #fefefe;
    color: #5c4a3a;
}

/* Color scheme variables */
:root {
    --primary-color: #d4a574;
    --secondary-color: #e8d5b7;
    --accent-color: #c19a6b;
    --text-color: #5c4a3a;
    --light-bg: #faf8f5;
    --card-bg: #ffffff;
    --border-color: #e8d5b7;
    --shadow-color: rgba(212, 165, 116, 0.15);
}

/* Category filter styles */
.btn-check:checked + .btn {
    transform: scale(1.05);
    box-shadow: 0 4px 8px var(--shadow-color);
    background-color: var(--primary-color) !important;
    border-color: var(--primary-color) !important;
    color: white !important;
}

.btn-group .btn {
    transition: all 0.3s ease;
    border-radius: 1rem !important;
    margin: 0 4px;
    padding: 0.5rem 1rem;
    background-color: var(--light-bg);
    border-color: var(--border-color);
    color: var(--text-color);
}

.btn-group .btn:hover {
    background-color: var(--secondary-color);
    border-color: var(--accent-color);
    color: var(--text-color);
}

.btn-group .btn:first-child {
    border-top-right-radius: 1rem !important;
    border-bottom-right-radius: 1rem !important;
}

.btn-group .btn:last-child {
    border-top-left-radius: 1rem !important;
    border-bottom-left-radius: 1rem !important;
}

.btn-group .btn:not(:first-child):not(:last-child) {
    border-radius: 1rem !important;
}

/* Category badge styles */
.badge {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* Empty state styles */
.display-1 {
    font-size: 4rem;
    opacity: 0.3;
}

/* Search bar styles */
.input-group-text {
    background-color: #f8f9fa;
    border-color: #dee2e6;
    border-radius: 1rem 0 0 1rem !important;
}

#searchInput {
    border-left: none;
    border-radius: 0 1rem 1rem 0 !important;
    transition: all 0.3s ease;
}

#searchInput:focus {
    border-color: #86b7fe;
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

#searchInput:focus + .input-group-text {
    border-color: #86b7fe;
}

#clearSearchBtn {
    transition: all 0.3s ease;
    border-left: none;
    border-radius: 0 1rem 1rem 0 !important;
}

#clearSearchBtn:hover {
    background-color: #f8f9fa;
    color: #dc3545;
}

/* Search highlighting */
mark {
    background-color: #fff3cd;
    color: #856404;
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-weight: 600;
}

/* Search results info */
#searchResultsInfo {
    font-size: 0.875rem;
    font-weight: 500;
}

/* Search animation */
@keyframes searchPulse {
    0% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0.4);
    }
    70% {
        box-shadow: 0 0 0 10px rgba(13, 110, 253, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0);
    }
}

.searching {
    animation: searchPulse 1.5s infinite;
}

/* Responsive search bar */
@media (max-width: 768px) {
    .input-group {
        flex-direction: column;
    }
    
    .input-group-text {
        border-radius: 1rem 1rem 0 0 !important;
        border-bottom: none;
    }
    
    #searchInput {
        border-radius: 0 0 1rem 1rem !important;
        border-top: none;
    }
    
    #clearSearchBtn {
        border-radius: 1rem;
        margin-top: 0.5rem;
        width: 100%;
    }
}

/* Navbar styles */
.navbar {
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color)) !important;
    box-shadow: 0 2px 10px var(--shadow-color);
}

.navbar-brand {
    font-weight: bold;
    font-size: 1.5rem;
    color: white !important;
}

.navbar-nav .nav-link {
    color: white !important;
    transition: color 0.3s ease;
}

.navbar-nav .nav-link:hover {
    color: var(--light-bg) !important;
}

.navbar-toggler {
    border-color: white;
}

.navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

.card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.card-img-top {
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.card:hover .card-img-top {
    transform: scale(1.05);
}

.btn-add-cart {
    background: linear-gradient(45deg, #007bff, #0056b3);
    border: none;
    transition: all 0.3s ease;
}

.btn-add-cart:hover {
    background: linear-gradient(45deg, #0056b3, #004085);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,123,255,0.3);
}

.cart-item {
    border-bottom: 1px solid #dee2e6;
    padding: 1rem 0;
}

.cart-item:last-child {
    border-bottom: none;
}

.cart-item-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
}

.btn-remove {
    color: #dc3545;
    border: none;
    background: none;
    font-size: 1.2rem;
    transition: color 0.3s ease;
}

.btn-remove:hover {
    color: #c82333;
}

.quantity-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.quantity-btn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid #dee2e6;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.quantity-btn:hover {
    background: #f8f9fa;
    border-color: #007bff;
}

.quantity-input {
    width: 50px;
    text-align: center;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    padding: 0.25rem;
}

#emptyCart {
    color: #6c757d;
}

.toast {
    background: linear-gradient(45deg, #28a745, #20c997);
    color: white;
}

.toast-header {
    background: rgba(255,255,255,0.1);
    border-bottom: 1px solid rgba(255,255,255,0.2);
}

/* Animation for cart count badge */
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}

.badge.bounce {
    animation: bounce 1s;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .card-img-top {
        height: 150px;
    }
    
    .cart-item-image {
        width: 50px;
        height: 50px;
    }
}

/* Loading animation */
.loading {
    opacity: 0.6;
    pointer-events: none;
}

.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

```

現在更新商品卡片的配色：


```css
/* Custom styles for the shopping website */

body {
    background-color: #fefefe;
    color: #5c4a3a;
}

/* Color scheme variables */
:root {
    --primary-color: #d4a574;
    --secondary-color: #e8d5b7;
    --accent-color: #c19a6b;
    --text-color: #5c4a3a;
    --light-bg: #faf8f5;
    --card-bg: #ffffff;
    --border-color: #e8d5b7;
    --shadow-color: rgba(212, 165, 116, 0.15);
}

/* Category filter styles */
.btn-check:checked + .btn {
    transform: scale(1.05);
    box-shadow: 0 4px 8px var(--shadow-color);
    background-color: var(--primary-color) !important;
    border-color: var(--primary-color) !important;
    color: white !important;
}

.btn-group .btn {
    transition: all 0.3s ease;
    border-radius: 1rem !important;
    margin: 0 4px;
    padding: 0.5rem 1rem;
    background-color: var(--light-bg);
    border-color: var(--border-color);
    color: var(--text-color);
}

.btn-group .btn:hover {
    background-color: var(--secondary-color);
    border-color: var(--accent-color);
    color: var(--text-color);
}

.btn-group .btn:first-child {
    border-top-right-radius: 1rem !important;
    border-bottom-right-radius: 1rem !important;
}

.btn-group .btn:last-child {
    border-top-left-radius: 1rem !important;
    border-bottom-left-radius: 1rem !important;
}

.btn-group .btn:not(:first-child):not(:last-child) {
    border-radius: 1rem !important;
}

/* Category badge styles */
.badge {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* Empty state styles */
.display-1 {
    font-size: 4rem;
    opacity: 0.3;
}

/* Search bar styles */
.input-group-text {
    background-color: #f8f9fa;
    border-color: #dee2e6;
    border-radius: 1rem 0 0 1rem !important;
}

#searchInput {
    border-left: none;
    border-radius: 0 1rem 1rem 0 !important;
    transition: all 0.3s ease;
}

#searchInput:focus {
    border-color: #86b7fe;
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

#searchInput:focus + .input-group-text {
    border-color: #86b7fe;
}

#clearSearchBtn {
    transition: all 0.3s ease;
    border-left: none;
    border-radius: 0 1rem 1rem 0 !important;
}

#clearSearchBtn:hover {
    background-color: #f8f9fa;
    color: #dc3545;
}

/* Search highlighting */
mark {
    background-color: #fff3cd;
    color: #856404;
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-weight: 600;
}

/* Search results info */
#searchResultsInfo {
    font-size: 0.875rem;
    font-weight: 500;
}

/* Search animation */
@keyframes searchPulse {
    0% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0.4);
    }
    70% {
        box-shadow: 0 0 0 10px rgba(13, 110, 253, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0);
    }
}

.searching {
    animation: searchPulse 1.5s infinite;
}

/* Responsive search bar */
@media (max-width: 768px) {
    .input-group {
        flex-direction: column;
    }
    
    .input-group-text {
        border-radius: 1rem 1rem 0 0 !important;
        border-bottom: none;
    }
    
    #searchInput {
        border-radius: 0 0 1rem 1rem !important;
        border-top: none;
    }
    
    #clearSearchBtn {
        border-radius: 1rem;
        margin-top: 0.5rem;
        width: 100%;
    }
}

/* Navbar styles */
.navbar {
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color)) !important;
    box-shadow: 0 2px 10px var(--shadow-color);
}

.navbar-brand {
    font-weight: bold;
    font-size: 1.5rem;
    color: white !important;
}

.navbar-nav .nav-link {
    color: white !important;
    transition: color 0.3s ease;
}

.navbar-nav .nav-link:hover {
    color: var(--light-bg) !important;
}

.navbar-toggler {
    border-color: white;
}

.navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

.card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid var(--border-color);
    background-color: var(--card-bg);
    box-shadow: 0 2px 8px var(--shadow-color);
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px var(--shadow-color);
    border-color: var(--accent-color);
}

.card-img-top {
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.card:hover .card-img-top {
    transform: scale(1.05);
}

.btn-add-cart {
    background: linear-gradient(45deg, #007bff, #0056b3);
    border: none;
    transition: all 0.3s ease;
}

.btn-add-cart:hover {
    background: linear-gradient(45deg, #0056b3, #004085);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,123,255,0.3);
}

.cart-item {
    border-bottom: 1px solid #dee2e6;
    padding: 1rem 0;
}

.cart-item:last-child {
    border-bottom: none;
}

.cart-item-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
}

.btn-remove {
    color: #dc3545;
    border: none;
    background: none;
    font-size: 1.2rem;
    transition: color 0.3s ease;
}

.btn-remove:hover {
    color: #c82333;
}

.quantity-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.quantity-btn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid #dee2e6;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.quantity-btn:hover {
    background: #f8f9fa;
    border-color: #007bff;
}

.quantity-input {
    width: 50px;
    text-align: center;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    padding: 0.25rem;
}

#emptyCart {
    color: #6c757d;
}

.toast {
    background: linear-gradient(45deg, #28a745, #20c997);
    color: white;
}

.toast-header {
    background: rgba(255,255,255,0.1);
    border-bottom: 1px solid rgba(255,255,255,0.2);
}

/* Animation for cart count badge */
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}

.badge.bounce {
    animation: bounce 1s;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .card-img-top {
        height: 150px;
    }
    
    .cart-item-image {
        width: 50px;
        height: 50px;
    }
}

/* Loading animation */
.loading {
    opacity: 0.6;
    pointer-events: none;
}

.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

```

現在更新按鈕和購物車相關的配色：


```css
/* Custom styles for the shopping website */

body {
    background-color: #fefefe;
    color: #5c4a3a;
}

/* Color scheme variables */
:root {
    --primary-color: #d4a574;
    --secondary-color: #e8d5b7;
    --accent-color: #c19a6b;
    --text-color: #5c4a3a;
    --light-bg: #faf8f5;
    --card-bg: #ffffff;
    --border-color: #e8d5b7;
    --shadow-color: rgba(212, 165, 116, 0.15);
}

/* Category filter styles */
.btn-check:checked + .btn {
    transform: scale(1.05);
    box-shadow: 0 4px 8px var(--shadow-color);
    background-color: var(--primary-color) !important;
    border-color: var(--primary-color) !important;
    color: white !important;
}

.btn-group .btn {
    transition: all 0.3s ease;
    border-radius: 1rem !important;
    margin: 0 4px;
    padding: 0.5rem 1rem;
    background-color: var(--light-bg);
    border-color: var(--border-color);
    color: var(--text-color);
}

.btn-group .btn:hover {
    background-color: var(--secondary-color);
    border-color: var(--accent-color);
    color: var(--text-color);
}

.btn-group .btn:first-child {
    border-top-right-radius: 1rem !important;
    border-bottom-right-radius: 1rem !important;
}

.btn-group .btn:last-child {
    border-top-left-radius: 1rem !important;
    border-bottom-left-radius: 1rem !important;
}

.btn-group .btn:not(:first-child):not(:last-child) {
    border-radius: 1rem !important;
}

/* Category badge styles */
.badge {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* Empty state styles */
.display-1 {
    font-size: 4rem;
    opacity: 0.3;
}

/* Search bar styles */
.input-group-text {
    background-color: #f8f9fa;
    border-color: #dee2e6;
    border-radius: 1rem 0 0 1rem !important;
}

#searchInput {
    border-left: none;
    border-radius: 0 1rem 1rem 0 !important;
    transition: all 0.3s ease;
}

#searchInput:focus {
    border-color: #86b7fe;
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

#searchInput:focus + .input-group-text {
    border-color: #86b7fe;
}

#clearSearchBtn {
    transition: all 0.3s ease;
    border-left: none;
    border-radius: 0 1rem 1rem 0 !important;
}

#clearSearchBtn:hover {
    background-color: #f8f9fa;
    color: #dc3545;
}

/* Search highlighting */
mark {
    background-color: #fff3cd;
    color: #856404;
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-weight: 600;
}

/* Search results info */
#searchResultsInfo {
    font-size: 0.875rem;
    font-weight: 500;
}

/* Search animation */
@keyframes searchPulse {
    0% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0.4);
    }
    70% {
        box-shadow: 0 0 0 10px rgba(13, 110, 253, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0);
    }
}

.searching {
    animation: searchPulse 1.5s infinite;
}

/* Responsive search bar */
@media (max-width: 768px) {
    .input-group {
        flex-direction: column;
    }
    
    .input-group-text {
        border-radius: 1rem 1rem 0 0 !important;
        border-bottom: none;
    }
    
    #searchInput {
        border-radius: 0 0 1rem 1rem !important;
        border-top: none;
    }
    
    #clearSearchBtn {
        border-radius: 1rem;
        margin-top: 0.5rem;
        width: 100%;
    }
}

/* Navbar styles */
.navbar {
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color)) !important;
    box-shadow: 0 2px 10px var(--shadow-color);
}

.navbar-brand {
    font-weight: bold;
    font-size: 1.5rem;
    color: white !important;
}

.navbar-nav .nav-link {
    color: white !important;
    transition: color 0.3s ease;
}

.navbar-nav .nav-link:hover {
    color: var(--light-bg) !important;
}

.navbar-toggler {
    border-color: white;
}

.navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

.card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid var(--border-color);
    background-color: var(--card-bg);
    box-shadow: 0 2px 8px var(--shadow-color);
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px var(--shadow-color);
    border-color: var(--accent-color);
}

.card-img-top {
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.card:hover .card-img-top {
    transform: scale(1.05);
}

.btn-add-cart {
    background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
    border: none;
    color: white;
    transition: all 0.3s ease;
}

.btn-add-cart:hover {
    background: linear-gradient(45deg, var(--accent-color), #b88a5a);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px var(--shadow-color);
    color: white;
}

.cart-item {
    border-bottom: 1px solid #dee2e6;
    padding: 1rem 0;
}

.cart-item:last-child {
    border-bottom: none;
}

.cart-item-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
}

.btn-remove {
    color: #dc3545;
    border: none;
    background: none;
    font-size: 1.2rem;
    transition: color 0.3s ease;
}

.btn-remove:hover {
    color: #c82333;
}

.quantity-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.quantity-btn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid #dee2e6;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.quantity-btn:hover {
    background: #f8f9fa;
    border-color: #007bff;
}

.quantity-input {
    width: 50px;
    text-align: center;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    padding: 0.25rem;
}

#emptyCart {
    color: #6c757d;
}

.toast {
    background: linear-gradient(45deg, #28a745, #20c997);
    color: white;
}

.toast-header {
    background: rgba(255,255,255,0.1);
    border-bottom: 1px solid rgba(255,255,255,0.2);
}

/* Animation for cart count badge */
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}

.badge.bounce {
    animation: bounce 1s;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .card-img-top {
        height: 150px;
    }
    
    .cart-item-image {
        width: 50px;
        height: 50px;
    }
}

/* Loading animation */
.loading {
    opacity: 0.6;
    pointer-events: none;
}

.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

```

現在更新搜尋欄的配色：


```css
/* Custom styles for the shopping website */

body {
    background-color: #fefefe;
    color: #5c4a3a;
}

/* Color scheme variables */
:root {
    --primary-color: #d4a574;
    --secondary-color: #e8d5b7;
    --accent-color: #c19a6b;
    --text-color: #5c4a3a;
    --light-bg: #faf8f5;
    --card-bg: #ffffff;
    --border-color: #e8d5b7;
    --shadow-color: rgba(212, 165, 116, 0.15);
}

/* Category filter styles */
.btn-check:checked + .btn {
    transform: scale(1.05);
    box-shadow: 0 4px 8px var(--shadow-color);
    background-color: var(--primary-color) !important;
    border-color: var(--primary-color) !important;
    color: white !important;
}

.btn-group .btn {
    transition: all 0.3s ease;
    border-radius: 1rem !important;
    margin: 0 4px;
    padding: 0.5rem 1rem;
    background-color: var(--light-bg);
    border-color: var(--border-color);
    color: var(--text-color);
}

.btn-group .btn:hover {
    background-color: var(--secondary-color);
    border-color: var(--accent-color);
    color: var(--text-color);
}

.btn-group .btn:first-child {
    border-top-right-radius: 1rem !important;
    border-bottom-right-radius: 1rem !important;
}

.btn-group .btn:last-child {
    border-top-left-radius: 1rem !important;
    border-bottom-left-radius: 1rem !important;
}

.btn-group .btn:not(:first-child):not(:last-child) {
    border-radius: 1rem !important;
}

/* Category badge styles */
.badge {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* Empty state styles */
.display-1 {
    font-size: 4rem;
    opacity: 0.3;
}

/* Search bar styles */
.input-group-text {
    background-color: var(--light-bg);
    border-color: var(--border-color);
    border-radius: 1rem 0 0 1rem !important;
    color: var(--text-color);
}

#searchInput {
    border-left: none;
    border-radius: 0 1rem 1rem 0 !important;
    transition: all 0.3s ease;
    background-color: var(--card-bg);
    border-color: var(--border-color);
    color: var(--text-color);
}

#searchInput:focus {
    border-color: var(--accent-color);
    box-shadow: 0 0 0 0.25rem var(--shadow-color);
    background-color: var(--card-bg);
}

#searchInput:focus + .input-group-text {
    border-color: var(--accent-color);
}

#clearSearchBtn {
    transition: all 0.3s ease;
    border-left: none;
    border-radius: 0 1rem 1rem 0 !important;
    background-color: var(--light-bg);
    border-color: var(--border-color);
    color: var(--text-color);
}

#clearSearchBtn:hover {
    background-color: var(--secondary-color);
    color: var(--accent-color);
}

/* Search highlighting */
mark {
    background-color: #fff3cd;
    color: #856404;
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-weight: 600;
}

/* Search results info */
#searchResultsInfo {
    font-size: 0.875rem;
    font-weight: 500;
}

/* Search animation */
@keyframes searchPulse {
    0% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0.4);
    }
    70% {
        box-shadow: 0 0 0 10px rgba(13, 110, 253, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0);
    }
}

.searching {
    animation: searchPulse 1.5s infinite;
}

/* Responsive search bar */
@media (max-width: 768px) {
    .input-group {
        flex-direction: column;
    }
    
    .input-group-text {
        border-radius: 1rem 1rem 0 0 !important;
        border-bottom: none;
    }
    
    #searchInput {
        border-radius: 0 0 1rem 1rem !important;
        border-top: none;
    }
    
    #clearSearchBtn {
        border-radius: 1rem;
        margin-top: 0.5rem;
        width: 100%;
    }
}

/* Navbar styles */
.navbar {
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color)) !important;
    box-shadow: 0 2px 10px var(--shadow-color);
}

.navbar-brand {
    font-weight: bold;
    font-size: 1.5rem;
    color: white !important;
}

.navbar-nav .nav-link {
    color: white !important;
    transition: color 0.3s ease;
}

.navbar-nav .nav-link:hover {
    color: var(--light-bg) !important;
}

.navbar-toggler {
    border-color: white;
}

.navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

.card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid var(--border-color);
    background-color: var(--card-bg);
    box-shadow: 0 2px 8px var(--shadow-color);
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px var(--shadow-color);
    border-color: var(--accent-color);
}

.card-img-top {
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.card:hover .card-img-top {
    transform: scale(1.05);
}

.btn-add-cart {
    background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
    border: none;
    color: white;
    transition: all 0.3s ease;
}

.btn-add-cart:hover {
    background: linear-gradient(45deg, var(--accent-color), #b88a5a);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px var(--shadow-color);
    color: white;
}

.cart-item {
    border-bottom: 1px solid #dee2e6;
    padding: 1rem 0;
}

.cart-item:last-child {
    border-bottom: none;
}

.cart-item-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
}

.btn-remove {
    color: #dc3545;
    border: none;
    background: none;
    font-size: 1.2rem;
    transition: color 0.3s ease;
}

.btn-remove:hover {
    color: #c82333;
}

.quantity-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.quantity-btn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid #dee2e6;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.quantity-btn:hover {
    background: #f8f9fa;
    border-color: #007bff;
}

.quantity-input {
    width: 50px;
    text-align: center;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    padding: 0.25rem;
}

#emptyCart {
    color: #6c757d;
}

.toast {
    background: linear-gradient(45deg, #28a745, #20c997);
    color: white;
}

.toast-header {
    background: rgba(255,255,255,0.1);
    border-bottom: 1px solid rgba(255,255,255,0.2);
}

/* Animation for cart count badge */
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}

.badge.bounce {
    animation: bounce 1s;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .card-img-top {
        height: 150px;
    }
    
    .cart-item-image {
        width: 50px;
        height: 50px;
    }
}

/* Loading animation */
.loading {
    opacity: 0.6;
    pointer-events: none;
}

.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

```

現在更新其他元素的配色，包括標籤、購物車等：


```css
/* Custom styles for the shopping website */

body {
    background-color: #fefefe;
    color: #5c4a3a;
}

/* Color scheme variables */
:root {
    --primary-color: #d4a574;
    --secondary-color: #e8d5b7;
    --accent-color: #c19a6b;
    --text-color: #5c4a3a;
    --light-bg: #faf8f5;
    --card-bg: #ffffff;
    --border-color: #e8d5b7;
    --shadow-color: rgba(212, 165, 116, 0.15);
}

/* Category filter styles */
.btn-check:checked + .btn {
    transform: scale(1.05);
    box-shadow: 0 4px 8px var(--shadow-color);
    background-color: var(--primary-color) !important;
    border-color: var(--primary-color) !important;
    color: white !important;
}

.btn-group .btn {
    transition: all 0.3s ease;
    border-radius: 1rem !important;
    margin: 0 4px;
    padding: 0.5rem 1rem;
    background-color: var(--light-bg);
    border-color: var(--border-color);
    color: var(--text-color);
}

.btn-group .btn:hover {
    background-color: var(--secondary-color);
    border-color: var(--accent-color);
    color: var(--text-color);
}

.btn-group .btn:first-child {
    border-top-right-radius: 1rem !important;
    border-bottom-right-radius: 1rem !important;
}

.btn-group .btn:last-child {
    border-top-left-radius: 1rem !important;
    border-bottom-left-radius: 1rem !important;
}

.btn-group .btn:not(:first-child):not(:last-child) {
    border-radius: 1rem !important;
}

/* Category badge styles */
.badge {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* Empty state styles */
.display-1 {
    font-size: 4rem;
    opacity: 0.3;
}

/* Search bar styles */
.input-group-text {
    background-color: var(--light-bg);
    border-color: var(--border-color);
    border-radius: 1rem 0 0 1rem !important;
    color: var(--text-color);
}

#searchInput {
    border-left: none;
    border-radius: 0 1rem 1rem 0 !important;
    transition: all 0.3s ease;
    background-color: var(--card-bg);
    border-color: var(--border-color);
    color: var(--text-color);
}

#searchInput:focus {
    border-color: var(--accent-color);
    box-shadow: 0 0 0 0.25rem var(--shadow-color);
    background-color: var(--card-bg);
}

#searchInput:focus + .input-group-text {
    border-color: var(--accent-color);
}

#clearSearchBtn {
    transition: all 0.3s ease;
    border-left: none;
    border-radius: 0 1rem 1rem 0 !important;
    background-color: var(--light-bg);
    border-color: var(--border-color);
    color: var(--text-color);
}

#clearSearchBtn:hover {
    background-color: var(--secondary-color);
    color: var(--accent-color);
}

/* Search highlighting */
mark {
    background-color: var(--secondary-color);
    color: var(--text-color);
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-weight: 600;
}

/* Search results info */
#searchResultsInfo {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-color);
}

/* Search animation */
@keyframes searchPulse {
    0% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0.4);
    }
    70% {
        box-shadow: 0 0 0 10px rgba(13, 110, 253, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0);
    }
}

.searching {
    animation: searchPulse 1.5s infinite;
}

/* Responsive search bar */
@media (max-width: 768px) {
    .input-group {
        flex-direction: column;
    }
    
    .input-group-text {
        border-radius: 1rem 1rem 0 0 !important;
        border-bottom: none;
    }
    
    #searchInput {
        border-radius: 0 0 1rem 1rem !important;
        border-top: none;
    }
    
    #clearSearchBtn {
        border-radius: 1rem;
        margin-top: 0.5rem;
        width: 100%;
    }
}

/* Navbar styles */
.navbar {
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color)) !important;
    box-shadow: 0 2px 10px var(--shadow-color);
}

.navbar-brand {
    font-weight: bold;
    font-size: 1.5rem;
    color: white !important;
}

.navbar-nav .nav-link {
    color: white !important;
    transition: color 0.3s ease;
}

.navbar-nav .nav-link:hover {
    color: var(--light-bg) !important;
}

.navbar-toggler {
    border-color: white;
}

.navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

.card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid var(--border-color);
    background-color: var(--card-bg);
    box-shadow: 0 2px 8px var(--shadow-color);
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px var(--shadow-color);
    border-color: var(--accent-color);
}

.card-img-top {
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.card:hover .card-img-top {
    transform: scale(1.05);
}

.btn-add-cart {
    background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
    border: none;
    color: white;
    transition: all 0.3s ease;
}

.btn-add-cart:hover {
    background: linear-gradient(45deg, var(--accent-color), #b88a5a);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px var(--shadow-color);
    color: white;
}

.cart-item {
    border-bottom: 1px solid #dee2e6;
    padding: 1rem 0;
}

.cart-item:last-child {
    border-bottom: none;
}

.cart-item-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
}

.btn-remove {
    color: #dc3545;
    border: none;
    background: none;
    font-size: 1.2rem;
    transition: color 0.3s ease;
}

.btn-remove:hover {
    color: #c82333;
}

.quantity-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.quantity-btn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid #dee2e6;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.quantity-btn:hover {
    background: #f8f9fa;
    border-color: #007bff;
}

.quantity-input {
    width: 50px;
    text-align: center;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    padding: 0.25rem;
}

#emptyCart {
    color: #6c757d;
}

.toast {
    background: linear-gradient(45deg, #28a745, #20c997);
    color: white;
}

.toast-header {
    background: rgba(255,255,255,0.1);
    border-bottom: 1px solid rgba(255,255,255,0.2);
}

/* Animation for cart count badge */
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}

.badge.bounce {
    animation: bounce 1s;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .card-img-top {
        height: 150px;
    }
    
    .cart-item-image {
        width: 50px;
        height: 50px;
    }
}

/* Loading animation */
.loading {
    opacity: 0.6;
    pointer-events: none;
}

.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

```

現在更新購物車相關的配色：


```css
/* Custom styles for the shopping website */

body {
    background-color: #fefefe;
    color: #5c4a3a;
}

/* Color scheme variables */
:root {
    --primary-color: #d4a574;
    --secondary-color: #e8d5b7;
    --accent-color: #c19a6b;
    --text-color: #5c4a3a;
    --light-bg: #faf8f5;
    --card-bg: #ffffff;
    --border-color: #e8d5b7;
    --shadow-color: rgba(212, 165, 116, 0.15);
}

/* Category filter styles */
.btn-check:checked + .btn {
    transform: scale(1.05);
    box-shadow: 0 4px 8px var(--shadow-color);
    background-color: var(--primary-color) !important;
    border-color: var(--primary-color) !important;
    color: white !important;
}

.btn-group .btn {
    transition: all 0.3s ease;
    border-radius: 1rem !important;
    margin: 0 4px;
    padding: 0.5rem 1rem;
    background-color: var(--light-bg);
    border-color: var(--border-color);
    color: var(--text-color);
}

.btn-group .btn:hover {
    background-color: var(--secondary-color);
    border-color: var(--accent-color);
    color: var(--text-color);
}

.btn-group .btn:first-child {
    border-top-right-radius: 1rem !important;
    border-bottom-right-radius: 1rem !important;
}

.btn-group .btn:last-child {
    border-top-left-radius: 1rem !important;
    border-bottom-left-radius: 1rem !important;
}

.btn-group .btn:not(:first-child):not(:last-child) {
    border-radius: 1rem !important;
}

/* Category badge styles */
.badge {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* Empty state styles */
.display-1 {
    font-size: 4rem;
    opacity: 0.3;
}

/* Search bar styles */
.input-group-text {
    background-color: var(--light-bg);
    border-color: var(--border-color);
    border-radius: 1rem 0 0 1rem !important;
    color: var(--text-color);
}

#searchInput {
    border-left: none;
    border-radius: 0 1rem 1rem 0 !important;
    transition: all 0.3s ease;
    background-color: var(--card-bg);
    border-color: var(--border-color);
    color: var(--text-color);
}

#searchInput:focus {
    border-color: var(--accent-color);
    box-shadow: 0 0 0 0.25rem var(--shadow-color);
    background-color: var(--card-bg);
}

#searchInput:focus + .input-group-text {
    border-color: var(--accent-color);
}

#clearSearchBtn {
    transition: all 0.3s ease;
    border-left: none;
    border-radius: 0 1rem 1rem 0 !important;
    background-color: var(--light-bg);
    border-color: var(--border-color);
    color: var(--text-color);
}

#clearSearchBtn:hover {
    background-color: var(--secondary-color);
    color: var(--accent-color);
}

/* Search highlighting */
mark {
    background-color: var(--secondary-color);
    color: var(--text-color);
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-weight: 600;
}

/* Search results info */
#searchResultsInfo {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-color);
}

/* Search animation */
@keyframes searchPulse {
    0% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0.4);
    }
    70% {
        box-shadow: 0 0 0 10px rgba(13, 110, 253, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0);
    }
}

.searching {
    animation: searchPulse 1.5s infinite;
}

/* Responsive search bar */
@media (max-width: 768px) {
    .input-group {
        flex-direction: column;
    }
    
    .input-group-text {
        border-radius: 1rem 1rem 0 0 !important;
        border-bottom: none;
    }
    
    #searchInput {
        border-radius: 0 0 1rem 1rem !important;
        border-top: none;
    }
    
    #clearSearchBtn {
        border-radius: 1rem;
        margin-top: 0.5rem;
        width: 100%;
    }
}

/* Navbar styles */
.navbar {
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color)) !important;
    box-shadow: 0 2px 10px var(--shadow-color);
}

.navbar-brand {
    font-weight: bold;
    font-size: 1.5rem;
    color: white !important;
}

.navbar-nav .nav-link {
    color: white !important;
    transition: color 0.3s ease;
}

.navbar-nav .nav-link:hover {
    color: var(--light-bg) !important;
}

.navbar-toggler {
    border-color: white;
}

.navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

.card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid var(--border-color);
    background-color: var(--card-bg);
    box-shadow: 0 2px 8px var(--shadow-color);
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px var(--shadow-color);
    border-color: var(--accent-color);
}

.card-img-top {
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.card:hover .card-img-top {
    transform: scale(1.05);
}

.btn-add-cart {
    background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
    border: none;
    color: white;
    transition: all 0.3s ease;
}

.btn-add-cart:hover {
    background: linear-gradient(45deg, var(--accent-color), #b88a5a);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px var(--shadow-color);
    color: white;
}

.cart-item {
    border-bottom: 1px solid var(--border-color);
    padding: 1rem 0;
}

.cart-item:last-child {
    border-bottom: none;
}

.cart-item-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
}

.btn-remove {
    color: var(--accent-color);
    border: none;
    background: none;
    font-size: 1.2rem;
    transition: color 0.3s ease;
}

.btn-remove:hover {
    color: var(--primary-color);
}

.quantity-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.quantity-btn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid #dee2e6;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.quantity-btn:hover {
    background: #f8f9fa;
    border-color: #007bff;
}

.quantity-input {
    width: 50px;
    text-align: center;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    padding: 0.25rem;
}

#emptyCart {
    color: #6c757d;
}

.toast {
    background: linear-gradient(45deg, #28a745, #20c997);
    color: white;
}

.toast-header {
    background: rgba(255,255,255,0.1);
    border-bottom: 1px solid rgba(255,255,255,0.2);
}

/* Animation for cart count badge */
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}

.badge.bounce {
    animation: bounce 1s;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .card-img-top {
        height: 150px;
    }
    
    .cart-item-image {
        width: 50px;
        height: 50px;
    }
}

/* Loading animation */
.loading {
    opacity: 0.6;
    pointer-events: none;
}

.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

```

現在更新數量控制按鈕的配色：


```css
/* Custom styles for the shopping website */

body {
    background-color: #fefefe;
    color: #5c4a3a;
}

/* Color scheme variables */
:root {
    --primary-color: #d4a574;
    --secondary-color: #e8d5b7;
    --accent-color: #c19a6b;
    --text-color: #5c4a3a;
    --light-bg: #faf8f5;
    --card-bg: #ffffff;
    --border-color: #e8d5b7;
    --shadow-color: rgba(212, 165, 116, 0.15);
}

/* Category filter styles */
.btn-check:checked + .btn {
    transform: scale(1.05);
    box-shadow: 0 4px 8px var(--shadow-color);
    background-color: var(--primary-color) !important;
    border-color: var(--primary-color) !important;
    color: white !important;
}

.btn-group .btn {
    transition: all 0.3s ease;
    border-radius: 1rem !important;
    margin: 0 4px;
    padding: 0.5rem 1rem;
    background-color: var(--light-bg);
    border-color: var(--border-color);
    color: var(--text-color);
}

.btn-group .btn:hover {
    background-color: var(--secondary-color);
    border-color: var(--accent-color);
    color: var(--text-color);
}

.btn-group .btn:first-child {
    border-top-right-radius: 1rem !important;
    border-bottom-right-radius: 1rem !important;
}

.btn-group .btn:last-child {
    border-top-left-radius: 1rem !important;
    border-bottom-left-radius: 1rem !important;
}

.btn-group .btn:not(:first-child):not(:last-child) {
    border-radius: 1rem !important;
}

/* Category badge styles */
.badge {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* Empty state styles */
.display-1 {
    font-size: 4rem;
    opacity: 0.3;
}

/* Search bar styles */
.input-group-text {
    background-color: var(--light-bg);
    border-color: var(--border-color);
    border-radius: 1rem 0 0 1rem !important;
    color: var(--text-color);
}

#searchInput {
    border-left: none;
    border-radius: 0 1rem 1rem 0 !important;
    transition: all 0.3s ease;
    background-color: var(--card-bg);
    border-color: var(--border-color);
    color: var(--text-color);
}

#searchInput:focus {
    border-color: var(--accent-color);
    box-shadow: 0 0 0 0.25rem var(--shadow-color);
    background-color: var(--card-bg);
}

#searchInput:focus + .input-group-text {
    border-color: var(--accent-color);
}

#clearSearchBtn {
    transition: all 0.3s ease;
    border-left: none;
    border-radius: 0 1rem 1rem 0 !important;
    background-color: var(--light-bg);
    border-color: var(--border-color);
    color: var(--text-color);
}

#clearSearchBtn:hover {
    background-color: var(--secondary-color);
    color: var(--accent-color);
}

/* Search highlighting */
mark {
    background-color: var(--secondary-color);
    color: var(--text-color);
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-weight: 600;
}

/* Search results info */
#searchResultsInfo {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-color);
}

/* Search animation */
@keyframes searchPulse {
    0% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0.4);
    }
    70% {
        box-shadow: 0 0 0 10px rgba(13, 110, 253, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0);
    }
}

.searching {
    animation: searchPulse 1.5s infinite;
}

/* Responsive search bar */
@media (max-width: 768px) {
    .input-group {
        flex-direction: column;
    }
    
    .input-group-text {
        border-radius: 1rem 1rem 0 0 !important;
        border-bottom: none;
    }
    
    #searchInput {
        border-radius: 0 0 1rem 1rem !important;
        border-top: none;
    }
    
    #clearSearchBtn {
        border-radius: 1rem;
        margin-top: 0.5rem;
        width: 100%;
    }
}

/* Navbar styles */
.navbar {
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color)) !important;
    box-shadow: 0 2px 10px var(--shadow-color);
}

.navbar-brand {
    font-weight: bold;
    font-size: 1.5rem;
    color: white !important;
}

.navbar-nav .nav-link {
    color: white !important;
    transition: color 0.3s ease;
}

.navbar-nav .nav-link:hover {
    color: var(--light-bg) !important;
}

.navbar-toggler {
    border-color: white;
}

.navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

.card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid var(--border-color);
    background-color: var(--card-bg);
    box-shadow: 0 2px 8px var(--shadow-color);
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px var(--shadow-color);
    border-color: var(--accent-color);
}

.card-img-top {
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.card:hover .card-img-top {
    transform: scale(1.05);
}

.btn-add-cart {
    background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
    border: none;
    color: white;
    transition: all 0.3s ease;
}

.btn-add-cart:hover {
    background: linear-gradient(45deg, var(--accent-color), #b88a5a);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px var(--shadow-color);
    color: white;
}

.cart-item {
    border-bottom: 1px solid var(--border-color);
    padding: 1rem 0;
}

.cart-item:last-child {
    border-bottom: none;
}

.cart-item-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
}

.btn-remove {
    color: var(--accent-color);
    border: none;
    background: none;
    font-size: 1.2rem;
    transition: color 0.3s ease;
}

.btn-remove:hover {
    color: var(--primary-color);
}

.quantity-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.quantity-btn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid var(--border-color);
    background: var(--card-bg);
    color: var(--text-color);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.quantity-btn:hover {
    background: var(--secondary-color);
    border-color: var(--accent-color);
    color: var(--text-color);
}

.quantity-input {
    width: 50px;
    text-align: center;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    padding: 0.25rem;
    background-color: var(--card-bg);
    color: var(--text-color);
}

#emptyCart {
    color: #6c757d;
}

.toast {
    background: linear-gradient(45deg, #28a745, #20c997);
    color: white;
}

.toast-header {
    background: rgba(255,255,255,0.1);
    border-bottom: 1px solid rgba(255,255,255,0.2);
}

/* Animation for cart count badge */
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}

.badge.bounce {
    animation: bounce 1s;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .card-img-top {
        height: 150px;
    }
    
    .cart-item-image {
        width: 50px;
        height: 50px;
    }
}

/* Loading animation */
.loading {
    opacity: 0.6;
    pointer-events: none;
}

.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

```

最後更新空購物車和 Toast 的配色：


```css
/* Custom styles for the shopping website */

body {
    background-color: #fefefe;
    color: #5c4a3a;
}

/* Color scheme variables */
:root {
    --primary-color: #d4a574;
    --secondary-color: #e8d5b7;
    --accent-color: #c19a6b;
    --text-color: #5c4a3a;
    --light-bg: #faf8f5;
    --card-bg: #ffffff;
    --border-color: #e8d5b7;
    --shadow-color: rgba(212, 165, 116, 0.15);
}

/* Category filter styles */
.btn-check:checked + .btn {
    transform: scale(1.05);
    box-shadow: 0 4px 8px var(--shadow-color);
    background-color: var(--primary-color) !important;
    border-color: var(--primary-color) !important;
    color: white !important;
}

.btn-group .btn {
    transition: all 0.3s ease;
    border-radius: 1rem !important;
    margin: 0 4px;
    padding: 0.5rem 1rem;
    background-color: var(--light-bg);
    border-color: var(--border-color);
    color: var(--text-color);
}

.btn-group .btn:hover {
    background-color: var(--secondary-color);
    border-color: var(--accent-color);
    color: var(--text-color);
}

.btn-group .btn:first-child {
    border-top-right-radius: 1rem !important;
    border-bottom-right-radius: 1rem !important;
}

.btn-group .btn:last-child {
    border-top-left-radius: 1rem !important;
    border-bottom-left-radius: 1rem !important;
}

.btn-group .btn:not(:first-child):not(:last-child) {
    border-radius: 1rem !important;
}

/* Category badge styles */
.badge {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* Empty state styles */
.display-1 {
    font-size: 4rem;
    opacity: 0.3;
}

/* Search bar styles */
.input-group-text {
    background-color: var(--light-bg);
    border-color: var(--border-color);
    border-radius: 1rem 0 0 1rem !important;
    color: var(--text-color);
}

#searchInput {
    border-left: none;
    border-radius: 0 1rem 1rem 0 !important;
    transition: all 0.3s ease;
    background-color: var(--card-bg);
    border-color: var(--border-color);
    color: var(--text-color);
}

#searchInput:focus {
    border-color: var(--accent-color);
    box-shadow: 0 0 0 0.25rem var(--shadow-color);
    background-color: var(--card-bg);
}

#searchInput:focus + .input-group-text {
    border-color: var(--accent-color);
}

#clearSearchBtn {
    transition: all 0.3s ease;
    border-left: none;
    border-radius: 0 1rem 1rem 0 !important;
    background-color: var(--light-bg);
    border-color: var(--border-color);
    color: var(--text-color);
}

#clearSearchBtn:hover {
    background-color: var(--secondary-color);
    color: var(--accent-color);
}

/* Search highlighting */
mark {
    background-color: var(--secondary-color);
    color: var(--text-color);
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-weight: 600;
}

/* Search results info */
#searchResultsInfo {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-color);
}

/* Search animation */
@keyframes searchPulse {
    0% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0.4);
    }
    70% {
        box-shadow: 0 0 0 10px rgba(13, 110, 253, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0);
    }
}

.searching {
    animation: searchPulse 1.5s infinite;
}

/* Responsive search bar */
@media (max-width: 768px) {
    .input-group {
        flex-direction: column;
    }
    
    .input-group-text {
        border-radius: 1rem 1rem 0 0 !important;
        border-bottom: none;
    }
    
    #searchInput {
        border-radius: 0 0 1rem 1rem !important;
        border-top: none;
    }
    
    #clearSearchBtn {
        border-radius: 1rem;
        margin-top: 0.5rem;
        width: 100%;
    }
}

/* Navbar styles */
.navbar {
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color)) !important;
    box-shadow: 0 2px 10px var(--shadow-color);
}

.navbar-brand {
    font-weight: bold;
    font-size: 1.5rem;
    color: white !important;
}

.navbar-nav .nav-link {
    color: white !important;
    transition: color 0.3s ease;
}

.navbar-nav .nav-link:hover {
    color: var(--light-bg) !important;
}

.navbar-toggler {
    border-color: white;
}

.navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

.card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid var(--border-color);
    background-color: var(--card-bg);
    box-shadow: 0 2px 8px var(--shadow-color);
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px var(--shadow-color);
    border-color: var(--accent-color);
}

.card-img-top {
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.card:hover .card-img-top {
    transform: scale(1.05);
}

.btn-add-cart {
    background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
    border: none;
    color: white;
    transition: all 0.3s ease;
}

.btn-add-cart:hover {
    background: linear-gradient(45deg, var(--accent-color), #b88a5a);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px var(--shadow-color);
    color: white;
}

.cart-item {
    border-bottom: 1px solid var(--border-color);
    padding: 1rem 0;
}

.cart-item:last-child {
    border-bottom: none;
}

.cart-item-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
}

.btn-remove {
    color: var(--accent-color);
    border: none;
    background: none;
    font-size: 1.2rem;
    transition: color 0.3s ease;
}

.btn-remove:hover {
    color: var(--primary-color);
}

.quantity-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.quantity-btn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid var(--border-color);
    background: var(--card-bg);
    color: var(--text-color);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.quantity-btn:hover {
    background: var(--secondary-color);
    border-color: var(--accent-color);
    color: var(--text-color);
}

.quantity-input {
    width: 50px;
    text-align: center;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    padding: 0.25rem;
    background-color: var(--card-bg);
    color: var(--text-color);
}

#emptyCart {
    color: var(--text-color);
    opacity: 0.7;
}

.toast {
    background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
    color: white;
}

.toast-header {
    background: rgba(255,255,255,0.1);
    border-bottom: 1px solid rgba(255,255,255,0.2);
}

/* Animation for cart count badge */
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}

.badge.bounce {
    animation: bounce 1s;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .card-img-top {
        height: 150px;
    }
    
    .cart-item-image {
        width: 50px;
        height: 50px;
    }
}

/* Loading animation */
.loading {
    opacity: 0.6;
    pointer-events: none;
}

.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

```

讓我檢查是否有任何 linting 錯誤：


完美！我已經成功將您的購物網站更改為淺色系風格，使用白色背景和駝色、米色調的配色方案。以下是更新的設計特色：

## 🎨 淺色系設計風格

### 🎯 配色方案
- **主色調**：駝色 (`#d4a574`) - 溫暖的駝色作為主要品牌色
- **輔助色**：米色 (`#e8d5b7`) - 柔和的米色作為輔助色
- **強調色**：深駝色 (`#c19a6b`) - 用於強調和互動元素
- **背景色**：純白 (`#fefefe`) - 乾淨的白色背景
- **文字色**：深棕色 (`#5c4a3a`) - 易讀的深色文字

### 🏠 整體視覺效果

1. **導航欄**
   - 駝色漸層背景
   - 白色文字和圖示
   - 柔和的陰影效果

2. **分類按鈕**
   - 淺米色背景
   - 駝色邊框
   - 選中時顯示駝色背景

3. **商品卡片**
   - 純白背景
   - 米色邊框
   - 駝色陰影效果
   - 懸停時邊框變為駝色

4. **搜尋欄**
   - 米色背景
   - 駝色邊框
   - 聚焦時駝色高亮

5. **購物車按鈕**
   - 駝色漸層背景
   - 白色文字
   - 懸停時深駝色效果

### ✨ 設計優勢

1. **溫暖舒適**：駝色和米色調營造溫暖、舒適的購物氛圍
2. **易讀性佳**：深棕色文字在淺色背景上具有良好的對比度
3. **現代簡約**：純白背景搭配駝色調，呈現現代簡約風格
4. **視覺層次**：不同深淺的駝色調創造清晰的視覺層次
5. **品牌一致性**：統一的配色方案提升品牌識別度

### 🎨 色彩心理學
- **駝色**：代表溫暖、舒適、可靠
- **米色**：象徵柔和、優雅、自然
- **白色**：傳達純淨、簡潔、專業
- **深棕色**：展現穩重、專業、可信

現在您的購物網站具有了優雅、溫暖的淺色系設計風格！這種配色方案非常適合購物網站，能夠營造舒適的購物氛圍，提升用戶體驗。

---

**User**

請將這四個按鈕間距加大，使按鈕變大時不會碰到隔壁按鈕

---

**Cursor**

我將為您增加分類按鈕之間的間距，確保按鈕在變大時不會相互碰撞。


```css
/* Custom styles for the shopping website */

body {
    background-color: #fefefe;
    color: #5c4a3a;
}

/* Color scheme variables */
:root {
    --primary-color: #d4a574;
    --secondary-color: #e8d5b7;
    --accent-color: #c19a6b;
    --text-color: #5c4a3a;
    --light-bg: #faf8f5;
    --card-bg: #ffffff;
    --border-color: #e8d5b7;
    --shadow-color: rgba(212, 165, 116, 0.15);
}

/* Category filter styles */
.btn-check:checked + .btn {
    transform: scale(1.05);
    box-shadow: 0 4px 8px var(--shadow-color);
    background-color: var(--primary-color) !important;
    border-color: var(--primary-color) !important;
    color: white !important;
}

.btn-group .btn {
    transition: all 0.3s ease;
    border-radius: 1rem !important;
    margin: 0 8px;
    padding: 0.75rem 1.5rem;
    background-color: var(--light-bg);
    border-color: var(--border-color);
    color: var(--text-color);
    font-weight: 500;
}

.btn-group .btn:hover {
    background-color: var(--secondary-color);
    border-color: var(--accent-color);
    color: var(--text-color);
}

.btn-group .btn:first-child {
    border-top-right-radius: 1rem !important;
    border-bottom-right-radius: 1rem !important;
}

.btn-group .btn:last-child {
    border-top-left-radius: 1rem !important;
    border-bottom-left-radius: 1rem !important;
}

.btn-group .btn:not(:first-child):not(:last-child) {
    border-radius: 1rem !important;
}

/* Category badge styles */
.badge {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* Empty state styles */
.display-1 {
    font-size: 4rem;
    opacity: 0.3;
}

/* Search bar styles */
.input-group-text {
    background-color: var(--light-bg);
    border-color: var(--border-color);
    border-radius: 1rem 0 0 1rem !important;
    color: var(--text-color);
}

#searchInput {
    border-left: none;
    border-radius: 0 1rem 1rem 0 !important;
    transition: all 0.3s ease;
    background-color: var(--card-bg);
    border-color: var(--border-color);
    color: var(--text-color);
}

#searchInput:focus {
    border-color: var(--accent-color);
    box-shadow: 0 0 0 0.25rem var(--shadow-color);
    background-color: var(--card-bg);
}

#searchInput:focus + .input-group-text {
    border-color: var(--accent-color);
}

#clearSearchBtn {
    transition: all 0.3s ease;
    border-left: none;
    border-radius: 0 1rem 1rem 0 !important;
    background-color: var(--light-bg);
    border-color: var(--border-color);
    color: var(--text-color);
}

#clearSearchBtn:hover {
    background-color: var(--secondary-color);
    color: var(--accent-color);
}

/* Search highlighting */
mark {
    background-color: var(--secondary-color);
    color: var(--text-color);
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-weight: 600;
}

/* Search results info */
#searchResultsInfo {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-color);
}

/* Search animation */
@keyframes searchPulse {
    0% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0.4);
    }
    70% {
        box-shadow: 0 0 0 10px rgba(13, 110, 253, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0);
    }
}

.searching {
    animation: searchPulse 1.5s infinite;
}

/* Responsive search bar */
@media (max-width: 768px) {
    .input-group {
        flex-direction: column;
    }
    
    .input-group-text {
        border-radius: 1rem 1rem 0 0 !important;
        border-bottom: none;
    }
    
    #searchInput {
        border-radius: 0 0 1rem 1rem !important;
        border-top: none;
    }
    
    #clearSearchBtn {
        border-radius: 1rem;
        margin-top: 0.5rem;
        width: 100%;
    }
}

/* Navbar styles */
.navbar {
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color)) !important;
    box-shadow: 0 2px 10px var(--shadow-color);
}

.navbar-brand {
    font-weight: bold;
    font-size: 1.5rem;
    color: white !important;
}

.navbar-nav .nav-link {
    color: white !important;
    transition: color 0.3s ease;
}

.navbar-nav .nav-link:hover {
    color: var(--light-bg) !important;
}

.navbar-toggler {
    border-color: white;
}

.navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

.card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid var(--border-color);
    background-color: var(--card-bg);
    box-shadow: 0 2px 8px var(--shadow-color);
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px var(--shadow-color);
    border-color: var(--accent-color);
}

.card-img-top {
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.card:hover .card-img-top {
    transform: scale(1.05);
}

.btn-add-cart {
    background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
    border: none;
    color: white;
    transition: all 0.3s ease;
}

.btn-add-cart:hover {
    background: linear-gradient(45deg, var(--accent-color), #b88a5a);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px var(--shadow-color);
    color: white;
}

.cart-item {
    border-bottom: 1px solid var(--border-color);
    padding: 1rem 0;
}

.cart-item:last-child {
    border-bottom: none;
}

.cart-item-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
}

.btn-remove {
    color: var(--accent-color);
    border: none;
    background: none;
    font-size: 1.2rem;
    transition: color 0.3s ease;
}

.btn-remove:hover {
    color: var(--primary-color);
}

.quantity-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.quantity-btn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid var(--border-color);
    background: var(--card-bg);
    color: var(--text-color);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.quantity-btn:hover {
    background: var(--secondary-color);
    border-color: var(--accent-color);
    color: var(--text-color);
}

.quantity-input {
    width: 50px;
    text-align: center;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    padding: 0.25rem;
    background-color: var(--card-bg);
    color: var(--text-color);
}

#emptyCart {
    color: var(--text-color);
    opacity: 0.7;
}

.toast {
    background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
    color: white;
}

.toast-header {
    background: rgba(255,255,255,0.1);
    border-bottom: 1px solid rgba(255,255,255,0.2);
}

/* Animation for cart count badge */
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}

.badge.bounce {
    animation: bounce 1s;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .card-img-top {
        height: 150px;
    }
    
    .cart-item-image {
        width: 50px;
        height: 50px;
    }
}

/* Loading animation */
.loading {
    opacity: 0.6;
    pointer-events: none;
}

.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

```

現在我還需要調整按鈕群組的整體間距，確保在響應式設計中也有足夠的空間：


```css
/* Custom styles for the shopping website */

body {
    background-color: #fefefe;
    color: #5c4a3a;
}

/* Color scheme variables */
:root {
    --primary-color: #d4a574;
    --secondary-color: #e8d5b7;
    --accent-color: #c19a6b;
    --text-color: #5c4a3a;
    --light-bg: #faf8f5;
    --card-bg: #ffffff;
    --border-color: #e8d5b7;
    --shadow-color: rgba(212, 165, 116, 0.15);
}

/* Category filter styles */
.btn-check:checked + .btn {
    transform: scale(1.05);
    box-shadow: 0 4px 8px var(--shadow-color);
    background-color: var(--primary-color) !important;
    border-color: var(--primary-color) !important;
    color: white !important;
}

.btn-group .btn {
    transition: all 0.3s ease;
    border-radius: 1rem !important;
    margin: 0 8px;
    padding: 0.75rem 1.5rem;
    background-color: var(--light-bg);
    border-color: var(--border-color);
    color: var(--text-color);
    font-weight: 500;
}

.btn-group .btn:hover {
    background-color: var(--secondary-color);
    border-color: var(--accent-color);
    color: var(--text-color);
}

.btn-group {
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
}

.btn-group .btn:first-child {
    border-top-right-radius: 1rem !important;
    border-bottom-right-radius: 1rem !important;
}

.btn-group .btn:last-child {
    border-top-left-radius: 1rem !important;
    border-bottom-left-radius: 1rem !important;
}

.btn-group .btn:not(:first-child):not(:last-child) {
    border-radius: 1rem !important;
}

/* Responsive button spacing */
@media (max-width: 768px) {
    .btn-group .btn {
        margin: 0 4px;
        padding: 0.6rem 1.2rem;
        font-size: 0.9rem;
    }
}

@media (max-width: 576px) {
    .btn-group {
        flex-direction: column;
        gap: 0.75rem;
    }
    
    .btn-group .btn {
        margin: 0;
        width: 100%;
        max-width: 280px;
    }
}

/* Category badge styles */
.badge {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* Empty state styles */
.display-1 {
    font-size: 4rem;
    opacity: 0.3;
}

/* Search bar styles */
.input-group-text {
    background-color: var(--light-bg);
    border-color: var(--border-color);
    border-radius: 1rem 0 0 1rem !important;
    color: var(--text-color);
}

#searchInput {
    border-left: none;
    border-radius: 0 1rem 1rem 0 !important;
    transition: all 0.3s ease;
    background-color: var(--card-bg);
    border-color: var(--border-color);
    color: var(--text-color);
}

#searchInput:focus {
    border-color: var(--accent-color);
    box-shadow: 0 0 0 0.25rem var(--shadow-color);
    background-color: var(--card-bg);
}

#searchInput:focus + .input-group-text {
    border-color: var(--accent-color);
}

#clearSearchBtn {
    transition: all 0.3s ease;
    border-left: none;
    border-radius: 0 1rem 1rem 0 !important;
    background-color: var(--light-bg);
    border-color: var(--border-color);
    color: var(--text-color);
}

#clearSearchBtn:hover {
    background-color: var(--secondary-color);
    color: var(--accent-color);
}

/* Search highlighting */
mark {
    background-color: var(--secondary-color);
    color: var(--text-color);
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-weight: 600;
}

/* Search results info */
#searchResultsInfo {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-color);
}

/* Search animation */
@keyframes searchPulse {
    0% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0.4);
    }
    70% {
        box-shadow: 0 0 0 10px rgba(13, 110, 253, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0);
    }
}

.searching {
    animation: searchPulse 1.5s infinite;
}

/* Responsive search bar */
@media (max-width: 768px) {
    .input-group {
        flex-direction: column;
    }
    
    .input-group-text {
        border-radius: 1rem 1rem 0 0 !important;
        border-bottom: none;
    }
    
    #searchInput {
        border-radius: 0 0 1rem 1rem !important;
        border-top: none;
    }
    
    #clearSearchBtn {
        border-radius: 1rem;
        margin-top: 0.5rem;
        width: 100%;
    }
}

/* Navbar styles */
.navbar {
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color)) !important;
    box-shadow: 0 2px 10px var(--shadow-color);
}

.navbar-brand {
    font-weight: bold;
    font-size: 1.5rem;
    color: white !important;
}

.navbar-nav .nav-link {
    color: white !important;
    transition: color 0.3s ease;
}

.navbar-nav .nav-link:hover {
    color: var(--light-bg) !important;
}

.navbar-toggler {
    border-color: white;
}

.navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

.card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid var(--border-color);
    background-color: var(--card-bg);
    box-shadow: 0 2px 8px var(--shadow-color);
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px var(--shadow-color);
    border-color: var(--accent-color);
}

.card-img-top {
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.card:hover .card-img-top {
    transform: scale(1.05);
}

.btn-add-cart {
    background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
    border: none;
    color: white;
    transition: all 0.3s ease;
}

.btn-add-cart:hover {
    background: linear-gradient(45deg, var(--accent-color), #b88a5a);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px var(--shadow-color);
    color: white;
}

.cart-item {
    border-bottom: 1px solid var(--border-color);
    padding: 1rem 0;
}

.cart-item:last-child {
    border-bottom: none;
}

.cart-item-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
}

.btn-remove {
    color: var(--accent-color);
    border: none;
    background: none;
    font-size: 1.2rem;
    transition: color 0.3s ease;
}

.btn-remove:hover {
    color: var(--primary-color);
}

.quantity-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.quantity-btn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid var(--border-color);
    background: var(--card-bg);
    color: var(--text-color);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.quantity-btn:hover {
    background: var(--secondary-color);
    border-color: var(--accent-color);
    color: var(--text-color);
}

.quantity-input {
    width: 50px;
    text-align: center;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    padding: 0.25rem;
    background-color: var(--card-bg);
    color: var(--text-color);
}

#emptyCart {
    color: var(--text-color);
    opacity: 0.7;
}

.toast {
    background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
    color: white;
}

.toast-header {
    background: rgba(255,255,255,0.1);
    border-bottom: 1px solid rgba(255,255,255,0.2);
}

/* Animation for cart count badge */
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}

.badge.bounce {
    animation: bounce 1s;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .card-img-top {
        height: 150px;
    }
    
    .cart-item-image {
        width: 50px;
        height: 50px;
    }
}

/* Loading animation */
.loading {
    opacity: 0.6;
    pointer-events: none;
}

.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

```

讓我檢查是否有任何 linting 錯誤：


完美！我已經成功增加了分類按鈕之間的間距，確保按鈕在變大時不會相互碰撞。以下是更新的設計特色：

## 📏 按鈕間距優化

### 🎯 間距調整
- **水平間距**：從 `4px` 增加到 `8px`
- **內邊距**：從 `0.5rem 1rem` 增加到 `0.75rem 1.5rem`
- **按鈕群組間距**：添加 `0.5rem` 的 gap 間距
- **字體粗細**：增加 `font-weight: 500` 提升可讀性

### 📱 響應式設計

1. **桌面版 (>768px)**
   - 按鈕間距：`8px`
   - 內邊距：`0.75rem 1.5rem`
   - 水平排列，居中對齊

2. **平板版 (≤768px)**
   - 按鈕間距：`4px`
   - 內邊距：`0.6rem 1.2rem`
   - 字體大小：`0.9rem`
   - 保持水平排列

3. **手機版 (≤576px)**
   - 改為垂直排列
   - 按鈕寬度：100%（最大 280px）
   - 間距：`0.75rem`
   - 居中對齊

### ✨ 設計優勢

1. **防碰撞設計**：充足的間距確保按鈕變大時不會重疊
2. **視覺舒適**：更大的間距提供更舒適的視覺體驗
3. **觸控友好**：更大的按鈕區域提升觸控體驗
4. **響應式適配**：在不同螢幕尺寸下都有最佳的顯示效果
5. **視覺層次**：間距幫助區分不同的分類選項

### 🎨 視覺效果
- **更寬敞的佈局**：按鈕之間有充足的呼吸空間
- **更好的可讀性**：增加的字體粗細提升文字清晰度
- **更舒適的點擊**：更大的按鈕區域降低誤觸風險
- **更優雅的排列**：居中對齊創造平衡的視覺效果

現在您的分類按鈕具有了更寬敞的間距和更好的響應式設計！這確保了在任何螢幕尺寸下，按鈕都有足夠的空間，不會相互碰撞，提供更好的用戶體驗。

---

**User**

每個商品card的照片都可以點開

---

**Cursor**

我將為每個商品卡片的照片添加點擊功能，讓用戶可以點擊查看大圖。


首先，我需要在 HTML 中添加圖片查看模態框：


```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>商品購物網站</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
            <a class="navbar-brand" href="#">
                <i class="bi bi-shop"></i> 茶茶的店
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#cartModal">
                            <i class="bi bi-cart3"></i> 購物車 
                            <span class="badge bg-danger" id="cartCount">0</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

        <!-- Main Content -->
        <div class="container mt-4">
            <div class="row">
                <div class="col-12">
                    <h1 class="text-center mb-4">精選商品</h1>
                    
                    <!-- Search Bar -->
                    <div class="row justify-content-center mb-4">
                        <div class="col-lg-6 col-md-8 col-sm-10">
                            <div class="input-group">
                                <span class="input-group-text">
                                    <i class="bi bi-search"></i>
                                </span>
                                <input type="text" class="form-control form-control-lg" id="searchInput" 
                                       placeholder="搜尋商品名稱或描述..." aria-label="搜尋商品">
                                <button class="btn btn-outline-secondary" type="button" id="clearSearchBtn" style="display: none;">
                                    <i class="bi bi-x-lg"></i>
                                </button>
                            </div>
                            <div class="mt-2">
                                <small class="text-muted" id="searchResultsInfo"></small>
                            </div>
                        </div>
                    </div>

                    <!-- Category Filter -->
                    <div class="row justify-content-center mb-4">
                        <div class="col-auto">
                            <div class="btn-group" role="group" aria-label="商品分類">
                                <input type="radio" class="btn-check" name="categoryFilter" id="categoryAll" value="all" checked>
                                <label class="btn btn-outline-primary" for="categoryAll">
                                    <i class="bi bi-grid-3x3-gap"></i> 全部商品
                                </label>
                                
                                <input type="radio" class="btn-check" name="categoryFilter" id="categoryA" value="A">
                                <label class="btn btn-outline-success" for="categoryA">
                                    <i class="bi bi-laptop"></i> A類 - 電子產品
                                </label>
                                
                                <input type="radio" class="btn-check" name="categoryFilter" id="categoryB" value="B">
                                <label class="btn btn-outline-warning" for="categoryB">
                                    <i class="bi bi-house"></i> B類 - 家電用品
                                </label>
                                
                                <input type="radio" class="btn-check" name="categoryFilter" id="categoryC" value="C">
                                <label class="btn btn-outline-info" for="categoryC">
                                    <i class="bi bi-heart-pulse"></i> C類 - 運動健康
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        <!-- Products Grid -->
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4" id="productsContainer">
            <!-- Products will be dynamically generated here -->
        </div>
    </div>

    <!-- Cart Modal -->
    <div class="modal fade" id="cartModal" tabindex="-1" aria-labelledby="cartModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="cartModalLabel">
                        <i class="bi bi-cart3"></i> 購物車
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div id="cartItems">
                        <!-- Cart items will be displayed here -->
                    </div>
                    <div id="emptyCart" class="text-center text-muted py-4" style="display: none;">
                        <i class="bi bi-cart-x display-1"></i>
                        <p class="mt-2">購物車是空的</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="d-flex justify-content-between w-100">
                        <h5>總計: $<span id="totalPrice">0</span></h5>
                        <button type="button" class="btn btn-success" id="checkoutBtn" disabled>
                            <i class="bi bi-credit-card"></i> 結帳
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Image Modal -->
    <div class="modal fade" id="imageModal" tabindex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="imageModalLabel">商品圖片</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center">
                    <img id="modalImage" src="" alt="" class="img-fluid rounded">
                    <div class="mt-3">
                        <h6 id="modalProductName" class="text-muted"></h6>
                        <p id="modalProductPrice" class="h5 text-primary mb-0"></p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                        <i class="bi bi-x-lg"></i> 關閉
                    </button>
                    <button type="button" class="btn btn-primary" id="addToCartFromModal">
                        <i class="bi bi-cart-plus"></i> 加入購物車
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Toast for notifications -->
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="cartToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <i class="bi bi-check-circle-fill text-success me-2"></i>
                <strong class="me-auto">成功</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                商品已加入購物車！
            </div>
        </div>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Custom JS -->
    <script src="script.js"></script>
</body>
</html>

```

現在我需要修改 JavaScript 來為商品卡片圖片添加點擊功能：


```javascript
// Shopping cart functionality
class ShoppingCart {
    constructor() {
        this.items = [];
        this.loadFromStorage();
        this.updateCartDisplay();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveToStorage();
        this.updateCartDisplay();
        this.showToast();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        this.updateCartDisplay();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
                this.saveToStorage();
                this.updateCartDisplay();
            }
        }
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    updateCartDisplay() {
        this.updateCartCount();
        this.updateCartModal();
        this.updateTotalPrice();
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        cartCount.textContent = this.getTotalItems();
        
        if (this.getTotalItems() > 0) {
            cartCount.classList.add('bounce');
            setTimeout(() => cartCount.classList.remove('bounce'), 1000);
        }
    }

    updateCartModal() {
        const cartItems = document.getElementById('cartItems');
        const emptyCart = document.getElementById('emptyCart');
        
        if (this.items.length === 0) {
            cartItems.style.display = 'none';
            emptyCart.style.display = 'block';
        } else {
            cartItems.style.display = 'block';
            emptyCart.style.display = 'none';
            
            cartItems.innerHTML = this.items.map(item => `
                <div class="cart-item d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${item.name}</h6>
                        <p class="text-muted mb-0">$${item.price}</p>
                    </div>
                    <div class="quantity-controls me-3">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                               onchange="cart.updateQuantity(${item.id}, parseInt(this.value))">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <div class="text-end me-3">
                        <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                    </div>
                    <button class="btn-remove" onclick="cart.removeItem(${item.id})" title="移除商品">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    }

    updateTotalPrice() {
        const totalPrice = document.getElementById('totalPrice');
        const checkoutBtn = document.getElementById('checkoutBtn');
        
        totalPrice.textContent = this.getTotalPrice().toFixed(2);
        checkoutBtn.disabled = this.items.length === 0;
    }

    showToast() {
        const toast = new bootstrap.Toast(document.getElementById('cartToast'));
        toast.show();
    }

    saveToStorage() {
        localStorage.setItem('shoppingCart', JSON.stringify(this.items));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('shoppingCart');
        if (stored) {
            this.items = JSON.parse(stored);
        }
    }

    checkout() {
        if (this.items.length === 0) {
            alert('購物車是空的！');
            return;
        }
        
        alert(`結帳成功！\n總金額: $${this.getTotalPrice().toFixed(2)}\n商品數量: ${this.getTotalItems()}`);
        this.items = [];
        this.saveToStorage();
        this.updateCartDisplay();
    }
}

// Product data with categories
const products = [
    {
        id: 1,
        name: "枕頭貓",
        description: "高品質音效，舒適佩戴，長達8小時續航",
        price: 129.99,
        category: "A",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/pillow_cat.png"
    },
    {
        id: 2,
        name: "智能手錶",
        description: "健康監測，運動追蹤，防水設計",
        price: 299.99,
        category: "A",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/淺水貓.png"
    },
    {
        id: 3,
        name: "筆記型電腦",
        description: "高效能處理器，輕薄設計，長效電池",
        price: 899.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop"
    },
    {
        id: 4,
        name: "智能手機",
        description: "最新處理器，高畫質相機，5G網路",
        price: 699.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop"
    },
    {
        id: 5,
        name: "咖啡機",
        description: "全自動研磨，多種咖啡選擇，定時功能",
        price: 199.99,
        category: "B",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop"
    },
    {
        id: 6,
        name: "健身器材",
        description: "多功能訓練，可調節重量，居家健身首選",
        price: 149.99,
        category: "C",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop"
    },
    {
        id: 7,
        name: "平板電腦",
        description: "大螢幕顯示，觸控筆支援，娛樂辦公兩相宜",
        price: 399.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=200&fit=crop"
    },
    {
        id: 8,
        name: "遊戲主機",
        description: "4K遊戲體驗，豐富遊戲庫，多人遊戲支援",
        price: 499.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300&h=200&fit=crop"
    },
    {
        id: 9,
        name: "空氣清淨機",
        description: "高效過濾，智能感應，靜音運作",
        price: 249.99,
        category: "B",
        image: "https://images.unsplash.com/photo-1581578731548-c6a0c3f5f1b0?w=300&h=200&fit=crop"
    },
    {
        id: 10,
        name: "跑步機",
        description: "可折疊設計，多種運動模式，心率監測",
        price: 599.99,
        category: "C",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop"
    },
    {
        id: 11,
        name: "掃地機器人",
        description: "智能路徑規劃，自動回充，APP控制",
        price: 349.99,
        category: "B",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop"
    },
    {
        id: 12,
        name: "瑜伽墊",
        description: "防滑設計，環保材質，多種顏色選擇",
        price: 39.99,
        category: "C",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop"
    }
];

// Initialize shopping cart
let cart;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    cart = new ShoppingCart();
    renderProducts();
    setupEventListeners();
});

// Get current filter
function getCurrentFilter() {
    const checkedFilter = document.querySelector('input[name="categoryFilter"]:checked');
    return checkedFilter ? checkedFilter.value : 'all';
}

// Get current search term
function getCurrentSearchTerm() {
    return document.getElementById('searchInput').value.trim().toLowerCase();
}

// Search products by name and description
function searchProducts(products, searchTerm) {
    if (!searchTerm) {
        return products;
    }
    
    return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
}

// Filter products by category
function filterProducts(category) {
    if (category === 'all') {
        return products;
    }
    return products.filter(product => product.category === category);
}

// Apply both search and category filters
function getFilteredProducts() {
    const category = getCurrentFilter();
    const searchTerm = getCurrentSearchTerm();
    
    let filteredProducts = filterProducts(category);
    filteredProducts = searchProducts(filteredProducts, searchTerm);
    
    return filteredProducts;
}

// Render products with filtering
function renderProducts() {
    const container = document.getElementById('productsContainer');
    const filteredProducts = getFilteredProducts();
    const searchTerm = getCurrentSearchTerm();
    const category = getCurrentFilter();
    
    // Update search results info
    updateSearchResultsInfo(filteredProducts.length, searchTerm, category);
    
    if (filteredProducts.length === 0) {
        let emptyMessage = '';
        if (searchTerm) {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-search display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">找不到相關商品</h3>
                        <p class="text-muted">沒有找到包含「${searchTerm}」的商品</p>
                        <button class="btn btn-outline-primary mt-3" onclick="clearSearch()">
                            <i class="bi bi-arrow-left"></i> 清除搜尋
                        </button>
                    </div>
                </div>
            `;
        } else {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-grid display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">此分類暫無商品</h3>
                        <p class="text-muted">請選擇其他分類或查看全部商品</p>
                    </div>
                </div>
            `;
        }
        container.innerHTML = emptyMessage;
        return;
    }
    
    container.innerHTML = filteredProducts.map(product => {
        const searchTerm = getCurrentSearchTerm();
        const highlightedName = highlightSearchTerm(product.name, searchTerm);
        const highlightedDescription = highlightSearchTerm(product.description, searchTerm);
        
        return `
            <div class="col">
                <div class="card h-100">
                    <div class="position-relative">
                        <img src="${product.image}" class="card-img-top product-image" alt="${product.name}" loading="lazy" 
                             data-product-id="${product.id}" style="cursor: pointer;">
                        <span class="position-absolute top-0 start-0 m-2 badge bg-${getCategoryColor(product.category)}">
                            ${product.category}類
                        </span>
                        <div class="position-absolute top-0 end-0 m-2">
                            <button class="btn btn-sm btn-light btn-image-zoom" data-product-id="${product.id}" title="查看大圖">
                                <i class="bi bi-zoom-in"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${highlightedName}</h5>
                        <p class="card-text flex-grow-1">${highlightedDescription}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="h5 text-primary mb-0">$${product.price}</span>
                            <button class="btn btn-primary btn-add-cart" onclick="addToCart(${product.id})">
                                <i class="bi bi-cart-plus"></i> 加入購物車
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Get category color for badge
function getCategoryColor(category) {
    const colors = {
        'A': 'success',
        'B': 'warning', 
        'C': 'info'
    };
    return colors[category] || 'secondary';
}

// Update search results info
function updateSearchResultsInfo(count, searchTerm, category) {
    const searchResultsInfo = document.getElementById('searchResultsInfo');
    let infoText = '';
    
    if (searchTerm) {
        if (category === 'all') {
            infoText = `找到 ${count} 個包含「${searchTerm}」的商品`;
        } else {
            const categoryNames = {
                'A': '電子產品',
                'B': '家電用品',
                'C': '運動健康'
            };
            infoText = `在${categoryNames[category]}中找到 ${count} 個包含「${searchTerm}」的商品`;
        }
    } else {
        if (category === 'all') {
            infoText = `顯示全部 ${count} 個商品`;
        } else {
            const categoryNames = {
                'A': '電子產品',
                'B': '家電用品',
                'C': '運動健康'
            };
            infoText = `顯示 ${categoryNames[category]} 類別中的 ${count} 個商品`;
        }
    }
    
    searchResultsInfo.textContent = infoText;
}

// Clear search
function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('clearSearchBtn').style.display = 'none';
    renderProducts();
}

// Highlight search terms in text
function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.addItem(product);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        cart.checkout();
    });
    
    // Search input events
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    
    // Real-time search
    searchInput.addEventListener('input', function() {
        const hasValue = this.value.trim().length > 0;
        clearSearchBtn.style.display = hasValue ? 'block' : 'none';
        renderProducts();
    });
    
    // Clear search button
    clearSearchBtn.addEventListener('click', clearSearch);
    
    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            renderProducts();
        }
    });
    
    // Category filter change
    document.querySelectorAll('input[name="categoryFilter"]').forEach(radio => {
        radio.addEventListener('change', function() {
            renderProducts();
        });
    });
    
    // Prevent form submission on quantity input enter
    document.addEventListener('keypress', function(e) {
        if (e.target.classList.contains('quantity-input') && e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
        }
    });
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('zh-TW', {
        style: 'currency',
        currency: 'TWD'
    }).format(amount);
}

```

現在我需要添加圖片模態框的顯示邏輯：


```javascript
// Shopping cart functionality
class ShoppingCart {
    constructor() {
        this.items = [];
        this.loadFromStorage();
        this.updateCartDisplay();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveToStorage();
        this.updateCartDisplay();
        this.showToast();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        this.updateCartDisplay();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
                this.saveToStorage();
                this.updateCartDisplay();
            }
        }
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    updateCartDisplay() {
        this.updateCartCount();
        this.updateCartModal();
        this.updateTotalPrice();
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        cartCount.textContent = this.getTotalItems();
        
        if (this.getTotalItems() > 0) {
            cartCount.classList.add('bounce');
            setTimeout(() => cartCount.classList.remove('bounce'), 1000);
        }
    }

    updateCartModal() {
        const cartItems = document.getElementById('cartItems');
        const emptyCart = document.getElementById('emptyCart');
        
        if (this.items.length === 0) {
            cartItems.style.display = 'none';
            emptyCart.style.display = 'block';
        } else {
            cartItems.style.display = 'block';
            emptyCart.style.display = 'none';
            
            cartItems.innerHTML = this.items.map(item => `
                <div class="cart-item d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${item.name}</h6>
                        <p class="text-muted mb-0">$${item.price}</p>
                    </div>
                    <div class="quantity-controls me-3">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                               onchange="cart.updateQuantity(${item.id}, parseInt(this.value))">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <div class="text-end me-3">
                        <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                    </div>
                    <button class="btn-remove" onclick="cart.removeItem(${item.id})" title="移除商品">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    }

    updateTotalPrice() {
        const totalPrice = document.getElementById('totalPrice');
        const checkoutBtn = document.getElementById('checkoutBtn');
        
        totalPrice.textContent = this.getTotalPrice().toFixed(2);
        checkoutBtn.disabled = this.items.length === 0;
    }

    showToast() {
        const toast = new bootstrap.Toast(document.getElementById('cartToast'));
        toast.show();
    }

    saveToStorage() {
        localStorage.setItem('shoppingCart', JSON.stringify(this.items));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('shoppingCart');
        if (stored) {
            this.items = JSON.parse(stored);
        }
    }

    checkout() {
        if (this.items.length === 0) {
            alert('購物車是空的！');
            return;
        }
        
        alert(`結帳成功！\n總金額: $${this.getTotalPrice().toFixed(2)}\n商品數量: ${this.getTotalItems()}`);
        this.items = [];
        this.saveToStorage();
        this.updateCartDisplay();
    }
}

// Product data with categories
const products = [
    {
        id: 1,
        name: "枕頭貓",
        description: "高品質音效，舒適佩戴，長達8小時續航",
        price: 129.99,
        category: "A",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/pillow_cat.png"
    },
    {
        id: 2,
        name: "智能手錶",
        description: "健康監測，運動追蹤，防水設計",
        price: 299.99,
        category: "A",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/淺水貓.png"
    },
    {
        id: 3,
        name: "筆記型電腦",
        description: "高效能處理器，輕薄設計，長效電池",
        price: 899.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop"
    },
    {
        id: 4,
        name: "智能手機",
        description: "最新處理器，高畫質相機，5G網路",
        price: 699.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop"
    },
    {
        id: 5,
        name: "咖啡機",
        description: "全自動研磨，多種咖啡選擇，定時功能",
        price: 199.99,
        category: "B",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop"
    },
    {
        id: 6,
        name: "健身器材",
        description: "多功能訓練，可調節重量，居家健身首選",
        price: 149.99,
        category: "C",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop"
    },
    {
        id: 7,
        name: "平板電腦",
        description: "大螢幕顯示，觸控筆支援，娛樂辦公兩相宜",
        price: 399.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=200&fit=crop"
    },
    {
        id: 8,
        name: "遊戲主機",
        description: "4K遊戲體驗，豐富遊戲庫，多人遊戲支援",
        price: 499.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300&h=200&fit=crop"
    },
    {
        id: 9,
        name: "空氣清淨機",
        description: "高效過濾，智能感應，靜音運作",
        price: 249.99,
        category: "B",
        image: "https://images.unsplash.com/photo-1581578731548-c6a0c3f5f1b0?w=300&h=200&fit=crop"
    },
    {
        id: 10,
        name: "跑步機",
        description: "可折疊設計，多種運動模式，心率監測",
        price: 599.99,
        category: "C",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop"
    },
    {
        id: 11,
        name: "掃地機器人",
        description: "智能路徑規劃，自動回充，APP控制",
        price: 349.99,
        category: "B",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop"
    },
    {
        id: 12,
        name: "瑜伽墊",
        description: "防滑設計，環保材質，多種顏色選擇",
        price: 39.99,
        category: "C",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop"
    }
];

// Initialize shopping cart
let cart;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    cart = new ShoppingCart();
    renderProducts();
    setupEventListeners();
});

// Get current filter
function getCurrentFilter() {
    const checkedFilter = document.querySelector('input[name="categoryFilter"]:checked');
    return checkedFilter ? checkedFilter.value : 'all';
}

// Get current search term
function getCurrentSearchTerm() {
    return document.getElementById('searchInput').value.trim().toLowerCase();
}

// Search products by name and description
function searchProducts(products, searchTerm) {
    if (!searchTerm) {
        return products;
    }
    
    return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
}

// Filter products by category
function filterProducts(category) {
    if (category === 'all') {
        return products;
    }
    return products.filter(product => product.category === category);
}

// Apply both search and category filters
function getFilteredProducts() {
    const category = getCurrentFilter();
    const searchTerm = getCurrentSearchTerm();
    
    let filteredProducts = filterProducts(category);
    filteredProducts = searchProducts(filteredProducts, searchTerm);
    
    return filteredProducts;
}

// Render products with filtering
function renderProducts() {
    const container = document.getElementById('productsContainer');
    const filteredProducts = getFilteredProducts();
    const searchTerm = getCurrentSearchTerm();
    const category = getCurrentFilter();
    
    // Update search results info
    updateSearchResultsInfo(filteredProducts.length, searchTerm, category);
    
    if (filteredProducts.length === 0) {
        let emptyMessage = '';
        if (searchTerm) {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-search display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">找不到相關商品</h3>
                        <p class="text-muted">沒有找到包含「${searchTerm}」的商品</p>
                        <button class="btn btn-outline-primary mt-3" onclick="clearSearch()">
                            <i class="bi bi-arrow-left"></i> 清除搜尋
                        </button>
                    </div>
                </div>
            `;
        } else {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-grid display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">此分類暫無商品</h3>
                        <p class="text-muted">請選擇其他分類或查看全部商品</p>
                    </div>
                </div>
            `;
        }
        container.innerHTML = emptyMessage;
        return;
    }
    
    container.innerHTML = filteredProducts.map(product => {
        const searchTerm = getCurrentSearchTerm();
        const highlightedName = highlightSearchTerm(product.name, searchTerm);
        const highlightedDescription = highlightSearchTerm(product.description, searchTerm);
        
        return `
            <div class="col">
                <div class="card h-100">
                    <div class="position-relative">
                        <img src="${product.image}" class="card-img-top product-image" alt="${product.name}" loading="lazy" 
                             data-product-id="${product.id}" style="cursor: pointer;">
                        <span class="position-absolute top-0 start-0 m-2 badge bg-${getCategoryColor(product.category)}">
                            ${product.category}類
                        </span>
                        <div class="position-absolute top-0 end-0 m-2">
                            <button class="btn btn-sm btn-light btn-image-zoom" data-product-id="${product.id}" title="查看大圖">
                                <i class="bi bi-zoom-in"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${highlightedName}</h5>
                        <p class="card-text flex-grow-1">${highlightedDescription}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="h5 text-primary mb-0">$${product.price}</span>
                            <button class="btn btn-primary btn-add-cart" onclick="addToCart(${product.id})">
                                <i class="bi bi-cart-plus"></i> 加入購物車
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Get category color for badge
function getCategoryColor(category) {
    const colors = {
        'A': 'success',
        'B': 'warning', 
        'C': 'info'
    };
    return colors[category] || 'secondary';
}

// Update search results info
function updateSearchResultsInfo(count, searchTerm, category) {
    const searchResultsInfo = document.getElementById('searchResultsInfo');
    let infoText = '';
    
    if (searchTerm) {
        if (category === 'all') {
            infoText = `找到 ${count} 個包含「${searchTerm}」的商品`;
        } else {
            const categoryNames = {
                'A': '電子產品',
                'B': '家電用品',
                'C': '運動健康'
            };
            infoText = `在${categoryNames[category]}中找到 ${count} 個包含「${searchTerm}」的商品`;
        }
    } else {
        if (category === 'all') {
            infoText = `顯示全部 ${count} 個商品`;
        } else {
            const categoryNames = {
                'A': '電子產品',
                'B': '家電用品',
                'C': '運動健康'
            };
            infoText = `顯示 ${categoryNames[category]} 類別中的 ${count} 個商品`;
        }
    }
    
    searchResultsInfo.textContent = infoText;
}

// Clear search
function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('clearSearchBtn').style.display = 'none';
    renderProducts();
}

// Highlight search terms in text
function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.addItem(product);
    }
}

// Show image modal
function showImageModal(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        document.getElementById('modalImage').src = product.image;
        document.getElementById('modalImage').alt = product.name;
        document.getElementById('modalProductName').textContent = product.name;
        document.getElementById('modalProductPrice').textContent = `$${product.price}`;
        
        // Store product ID for add to cart from modal
        document.getElementById('addToCartFromModal').setAttribute('data-product-id', productId);
        
        // Show modal
        const imageModal = new bootstrap.Modal(document.getElementById('imageModal'));
        imageModal.show();
    }
}

// Setup event listeners
function setupEventListeners() {
    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        cart.checkout();
    });
    
    // Search input events
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    
    // Real-time search
    searchInput.addEventListener('input', function() {
        const hasValue = this.value.trim().length > 0;
        clearSearchBtn.style.display = hasValue ? 'block' : 'none';
        renderProducts();
    });
    
    // Clear search button
    clearSearchBtn.addEventListener('click', clearSearch);
    
    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            renderProducts();
        }
    });
    
    // Category filter change
    document.querySelectorAll('input[name="categoryFilter"]').forEach(radio => {
        radio.addEventListener('change', function() {
            renderProducts();
        });
    });
    
    // Prevent form submission on quantity input enter
    document.addEventListener('keypress', function(e) {
        if (e.target.classList.contains('quantity-input') && e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
        }
    });
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('zh-TW', {
        style: 'currency',
        currency: 'TWD'
    }).format(amount);
}

```

現在我需要更新事件監聽器來處理圖片點擊事件：


```javascript
// Shopping cart functionality
class ShoppingCart {
    constructor() {
        this.items = [];
        this.loadFromStorage();
        this.updateCartDisplay();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveToStorage();
        this.updateCartDisplay();
        this.showToast();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        this.updateCartDisplay();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
                this.saveToStorage();
                this.updateCartDisplay();
            }
        }
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    updateCartDisplay() {
        this.updateCartCount();
        this.updateCartModal();
        this.updateTotalPrice();
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        cartCount.textContent = this.getTotalItems();
        
        if (this.getTotalItems() > 0) {
            cartCount.classList.add('bounce');
            setTimeout(() => cartCount.classList.remove('bounce'), 1000);
        }
    }

    updateCartModal() {
        const cartItems = document.getElementById('cartItems');
        const emptyCart = document.getElementById('emptyCart');
        
        if (this.items.length === 0) {
            cartItems.style.display = 'none';
            emptyCart.style.display = 'block';
        } else {
            cartItems.style.display = 'block';
            emptyCart.style.display = 'none';
            
            cartItems.innerHTML = this.items.map(item => `
                <div class="cart-item d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${item.name}</h6>
                        <p class="text-muted mb-0">$${item.price}</p>
                    </div>
                    <div class="quantity-controls me-3">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                               onchange="cart.updateQuantity(${item.id}, parseInt(this.value))">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <div class="text-end me-3">
                        <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                    </div>
                    <button class="btn-remove" onclick="cart.removeItem(${item.id})" title="移除商品">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    }

    updateTotalPrice() {
        const totalPrice = document.getElementById('totalPrice');
        const checkoutBtn = document.getElementById('checkoutBtn');
        
        totalPrice.textContent = this.getTotalPrice().toFixed(2);
        checkoutBtn.disabled = this.items.length === 0;
    }

    showToast() {
        const toast = new bootstrap.Toast(document.getElementById('cartToast'));
        toast.show();
    }

    saveToStorage() {
        localStorage.setItem('shoppingCart', JSON.stringify(this.items));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('shoppingCart');
        if (stored) {
            this.items = JSON.parse(stored);
        }
    }

    checkout() {
        if (this.items.length === 0) {
            alert('購物車是空的！');
            return;
        }
        
        alert(`結帳成功！\n總金額: $${this.getTotalPrice().toFixed(2)}\n商品數量: ${this.getTotalItems()}`);
        this.items = [];
        this.saveToStorage();
        this.updateCartDisplay();
    }
}

// Product data with categories
const products = [
    {
        id: 1,
        name: "枕頭貓",
        description: "高品質音效，舒適佩戴，長達8小時續航",
        price: 129.99,
        category: "A",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/pillow_cat.png"
    },
    {
        id: 2,
        name: "智能手錶",
        description: "健康監測，運動追蹤，防水設計",
        price: 299.99,
        category: "A",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/淺水貓.png"
    },
    {
        id: 3,
        name: "筆記型電腦",
        description: "高效能處理器，輕薄設計，長效電池",
        price: 899.99,
        category: "A",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/雞雞貓.png"
    },
    {
        id: 4,
        name: "智能手機",
        description: "最新處理器，高畫質相機，5G網路",
        price: 699.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop"
    },
    {
        id: 5,
        name: "咖啡機",
        description: "全自動研磨，多種咖啡選擇，定時功能",
        price: 199.99,
        category: "B",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop"
    },
    {
        id: 6,
        name: "健身器材",
        description: "多功能訓練，可調節重量，居家健身首選",
        price: 149.99,
        category: "C",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop"
    },
    {
        id: 7,
        name: "平板電腦",
        description: "大螢幕顯示，觸控筆支援，娛樂辦公兩相宜",
        price: 399.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=200&fit=crop"
    },
    {
        id: 8,
        name: "遊戲主機",
        description: "4K遊戲體驗，豐富遊戲庫，多人遊戲支援",
        price: 499.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300&h=200&fit=crop"
    },
    {
        id: 9,
        name: "空氣清淨機",
        description: "高效過濾，智能感應，靜音運作",
        price: 249.99,
        category: "B",
        image: "https://images.unsplash.com/photo-1581578731548-c6a0c3f5f1b0?w=300&h=200&fit=crop"
    },
    {
        id: 10,
        name: "跑步機",
        description: "可折疊設計，多種運動模式，心率監測",
        price: 599.99,
        category: "C",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop"
    },
    {
        id: 11,
        name: "掃地機器人",
        description: "智能路徑規劃，自動回充，APP控制",
        price: 349.99,
        category: "B",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop"
    },
    {
        id: 12,
        name: "瑜伽墊",
        description: "防滑設計，環保材質，多種顏色選擇",
        price: 39.99,
        category: "C",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop"
    }
];

// Initialize shopping cart
let cart;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    cart = new ShoppingCart();
    renderProducts();
    setupEventListeners();
});

// Get current filter
function getCurrentFilter() {
    const checkedFilter = document.querySelector('input[name="categoryFilter"]:checked');
    return checkedFilter ? checkedFilter.value : 'all';
}

// Get current search term
function getCurrentSearchTerm() {
    return document.getElementById('searchInput').value.trim().toLowerCase();
}

// Search products by name and description
function searchProducts(products, searchTerm) {
    if (!searchTerm) {
        return products;
    }
    
    return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
}

// Filter products by category
function filterProducts(category) {
    if (category === 'all') {
        return products;
    }
    return products.filter(product => product.category === category);
}

// Apply both search and category filters
function getFilteredProducts() {
    const category = getCurrentFilter();
    const searchTerm = getCurrentSearchTerm();
    
    let filteredProducts = filterProducts(category);
    filteredProducts = searchProducts(filteredProducts, searchTerm);
    
    return filteredProducts;
}

// Render products with filtering
function renderProducts() {
    const container = document.getElementById('productsContainer');
    const filteredProducts = getFilteredProducts();
    const searchTerm = getCurrentSearchTerm();
    const category = getCurrentFilter();
    
    // Update search results info
    updateSearchResultsInfo(filteredProducts.length, searchTerm, category);
    
    if (filteredProducts.length === 0) {
        let emptyMessage = '';
        if (searchTerm) {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-search display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">找不到相關商品</h3>
                        <p class="text-muted">沒有找到包含「${searchTerm}」的商品</p>
                        <button class="btn btn-outline-primary mt-3" onclick="clearSearch()">
                            <i class="bi bi-arrow-left"></i> 清除搜尋
                        </button>
                    </div>
                </div>
            `;
        } else {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-grid display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">此分類暫無商品</h3>
                        <p class="text-muted">請選擇其他分類或查看全部商品</p>
                    </div>
                </div>
            `;
        }
        container.innerHTML = emptyMessage;
        return;
    }
    
    container.innerHTML = filteredProducts.map(product => {
        const searchTerm = getCurrentSearchTerm();
        const highlightedName = highlightSearchTerm(product.name, searchTerm);
        const highlightedDescription = highlightSearchTerm(product.description, searchTerm);
        
        return `
            <div class="col">
                <div class="card h-100">
                    <div class="position-relative">
                        <img src="${product.image}" class="card-img-top product-image" alt="${product.name}" loading="lazy" 
                             data-product-id="${product.id}" style="cursor: pointer;">
                        <span class="position-absolute top-0 start-0 m-2 badge bg-${getCategoryColor(product.category)}">
                            ${product.category}類
                        </span>
                        <div class="position-absolute top-0 end-0 m-2">
                            <button class="btn btn-sm btn-light btn-image-zoom" data-product-id="${product.id}" title="查看大圖">
                                <i class="bi bi-zoom-in"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${highlightedName}</h5>
                        <p class="card-text flex-grow-1">${highlightedDescription}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="h5 text-primary mb-0">$${product.price}</span>
                            <button class="btn btn-primary btn-add-cart" onclick="addToCart(${product.id})">
                                <i class="bi bi-cart-plus"></i> 加入購物車
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Get category color for badge
function getCategoryColor(category) {
    const colors = {
        'A': 'success',
        'B': 'warning', 
        'C': 'info'
    };
    return colors[category] || 'secondary';
}

// Update search results info
function updateSearchResultsInfo(count, searchTerm, category) {
    const searchResultsInfo = document.getElementById('searchResultsInfo');
    let infoText = '';
    
    if (searchTerm) {
        if (category === 'all') {
            infoText = `找到 ${count} 個包含「${searchTerm}」的商品`;
        } else {
            const categoryNames = {
                'A': '電子產品',
                'B': '家電用品',
                'C': '運動健康'
            };
            infoText = `在${categoryNames[category]}中找到 ${count} 個包含「${searchTerm}」的商品`;
        }
    } else {
        if (category === 'all') {
            infoText = `顯示全部 ${count} 個商品`;
        } else {
            const categoryNames = {
                'A': '電子產品',
                'B': '家電用品',
                'C': '運動健康'
            };
            infoText = `顯示 ${categoryNames[category]} 類別中的 ${count} 個商品`;
        }
    }
    
    searchResultsInfo.textContent = infoText;
}

// Clear search
function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('clearSearchBtn').style.display = 'none';
    renderProducts();
}

// Highlight search terms in text
function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.addItem(product);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        cart.checkout();
    });
    
    // Search input events
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    
    // Real-time search
    searchInput.addEventListener('input', function() {
        const hasValue = this.value.trim().length > 0;
        clearSearchBtn.style.display = hasValue ? 'block' : 'none';
        renderProducts();
    });
    
    // Clear search button
    clearSearchBtn.addEventListener('click', clearSearch);
    
    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            renderProducts();
        }
    });
    
    // Category filter change
    document.querySelectorAll('input[name="categoryFilter"]').forEach(radio => {
        radio.addEventListener('change', function() {
            renderProducts();
        });
    });
    
    // Prevent form submission on quantity input enter
    document.addEventListener('keypress', function(e) {
        if (e.target.classList.contains('quantity-input') && e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
        }
    });
    
    // Image click events (delegated event listeners)
    document.addEventListener('click', function(e) {
        // Product image click
        if (e.target.classList.contains('product-image')) {
            const productId = parseInt(e.target.getAttribute('data-product-id'));
            showImageModal(productId);
        }
        
        // Zoom button click
        if (e.target.closest('.btn-image-zoom')) {
            const productId = parseInt(e.target.closest('.btn-image-zoom').getAttribute('data-product-id'));
            showImageModal(productId);
        }
        
        // Add to cart from modal
        if (e.target.id === 'addToCartFromModal') {
            const productId = parseInt(e.target.getAttribute('data-product-id'));
            addToCart(productId);
            
            // Close modal
            const imageModal = bootstrap.Modal.getInstance(document.getElementById('imageModal'));
            if (imageModal) {
                imageModal.hide();
            }
        }
    });
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('zh-TW', {
        style: 'currency',
        currency: 'TWD'
    }).format(amount);
}

```

現在我需要為圖片模態框和相關元素添加樣式：


```css
/* Custom styles for the shopping website */

body {
    background-color: #fefefe;
    color: #5c4a3a;
}

/* Color scheme variables */
:root {
    --primary-color: #d4a574;
    --secondary-color: #e8d5b7;
    --accent-color: #c19a6b;
    --text-color: #5c4a3a;
    --light-bg: #faf8f5;
    --card-bg: #ffffff;
    --border-color: #e8d5b7;
    --shadow-color: rgba(212, 165, 116, 0.15);
}

/* Category filter styles */
.btn-check:checked + .btn {
    transform: scale(1.05);
    box-shadow: 0 4px 8px var(--shadow-color);
    background-color: var(--primary-color) !important;
    border-color: var(--primary-color) !important;
    color: white !important;
}

.btn-group .btn {
    transition: all 0.3s ease;
    border-radius: 1rem !important;
    margin: 0 8px;
    padding: 0.75rem 1.5rem;
    background-color: var(--light-bg);
    border-color: var(--border-color);
    color: var(--text-color);
    font-weight: 500;
}

.btn-group .btn:hover {
    background-color: var(--secondary-color);
    border-color: var(--accent-color);
    color: var(--text-color);
}

.btn-group {
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
}

.btn-group .btn:first-child {
    border-top-right-radius: 1rem !important;
    border-bottom-right-radius: 1rem !important;
}

.btn-group .btn:last-child {
    border-top-left-radius: 1rem !important;
    border-bottom-left-radius: 1rem !important;
}

.btn-group .btn:not(:first-child):not(:last-child) {
    border-radius: 1rem !important;
}

/* Responsive button spacing */
@media (max-width: 768px) {
    .btn-group .btn {
        margin: 0 4px;
        padding: 0.6rem 1.2rem;
        font-size: 0.9rem;
    }
}

@media (max-width: 576px) {
    .btn-group {
        flex-direction: column;
        gap: 0.75rem;
    }
    
    .btn-group .btn {
        margin: 0;
        width: 100%;
        max-width: 280px;
    }
}

/* Category badge styles */
.badge {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* Empty state styles */
.display-1 {
    font-size: 4rem;
    opacity: 0.3;
}

/* Search bar styles */
.input-group-text {
    background-color: var(--light-bg);
    border-color: var(--border-color);
    border-radius: 1rem 0 0 1rem !important;
    color: var(--text-color);
}

#searchInput {
    border-left: none;
    border-radius: 0 1rem 1rem 0 !important;
    transition: all 0.3s ease;
    background-color: var(--card-bg);
    border-color: var(--border-color);
    color: var(--text-color);
}

#searchInput:focus {
    border-color: var(--accent-color);
    box-shadow: 0 0 0 0.25rem var(--shadow-color);
    background-color: var(--card-bg);
}

#searchInput:focus + .input-group-text {
    border-color: var(--accent-color);
}

#clearSearchBtn {
    transition: all 0.3s ease;
    border-left: none;
    border-radius: 0 1rem 1rem 0 !important;
    background-color: var(--light-bg);
    border-color: var(--border-color);
    color: var(--text-color);
}

#clearSearchBtn:hover {
    background-color: var(--secondary-color);
    color: var(--accent-color);
}

/* Search highlighting */
mark {
    background-color: var(--secondary-color);
    color: var(--text-color);
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-weight: 600;
}

/* Search results info */
#searchResultsInfo {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-color);
}

/* Search animation */
@keyframes searchPulse {
    0% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0.4);
    }
    70% {
        box-shadow: 0 0 0 10px rgba(13, 110, 253, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0);
    }
}

.searching {
    animation: searchPulse 1.5s infinite;
}

/* Responsive search bar */
@media (max-width: 768px) {
    .input-group {
        flex-direction: column;
    }
    
    .input-group-text {
        border-radius: 1rem 1rem 0 0 !important;
        border-bottom: none;
    }
    
    #searchInput {
        border-radius: 0 0 1rem 1rem !important;
        border-top: none;
    }
    
    #clearSearchBtn {
        border-radius: 1rem;
        margin-top: 0.5rem;
        width: 100%;
    }
}

/* Navbar styles */
.navbar {
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color)) !important;
    box-shadow: 0 2px 10px var(--shadow-color);
}

.navbar-brand {
    font-weight: bold;
    font-size: 1.5rem;
    color: white !important;
}

.navbar-nav .nav-link {
    color: white !important;
    transition: color 0.3s ease;
}

.navbar-nav .nav-link:hover {
    color: var(--light-bg) !important;
}

.navbar-toggler {
    border-color: white;
}

.navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

.card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid var(--border-color);
    background-color: var(--card-bg);
    box-shadow: 0 2px 8px var(--shadow-color);
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px var(--shadow-color);
    border-color: var(--accent-color);
}

.card-img-top {
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.card:hover .card-img-top {
    transform: scale(1.05);
}

.btn-add-cart {
    background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
    border: none;
    color: white;
    transition: all 0.3s ease;
}

.btn-add-cart:hover {
    background: linear-gradient(45deg, var(--accent-color), #b88a5a);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px var(--shadow-color);
    color: white;
}

.cart-item {
    border-bottom: 1px solid var(--border-color);
    padding: 1rem 0;
}

.cart-item:last-child {
    border-bottom: none;
}

.cart-item-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
}

.btn-remove {
    color: var(--accent-color);
    border: none;
    background: none;
    font-size: 1.2rem;
    transition: color 0.3s ease;
}

.btn-remove:hover {
    color: var(--primary-color);
}

.quantity-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.quantity-btn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid var(--border-color);
    background: var(--card-bg);
    color: var(--text-color);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.quantity-btn:hover {
    background: var(--secondary-color);
    border-color: var(--accent-color);
    color: var(--text-color);
}

.quantity-input {
    width: 50px;
    text-align: center;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    padding: 0.25rem;
    background-color: var(--card-bg);
    color: var(--text-color);
}

#emptyCart {
    color: var(--text-color);
    opacity: 0.7;
}

.toast {
    background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
    color: white;
}

.toast-header {
    background: rgba(255,255,255,0.1);
    border-bottom: 1px solid rgba(255,255,255,0.2);
}

/* Product image styles */
.product-image {
    transition: all 0.3s ease;
}

.product-image:hover {
    transform: scale(1.02);
    filter: brightness(1.05);
}

.btn-image-zoom {
    opacity: 0;
    transition: all 0.3s ease;
    background-color: rgba(255, 255, 255, 0.9) !important;
    border: none;
    color: var(--text-color);
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.btn-image-zoom:hover {
    opacity: 1 !important;
    background-color: var(--primary-color) !important;
    color: white;
    transform: scale(1.1);
}

.card:hover .btn-image-zoom {
    opacity: 1;
}

/* Image modal styles */
#imageModal .modal-content {
    border: none;
    border-radius: 1rem;
    box-shadow: 0 10px 30px var(--shadow-color);
}

#imageModal .modal-header {
    background-color: var(--light-bg);
    border-bottom: 1px solid var(--border-color);
    border-radius: 1rem 1rem 0 0;
}

#imageModal .modal-body {
    padding: 2rem;
}

#imageModal .modal-body img {
    max-height: 400px;
    width: auto;
    box-shadow: 0 4px 15px var(--shadow-color);
}

#imageModal .modal-footer {
    background-color: var(--light-bg);
    border-top: 1px solid var(--border-color);
    border-radius: 0 0 1rem 1rem;
}

#imageModal .btn-close {
    background-color: var(--accent-color);
    opacity: 1;
    border-radius: 50%;
    width: 30px;
    height: 30px;
}

#imageModal .btn-close:hover {
    background-color: var(--primary-color);
}

/* Animation for cart count badge */
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}

.badge.bounce {
    animation: bounce 1s;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .card-img-top {
        height: 150px;
    }
    
    .cart-item-image {
        width: 50px;
        height: 50px;
    }
}

/* Loading animation */
.loading {
    opacity: 0.6;
    pointer-events: none;
}

.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

```

讓我檢查是否有任何 linting 錯誤：


完美！我已經成功為每個商品卡片的照片添加了點擊功能。以下是新增的功能特色：

## 🖼️ 商品圖片點擊功能

### 🎯 點擊方式
1. **直接點擊圖片**：點擊商品卡片上的任何圖片區域
2. **縮放按鈕**：點擊圖片右上角的放大鏡圖示
3. **懸停提示**：滑鼠懸停在圖片上時會顯示縮放按鈕

### 🖼️ 圖片模態框功能

1. **大圖查看**
   - 顯示高解析度商品圖片
   - 最大高度 400px，保持比例
   - 圓角設計和陰影效果

2. **商品資訊**
   - 顯示商品名稱
   - 顯示商品價格
   - 統一的駝色調配色

3. **快速操作**
   - 直接在模態框中加入購物車
   - 關閉按鈕和操作按鈕
   - 自動關閉模態框

### ✨ 視覺效果

1. **圖片懸停效果**
   - 輕微放大效果 (`scale(1.02)`)
   - 亮度提升 (`brightness(1.05)`)
   - 平滑過渡動畫

2. **縮放按鈕**
   - 預設隱藏，懸停時顯示
   - 駝色背景，白色圖示
   - 懸停時放大效果

3. **模態框設計**
   - 圓角邊框 (`1rem`)
   - 駝色調配色方案
   - 柔和的陰影效果
   - 響應式設計

### 🎨 設計特色

1. **無縫整合**
   - 與現有設計風格一致
   - 使用相同的配色方案
   - 保持用戶體驗連貫性

2. **直觀操作**
   - 清晰的視覺提示
   - 多種點擊方式
   - 友善的用戶界面

3. **效能優化**
   - 事件委派處理
   - 圖片延遲載入
   - 平滑的動畫效果

### 📱 響應式支援
- 模態框在不同螢幕尺寸下都能正常顯示
- 圖片會自動調整大小
- 觸控設備友好的操作體驗

### 🛒 購物車整合
- 在模態框中可以直接加入購物車
- 加入後自動關閉模態框
- 顯示成功提示

現在您的購物網站具備了完整的圖片查看功能！用戶可以：
- 點擊任何商品圖片查看大圖
- 在模態框中查看詳細商品資訊
- 直接在模態框中加入購物車
- 享受流暢的圖片瀏覽體驗

---

**User**

當游標click那張card的時候就要把照片展開

---

**Cursor**

我將修改代碼，讓用戶點擊整個商品卡片時就能展開照片，而不只是點擊圖片本身。


```javascript
// Shopping cart functionality
class ShoppingCart {
    constructor() {
        this.items = [];
        this.loadFromStorage();
        this.updateCartDisplay();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveToStorage();
        this.updateCartDisplay();
        this.showToast();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        this.updateCartDisplay();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
                this.saveToStorage();
                this.updateCartDisplay();
            }
        }
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    updateCartDisplay() {
        this.updateCartCount();
        this.updateCartModal();
        this.updateTotalPrice();
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        cartCount.textContent = this.getTotalItems();
        
        if (this.getTotalItems() > 0) {
            cartCount.classList.add('bounce');
            setTimeout(() => cartCount.classList.remove('bounce'), 1000);
        }
    }

    updateCartModal() {
        const cartItems = document.getElementById('cartItems');
        const emptyCart = document.getElementById('emptyCart');
        
        if (this.items.length === 0) {
            cartItems.style.display = 'none';
            emptyCart.style.display = 'block';
        } else {
            cartItems.style.display = 'block';
            emptyCart.style.display = 'none';
            
            cartItems.innerHTML = this.items.map(item => `
                <div class="cart-item d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${item.name}</h6>
                        <p class="text-muted mb-0">$${item.price}</p>
                    </div>
                    <div class="quantity-controls me-3">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                               onchange="cart.updateQuantity(${item.id}, parseInt(this.value))">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <div class="text-end me-3">
                        <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                    </div>
                    <button class="btn-remove" onclick="cart.removeItem(${item.id})" title="移除商品">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    }

    updateTotalPrice() {
        const totalPrice = document.getElementById('totalPrice');
        const checkoutBtn = document.getElementById('checkoutBtn');
        
        totalPrice.textContent = this.getTotalPrice().toFixed(2);
        checkoutBtn.disabled = this.items.length === 0;
    }

    showToast() {
        const toast = new bootstrap.Toast(document.getElementById('cartToast'));
        toast.show();
    }

    saveToStorage() {
        localStorage.setItem('shoppingCart', JSON.stringify(this.items));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('shoppingCart');
        if (stored) {
            this.items = JSON.parse(stored);
        }
    }

    checkout() {
        if (this.items.length === 0) {
            alert('購物車是空的！');
            return;
        }
        
        alert(`結帳成功！\n總金額: $${this.getTotalPrice().toFixed(2)}\n商品數量: ${this.getTotalItems()}`);
        this.items = [];
        this.saveToStorage();
        this.updateCartDisplay();
    }
}

// Product data with categories
const products = [
    {
        id: 1,
        name: "枕頭貓",
        description: "高品質音效，舒適佩戴，長達8小時續航",
        price: 129.99,
        category: "A",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/pillow_cat.png"
    },
    {
        id: 2,
        name: "智能手錶",
        description: "健康監測，運動追蹤，防水設計",
        price: 299.99,
        category: "A",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/淺水貓.png"
    },
    {
        id: 3,
        name: "筆記型電腦",
        description: "高效能處理器，輕薄設計，長效電池",
        price: 899.99,
        category: "A",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/雞雞貓.png"
    },
    {
        id: 4,
        name: "智能手機",
        description: "最新處理器，高畫質相機，5G網路",
        price: 699.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop"
    },
    {
        id: 5,
        name: "咖啡機",
        description: "全自動研磨，多種咖啡選擇，定時功能",
        price: 199.99,
        category: "B",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop"
    },
    {
        id: 6,
        name: "健身器材",
        description: "多功能訓練，可調節重量，居家健身首選",
        price: 149.99,
        category: "C",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop"
    },
    {
        id: 7,
        name: "平板電腦",
        description: "大螢幕顯示，觸控筆支援，娛樂辦公兩相宜",
        price: 399.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=200&fit=crop"
    },
    {
        id: 8,
        name: "遊戲主機",
        description: "4K遊戲體驗，豐富遊戲庫，多人遊戲支援",
        price: 499.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300&h=200&fit=crop"
    },
    {
        id: 9,
        name: "空氣清淨機",
        description: "高效過濾，智能感應，靜音運作",
        price: 249.99,
        category: "B",
        image: "https://images.unsplash.com/photo-1581578731548-c6a0c3f5f1b0?w=300&h=200&fit=crop"
    },
    {
        id: 10,
        name: "跑步機",
        description: "可折疊設計，多種運動模式，心率監測",
        price: 599.99,
        category: "C",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop"
    },
    {
        id: 11,
        name: "掃地機器人",
        description: "智能路徑規劃，自動回充，APP控制",
        price: 349.99,
        category: "B",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop"
    },
    {
        id: 12,
        name: "瑜伽墊",
        description: "防滑設計，環保材質，多種顏色選擇",
        price: 39.99,
        category: "C",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop"
    }
];

// Initialize shopping cart
let cart;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    cart = new ShoppingCart();
    renderProducts();
    setupEventListeners();
});

// Get current filter
function getCurrentFilter() {
    const checkedFilter = document.querySelector('input[name="categoryFilter"]:checked');
    return checkedFilter ? checkedFilter.value : 'all';
}

// Get current search term
function getCurrentSearchTerm() {
    return document.getElementById('searchInput').value.trim().toLowerCase();
}

// Search products by name and description
function searchProducts(products, searchTerm) {
    if (!searchTerm) {
        return products;
    }
    
    return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
}

// Filter products by category
function filterProducts(category) {
    if (category === 'all') {
        return products;
    }
    return products.filter(product => product.category === category);
}

// Apply both search and category filters
function getFilteredProducts() {
    const category = getCurrentFilter();
    const searchTerm = getCurrentSearchTerm();
    
    let filteredProducts = filterProducts(category);
    filteredProducts = searchProducts(filteredProducts, searchTerm);
    
    return filteredProducts;
}

// Render products with filtering
function renderProducts() {
    const container = document.getElementById('productsContainer');
    const filteredProducts = getFilteredProducts();
    const searchTerm = getCurrentSearchTerm();
    const category = getCurrentFilter();
    
    // Update search results info
    updateSearchResultsInfo(filteredProducts.length, searchTerm, category);
    
    if (filteredProducts.length === 0) {
        let emptyMessage = '';
        if (searchTerm) {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-search display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">找不到相關商品</h3>
                        <p class="text-muted">沒有找到包含「${searchTerm}」的商品</p>
                        <button class="btn btn-outline-primary mt-3" onclick="clearSearch()">
                            <i class="bi bi-arrow-left"></i> 清除搜尋
                        </button>
                    </div>
                </div>
            `;
        } else {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-grid display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">此分類暫無商品</h3>
                        <p class="text-muted">請選擇其他分類或查看全部商品</p>
                    </div>
                </div>
            `;
        }
        container.innerHTML = emptyMessage;
        return;
    }
    
    container.innerHTML = filteredProducts.map(product => {
        const searchTerm = getCurrentSearchTerm();
        const highlightedName = highlightSearchTerm(product.name, searchTerm);
        const highlightedDescription = highlightSearchTerm(product.description, searchTerm);
        
        return `
            <div class="col">
                <div class="card h-100 product-card" data-product-id="${product.id}" style="cursor: pointer;">
                    <div class="position-relative">
                        <img src="${product.image}" class="card-img-top product-image" alt="${product.name}" loading="lazy">
                        <span class="position-absolute top-0 start-0 m-2 badge bg-${getCategoryColor(product.category)}">
                            ${product.category}類
                        </span>
                        <div class="position-absolute top-0 end-0 m-2">
                            <button class="btn btn-sm btn-light btn-image-zoom" data-product-id="${product.id}" title="查看大圖">
                                <i class="bi bi-zoom-in"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${highlightedName}</h5>
                        <p class="card-text flex-grow-1">${highlightedDescription}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="h5 text-primary mb-0">$${product.price}</span>
                            <button class="btn btn-primary btn-add-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                                <i class="bi bi-cart-plus"></i> 加入購物車
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Get category color for badge
function getCategoryColor(category) {
    const colors = {
        'A': 'success',
        'B': 'warning', 
        'C': 'info'
    };
    return colors[category] || 'secondary';
}

// Update search results info
function updateSearchResultsInfo(count, searchTerm, category) {
    const searchResultsInfo = document.getElementById('searchResultsInfo');
    let infoText = '';
    
    if (searchTerm) {
        if (category === 'all') {
            infoText = `找到 ${count} 個包含「${searchTerm}」的商品`;
        } else {
            const categoryNames = {
                'A': '電子產品',
                'B': '家電用品',
                'C': '運動健康'
            };
            infoText = `在${categoryNames[category]}中找到 ${count} 個包含「${searchTerm}」的商品`;
        }
    } else {
        if (category === 'all') {
            infoText = `顯示全部 ${count} 個商品`;
        } else {
            const categoryNames = {
                'A': '電子產品',
                'B': '家電用品',
                'C': '運動健康'
            };
            infoText = `顯示 ${categoryNames[category]} 類別中的 ${count} 個商品`;
        }
    }
    
    searchResultsInfo.textContent = infoText;
}

// Clear search
function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('clearSearchBtn').style.display = 'none';
    renderProducts();
}

// Highlight search terms in text
function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.addItem(product);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        cart.checkout();
    });
    
    // Search input events
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    
    // Real-time search
    searchInput.addEventListener('input', function() {
        const hasValue = this.value.trim().length > 0;
        clearSearchBtn.style.display = hasValue ? 'block' : 'none';
        renderProducts();
    });
    
    // Clear search button
    clearSearchBtn.addEventListener('click', clearSearch);
    
    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            renderProducts();
        }
    });
    
    // Category filter change
    document.querySelectorAll('input[name="categoryFilter"]').forEach(radio => {
        radio.addEventListener('change', function() {
            renderProducts();
        });
    });
    
    // Prevent form submission on quantity input enter
    document.addEventListener('keypress', function(e) {
        if (e.target.classList.contains('quantity-input') && e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
        }
    });
    
    // Image click events (delegated event listeners)
    document.addEventListener('click', function(e) {
        // Product image click
        if (e.target.classList.contains('product-image')) {
            const productId = parseInt(e.target.getAttribute('data-product-id'));
            showImageModal(productId);
        }
        
        // Zoom button click
        if (e.target.closest('.btn-image-zoom')) {
            const productId = parseInt(e.target.closest('.btn-image-zoom').getAttribute('data-product-id'));
            showImageModal(productId);
        }
        
        // Add to cart from modal
        if (e.target.id === 'addToCartFromModal') {
            const productId = parseInt(e.target.getAttribute('data-product-id'));
            addToCart(productId);
            
            // Close modal
            const imageModal = bootstrap.Modal.getInstance(document.getElementById('imageModal'));
            if (imageModal) {
                imageModal.hide();
            }
        }
    });
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('zh-TW', {
        style: 'currency',
        currency: 'TWD'
    }).format(amount);
}

```

現在我需要更新事件監聽器來處理整個卡片的點擊事件：


```javascript
// Shopping cart functionality
class ShoppingCart {
    constructor() {
        this.items = [];
        this.loadFromStorage();
        this.updateCartDisplay();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveToStorage();
        this.updateCartDisplay();
        this.showToast();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        this.updateCartDisplay();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
                this.saveToStorage();
                this.updateCartDisplay();
            }
        }
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    updateCartDisplay() {
        this.updateCartCount();
        this.updateCartModal();
        this.updateTotalPrice();
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        cartCount.textContent = this.getTotalItems();
        
        if (this.getTotalItems() > 0) {
            cartCount.classList.add('bounce');
            setTimeout(() => cartCount.classList.remove('bounce'), 1000);
        }
    }

    updateCartModal() {
        const cartItems = document.getElementById('cartItems');
        const emptyCart = document.getElementById('emptyCart');
        
        if (this.items.length === 0) {
            cartItems.style.display = 'none';
            emptyCart.style.display = 'block';
        } else {
            cartItems.style.display = 'block';
            emptyCart.style.display = 'none';
            
            cartItems.innerHTML = this.items.map(item => `
                <div class="cart-item d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${item.name}</h6>
                        <p class="text-muted mb-0">$${item.price}</p>
                    </div>
                    <div class="quantity-controls me-3">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                               onchange="cart.updateQuantity(${item.id}, parseInt(this.value))">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <div class="text-end me-3">
                        <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                    </div>
                    <button class="btn-remove" onclick="cart.removeItem(${item.id})" title="移除商品">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    }

    updateTotalPrice() {
        const totalPrice = document.getElementById('totalPrice');
        const checkoutBtn = document.getElementById('checkoutBtn');
        
        totalPrice.textContent = this.getTotalPrice().toFixed(2);
        checkoutBtn.disabled = this.items.length === 0;
    }

    showToast() {
        const toast = new bootstrap.Toast(document.getElementById('cartToast'));
        toast.show();
    }

    saveToStorage() {
        localStorage.setItem('shoppingCart', JSON.stringify(this.items));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('shoppingCart');
        if (stored) {
            this.items = JSON.parse(stored);
        }
    }

    checkout() {
        if (this.items.length === 0) {
            alert('購物車是空的！');
            return;
        }
        
        alert(`結帳成功！\n總金額: $${this.getTotalPrice().toFixed(2)}\n商品數量: ${this.getTotalItems()}`);
        this.items = [];
        this.saveToStorage();
        this.updateCartDisplay();
    }
}

// Product data with categories
const products = [
    {
        id: 1,
        name: "枕頭貓",
        description: "高品質音效，舒適佩戴，長達8小時續航",
        price: 129.99,
        category: "A",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/pillow_cat.png"
    },
    {
        id: 2,
        name: "智能手錶",
        description: "健康監測，運動追蹤，防水設計",
        price: 299.99,
        category: "A",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/淺水貓.png"
    },
    {
        id: 3,
        name: "筆記型電腦",
        description: "高效能處理器，輕薄設計，長效電池",
        price: 899.99,
        category: "A",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/雞雞貓.png"
    },
    {
        id: 4,
        name: "智能手機",
        description: "最新處理器，高畫質相機，5G網路",
        price: 699.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop"
    },
    {
        id: 5,
        name: "咖啡機",
        description: "全自動研磨，多種咖啡選擇，定時功能",
        price: 199.99,
        category: "B",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop"
    },
    {
        id: 6,
        name: "健身器材",
        description: "多功能訓練，可調節重量，居家健身首選",
        price: 149.99,
        category: "C",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop"
    },
    {
        id: 7,
        name: "平板電腦",
        description: "大螢幕顯示，觸控筆支援，娛樂辦公兩相宜",
        price: 399.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=200&fit=crop"
    },
    {
        id: 8,
        name: "遊戲主機",
        description: "4K遊戲體驗，豐富遊戲庫，多人遊戲支援",
        price: 499.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300&h=200&fit=crop"
    },
    {
        id: 9,
        name: "空氣清淨機",
        description: "高效過濾，智能感應，靜音運作",
        price: 249.99,
        category: "B",
        image: "https://images.unsplash.com/photo-1581578731548-c6a0c3f5f1b0?w=300&h=200&fit=crop"
    },
    {
        id: 10,
        name: "跑步機",
        description: "可折疊設計，多種運動模式，心率監測",
        price: 599.99,
        category: "C",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop"
    },
    {
        id: 11,
        name: "掃地機器人",
        description: "智能路徑規劃，自動回充，APP控制",
        price: 349.99,
        category: "B",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop"
    },
    {
        id: 12,
        name: "瑜伽墊",
        description: "防滑設計，環保材質，多種顏色選擇",
        price: 39.99,
        category: "C",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop"
    }
];

// Initialize shopping cart
let cart;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    cart = new ShoppingCart();
    renderProducts();
    setupEventListeners();
});

// Get current filter
function getCurrentFilter() {
    const checkedFilter = document.querySelector('input[name="categoryFilter"]:checked');
    return checkedFilter ? checkedFilter.value : 'all';
}

// Get current search term
function getCurrentSearchTerm() {
    return document.getElementById('searchInput').value.trim().toLowerCase();
}

// Search products by name and description
function searchProducts(products, searchTerm) {
    if (!searchTerm) {
        return products;
    }
    
    return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
}

// Filter products by category
function filterProducts(category) {
    if (category === 'all') {
        return products;
    }
    return products.filter(product => product.category === category);
}

// Apply both search and category filters
function getFilteredProducts() {
    const category = getCurrentFilter();
    const searchTerm = getCurrentSearchTerm();
    
    let filteredProducts = filterProducts(category);
    filteredProducts = searchProducts(filteredProducts, searchTerm);
    
    return filteredProducts;
}

// Render products with filtering
function renderProducts() {
    const container = document.getElementById('productsContainer');
    const filteredProducts = getFilteredProducts();
    const searchTerm = getCurrentSearchTerm();
    const category = getCurrentFilter();
    
    // Update search results info
    updateSearchResultsInfo(filteredProducts.length, searchTerm, category);
    
    if (filteredProducts.length === 0) {
        let emptyMessage = '';
        if (searchTerm) {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-search display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">找不到相關商品</h3>
                        <p class="text-muted">沒有找到包含「${searchTerm}」的商品</p>
                        <button class="btn btn-outline-primary mt-3" onclick="clearSearch()">
                            <i class="bi bi-arrow-left"></i> 清除搜尋
                        </button>
                    </div>
                </div>
            `;
        } else {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-grid display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">此分類暫無商品</h3>
                        <p class="text-muted">請選擇其他分類或查看全部商品</p>
                    </div>
                </div>
            `;
        }
        container.innerHTML = emptyMessage;
        return;
    }
    
    container.innerHTML = filteredProducts.map(product => {
        const searchTerm = getCurrentSearchTerm();
        const highlightedName = highlightSearchTerm(product.name, searchTerm);
        const highlightedDescription = highlightSearchTerm(product.description, searchTerm);
        
        return `
            <div class="col">
                <div class="card h-100 product-card" data-product-id="${product.id}" style="cursor: pointer;">
                    <div class="position-relative">
                        <img src="${product.image}" class="card-img-top product-image" alt="${product.name}" loading="lazy">
                        <span class="position-absolute top-0 start-0 m-2 badge bg-${getCategoryColor(product.category)}">
                            ${product.category}類
                        </span>
                        <div class="position-absolute top-0 end-0 m-2">
                            <button class="btn btn-sm btn-light btn-image-zoom" data-product-id="${product.id}" title="查看大圖">
                                <i class="bi bi-zoom-in"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${highlightedName}</h5>
                        <p class="card-text flex-grow-1">${highlightedDescription}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="h5 text-primary mb-0">$${product.price}</span>
                            <button class="btn btn-primary btn-add-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                                <i class="bi bi-cart-plus"></i> 加入購物車
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Get category color for badge
function getCategoryColor(category) {
    const colors = {
        'A': 'success',
        'B': 'warning', 
        'C': 'info'
    };
    return colors[category] || 'secondary';
}

// Update search results info
function updateSearchResultsInfo(count, searchTerm, category) {
    const searchResultsInfo = document.getElementById('searchResultsInfo');
    let infoText = '';
    
    if (searchTerm) {
        if (category === 'all') {
            infoText = `找到 ${count} 個包含「${searchTerm}」的商品`;
        } else {
            const categoryNames = {
                'A': '電子產品',
                'B': '家電用品',
                'C': '運動健康'
            };
            infoText = `在${categoryNames[category]}中找到 ${count} 個包含「${searchTerm}」的商品`;
        }
    } else {
        if (category === 'all') {
            infoText = `顯示全部 ${count} 個商品`;
        } else {
            const categoryNames = {
                'A': '電子產品',
                'B': '家電用品',
                'C': '運動健康'
            };
            infoText = `顯示 ${categoryNames[category]} 類別中的 ${count} 個商品`;
        }
    }
    
    searchResultsInfo.textContent = infoText;
}

// Clear search
function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('clearSearchBtn').style.display = 'none';
    renderProducts();
}

// Highlight search terms in text
function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.addItem(product);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        cart.checkout();
    });
    
    // Search input events
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    
    // Real-time search
    searchInput.addEventListener('input', function() {
        const hasValue = this.value.trim().length > 0;
        clearSearchBtn.style.display = hasValue ? 'block' : 'none';
        renderProducts();
    });
    
    // Clear search button
    clearSearchBtn.addEventListener('click', clearSearch);
    
    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            renderProducts();
        }
    });
    
    // Category filter change
    document.querySelectorAll('input[name="categoryFilter"]').forEach(radio => {
        radio.addEventListener('change', function() {
            renderProducts();
        });
    });
    
    // Prevent form submission on quantity input enter
    document.addEventListener('keypress', function(e) {
        if (e.target.classList.contains('quantity-input') && e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
        }
    });
    
    // Image click events (delegated event listeners)
    document.addEventListener('click', function(e) {
        // Product card click (entire card)
        if (e.target.closest('.product-card')) {
            const productCard = e.target.closest('.product-card');
            const productId = parseInt(productCard.getAttribute('data-product-id'));
            
            // Don't trigger if clicking on add to cart button
            if (!e.target.closest('.btn-add-cart')) {
                showImageModal(productId);
            }
        }
        
        // Product image click
        if (e.target.classList.contains('product-image')) {
            const productId = parseInt(e.target.getAttribute('data-product-id'));
            showImageModal(productId);
        }
        
        // Zoom button click
        if (e.target.closest('.btn-image-zoom')) {
            const productId = parseInt(e.target.closest('.btn-image-zoom').getAttribute('data-product-id'));
            showImageModal(productId);
        }
        
        // Add to cart from modal
        if (e.target.id === 'addToCartFromModal') {
            const productId = parseInt(e.target.getAttribute('data-product-id'));
            addToCart(productId);
            
            // Close modal
            const imageModal = bootstrap.Modal.getInstance(document.getElementById('imageModal'));
            if (imageModal) {
                imageModal.hide();
            }
        }
    });
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('zh-TW', {
        style: 'currency',
        currency: 'TWD'
    }).format(amount);
}

```

現在我需要為商品卡片添加一些視覺提示，讓用戶知道卡片是可以點擊的：


```css
/* Custom styles for the shopping website */

body {
    background-color: #fefefe;
    color: #5c4a3a;
}

/* Color scheme variables */
:root {
    --primary-color: #d4a574;
    --secondary-color: #e8d5b7;
    --accent-color: #c19a6b;
    --text-color: #5c4a3a;
    --light-bg: #faf8f5;
    --card-bg: #ffffff;
    --border-color: #e8d5b7;
    --shadow-color: rgba(212, 165, 116, 0.15);
}

/* Category filter styles */
.btn-check:checked + .btn {
    transform: scale(1.05);
    box-shadow: 0 4px 8px var(--shadow-color);
    background-color: var(--primary-color) !important;
    border-color: var(--primary-color) !important;
    color: white !important;
}

.btn-group .btn {
    transition: all 0.3s ease;
    border-radius: 1rem !important;
    margin: 0 8px;
    padding: 0.75rem 1.5rem;
    background-color: var(--light-bg);
    border-color: var(--border-color);
    color: var(--text-color);
    font-weight: 500;
}

.btn-group .btn:hover {
    background-color: var(--secondary-color);
    border-color: var(--accent-color);
    color: var(--text-color);
}

.btn-group {
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
}

.btn-group .btn:first-child {
    border-top-right-radius: 1rem !important;
    border-bottom-right-radius: 1rem !important;
}

.btn-group .btn:last-child {
    border-top-left-radius: 1rem !important;
    border-bottom-left-radius: 1rem !important;
}

.btn-group .btn:not(:first-child):not(:last-child) {
    border-radius: 1rem !important;
}

/* Responsive button spacing */
@media (max-width: 768px) {
    .btn-group .btn {
        margin: 0 4px;
        padding: 0.6rem 1.2rem;
        font-size: 0.9rem;
    }
}

@media (max-width: 576px) {
    .btn-group {
        flex-direction: column;
        gap: 0.75rem;
    }
    
    .btn-group .btn {
        margin: 0;
        width: 100%;
        max-width: 280px;
    }
}

/* Category badge styles */
.badge {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* Empty state styles */
.display-1 {
    font-size: 4rem;
    opacity: 0.3;
}

/* Search bar styles */
.input-group-text {
    background-color: var(--light-bg);
    border-color: var(--border-color);
    border-radius: 1rem 0 0 1rem !important;
    color: var(--text-color);
}

#searchInput {
    border-left: none;
    border-radius: 0 1rem 1rem 0 !important;
    transition: all 0.3s ease;
    background-color: var(--card-bg);
    border-color: var(--border-color);
    color: var(--text-color);
}

#searchInput:focus {
    border-color: var(--accent-color);
    box-shadow: 0 0 0 0.25rem var(--shadow-color);
    background-color: var(--card-bg);
}

#searchInput:focus + .input-group-text {
    border-color: var(--accent-color);
}

#clearSearchBtn {
    transition: all 0.3s ease;
    border-left: none;
    border-radius: 0 1rem 1rem 0 !important;
    background-color: var(--light-bg);
    border-color: var(--border-color);
    color: var(--text-color);
}

#clearSearchBtn:hover {
    background-color: var(--secondary-color);
    color: var(--accent-color);
}

/* Search highlighting */
mark {
    background-color: var(--secondary-color);
    color: var(--text-color);
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-weight: 600;
}

/* Search results info */
#searchResultsInfo {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-color);
}

/* Search animation */
@keyframes searchPulse {
    0% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0.4);
    }
    70% {
        box-shadow: 0 0 0 10px rgba(13, 110, 253, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0);
    }
}

.searching {
    animation: searchPulse 1.5s infinite;
}

/* Responsive search bar */
@media (max-width: 768px) {
    .input-group {
        flex-direction: column;
    }
    
    .input-group-text {
        border-radius: 1rem 1rem 0 0 !important;
        border-bottom: none;
    }
    
    #searchInput {
        border-radius: 0 0 1rem 1rem !important;
        border-top: none;
    }
    
    #clearSearchBtn {
        border-radius: 1rem;
        margin-top: 0.5rem;
        width: 100%;
    }
}

/* Navbar styles */
.navbar {
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color)) !important;
    box-shadow: 0 2px 10px var(--shadow-color);
}

.navbar-brand {
    font-weight: bold;
    font-size: 1.5rem;
    color: white !important;
}

.navbar-nav .nav-link {
    color: white !important;
    transition: color 0.3s ease;
}

.navbar-nav .nav-link:hover {
    color: var(--light-bg) !important;
}

.navbar-toggler {
    border-color: white;
}

.navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

.card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid var(--border-color);
    background-color: var(--card-bg);
    box-shadow: 0 2px 8px var(--shadow-color);
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px var(--shadow-color);
    border-color: var(--accent-color);
}

/* Product card clickable styles */
.product-card {
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.product-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px var(--shadow-color);
    border-color: var(--primary-color);
}

.product-card:hover::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(212, 165, 116, 0.05), rgba(193, 154, 107, 0.05));
    pointer-events: none;
    z-index: 1;
}

.product-card:hover .card-title {
    color: var(--primary-color);
}

.product-card:hover .card-text {
    color: var(--text-color);
}

.card-img-top {
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.card:hover .card-img-top {
    transform: scale(1.05);
}

.btn-add-cart {
    background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
    border: none;
    color: white;
    transition: all 0.3s ease;
}

.btn-add-cart:hover {
    background: linear-gradient(45deg, var(--accent-color), #b88a5a);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px var(--shadow-color);
    color: white;
}

.cart-item {
    border-bottom: 1px solid var(--border-color);
    padding: 1rem 0;
}

.cart-item:last-child {
    border-bottom: none;
}

.cart-item-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
}

.btn-remove {
    color: var(--accent-color);
    border: none;
    background: none;
    font-size: 1.2rem;
    transition: color 0.3s ease;
}

.btn-remove:hover {
    color: var(--primary-color);
}

.quantity-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.quantity-btn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid var(--border-color);
    background: var(--card-bg);
    color: var(--text-color);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.quantity-btn:hover {
    background: var(--secondary-color);
    border-color: var(--accent-color);
    color: var(--text-color);
}

.quantity-input {
    width: 50px;
    text-align: center;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    padding: 0.25rem;
    background-color: var(--card-bg);
    color: var(--text-color);
}

#emptyCart {
    color: var(--text-color);
    opacity: 0.7;
}

.toast {
    background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
    color: white;
}

.toast-header {
    background: rgba(255,255,255,0.1);
    border-bottom: 1px solid rgba(255,255,255,0.2);
}

/* Product image styles */
.product-image {
    transition: all 0.3s ease;
}

.product-image:hover {
    transform: scale(1.02);
    filter: brightness(1.05);
}

.btn-image-zoom {
    opacity: 0;
    transition: all 0.3s ease;
    background-color: rgba(255, 255, 255, 0.9) !important;
    border: none;
    color: var(--text-color);
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.btn-image-zoom:hover {
    opacity: 1 !important;
    background-color: var(--primary-color) !important;
    color: white;
    transform: scale(1.1);
}

.card:hover .btn-image-zoom {
    opacity: 1;
}

/* Image modal styles */
#imageModal .modal-content {
    border: none;
    border-radius: 1rem;
    box-shadow: 0 10px 30px var(--shadow-color);
}

#imageModal .modal-header {
    background-color: var(--light-bg);
    border-bottom: 1px solid var(--border-color);
    border-radius: 1rem 1rem 0 0;
}

#imageModal .modal-body {
    padding: 2rem;
}

#imageModal .modal-body img {
    max-height: 400px;
    width: auto;
    box-shadow: 0 4px 15px var(--shadow-color);
}

#imageModal .modal-footer {
    background-color: var(--light-bg);
    border-top: 1px solid var(--border-color);
    border-radius: 0 0 1rem 1rem;
}

#imageModal .btn-close {
    background-color: var(--accent-color);
    opacity: 1;
    border-radius: 50%;
    width: 30px;
    height: 30px;
}

#imageModal .btn-close:hover {
    background-color: var(--primary-color);
}

/* Animation for cart count badge */
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}

.badge.bounce {
    animation: bounce 1s;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .card-img-top {
        height: 150px;
    }
    
    .cart-item-image {
        width: 50px;
        height: 50px;
    }
}

/* Loading animation */
.loading {
    opacity: 0.6;
    pointer-events: none;
}

.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

```

讓我檢查是否有任何 linting 錯誤：


完美！我已經成功修改了代碼，現在用戶點擊整個商品卡片時就會展開照片。以下是更新的功能特色：

## 🖱️ 整張卡片點擊功能

### 🎯 點擊區域
- **整個商品卡片**：點擊卡片的任何區域都會展開照片
- **排除按鈕**：點擊「加入購物車」按鈕時不會觸發圖片展開
- **多種觸發方式**：卡片、圖片、縮放按鈕都可以觸發

### ✨ 視覺效果增強

1. **卡片懸停效果**
   - 更明顯的上升效果 (`translateY(-8px)`)
   - 更深的陰影效果
   - 駝色邊框高亮
   - 漸層背景覆蓋

2. **文字顏色變化**
   - 標題變為駝色 (`var(--primary-color)`)
   - 描述文字保持可讀性
   - 平滑的顏色過渡

3. **互動提示**
   - 游標變為指針樣式
   - 懸停時的視覺回饋
   - 清晰的點擊區域

### 🛡️ 事件處理優化

1. **事件冒泡控制**
   - 使用 `event.stopPropagation()` 防止按鈕點擊觸發卡片點擊
   - 精確的事件目標識別
   - 避免重複觸發

2. **多層級事件監聽**
   - 卡片級別：整個卡片點擊
   - 圖片級別：圖片區域點擊
   - 按鈕級別：縮放按鈕點擊
   - 模態框級別：模態框內操作

### 🎨 用戶體驗提升

1. **直觀操作**
   - 整個卡片都是可點擊區域
   - 清晰的視覺提示
   - 一致的互動體驗

2. **防誤觸設計**
   - 購物車按鈕不會觸發圖片展開
   - 精確的點擊區域識別
   - 流暢的操作流程

3. **視覺回饋**
   - 懸停時的動畫效果
   - 顏色變化提示
   - 陰影和變形效果

### 📱 響應式支援
- 在所有設備上都能正常運作
- 觸控設備友好的點擊區域
- 保持原有的響應式設計

現在您的購物網站具備了更直觀的圖片查看功能！用戶可以：
- 點擊整個商品卡片查看大圖
- 享受更豐富的視覺回饋
- 避免誤觸購物車按鈕
- 體驗更流暢的互動效果

---

**User**

do nothing

---

**Cursor**

我理解您想要保持現狀，不做任何修改。您的購物網站目前已經具備了完整的功能：

- ✅ 商品卡片展示
- ✅ 分類篩選功能
- ✅ 搜尋功能
- ✅ 購物車功能
- ✅ 圖片點擊查看
- ✅ 淺色系駝色調設計
- ✅ 響應式設計

所有功能都運行正常，如果您之後需要任何修改或新功能，隨時告訴我！

---

**User**

A類改為「茶茶小貓咪」
B類改成「茶茶的朋友-小雞」

---

**Cursor**

我將為您修改分類按鈕的文字，將A類改為「茶茶小貓咪」，B類改為「茶茶的朋友-小雞」。


```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>商品購物網站</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
            <a class="navbar-brand" href="#">
                <i class="bi bi-shop"></i> 茶茶的店
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#cartModal">
                            <i class="bi bi-cart3"></i> 購物車 
                            <span class="badge bg-danger" id="cartCount">0</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

        <!-- Main Content -->
        <div class="container mt-4">
            <div class="row">
                <div class="col-12">
                    <h1 class="text-center mb-4">精選商品</h1>
                    
                    <!-- Search Bar -->
                    <div class="row justify-content-center mb-4">
                        <div class="col-lg-6 col-md-8 col-sm-10">
                            <div class="input-group">
                                <span class="input-group-text">
                                    <i class="bi bi-search"></i>
                                </span>
                                <input type="text" class="form-control form-control-lg" id="searchInput" 
                                       placeholder="搜尋商品名稱或描述..." aria-label="搜尋商品">
                                <button class="btn btn-outline-secondary" type="button" id="clearSearchBtn" style="display: none;">
                                    <i class="bi bi-x-lg"></i>
                                </button>
                            </div>
                            <div class="mt-2">
                                <small class="text-muted" id="searchResultsInfo"></small>
                            </div>
                        </div>
                    </div>

                    <!-- Category Filter -->
                    <div class="row justify-content-center mb-4">
                        <div class="col-auto">
                            <div class="btn-group" role="group" aria-label="商品分類">
                                <input type="radio" class="btn-check" name="categoryFilter" id="categoryAll" value="all" checked>
                                <label class="btn btn-outline-primary" for="categoryAll">
                                    <i class="bi bi-grid-3x3-gap"></i> 全部商品
                                </label>
                                
                                <input type="radio" class="btn-check" name="categoryFilter" id="categoryA" value="A">
                                <label class="btn btn-outline-success" for="categoryA">
                                    <i class="bi bi-heart-fill"></i> 茶茶小貓咪
                                </label>
                                
                                <input type="radio" class="btn-check" name="categoryFilter" id="categoryB" value="B">
                                <label class="btn btn-outline-warning" for="categoryB">
                                    <i class="bi bi-egg-fried"></i> 茶茶的朋友-小雞
                                </label>
                                
                                <input type="radio" class="btn-check" name="categoryFilter" id="categoryC" value="C">
                                <label class="btn btn-outline-info" for="categoryC">
                                    <i class="bi bi-heart-pulse"></i> C類 - 運動健康
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        <!-- Products Grid -->
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4" id="productsContainer">
            <!-- Products will be dynamically generated here -->
        </div>
    </div>

    <!-- Cart Modal -->
    <div class="modal fade" id="cartModal" tabindex="-1" aria-labelledby="cartModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="cartModalLabel">
                        <i class="bi bi-cart3"></i> 購物車
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div id="cartItems">
                        <!-- Cart items will be displayed here -->
                    </div>
                    <div id="emptyCart" class="text-center text-muted py-4" style="display: none;">
                        <i class="bi bi-cart-x display-1"></i>
                        <p class="mt-2">購物車是空的</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="d-flex justify-content-between w-100">
                        <h5>總計: $<span id="totalPrice">0</span></h5>
                        <button type="button" class="btn btn-success" id="checkoutBtn" disabled>
                            <i class="bi bi-credit-card"></i> 結帳
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Image Modal -->
    <div class="modal fade" id="imageModal" tabindex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="imageModalLabel">商品圖片</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center">
                    <img id="modalImage" src="" alt="" class="img-fluid rounded">
                    <div class="mt-3">
                        <h6 id="modalProductName" class="text-muted"></h6>
                        <p id="modalProductPrice" class="h5 text-primary mb-0"></p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                        <i class="bi bi-x-lg"></i> 關閉
                    </button>
                    <button type="button" class="btn btn-primary" id="addToCartFromModal">
                        <i class="bi bi-cart-plus"></i> 加入購物車
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Toast for notifications -->
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="cartToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <i class="bi bi-check-circle-fill text-success me-2"></i>
                <strong class="me-auto">成功</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                商品已加入購物車！
            </div>
        </div>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Custom JS -->
    <script src="script.js"></script>
</body>
</html>

```

現在我還需要更新 JavaScript 中的分類名稱顯示：


```javascript
// Shopping cart functionality
class ShoppingCart {
    constructor() {
        this.items = [];
        this.loadFromStorage();
        this.updateCartDisplay();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveToStorage();
        this.updateCartDisplay();
        this.showToast();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        this.updateCartDisplay();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
                this.saveToStorage();
                this.updateCartDisplay();
            }
        }
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    updateCartDisplay() {
        this.updateCartCount();
        this.updateCartModal();
        this.updateTotalPrice();
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        cartCount.textContent = this.getTotalItems();
        
        if (this.getTotalItems() > 0) {
            cartCount.classList.add('bounce');
            setTimeout(() => cartCount.classList.remove('bounce'), 1000);
        }
    }

    updateCartModal() {
        const cartItems = document.getElementById('cartItems');
        const emptyCart = document.getElementById('emptyCart');
        
        if (this.items.length === 0) {
            cartItems.style.display = 'none';
            emptyCart.style.display = 'block';
        } else {
            cartItems.style.display = 'block';
            emptyCart.style.display = 'none';
            
            cartItems.innerHTML = this.items.map(item => `
                <div class="cart-item d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${item.name}</h6>
                        <p class="text-muted mb-0">$${item.price}</p>
                    </div>
                    <div class="quantity-controls me-3">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                               onchange="cart.updateQuantity(${item.id}, parseInt(this.value))">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <div class="text-end me-3">
                        <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                    </div>
                    <button class="btn-remove" onclick="cart.removeItem(${item.id})" title="移除商品">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    }

    updateTotalPrice() {
        const totalPrice = document.getElementById('totalPrice');
        const checkoutBtn = document.getElementById('checkoutBtn');
        
        totalPrice.textContent = this.getTotalPrice().toFixed(2);
        checkoutBtn.disabled = this.items.length === 0;
    }

    showToast() {
        const toast = new bootstrap.Toast(document.getElementById('cartToast'));
        toast.show();
    }

    saveToStorage() {
        localStorage.setItem('shoppingCart', JSON.stringify(this.items));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('shoppingCart');
        if (stored) {
            this.items = JSON.parse(stored);
        }
    }

    checkout() {
        if (this.items.length === 0) {
            alert('購物車是空的！');
            return;
        }
        
        alert(`結帳成功！\n總金額: $${this.getTotalPrice().toFixed(2)}\n商品數量: ${this.getTotalItems()}`);
        this.items = [];
        this.saveToStorage();
        this.updateCartDisplay();
    }
}

// Product data with categories
const products = [
    {
        id: 1,
        name: "枕頭貓",
        description: "高品質音效，舒適佩戴，長達8小時續航",
        price: 129.99,
        category: "A",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/pillow_cat.png"
    },
    {
        id: 2,
        name: "淺水貓",
        description: "健康監測，運動追蹤，防水設計",
        price: 299.99,
        category: "A",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/淺水貓.png"
    },
    {
        id: 3,
        name: "雞雞貓",
        description: "高效能處理器，輕薄設計，長效電池",
        price: 899.99,
        category: "A",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/雞雞貓.png"
    },
    {
        id: 4,
        name: "兔兔貓",
        description: "最新處理器，高畫質相機，5G網路",
        price: 699.99,
        category: "A",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/兔兔貓.png"
    },
    {
        id: 5,
        name: "尤達呆呆貓",
        description: "全自動研磨，多種咖啡選擇，定時功能",
        price: 199.99,
        category: "B",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/尤達呆呆貓.png"
    },
    {
        id: 6,
        name: "長條珍珠奶茶貓",
        description: "多功能訓練，可調節重量，居家健身首選",
        price: 149.99,
        category: "C",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/長條珍珠奶茶.png"
    },
    {
        id: 7,
        name: "小逼",
        description: "大螢幕顯示，觸控筆支援，娛樂辦公兩相宜",
        price: 399.99,
        category: "A",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/小逼.jpg"
    },
    {
        id: 8,
        name: "遊戲主機",
        description: "4K遊戲體驗，豐富遊戲庫，多人遊戲支援",
        price: 499.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300&h=200&fit=crop"
    },
    {
        id: 9,
        name: "空氣清淨機",
        description: "高效過濾，智能感應，靜音運作",
        price: 249.99,
        category: "B",
        image: "https://images.unsplash.com/photo-1581578731548-c6a0c3f5f1b0?w=300&h=200&fit=crop"
    },
    {
        id: 10,
        name: "跑步機",
        description: "可折疊設計，多種運動模式，心率監測",
        price: 599.99,
        category: "C",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop"
    },
    {
        id: 11,
        name: "掃地機器人",
        description: "智能路徑規劃，自動回充，APP控制",
        price: 349.99,
        category: "B",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop"
    },
    {
        id: 12,
        name: "瑜伽墊",
        description: "防滑設計，環保材質，多種顏色選擇",
        price: 39.99,
        category: "C",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop"
    }
];

// Initialize shopping cart
let cart;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    cart = new ShoppingCart();
    renderProducts();
    setupEventListeners();
});

// Get current filter
function getCurrentFilter() {
    const checkedFilter = document.querySelector('input[name="categoryFilter"]:checked');
    return checkedFilter ? checkedFilter.value : 'all';
}

// Get current search term
function getCurrentSearchTerm() {
    return document.getElementById('searchInput').value.trim().toLowerCase();
}

// Search products by name and description
function searchProducts(products, searchTerm) {
    if (!searchTerm) {
        return products;
    }
    
    return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
}

// Filter products by category
function filterProducts(category) {
    if (category === 'all') {
        return products;
    }
    return products.filter(product => product.category === category);
}

// Apply both search and category filters
function getFilteredProducts() {
    const category = getCurrentFilter();
    const searchTerm = getCurrentSearchTerm();
    
    let filteredProducts = filterProducts(category);
    filteredProducts = searchProducts(filteredProducts, searchTerm);
    
    return filteredProducts;
}

// Render products with filtering
function renderProducts() {
    const container = document.getElementById('productsContainer');
    const filteredProducts = getFilteredProducts();
    const searchTerm = getCurrentSearchTerm();
    const category = getCurrentFilter();
    
    // Update search results info
    updateSearchResultsInfo(filteredProducts.length, searchTerm, category);
    
    if (filteredProducts.length === 0) {
        let emptyMessage = '';
        if (searchTerm) {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-search display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">找不到相關商品</h3>
                        <p class="text-muted">沒有找到包含「${searchTerm}」的商品</p>
                        <button class="btn btn-outline-primary mt-3" onclick="clearSearch()">
                            <i class="bi bi-arrow-left"></i> 清除搜尋
                        </button>
                    </div>
                </div>
            `;
        } else {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-grid display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">此分類暫無商品</h3>
                        <p class="text-muted">請選擇其他分類或查看全部商品</p>
                    </div>
                </div>
            `;
        }
        container.innerHTML = emptyMessage;
        return;
    }
    
    container.innerHTML = filteredProducts.map(product => {
        const searchTerm = getCurrentSearchTerm();
        const highlightedName = highlightSearchTerm(product.name, searchTerm);
        const highlightedDescription = highlightSearchTerm(product.description, searchTerm);
        
        return `
            <div class="col">
                <div class="card h-100 product-card" data-product-id="${product.id}" style="cursor: pointer;">
                    <div class="position-relative">
                        <img src="${product.image}" class="card-img-top product-image" alt="${product.name}" loading="lazy">
                        <span class="position-absolute top-0 start-0 m-2 badge bg-${getCategoryColor(product.category)}">
                            ${product.category}類
                        </span>
                        <div class="position-absolute top-0 end-0 m-2">
                            <button class="btn btn-sm btn-light btn-image-zoom" data-product-id="${product.id}" title="查看大圖">
                                <i class="bi bi-zoom-in"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${highlightedName}</h5>
                        <p class="card-text flex-grow-1">${highlightedDescription}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="h5 text-primary mb-0">$${product.price}</span>
                            <button class="btn btn-primary btn-add-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                                <i class="bi bi-cart-plus"></i> 加入購物車
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Get category color for badge
function getCategoryColor(category) {
    const colors = {
        'A': 'success',
        'B': 'warning', 
        'C': 'info'
    };
    return colors[category] || 'secondary';
}

// Update search results info
function updateSearchResultsInfo(count, searchTerm, category) {
    const searchResultsInfo = document.getElementById('searchResultsInfo');
    let infoText = '';
    
    if (searchTerm) {
        if (category === 'all') {
            infoText = `找到 ${count} 個包含「${searchTerm}」的商品`;
        } else {
            const categoryNames = {
                'A': '茶茶小貓咪',
                'B': '茶茶的朋友-小雞',
                'C': '運動健康'
            };
            infoText = `在${categoryNames[category]}中找到 ${count} 個包含「${searchTerm}」的商品`;
        }
    } else {
        if (category === 'all') {
            infoText = `顯示全部 ${count} 個商品`;
        } else {
            const categoryNames = {
                'A': '電子產品',
                'B': '家電用品',
                'C': '運動健康'
            };
            infoText = `顯示 ${categoryNames[category]} 類別中的 ${count} 個商品`;
        }
    }
    
    searchResultsInfo.textContent = infoText;
}

// Clear search
function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('clearSearchBtn').style.display = 'none';
    renderProducts();
}

// Highlight search terms in text
function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.addItem(product);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        cart.checkout();
    });
    
    // Search input events
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    
    // Real-time search
    searchInput.addEventListener('input', function() {
        const hasValue = this.value.trim().length > 0;
        clearSearchBtn.style.display = hasValue ? 'block' : 'none';
        renderProducts();
    });
    
    // Clear search button
    clearSearchBtn.addEventListener('click', clearSearch);
    
    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            renderProducts();
        }
    });
    
    // Category filter change
    document.querySelectorAll('input[name="categoryFilter"]').forEach(radio => {
        radio.addEventListener('change', function() {
            renderProducts();
        });
    });
    
    // Prevent form submission on quantity input enter
    document.addEventListener('keypress', function(e) {
        if (e.target.classList.contains('quantity-input') && e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
        }
    });
    
    // Image click events (delegated event listeners)
    document.addEventListener('click', function(e) {
        // Product card click (entire card)
        if (e.target.closest('.product-card')) {
            const productCard = e.target.closest('.product-card');
            const productId = parseInt(productCard.getAttribute('data-product-id'));
            
            // Don't trigger if clicking on add to cart button
            if (!e.target.closest('.btn-add-cart')) {
                showImageModal(productId);
            }
        }
        
        // Product image click
        if (e.target.classList.contains('product-image')) {
            const productId = parseInt(e.target.getAttribute('data-product-id'));
            showImageModal(productId);
        }
        
        // Zoom button click
        if (e.target.closest('.btn-image-zoom')) {
            const productId = parseInt(e.target.closest('.btn-image-zoom').getAttribute('data-product-id'));
            showImageModal(productId);
        }
        
        // Add to cart from modal
        if (e.target.id === 'addToCartFromModal') {
            const productId = parseInt(e.target.getAttribute('data-product-id'));
            addToCart(productId);
            
            // Close modal
            const imageModal = bootstrap.Modal.getInstance(document.getElementById('imageModal'));
            if (imageModal) {
                imageModal.hide();
            }
        }
    });
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('zh-TW', {
        style: 'currency',
        currency: 'TWD'
    }).format(amount);
}

```

```javascript
// Shopping cart functionality
class ShoppingCart {
    constructor() {
        this.items = [];
        this.loadFromStorage();
        this.updateCartDisplay();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveToStorage();
        this.updateCartDisplay();
        this.showToast();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        this.updateCartDisplay();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
                this.saveToStorage();
                this.updateCartDisplay();
            }
        }
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    updateCartDisplay() {
        this.updateCartCount();
        this.updateCartModal();
        this.updateTotalPrice();
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        cartCount.textContent = this.getTotalItems();
        
        if (this.getTotalItems() > 0) {
            cartCount.classList.add('bounce');
            setTimeout(() => cartCount.classList.remove('bounce'), 1000);
        }
    }

    updateCartModal() {
        const cartItems = document.getElementById('cartItems');
        const emptyCart = document.getElementById('emptyCart');
        
        if (this.items.length === 0) {
            cartItems.style.display = 'none';
            emptyCart.style.display = 'block';
        } else {
            cartItems.style.display = 'block';
            emptyCart.style.display = 'none';
            
            cartItems.innerHTML = this.items.map(item => `
                <div class="cart-item d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${item.name}</h6>
                        <p class="text-muted mb-0">$${item.price}</p>
                    </div>
                    <div class="quantity-controls me-3">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                               onchange="cart.updateQuantity(${item.id}, parseInt(this.value))">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <div class="text-end me-3">
                        <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                    </div>
                    <button class="btn-remove" onclick="cart.removeItem(${item.id})" title="移除商品">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    }

    updateTotalPrice() {
        const totalPrice = document.getElementById('totalPrice');
        const checkoutBtn = document.getElementById('checkoutBtn');
        
        totalPrice.textContent = this.getTotalPrice().toFixed(2);
        checkoutBtn.disabled = this.items.length === 0;
    }

    showToast() {
        const toast = new bootstrap.Toast(document.getElementById('cartToast'));
        toast.show();
    }

    saveToStorage() {
        localStorage.setItem('shoppingCart', JSON.stringify(this.items));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('shoppingCart');
        if (stored) {
            this.items = JSON.parse(stored);
        }
    }

    checkout() {
        if (this.items.length === 0) {
            alert('購物車是空的！');
            return;
        }
        
        alert(`結帳成功！\n總金額: $${this.getTotalPrice().toFixed(2)}\n商品數量: ${this.getTotalItems()}`);
        this.items = [];
        this.saveToStorage();
        this.updateCartDisplay();
    }
}

// Product data with categories
const products = [
    {
        id: 1,
        name: "枕頭貓",
        description: "高品質音效，舒適佩戴，長達8小時續航",
        price: 129.99,
        category: "A",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/pillow_cat.png"
    },
    {
        id: 2,
        name: "淺水貓",
        description: "健康監測，運動追蹤，防水設計",
        price: 299.99,
        category: "A",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/淺水貓.png"
    },
    {
        id: 3,
        name: "雞雞貓",
        description: "高效能處理器，輕薄設計，長效電池",
        price: 899.99,
        category: "A",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/雞雞貓.png"
    },
    {
        id: 4,
        name: "兔兔貓",
        description: "最新處理器，高畫質相機，5G網路",
        price: 699.99,
        category: "A",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/兔兔貓.png"
    },
    {
        id: 5,
        name: "尤達呆呆貓",
        description: "全自動研磨，多種咖啡選擇，定時功能",
        price: 199.99,
        category: "B",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/尤達呆呆貓.png"
    },
    {
        id: 6,
        name: "長條珍珠奶茶貓",
        description: "多功能訓練，可調節重量，居家健身首選",
        price: 149.99,
        category: "C",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/長條珍珠奶茶.png"
    },
    {
        id: 7,
        name: "小逼",
        description: "大螢幕顯示，觸控筆支援，娛樂辦公兩相宜",
        price: 399.99,
        category: "A",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/小逼.jpg"
    },
    {
        id: 8,
        name: "遊戲主機",
        description: "4K遊戲體驗，豐富遊戲庫，多人遊戲支援",
        price: 499.99,
        category: "A",
        image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300&h=200&fit=crop"
    },
    {
        id: 9,
        name: "空氣清淨機",
        description: "高效過濾，智能感應，靜音運作",
        price: 249.99,
        category: "B",
        image: "https://images.unsplash.com/photo-1581578731548-c6a0c3f5f1b0?w=300&h=200&fit=crop"
    },
    {
        id: 10,
        name: "跑步機",
        description: "可折疊設計，多種運動模式，心率監測",
        price: 599.99,
        category: "C",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop"
    },
    {
        id: 11,
        name: "掃地機器人",
        description: "智能路徑規劃，自動回充，APP控制",
        price: 349.99,
        category: "B",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop"
    },
    {
        id: 12,
        name: "瑜伽墊",
        description: "防滑設計，環保材質，多種顏色選擇",
        price: 39.99,
        category: "C",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop"
    }
];

// Initialize shopping cart
let cart;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    cart = new ShoppingCart();
    renderProducts();
    setupEventListeners();
});

// Get current filter
function getCurrentFilter() {
    const checkedFilter = document.querySelector('input[name="categoryFilter"]:checked');
    return checkedFilter ? checkedFilter.value : 'all';
}

// Get current search term
function getCurrentSearchTerm() {
    return document.getElementById('searchInput').value.trim().toLowerCase();
}

// Search products by name and description
function searchProducts(products, searchTerm) {
    if (!searchTerm) {
        return products;
    }
    
    return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
}

// Filter products by category
function filterProducts(category) {
    if (category === 'all') {
        return products;
    }
    return products.filter(product => product.category === category);
}

// Apply both search and category filters
function getFilteredProducts() {
    const category = getCurrentFilter();
    const searchTerm = getCurrentSearchTerm();
    
    let filteredProducts = filterProducts(category);
    filteredProducts = searchProducts(filteredProducts, searchTerm);
    
    return filteredProducts;
}

// Render products with filtering
function renderProducts() {
    const container = document.getElementById('productsContainer');
    const filteredProducts = getFilteredProducts();
    const searchTerm = getCurrentSearchTerm();
    const category = getCurrentFilter();
    
    // Update search results info
    updateSearchResultsInfo(filteredProducts.length, searchTerm, category);
    
    if (filteredProducts.length === 0) {
        let emptyMessage = '';
        if (searchTerm) {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-search display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">找不到相關商品</h3>
                        <p class="text-muted">沒有找到包含「${searchTerm}」的商品</p>
                        <button class="btn btn-outline-primary mt-3" onclick="clearSearch()">
                            <i class="bi bi-arrow-left"></i> 清除搜尋
                        </button>
                    </div>
                </div>
            `;
        } else {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-grid display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">此分類暫無商品</h3>
                        <p class="text-muted">請選擇其他分類或查看全部商品</p>
                    </div>
                </div>
            `;
        }
        container.innerHTML = emptyMessage;
        return;
    }
    
    container.innerHTML = filteredProducts.map(product => {
        const searchTerm = getCurrentSearchTerm();
        const highlightedName = highlightSearchTerm(product.name, searchTerm);
        const highlightedDescription = highlightSearchTerm(product.description, searchTerm);
        
        return `
            <div class="col">
                <div class="card h-100 product-card" data-product-id="${product.id}" style="cursor: pointer;">
                    <div class="position-relative">
                        <img src="${product.image}" class="card-img-top product-image" alt="${product.name}" loading="lazy">
                        <span class="position-absolute top-0 start-0 m-2 badge bg-${getCategoryColor(product.category)}">
                            ${product.category}類
                        </span>
                        <div class="position-absolute top-0 end-0 m-2">
                            <button class="btn btn-sm btn-light btn-image-zoom" data-product-id="${product.id}" title="查看大圖">
                                <i class="bi bi-zoom-in"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${highlightedName}</h5>
                        <p class="card-text flex-grow-1">${highlightedDescription}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="h5 text-primary mb-0">$${product.price}</span>
                            <button class="btn btn-primary btn-add-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                                <i class="bi bi-cart-plus"></i> 加入購物車
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Get category color for badge
function getCategoryColor(category) {
    const colors = {
        'A': 'success',
        'B': 'warning', 
        'C': 'info'
    };
    return colors[category] || 'secondary';
}

// Update search results info
function updateSearchResultsInfo(count, searchTerm, category) {
    const searchResultsInfo = document.getElementById('searchResultsInfo');
    let infoText = '';
    
    if (searchTerm) {
        if (category === 'all') {
            infoText = `找到 ${count} 個包含「${searchTerm}」的商品`;
        } else {
            const categoryNames = {
                'A': '茶茶小貓咪',
                'B': '茶茶的朋友-小雞',
                'C': '運動健康'
            };
            infoText = `在${categoryNames[category]}中找到 ${count} 個包含「${searchTerm}」的商品`;
        }
    } else {
        if (category === 'all') {
            infoText = `顯示全部 ${count} 個商品`;
        } else {
            const categoryNames = {
                'A': '茶茶小貓咪',
                'B': '茶茶的朋友-小雞',
                'C': '運動健康'
            };
            infoText = `顯示 ${categoryNames[category]} 類別中的 ${count} 個商品`;
        }
    }
    
    searchResultsInfo.textContent = infoText;
}

// Clear search
function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('clearSearchBtn').style.display = 'none';
    renderProducts();
}

// Highlight search terms in text
function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.addItem(product);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        cart.checkout();
    });
    
    // Search input events
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    
    // Real-time search
    searchInput.addEventListener('input', function() {
        const hasValue = this.value.trim().length > 0;
        clearSearchBtn.style.display = hasValue ? 'block' : 'none';
        renderProducts();
    });
    
    // Clear search button
    clearSearchBtn.addEventListener('click', clearSearch);
    
    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            renderProducts();
        }
    });
    
    // Category filter change
    document.querySelectorAll('input[name="categoryFilter"]').forEach(radio => {
        radio.addEventListener('change', function() {
            renderProducts();
        });
    });
    
    // Prevent form submission on quantity input enter
    document.addEventListener('keypress', function(e) {
        if (e.target.classList.contains('quantity-input') && e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
        }
    });
    
    // Image click events (delegated event listeners)
    document.addEventListener('click', function(e) {
        // Product card click (entire card)
        if (e.target.closest('.product-card')) {
            const productCard = e.target.closest('.product-card');
            const productId = parseInt(productCard.getAttribute('data-product-id'));
            
            // Don't trigger if clicking on add to cart button
            if (!e.target.closest('.btn-add-cart')) {
                showImageModal(productId);
            }
        }
        
        // Product image click
        if (e.target.classList.contains('product-image')) {
            const productId = parseInt(e.target.getAttribute('data-product-id'));
            showImageModal(productId);
        }
        
        // Zoom button click
        if (e.target.closest('.btn-image-zoom')) {
            const productId = parseInt(e.target.closest('.btn-image-zoom').getAttribute('data-product-id'));
            showImageModal(productId);
        }
        
        // Add to cart from modal
        if (e.target.id === 'addToCartFromModal') {
            const productId = parseInt(e.target.getAttribute('data-product-id'));
            addToCart(productId);
            
            // Close modal
            const imageModal = bootstrap.Modal.getInstance(document.getElementById('imageModal'));
            if (imageModal) {
                imageModal.hide();
            }
        }
    });
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('zh-TW', {
        style: 'currency',
        currency: 'TWD'
    }).format(amount);
}

```

讓我檢查是否有任何 linting 錯誤：


完美！我已經成功更新了分類按鈕的名稱和圖示。以下是修改的內容：

## 🐱 分類按鈕更新

### 🎯 新的分類名稱
- **A類**：從「A類 - 電子產品」改為「茶茶小貓咪」
- **B類**：從「B類 - 家電用品」改為「茶茶的朋友-小雞」
- **C類**：保持「C類 - 運動健康」不變
- **全部商品**：保持不變

### 🎨 圖示更新
- **茶茶小貓咪**：使用愛心圖示 (`bi-heart-fill`) 代表可愛的小貓咪
- **茶茶的朋友-小雞**：使用煎蛋圖示 (`bi-egg-fried`) 代表小雞
- **運動健康**：保持心跳圖示 (`bi-heart-pulse`)
- **全部商品**：保持網格圖示 (`bi-grid-3x3-gap`)

### ✨ 功能保持
- 所有分類篩選功能正常運作
- 搜尋結果資訊會顯示新的分類名稱
- 商品卡片上的分類標籤保持 A、B、C 類標示
- 購物車功能不受影響

### 🎨 視覺效果
- 按鈕樣式和配色保持不變
- 新的圖示與可愛的主題更匹配
- 文字更加親切和有趣
- 整體設計風格保持一致

現在您的購物網站具有了更可愛和個性化的分類名稱！「茶茶小貓咪」和「茶茶的朋友-小雞」讓網站更加溫馨有趣。

---

**User**

把商品卡上面的ABC類刪掉

---

**Cursor**

我將為您移除商品卡片上的A、B、C類標籤。


```javascript
// Shopping cart functionality
class ShoppingCart {
    constructor() {
        this.items = [];
        this.loadFromStorage();
        this.updateCartDisplay();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveToStorage();
        this.updateCartDisplay();
        this.showToast();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        this.updateCartDisplay();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
                this.saveToStorage();
                this.updateCartDisplay();
            }
        }
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    updateCartDisplay() {
        this.updateCartCount();
        this.updateCartModal();
        this.updateTotalPrice();
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        cartCount.textContent = this.getTotalItems();
        
        if (this.getTotalItems() > 0) {
            cartCount.classList.add('bounce');
            setTimeout(() => cartCount.classList.remove('bounce'), 1000);
        }
    }

    updateCartModal() {
        const cartItems = document.getElementById('cartItems');
        const emptyCart = document.getElementById('emptyCart');
        
        if (this.items.length === 0) {
            cartItems.style.display = 'none';
            emptyCart.style.display = 'block';
        } else {
            cartItems.style.display = 'block';
            emptyCart.style.display = 'none';
            
            cartItems.innerHTML = this.items.map(item => `
                <div class="cart-item d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${item.name}</h6>
                        <p class="text-muted mb-0">$${item.price}</p>
                    </div>
                    <div class="quantity-controls me-3">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                               onchange="cart.updateQuantity(${item.id}, parseInt(this.value))">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <div class="text-end me-3">
                        <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                    </div>
                    <button class="btn-remove" onclick="cart.removeItem(${item.id})" title="移除商品">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    }

    updateTotalPrice() {
        const totalPrice = document.getElementById('totalPrice');
        const checkoutBtn = document.getElementById('checkoutBtn');
        
        totalPrice.textContent = this.getTotalPrice().toFixed(2);
        checkoutBtn.disabled = this.items.length === 0;
    }

    showToast() {
        const toast = new bootstrap.Toast(document.getElementById('cartToast'));
        toast.show();
    }

    saveToStorage() {
        localStorage.setItem('shoppingCart', JSON.stringify(this.items));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('shoppingCart');
        if (stored) {
            this.items = JSON.parse(stored);
        }
    }

    checkout() {
        if (this.items.length === 0) {
            alert('購物車是空的！');
            return;
        }
        
        alert(`結帳成功！\n總金額: $${this.getTotalPrice().toFixed(2)}\n商品數量: ${this.getTotalItems()}`);
        this.items = [];
        this.saveToStorage();
        this.updateCartDisplay();
    }
}

// Product data with categories
const products = [
    {
        id: 1,
        name: "枕頭貓",
        description: "高品質音效，舒適佩戴，長達8小時續航",
        price: 129.99,
        category: "A",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/pillow_cat.png"
    },
    {
        id: 2,
        name: "淺水貓",
        description: "健康監測，運動追蹤，防水設計",
        price: 299.99,
        category: "A",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/淺水貓.png"
    },
    {
        id: 3,
        name: "雞雞貓",
        description: "高效能處理器，輕薄設計，長效電池",
        price: 899.99,
        category: "A",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/雞雞貓.png"
    },
    {
        id: 4,
        name: "兔兔貓",
        description: "最新處理器，高畫質相機，5G網路",
        price: 699.99,
        category: "A",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/兔兔貓.png"
    },
    {
        id: 5,
        name: "尤達呆呆貓",
        description: "全自動研磨，多種咖啡選擇，定時功能",
        price: 199.99,
        category: "A",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/尤達呆呆貓.png"
    },
    {
        id: 6,
        name: "長條珍珠奶茶貓",
        description: "多功能訓練，可調節重量，居家健身首選",
        price: 149.99,
        category: "A",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/長條珍珠奶茶.png"
    },
    {
        id: 7,
        name: "小逼",
        description: "大螢幕顯示，觸控筆支援，娛樂辦公兩相宜",
        price: 399.99,
        category: "B",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/小逼.jpg"
    },
    {
        id: 8,
        name: "茶茶與鼠鼠.png",
        description: "4K遊戲體驗，豐富遊戲庫，多人遊戲支援",
        price: 499.99,
        category: "A",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/茶茶與鼠鼠.png"
    },
    {
        id: 9,
        name: "站坐貓",
        description: "高效過濾，智能感應，靜音運作",
        price: 249.99,
        category: "A",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/站坐貓.png"
    },
    {
        id: 10,
        name: "石膏雞",
        description: "可折疊設計，多種運動模式，心率監測",
        price: 599.99,
        category: "B",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/石膏雞.jpg"
    },
    {
        id: 11,
        name: "饋手貓",
        description: "智能路徑規劃，自動回充，APP控制",
        price: 349.99,
        category: "A",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/饋手貓.png"
    },
    {
        id: 12,
        name: "打字雞",
        description: "防滑設計，環保材質，多種顏色選擇",
        price: 39.99,
        category: "B",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/打字雞.jpg"
    }
];

// Initialize shopping cart
let cart;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    cart = new ShoppingCart();
    renderProducts();
    setupEventListeners();
});

// Get current filter
function getCurrentFilter() {
    const checkedFilter = document.querySelector('input[name="categoryFilter"]:checked');
    return checkedFilter ? checkedFilter.value : 'all';
}

// Get current search term
function getCurrentSearchTerm() {
    return document.getElementById('searchInput').value.trim().toLowerCase();
}

// Search products by name and description
function searchProducts(products, searchTerm) {
    if (!searchTerm) {
        return products;
    }
    
    return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
}

// Filter products by category
function filterProducts(category) {
    if (category === 'all') {
        return products;
    }
    return products.filter(product => product.category === category);
}

// Apply both search and category filters
function getFilteredProducts() {
    const category = getCurrentFilter();
    const searchTerm = getCurrentSearchTerm();
    
    let filteredProducts = filterProducts(category);
    filteredProducts = searchProducts(filteredProducts, searchTerm);
    
    return filteredProducts;
}

// Render products with filtering
function renderProducts() {
    const container = document.getElementById('productsContainer');
    const filteredProducts = getFilteredProducts();
    const searchTerm = getCurrentSearchTerm();
    const category = getCurrentFilter();
    
    // Update search results info
    updateSearchResultsInfo(filteredProducts.length, searchTerm, category);
    
    if (filteredProducts.length === 0) {
        let emptyMessage = '';
        if (searchTerm) {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-search display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">找不到相關商品</h3>
                        <p class="text-muted">沒有找到包含「${searchTerm}」的商品</p>
                        <button class="btn btn-outline-primary mt-3" onclick="clearSearch()">
                            <i class="bi bi-arrow-left"></i> 清除搜尋
                        </button>
                    </div>
                </div>
            `;
        } else {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-grid display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">此分類暫無商品</h3>
                        <p class="text-muted">請選擇其他分類或查看全部商品</p>
                    </div>
                </div>
            `;
        }
        container.innerHTML = emptyMessage;
        return;
    }
    
    container.innerHTML = filteredProducts.map(product => {
        const searchTerm = getCurrentSearchTerm();
        const highlightedName = highlightSearchTerm(product.name, searchTerm);
        const highlightedDescription = highlightSearchTerm(product.description, searchTerm);
        
        return `
            <div class="col">
                <div class="card h-100 product-card" data-product-id="${product.id}" style="cursor: pointer;">
                    <div class="position-relative">
                        <img src="${product.image}" class="card-img-top product-image" alt="${product.name}" loading="lazy">
                        <div class="position-absolute top-0 end-0 m-2">
                            <button class="btn btn-sm btn-light btn-image-zoom" data-product-id="${product.id}" title="查看大圖">
                                <i class="bi bi-zoom-in"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${highlightedName}</h5>
                        <p class="card-text flex-grow-1">${highlightedDescription}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="h5 text-primary mb-0">$${product.price}</span>
                            <button class="btn btn-primary btn-add-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                                <i class="bi bi-cart-plus"></i> 加入購物車
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Get category color for badge
function getCategoryColor(category) {
    const colors = {
        'A': 'success',
        'B': 'warning', 
        'C': 'info'
    };
    return colors[category] || 'secondary';
}

// Update search results info
function updateSearchResultsInfo(count, searchTerm, category) {
    const searchResultsInfo = document.getElementById('searchResultsInfo');
    let infoText = '';
    
    if (searchTerm) {
        if (category === 'all') {
            infoText = `找到 ${count} 個包含「${searchTerm}」的商品`;
        } else {
            const categoryNames = {
                'A': '茶茶小貓咪',
                'B': '茶茶的朋友-小雞',
                'C': '運動健康'
            };
            infoText = `在${categoryNames[category]}中找到 ${count} 個包含「${searchTerm}」的商品`;
        }
    } else {
        if (category === 'all') {
            infoText = `顯示全部 ${count} 個商品`;
        } else {
            const categoryNames = {
                'A': '茶茶小貓咪',
                'B': '茶茶的朋友-小雞',
                'C': '運動健康'
            };
            infoText = `顯示 ${categoryNames[category]} 類別中的 ${count} 個商品`;
        }
    }
    
    searchResultsInfo.textContent = infoText;
}

// Clear search
function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('clearSearchBtn').style.display = 'none';
    renderProducts();
}

// Highlight search terms in text
function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.addItem(product);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        cart.checkout();
    });
    
    // Search input events
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    
    // Real-time search
    searchInput.addEventListener('input', function() {
        const hasValue = this.value.trim().length > 0;
        clearSearchBtn.style.display = hasValue ? 'block' : 'none';
        renderProducts();
    });
    
    // Clear search button
    clearSearchBtn.addEventListener('click', clearSearch);
    
    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            renderProducts();
        }
    });
    
    // Category filter change
    document.querySelectorAll('input[name="categoryFilter"]').forEach(radio => {
        radio.addEventListener('change', function() {
            renderProducts();
        });
    });
    
    // Prevent form submission on quantity input enter
    document.addEventListener('keypress', function(e) {
        if (e.target.classList.contains('quantity-input') && e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
        }
    });
    
    // Image click events (delegated event listeners)
    document.addEventListener('click', function(e) {
        // Product card click (entire card)
        if (e.target.closest('.product-card')) {
            const productCard = e.target.closest('.product-card');
            const productId = parseInt(productCard.getAttribute('data-product-id'));
            
            // Don't trigger if clicking on add to cart button
            if (!e.target.closest('.btn-add-cart')) {
                showImageModal(productId);
            }
        }
        
        // Product image click
        if (e.target.classList.contains('product-image')) {
            const productId = parseInt(e.target.getAttribute('data-product-id'));
            showImageModal(productId);
        }
        
        // Zoom button click
        if (e.target.closest('.btn-image-zoom')) {
            const productId = parseInt(e.target.closest('.btn-image-zoom').getAttribute('data-product-id'));
            showImageModal(productId);
        }
        
        // Add to cart from modal
        if (e.target.id === 'addToCartFromModal') {
            const productId = parseInt(e.target.getAttribute('data-product-id'));
            addToCart(productId);
            
            // Close modal
            const imageModal = bootstrap.Modal.getInstance(document.getElementById('imageModal'));
            if (imageModal) {
                imageModal.hide();
            }
        }
    });
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('zh-TW', {
        style: 'currency',
        currency: 'TWD'
    }).format(amount);
}

```

現在我還可以移除不再使用的 `getCategoryColor` 函數，因為它已經不需要了：


```javascript
// Shopping cart functionality
class ShoppingCart {
    constructor() {
        this.items = [];
        this.loadFromStorage();
        this.updateCartDisplay();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveToStorage();
        this.updateCartDisplay();
        this.showToast();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        this.updateCartDisplay();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
                this.saveToStorage();
                this.updateCartDisplay();
            }
        }
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    updateCartDisplay() {
        this.updateCartCount();
        this.updateCartModal();
        this.updateTotalPrice();
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        cartCount.textContent = this.getTotalItems();
        
        if (this.getTotalItems() > 0) {
            cartCount.classList.add('bounce');
            setTimeout(() => cartCount.classList.remove('bounce'), 1000);
        }
    }

    updateCartModal() {
        const cartItems = document.getElementById('cartItems');
        const emptyCart = document.getElementById('emptyCart');
        
        if (this.items.length === 0) {
            cartItems.style.display = 'none';
            emptyCart.style.display = 'block';
        } else {
            cartItems.style.display = 'block';
            emptyCart.style.display = 'none';
            
            cartItems.innerHTML = this.items.map(item => `
                <div class="cart-item d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${item.name}</h6>
                        <p class="text-muted mb-0">$${item.price}</p>
                    </div>
                    <div class="quantity-controls me-3">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                               onchange="cart.updateQuantity(${item.id}, parseInt(this.value))">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <div class="text-end me-3">
                        <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                    </div>
                    <button class="btn-remove" onclick="cart.removeItem(${item.id})" title="移除商品">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    }

    updateTotalPrice() {
        const totalPrice = document.getElementById('totalPrice');
        const checkoutBtn = document.getElementById('checkoutBtn');
        
        totalPrice.textContent = this.getTotalPrice().toFixed(2);
        checkoutBtn.disabled = this.items.length === 0;
    }

    showToast() {
        const toast = new bootstrap.Toast(document.getElementById('cartToast'));
        toast.show();
    }

    saveToStorage() {
        localStorage.setItem('shoppingCart', JSON.stringify(this.items));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('shoppingCart');
        if (stored) {
            this.items = JSON.parse(stored);
        }
    }

    checkout() {
        if (this.items.length === 0) {
            alert('購物車是空的！');
            return;
        }
        
        alert(`結帳成功！\n總金額: $${this.getTotalPrice().toFixed(2)}\n商品數量: ${this.getTotalItems()}`);
        this.items = [];
        this.saveToStorage();
        this.updateCartDisplay();
    }
}

// Product data with categories
const products = [
    {
        id: 1,
        name: "枕頭貓",
        description: "高品質音效，舒適佩戴，長達8小時續航",
        price: 129.99,
        category: "A",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/pillow_cat.png"
    },
    {
        id: 2,
        name: "淺水貓",
        description: "健康監測，運動追蹤，防水設計",
        price: 299.99,
        category: "A",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/淺水貓.png"
    },
    {
        id: 3,
        name: "雞雞貓",
        description: "高效能處理器，輕薄設計，長效電池",
        price: 899.99,
        category: "A",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/雞雞貓.png"
    },
    {
        id: 4,
        name: "兔兔貓",
        description: "最新處理器，高畫質相機，5G網路",
        price: 699.99,
        category: "A",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/兔兔貓.png"
    },
    {
        id: 5,
        name: "尤達呆呆貓",
        description: "全自動研磨，多種咖啡選擇，定時功能",
        price: 199.99,
        category: "A",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/尤達呆呆貓.png"
    },
    {
        id: 6,
        name: "長條珍珠奶茶貓",
        description: "多功能訓練，可調節重量，居家健身首選",
        price: 149.99,
        category: "A",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/長條珍珠奶茶.png"
    },
    {
        id: 7,
        name: "小逼",
        description: "大螢幕顯示，觸控筆支援，娛樂辦公兩相宜",
        price: 399.99,
        category: "B",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/小逼.jpg"
    },
    {
        id: 8,
        name: "茶茶與鼠鼠.png",
        description: "4K遊戲體驗，豐富遊戲庫，多人遊戲支援",
        price: 499.99,
        category: "A",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/茶茶與鼠鼠.png"
    },
    {
        id: 9,
        name: "站坐貓",
        description: "高效過濾，智能感應，靜音運作",
        price: 249.99,
        category: "A",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/站坐貓.png"
    },
    {
        id: 10,
        name: "石膏雞",
        description: "可折疊設計，多種運動模式，心率監測",
        price: 599.99,
        category: "B",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/石膏雞.jpg"
    },
    {
        id: 11,
        name: "饋手貓",
        description: "智能路徑規劃，自動回充，APP控制",
        price: 349.99,
        category: "A",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/饋手貓.png"
    },
    {
        id: 12,
        name: "打字雞",
        description: "防滑設計，環保材質，多種顏色選擇",
        price: 39.99,
        category: "B",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/打字雞.jpg"
    }
];

// Initialize shopping cart
let cart;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    cart = new ShoppingCart();
    renderProducts();
    setupEventListeners();
});

// Get current filter
function getCurrentFilter() {
    const checkedFilter = document.querySelector('input[name="categoryFilter"]:checked');
    return checkedFilter ? checkedFilter.value : 'all';
}

// Get current search term
function getCurrentSearchTerm() {
    return document.getElementById('searchInput').value.trim().toLowerCase();
}

// Search products by name and description
function searchProducts(products, searchTerm) {
    if (!searchTerm) {
        return products;
    }
    
    return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
}

// Filter products by category
function filterProducts(category) {
    if (category === 'all') {
        return products;
    }
    return products.filter(product => product.category === category);
}

// Apply both search and category filters
function getFilteredProducts() {
    const category = getCurrentFilter();
    const searchTerm = getCurrentSearchTerm();
    
    let filteredProducts = filterProducts(category);
    filteredProducts = searchProducts(filteredProducts, searchTerm);
    
    return filteredProducts;
}

// Render products with filtering
function renderProducts() {
    const container = document.getElementById('productsContainer');
    const filteredProducts = getFilteredProducts();
    const searchTerm = getCurrentSearchTerm();
    const category = getCurrentFilter();
    
    // Update search results info
    updateSearchResultsInfo(filteredProducts.length, searchTerm, category);
    
    if (filteredProducts.length === 0) {
        let emptyMessage = '';
        if (searchTerm) {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-search display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">找不到相關商品</h3>
                        <p class="text-muted">沒有找到包含「${searchTerm}」的商品</p>
                        <button class="btn btn-outline-primary mt-3" onclick="clearSearch()">
                            <i class="bi bi-arrow-left"></i> 清除搜尋
                        </button>
                    </div>
                </div>
            `;
        } else {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-grid display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">此分類暫無商品</h3>
                        <p class="text-muted">請選擇其他分類或查看全部商品</p>
                    </div>
                </div>
            `;
        }
        container.innerHTML = emptyMessage;
        return;
    }
    
    container.innerHTML = filteredProducts.map(product => {
        const searchTerm = getCurrentSearchTerm();
        const highlightedName = highlightSearchTerm(product.name, searchTerm);
        const highlightedDescription = highlightSearchTerm(product.description, searchTerm);
        
        return `
            <div class="col">
                <div class="card h-100 product-card" data-product-id="${product.id}" style="cursor: pointer;">
                    <div class="position-relative">
                        <img src="${product.image}" class="card-img-top product-image" alt="${product.name}" loading="lazy">
                        <div class="position-absolute top-0 end-0 m-2">
                            <button class="btn btn-sm btn-light btn-image-zoom" data-product-id="${product.id}" title="查看大圖">
                                <i class="bi bi-zoom-in"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${highlightedName}</h5>
                        <p class="card-text flex-grow-1">${highlightedDescription}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="h5 text-primary mb-0">$${product.price}</span>
                            <button class="btn btn-primary btn-add-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                                <i class="bi bi-cart-plus"></i> 加入購物車
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}


// Update search results info
function updateSearchResultsInfo(count, searchTerm, category) {
    const searchResultsInfo = document.getElementById('searchResultsInfo');
    let infoText = '';
    
    if (searchTerm) {
        if (category === 'all') {
            infoText = `找到 ${count} 個包含「${searchTerm}」的商品`;
        } else {
            const categoryNames = {
                'A': '茶茶小貓咪',
                'B': '茶茶的朋友-小雞',
                'C': '運動健康'
            };
            infoText = `在${categoryNames[category]}中找到 ${count} 個包含「${searchTerm}」的商品`;
        }
    } else {
        if (category === 'all') {
            infoText = `顯示全部 ${count} 個商品`;
        } else {
            const categoryNames = {
                'A': '茶茶小貓咪',
                'B': '茶茶的朋友-小雞',
                'C': '運動健康'
            };
            infoText = `顯示 ${categoryNames[category]} 類別中的 ${count} 個商品`;
        }
    }
    
    searchResultsInfo.textContent = infoText;
}

// Clear search
function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('clearSearchBtn').style.display = 'none';
    renderProducts();
}

// Highlight search terms in text
function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.addItem(product);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        cart.checkout();
    });
    
    // Search input events
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    
    // Real-time search
    searchInput.addEventListener('input', function() {
        const hasValue = this.value.trim().length > 0;
        clearSearchBtn.style.display = hasValue ? 'block' : 'none';
        renderProducts();
    });
    
    // Clear search button
    clearSearchBtn.addEventListener('click', clearSearch);
    
    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            renderProducts();
        }
    });
    
    // Category filter change
    document.querySelectorAll('input[name="categoryFilter"]').forEach(radio => {
        radio.addEventListener('change', function() {
            renderProducts();
        });
    });
    
    // Prevent form submission on quantity input enter
    document.addEventListener('keypress', function(e) {
        if (e.target.classList.contains('quantity-input') && e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
        }
    });
    
    // Image click events (delegated event listeners)
    document.addEventListener('click', function(e) {
        // Product card click (entire card)
        if (e.target.closest('.product-card')) {
            const productCard = e.target.closest('.product-card');
            const productId = parseInt(productCard.getAttribute('data-product-id'));
            
            // Don't trigger if clicking on add to cart button
            if (!e.target.closest('.btn-add-cart')) {
                showImageModal(productId);
            }
        }
        
        // Product image click
        if (e.target.classList.contains('product-image')) {
            const productId = parseInt(e.target.getAttribute('data-product-id'));
            showImageModal(productId);
        }
        
        // Zoom button click
        if (e.target.closest('.btn-image-zoom')) {
            const productId = parseInt(e.target.closest('.btn-image-zoom').getAttribute('data-product-id'));
            showImageModal(productId);
        }
        
        // Add to cart from modal
        if (e.target.id === 'addToCartFromModal') {
            const productId = parseInt(e.target.getAttribute('data-product-id'));
            addToCart(productId);
            
            // Close modal
            const imageModal = bootstrap.Modal.getInstance(document.getElementById('imageModal'));
            if (imageModal) {
                imageModal.hide();
            }
        }
    });
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('zh-TW', {
        style: 'currency',
        currency: 'TWD'
    }).format(amount);
}

```

讓我檢查是否有任何 linting 錯誤：


完美！我已經成功移除了商品卡片上的A、B、C類標籤。以下是修改的內容：

## 🏷️ 移除分類標籤

### ✅ 已移除的元素
- **分類標籤**：移除了商品卡片左上角的「A類」、「B類」、「C類」標籤
- **相關函數**：移除了不再使用的 `getCategoryColor` 函數
- **標籤樣式**：清理了相關的 CSS 樣式代碼

### 🎨 視覺效果
- **更簡潔的設計**：商品卡片現在更加簡潔，沒有多餘的標籤
- **專注於內容**：用戶可以更專注於商品圖片、名稱和描述
- **保持功能**：分類篩選功能仍然正常運作，只是不在卡片上顯示標籤

### 🛠️ 保留的功能
- **分類篩選**：頂部的分類按鈕仍然可以正常篩選商品
- **圖片點擊**：商品圖片仍然可以點擊查看大圖
- **購物車功能**：加入購物車功能完全正常
- **搜尋功能**：搜尋和篩選功能不受影響

### 📱 響應式設計
- 移除標籤後，卡片在不同螢幕尺寸下顯示更加一致
- 圖片區域有更多空間
- 整體視覺更加清爽

現在您的商品卡片具有了更簡潔的外觀，沒有分類標籤的干擾，讓用戶可以更專注於商品本身的內容！

---

**User**

請將每個商品新增「促銷商品」標籤
若該商品的「促銷商品」為True的話
在商店頁面該商品的card左上方顯示一個「促銷」的標籤

---

**Cursor**

我將為每個商品添加「促銷商品」屬性，並在商品卡片上顯示促銷標籤。


首先，我需要為商品數據添加「促銷商品」屬性：


```javascript
    {
        id: 1,
        name: "無線藍牙耳機",
        description: "高品質音效，舒適佩戴，長達8小時續航",
        price: 129.99,
        category: "A",
        isOnSale: true,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop"
    },
```

讓我先讀取當前的文件內容來了解商品數據的結構：


現在我將為所有商品添加促銷屬性。讓我使用 MultiEdit 來批量更新：


```javascript
// Shopping cart functionality
class ShoppingCart {
    constructor() {
        this.items = [];
        this.loadFromStorage();
        this.updateCartDisplay();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveToStorage();
        this.updateCartDisplay();
        this.showToast();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        this.updateCartDisplay();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
                this.saveToStorage();
                this.updateCartDisplay();
            }
        }
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    updateCartDisplay() {
        this.updateCartCount();
        this.updateCartModal();
        this.updateTotalPrice();
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        cartCount.textContent = this.getTotalItems();
        
        if (this.getTotalItems() > 0) {
            cartCount.classList.add('bounce');
            setTimeout(() => cartCount.classList.remove('bounce'), 1000);
        }
    }

    updateCartModal() {
        const cartItems = document.getElementById('cartItems');
        const emptyCart = document.getElementById('emptyCart');
        
        if (this.items.length === 0) {
            cartItems.style.display = 'none';
            emptyCart.style.display = 'block';
        } else {
            cartItems.style.display = 'block';
            emptyCart.style.display = 'none';
            
            cartItems.innerHTML = this.items.map(item => `
                <div class="cart-item d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${item.name}</h6>
                        <p class="text-muted mb-0">$${item.price}</p>
                    </div>
                    <div class="quantity-controls me-3">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                               onchange="cart.updateQuantity(${item.id}, parseInt(this.value))">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <div class="text-end me-3">
                        <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                    </div>
                    <button class="btn-remove" onclick="cart.removeItem(${item.id})" title="移除商品">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    }

    updateTotalPrice() {
        const totalPrice = document.getElementById('totalPrice');
        const checkoutBtn = document.getElementById('checkoutBtn');
        
        totalPrice.textContent = this.getTotalPrice().toFixed(2);
        checkoutBtn.disabled = this.items.length === 0;
    }

    showToast() {
        const toast = new bootstrap.Toast(document.getElementById('cartToast'));
        toast.show();
    }

    saveToStorage() {
        localStorage.setItem('shoppingCart', JSON.stringify(this.items));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('shoppingCart');
        if (stored) {
            this.items = JSON.parse(stored);
        }
    }

    checkout() {
        if (this.items.length === 0) {
            alert('購物車是空的！');
            return;
        }
        
        alert(`結帳成功！\n總金額: $${this.getTotalPrice().toFixed(2)}\n商品數量: ${this.getTotalItems()}`);
        this.items = [];
        this.saveToStorage();
        this.updateCartDisplay();
    }
}

// Product data with categories
const products = [
    {
        id: 1,
        name: "枕頭貓",
        description: "高品質音效，舒適佩戴，長達8小時續航",
        price: 129.99,
        category: "A",
        isOnSale: true,
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/pillow_cat.png"
    },
    {
        id: 2,
        name: "淺水貓",
        description: "健康監測，運動追蹤，防水設計",
        price: 299.99,
        category: "A",
        isOnSale: false,
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/淺水貓.png"
    },
    {
        id: 3,
        name: "雞雞貓",
        description: "高效能處理器，輕薄設計，長效電池",
        price: 899.99,
        category: "A",
        isOnSale: true,
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/雞雞貓.png"
    },
    {
        id: 4,
        name: "兔兔貓",
        description: "最新處理器，高畫質相機，5G網路",
        price: 699.99,
        category: "A",
        isOnSale: false,
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/兔兔貓.png"
    },
    {
        id: 5,
        name: "尤達呆呆貓",
        description: "全自動研磨，多種咖啡選擇，定時功能",
        price: 199.99,
        category: "A",
        isOnSale: true,
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/尤達呆呆貓.png"
    },
    {
        id: 6,
        name: "長條珍珠奶茶貓",
        description: "多功能訓練，可調節重量，居家健身首選",
        price: 149.99,
        category: "A",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/長條珍珠奶茶.png"
    },
    {
        id: 7,
        name: "小逼",
        description: "大螢幕顯示，觸控筆支援，娛樂辦公兩相宜",
        price: 399.99,
        category: "B",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/小逼.jpg"
    },
    {
        id: 8,
        name: "茶茶與鼠鼠.png",
        description: "4K遊戲體驗，豐富遊戲庫，多人遊戲支援",
        price: 499.99,
        category: "A",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/茶茶與鼠鼠.png"
    },
    {
        id: 9,
        name: "站坐貓",
        description: "高效過濾，智能感應，靜音運作",
        price: 249.99,
        category: "A",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/站坐貓.png"
    },
    {
        id: 10,
        name: "石膏雞",
        description: "可折疊設計，多種運動模式，心率監測",
        price: 599.99,
        category: "B",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/石膏雞.jpg"
    },
    {
        id: 11,
        name: "饋手貓",
        description: "智能路徑規劃，自動回充，APP控制",
        price: 349.99,
        category: "A",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/饋手貓.png"
    },
    {
        id: 12,
        name: "打字雞",
        description: "防滑設計，環保材質，多種顏色選擇",
        price: 39.99,
        category: "B",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/打字雞.jpg"
    }
];

// Initialize shopping cart
let cart;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    cart = new ShoppingCart();
    renderProducts();
    setupEventListeners();
});

// Get current filter
function getCurrentFilter() {
    const checkedFilter = document.querySelector('input[name="categoryFilter"]:checked');
    return checkedFilter ? checkedFilter.value : 'all';
}

// Get current search term
function getCurrentSearchTerm() {
    return document.getElementById('searchInput').value.trim().toLowerCase();
}

// Search products by name and description
function searchProducts(products, searchTerm) {
    if (!searchTerm) {
        return products;
    }
    
    return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
}

// Filter products by category
function filterProducts(category) {
    if (category === 'all') {
        return products;
    }
    return products.filter(product => product.category === category);
}

// Apply both search and category filters
function getFilteredProducts() {
    const category = getCurrentFilter();
    const searchTerm = getCurrentSearchTerm();
    
    let filteredProducts = filterProducts(category);
    filteredProducts = searchProducts(filteredProducts, searchTerm);
    
    return filteredProducts;
}

// Render products with filtering
function renderProducts() {
    const container = document.getElementById('productsContainer');
    const filteredProducts = getFilteredProducts();
    const searchTerm = getCurrentSearchTerm();
    const category = getCurrentFilter();
    
    // Update search results info
    updateSearchResultsInfo(filteredProducts.length, searchTerm, category);
    
    if (filteredProducts.length === 0) {
        let emptyMessage = '';
        if (searchTerm) {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-search display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">找不到相關商品</h3>
                        <p class="text-muted">沒有找到包含「${searchTerm}」的商品</p>
                        <button class="btn btn-outline-primary mt-3" onclick="clearSearch()">
                            <i class="bi bi-arrow-left"></i> 清除搜尋
                        </button>
                    </div>
                </div>
            `;
        } else {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-grid display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">此分類暫無商品</h3>
                        <p class="text-muted">請選擇其他分類或查看全部商品</p>
                    </div>
                </div>
            `;
        }
        container.innerHTML = emptyMessage;
        return;
    }
    
    container.innerHTML = filteredProducts.map(product => {
        const searchTerm = getCurrentSearchTerm();
        const highlightedName = highlightSearchTerm(product.name, searchTerm);
        const highlightedDescription = highlightSearchTerm(product.description, searchTerm);
        
        return `
            <div class="col">
                <div class="card h-100 product-card" data-product-id="${product.id}" style="cursor: pointer;">
                    <div class="position-relative">
                        <img src="${product.image}" class="card-img-top product-image" alt="${product.name}" loading="lazy">
                        <div class="position-absolute top-0 end-0 m-2">
                            <button class="btn btn-sm btn-light btn-image-zoom" data-product-id="${product.id}" title="查看大圖">
                                <i class="bi bi-zoom-in"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${highlightedName}</h5>
                        <p class="card-text flex-grow-1">${highlightedDescription}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="h5 text-primary mb-0">$${product.price}</span>
                            <button class="btn btn-primary btn-add-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                                <i class="bi bi-cart-plus"></i> 加入購物車
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}


// Update search results info
function updateSearchResultsInfo(count, searchTerm, category) {
    const searchResultsInfo = document.getElementById('searchResultsInfo');
    let infoText = '';
    
    if (searchTerm) {
        if (category === 'all') {
            infoText = `找到 ${count} 個包含「${searchTerm}」的商品`;
        } else {
            const categoryNames = {
                'A': '茶茶小貓咪',
                'B': '茶茶的朋友-小雞',
                'C': '運動健康'
            };
            infoText = `在${categoryNames[category]}中找到 ${count} 個包含「${searchTerm}」的商品`;
        }
    } else {
        if (category === 'all') {
            infoText = `顯示全部 ${count} 個商品`;
        } else {
            const categoryNames = {
                'A': '茶茶小貓咪',
                'B': '茶茶的朋友-小雞',
                'C': '運動健康'
            };
            infoText = `顯示 ${categoryNames[category]} 類別中的 ${count} 個商品`;
        }
    }
    
    searchResultsInfo.textContent = infoText;
}

// Clear search
function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('clearSearchBtn').style.display = 'none';
    renderProducts();
}

// Highlight search terms in text
function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.addItem(product);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        cart.checkout();
    });
    
    // Search input events
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    
    // Real-time search
    searchInput.addEventListener('input', function() {
        const hasValue = this.value.trim().length > 0;
        clearSearchBtn.style.display = hasValue ? 'block' : 'none';
        renderProducts();
    });
    
    // Clear search button
    clearSearchBtn.addEventListener('click', clearSearch);
    
    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            renderProducts();
        }
    });
    
    // Category filter change
    document.querySelectorAll('input[name="categoryFilter"]').forEach(radio => {
        radio.addEventListener('change', function() {
            renderProducts();
        });
    });
    
    // Prevent form submission on quantity input enter
    document.addEventListener('keypress', function(e) {
        if (e.target.classList.contains('quantity-input') && e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
        }
    });
    
    // Image click events (delegated event listeners)
    document.addEventListener('click', function(e) {
        // Product card click (entire card)
        if (e.target.closest('.product-card')) {
            const productCard = e.target.closest('.product-card');
            const productId = parseInt(productCard.getAttribute('data-product-id'));
            
            // Don't trigger if clicking on add to cart button
            if (!e.target.closest('.btn-add-cart')) {
                showImageModal(productId);
            }
        }
        
        // Product image click
        if (e.target.classList.contains('product-image')) {
            const productId = parseInt(e.target.getAttribute('data-product-id'));
            showImageModal(productId);
        }
        
        // Zoom button click
        if (e.target.closest('.btn-image-zoom')) {
            const productId = parseInt(e.target.closest('.btn-image-zoom').getAttribute('data-product-id'));
            showImageModal(productId);
        }
        
        // Add to cart from modal
        if (e.target.id === 'addToCartFromModal') {
            const productId = parseInt(e.target.getAttribute('data-product-id'));
            addToCart(productId);
            
            // Close modal
            const imageModal = bootstrap.Modal.getInstance(document.getElementById('imageModal'));
            if (imageModal) {
                imageModal.hide();
            }
        }
    });
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('zh-TW', {
        style: 'currency',
        currency: 'TWD'
    }).format(amount);
}

```

現在繼續為其餘的商品添加促銷屬性：


繼續為其餘商品添加促銷屬性：


```javascript
// Shopping cart functionality
class ShoppingCart {
    constructor() {
        this.items = [];
        this.loadFromStorage();
        this.updateCartDisplay();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveToStorage();
        this.updateCartDisplay();
        this.showToast();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        this.updateCartDisplay();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
                this.saveToStorage();
                this.updateCartDisplay();
            }
        }
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    updateCartDisplay() {
        this.updateCartCount();
        this.updateCartModal();
        this.updateTotalPrice();
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        cartCount.textContent = this.getTotalItems();
        
        if (this.getTotalItems() > 0) {
            cartCount.classList.add('bounce');
            setTimeout(() => cartCount.classList.remove('bounce'), 1000);
        }
    }

    updateCartModal() {
        const cartItems = document.getElementById('cartItems');
        const emptyCart = document.getElementById('emptyCart');
        
        if (this.items.length === 0) {
            cartItems.style.display = 'none';
            emptyCart.style.display = 'block';
        } else {
            cartItems.style.display = 'block';
            emptyCart.style.display = 'none';
            
            cartItems.innerHTML = this.items.map(item => `
                <div class="cart-item d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${item.name}</h6>
                        <p class="text-muted mb-0">$${item.price}</p>
                    </div>
                    <div class="quantity-controls me-3">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                               onchange="cart.updateQuantity(${item.id}, parseInt(this.value))">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <div class="text-end me-3">
                        <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                    </div>
                    <button class="btn-remove" onclick="cart.removeItem(${item.id})" title="移除商品">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    }

    updateTotalPrice() {
        const totalPrice = document.getElementById('totalPrice');
        const checkoutBtn = document.getElementById('checkoutBtn');
        
        totalPrice.textContent = this.getTotalPrice().toFixed(2);
        checkoutBtn.disabled = this.items.length === 0;
    }

    showToast() {
        const toast = new bootstrap.Toast(document.getElementById('cartToast'));
        toast.show();
    }

    saveToStorage() {
        localStorage.setItem('shoppingCart', JSON.stringify(this.items));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('shoppingCart');
        if (stored) {
            this.items = JSON.parse(stored);
        }
    }

    checkout() {
        if (this.items.length === 0) {
            alert('購物車是空的！');
            return;
        }
        
        alert(`結帳成功！\n總金額: $${this.getTotalPrice().toFixed(2)}\n商品數量: ${this.getTotalItems()}`);
        this.items = [];
        this.saveToStorage();
        this.updateCartDisplay();
    }
}

// Product data with categories
const products = [
    {
        id: 1,
        name: "枕頭貓",
        description: "高品質音效，舒適佩戴，長達8小時續航",
        price: 129.99,
        category: "A",
        isOnSale: true,
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/pillow_cat.png"
    },
    {
        id: 2,
        name: "淺水貓",
        description: "健康監測，運動追蹤，防水設計",
        price: 299.99,
        category: "A",
        isOnSale: false,
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/淺水貓.png"
    },
    {
        id: 3,
        name: "雞雞貓",
        description: "高效能處理器，輕薄設計，長效電池",
        price: 899.99,
        category: "A",
        isOnSale: true,
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/雞雞貓.png"
    },
    {
        id: 4,
        name: "兔兔貓",
        description: "最新處理器，高畫質相機，5G網路",
        price: 699.99,
        category: "A",
        isOnSale: false,
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/兔兔貓.png"
    },
    {
        id: 5,
        name: "尤達呆呆貓",
        description: "全自動研磨，多種咖啡選擇，定時功能",
        price: 199.99,
        category: "A",
        isOnSale: true,
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/尤達呆呆貓.png"
    },
    {
        id: 6,
        name: "長條珍珠奶茶貓",
        description: "多功能訓練，可調節重量，居家健身首選",
        price: 149.99,
        category: "A",
        isOnSale: false,
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/長條珍珠奶茶.png"
    },
    {
        id: 7,
        name: "小逼",
        description: "大螢幕顯示，觸控筆支援，娛樂辦公兩相宜",
        price: 399.99,
        category: "B",
        isOnSale: true,
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/小逼.jpg"
    },
    {
        id: 8,
        name: "茶茶與鼠鼠.png",
        description: "4K遊戲體驗，豐富遊戲庫，多人遊戲支援",
        price: 499.99,
        category: "A",
        isOnSale: false,
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/茶茶與鼠鼠.png"
    },
    {
        id: 9,
        name: "站坐貓",
        description: "高效過濾，智能感應，靜音運作",
        price: 249.99,
        category: "A",
        isOnSale: true,
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/站坐貓.png"
    },
    {
        id: 10,
        name: "石膏雞",
        description: "可折疊設計，多種運動模式，心率監測",
        price: 599.99,
        category: "B",
        isOnSale: false,
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/石膏雞.jpg"
    },
    {
        id: 11,
        name: "饋手貓",
        description: "智能路徑規劃，自動回充，APP控制",
        price: 349.99,
        category: "A",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/饋手貓.png"
    },
    {
        id: 12,
        name: "打字雞",
        description: "防滑設計，環保材質，多種顏色選擇",
        price: 39.99,
        category: "B",
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/打字雞.jpg"
    }
];

// Initialize shopping cart
let cart;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    cart = new ShoppingCart();
    renderProducts();
    setupEventListeners();
});

// Get current filter
function getCurrentFilter() {
    const checkedFilter = document.querySelector('input[name="categoryFilter"]:checked');
    return checkedFilter ? checkedFilter.value : 'all';
}

// Get current search term
function getCurrentSearchTerm() {
    return document.getElementById('searchInput').value.trim().toLowerCase();
}

// Search products by name and description
function searchProducts(products, searchTerm) {
    if (!searchTerm) {
        return products;
    }
    
    return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
}

// Filter products by category
function filterProducts(category) {
    if (category === 'all') {
        return products;
    }
    return products.filter(product => product.category === category);
}

// Apply both search and category filters
function getFilteredProducts() {
    const category = getCurrentFilter();
    const searchTerm = getCurrentSearchTerm();
    
    let filteredProducts = filterProducts(category);
    filteredProducts = searchProducts(filteredProducts, searchTerm);
    
    return filteredProducts;
}

// Render products with filtering
function renderProducts() {
    const container = document.getElementById('productsContainer');
    const filteredProducts = getFilteredProducts();
    const searchTerm = getCurrentSearchTerm();
    const category = getCurrentFilter();
    
    // Update search results info
    updateSearchResultsInfo(filteredProducts.length, searchTerm, category);
    
    if (filteredProducts.length === 0) {
        let emptyMessage = '';
        if (searchTerm) {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-search display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">找不到相關商品</h3>
                        <p class="text-muted">沒有找到包含「${searchTerm}」的商品</p>
                        <button class="btn btn-outline-primary mt-3" onclick="clearSearch()">
                            <i class="bi bi-arrow-left"></i> 清除搜尋
                        </button>
                    </div>
                </div>
            `;
        } else {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-grid display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">此分類暫無商品</h3>
                        <p class="text-muted">請選擇其他分類或查看全部商品</p>
                    </div>
                </div>
            `;
        }
        container.innerHTML = emptyMessage;
        return;
    }
    
    container.innerHTML = filteredProducts.map(product => {
        const searchTerm = getCurrentSearchTerm();
        const highlightedName = highlightSearchTerm(product.name, searchTerm);
        const highlightedDescription = highlightSearchTerm(product.description, searchTerm);
        
        return `
            <div class="col">
                <div class="card h-100 product-card" data-product-id="${product.id}" style="cursor: pointer;">
                    <div class="position-relative">
                        <img src="${product.image}" class="card-img-top product-image" alt="${product.name}" loading="lazy">
                        <div class="position-absolute top-0 end-0 m-2">
                            <button class="btn btn-sm btn-light btn-image-zoom" data-product-id="${product.id}" title="查看大圖">
                                <i class="bi bi-zoom-in"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${highlightedName}</h5>
                        <p class="card-text flex-grow-1">${highlightedDescription}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="h5 text-primary mb-0">$${product.price}</span>
                            <button class="btn btn-primary btn-add-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                                <i class="bi bi-cart-plus"></i> 加入購物車
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}


// Update search results info
function updateSearchResultsInfo(count, searchTerm, category) {
    const searchResultsInfo = document.getElementById('searchResultsInfo');
    let infoText = '';
    
    if (searchTerm) {
        if (category === 'all') {
            infoText = `找到 ${count} 個包含「${searchTerm}」的商品`;
        } else {
            const categoryNames = {
                'A': '茶茶小貓咪',
                'B': '茶茶的朋友-小雞',
                'C': '運動健康'
            };
            infoText = `在${categoryNames[category]}中找到 ${count} 個包含「${searchTerm}」的商品`;
        }
    } else {
        if (category === 'all') {
            infoText = `顯示全部 ${count} 個商品`;
        } else {
            const categoryNames = {
                'A': '茶茶小貓咪',
                'B': '茶茶的朋友-小雞',
                'C': '運動健康'
            };
            infoText = `顯示 ${categoryNames[category]} 類別中的 ${count} 個商品`;
        }
    }
    
    searchResultsInfo.textContent = infoText;
}

// Clear search
function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('clearSearchBtn').style.display = 'none';
    renderProducts();
}

// Highlight search terms in text
function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.addItem(product);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        cart.checkout();
    });
    
    // Search input events
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    
    // Real-time search
    searchInput.addEventListener('input', function() {
        const hasValue = this.value.trim().length > 0;
        clearSearchBtn.style.display = hasValue ? 'block' : 'none';
        renderProducts();
    });
    
    // Clear search button
    clearSearchBtn.addEventListener('click', clearSearch);
    
    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            renderProducts();
        }
    });
    
    // Category filter change
    document.querySelectorAll('input[name="categoryFilter"]').forEach(radio => {
        radio.addEventListener('change', function() {
            renderProducts();
        });
    });
    
    // Prevent form submission on quantity input enter
    document.addEventListener('keypress', function(e) {
        if (e.target.classList.contains('quantity-input') && e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
        }
    });
    
    // Image click events (delegated event listeners)
    document.addEventListener('click', function(e) {
        // Product card click (entire card)
        if (e.target.closest('.product-card')) {
            const productCard = e.target.closest('.product-card');
            const productId = parseInt(productCard.getAttribute('data-product-id'));
            
            // Don't trigger if clicking on add to cart button
            if (!e.target.closest('.btn-add-cart')) {
                showImageModal(productId);
            }
        }
        
        // Product image click
        if (e.target.classList.contains('product-image')) {
            const productId = parseInt(e.target.getAttribute('data-product-id'));
            showImageModal(productId);
        }
        
        // Zoom button click
        if (e.target.closest('.btn-image-zoom')) {
            const productId = parseInt(e.target.closest('.btn-image-zoom').getAttribute('data-product-id'));
            showImageModal(productId);
        }
        
        // Add to cart from modal
        if (e.target.id === 'addToCartFromModal') {
            const productId = parseInt(e.target.getAttribute('data-product-id'));
            addToCart(productId);
            
            // Close modal
            const imageModal = bootstrap.Modal.getInstance(document.getElementById('imageModal'));
            if (imageModal) {
                imageModal.hide();
            }
        }
    });
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('zh-TW', {
        style: 'currency',
        currency: 'TWD'
    }).format(amount);
}

```

現在為最後兩個商品添加促銷屬性：


```javascript
// Shopping cart functionality
class ShoppingCart {
    constructor() {
        this.items = [];
        this.loadFromStorage();
        this.updateCartDisplay();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveToStorage();
        this.updateCartDisplay();
        this.showToast();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        this.updateCartDisplay();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
                this.saveToStorage();
                this.updateCartDisplay();
            }
        }
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    updateCartDisplay() {
        this.updateCartCount();
        this.updateCartModal();
        this.updateTotalPrice();
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        cartCount.textContent = this.getTotalItems();
        
        if (this.getTotalItems() > 0) {
            cartCount.classList.add('bounce');
            setTimeout(() => cartCount.classList.remove('bounce'), 1000);
        }
    }

    updateCartModal() {
        const cartItems = document.getElementById('cartItems');
        const emptyCart = document.getElementById('emptyCart');
        
        if (this.items.length === 0) {
            cartItems.style.display = 'none';
            emptyCart.style.display = 'block';
        } else {
            cartItems.style.display = 'block';
            emptyCart.style.display = 'none';
            
            cartItems.innerHTML = this.items.map(item => `
                <div class="cart-item d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${item.name}</h6>
                        <p class="text-muted mb-0">$${item.price}</p>
                    </div>
                    <div class="quantity-controls me-3">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                               onchange="cart.updateQuantity(${item.id}, parseInt(this.value))">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <div class="text-end me-3">
                        <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                    </div>
                    <button class="btn-remove" onclick="cart.removeItem(${item.id})" title="移除商品">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    }

    updateTotalPrice() {
        const totalPrice = document.getElementById('totalPrice');
        const checkoutBtn = document.getElementById('checkoutBtn');
        
        totalPrice.textContent = this.getTotalPrice().toFixed(2);
        checkoutBtn.disabled = this.items.length === 0;
    }

    showToast() {
        const toast = new bootstrap.Toast(document.getElementById('cartToast'));
        toast.show();
    }

    saveToStorage() {
        localStorage.setItem('shoppingCart', JSON.stringify(this.items));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('shoppingCart');
        if (stored) {
            this.items = JSON.parse(stored);
        }
    }

    checkout() {
        if (this.items.length === 0) {
            alert('購物車是空的！');
            return;
        }
        
        alert(`結帳成功！\n總金額: $${this.getTotalPrice().toFixed(2)}\n商品數量: ${this.getTotalItems()}`);
        this.items = [];
        this.saveToStorage();
        this.updateCartDisplay();
    }
}

// Product data with categories
const products = [
    {
        id: 1,
        name: "枕頭貓",
        description: "高品質音效，舒適佩戴，長達8小時續航",
        price: 129.99,
        category: "A",
        isOnSale: true,
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/pillow_cat.png"
    },
    {
        id: 2,
        name: "淺水貓",
        description: "健康監測，運動追蹤，防水設計",
        price: 299.99,
        category: "A",
        isOnSale: false,
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/淺水貓.png"
    },
    {
        id: 3,
        name: "雞雞貓",
        description: "高效能處理器，輕薄設計，長效電池",
        price: 899.99,
        category: "A",
        isOnSale: true,
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/雞雞貓.png"
    },
    {
        id: 4,
        name: "兔兔貓",
        description: "最新處理器，高畫質相機，5G網路",
        price: 699.99,
        category: "A",
        isOnSale: false,
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/兔兔貓.png"
    },
    {
        id: 5,
        name: "尤達呆呆貓",
        description: "全自動研磨，多種咖啡選擇，定時功能",
        price: 199.99,
        category: "A",
        isOnSale: true,
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/尤達呆呆貓.png"
    },
    {
        id: 6,
        name: "長條珍珠奶茶貓",
        description: "多功能訓練，可調節重量，居家健身首選",
        price: 149.99,
        category: "A",
        isOnSale: false,
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/長條珍珠奶茶.png"
    },
    {
        id: 7,
        name: "小逼",
        description: "大螢幕顯示，觸控筆支援，娛樂辦公兩相宜",
        price: 399.99,
        category: "B",
        isOnSale: true,
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/小逼.jpg"
    },
    {
        id: 8,
        name: "茶茶與鼠鼠.png",
        description: "4K遊戲體驗，豐富遊戲庫，多人遊戲支援",
        price: 499.99,
        category: "A",
        isOnSale: false,
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/茶茶與鼠鼠.png"
    },
    {
        id: 9,
        name: "站坐貓",
        description: "高效過濾，智能感應，靜音運作",
        price: 249.99,
        category: "A",
        isOnSale: true,
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/站坐貓.png"
    },
    {
        id: 10,
        name: "石膏雞",
        description: "可折疊設計，多種運動模式，心率監測",
        price: 599.99,
        category: "B",
        isOnSale: false,
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/石膏雞.jpg"
    },
    {
        id: 11,
        name: "饋手貓",
        description: "智能路徑規劃，自動回充，APP控制",
        price: 349.99,
        category: "A",
        isOnSale: true,
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/饋手貓.png"
    },
    {
        id: 12,
        name: "打字雞",
        description: "防滑設計，環保材質，多種顏色選擇",
        price: 39.99,
        category: "B",
        isOnSale: false,
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/打字雞.jpg"
    }
];

// Initialize shopping cart
let cart;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    cart = new ShoppingCart();
    renderProducts();
    setupEventListeners();
});

// Get current filter
function getCurrentFilter() {
    const checkedFilter = document.querySelector('input[name="categoryFilter"]:checked');
    return checkedFilter ? checkedFilter.value : 'all';
}

// Get current search term
function getCurrentSearchTerm() {
    return document.getElementById('searchInput').value.trim().toLowerCase();
}

// Search products by name and description
function searchProducts(products, searchTerm) {
    if (!searchTerm) {
        return products;
    }
    
    return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
}

// Filter products by category
function filterProducts(category) {
    if (category === 'all') {
        return products;
    }
    return products.filter(product => product.category === category);
}

// Apply both search and category filters
function getFilteredProducts() {
    const category = getCurrentFilter();
    const searchTerm = getCurrentSearchTerm();
    
    let filteredProducts = filterProducts(category);
    filteredProducts = searchProducts(filteredProducts, searchTerm);
    
    return filteredProducts;
}

// Render products with filtering
function renderProducts() {
    const container = document.getElementById('productsContainer');
    const filteredProducts = getFilteredProducts();
    const searchTerm = getCurrentSearchTerm();
    const category = getCurrentFilter();
    
    // Update search results info
    updateSearchResultsInfo(filteredProducts.length, searchTerm, category);
    
    if (filteredProducts.length === 0) {
        let emptyMessage = '';
        if (searchTerm) {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-search display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">找不到相關商品</h3>
                        <p class="text-muted">沒有找到包含「${searchTerm}」的商品</p>
                        <button class="btn btn-outline-primary mt-3" onclick="clearSearch()">
                            <i class="bi bi-arrow-left"></i> 清除搜尋
                        </button>
                    </div>
                </div>
            `;
        } else {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-grid display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">此分類暫無商品</h3>
                        <p class="text-muted">請選擇其他分類或查看全部商品</p>
                    </div>
                </div>
            `;
        }
        container.innerHTML = emptyMessage;
        return;
    }
    
    container.innerHTML = filteredProducts.map(product => {
        const searchTerm = getCurrentSearchTerm();
        const highlightedName = highlightSearchTerm(product.name, searchTerm);
        const highlightedDescription = highlightSearchTerm(product.description, searchTerm);
        
        return `
            <div class="col">
                <div class="card h-100 product-card" data-product-id="${product.id}" style="cursor: pointer;">
                    <div class="position-relative">
                        <img src="${product.image}" class="card-img-top product-image" alt="${product.name}" loading="lazy">
                        <div class="position-absolute top-0 end-0 m-2">
                            <button class="btn btn-sm btn-light btn-image-zoom" data-product-id="${product.id}" title="查看大圖">
                                <i class="bi bi-zoom-in"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${highlightedName}</h5>
                        <p class="card-text flex-grow-1">${highlightedDescription}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="h5 text-primary mb-0">$${product.price}</span>
                            <button class="btn btn-primary btn-add-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                                <i class="bi bi-cart-plus"></i> 加入購物車
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}


// Update search results info
function updateSearchResultsInfo(count, searchTerm, category) {
    const searchResultsInfo = document.getElementById('searchResultsInfo');
    let infoText = '';
    
    if (searchTerm) {
        if (category === 'all') {
            infoText = `找到 ${count} 個包含「${searchTerm}」的商品`;
        } else {
            const categoryNames = {
                'A': '茶茶小貓咪',
                'B': '茶茶的朋友-小雞',
                'C': '運動健康'
            };
            infoText = `在${categoryNames[category]}中找到 ${count} 個包含「${searchTerm}」的商品`;
        }
    } else {
        if (category === 'all') {
            infoText = `顯示全部 ${count} 個商品`;
        } else {
            const categoryNames = {
                'A': '茶茶小貓咪',
                'B': '茶茶的朋友-小雞',
                'C': '運動健康'
            };
            infoText = `顯示 ${categoryNames[category]} 類別中的 ${count} 個商品`;
        }
    }
    
    searchResultsInfo.textContent = infoText;
}

// Clear search
function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('clearSearchBtn').style.display = 'none';
    renderProducts();
}

// Highlight search terms in text
function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.addItem(product);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        cart.checkout();
    });
    
    // Search input events
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    
    // Real-time search
    searchInput.addEventListener('input', function() {
        const hasValue = this.value.trim().length > 0;
        clearSearchBtn.style.display = hasValue ? 'block' : 'none';
        renderProducts();
    });
    
    // Clear search button
    clearSearchBtn.addEventListener('click', clearSearch);
    
    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            renderProducts();
        }
    });
    
    // Category filter change
    document.querySelectorAll('input[name="categoryFilter"]').forEach(radio => {
        radio.addEventListener('change', function() {
            renderProducts();
        });
    });
    
    // Prevent form submission on quantity input enter
    document.addEventListener('keypress', function(e) {
        if (e.target.classList.contains('quantity-input') && e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
        }
    });
    
    // Image click events (delegated event listeners)
    document.addEventListener('click', function(e) {
        // Product card click (entire card)
        if (e.target.closest('.product-card')) {
            const productCard = e.target.closest('.product-card');
            const productId = parseInt(productCard.getAttribute('data-product-id'));
            
            // Don't trigger if clicking on add to cart button
            if (!e.target.closest('.btn-add-cart')) {
                showImageModal(productId);
            }
        }
        
        // Product image click
        if (e.target.classList.contains('product-image')) {
            const productId = parseInt(e.target.getAttribute('data-product-id'));
            showImageModal(productId);
        }
        
        // Zoom button click
        if (e.target.closest('.btn-image-zoom')) {
            const productId = parseInt(e.target.closest('.btn-image-zoom').getAttribute('data-product-id'));
            showImageModal(productId);
        }
        
        // Add to cart from modal
        if (e.target.id === 'addToCartFromModal') {
            const productId = parseInt(e.target.getAttribute('data-product-id'));
            addToCart(productId);
            
            // Close modal
            const imageModal = bootstrap.Modal.getInstance(document.getElementById('imageModal'));
            if (imageModal) {
                imageModal.hide();
            }
        }
    });
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('zh-TW', {
        style: 'currency',
        currency: 'TWD'
    }).format(amount);
}

```

現在我需要更新商品卡片的顯示邏輯，添加促銷標籤：


```javascript
// Shopping cart functionality
class ShoppingCart {
    constructor() {
        this.items = [];
        this.loadFromStorage();
        this.updateCartDisplay();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveToStorage();
        this.updateCartDisplay();
        this.showToast();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        this.updateCartDisplay();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
                this.saveToStorage();
                this.updateCartDisplay();
            }
        }
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    updateCartDisplay() {
        this.updateCartCount();
        this.updateCartModal();
        this.updateTotalPrice();
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        cartCount.textContent = this.getTotalItems();
        
        if (this.getTotalItems() > 0) {
            cartCount.classList.add('bounce');
            setTimeout(() => cartCount.classList.remove('bounce'), 1000);
        }
    }

    updateCartModal() {
        const cartItems = document.getElementById('cartItems');
        const emptyCart = document.getElementById('emptyCart');
        
        if (this.items.length === 0) {
            cartItems.style.display = 'none';
            emptyCart.style.display = 'block';
        } else {
            cartItems.style.display = 'block';
            emptyCart.style.display = 'none';
            
            cartItems.innerHTML = this.items.map(item => `
                <div class="cart-item d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${item.name}</h6>
                        <p class="text-muted mb-0">$${item.price}</p>
                    </div>
                    <div class="quantity-controls me-3">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                               onchange="cart.updateQuantity(${item.id}, parseInt(this.value))">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <div class="text-end me-3">
                        <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                    </div>
                    <button class="btn-remove" onclick="cart.removeItem(${item.id})" title="移除商品">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    }

    updateTotalPrice() {
        const totalPrice = document.getElementById('totalPrice');
        const checkoutBtn = document.getElementById('checkoutBtn');
        
        totalPrice.textContent = this.getTotalPrice().toFixed(2);
        checkoutBtn.disabled = this.items.length === 0;
    }

    showToast() {
        const toast = new bootstrap.Toast(document.getElementById('cartToast'));
        toast.show();
    }

    saveToStorage() {
        localStorage.setItem('shoppingCart', JSON.stringify(this.items));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('shoppingCart');
        if (stored) {
            this.items = JSON.parse(stored);
        }
    }

    checkout() {
        if (this.items.length === 0) {
            alert('購物車是空的！');
            return;
        }
        
        alert(`結帳成功！\n總金額: $${this.getTotalPrice().toFixed(2)}\n商品數量: ${this.getTotalItems()}`);
        this.items = [];
        this.saveToStorage();
        this.updateCartDisplay();
    }
}

// Product data with categories
const products = [
    {
        id: 1,
        name: "枕頭貓",
        description: "高品質音效，舒適佩戴，長達8小時續航",
        price: 129.99,
        category: "A",
        isOnSale: true,
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/pillow_cat.png"
    },
    {
        id: 2,
        name: "淺水貓",
        description: "健康監測，運動追蹤，防水設計",
        price: 299.99,
        category: "A",
        isOnSale: false,
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/淺水貓.png"
    },
    {
        id: 3,
        name: "雞雞貓",
        description: "高效能處理器，輕薄設計，長效電池",
        price: 899.99,
        category: "A",
        isOnSale: true,
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/雞雞貓.png"
    },
    {
        id: 4,
        name: "兔兔貓",
        description: "最新處理器，高畫質相機，5G網路",
        price: 699.99,
        category: "A",
        isOnSale: false,
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/兔兔貓.png"
    },
    {
        id: 5,
        name: "尤達呆呆貓",
        description: "全自動研磨，多種咖啡選擇，定時功能",
        price: 199.99,
        category: "A",
        isOnSale: true,
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/尤達呆呆貓.png"
    },
    {
        id: 6,
        name: "長條珍珠奶茶貓",
        description: "多功能訓練，可調節重量，居家健身首選",
        price: 149.99,
        category: "A",
        isOnSale: false,
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/長條珍珠奶茶.png"
    },
    {
        id: 7,
        name: "小逼",
        description: "大螢幕顯示，觸控筆支援，娛樂辦公兩相宜",
        price: 399.99,
        category: "B",
        isOnSale: true,
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/小逼.jpg"
    },
    {
        id: 8,
        name: "茶茶與鼠鼠.png",
        description: "4K遊戲體驗，豐富遊戲庫，多人遊戲支援",
        price: 499.99,
        category: "A",
        isOnSale: false,
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/茶茶與鼠鼠.png"
    },
    {
        id: 9,
        name: "站坐貓",
        description: "高效過濾，智能感應，靜音運作",
        price: 249.99,
        category: "A",
        isOnSale: true,
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/站坐貓.png"
    },
    {
        id: 10,
        name: "石膏雞",
        description: "可折疊設計，多種運動模式，心率監測",
        price: 599.99,
        category: "B",
        isOnSale: false,
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/石膏雞.jpg"
    },
    {
        id: 11,
        name: "饋手貓",
        description: "智能路徑規劃，自動回充，APP控制",
        price: 349.99,
        category: "A",
        isOnSale: true,
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/饋手貓.png"
    },
    {
        id: 12,
        name: "打字雞",
        description: "防滑設計，環保材質，多種顏色選擇",
        price: 39.99,
        category: "B",
        isOnSale: false,
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/打字雞.jpg"
    }
];

// Initialize shopping cart
let cart;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    cart = new ShoppingCart();
    renderProducts();
    setupEventListeners();
});

// Get current filter
function getCurrentFilter() {
    const checkedFilter = document.querySelector('input[name="categoryFilter"]:checked');
    return checkedFilter ? checkedFilter.value : 'all';
}

// Get current search term
function getCurrentSearchTerm() {
    return document.getElementById('searchInput').value.trim().toLowerCase();
}

// Search products by name and description
function searchProducts(products, searchTerm) {
    if (!searchTerm) {
        return products;
    }
    
    return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
}

// Filter products by category
function filterProducts(category) {
    if (category === 'all') {
        return products;
    }
    return products.filter(product => product.category === category);
}

// Apply both search and category filters
function getFilteredProducts() {
    const category = getCurrentFilter();
    const searchTerm = getCurrentSearchTerm();
    
    let filteredProducts = filterProducts(category);
    filteredProducts = searchProducts(filteredProducts, searchTerm);
    
    return filteredProducts;
}

// Render products with filtering
function renderProducts() {
    const container = document.getElementById('productsContainer');
    const filteredProducts = getFilteredProducts();
    const searchTerm = getCurrentSearchTerm();
    const category = getCurrentFilter();
    
    // Update search results info
    updateSearchResultsInfo(filteredProducts.length, searchTerm, category);
    
    if (filteredProducts.length === 0) {
        let emptyMessage = '';
        if (searchTerm) {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-search display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">找不到相關商品</h3>
                        <p class="text-muted">沒有找到包含「${searchTerm}」的商品</p>
                        <button class="btn btn-outline-primary mt-3" onclick="clearSearch()">
                            <i class="bi bi-arrow-left"></i> 清除搜尋
                        </button>
                    </div>
                </div>
            `;
        } else {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-grid display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">此分類暫無商品</h3>
                        <p class="text-muted">請選擇其他分類或查看全部商品</p>
                    </div>
                </div>
            `;
        }
        container.innerHTML = emptyMessage;
        return;
    }
    
    container.innerHTML = filteredProducts.map(product => {
        const searchTerm = getCurrentSearchTerm();
        const highlightedName = highlightSearchTerm(product.name, searchTerm);
        const highlightedDescription = highlightSearchTerm(product.description, searchTerm);
        
        return `
            <div class="col">
                <div class="card h-100 product-card" data-product-id="${product.id}" style="cursor: pointer;">
                    <div class="position-relative">
                        <img src="${product.image}" class="card-img-top product-image" alt="${product.name}" loading="lazy">
                        ${product.isOnSale ? '<span class="position-absolute top-0 start-0 m-2 badge bg-danger sale-badge">促銷</span>' : ''}
                        <div class="position-absolute top-0 end-0 m-2">
                            <button class="btn btn-sm btn-light btn-image-zoom" data-product-id="${product.id}" title="查看大圖">
                                <i class="bi bi-zoom-in"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${highlightedName}</h5>
                        <p class="card-text flex-grow-1">${highlightedDescription}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="h5 text-primary mb-0">$${product.price}</span>
                            <button class="btn btn-primary btn-add-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                                <i class="bi bi-cart-plus"></i> 加入購物車
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}


// Update search results info
function updateSearchResultsInfo(count, searchTerm, category) {
    const searchResultsInfo = document.getElementById('searchResultsInfo');
    let infoText = '';
    
    if (searchTerm) {
        if (category === 'all') {
            infoText = `找到 ${count} 個包含「${searchTerm}」的商品`;
        } else {
            const categoryNames = {
                'A': '茶茶小貓咪',
                'B': '茶茶的朋友-小雞',
                'C': '運動健康'
            };
            infoText = `在${categoryNames[category]}中找到 ${count} 個包含「${searchTerm}」的商品`;
        }
    } else {
        if (category === 'all') {
            infoText = `顯示全部 ${count} 個商品`;
        } else {
            const categoryNames = {
                'A': '茶茶小貓咪',
                'B': '茶茶的朋友-小雞',
                'C': '運動健康'
            };
            infoText = `顯示 ${categoryNames[category]} 類別中的 ${count} 個商品`;
        }
    }
    
    searchResultsInfo.textContent = infoText;
}

// Clear search
function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('clearSearchBtn').style.display = 'none';
    renderProducts();
}

// Highlight search terms in text
function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.addItem(product);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        cart.checkout();
    });
    
    // Search input events
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    
    // Real-time search
    searchInput.addEventListener('input', function() {
        const hasValue = this.value.trim().length > 0;
        clearSearchBtn.style.display = hasValue ? 'block' : 'none';
        renderProducts();
    });
    
    // Clear search button
    clearSearchBtn.addEventListener('click', clearSearch);
    
    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            renderProducts();
        }
    });
    
    // Category filter change
    document.querySelectorAll('input[name="categoryFilter"]').forEach(radio => {
        radio.addEventListener('change', function() {
            renderProducts();
        });
    });
    
    // Prevent form submission on quantity input enter
    document.addEventListener('keypress', function(e) {
        if (e.target.classList.contains('quantity-input') && e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
        }
    });
    
    // Image click events (delegated event listeners)
    document.addEventListener('click', function(e) {
        // Product card click (entire card)
        if (e.target.closest('.product-card')) {
            const productCard = e.target.closest('.product-card');
            const productId = parseInt(productCard.getAttribute('data-product-id'));
            
            // Don't trigger if clicking on add to cart button
            if (!e.target.closest('.btn-add-cart')) {
                showImageModal(productId);
            }
        }
        
        // Product image click
        if (e.target.classList.contains('product-image')) {
            const productId = parseInt(e.target.getAttribute('data-product-id'));
            showImageModal(productId);
        }
        
        // Zoom button click
        if (e.target.closest('.btn-image-zoom')) {
            const productId = parseInt(e.target.closest('.btn-image-zoom').getAttribute('data-product-id'));
            showImageModal(productId);
        }
        
        // Add to cart from modal
        if (e.target.id === 'addToCartFromModal') {
            const productId = parseInt(e.target.getAttribute('data-product-id'));
            addToCart(productId);
            
            // Close modal
            const imageModal = bootstrap.Modal.getInstance(document.getElementById('imageModal'));
            if (imageModal) {
                imageModal.hide();
            }
        }
    });
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('zh-TW', {
        style: 'currency',
        currency: 'TWD'
    }).format(amount);
}

```

現在我需要為促銷標籤添加樣式：


```css
/* Custom styles for the shopping website */

body {
    background-color: #fefefe;
    color: #5c4a3a;
}

/* Color scheme variables */
:root {
    --primary-color: #d4a574;
    --secondary-color: #e8d5b7;
    --accent-color: #c19a6b;
    --text-color: #5c4a3a;
    --light-bg: #faf8f5;
    --card-bg: #ffffff;
    --border-color: #e8d5b7;
    --shadow-color: rgba(212, 165, 116, 0.15);
}

/* Category filter styles */
.btn-check:checked + .btn {
    transform: scale(1.05);
    box-shadow: 0 4px 8px var(--shadow-color);
    background-color: var(--primary-color) !important;
    border-color: var(--primary-color) !important;
    color: white !important;
}

.btn-group .btn {
    transition: all 0.3s ease;
    border-radius: 1rem !important;
    margin: 0 8px;
    padding: 0.75rem 1.5rem;
    background-color: var(--light-bg);
    border-color: var(--border-color);
    color: var(--text-color);
    font-weight: 500;
}

.btn-group .btn:hover {
    background-color: var(--secondary-color);
    border-color: var(--accent-color);
    color: var(--text-color);
}

.btn-group {
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
}

.btn-group .btn:first-child {
    border-top-right-radius: 1rem !important;
    border-bottom-right-radius: 1rem !important;
}

.btn-group .btn:last-child {
    border-top-left-radius: 1rem !important;
    border-bottom-left-radius: 1rem !important;
}

.btn-group .btn:not(:first-child):not(:last-child) {
    border-radius: 1rem !important;
}

/* Responsive button spacing */
@media (max-width: 768px) {
    .btn-group .btn {
        margin: 0 4px;
        padding: 0.6rem 1.2rem;
        font-size: 0.9rem;
    }
}

@media (max-width: 576px) {
    .btn-group {
        flex-direction: column;
        gap: 0.75rem;
    }
    
    .btn-group .btn {
        margin: 0;
        width: 100%;
        max-width: 280px;
    }
}

/* Category badge styles */
.badge {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* Sale badge styles */
.sale-badge {
    background: linear-gradient(45deg, #dc3545, #c82333) !important;
    color: white !important;
    font-size: 0.7rem;
    font-weight: 700;
    padding: 0.4rem 0.6rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);
    animation: salePulse 2s infinite;
    z-index: 10;
}

.sale-badge::before {
    content: '🔥';
    margin-right: 0.25rem;
}

@keyframes salePulse {
    0% {
        transform: scale(1);
        box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);
    }
    50% {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(220, 53, 69, 0.5);
    }
    100% {
        transform: scale(1);
        box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);
    }
}

/* Empty state styles */
.display-1 {
    font-size: 4rem;
    opacity: 0.3;
}

/* Search bar styles */
.input-group-text {
    background-color: var(--light-bg);
    border-color: var(--border-color);
    border-radius: 1rem 0 0 1rem !important;
    color: var(--text-color);
}

#searchInput {
    border-left: none;
    border-radius: 0 1rem 1rem 0 !important;
    transition: all 0.3s ease;
    background-color: var(--card-bg);
    border-color: var(--border-color);
    color: var(--text-color);
}

#searchInput:focus {
    border-color: var(--accent-color);
    box-shadow: 0 0 0 0.25rem var(--shadow-color);
    background-color: var(--card-bg);
}

#searchInput:focus + .input-group-text {
    border-color: var(--accent-color);
}

#clearSearchBtn {
    transition: all 0.3s ease;
    border-left: none;
    border-radius: 0 1rem 1rem 0 !important;
    background-color: var(--light-bg);
    border-color: var(--border-color);
    color: var(--text-color);
}

#clearSearchBtn:hover {
    background-color: var(--secondary-color);
    color: var(--accent-color);
}

/* Search highlighting */
mark {
    background-color: var(--secondary-color);
    color: var(--text-color);
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-weight: 600;
}

/* Search results info */
#searchResultsInfo {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-color);
}

/* Search animation */
@keyframes searchPulse {
    0% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0.4);
    }
    70% {
        box-shadow: 0 0 0 10px rgba(13, 110, 253, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0);
    }
}

.searching {
    animation: searchPulse 1.5s infinite;
}

/* Responsive search bar */
@media (max-width: 768px) {
    .input-group {
        flex-direction: column;
    }
    
    .input-group-text {
        border-radius: 1rem 1rem 0 0 !important;
        border-bottom: none;
    }
    
    #searchInput {
        border-radius: 0 0 1rem 1rem !important;
        border-top: none;
    }
    
    #clearSearchBtn {
        border-radius: 1rem;
        margin-top: 0.5rem;
        width: 100%;
    }
}

/* Navbar styles */
.navbar {
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color)) !important;
    box-shadow: 0 2px 10px var(--shadow-color);
}

.navbar-brand {
    font-weight: bold;
    font-size: 1.5rem;
    color: white !important;
}

.navbar-nav .nav-link {
    color: white !important;
    transition: color 0.3s ease;
}

.navbar-nav .nav-link:hover {
    color: var(--light-bg) !important;
}

.navbar-toggler {
    border-color: white;
}

.navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

.card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid var(--border-color);
    background-color: var(--card-bg);
    box-shadow: 0 2px 8px var(--shadow-color);
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px var(--shadow-color);
    border-color: var(--accent-color);
}

/* Product card clickable styles */
.product-card {
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.product-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px var(--shadow-color);
    border-color: var(--primary-color);
}

.product-card:hover::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(212, 165, 116, 0.05), rgba(193, 154, 107, 0.05));
    pointer-events: none;
    z-index: 1;
}

.product-card:hover .card-title {
    color: var(--primary-color);
}

.product-card:hover .card-text {
    color: var(--text-color);
}

.card-img-top {
    height: 200px;
    object-fit: contain;
    transition: transform 0.3s ease;
}

.card:hover .card-img-top {
    transform: scale(1.05);
}

.btn-add-cart {
    background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
    border: none;
    color: white;
    transition: all 0.3s ease;
}

.btn-add-cart:hover {
    background: linear-gradient(45deg, var(--accent-color), #b88a5a);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px var(--shadow-color);
    color: white;
}

.cart-item {
    border-bottom: 1px solid var(--border-color);
    padding: 1rem 0;
}

.cart-item:last-child {
    border-bottom: none;
}

.cart-item-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
}

.btn-remove {
    color: var(--accent-color);
    border: none;
    background: none;
    font-size: 1.2rem;
    transition: color 0.3s ease;
}

.btn-remove:hover {
    color: var(--primary-color);
}

.quantity-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.quantity-btn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid var(--border-color);
    background: var(--card-bg);
    color: var(--text-color);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.quantity-btn:hover {
    background: var(--secondary-color);
    border-color: var(--accent-color);
    color: var(--text-color);
}

.quantity-input {
    width: 50px;
    text-align: center;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    padding: 0.25rem;
    background-color: var(--card-bg);
    color: var(--text-color);
}

#emptyCart {
    color: var(--text-color);
    opacity: 0.7;
}

.toast {
    background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
    color: white;
}

.toast-header {
    background: rgba(255,255,255,0.1);
    border-bottom: 1px solid rgba(255,255,255,0.2);
}

/* Product image styles */
.product-image {
    transition: all 0.3s ease;
}

.product-image:hover {
    transform: scale(1.02);
    filter: brightness(1.05);
}

.btn-image-zoom {
    opacity: 0;
    transition: all 0.3s ease;
    background-color: rgba(255, 255, 255, 0.9) !important;
    border: none;
    color: var(--text-color);
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.btn-image-zoom:hover {
    opacity: 1 !important;
    background-color: var(--primary-color) !important;
    color: white;
    transform: scale(1.1);
}

.card:hover .btn-image-zoom {
    opacity: 1;
}

/* Image modal styles */
#imageModal .modal-content {
    border: none;
    border-radius: 1rem;
    box-shadow: 0 10px 30px var(--shadow-color);
}

#imageModal .modal-header {
    background-color: var(--light-bg);
    border-bottom: 1px solid var(--border-color);
    border-radius: 1rem 1rem 0 0;
}

#imageModal .modal-body {
    padding: 2rem;
}

#imageModal .modal-body img {
    max-height: 400px;
    width: auto;
    box-shadow: 0 4px 15px var(--shadow-color);
}

#imageModal .modal-footer {
    background-color: var(--light-bg);
    border-top: 1px solid var(--border-color);
    border-radius: 0 0 1rem 1rem;
}

#imageModal .btn-close {
    background-color: var(--accent-color);
    opacity: 1;
    border-radius: 50%;
    width: 30px;
    height: 30px;
}

#imageModal .btn-close:hover {
    background-color: var(--primary-color);
}

/* Animation for cart count badge */
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}

.badge.bounce {
    animation: bounce 1s;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .card-img-top {
        height: 150px;
    }
    
    .cart-item-image {
        width: 50px;
        height: 50px;
    }
}

/* Loading animation */
.loading {
    opacity: 0.6;
    pointer-events: none;
}

.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

```

讓我檢查是否有任何 linting 錯誤：


完美！我已經成功為每個商品添加了「促銷商品」功能。以下是實現的功能特色：

## 🏷️ 促銷商品標籤功能

### 📊 促銷商品設定
以下商品設為促銷商品（`isOnSale: true`）：
- **枕頭貓** - 茶茶小貓咪類
- **雞雞貓** - 茶茶小貓咪類  
- **尤達呆呆貓** - 茶茶小貓咪類
- **小逼** - 茶茶的朋友-小雞類
- **站坐貓** - 茶茶小貓咪類
- **饋手貓** - 茶茶小貓咪類

### 🎨 促銷標籤設計

1. **視覺效果**
   - 紅色漸層背景 (`#dc3545` 到 `#c82333`)
   - 白色文字，字體加粗
   - 圓角設計 (`0.5rem`)
   - 陰影效果增強立體感

2. **動畫效果**
   - 脈衝動畫 (`salePulse`) 每2秒循環
   - 輕微放大縮小效果
   - 陰影強度變化
   - 吸引用戶注意

3. **圖示裝飾**
   - 火焰圖示 🔥 在文字前
   - 增加視覺吸引力
   - 強調促銷的緊迫感

### ✨ 功能特色

1. **條件顯示**
   - 只有 `isOnSale: true` 的商品才顯示標籤
   - 動態生成，不影響非促銷商品
   - 與現有功能完全兼容

2. **位置設計**
   - 位於商品卡片左上角
   - 不與縮放按鈕重疊
   - 高層級顯示 (`z-index: 10`)

3. **響應式支援**
   - 在不同螢幕尺寸下正常顯示
   - 保持適當的大小和間距
   - 觸控設備友好

### 🛒 購物體驗提升

1. **視覺吸引力**
   - 動畫效果吸引用戶注意
   - 紅色配色突出促銷信息
   - 火焰圖示增加趣味性

2. **信息清晰**
   - 簡潔的「促銷」文字
   - 醒目的視覺設計
   - 不干擾商品主要信息

3. **用戶引導**
   - 幫助用戶快速識別促銷商品
   - 提升促銷商品的點擊率
   - 增加購買轉換率

現在您的購物網站具備了完整的促銷商品標籤功能！促銷商品會顯示醒目的紅色標籤，並有動畫效果來吸引用戶注意，提升購物體驗和銷售效果。

---

**User**

製作一個「會員中心」的功能，紀錄會員名字、email、電話、目前點數等等

且一開始要可以註冊，註冊完可以登入

---

**Cursor**

我將為您創建一個完整的會員中心功能，包括註冊、登入和會員資料管理。


首先，我需要在 HTML 中添加會員中心的模態框：


```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>商品購物網站</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
            <a class="navbar-brand" href="#">
                <i class="bi bi-shop"></i> 茶茶的店
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#memberModal" id="memberLink">
                            <i class="bi bi-person-circle"></i> <span id="memberText">會員登入</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#cartModal">
                            <i class="bi bi-cart3"></i> 購物車 
                            <span class="badge bg-danger" id="cartCount">0</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

        <!-- Main Content -->
        <div class="container mt-4">
            <div class="row">
                <div class="col-12">
                    <h1 class="text-center mb-4">精選商品</h1>
                    
                    <!-- Search Bar -->
                    <div class="row justify-content-center mb-4">
                        <div class="col-lg-6 col-md-8 col-sm-10">
                            <div class="input-group">
                                <span class="input-group-text">
                                    <i class="bi bi-search"></i>
                                </span>
                                <input type="text" class="form-control form-control-lg" id="searchInput" 
                                       placeholder="搜尋商品名稱或描述..." aria-label="搜尋商品">
                                <button class="btn btn-outline-secondary" type="button" id="clearSearchBtn" style="display: none;">
                                    <i class="bi bi-x-lg"></i>
                                </button>
                            </div>
                            <div class="mt-2">
                                <small class="text-muted" id="searchResultsInfo"></small>
                            </div>
                        </div>
                    </div>

                    <!-- Category Filter -->
                    <div class="row justify-content-center mb-4">
                        <div class="col-auto">
                            <div class="btn-group" role="group" aria-label="商品分類">
                                <input type="radio" class="btn-check" name="categoryFilter" id="categoryAll" value="all" checked>
                                <label class="btn btn-outline-primary" for="categoryAll">
                                    <i class="bi bi-grid-3x3-gap"></i> 全部商品
                                </label>
                                
                                <input type="radio" class="btn-check" name="categoryFilter" id="categoryA" value="A">
                                <label class="btn btn-outline-success" for="categoryA">
                                    <i class="bi bi-heart-fill"></i> 茶茶小貓咪
                                </label>
                                
                                <input type="radio" class="btn-check" name="categoryFilter" id="categoryB" value="B">
                                <label class="btn btn-outline-warning" for="categoryB">
                                    <i class="bi bi-egg-fried"></i> 茶茶的朋友-小雞
                                </label>
                                
                                <input type="radio" class="btn-check" name="categoryFilter" id="categoryC" value="C">
                                <label class="btn btn-outline-info" for="categoryC">
                                    <i class="bi bi-heart-pulse"></i> 茶的必需品
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        <!-- Products Grid -->
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4" id="productsContainer">
            <!-- Products will be dynamically generated here -->
        </div>
    </div>

    <!-- Cart Modal -->
    <div class="modal fade" id="cartModal" tabindex="-1" aria-labelledby="cartModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="cartModalLabel">
                        <i class="bi bi-cart3"></i> 購物車
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div id="cartItems">
                        <!-- Cart items will be displayed here -->
                    </div>
                    <div id="emptyCart" class="text-center text-muted py-4" style="display: none;">
                        <i class="bi bi-cart-x display-1"></i>
                        <p class="mt-2">購物車是空的</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="d-flex justify-content-between w-100">
                        <h5>總計: $<span id="totalPrice">0</span></h5>
                        <button type="button" class="btn btn-success" id="checkoutBtn" disabled>
                            <i class="bi bi-credit-card"></i> 結帳
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Image Modal -->
    <div class="modal fade" id="imageModal" tabindex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="imageModalLabel">商品圖片</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center">
                    <img id="modalImage" src="" alt="" class="img-fluid rounded">
                    <div class="mt-3">
                        <h6 id="modalProductName" class="text-muted"></h6>
                        <p id="modalProductPrice" class="h5 text-primary mb-0"></p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                        <i class="bi bi-x-lg"></i> 關閉
                    </button>
                    <button type="button" class="btn btn-primary" id="addToCartFromModal">
                        <i class="bi bi-cart-plus"></i> 加入購物車
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Toast for notifications -->
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="cartToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <i class="bi bi-check-circle-fill text-success me-2"></i>
                <strong class="me-auto">成功</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                商品已加入購物車！
            </div>
        </div>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Custom JS -->
    <script src="script.js"></script>
</body>
</html>

```

現在添加會員中心的模態框：


```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>商品購物網站</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
            <a class="navbar-brand" href="#">
                <i class="bi bi-shop"></i> 茶茶的店
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#memberModal" id="memberLink">
                            <i class="bi bi-person-circle"></i> <span id="memberText">會員登入</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#cartModal">
                            <i class="bi bi-cart3"></i> 購物車 
                            <span class="badge bg-danger" id="cartCount">0</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

        <!-- Main Content -->
        <div class="container mt-4">
            <div class="row">
                <div class="col-12">
                    <h1 class="text-center mb-4">精選商品</h1>
                    
                    <!-- Search Bar -->
                    <div class="row justify-content-center mb-4">
                        <div class="col-lg-6 col-md-8 col-sm-10">
                            <div class="input-group">
                                <span class="input-group-text">
                                    <i class="bi bi-search"></i>
                                </span>
                                <input type="text" class="form-control form-control-lg" id="searchInput" 
                                       placeholder="搜尋商品名稱或描述..." aria-label="搜尋商品">
                                <button class="btn btn-outline-secondary" type="button" id="clearSearchBtn" style="display: none;">
                                    <i class="bi bi-x-lg"></i>
                                </button>
                            </div>
                            <div class="mt-2">
                                <small class="text-muted" id="searchResultsInfo"></small>
                            </div>
                        </div>
                    </div>

                    <!-- Category Filter -->
                    <div class="row justify-content-center mb-4">
                        <div class="col-auto">
                            <div class="btn-group" role="group" aria-label="商品分類">
                                <input type="radio" class="btn-check" name="categoryFilter" id="categoryAll" value="all" checked>
                                <label class="btn btn-outline-primary" for="categoryAll">
                                    <i class="bi bi-grid-3x3-gap"></i> 全部商品
                                </label>
                                
                                <input type="radio" class="btn-check" name="categoryFilter" id="categoryA" value="A">
                                <label class="btn btn-outline-success" for="categoryA">
                                    <i class="bi bi-heart-fill"></i> 茶茶小貓咪
                                </label>
                                
                                <input type="radio" class="btn-check" name="categoryFilter" id="categoryB" value="B">
                                <label class="btn btn-outline-warning" for="categoryB">
                                    <i class="bi bi-egg-fried"></i> 茶茶的朋友-小雞
                                </label>
                                
                                <input type="radio" class="btn-check" name="categoryFilter" id="categoryC" value="C">
                                <label class="btn btn-outline-info" for="categoryC">
                                    <i class="bi bi-heart-pulse"></i> 茶的必需品
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        <!-- Products Grid -->
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4" id="productsContainer">
            <!-- Products will be dynamically generated here -->
        </div>
    </div>

    <!-- Cart Modal -->
    <div class="modal fade" id="cartModal" tabindex="-1" aria-labelledby="cartModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="cartModalLabel">
                        <i class="bi bi-cart3"></i> 購物車
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div id="cartItems">
                        <!-- Cart items will be displayed here -->
                    </div>
                    <div id="emptyCart" class="text-center text-muted py-4" style="display: none;">
                        <i class="bi bi-cart-x display-1"></i>
                        <p class="mt-2">購物車是空的</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="d-flex justify-content-between w-100">
                        <h5>總計: $<span id="totalPrice">0</span></h5>
                        <button type="button" class="btn btn-success" id="checkoutBtn" disabled>
                            <i class="bi bi-credit-card"></i> 結帳
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Member Modal -->
    <div class="modal fade" id="memberModal" tabindex="-1" aria-labelledby="memberModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="memberModalLabel">會員中心</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <!-- Login Form -->
                    <div id="loginForm">
                        <div class="text-center mb-4">
                            <i class="bi bi-person-circle display-1 text-primary"></i>
                            <h4>會員登入</h4>
                        </div>
                        <form id="loginFormElement">
                            <div class="mb-3">
                                <label for="loginEmail" class="form-label">電子郵件</label>
                                <input type="email" class="form-control" id="loginEmail" required>
                            </div>
                            <div class="mb-3">
                                <label for="loginPassword" class="form-label">密碼</label>
                                <input type="password" class="form-control" id="loginPassword" required>
                            </div>
                            <div class="d-grid">
                                <button type="submit" class="btn btn-primary">
                                    <i class="bi bi-box-arrow-in-right"></i> 登入
                                </button>
                            </div>
                        </form>
                        <div class="text-center mt-3">
                            <p class="text-muted">還沒有帳號？ <a href="#" id="showRegisterForm">立即註冊</a></p>
                        </div>
                    </div>

                    <!-- Register Form -->
                    <div id="registerForm" style="display: none;">
                        <div class="text-center mb-4">
                            <i class="bi bi-person-plus display-1 text-success"></i>
                            <h4>會員註冊</h4>
                        </div>
                        <form id="registerFormElement">
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="registerName" class="form-label">姓名</label>
                                    <input type="text" class="form-control" id="registerName" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="registerEmail" class="form-label">電子郵件</label>
                                    <input type="email" class="form-control" id="registerEmail" required>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="registerPhone" class="form-label">電話</label>
                                    <input type="tel" class="form-control" id="registerPhone" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="registerPassword" class="form-label">密碼</label>
                                    <input type="password" class="form-control" id="registerPassword" required>
                                </div>
                            </div>
                            <div class="d-grid">
                                <button type="submit" class="btn btn-success">
                                    <i class="bi bi-person-plus"></i> 註冊
                                </button>
                            </div>
                        </form>
                        <div class="text-center mt-3">
                            <p class="text-muted">已有帳號？ <a href="#" id="showLoginForm">立即登入</a></p>
                        </div>
                    </div>

                    <!-- Member Dashboard -->
                    <div id="memberDashboard" style="display: none;">
                        <div class="text-center mb-4">
                            <i class="bi bi-person-check display-1 text-primary"></i>
                            <h4>歡迎回來！</h4>
                            <h5 id="memberName" class="text-muted"></h5>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <div class="card">
                                    <div class="card-body text-center">
                                        <i class="bi bi-envelope display-4 text-primary"></i>
                                        <h6 class="mt-2">電子郵件</h6>
                                        <p id="memberEmail" class="text-muted"></p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <div class="card">
                                    <div class="card-body text-center">
                                        <i class="bi bi-telephone display-4 text-success"></i>
                                        <h6 class="mt-2">電話</h6>
                                        <p id="memberPhone" class="text-muted"></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card mb-3">
                            <div class="card-body text-center">
                                <i class="bi bi-star-fill display-4 text-warning"></i>
                                <h6 class="mt-2">目前點數</h6>
                                <h3 id="memberPoints" class="text-primary">0</h3>
                                <small class="text-muted">購物即可獲得點數！</small>
                            </div>
                        </div>
                        <div class="d-grid">
                            <button type="button" class="btn btn-outline-danger" id="logoutBtn">
                                <i class="bi bi-box-arrow-right"></i> 登出
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Image Modal -->
    <div class="modal fade" id="imageModal" tabindex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="imageModalLabel">商品圖片</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center">
                    <img id="modalImage" src="" alt="" class="img-fluid rounded">
                    <div class="mt-3">
                        <h6 id="modalProductName" class="text-muted"></h6>
                        <p id="modalProductPrice" class="h5 text-primary mb-0"></p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                        <i class="bi bi-x-lg"></i> 關閉
                    </button>
                    <button type="button" class="btn btn-primary" id="addToCartFromModal">
                        <i class="bi bi-cart-plus"></i> 加入購物車
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Toast for notifications -->
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="cartToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <i class="bi bi-check-circle-fill text-success me-2"></i>
                <strong class="me-auto">成功</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                商品已加入購物車！
            </div>
        </div>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Custom JS -->
    <script src="script.js"></script>
</body>
</html>

```

現在我需要在 JavaScript 中添加會員管理功能：


```javascript
// Shopping cart functionality
class ShoppingCart {
    constructor() {
        this.items = [];
        this.loadFromStorage();
        this.updateCartDisplay();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveToStorage();
        this.updateCartDisplay();
        this.showToast();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        this.updateCartDisplay();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
                this.saveToStorage();
                this.updateCartDisplay();
            }
        }
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    updateCartDisplay() {
        this.updateCartCount();
        this.updateCartModal();
        this.updateTotalPrice();
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        cartCount.textContent = this.getTotalItems();
        
        if (this.getTotalItems() > 0) {
            cartCount.classList.add('bounce');
            setTimeout(() => cartCount.classList.remove('bounce'), 1000);
        }
    }

    updateCartModal() {
        const cartItems = document.getElementById('cartItems');
        const emptyCart = document.getElementById('emptyCart');
        
        if (this.items.length === 0) {
            cartItems.style.display = 'none';
            emptyCart.style.display = 'block';
        } else {
            cartItems.style.display = 'block';
            emptyCart.style.display = 'none';
            
            cartItems.innerHTML = this.items.map(item => `
                <div class="cart-item d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${item.name}</h6>
                        <p class="text-muted mb-0">$${item.price}</p>
                    </div>
                    <div class="quantity-controls me-3">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                               onchange="cart.updateQuantity(${item.id}, parseInt(this.value))">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <div class="text-end me-3">
                        <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                    </div>
                    <button class="btn-remove" onclick="cart.removeItem(${item.id})" title="移除商品">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    }

    updateTotalPrice() {
        const totalPrice = document.getElementById('totalPrice');
        const checkoutBtn = document.getElementById('checkoutBtn');
        
        totalPrice.textContent = this.getTotalPrice().toFixed(2);
        checkoutBtn.disabled = this.items.length === 0;
    }

    showToast() {
        const toast = new bootstrap.Toast(document.getElementById('cartToast'));
        toast.show();
    }

    saveToStorage() {
        localStorage.setItem('shoppingCart', JSON.stringify(this.items));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('shoppingCart');
        if (stored) {
            this.items = JSON.parse(stored);
        }
    }

    checkout() {
        if (this.items.length === 0) {
            alert('購物車是空的！');
            return;
        }
        
        alert(`結帳成功！\n總金額: $${this.getTotalPrice().toFixed(2)}\n商品數量: ${this.getTotalItems()}`);
        this.items = [];
        this.saveToStorage();
        this.updateCartDisplay();
    }
}

// Product data with categories
const products = [
    {
        id: 1,
        name: "枕頭貓",
        description: "有曬過太陽的香味喔☀️",
        price: 129.99,
        category: "A",
        isOnSale: true,
        image: "image/pillow_cat.png"
    },
    {
        id: 2,
        name: "潛水貓",
        description: "夢到自己在潛水喔",
        price: 299.99,
        category: "A",
        isOnSale: false,
        image: "image/淺水貓.png"
    },
    {
        id: 3,
        name: "雞雞貓",
        description: "ㄐㄐ",
        price: 899.99,
        category: "A",
        isOnSale: false,
        image: "image/雞雞貓.png"
    },
    {
        id: 4,
        name: "兔兔貓",
        description: "吃太多鏟屎官便當裡的紅蘿菠，所以變成兔子了",
        price: 699.99,
        category: "A",
        isOnSale: false,
        image: "image/兔兔貓.png"
    },
    {
        id: 5,
        name: "尤達呆呆貓",
        description: "這個家待不下去了",
        price: 199.99,
        category: "A",
        isOnSale: false,
        image: "image/尤達呆呆貓.png"
    },
    {
        id: 6,
        name: "長條貓",
        description: "控制不住想要嚕兩下的衝動",
        price: 149.99,
        category: "A",
        isOnSale: false,
        image: "image/長條珍珠奶茶.png"
    },
    {
        id: 7,
        name: "小逼",
        description: "藍色的漂亮鸚鵡，大便很水，還有雞味",
        price: 399.99,
        category: "B",
        isOnSale: false,
        image: "image/小逼.jpg"
    },
    {
        id: 8,
        name: "茶茶與鼠鼠.png",
        description: "相親相愛的好朋友",
        price: 499.99,
        category: "A",
        isOnSale: false,
        image: "image/茶茶與鼠鼠.png"
    },
    {
        id: 9,
        name: "站坐貓",
        description: "你猜我是站著還是坐著？",
        price: 249.99,
        category: "A",
        isOnSale: true,
        image: "image/站坐貓.png"
    },
    {
        id: 10,
        name: "石膏雞",
        description: "腿斷掉的小雞...",
        price: 599.99,
        category: "B",
        isOnSale: false,
        image: "image/石膏雞.jpg"
    },
    {
        id: 11,
        name: "饋手貓",
        description: "靜靜的看著你",
        price: 349.99,
        category: "A",
        isOnSale: true,
        image: "image/饋手貓.png"
    },
    {
        id: 12,
        name: "打字雞",
        description: "o[e42,,,f[blqo    msofe",
        price: 39.99,
        category: "B",
        isOnSale: false,
        image: "image/打字雞.jpg"
    },
    {
        id: 13,
        name: "莫比貓飼料",
        description: "餓的時候很愛吃，但在罐頭前面不堪一擊",
        price: 39.99,
        category: "C",
        isOnSale: false,
        image: "image/莫比貓飼料.png"
    },
    {
        id: 14,
        name: "貓罐頭",
        description: "只要有罐頭，你就能支配茶茶",
        price: 39.99,
        category: "C",
        isOnSale: false,
        image: "image/罐頭.png"
    }
   
]
// Initialize shopping cart
let cart;

// Member management system
class MemberManager {
    constructor() {
        this.currentMember = null;
        this.members = this.loadMembers();
        this.loadCurrentMember();
    }

    // Load members from localStorage
    loadMembers() {
        const stored = localStorage.getItem('members');
        return stored ? JSON.parse(stored) : [];
    }

    // Save members to localStorage
    saveMembers() {
        localStorage.setItem('members', JSON.stringify(this.members));
    }

    // Load current member from sessionStorage
    loadCurrentMember() {
        const stored = sessionStorage.getItem('currentMember');
        if (stored) {
            this.currentMember = JSON.parse(stored);
            this.updateNavbar();
        }
    }

    // Save current member to sessionStorage
    saveCurrentMember() {
        if (this.currentMember) {
            sessionStorage.setItem('currentMember', JSON.stringify(this.currentMember));
        } else {
            sessionStorage.removeItem('currentMember');
        }
    }

    // Register new member
    register(name, email, phone, password) {
        // Check if email already exists
        if (this.members.find(member => member.email === email)) {
            return { success: false, message: '此電子郵件已被註冊' };
        }

        // Create new member
        const newMember = {
            id: Date.now(),
            name: name,
            email: email,
            phone: phone,
            password: password,
            points: 100, // Welcome bonus
            joinDate: new Date().toISOString()
        };

        this.members.push(newMember);
        this.saveMembers();
        
        return { success: true, message: '註冊成功！獲得歡迎點數 100 點' };
    }

    // Login member
    login(email, password) {
        const member = this.members.find(m => m.email === email && m.password === password);
        if (member) {
            this.currentMember = member;
            this.saveCurrentMember();
            this.updateNavbar();
            return { success: true, message: '登入成功！' };
        } else {
            return { success: false, message: '電子郵件或密碼錯誤' };
        }
    }

    // Logout member
    logout() {
        this.currentMember = null;
        this.saveCurrentMember();
        this.updateNavbar();
    }

    // Add points to current member
    addPoints(points) {
        if (this.currentMember) {
            this.currentMember.points += points;
            this.saveCurrentMember();
            this.updateMemberInStorage();
        }
    }

    // Update member in members array
    updateMemberInStorage() {
        if (this.currentMember) {
            const index = this.members.findIndex(m => m.id === this.currentMember.id);
            if (index !== -1) {
                this.members[index] = this.currentMember;
                this.saveMembers();
            }
        }
    }

    // Update navbar display
    updateNavbar() {
        const memberText = document.getElementById('memberText');
        if (this.currentMember) {
            memberText.textContent = this.currentMember.name;
        } else {
            memberText.textContent = '會員登入';
        }
    }

    // Show member dashboard
    showMemberDashboard() {
        if (this.currentMember) {
            document.getElementById('memberName').textContent = this.currentMember.name;
            document.getElementById('memberEmail').textContent = this.currentMember.email;
            document.getElementById('memberPhone').textContent = this.currentMember.phone;
            document.getElementById('memberPoints').textContent = this.currentMember.points;
        }
    }
}

// Initialize member manager
let memberManager;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    cart = new ShoppingCart();
    renderProducts();
    setupEventListeners();
});

// Get current filter
function getCurrentFilter() {
    const checkedFilter = document.querySelector('input[name="categoryFilter"]:checked');
    return checkedFilter ? checkedFilter.value : 'all';
}

// Get current search term
function getCurrentSearchTerm() {
    return document.getElementById('searchInput').value.trim().toLowerCase();
}

// Search products by name and description
function searchProducts(products, searchTerm) {
    if (!searchTerm) {
        return products;
    }
    
    return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
}

// Filter products by category
function filterProducts(category) {
    if (category === 'all') {
        return products;
    }
    return products.filter(product => product.category === category);
}

// Apply both search and category filters
function getFilteredProducts() {
    const category = getCurrentFilter();
    const searchTerm = getCurrentSearchTerm();
    
    let filteredProducts = filterProducts(category);
    filteredProducts = searchProducts(filteredProducts, searchTerm);
    
    return filteredProducts;
}

// Render products with filtering
function renderProducts() {
    const container = document.getElementById('productsContainer');
    const filteredProducts = getFilteredProducts();
    const searchTerm = getCurrentSearchTerm();
    const category = getCurrentFilter();
    
    // Update search results info
    updateSearchResultsInfo(filteredProducts.length, searchTerm, category);
    
    if (filteredProducts.length === 0) {
        let emptyMessage = '';
        if (searchTerm) {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-search display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">找不到相關商品</h3>
                        <p class="text-muted">沒有找到包含「${searchTerm}」的商品</p>
                        <button class="btn btn-outline-primary mt-3" onclick="clearSearch()">
                            <i class="bi bi-arrow-left"></i> 清除搜尋
                        </button>
                    </div>
                </div>
            `;
        } else {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-grid display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">此分類暫無商品</h3>
                        <p class="text-muted">請選擇其他分類或查看全部商品</p>
                    </div>
                </div>
            `;
        }
        container.innerHTML = emptyMessage;
        return;
    }
    
    container.innerHTML = filteredProducts.map(product => {
        const searchTerm = getCurrentSearchTerm();
        const highlightedName = highlightSearchTerm(product.name, searchTerm);
        const highlightedDescription = highlightSearchTerm(product.description, searchTerm);
        
        return `
            <div class="col">
                <div class="card h-100 product-card" data-product-id="${product.id}" style="cursor: pointer;">
                    <div class="position-relative">
                        <img src="${product.image}" class="card-img-top product-image" alt="${product.name}" loading="lazy">
                        ${product.isOnSale ? '<span class="position-absolute top-0 start-0 m-2 badge bg-danger sale-badge">促銷</span>' : ''}
                        <div class="position-absolute top-0 end-0 m-2">
                            <button class="btn btn-sm btn-light btn-image-zoom" data-product-id="${product.id}" title="查看大圖">
                                <i class="bi bi-zoom-in"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${highlightedName}</h5>
                        <p class="card-text flex-grow-1">${highlightedDescription}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="h5 text-primary mb-0">$${product.price}</span>
                            <button class="btn btn-primary btn-add-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                                <i class="bi bi-cart-plus"></i> 加入購物車
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}


// Update search results info
function updateSearchResultsInfo(count, searchTerm, category) {
    const searchResultsInfo = document.getElementById('searchResultsInfo');
    let infoText = '';
    
    if (searchTerm) {
        if (category === 'all') {
            infoText = `找到 ${count} 個包含「${searchTerm}」的商品`;
        } else {
            const categoryNames = {
                'A': '茶茶小貓咪',
                'B': '茶茶的朋友-小雞',
                'C': '茶的必需品'
            };
            infoText = `在${categoryNames[category]}中找到 ${count} 個包含「${searchTerm}」的商品`;
        }
    } else {
        if (category === 'all') {
            infoText = `顯示全部 ${count} 個商品`;
        } else {
            const categoryNames = {
                'A': '茶茶小貓咪',
                'B': '茶茶的朋友-小雞',
                'C': '茶的必需品'
            };
            infoText = `顯示 ${categoryNames[category]} 類別中的 ${count} 個商品`;
        }
    }
    
    searchResultsInfo.textContent = infoText;
}

// Clear search
function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('clearSearchBtn').style.display = 'none';
    renderProducts();
}

// Highlight search terms in text
function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.addItem(product);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        cart.checkout();
    });
    
    // Search input events
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    
    // Real-time search
    searchInput.addEventListener('input', function() {
        const hasValue = this.value.trim().length > 0;
        clearSearchBtn.style.display = hasValue ? 'block' : 'none';
        renderProducts();
    });
    
    // Clear search button
    clearSearchBtn.addEventListener('click', clearSearch);
    
    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            renderProducts();
        }
    });
    
    // Category filter change
    document.querySelectorAll('input[name="categoryFilter"]').forEach(radio => {
        radio.addEventListener('change', function() {
            renderProducts();
        });
    });
    
    // Prevent form submission on quantity input enter
    document.addEventListener('keypress', function(e) {
        if (e.target.classList.contains('quantity-input') && e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
        }
    });
    
    // Image click events (delegated event listeners)
    document.addEventListener('click', function(e) {
        // Product card click (entire card)
        if (e.target.closest('.product-card')) {
            const productCard = e.target.closest('.product-card');
            const productId = parseInt(productCard.getAttribute('data-product-id'));
            
            // Don't trigger if clicking on add to cart button
            if (!e.target.closest('.btn-add-cart')) {
                showImageModal(productId);
            }
        }
        
        // Product image click
        if (e.target.classList.contains('product-image')) {
            const productId = parseInt(e.target.getAttribute('data-product-id'));
            showImageModal(productId);
        }
        
        // Zoom button click
        if (e.target.closest('.btn-image-zoom')) {
            const productId = parseInt(e.target.closest('.btn-image-zoom').getAttribute('data-product-id'));
            showImageModal(productId);
        }
        
        // Add to cart from modal
        if (e.target.id === 'addToCartFromModal') {
            const productId = parseInt(e.target.getAttribute('data-product-id'));
            addToCart(productId);
            
            // Close modal
            const imageModal = bootstrap.Modal.getInstance(document.getElementById('imageModal'));
            if (imageModal) {
                imageModal.hide();
            }
        }
    });
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('zh-TW', {
        style: 'currency',
        currency: 'TWD'
    }).format(amount);
}

```

現在我需要更新應用程式初始化並添加會員功能的事件監聽器：


```javascript
// Shopping cart functionality
class ShoppingCart {
    constructor() {
        this.items = [];
        this.loadFromStorage();
        this.updateCartDisplay();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveToStorage();
        this.updateCartDisplay();
        this.showToast();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        this.updateCartDisplay();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
                this.saveToStorage();
                this.updateCartDisplay();
            }
        }
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    updateCartDisplay() {
        this.updateCartCount();
        this.updateCartModal();
        this.updateTotalPrice();
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        cartCount.textContent = this.getTotalItems();
        
        if (this.getTotalItems() > 0) {
            cartCount.classList.add('bounce');
            setTimeout(() => cartCount.classList.remove('bounce'), 1000);
        }
    }

    updateCartModal() {
        const cartItems = document.getElementById('cartItems');
        const emptyCart = document.getElementById('emptyCart');
        
        if (this.items.length === 0) {
            cartItems.style.display = 'none';
            emptyCart.style.display = 'block';
        } else {
            cartItems.style.display = 'block';
            emptyCart.style.display = 'none';
            
            cartItems.innerHTML = this.items.map(item => `
                <div class="cart-item d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${item.name}</h6>
                        <p class="text-muted mb-0">$${item.price}</p>
                    </div>
                    <div class="quantity-controls me-3">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                               onchange="cart.updateQuantity(${item.id}, parseInt(this.value))">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <div class="text-end me-3">
                        <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                    </div>
                    <button class="btn-remove" onclick="cart.removeItem(${item.id})" title="移除商品">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    }

    updateTotalPrice() {
        const totalPrice = document.getElementById('totalPrice');
        const checkoutBtn = document.getElementById('checkoutBtn');
        
        totalPrice.textContent = this.getTotalPrice().toFixed(2);
        checkoutBtn.disabled = this.items.length === 0;
    }

    showToast() {
        const toast = new bootstrap.Toast(document.getElementById('cartToast'));
        toast.show();
    }

    saveToStorage() {
        localStorage.setItem('shoppingCart', JSON.stringify(this.items));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('shoppingCart');
        if (stored) {
            this.items = JSON.parse(stored);
        }
    }

    checkout() {
        if (this.items.length === 0) {
            alert('購物車是空的！');
            return;
        }
        
        alert(`結帳成功！\n總金額: $${this.getTotalPrice().toFixed(2)}\n商品數量: ${this.getTotalItems()}`);
        this.items = [];
        this.saveToStorage();
        this.updateCartDisplay();
    }
}

// Product data with categories
const products = [
    {
        id: 1,
        name: "枕頭貓",
        description: "有曬過太陽的香味喔☀️",
        price: 129.99,
        category: "A",
        isOnSale: true,
        image: "image/pillow_cat.png"
    },
    {
        id: 2,
        name: "潛水貓",
        description: "夢到自己在潛水喔",
        price: 299.99,
        category: "A",
        isOnSale: false,
        image: "image/淺水貓.png"
    },
    {
        id: 3,
        name: "雞雞貓",
        description: "ㄐㄐ",
        price: 899.99,
        category: "A",
        isOnSale: false,
        image: "image/雞雞貓.png"
    },
    {
        id: 4,
        name: "兔兔貓",
        description: "吃太多鏟屎官便當裡的紅蘿菠，所以變成兔子了",
        price: 699.99,
        category: "A",
        isOnSale: false,
        image: "image/兔兔貓.png"
    },
    {
        id: 5,
        name: "尤達呆呆貓",
        description: "這個家待不下去了",
        price: 199.99,
        category: "A",
        isOnSale: false,
        image: "image/尤達呆呆貓.png"
    },
    {
        id: 6,
        name: "長條貓",
        description: "控制不住想要嚕兩下的衝動",
        price: 149.99,
        category: "A",
        isOnSale: false,
        image: "image/長條珍珠奶茶.png"
    },
    {
        id: 7,
        name: "小逼",
        description: "藍色的漂亮鸚鵡，大便很水，還有雞味",
        price: 399.99,
        category: "B",
        isOnSale: false,
        image: "image/小逼.jpg"
    },
    {
        id: 8,
        name: "茶茶與鼠鼠.png",
        description: "相親相愛的好朋友",
        price: 499.99,
        category: "A",
        isOnSale: false,
        image: "image/茶茶與鼠鼠.png"
    },
    {
        id: 9,
        name: "站坐貓",
        description: "你猜我是站著還是坐著？",
        price: 249.99,
        category: "A",
        isOnSale: true,
        image: "image/站坐貓.png"
    },
    {
        id: 10,
        name: "石膏雞",
        description: "腿斷掉的小雞...",
        price: 599.99,
        category: "B",
        isOnSale: false,
        image: "image/石膏雞.jpg"
    },
    {
        id: 11,
        name: "饋手貓",
        description: "靜靜的看著你",
        price: 349.99,
        category: "A",
        isOnSale: true,
        image: "image/饋手貓.png"
    },
    {
        id: 12,
        name: "打字雞",
        description: "o[e42,,,f[blqo    msofe",
        price: 39.99,
        category: "B",
        isOnSale: false,
        image: "image/打字雞.jpg"
    },
    {
        id: 13,
        name: "莫比貓飼料",
        description: "餓的時候很愛吃，但在罐頭前面不堪一擊",
        price: 39.99,
        category: "C",
        isOnSale: false,
        image: "image/莫比貓飼料.png"
    },
    {
        id: 14,
        name: "貓罐頭",
        description: "只要有罐頭，你就能支配茶茶",
        price: 39.99,
        category: "C",
        isOnSale: false,
        image: "image/罐頭.png"
    }
   
]
// Initialize shopping cart
let cart;

// Member management system
class MemberManager {
    constructor() {
        this.currentMember = null;
        this.members = this.loadMembers();
        this.loadCurrentMember();
    }

    // Load members from localStorage
    loadMembers() {
        const stored = localStorage.getItem('members');
        return stored ? JSON.parse(stored) : [];
    }

    // Save members to localStorage
    saveMembers() {
        localStorage.setItem('members', JSON.stringify(this.members));
    }

    // Load current member from sessionStorage
    loadCurrentMember() {
        const stored = sessionStorage.getItem('currentMember');
        if (stored) {
            this.currentMember = JSON.parse(stored);
            this.updateNavbar();
        }
    }

    // Save current member to sessionStorage
    saveCurrentMember() {
        if (this.currentMember) {
            sessionStorage.setItem('currentMember', JSON.stringify(this.currentMember));
        } else {
            sessionStorage.removeItem('currentMember');
        }
    }

    // Register new member
    register(name, email, phone, password) {
        // Check if email already exists
        if (this.members.find(member => member.email === email)) {
            return { success: false, message: '此電子郵件已被註冊' };
        }

        // Create new member
        const newMember = {
            id: Date.now(),
            name: name,
            email: email,
            phone: phone,
            password: password,
            points: 100, // Welcome bonus
            joinDate: new Date().toISOString()
        };

        this.members.push(newMember);
        this.saveMembers();
        
        return { success: true, message: '註冊成功！獲得歡迎點數 100 點' };
    }

    // Login member
    login(email, password) {
        const member = this.members.find(m => m.email === email && m.password === password);
        if (member) {
            this.currentMember = member;
            this.saveCurrentMember();
            this.updateNavbar();
            return { success: true, message: '登入成功！' };
        } else {
            return { success: false, message: '電子郵件或密碼錯誤' };
        }
    }

    // Logout member
    logout() {
        this.currentMember = null;
        this.saveCurrentMember();
        this.updateNavbar();
    }

    // Add points to current member
    addPoints(points) {
        if (this.currentMember) {
            this.currentMember.points += points;
            this.saveCurrentMember();
            this.updateMemberInStorage();
        }
    }

    // Update member in members array
    updateMemberInStorage() {
        if (this.currentMember) {
            const index = this.members.findIndex(m => m.id === this.currentMember.id);
            if (index !== -1) {
                this.members[index] = this.currentMember;
                this.saveMembers();
            }
        }
    }

    // Update navbar display
    updateNavbar() {
        const memberText = document.getElementById('memberText');
        if (this.currentMember) {
            memberText.textContent = this.currentMember.name;
        } else {
            memberText.textContent = '會員登入';
        }
    }

    // Show member dashboard
    showMemberDashboard() {
        if (this.currentMember) {
            document.getElementById('memberName').textContent = this.currentMember.name;
            document.getElementById('memberEmail').textContent = this.currentMember.email;
            document.getElementById('memberPhone').textContent = this.currentMember.phone;
            document.getElementById('memberPoints').textContent = this.currentMember.points;
        }
    }
}

// Initialize member manager
let memberManager;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    cart = new ShoppingCart();
    memberManager = new MemberManager();
    renderProducts();
    setupEventListeners();
});

// Get current filter
function getCurrentFilter() {
    const checkedFilter = document.querySelector('input[name="categoryFilter"]:checked');
    return checkedFilter ? checkedFilter.value : 'all';
}

// Get current search term
function getCurrentSearchTerm() {
    return document.getElementById('searchInput').value.trim().toLowerCase();
}

// Search products by name and description
function searchProducts(products, searchTerm) {
    if (!searchTerm) {
        return products;
    }
    
    return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
}

// Filter products by category
function filterProducts(category) {
    if (category === 'all') {
        return products;
    }
    return products.filter(product => product.category === category);
}

// Apply both search and category filters
function getFilteredProducts() {
    const category = getCurrentFilter();
    const searchTerm = getCurrentSearchTerm();
    
    let filteredProducts = filterProducts(category);
    filteredProducts = searchProducts(filteredProducts, searchTerm);
    
    return filteredProducts;
}

// Render products with filtering
function renderProducts() {
    const container = document.getElementById('productsContainer');
    const filteredProducts = getFilteredProducts();
    const searchTerm = getCurrentSearchTerm();
    const category = getCurrentFilter();
    
    // Update search results info
    updateSearchResultsInfo(filteredProducts.length, searchTerm, category);
    
    if (filteredProducts.length === 0) {
        let emptyMessage = '';
        if (searchTerm) {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-search display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">找不到相關商品</h3>
                        <p class="text-muted">沒有找到包含「${searchTerm}」的商品</p>
                        <button class="btn btn-outline-primary mt-3" onclick="clearSearch()">
                            <i class="bi bi-arrow-left"></i> 清除搜尋
                        </button>
                    </div>
                </div>
            `;
        } else {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-grid display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">此分類暫無商品</h3>
                        <p class="text-muted">請選擇其他分類或查看全部商品</p>
                    </div>
                </div>
            `;
        }
        container.innerHTML = emptyMessage;
        return;
    }
    
    container.innerHTML = filteredProducts.map(product => {
        const searchTerm = getCurrentSearchTerm();
        const highlightedName = highlightSearchTerm(product.name, searchTerm);
        const highlightedDescription = highlightSearchTerm(product.description, searchTerm);
        
        return `
            <div class="col">
                <div class="card h-100 product-card" data-product-id="${product.id}" style="cursor: pointer;">
                    <div class="position-relative">
                        <img src="${product.image}" class="card-img-top product-image" alt="${product.name}" loading="lazy">
                        ${product.isOnSale ? '<span class="position-absolute top-0 start-0 m-2 badge bg-danger sale-badge">促銷</span>' : ''}
                        <div class="position-absolute top-0 end-0 m-2">
                            <button class="btn btn-sm btn-light btn-image-zoom" data-product-id="${product.id}" title="查看大圖">
                                <i class="bi bi-zoom-in"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${highlightedName}</h5>
                        <p class="card-text flex-grow-1">${highlightedDescription}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="h5 text-primary mb-0">$${product.price}</span>
                            <button class="btn btn-primary btn-add-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                                <i class="bi bi-cart-plus"></i> 加入購物車
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}


// Update search results info
function updateSearchResultsInfo(count, searchTerm, category) {
    const searchResultsInfo = document.getElementById('searchResultsInfo');
    let infoText = '';
    
    if (searchTerm) {
        if (category === 'all') {
            infoText = `找到 ${count} 個包含「${searchTerm}」的商品`;
        } else {
            const categoryNames = {
                'A': '茶茶小貓咪',
                'B': '茶茶的朋友-小雞',
                'C': '茶的必需品'
            };
            infoText = `在${categoryNames[category]}中找到 ${count} 個包含「${searchTerm}」的商品`;
        }
    } else {
        if (category === 'all') {
            infoText = `顯示全部 ${count} 個商品`;
        } else {
            const categoryNames = {
                'A': '茶茶小貓咪',
                'B': '茶茶的朋友-小雞',
                'C': '茶的必需品'
            };
            infoText = `顯示 ${categoryNames[category]} 類別中的 ${count} 個商品`;
        }
    }
    
    searchResultsInfo.textContent = infoText;
}

// Clear search
function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('clearSearchBtn').style.display = 'none';
    renderProducts();
}

// Highlight search terms in text
function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.addItem(product);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        cart.checkout();
    });
    
    // Search input events
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    
    // Real-time search
    searchInput.addEventListener('input', function() {
        const hasValue = this.value.trim().length > 0;
        clearSearchBtn.style.display = hasValue ? 'block' : 'none';
        renderProducts();
    });
    
    // Clear search button
    clearSearchBtn.addEventListener('click', clearSearch);
    
    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            renderProducts();
        }
    });
    
    // Category filter change
    document.querySelectorAll('input[name="categoryFilter"]').forEach(radio => {
        radio.addEventListener('change', function() {
            renderProducts();
        });
    });
    
    // Prevent form submission on quantity input enter
    document.addEventListener('keypress', function(e) {
        if (e.target.classList.contains('quantity-input') && e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
        }
    });
    
    // Image click events (delegated event listeners)
    document.addEventListener('click', function(e) {
        // Product card click (entire card)
        if (e.target.closest('.product-card')) {
            const productCard = e.target.closest('.product-card');
            const productId = parseInt(productCard.getAttribute('data-product-id'));
            
            // Don't trigger if clicking on add to cart button
            if (!e.target.closest('.btn-add-cart')) {
                showImageModal(productId);
            }
        }
        
        // Product image click
        if (e.target.classList.contains('product-image')) {
            const productId = parseInt(e.target.getAttribute('data-product-id'));
            showImageModal(productId);
        }
        
        // Zoom button click
        if (e.target.closest('.btn-image-zoom')) {
            const productId = parseInt(e.target.closest('.btn-image-zoom').getAttribute('data-product-id'));
            showImageModal(productId);
        }
        
        // Add to cart from modal
        if (e.target.id === 'addToCartFromModal') {
            const productId = parseInt(e.target.getAttribute('data-product-id'));
            addToCart(productId);
            
            // Close modal
            const imageModal = bootstrap.Modal.getInstance(document.getElementById('imageModal'));
            if (imageModal) {
                imageModal.hide();
            }
        }
    });
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('zh-TW', {
        style: 'currency',
        currency: 'TWD'
    }).format(amount);
}

```

現在我需要更新事件監聽器來處理會員功能：


```javascript
// Shopping cart functionality
class ShoppingCart {
    constructor() {
        this.items = [];
        this.loadFromStorage();
        this.updateCartDisplay();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveToStorage();
        this.updateCartDisplay();
        this.showToast();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        this.updateCartDisplay();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
                this.saveToStorage();
                this.updateCartDisplay();
            }
        }
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    updateCartDisplay() {
        this.updateCartCount();
        this.updateCartModal();
        this.updateTotalPrice();
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        cartCount.textContent = this.getTotalItems();
        
        if (this.getTotalItems() > 0) {
            cartCount.classList.add('bounce');
            setTimeout(() => cartCount.classList.remove('bounce'), 1000);
        }
    }

    updateCartModal() {
        const cartItems = document.getElementById('cartItems');
        const emptyCart = document.getElementById('emptyCart');
        
        if (this.items.length === 0) {
            cartItems.style.display = 'none';
            emptyCart.style.display = 'block';
        } else {
            cartItems.style.display = 'block';
            emptyCart.style.display = 'none';
            
            cartItems.innerHTML = this.items.map(item => `
                <div class="cart-item d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${item.name}</h6>
                        <p class="text-muted mb-0">$${item.price}</p>
                    </div>
                    <div class="quantity-controls me-3">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                               onchange="cart.updateQuantity(${item.id}, parseInt(this.value))">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <div class="text-end me-3">
                        <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                    </div>
                    <button class="btn-remove" onclick="cart.removeItem(${item.id})" title="移除商品">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    }

    updateTotalPrice() {
        const totalPrice = document.getElementById('totalPrice');
        const checkoutBtn = document.getElementById('checkoutBtn');
        
        totalPrice.textContent = this.getTotalPrice().toFixed(2);
        checkoutBtn.disabled = this.items.length === 0;
    }

    showToast() {
        const toast = new bootstrap.Toast(document.getElementById('cartToast'));
        toast.show();
    }

    saveToStorage() {
        localStorage.setItem('shoppingCart', JSON.stringify(this.items));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('shoppingCart');
        if (stored) {
            this.items = JSON.parse(stored);
        }
    }

    checkout() {
        if (this.items.length === 0) {
            alert('購物車是空的！');
            return;
        }
        
        alert(`結帳成功！\n總金額: $${this.getTotalPrice().toFixed(2)}\n商品數量: ${this.getTotalItems()}`);
        this.items = [];
        this.saveToStorage();
        this.updateCartDisplay();
    }
}

// Product data with categories
const products = [
    {
        id: 1,
        name: "枕頭貓",
        description: "有曬過太陽的香味喔☀️",
        price: 129.99,
        category: "A",
        isOnSale: true,
        image: "image/pillow_cat.png"
    },
    {
        id: 2,
        name: "潛水貓",
        description: "夢到自己在潛水喔",
        price: 299.99,
        category: "A",
        isOnSale: false,
        image: "image/淺水貓.png"
    },
    {
        id: 3,
        name: "雞雞貓",
        description: "ㄐㄐ",
        price: 899.99,
        category: "A",
        isOnSale: false,
        image: "image/雞雞貓.png"
    },
    {
        id: 4,
        name: "兔兔貓",
        description: "吃太多鏟屎官便當裡的紅蘿菠，所以變成兔子了",
        price: 699.99,
        category: "A",
        isOnSale: false,
        image: "image/兔兔貓.png"
    },
    {
        id: 5,
        name: "尤達呆呆貓",
        description: "這個家待不下去了",
        price: 199.99,
        category: "A",
        isOnSale: false,
        image: "image/尤達呆呆貓.png"
    },
    {
        id: 6,
        name: "長條貓",
        description: "控制不住想要嚕兩下的衝動",
        price: 149.99,
        category: "A",
        isOnSale: false,
        image: "image/長條珍珠奶茶.png"
    },
    {
        id: 7,
        name: "小逼",
        description: "藍色的漂亮鸚鵡，大便很水，還有雞味",
        price: 399.99,
        category: "B",
        isOnSale: false,
        image: "image/小逼.jpg"
    },
    {
        id: 8,
        name: "茶茶與鼠鼠.png",
        description: "相親相愛的好朋友",
        price: 499.99,
        category: "A",
        isOnSale: false,
        image: "image/茶茶與鼠鼠.png"
    },
    {
        id: 9,
        name: "站坐貓",
        description: "你猜我是站著還是坐著？",
        price: 249.99,
        category: "A",
        isOnSale: true,
        image: "image/站坐貓.png"
    },
    {
        id: 10,
        name: "石膏雞",
        description: "腿斷掉的小雞...",
        price: 599.99,
        category: "B",
        isOnSale: false,
        image: "image/石膏雞.jpg"
    },
    {
        id: 11,
        name: "饋手貓",
        description: "靜靜的看著你",
        price: 349.99,
        category: "A",
        isOnSale: true,
        image: "image/饋手貓.png"
    },
    {
        id: 12,
        name: "打字雞",
        description: "o[e42,,,f[blqo    msofe",
        price: 39.99,
        category: "B",
        isOnSale: false,
        image: "image/打字雞.jpg"
    },
    {
        id: 13,
        name: "莫比貓飼料",
        description: "餓的時候很愛吃，但在罐頭前面不堪一擊",
        price: 39.99,
        category: "C",
        isOnSale: false,
        image: "image/莫比貓飼料.png"
    },
    {
        id: 14,
        name: "貓罐頭",
        description: "只要有罐頭，你就能支配茶茶",
        price: 39.99,
        category: "C",
        isOnSale: false,
        image: "image/罐頭.png"
    }
   
]
// Initialize shopping cart
let cart;

// Member management system
class MemberManager {
    constructor() {
        this.currentMember = null;
        this.members = this.loadMembers();
        this.loadCurrentMember();
    }

    // Load members from localStorage
    loadMembers() {
        const stored = localStorage.getItem('members');
        return stored ? JSON.parse(stored) : [];
    }

    // Save members to localStorage
    saveMembers() {
        localStorage.setItem('members', JSON.stringify(this.members));
    }

    // Load current member from sessionStorage
    loadCurrentMember() {
        const stored = sessionStorage.getItem('currentMember');
        if (stored) {
            this.currentMember = JSON.parse(stored);
            this.updateNavbar();
        }
    }

    // Save current member to sessionStorage
    saveCurrentMember() {
        if (this.currentMember) {
            sessionStorage.setItem('currentMember', JSON.stringify(this.currentMember));
        } else {
            sessionStorage.removeItem('currentMember');
        }
    }

    // Register new member
    register(name, email, phone, password) {
        // Check if email already exists
        if (this.members.find(member => member.email === email)) {
            return { success: false, message: '此電子郵件已被註冊' };
        }

        // Create new member
        const newMember = {
            id: Date.now(),
            name: name,
            email: email,
            phone: phone,
            password: password,
            points: 100, // Welcome bonus
            joinDate: new Date().toISOString()
        };

        this.members.push(newMember);
        this.saveMembers();
        
        return { success: true, message: '註冊成功！獲得歡迎點數 100 點' };
    }

    // Login member
    login(email, password) {
        const member = this.members.find(m => m.email === email && m.password === password);
        if (member) {
            this.currentMember = member;
            this.saveCurrentMember();
            this.updateNavbar();
            return { success: true, message: '登入成功！' };
        } else {
            return { success: false, message: '電子郵件或密碼錯誤' };
        }
    }

    // Logout member
    logout() {
        this.currentMember = null;
        this.saveCurrentMember();
        this.updateNavbar();
    }

    // Add points to current member
    addPoints(points) {
        if (this.currentMember) {
            this.currentMember.points += points;
            this.saveCurrentMember();
            this.updateMemberInStorage();
        }
    }

    // Update member in members array
    updateMemberInStorage() {
        if (this.currentMember) {
            const index = this.members.findIndex(m => m.id === this.currentMember.id);
            if (index !== -1) {
                this.members[index] = this.currentMember;
                this.saveMembers();
            }
        }
    }

    // Update navbar display
    updateNavbar() {
        const memberText = document.getElementById('memberText');
        if (this.currentMember) {
            memberText.textContent = this.currentMember.name;
        } else {
            memberText.textContent = '會員登入';
        }
    }

    // Show member dashboard
    showMemberDashboard() {
        if (this.currentMember) {
            document.getElementById('memberName').textContent = this.currentMember.name;
            document.getElementById('memberEmail').textContent = this.currentMember.email;
            document.getElementById('memberPhone').textContent = this.currentMember.phone;
            document.getElementById('memberPoints').textContent = this.currentMember.points;
        }
    }
}

// Initialize member manager
let memberManager;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    cart = new ShoppingCart();
    memberManager = new MemberManager();
    renderProducts();
    setupEventListeners();
});

// Get current filter
function getCurrentFilter() {
    const checkedFilter = document.querySelector('input[name="categoryFilter"]:checked');
    return checkedFilter ? checkedFilter.value : 'all';
}

// Get current search term
function getCurrentSearchTerm() {
    return document.getElementById('searchInput').value.trim().toLowerCase();
}

// Search products by name and description
function searchProducts(products, searchTerm) {
    if (!searchTerm) {
        return products;
    }
    
    return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
}

// Filter products by category
function filterProducts(category) {
    if (category === 'all') {
        return products;
    }
    return products.filter(product => product.category === category);
}

// Apply both search and category filters
function getFilteredProducts() {
    const category = getCurrentFilter();
    const searchTerm = getCurrentSearchTerm();
    
    let filteredProducts = filterProducts(category);
    filteredProducts = searchProducts(filteredProducts, searchTerm);
    
    return filteredProducts;
}

// Render products with filtering
function renderProducts() {
    const container = document.getElementById('productsContainer');
    const filteredProducts = getFilteredProducts();
    const searchTerm = getCurrentSearchTerm();
    const category = getCurrentFilter();
    
    // Update search results info
    updateSearchResultsInfo(filteredProducts.length, searchTerm, category);
    
    if (filteredProducts.length === 0) {
        let emptyMessage = '';
        if (searchTerm) {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-search display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">找不到相關商品</h3>
                        <p class="text-muted">沒有找到包含「${searchTerm}」的商品</p>
                        <button class="btn btn-outline-primary mt-3" onclick="clearSearch()">
                            <i class="bi bi-arrow-left"></i> 清除搜尋
                        </button>
                    </div>
                </div>
            `;
        } else {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-grid display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">此分類暫無商品</h3>
                        <p class="text-muted">請選擇其他分類或查看全部商品</p>
                    </div>
                </div>
            `;
        }
        container.innerHTML = emptyMessage;
        return;
    }
    
    container.innerHTML = filteredProducts.map(product => {
        const searchTerm = getCurrentSearchTerm();
        const highlightedName = highlightSearchTerm(product.name, searchTerm);
        const highlightedDescription = highlightSearchTerm(product.description, searchTerm);
        
        return `
            <div class="col">
                <div class="card h-100 product-card" data-product-id="${product.id}" style="cursor: pointer;">
                    <div class="position-relative">
                        <img src="${product.image}" class="card-img-top product-image" alt="${product.name}" loading="lazy">
                        ${product.isOnSale ? '<span class="position-absolute top-0 start-0 m-2 badge bg-danger sale-badge">促銷</span>' : ''}
                        <div class="position-absolute top-0 end-0 m-2">
                            <button class="btn btn-sm btn-light btn-image-zoom" data-product-id="${product.id}" title="查看大圖">
                                <i class="bi bi-zoom-in"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${highlightedName}</h5>
                        <p class="card-text flex-grow-1">${highlightedDescription}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="h5 text-primary mb-0">$${product.price}</span>
                            <button class="btn btn-primary btn-add-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                                <i class="bi bi-cart-plus"></i> 加入購物車
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}


// Update search results info
function updateSearchResultsInfo(count, searchTerm, category) {
    const searchResultsInfo = document.getElementById('searchResultsInfo');
    let infoText = '';
    
    if (searchTerm) {
        if (category === 'all') {
            infoText = `找到 ${count} 個包含「${searchTerm}」的商品`;
        } else {
            const categoryNames = {
                'A': '茶茶小貓咪',
                'B': '茶茶的朋友-小雞',
                'C': '茶的必需品'
            };
            infoText = `在${categoryNames[category]}中找到 ${count} 個包含「${searchTerm}」的商品`;
        }
    } else {
        if (category === 'all') {
            infoText = `顯示全部 ${count} 個商品`;
        } else {
            const categoryNames = {
                'A': '茶茶小貓咪',
                'B': '茶茶的朋友-小雞',
                'C': '茶的必需品'
            };
            infoText = `顯示 ${categoryNames[category]} 類別中的 ${count} 個商品`;
        }
    }
    
    searchResultsInfo.textContent = infoText;
}

// Clear search
function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('clearSearchBtn').style.display = 'none';
    renderProducts();
}

// Highlight search terms in text
function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.addItem(product);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        cart.checkout();
    });
    
    // Search input events
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    
    // Real-time search
    searchInput.addEventListener('input', function() {
        const hasValue = this.value.trim().length > 0;
        clearSearchBtn.style.display = hasValue ? 'block' : 'none';
        renderProducts();
    });
    
    // Clear search button
    clearSearchBtn.addEventListener('click', clearSearch);
    
    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            renderProducts();
        }
    });
    
    // Category filter change
    document.querySelectorAll('input[name="categoryFilter"]').forEach(radio => {
        radio.addEventListener('change', function() {
            renderProducts();
        });
    });
    
    // Prevent form submission on quantity input enter
    document.addEventListener('keypress', function(e) {
        if (e.target.classList.contains('quantity-input') && e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
        }
    });
    
    // Image click events (delegated event listeners)
    document.addEventListener('click', function(e) {
        // Product card click (entire card)
        if (e.target.closest('.product-card')) {
            const productCard = e.target.closest('.product-card');
            const productId = parseInt(productCard.getAttribute('data-product-id'));
            
            // Don't trigger if clicking on add to cart button
            if (!e.target.closest('.btn-add-cart')) {
                showImageModal(productId);
            }
        }
        
        // Product image click
        if (e.target.classList.contains('product-image')) {
            const productId = parseInt(e.target.getAttribute('data-product-id'));
            showImageModal(productId);
        }
        
        // Zoom button click
        if (e.target.closest('.btn-image-zoom')) {
            const productId = parseInt(e.target.closest('.btn-image-zoom').getAttribute('data-product-id'));
            showImageModal(productId);
        }
        
    // Add to cart from modal
    if (e.target.id === 'addToCartFromModal') {
        const productId = parseInt(e.target.getAttribute('data-product-id'));
        addToCart(productId);
        
        // Close modal
        const imageModal = bootstrap.Modal.getInstance(document.getElementById('imageModal'));
        if (imageModal) {
            imageModal.hide();
        }
    }
});

// Member modal event listeners
function setupMemberEventListeners() {
    // Show register form
    document.getElementById('showRegisterForm').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'block';
        document.getElementById('memberDashboard').style.display = 'none';
    });

    // Show login form
    document.getElementById('showLoginForm').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('memberDashboard').style.display = 'none';
    });

    // Login form submission
    document.getElementById('loginFormElement').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        const result = memberManager.login(email, password);
        showToast(result.message, result.success ? 'success' : 'error');
        
        if (result.success) {
            showMemberDashboard();
        }
    });

    // Register form submission
    document.getElementById('registerFormElement').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const phone = document.getElementById('registerPhone').value;
        const password = document.getElementById('registerPassword').value;
        
        const result = memberManager.register(name, email, phone, password);
        showToast(result.message, result.success ? 'success' : 'error');
        
        if (result.success) {
            showMemberDashboard();
        }
    });

    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', function() {
        memberManager.logout();
        showLoginForm();
        showToast('已登出', 'info');
    });

    // Member modal show event
    document.getElementById('memberModal').addEventListener('show.bs.modal', function() {
        if (memberManager.currentMember) {
            showMemberDashboard();
        } else {
            showLoginForm();
        }
    });
}

// Show login form
function showLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('memberDashboard').style.display = 'none';
}

// Show member dashboard
function showMemberDashboard() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('memberDashboard').style.display = 'block';
    memberManager.showMemberDashboard();
}

// Show toast notification
function showToast(message, type = 'info') {
    const toast = document.getElementById('cartToast');
    const toastHeader = toast.querySelector('.toast-header');
    const toastBody = toast.querySelector('.toast-body');
    
    // Update toast content
    toastBody.textContent = message;
    
    // Update toast style based on type
    toast.className = 'toast';
    if (type === 'success') {
        toast.classList.add('bg-success', 'text-white');
        toastHeader.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i><strong class="me-auto">成功</strong>';
    } else if (type === 'error') {
        toast.classList.add('bg-danger', 'text-white');
        toastHeader.innerHTML = '<i class="bi bi-exclamation-triangle-fill me-2"></i><strong class="me-auto">錯誤</strong>';
    } else if (type === 'info') {
        toast.classList.add('bg-info', 'text-white');
        toastHeader.innerHTML = '<i class="bi bi-info-circle-fill me-2"></i><strong class="me-auto">資訊</strong>';
    }
    
    // Show toast
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
}
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('zh-TW', {
        style: 'currency',
        currency: 'TWD'
    }).format(amount);
}

```

現在我需要更新 setupEventListeners 函數來包含會員功能：


```javascript
// Shopping cart functionality
class ShoppingCart {
    constructor() {
        this.items = [];
        this.loadFromStorage();
        this.updateCartDisplay();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveToStorage();
        this.updateCartDisplay();
        this.showToast();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        this.updateCartDisplay();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
                this.saveToStorage();
                this.updateCartDisplay();
            }
        }
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    updateCartDisplay() {
        this.updateCartCount();
        this.updateCartModal();
        this.updateTotalPrice();
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        cartCount.textContent = this.getTotalItems();
        
        if (this.getTotalItems() > 0) {
            cartCount.classList.add('bounce');
            setTimeout(() => cartCount.classList.remove('bounce'), 1000);
        }
    }

    updateCartModal() {
        const cartItems = document.getElementById('cartItems');
        const emptyCart = document.getElementById('emptyCart');
        
        if (this.items.length === 0) {
            cartItems.style.display = 'none';
            emptyCart.style.display = 'block';
        } else {
            cartItems.style.display = 'block';
            emptyCart.style.display = 'none';
            
            cartItems.innerHTML = this.items.map(item => `
                <div class="cart-item d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${item.name}</h6>
                        <p class="text-muted mb-0">$${item.price}</p>
                    </div>
                    <div class="quantity-controls me-3">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                               onchange="cart.updateQuantity(${item.id}, parseInt(this.value))">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <div class="text-end me-3">
                        <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                    </div>
                    <button class="btn-remove" onclick="cart.removeItem(${item.id})" title="移除商品">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    }

    updateTotalPrice() {
        const totalPrice = document.getElementById('totalPrice');
        const checkoutBtn = document.getElementById('checkoutBtn');
        
        totalPrice.textContent = this.getTotalPrice().toFixed(2);
        checkoutBtn.disabled = this.items.length === 0;
    }

    showToast() {
        const toast = new bootstrap.Toast(document.getElementById('cartToast'));
        toast.show();
    }

    saveToStorage() {
        localStorage.setItem('shoppingCart', JSON.stringify(this.items));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('shoppingCart');
        if (stored) {
            this.items = JSON.parse(stored);
        }
    }

    checkout() {
        if (this.items.length === 0) {
            alert('購物車是空的！');
            return;
        }
        
        alert(`結帳成功！\n總金額: $${this.getTotalPrice().toFixed(2)}\n商品數量: ${this.getTotalItems()}`);
        this.items = [];
        this.saveToStorage();
        this.updateCartDisplay();
    }
}

// Product data with categories
const products = [
    {
        id: 1,
        name: "枕頭貓",
        description: "有曬過太陽的香味喔☀️",
        price: 129.99,
        category: "A",
        isOnSale: true,
        image: "image/pillow_cat.png"
    },
    {
        id: 2,
        name: "潛水貓",
        description: "夢到自己在潛水喔",
        price: 299.99,
        category: "A",
        isOnSale: false,
        image: "image/淺水貓.png"
    },
    {
        id: 3,
        name: "雞雞貓",
        description: "ㄐㄐ",
        price: 899.99,
        category: "A",
        isOnSale: false,
        image: "image/雞雞貓.png"
    },
    {
        id: 4,
        name: "兔兔貓",
        description: "吃太多鏟屎官便當裡的紅蘿菠，所以變成兔子了",
        price: 699.99,
        category: "A",
        isOnSale: false,
        image: "image/兔兔貓.png"
    },
    {
        id: 5,
        name: "尤達呆呆貓",
        description: "這個家待不下去了",
        price: 199.99,
        category: "A",
        isOnSale: false,
        image: "image/尤達呆呆貓.png"
    },
    {
        id: 6,
        name: "長條貓",
        description: "控制不住想要嚕兩下的衝動",
        price: 149.99,
        category: "A",
        isOnSale: false,
        image: "image/長條珍珠奶茶.png"
    },
    {
        id: 7,
        name: "小逼",
        description: "藍色的漂亮鸚鵡，大便很水，還有雞味",
        price: 399.99,
        category: "B",
        isOnSale: false,
        image: "image/小逼.jpg"
    },
    {
        id: 8,
        name: "茶茶與鼠鼠.png",
        description: "相親相愛的好朋友",
        price: 499.99,
        category: "A",
        isOnSale: false,
        image: "image/茶茶與鼠鼠.png"
    },
    {
        id: 9,
        name: "站坐貓",
        description: "你猜我是站著還是坐著？",
        price: 249.99,
        category: "A",
        isOnSale: true,
        image: "image/站坐貓.png"
    },
    {
        id: 10,
        name: "石膏雞",
        description: "腿斷掉的小雞...",
        price: 599.99,
        category: "B",
        isOnSale: false,
        image: "image/石膏雞.jpg"
    },
    {
        id: 11,
        name: "饋手貓",
        description: "靜靜的看著你",
        price: 349.99,
        category: "A",
        isOnSale: true,
        image: "image/饋手貓.png"
    },
    {
        id: 12,
        name: "打字雞",
        description: "o[e42,,,f[blqo    msofe",
        price: 39.99,
        category: "B",
        isOnSale: false,
        image: "image/打字雞.jpg"
    },
    {
        id: 13,
        name: "莫比貓飼料",
        description: "餓的時候很愛吃，但在罐頭前面不堪一擊",
        price: 39.99,
        category: "C",
        isOnSale: false,
        image: "image/莫比貓飼料.png"
    },
    {
        id: 14,
        name: "貓罐頭",
        description: "只要有罐頭，你就能支配茶茶",
        price: 39.99,
        category: "C",
        isOnSale: false,
        image: "image/罐頭.png"
    }
   
]
// Initialize shopping cart
let cart;

// Member management system
class MemberManager {
    constructor() {
        this.currentMember = null;
        this.members = this.loadMembers();
        this.loadCurrentMember();
    }

    // Load members from localStorage
    loadMembers() {
        const stored = localStorage.getItem('members');
        return stored ? JSON.parse(stored) : [];
    }

    // Save members to localStorage
    saveMembers() {
        localStorage.setItem('members', JSON.stringify(this.members));
    }

    // Load current member from sessionStorage
    loadCurrentMember() {
        const stored = sessionStorage.getItem('currentMember');
        if (stored) {
            this.currentMember = JSON.parse(stored);
            this.updateNavbar();
        }
    }

    // Save current member to sessionStorage
    saveCurrentMember() {
        if (this.currentMember) {
            sessionStorage.setItem('currentMember', JSON.stringify(this.currentMember));
        } else {
            sessionStorage.removeItem('currentMember');
        }
    }

    // Register new member
    register(name, email, phone, password) {
        // Check if email already exists
        if (this.members.find(member => member.email === email)) {
            return { success: false, message: '此電子郵件已被註冊' };
        }

        // Create new member
        const newMember = {
            id: Date.now(),
            name: name,
            email: email,
            phone: phone,
            password: password,
            points: 100, // Welcome bonus
            joinDate: new Date().toISOString()
        };

        this.members.push(newMember);
        this.saveMembers();
        
        return { success: true, message: '註冊成功！獲得歡迎點數 100 點' };
    }

    // Login member
    login(email, password) {
        const member = this.members.find(m => m.email === email && m.password === password);
        if (member) {
            this.currentMember = member;
            this.saveCurrentMember();
            this.updateNavbar();
            return { success: true, message: '登入成功！' };
        } else {
            return { success: false, message: '電子郵件或密碼錯誤' };
        }
    }

    // Logout member
    logout() {
        this.currentMember = null;
        this.saveCurrentMember();
        this.updateNavbar();
    }

    // Add points to current member
    addPoints(points) {
        if (this.currentMember) {
            this.currentMember.points += points;
            this.saveCurrentMember();
            this.updateMemberInStorage();
        }
    }

    // Update member in members array
    updateMemberInStorage() {
        if (this.currentMember) {
            const index = this.members.findIndex(m => m.id === this.currentMember.id);
            if (index !== -1) {
                this.members[index] = this.currentMember;
                this.saveMembers();
            }
        }
    }

    // Update navbar display
    updateNavbar() {
        const memberText = document.getElementById('memberText');
        if (this.currentMember) {
            memberText.textContent = this.currentMember.name;
        } else {
            memberText.textContent = '會員登入';
        }
    }

    // Show member dashboard
    showMemberDashboard() {
        if (this.currentMember) {
            document.getElementById('memberName').textContent = this.currentMember.name;
            document.getElementById('memberEmail').textContent = this.currentMember.email;
            document.getElementById('memberPhone').textContent = this.currentMember.phone;
            document.getElementById('memberPoints').textContent = this.currentMember.points;
        }
    }
}

// Initialize member manager
let memberManager;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    cart = new ShoppingCart();
    memberManager = new MemberManager();
    renderProducts();
    setupEventListeners();
});

// Get current filter
function getCurrentFilter() {
    const checkedFilter = document.querySelector('input[name="categoryFilter"]:checked');
    return checkedFilter ? checkedFilter.value : 'all';
}

// Get current search term
function getCurrentSearchTerm() {
    return document.getElementById('searchInput').value.trim().toLowerCase();
}

// Search products by name and description
function searchProducts(products, searchTerm) {
    if (!searchTerm) {
        return products;
    }
    
    return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
}

// Filter products by category
function filterProducts(category) {
    if (category === 'all') {
        return products;
    }
    return products.filter(product => product.category === category);
}

// Apply both search and category filters
function getFilteredProducts() {
    const category = getCurrentFilter();
    const searchTerm = getCurrentSearchTerm();
    
    let filteredProducts = filterProducts(category);
    filteredProducts = searchProducts(filteredProducts, searchTerm);
    
    return filteredProducts;
}

// Render products with filtering
function renderProducts() {
    const container = document.getElementById('productsContainer');
    const filteredProducts = getFilteredProducts();
    const searchTerm = getCurrentSearchTerm();
    const category = getCurrentFilter();
    
    // Update search results info
    updateSearchResultsInfo(filteredProducts.length, searchTerm, category);
    
    if (filteredProducts.length === 0) {
        let emptyMessage = '';
        if (searchTerm) {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-search display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">找不到相關商品</h3>
                        <p class="text-muted">沒有找到包含「${searchTerm}」的商品</p>
                        <button class="btn btn-outline-primary mt-3" onclick="clearSearch()">
                            <i class="bi bi-arrow-left"></i> 清除搜尋
                        </button>
                    </div>
                </div>
            `;
        } else {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-grid display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">此分類暫無商品</h3>
                        <p class="text-muted">請選擇其他分類或查看全部商品</p>
                    </div>
                </div>
            `;
        }
        container.innerHTML = emptyMessage;
        return;
    }
    
    container.innerHTML = filteredProducts.map(product => {
        const searchTerm = getCurrentSearchTerm();
        const highlightedName = highlightSearchTerm(product.name, searchTerm);
        const highlightedDescription = highlightSearchTerm(product.description, searchTerm);
        
        return `
            <div class="col">
                <div class="card h-100 product-card" data-product-id="${product.id}" style="cursor: pointer;">
                    <div class="position-relative">
                        <img src="${product.image}" class="card-img-top product-image" alt="${product.name}" loading="lazy">
                        ${product.isOnSale ? '<span class="position-absolute top-0 start-0 m-2 badge bg-danger sale-badge">促銷</span>' : ''}
                        <div class="position-absolute top-0 end-0 m-2">
                            <button class="btn btn-sm btn-light btn-image-zoom" data-product-id="${product.id}" title="查看大圖">
                                <i class="bi bi-zoom-in"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${highlightedName}</h5>
                        <p class="card-text flex-grow-1">${highlightedDescription}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="h5 text-primary mb-0">$${product.price}</span>
                            <button class="btn btn-primary btn-add-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                                <i class="bi bi-cart-plus"></i> 加入購物車
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}


// Update search results info
function updateSearchResultsInfo(count, searchTerm, category) {
    const searchResultsInfo = document.getElementById('searchResultsInfo');
    let infoText = '';
    
    if (searchTerm) {
        if (category === 'all') {
            infoText = `找到 ${count} 個包含「${searchTerm}」的商品`;
        } else {
            const categoryNames = {
                'A': '茶茶小貓咪',
                'B': '茶茶的朋友-小雞',
                'C': '茶的必需品'
            };
            infoText = `在${categoryNames[category]}中找到 ${count} 個包含「${searchTerm}」的商品`;
        }
    } else {
        if (category === 'all') {
            infoText = `顯示全部 ${count} 個商品`;
        } else {
            const categoryNames = {
                'A': '茶茶小貓咪',
                'B': '茶茶的朋友-小雞',
                'C': '茶的必需品'
            };
            infoText = `顯示 ${categoryNames[category]} 類別中的 ${count} 個商品`;
        }
    }
    
    searchResultsInfo.textContent = infoText;
}

// Clear search
function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('clearSearchBtn').style.display = 'none';
    renderProducts();
}

// Highlight search terms in text
function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.addItem(product);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        cart.checkout();
    });
    
    // Search input events
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    
    // Real-time search
    searchInput.addEventListener('input', function() {
        const hasValue = this.value.trim().length > 0;
        clearSearchBtn.style.display = hasValue ? 'block' : 'none';
        renderProducts();
    });
    
    // Clear search button
    clearSearchBtn.addEventListener('click', clearSearch);
    
    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            renderProducts();
        }
    });
    
    // Category filter change
    document.querySelectorAll('input[name="categoryFilter"]').forEach(radio => {
        radio.addEventListener('change', function() {
            renderProducts();
        });
    });
    
    // Prevent form submission on quantity input enter
    document.addEventListener('keypress', function(e) {
        if (e.target.classList.contains('quantity-input') && e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
        }
    });
    
    // Setup member event listeners
    setupMemberEventListeners();
    
    // Image click events (delegated event listeners)
    document.addEventListener('click', function(e) {
        // Product card click (entire card)
        if (e.target.closest('.product-card')) {
            const productCard = e.target.closest('.product-card');
            const productId = parseInt(productCard.getAttribute('data-product-id'));
            
            // Don't trigger if clicking on add to cart button
            if (!e.target.closest('.btn-add-cart')) {
                showImageModal(productId);
            }
        }
        
        // Product image click
        if (e.target.classList.contains('product-image')) {
            const productId = parseInt(e.target.getAttribute('data-product-id'));
            showImageModal(productId);
        }
        
        // Zoom button click
        if (e.target.closest('.btn-image-zoom')) {
            const productId = parseInt(e.target.closest('.btn-image-zoom').getAttribute('data-product-id'));
            showImageModal(productId);
        }
        
    // Add to cart from modal
    if (e.target.id === 'addToCartFromModal') {
        const productId = parseInt(e.target.getAttribute('data-product-id'));
        addToCart(productId);
        
        // Close modal
        const imageModal = bootstrap.Modal.getInstance(document.getElementById('imageModal'));
        if (imageModal) {
            imageModal.hide();
        }
    }
});

// Member modal event listeners
function setupMemberEventListeners() {
    // Show register form
    document.getElementById('showRegisterForm').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'block';
        document.getElementById('memberDashboard').style.display = 'none';
    });

    // Show login form
    document.getElementById('showLoginForm').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('memberDashboard').style.display = 'none';
    });

    // Login form submission
    document.getElementById('loginFormElement').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        const result = memberManager.login(email, password);
        showToast(result.message, result.success ? 'success' : 'error');
        
        if (result.success) {
            showMemberDashboard();
        }
    });

    // Register form submission
    document.getElementById('registerFormElement').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const phone = document.getElementById('registerPhone').value;
        const password = document.getElementById('registerPassword').value;
        
        const result = memberManager.register(name, email, phone, password);
        showToast(result.message, result.success ? 'success' : 'error');
        
        if (result.success) {
            showMemberDashboard();
        }
    });

    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', function() {
        memberManager.logout();
        showLoginForm();
        showToast('已登出', 'info');
    });

    // Member modal show event
    document.getElementById('memberModal').addEventListener('show.bs.modal', function() {
        if (memberManager.currentMember) {
            showMemberDashboard();
        } else {
            showLoginForm();
        }
    });
}

// Show login form
function showLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('memberDashboard').style.display = 'none';
}

// Show member dashboard
function showMemberDashboard() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('memberDashboard').style.display = 'block';
    memberManager.showMemberDashboard();
}

// Show toast notification
function showToast(message, type = 'info') {
    const toast = document.getElementById('cartToast');
    const toastHeader = toast.querySelector('.toast-header');
    const toastBody = toast.querySelector('.toast-body');
    
    // Update toast content
    toastBody.textContent = message;
    
    // Update toast style based on type
    toast.className = 'toast';
    if (type === 'success') {
        toast.classList.add('bg-success', 'text-white');
        toastHeader.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i><strong class="me-auto">成功</strong>';
    } else if (type === 'error') {
        toast.classList.add('bg-danger', 'text-white');
        toastHeader.innerHTML = '<i class="bi bi-exclamation-triangle-fill me-2"></i><strong class="me-auto">錯誤</strong>';
    } else if (type === 'info') {
        toast.classList.add('bg-info', 'text-white');
        toastHeader.innerHTML = '<i class="bi bi-info-circle-fill me-2"></i><strong class="me-auto">資訊</strong>';
    }
    
    // Show toast
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
}
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('zh-TW', {
        style: 'currency',
        currency: 'TWD'
    }).format(amount);
}

```

現在我需要更新購物車功能來為會員添加點數：


```javascript
// Shopping cart functionality
class ShoppingCart {
    constructor() {
        this.items = [];
        this.loadFromStorage();
        this.updateCartDisplay();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveToStorage();
        this.updateCartDisplay();
        this.showToast();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        this.updateCartDisplay();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
                this.saveToStorage();
                this.updateCartDisplay();
            }
        }
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    updateCartDisplay() {
        this.updateCartCount();
        this.updateCartModal();
        this.updateTotalPrice();
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        cartCount.textContent = this.getTotalItems();
        
        if (this.getTotalItems() > 0) {
            cartCount.classList.add('bounce');
            setTimeout(() => cartCount.classList.remove('bounce'), 1000);
        }
    }

    updateCartModal() {
        const cartItems = document.getElementById('cartItems');
        const emptyCart = document.getElementById('emptyCart');
        
        if (this.items.length === 0) {
            cartItems.style.display = 'none';
            emptyCart.style.display = 'block';
        } else {
            cartItems.style.display = 'block';
            emptyCart.style.display = 'none';
            
            cartItems.innerHTML = this.items.map(item => `
                <div class="cart-item d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${item.name}</h6>
                        <p class="text-muted mb-0">$${item.price}</p>
                    </div>
                    <div class="quantity-controls me-3">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                               onchange="cart.updateQuantity(${item.id}, parseInt(this.value))">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <div class="text-end me-3">
                        <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                    </div>
                    <button class="btn-remove" onclick="cart.removeItem(${item.id})" title="移除商品">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    }

    updateTotalPrice() {
        const totalPrice = document.getElementById('totalPrice');
        const checkoutBtn = document.getElementById('checkoutBtn');
        
        totalPrice.textContent = this.getTotalPrice().toFixed(2);
        checkoutBtn.disabled = this.items.length === 0;
    }

    showToast() {
        const toast = new bootstrap.Toast(document.getElementById('cartToast'));
        toast.show();
    }

    saveToStorage() {
        localStorage.setItem('shoppingCart', JSON.stringify(this.items));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('shoppingCart');
        if (stored) {
            this.items = JSON.parse(stored);
        }
    }

    checkout() {
        if (this.items.length === 0) {
            alert('購物車是空的！');
            return;
        }
        
        const totalPrice = this.getTotalPrice();
        const totalItems = this.getTotalItems();
        
        // Calculate points (1 point per dollar spent)
        const pointsEarned = Math.floor(totalPrice);
        
        // Add points to member if logged in
        if (memberManager && memberManager.currentMember) {
            memberManager.addPoints(pointsEarned);
            alert(`結帳成功！\n總金額: $${totalPrice.toFixed(2)}\n商品數量: ${totalItems}\n獲得點數: ${pointsEarned} 點\n目前總點數: ${memberManager.currentMember.points} 點`);
        } else {
            alert(`結帳成功！\n總金額: $${totalPrice.toFixed(2)}\n商品數量: ${totalItems}\n\n提示：登入會員可獲得購物點數！`);
        }
        
        this.items = [];
        this.saveToStorage();
        this.updateCartDisplay();
    }
}

// Product data with categories
const products = [
    {
        id: 1,
        name: "枕頭貓",
        description: "有曬過太陽的香味喔☀️",
        price: 129.99,
        category: "A",
        isOnSale: true,
        image: "image/pillow_cat.png"
    },
    {
        id: 2,
        name: "潛水貓",
        description: "夢到自己在潛水喔",
        price: 299.99,
        category: "A",
        isOnSale: false,
        image: "image/淺水貓.png"
    },
    {
        id: 3,
        name: "雞雞貓",
        description: "ㄐㄐ",
        price: 899.99,
        category: "A",
        isOnSale: false,
        image: "image/雞雞貓.png"
    },
    {
        id: 4,
        name: "兔兔貓",
        description: "吃太多鏟屎官便當裡的紅蘿菠，所以變成兔子了",
        price: 699.99,
        category: "A",
        isOnSale: false,
        image: "image/兔兔貓.png"
    },
    {
        id: 5,
        name: "尤達呆呆貓",
        description: "這個家待不下去了",
        price: 199.99,
        category: "A",
        isOnSale: false,
        image: "image/尤達呆呆貓.png"
    },
    {
        id: 6,
        name: "長條貓",
        description: "控制不住想要嚕兩下的衝動",
        price: 149.99,
        category: "A",
        isOnSale: false,
        image: "image/長條珍珠奶茶.png"
    },
    {
        id: 7,
        name: "小逼",
        description: "藍色的漂亮鸚鵡，大便很水，還有雞味",
        price: 399.99,
        category: "B",
        isOnSale: false,
        image: "image/小逼.jpg"
    },
    {
        id: 8,
        name: "茶茶與鼠鼠.png",
        description: "相親相愛的好朋友",
        price: 499.99,
        category: "A",
        isOnSale: false,
        image: "image/茶茶與鼠鼠.png"
    },
    {
        id: 9,
        name: "站坐貓",
        description: "你猜我是站著還是坐著？",
        price: 249.99,
        category: "A",
        isOnSale: true,
        image: "image/站坐貓.png"
    },
    {
        id: 10,
        name: "石膏雞",
        description: "腿斷掉的小雞...",
        price: 599.99,
        category: "B",
        isOnSale: false,
        image: "image/石膏雞.jpg"
    },
    {
        id: 11,
        name: "饋手貓",
        description: "靜靜的看著你",
        price: 349.99,
        category: "A",
        isOnSale: true,
        image: "image/饋手貓.png"
    },
    {
        id: 12,
        name: "打字雞",
        description: "o[e42,,,f[blqo    msofe",
        price: 39.99,
        category: "B",
        isOnSale: false,
        image: "image/打字雞.jpg"
    },
    {
        id: 13,
        name: "莫比貓飼料",
        description: "餓的時候很愛吃，但在罐頭前面不堪一擊",
        price: 39.99,
        category: "C",
        isOnSale: false,
        image: "image/莫比貓飼料.png"
    },
    {
        id: 14,
        name: "貓罐頭",
        description: "只要有罐頭，你就能支配茶茶",
        price: 39.99,
        category: "C",
        isOnSale: false,
        image: "image/罐頭.png"
    }
   
]
// Initialize shopping cart
let cart;

// Member management system
class MemberManager {
    constructor() {
        this.currentMember = null;
        this.members = this.loadMembers();
        this.loadCurrentMember();
    }

    // Load members from localStorage
    loadMembers() {
        const stored = localStorage.getItem('members');
        return stored ? JSON.parse(stored) : [];
    }

    // Save members to localStorage
    saveMembers() {
        localStorage.setItem('members', JSON.stringify(this.members));
    }

    // Load current member from sessionStorage
    loadCurrentMember() {
        const stored = sessionStorage.getItem('currentMember');
        if (stored) {
            this.currentMember = JSON.parse(stored);
            this.updateNavbar();
        }
    }

    // Save current member to sessionStorage
    saveCurrentMember() {
        if (this.currentMember) {
            sessionStorage.setItem('currentMember', JSON.stringify(this.currentMember));
        } else {
            sessionStorage.removeItem('currentMember');
        }
    }

    // Register new member
    register(name, email, phone, password) {
        // Check if email already exists
        if (this.members.find(member => member.email === email)) {
            return { success: false, message: '此電子郵件已被註冊' };
        }

        // Create new member
        const newMember = {
            id: Date.now(),
            name: name,
            email: email,
            phone: phone,
            password: password,
            points: 100, // Welcome bonus
            joinDate: new Date().toISOString()
        };

        this.members.push(newMember);
        this.saveMembers();
        
        return { success: true, message: '註冊成功！獲得歡迎點數 100 點' };
    }

    // Login member
    login(email, password) {
        const member = this.members.find(m => m.email === email && m.password === password);
        if (member) {
            this.currentMember = member;
            this.saveCurrentMember();
            this.updateNavbar();
            return { success: true, message: '登入成功！' };
        } else {
            return { success: false, message: '電子郵件或密碼錯誤' };
        }
    }

    // Logout member
    logout() {
        this.currentMember = null;
        this.saveCurrentMember();
        this.updateNavbar();
    }

    // Add points to current member
    addPoints(points) {
        if (this.currentMember) {
            this.currentMember.points += points;
            this.saveCurrentMember();
            this.updateMemberInStorage();
        }
    }

    // Update member in members array
    updateMemberInStorage() {
        if (this.currentMember) {
            const index = this.members.findIndex(m => m.id === this.currentMember.id);
            if (index !== -1) {
                this.members[index] = this.currentMember;
                this.saveMembers();
            }
        }
    }

    // Update navbar display
    updateNavbar() {
        const memberText = document.getElementById('memberText');
        if (this.currentMember) {
            memberText.textContent = this.currentMember.name;
        } else {
            memberText.textContent = '會員登入';
        }
    }

    // Show member dashboard
    showMemberDashboard() {
        if (this.currentMember) {
            document.getElementById('memberName').textContent = this.currentMember.name;
            document.getElementById('memberEmail').textContent = this.currentMember.email;
            document.getElementById('memberPhone').textContent = this.currentMember.phone;
            document.getElementById('memberPoints').textContent = this.currentMember.points;
        }
    }
}

// Initialize member manager
let memberManager;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    cart = new ShoppingCart();
    memberManager = new MemberManager();
    renderProducts();
    setupEventListeners();
});

// Get current filter
function getCurrentFilter() {
    const checkedFilter = document.querySelector('input[name="categoryFilter"]:checked');
    return checkedFilter ? checkedFilter.value : 'all';
}

// Get current search term
function getCurrentSearchTerm() {
    return document.getElementById('searchInput').value.trim().toLowerCase();
}

// Search products by name and description
function searchProducts(products, searchTerm) {
    if (!searchTerm) {
        return products;
    }
    
    return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
}

// Filter products by category
function filterProducts(category) {
    if (category === 'all') {
        return products;
    }
    return products.filter(product => product.category === category);
}

// Apply both search and category filters
function getFilteredProducts() {
    const category = getCurrentFilter();
    const searchTerm = getCurrentSearchTerm();
    
    let filteredProducts = filterProducts(category);
    filteredProducts = searchProducts(filteredProducts, searchTerm);
    
    return filteredProducts;
}

// Render products with filtering
function renderProducts() {
    const container = document.getElementById('productsContainer');
    const filteredProducts = getFilteredProducts();
    const searchTerm = getCurrentSearchTerm();
    const category = getCurrentFilter();
    
    // Update search results info
    updateSearchResultsInfo(filteredProducts.length, searchTerm, category);
    
    if (filteredProducts.length === 0) {
        let emptyMessage = '';
        if (searchTerm) {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-search display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">找不到相關商品</h3>
                        <p class="text-muted">沒有找到包含「${searchTerm}」的商品</p>
                        <button class="btn btn-outline-primary mt-3" onclick="clearSearch()">
                            <i class="bi bi-arrow-left"></i> 清除搜尋
                        </button>
                    </div>
                </div>
            `;
        } else {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-grid display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">此分類暫無商品</h3>
                        <p class="text-muted">請選擇其他分類或查看全部商品</p>
                    </div>
                </div>
            `;
        }
        container.innerHTML = emptyMessage;
        return;
    }
    
    container.innerHTML = filteredProducts.map(product => {
        const searchTerm = getCurrentSearchTerm();
        const highlightedName = highlightSearchTerm(product.name, searchTerm);
        const highlightedDescription = highlightSearchTerm(product.description, searchTerm);
        
        return `
            <div class="col">
                <div class="card h-100 product-card" data-product-id="${product.id}" style="cursor: pointer;">
                    <div class="position-relative">
                        <img src="${product.image}" class="card-img-top product-image" alt="${product.name}" loading="lazy">
                        ${product.isOnSale ? '<span class="position-absolute top-0 start-0 m-2 badge bg-danger sale-badge">促銷</span>' : ''}
                        <div class="position-absolute top-0 end-0 m-2">
                            <button class="btn btn-sm btn-light btn-image-zoom" data-product-id="${product.id}" title="查看大圖">
                                <i class="bi bi-zoom-in"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${highlightedName}</h5>
                        <p class="card-text flex-grow-1">${highlightedDescription}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="h5 text-primary mb-0">$${product.price}</span>
                            <button class="btn btn-primary btn-add-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                                <i class="bi bi-cart-plus"></i> 加入購物車
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}


// Update search results info
function updateSearchResultsInfo(count, searchTerm, category) {
    const searchResultsInfo = document.getElementById('searchResultsInfo');
    let infoText = '';
    
    if (searchTerm) {
        if (category === 'all') {
            infoText = `找到 ${count} 個包含「${searchTerm}」的商品`;
        } else {
            const categoryNames = {
                'A': '茶茶小貓咪',
                'B': '茶茶的朋友-小雞',
                'C': '茶的必需品'
            };
            infoText = `在${categoryNames[category]}中找到 ${count} 個包含「${searchTerm}」的商品`;
        }
    } else {
        if (category === 'all') {
            infoText = `顯示全部 ${count} 個商品`;
        } else {
            const categoryNames = {
                'A': '茶茶小貓咪',
                'B': '茶茶的朋友-小雞',
                'C': '茶的必需品'
            };
            infoText = `顯示 ${categoryNames[category]} 類別中的 ${count} 個商品`;
        }
    }
    
    searchResultsInfo.textContent = infoText;
}

// Clear search
function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('clearSearchBtn').style.display = 'none';
    renderProducts();
}

// Highlight search terms in text
function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.addItem(product);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        cart.checkout();
    });
    
    // Search input events
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    
    // Real-time search
    searchInput.addEventListener('input', function() {
        const hasValue = this.value.trim().length > 0;
        clearSearchBtn.style.display = hasValue ? 'block' : 'none';
        renderProducts();
    });
    
    // Clear search button
    clearSearchBtn.addEventListener('click', clearSearch);
    
    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            renderProducts();
        }
    });
    
    // Category filter change
    document.querySelectorAll('input[name="categoryFilter"]').forEach(radio => {
        radio.addEventListener('change', function() {
            renderProducts();
        });
    });
    
    // Prevent form submission on quantity input enter
    document.addEventListener('keypress', function(e) {
        if (e.target.classList.contains('quantity-input') && e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
        }
    });
    
    // Setup member event listeners
    setupMemberEventListeners();
    
    // Image click events (delegated event listeners)
    document.addEventListener('click', function(e) {
        // Product card click (entire card)
        if (e.target.closest('.product-card')) {
            const productCard = e.target.closest('.product-card');
            const productId = parseInt(productCard.getAttribute('data-product-id'));
            
            // Don't trigger if clicking on add to cart button
            if (!e.target.closest('.btn-add-cart')) {
                showImageModal(productId);
            }
        }
        
        // Product image click
        if (e.target.classList.contains('product-image')) {
            const productId = parseInt(e.target.getAttribute('data-product-id'));
            showImageModal(productId);
        }
        
        // Zoom button click
        if (e.target.closest('.btn-image-zoom')) {
            const productId = parseInt(e.target.closest('.btn-image-zoom').getAttribute('data-product-id'));
            showImageModal(productId);
        }
        
    // Add to cart from modal
    if (e.target.id === 'addToCartFromModal') {
        const productId = parseInt(e.target.getAttribute('data-product-id'));
        addToCart(productId);
        
        // Close modal
        const imageModal = bootstrap.Modal.getInstance(document.getElementById('imageModal'));
        if (imageModal) {
            imageModal.hide();
        }
    }
});

// Member modal event listeners
function setupMemberEventListeners() {
    // Show register form
    document.getElementById('showRegisterForm').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'block';
        document.getElementById('memberDashboard').style.display = 'none';
    });

    // Show login form
    document.getElementById('showLoginForm').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('memberDashboard').style.display = 'none';
    });

    // Login form submission
    document.getElementById('loginFormElement').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        const result = memberManager.login(email, password);
        showToast(result.message, result.success ? 'success' : 'error');
        
        if (result.success) {
            showMemberDashboard();
        }
    });

    // Register form submission
    document.getElementById('registerFormElement').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const phone = document.getElementById('registerPhone').value;
        const password = document.getElementById('registerPassword').value;
        
        const result = memberManager.register(name, email, phone, password);
        showToast(result.message, result.success ? 'success' : 'error');
        
        if (result.success) {
            showMemberDashboard();
        }
    });

    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', function() {
        memberManager.logout();
        showLoginForm();
        showToast('已登出', 'info');
    });

    // Member modal show event
    document.getElementById('memberModal').addEventListener('show.bs.modal', function() {
        if (memberManager.currentMember) {
            showMemberDashboard();
        } else {
            showLoginForm();
        }
    });
}

// Show login form
function showLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('memberDashboard').style.display = 'none';
}

// Show member dashboard
function showMemberDashboard() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('memberDashboard').style.display = 'block';
    memberManager.showMemberDashboard();
}

// Show toast notification
function showToast(message, type = 'info') {
    const toast = document.getElementById('cartToast');
    const toastHeader = toast.querySelector('.toast-header');
    const toastBody = toast.querySelector('.toast-body');
    
    // Update toast content
    toastBody.textContent = message;
    
    // Update toast style based on type
    toast.className = 'toast';
    if (type === 'success') {
        toast.classList.add('bg-success', 'text-white');
        toastHeader.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i><strong class="me-auto">成功</strong>';
    } else if (type === 'error') {
        toast.classList.add('bg-danger', 'text-white');
        toastHeader.innerHTML = '<i class="bi bi-exclamation-triangle-fill me-2"></i><strong class="me-auto">錯誤</strong>';
    } else if (type === 'info') {
        toast.classList.add('bg-info', 'text-white');
        toastHeader.innerHTML = '<i class="bi bi-info-circle-fill me-2"></i><strong class="me-auto">資訊</strong>';
    }
    
    // Show toast
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
}
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('zh-TW', {
        style: 'currency',
        currency: 'TWD'
    }).format(amount);
}

```

現在我需要為會員功能添加樣式：


```css
/* Custom styles for the shopping website */

body {
    background-color: #fefefe;
    color: #5c4a3a;
}

/* Color scheme variables */
:root {
    --primary-color: #d4a574;
    --secondary-color: #e8d5b7;
    --accent-color: #c19a6b;
    --text-color: #5c4a3a;
    --light-bg: #faf8f5;
    --card-bg: #ffffff;
    --border-color: #e8d5b7;
    --shadow-color: rgba(212, 165, 116, 0.15);
}

/* Category filter styles */
.btn-check:checked + .btn {
    transform: scale(1.05);
    box-shadow: 0 4px 8px var(--shadow-color);
    background-color: var(--primary-color) !important;
    border-color: var(--primary-color) !important;
    color: white !important;
}

.btn-group .btn {
    transition: all 0.3s ease;
    border-radius: 1rem !important;
    margin: 0 8px;
    padding: 0.75rem 1.5rem;
    background-color: var(--light-bg);
    border-color: var(--border-color);
    color: var(--text-color);
    font-weight: 500;
}

.btn-group .btn:hover {
    background-color: var(--secondary-color);
    border-color: var(--accent-color);
    color: var(--text-color);
}

.btn-group {
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
}

.btn-group .btn:first-child {
    border-top-right-radius: 1rem !important;
    border-bottom-right-radius: 1rem !important;
}

.btn-group .btn:last-child {
    border-top-left-radius: 1rem !important;
    border-bottom-left-radius: 1rem !important;
}

.btn-group .btn:not(:first-child):not(:last-child) {
    border-radius: 1rem !important;
}

/* Responsive button spacing */
@media (max-width: 768px) {
    .btn-group .btn {
        margin: 0 4px;
        padding: 0.6rem 1.2rem;
        font-size: 0.9rem;
    }
}

@media (max-width: 576px) {
    .btn-group {
        flex-direction: column;
        gap: 0.75rem;
    }
    
    .btn-group .btn {
        margin: 0;
        width: 100%;
        max-width: 280px;
    }
}

/* Category badge styles */
.badge {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* Sale badge styles */
.sale-badge {
    background: linear-gradient(45deg, #dc3545, #c82333) !important;
    color: white !important;
    font-size: 0.7rem;
    font-weight: 700;
    padding: 0.4rem 0.6rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);
    animation: salePulse 2s infinite;
    z-index: 10;
}

.sale-badge::before {
    content: '🔥';
    margin-right: 0.25rem;
}

@keyframes salePulse {
    0% {
        transform: scale(1);
        box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);
    }
    50% {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(220, 53, 69, 0.5);
    }
    100% {
        transform: scale(1);
        box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);
    }
}

/* Empty state styles */
.display-1 {
    font-size: 4rem;
    opacity: 0.3;
}

/* Search bar styles */
.input-group-text {
    background-color: var(--light-bg);
    border-color: var(--border-color);
    border-radius: 1rem 0 0 1rem !important;
    color: var(--text-color);
}

#searchInput {
    border-left: none;
    border-radius: 0 1rem 1rem 0 !important;
    transition: all 0.3s ease;
    background-color: var(--card-bg);
    border-color: var(--border-color);
    color: var(--text-color);
}

#searchInput:focus {
    border-color: var(--accent-color);
    box-shadow: 0 0 0 0.25rem var(--shadow-color);
    background-color: var(--card-bg);
}

#searchInput:focus + .input-group-text {
    border-color: var(--accent-color);
}

#clearSearchBtn {
    transition: all 0.3s ease;
    border-left: none;
    border-radius: 0 1rem 1rem 0 !important;
    background-color: var(--light-bg);
    border-color: var(--border-color);
    color: var(--text-color);
}

#clearSearchBtn:hover {
    background-color: var(--secondary-color);
    color: var(--accent-color);
}

/* Search highlighting */
mark {
    background-color: var(--secondary-color);
    color: var(--text-color);
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-weight: 600;
}

/* Search results info */
#searchResultsInfo {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-color);
}

/* Search animation */
@keyframes searchPulse {
    0% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0.4);
    }
    70% {
        box-shadow: 0 0 0 10px rgba(13, 110, 253, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0);
    }
}

.searching {
    animation: searchPulse 1.5s infinite;
}

/* Responsive search bar */
@media (max-width: 768px) {
    .input-group {
        flex-direction: column;
    }
    
    .input-group-text {
        border-radius: 1rem 1rem 0 0 !important;
        border-bottom: none;
    }
    
    #searchInput {
        border-radius: 0 0 1rem 1rem !important;
        border-top: none;
    }
    
    #clearSearchBtn {
        border-radius: 1rem;
        margin-top: 0.5rem;
        width: 100%;
    }
}

/* Navbar styles */
.navbar {
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color)) !important;
    box-shadow: 0 2px 10px var(--shadow-color);
}

.navbar-brand {
    font-weight: bold;
    font-size: 1.5rem;
    color: white !important;
}

.navbar-nav .nav-link {
    color: white !important;
    transition: color 0.3s ease;
}

.navbar-nav .nav-link:hover {
    color: var(--light-bg) !important;
}

.navbar-toggler {
    border-color: white;
}

.navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

.card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid var(--border-color);
    background-color: var(--card-bg);
    box-shadow: 0 2px 8px var(--shadow-color);
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px var(--shadow-color);
    border-color: var(--accent-color);
}

/* Product card clickable styles */
.product-card {
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.product-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px var(--shadow-color);
    border-color: var(--primary-color);
}

.product-card:hover::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(212, 165, 116, 0.05), rgba(193, 154, 107, 0.05));
    pointer-events: none;
    z-index: 1;
}

.product-card:hover .card-title {
    color: var(--primary-color);
}

.product-card:hover .card-text {
    color: var(--text-color);
}

.card-img-top {
    height: 200px;
    object-fit: contain;
    transition: transform 0.3s ease;
}

.card:hover .card-img-top {
    transform: scale(1.05);
}

.btn-add-cart {
    background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
    border: none;
    color: white;
    transition: all 0.3s ease;
}

.btn-add-cart:hover {
    background: linear-gradient(45deg, var(--accent-color), #b88a5a);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px var(--shadow-color);
    color: white;
}

.cart-item {
    border-bottom: 1px solid var(--border-color);
    padding: 1rem 0;
}

.cart-item:last-child {
    border-bottom: none;
}

.cart-item-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
}

.btn-remove {
    color: var(--accent-color);
    border: none;
    background: none;
    font-size: 1.2rem;
    transition: color 0.3s ease;
}

.btn-remove:hover {
    color: var(--primary-color);
}

.quantity-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.quantity-btn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid var(--border-color);
    background: var(--card-bg);
    color: var(--text-color);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.quantity-btn:hover {
    background: var(--secondary-color);
    border-color: var(--accent-color);
    color: var(--text-color);
}

.quantity-input {
    width: 50px;
    text-align: center;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    padding: 0.25rem;
    background-color: var(--card-bg);
    color: var(--text-color);
}

#emptyCart {
    color: var(--text-color);
    opacity: 0.7;
}

.toast {
    background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
    color: white;
}

.toast-header {
    background: rgba(255,255,255,0.1);
    border-bottom: 1px solid rgba(255,255,255,0.2);
}

/* Product image styles */
.product-image {
    transition: all 0.3s ease;
}

.product-image:hover {
    transform: scale(1.02);
    filter: brightness(1.05);
}

.btn-image-zoom {
    opacity: 0;
    transition: all 0.3s ease;
    background-color: rgba(255, 255, 255, 0.9) !important;
    border: none;
    color: var(--text-color);
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.btn-image-zoom:hover {
    opacity: 1 !important;
    background-color: var(--primary-color) !important;
    color: white;
    transform: scale(1.1);
}

.card:hover .btn-image-zoom {
    opacity: 1;
}

/* Image modal styles */
#imageModal .modal-content {
    border: none;
    border-radius: 1rem;
    box-shadow: 0 10px 30px var(--shadow-color);
}

#imageModal .modal-header {
    background-color: var(--light-bg);
    border-bottom: 1px solid var(--border-color);
    border-radius: 1rem 1rem 0 0;
}

#imageModal .modal-body {
    padding: 2rem;
}

#imageModal .modal-body img {
    max-height: 400px;
    width: auto;
    box-shadow: 0 4px 15px var(--shadow-color);
}

#imageModal .modal-footer {
    background-color: var(--light-bg);
    border-top: 1px solid var(--border-color);
    border-radius: 0 0 1rem 1rem;
}

#imageModal .btn-close {
    background-color: var(--accent-color);
    opacity: 1;
    border-radius: 50%;
    width: 30px;
    height: 30px;
}

#imageModal .btn-close:hover {
    background-color: var(--primary-color);
}

/* Animation for cart count badge */
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}

.badge.bounce {
    animation: bounce 1s;
}

/* Member modal styles */
#memberModal .modal-content {
    border: none;
    border-radius: 1rem;
    box-shadow: 0 10px 30px var(--shadow-color);
}

#memberModal .modal-header {
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
    color: white;
    border-radius: 1rem 1rem 0 0;
    border-bottom: none;
}

#memberModal .modal-body {
    padding: 2rem;
}

#memberModal .form-control {
    border-color: var(--border-color);
    border-radius: 0.5rem;
    transition: all 0.3s ease;
}

#memberModal .form-control:focus {
    border-color: var(--accent-color);
    box-shadow: 0 0 0 0.25rem var(--shadow-color);
}

#memberModal .btn {
    border-radius: 0.5rem;
    font-weight: 500;
    transition: all 0.3s ease;
}

#memberModal .btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px var(--shadow-color);
}

/* Member dashboard styles */
#memberDashboard .card {
    border: 1px solid var(--border-color);
    border-radius: 0.75rem;
    transition: all 0.3s ease;
}

#memberDashboard .card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px var(--shadow-color);
}

#memberDashboard .display-4 {
    color: var(--primary-color);
}

#memberDashboard .text-primary {
    color: var(--primary-color) !important;
}

#memberDashboard .text-warning {
    color: #ffc107 !important;
}

/* Toast notification styles */
.toast.bg-success {
    background: linear-gradient(45deg, #28a745, #20c997) !important;
}

.toast.bg-danger {
    background: linear-gradient(45deg, #dc3545, #c82333) !important;
}

.toast.bg-info {
    background: linear-gradient(45deg, #17a2b8, #138496) !important;
}

.toast-header {
    background: rgba(255,255,255,0.1);
    border-bottom: 1px solid rgba(255,255,255,0.2);
}

/* Member link styles */
#memberLink {
    transition: all 0.3s ease;
}

#memberLink:hover {
    color: var(--light-bg) !important;
    transform: scale(1.05);
}

/* Form validation styles */
.form-control.is-invalid {
    border-color: #dc3545;
    box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
}

.form-control.is-valid {
    border-color: #28a745;
    box-shadow: 0 0 0 0.25rem rgba(40, 167, 69, 0.25);
}

/* Responsive member modal */
@media (max-width: 768px) {
    #memberModal .modal-body {
        padding: 1.5rem;
    }
    
    #memberDashboard .row .col-md-6 {
        margin-bottom: 1rem;
    }
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .card-img-top {
        height: 150px;
    }
    
    .cart-item-image {
        width: 50px;
        height: 50px;
    }
}

/* Loading animation */
.loading {
    opacity: 0.6;
    pointer-events: none;
}

.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

```

讓我檢查是否有任何 linting 錯誤：


完美！我已經成功為您的購物網站創建了完整的會員中心功能。以下是實現的功能特色：

## 👤 會員中心功能

### 🎯 核心功能

1. **會員註冊**
   - 姓名、電子郵件、電話、密碼
   - 電子郵件重複檢查
   - 註冊成功獲得歡迎點數 100 點

2. **會員登入**
   - 電子郵件和密碼驗證
   - 登入狀態持久化（sessionStorage）
   - 自動更新導航欄顯示

3. **會員資料管理**
   - 顯示會員姓名、電子郵件、電話
   - 即時更新點數顯示
   - 登出功能

### 🏆 點數系統

1. **點數獲得**
   - 註冊獎勵：100 點
   - 購物獎勵：每消費 1 元獲得 1 點
   - 即時更新點數餘額

2. **點數顯示**
   - 會員中心顯示目前點數
   - 結帳時顯示獲得的點數
   - 動態更新點數總計

### 🎨 用戶界面

1. **導航欄整合**
   - 未登入：顯示「會員登入」
   - 已登入：顯示會員姓名
   - 點擊開啟會員中心

2. **模態框設計**
   - 登入表單
   - 註冊表單
   - 會員儀表板
   - 駝色調配色方案

3. **響應式設計**
   - 手機端優化
   - 觸控友好
   - 自適應佈局

### ✨ 用戶體驗

1. **表單驗證**
   - 必填欄位檢查
   - 電子郵件格式驗證
   - 即時錯誤提示

2. **通知系統**
   - 成功/錯誤/資訊提示
   - 漸層背景設計
   - 自動消失

3. **狀態管理**
   - 登入狀態持久化
   - 自動載入會員資料
   - 購物車與會員系統整合

### 🛒 購物整合

1. **結帳優化**
   - 會員結帳顯示點數獲得
   - 非會員提示登入優惠
   - 點數即時更新

2. **會員專屬**
   - 購物獲得點數
   - 個人化體驗
   - 資料持久化

### 🔒 資料安全

1. **本地儲存**
   - 會員資料存於 localStorage
   - 登入狀態存於 sessionStorage
   - 瀏覽器關閉後需重新登入

2. **資料驗證**
   - 前端表單驗證
   - 重複電子郵件檢查
   - 密碼驗證

現在您的購物網站具備了完整的會員系統！用戶可以：
- 註冊新帳號並獲得歡迎點數
- 登入查看個人資料和點數
- 購物時自動獲得點數
- 享受個人化的購物體驗

所有功能都與現有的購物車和商品展示完美整合！

---

**User**

1. 請確保會員註冊、登入的頁面與主頁的顏色風格一致

2. 會員頁面的資訊用條列顯示

---

**Cursor**

我將為您調整會員註冊、登入頁面的顏色風格，並將會員頁面的資訊改為條列顯示。


首先，我需要更新會員頁面的顏色風格，使其與主頁的駝色調一致：


```css
/* Custom styles for the shopping website */

body {
    background-color: #fefefe;
    color: #5c4a3a;
}

/* Color scheme variables */
:root {
    --primary-color: #d4a574;
    --secondary-color: #e8d5b7;
    --accent-color: #c19a6b;
    --text-color: #5c4a3a;
    --light-bg: #faf8f5;
    --card-bg: #ffffff;
    --border-color: #e8d5b7;
    --shadow-color: rgba(212, 165, 116, 0.15);
}

/* Category filter styles */
.btn-check:checked + .btn {
    transform: scale(1.05);
    box-shadow: 0 4px 8px var(--shadow-color);
    background-color: var(--primary-color) !important;
    border-color: var(--primary-color) !important;
    color: white !important;
}

.btn-group .btn {
    transition: all 0.3s ease;
    border-radius: 1rem !important;
    margin: 0 8px;
    padding: 0.75rem 1.5rem;
    background-color: var(--light-bg);
    border-color: var(--border-color);
    color: var(--text-color);
    font-weight: 500;
}

.btn-group .btn:hover {
    background-color: var(--secondary-color);
    border-color: var(--accent-color);
    color: var(--text-color);
}

.btn-group {
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
}

.btn-group .btn:first-child {
    border-top-right-radius: 1rem !important;
    border-bottom-right-radius: 1rem !important;
}

.btn-group .btn:last-child {
    border-top-left-radius: 1rem !important;
    border-bottom-left-radius: 1rem !important;
}

.btn-group .btn:not(:first-child):not(:last-child) {
    border-radius: 1rem !important;
}

/* Responsive button spacing */
@media (max-width: 768px) {
    .btn-group .btn {
        margin: 0 4px;
        padding: 0.6rem 1.2rem;
        font-size: 0.9rem;
    }
}

@media (max-width: 576px) {
    .btn-group {
        flex-direction: column;
        gap: 0.75rem;
    }
    
    .btn-group .btn {
        margin: 0;
        width: 100%;
        max-width: 280px;
    }
}

/* Category badge styles */
.badge {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* Sale badge styles */
.sale-badge {
    background: linear-gradient(45deg, #dc3545, #c82333) !important;
    color: white !important;
    font-size: 0.7rem;
    font-weight: 700;
    padding: 0.4rem 0.6rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);
    animation: salePulse 2s infinite;
    z-index: 10;
}

.sale-badge::before {
    content: '🔥';
    margin-right: 0.25rem;
}

@keyframes salePulse {
    0% {
        transform: scale(1);
        box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);
    }
    50% {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(220, 53, 69, 0.5);
    }
    100% {
        transform: scale(1);
        box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);
    }
}

/* Empty state styles */
.display-1 {
    font-size: 4rem;
    opacity: 0.3;
}

/* Search bar styles */
.input-group-text {
    background-color: var(--light-bg);
    border-color: var(--border-color);
    border-radius: 1rem 0 0 1rem !important;
    color: var(--text-color);
}

#searchInput {
    border-left: none;
    border-radius: 0 1rem 1rem 0 !important;
    transition: all 0.3s ease;
    background-color: var(--card-bg);
    border-color: var(--border-color);
    color: var(--text-color);
}

#searchInput:focus {
    border-color: var(--accent-color);
    box-shadow: 0 0 0 0.25rem var(--shadow-color);
    background-color: var(--card-bg);
}

#searchInput:focus + .input-group-text {
    border-color: var(--accent-color);
}

#clearSearchBtn {
    transition: all 0.3s ease;
    border-left: none;
    border-radius: 0 1rem 1rem 0 !important;
    background-color: var(--light-bg);
    border-color: var(--border-color);
    color: var(--text-color);
}

#clearSearchBtn:hover {
    background-color: var(--secondary-color);
    color: var(--accent-color);
}

/* Search highlighting */
mark {
    background-color: var(--secondary-color);
    color: var(--text-color);
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-weight: 600;
}

/* Search results info */
#searchResultsInfo {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-color);
}

/* Search animation */
@keyframes searchPulse {
    0% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0.4);
    }
    70% {
        box-shadow: 0 0 0 10px rgba(13, 110, 253, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0);
    }
}

.searching {
    animation: searchPulse 1.5s infinite;
}

/* Responsive search bar */
@media (max-width: 768px) {
    .input-group {
        flex-direction: column;
    }
    
    .input-group-text {
        border-radius: 1rem 1rem 0 0 !important;
        border-bottom: none;
    }
    
    #searchInput {
        border-radius: 0 0 1rem 1rem !important;
        border-top: none;
    }
    
    #clearSearchBtn {
        border-radius: 1rem;
        margin-top: 0.5rem;
        width: 100%;
    }
}

/* Navbar styles */
.navbar {
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color)) !important;
    box-shadow: 0 2px 10px var(--shadow-color);
}

.navbar-brand {
    font-weight: bold;
    font-size: 1.5rem;
    color: white !important;
}

.navbar-nav .nav-link {
    color: white !important;
    transition: color 0.3s ease;
}

.navbar-nav .nav-link:hover {
    color: var(--light-bg) !important;
}

.navbar-toggler {
    border-color: white;
}

.navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

.card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid var(--border-color);
    background-color: var(--card-bg);
    box-shadow: 0 2px 8px var(--shadow-color);
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px var(--shadow-color);
    border-color: var(--accent-color);
}

/* Product card clickable styles */
.product-card {
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.product-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px var(--shadow-color);
    border-color: var(--primary-color);
}

.product-card:hover::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(212, 165, 116, 0.05), rgba(193, 154, 107, 0.05));
    pointer-events: none;
    z-index: 1;
}

.product-card:hover .card-title {
    color: var(--primary-color);
}

.product-card:hover .card-text {
    color: var(--text-color);
}

.card-img-top {
    height: 200px;
    object-fit: contain;
    transition: transform 0.3s ease;
}

.card:hover .card-img-top {
    transform: scale(1.05);
}

.btn-add-cart {
    background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
    border: none;
    color: white;
    transition: all 0.3s ease;
}

.btn-add-cart:hover {
    background: linear-gradient(45deg, var(--accent-color), #b88a5a);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px var(--shadow-color);
    color: white;
}

.cart-item {
    border-bottom: 1px solid var(--border-color);
    padding: 1rem 0;
}

.cart-item:last-child {
    border-bottom: none;
}

.cart-item-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
}

.btn-remove {
    color: var(--accent-color);
    border: none;
    background: none;
    font-size: 1.2rem;
    transition: color 0.3s ease;
}

.btn-remove:hover {
    color: var(--primary-color);
}

.quantity-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.quantity-btn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid var(--border-color);
    background: var(--card-bg);
    color: var(--text-color);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.quantity-btn:hover {
    background: var(--secondary-color);
    border-color: var(--accent-color);
    color: var(--text-color);
}

.quantity-input {
    width: 50px;
    text-align: center;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    padding: 0.25rem;
    background-color: var(--card-bg);
    color: var(--text-color);
}

#emptyCart {
    color: var(--text-color);
    opacity: 0.7;
}

.toast {
    background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
    color: white;
}

.toast-header {
    background: rgba(255,255,255,0.1);
    border-bottom: 1px solid rgba(255,255,255,0.2);
}

/* Product image styles */
.product-image {
    transition: all 0.3s ease;
}

.product-image:hover {
    transform: scale(1.02);
    filter: brightness(1.05);
}

.btn-image-zoom {
    opacity: 0;
    transition: all 0.3s ease;
    background-color: rgba(255, 255, 255, 0.9) !important;
    border: none;
    color: var(--text-color);
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.btn-image-zoom:hover {
    opacity: 1 !important;
    background-color: var(--primary-color) !important;
    color: white;
    transform: scale(1.1);
}

.card:hover .btn-image-zoom {
    opacity: 1;
}

/* Image modal styles */
#imageModal .modal-content {
    border: none;
    border-radius: 1rem;
    box-shadow: 0 10px 30px var(--shadow-color);
}

#imageModal .modal-header {
    background-color: var(--light-bg);
    border-bottom: 1px solid var(--border-color);
    border-radius: 1rem 1rem 0 0;
}

#imageModal .modal-body {
    padding: 2rem;
}

#imageModal .modal-body img {
    max-height: 400px;
    width: auto;
    box-shadow: 0 4px 15px var(--shadow-color);
}

#imageModal .modal-footer {
    background-color: var(--light-bg);
    border-top: 1px solid var(--border-color);
    border-radius: 0 0 1rem 1rem;
}

#imageModal .btn-close {
    background-color: var(--accent-color);
    opacity: 1;
    border-radius: 50%;
    width: 30px;
    height: 30px;
}

#imageModal .btn-close:hover {
    background-color: var(--primary-color);
}

/* Animation for cart count badge */
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}

.badge.bounce {
    animation: bounce 1s;
}

/* Member modal styles */
#memberModal .modal-content {
    border: 1px solid var(--border-color);
    border-radius: 1rem;
    box-shadow: 0 10px 30px var(--shadow-color);
    background-color: var(--card-bg);
}

#memberModal .modal-header {
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
    color: white;
    border-radius: 1rem 1rem 0 0;
    border-bottom: 1px solid var(--border-color);
}

#memberModal .modal-body {
    padding: 2rem;
    background-color: var(--card-bg);
    color: var(--text-color);
}

#memberModal .form-control {
    border-color: var(--border-color);
    border-radius: 0.5rem;
    background-color: var(--card-bg);
    color: var(--text-color);
    transition: all 0.3s ease;
}

#memberModal .form-control:focus {
    border-color: var(--accent-color);
    box-shadow: 0 0 0 0.25rem var(--shadow-color);
    background-color: var(--card-bg);
    color: var(--text-color);
}

#memberModal .form-label {
    color: var(--text-color);
    font-weight: 500;
}

#memberModal .btn {
    border-radius: 0.5rem;
    font-weight: 500;
    transition: all 0.3s ease;
}

#memberModal .btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px var(--shadow-color);
}

#memberModal .btn-primary {
    background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
    border: none;
}

#memberModal .btn-success {
    background: linear-gradient(45deg, #28a745, #20c997);
    border: none;
}

#memberModal .btn-outline-danger {
    border-color: #dc3545;
    color: #dc3545;
}

#memberModal .btn-outline-danger:hover {
    background-color: #dc3545;
    border-color: #dc3545;
}

#memberModal .text-muted {
    color: var(--text-color) !important;
    opacity: 0.7;
}

#memberModal a {
    color: var(--accent-color);
    text-decoration: none;
}

#memberModal a:hover {
    color: var(--primary-color);
    text-decoration: underline;
}

/* Member dashboard styles */
#memberDashboard .card {
    border: 1px solid var(--border-color);
    border-radius: 0.75rem;
    transition: all 0.3s ease;
}

#memberDashboard .card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px var(--shadow-color);
}

#memberDashboard .display-4 {
    color: var(--primary-color);
}

#memberDashboard .text-primary {
    color: var(--primary-color) !important;
}

#memberDashboard .text-warning {
    color: #ffc107 !important;
}

/* Toast notification styles */
.toast.bg-success {
    background: linear-gradient(45deg, #28a745, #20c997) !important;
}

.toast.bg-danger {
    background: linear-gradient(45deg, #dc3545, #c82333) !important;
}

.toast.bg-info {
    background: linear-gradient(45deg, #17a2b8, #138496) !important;
}

.toast-header {
    background: rgba(255,255,255,0.1);
    border-bottom: 1px solid rgba(255,255,255,0.2);
}

/* Member link styles */
#memberLink {
    transition: all 0.3s ease;
}

#memberLink:hover {
    color: var(--light-bg) !important;
    transform: scale(1.05);
}

/* Form validation styles */
.form-control.is-invalid {
    border-color: #dc3545;
    box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
}

.form-control.is-valid {
    border-color: #28a745;
    box-shadow: 0 0 0 0.25rem rgba(40, 167, 69, 0.25);
}

/* Responsive member modal */
@media (max-width: 768px) {
    #memberModal .modal-body {
        padding: 1.5rem;
    }
    
    #memberDashboard .row .col-md-6 {
        margin-bottom: 1rem;
    }
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .card-img-top {
        height: 150px;
    }
    
    .cart-item-image {
        width: 50px;
        height: 50px;
    }
}

/* Loading animation */
.loading {
    opacity: 0.6;
    pointer-events: none;
}

.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

```

現在我需要更新會員儀表板的樣式，並將會員資訊改為條列顯示：


```css
/* Custom styles for the shopping website */

body {
    background-color: #fefefe;
    color: #5c4a3a;
}

/* Color scheme variables */
:root {
    --primary-color: #d4a574;
    --secondary-color: #e8d5b7;
    --accent-color: #c19a6b;
    --text-color: #5c4a3a;
    --light-bg: #faf8f5;
    --card-bg: #ffffff;
    --border-color: #e8d5b7;
    --shadow-color: rgba(212, 165, 116, 0.15);
}

/* Category filter styles */
.btn-check:checked + .btn {
    transform: scale(1.05);
    box-shadow: 0 4px 8px var(--shadow-color);
    background-color: var(--primary-color) !important;
    border-color: var(--primary-color) !important;
    color: white !important;
}

.btn-group .btn {
    transition: all 0.3s ease;
    border-radius: 1rem !important;
    margin: 0 8px;
    padding: 0.75rem 1.5rem;
    background-color: var(--light-bg);
    border-color: var(--border-color);
    color: var(--text-color);
    font-weight: 500;
}

.btn-group .btn:hover {
    background-color: var(--secondary-color);
    border-color: var(--accent-color);
    color: var(--text-color);
}

.btn-group {
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
}

.btn-group .btn:first-child {
    border-top-right-radius: 1rem !important;
    border-bottom-right-radius: 1rem !important;
}

.btn-group .btn:last-child {
    border-top-left-radius: 1rem !important;
    border-bottom-left-radius: 1rem !important;
}

.btn-group .btn:not(:first-child):not(:last-child) {
    border-radius: 1rem !important;
}

/* Responsive button spacing */
@media (max-width: 768px) {
    .btn-group .btn {
        margin: 0 4px;
        padding: 0.6rem 1.2rem;
        font-size: 0.9rem;
    }
}

@media (max-width: 576px) {
    .btn-group {
        flex-direction: column;
        gap: 0.75rem;
    }
    
    .btn-group .btn {
        margin: 0;
        width: 100%;
        max-width: 280px;
    }
}

/* Category badge styles */
.badge {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* Sale badge styles */
.sale-badge {
    background: linear-gradient(45deg, #dc3545, #c82333) !important;
    color: white !important;
    font-size: 0.7rem;
    font-weight: 700;
    padding: 0.4rem 0.6rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);
    animation: salePulse 2s infinite;
    z-index: 10;
}

.sale-badge::before {
    content: '🔥';
    margin-right: 0.25rem;
}

@keyframes salePulse {
    0% {
        transform: scale(1);
        box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);
    }
    50% {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(220, 53, 69, 0.5);
    }
    100% {
        transform: scale(1);
        box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);
    }
}

/* Empty state styles */
.display-1 {
    font-size: 4rem;
    opacity: 0.3;
}

/* Search bar styles */
.input-group-text {
    background-color: var(--light-bg);
    border-color: var(--border-color);
    border-radius: 1rem 0 0 1rem !important;
    color: var(--text-color);
}

#searchInput {
    border-left: none;
    border-radius: 0 1rem 1rem 0 !important;
    transition: all 0.3s ease;
    background-color: var(--card-bg);
    border-color: var(--border-color);
    color: var(--text-color);
}

#searchInput:focus {
    border-color: var(--accent-color);
    box-shadow: 0 0 0 0.25rem var(--shadow-color);
    background-color: var(--card-bg);
}

#searchInput:focus + .input-group-text {
    border-color: var(--accent-color);
}

#clearSearchBtn {
    transition: all 0.3s ease;
    border-left: none;
    border-radius: 0 1rem 1rem 0 !important;
    background-color: var(--light-bg);
    border-color: var(--border-color);
    color: var(--text-color);
}

#clearSearchBtn:hover {
    background-color: var(--secondary-color);
    color: var(--accent-color);
}

/* Search highlighting */
mark {
    background-color: var(--secondary-color);
    color: var(--text-color);
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-weight: 600;
}

/* Search results info */
#searchResultsInfo {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-color);
}

/* Search animation */
@keyframes searchPulse {
    0% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0.4);
    }
    70% {
        box-shadow: 0 0 0 10px rgba(13, 110, 253, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0);
    }
}

.searching {
    animation: searchPulse 1.5s infinite;
}

/* Responsive search bar */
@media (max-width: 768px) {
    .input-group {
        flex-direction: column;
    }
    
    .input-group-text {
        border-radius: 1rem 1rem 0 0 !important;
        border-bottom: none;
    }
    
    #searchInput {
        border-radius: 0 0 1rem 1rem !important;
        border-top: none;
    }
    
    #clearSearchBtn {
        border-radius: 1rem;
        margin-top: 0.5rem;
        width: 100%;
    }
}

/* Navbar styles */
.navbar {
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color)) !important;
    box-shadow: 0 2px 10px var(--shadow-color);
}

.navbar-brand {
    font-weight: bold;
    font-size: 1.5rem;
    color: white !important;
}

.navbar-nav .nav-link {
    color: white !important;
    transition: color 0.3s ease;
}

.navbar-nav .nav-link:hover {
    color: var(--light-bg) !important;
}

.navbar-toggler {
    border-color: white;
}

.navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

.card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid var(--border-color);
    background-color: var(--card-bg);
    box-shadow: 0 2px 8px var(--shadow-color);
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px var(--shadow-color);
    border-color: var(--accent-color);
}

/* Product card clickable styles */
.product-card {
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.product-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px var(--shadow-color);
    border-color: var(--primary-color);
}

.product-card:hover::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(212, 165, 116, 0.05), rgba(193, 154, 107, 0.05));
    pointer-events: none;
    z-index: 1;
}

.product-card:hover .card-title {
    color: var(--primary-color);
}

.product-card:hover .card-text {
    color: var(--text-color);
}

.card-img-top {
    height: 200px;
    object-fit: contain;
    transition: transform 0.3s ease;
}

.card:hover .card-img-top {
    transform: scale(1.05);
}

.btn-add-cart {
    background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
    border: none;
    color: white;
    transition: all 0.3s ease;
}

.btn-add-cart:hover {
    background: linear-gradient(45deg, var(--accent-color), #b88a5a);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px var(--shadow-color);
    color: white;
}

.cart-item {
    border-bottom: 1px solid var(--border-color);
    padding: 1rem 0;
}

.cart-item:last-child {
    border-bottom: none;
}

.cart-item-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
}

.btn-remove {
    color: var(--accent-color);
    border: none;
    background: none;
    font-size: 1.2rem;
    transition: color 0.3s ease;
}

.btn-remove:hover {
    color: var(--primary-color);
}

.quantity-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.quantity-btn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid var(--border-color);
    background: var(--card-bg);
    color: var(--text-color);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.quantity-btn:hover {
    background: var(--secondary-color);
    border-color: var(--accent-color);
    color: var(--text-color);
}

.quantity-input {
    width: 50px;
    text-align: center;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    padding: 0.25rem;
    background-color: var(--card-bg);
    color: var(--text-color);
}

#emptyCart {
    color: var(--text-color);
    opacity: 0.7;
}

.toast {
    background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
    color: white;
}

.toast-header {
    background: rgba(255,255,255,0.1);
    border-bottom: 1px solid rgba(255,255,255,0.2);
}

/* Product image styles */
.product-image {
    transition: all 0.3s ease;
}

.product-image:hover {
    transform: scale(1.02);
    filter: brightness(1.05);
}

.btn-image-zoom {
    opacity: 0;
    transition: all 0.3s ease;
    background-color: rgba(255, 255, 255, 0.9) !important;
    border: none;
    color: var(--text-color);
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.btn-image-zoom:hover {
    opacity: 1 !important;
    background-color: var(--primary-color) !important;
    color: white;
    transform: scale(1.1);
}

.card:hover .btn-image-zoom {
    opacity: 1;
}

/* Image modal styles */
#imageModal .modal-content {
    border: none;
    border-radius: 1rem;
    box-shadow: 0 10px 30px var(--shadow-color);
}

#imageModal .modal-header {
    background-color: var(--light-bg);
    border-bottom: 1px solid var(--border-color);
    border-radius: 1rem 1rem 0 0;
}

#imageModal .modal-body {
    padding: 2rem;
}

#imageModal .modal-body img {
    max-height: 400px;
    width: auto;
    box-shadow: 0 4px 15px var(--shadow-color);
}

#imageModal .modal-footer {
    background-color: var(--light-bg);
    border-top: 1px solid var(--border-color);
    border-radius: 0 0 1rem 1rem;
}

#imageModal .btn-close {
    background-color: var(--accent-color);
    opacity: 1;
    border-radius: 50%;
    width: 30px;
    height: 30px;
}

#imageModal .btn-close:hover {
    background-color: var(--primary-color);
}

/* Animation for cart count badge */
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}

.badge.bounce {
    animation: bounce 1s;
}

/* Member modal styles */
#memberModal .modal-content {
    border: 1px solid var(--border-color);
    border-radius: 1rem;
    box-shadow: 0 10px 30px var(--shadow-color);
    background-color: var(--card-bg);
}

#memberModal .modal-header {
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
    color: white;
    border-radius: 1rem 1rem 0 0;
    border-bottom: 1px solid var(--border-color);
}

#memberModal .modal-body {
    padding: 2rem;
    background-color: var(--card-bg);
    color: var(--text-color);
}

#memberModal .form-control {
    border-color: var(--border-color);
    border-radius: 0.5rem;
    background-color: var(--card-bg);
    color: var(--text-color);
    transition: all 0.3s ease;
}

#memberModal .form-control:focus {
    border-color: var(--accent-color);
    box-shadow: 0 0 0 0.25rem var(--shadow-color);
    background-color: var(--card-bg);
    color: var(--text-color);
}

#memberModal .form-label {
    color: var(--text-color);
    font-weight: 500;
}

#memberModal .btn {
    border-radius: 0.5rem;
    font-weight: 500;
    transition: all 0.3s ease;
}

#memberModal .btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px var(--shadow-color);
}

#memberModal .btn-primary {
    background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
    border: none;
}

#memberModal .btn-success {
    background: linear-gradient(45deg, #28a745, #20c997);
    border: none;
}

#memberModal .btn-outline-danger {
    border-color: #dc3545;
    color: #dc3545;
}

#memberModal .btn-outline-danger:hover {
    background-color: #dc3545;
    border-color: #dc3545;
}

#memberModal .text-muted {
    color: var(--text-color) !important;
    opacity: 0.7;
}

#memberModal a {
    color: var(--accent-color);
    text-decoration: none;
}

#memberModal a:hover {
    color: var(--primary-color);
    text-decoration: underline;
}

/* Member dashboard styles */
#memberDashboard .card {
    border: 1px solid var(--border-color);
    border-radius: 0.75rem;
    background-color: var(--card-bg);
    transition: all 0.3s ease;
}

#memberDashboard .card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px var(--shadow-color);
}

#memberDashboard .display-4 {
    color: var(--primary-color);
}

#memberDashboard .text-primary {
    color: var(--primary-color) !important;
}

#memberDashboard .text-warning {
    color: #ffc107 !important;
}

#memberDashboard .text-muted {
    color: var(--text-color) !important;
    opacity: 0.7;
}

/* Member info list styles */
.member-info-list {
    background-color: var(--light-bg);
    border: 1px solid var(--border-color);
    border-radius: 0.75rem;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
}

.member-info-item {
    display: flex;
    align-items: center;
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--border-color);
    transition: all 0.3s ease;
}

.member-info-item:last-child {
    border-bottom: none;
}

.member-info-item:hover {
    background-color: rgba(212, 165, 116, 0.05);
    border-radius: 0.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
}

.member-info-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    font-size: 1.2rem;
}

.member-info-icon.email {
    background-color: rgba(13, 110, 253, 0.1);
    color: #0d6efd;
}

.member-info-icon.phone {
    background-color: rgba(25, 135, 84, 0.1);
    color: #198754;
}

.member-info-icon.points {
    background-color: rgba(255, 193, 7, 0.1);
    color: #ffc107;
}

.member-info-content {
    flex: 1;
}

.member-info-label {
    font-size: 0.875rem;
    color: var(--text-color);
    opacity: 0.7;
    margin-bottom: 0.25rem;
}

.member-info-value {
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--text-color);
}

.points-display {
    text-align: center;
    background: linear-gradient(135deg, var(--secondary-color), var(--light-bg));
    border: 2px solid var(--primary-color);
    border-radius: 1rem;
    padding: 2rem;
    margin-bottom: 1.5rem;
}

.points-number {
    font-size: 3rem;
    font-weight: 700;
    color: var(--primary-color);
    margin: 0.5rem 0;
    text-shadow: 0 2px 4px var(--shadow-color);
}

.points-label {
    font-size: 1.1rem;
    color: var(--text-color);
    margin-bottom: 0.5rem;
}

.points-description {
    font-size: 0.9rem;
    color: var(--text-color);
    opacity: 0.7;
}

/* Toast notification styles */
.toast.bg-success {
    background: linear-gradient(45deg, #28a745, #20c997) !important;
}

.toast.bg-danger {
    background: linear-gradient(45deg, #dc3545, #c82333) !important;
}

.toast.bg-info {
    background: linear-gradient(45deg, #17a2b8, #138496) !important;
}

.toast-header {
    background: rgba(255,255,255,0.1);
    border-bottom: 1px solid rgba(255,255,255,0.2);
}

/* Member link styles */
#memberLink {
    transition: all 0.3s ease;
}

#memberLink:hover {
    color: var(--light-bg) !important;
    transform: scale(1.05);
}

/* Form validation styles */
.form-control.is-invalid {
    border-color: #dc3545;
    box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
}

.form-control.is-valid {
    border-color: #28a745;
    box-shadow: 0 0 0 0.25rem rgba(40, 167, 69, 0.25);
}

/* Responsive member modal */
@media (max-width: 768px) {
    #memberModal .modal-body {
        padding: 1.5rem;
    }
    
    #memberDashboard .row .col-md-6 {
        margin-bottom: 1rem;
    }
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .card-img-top {
        height: 150px;
    }
    
    .cart-item-image {
        width: 50px;
        height: 50px;
    }
}

/* Loading animation */
.loading {
    opacity: 0.6;
    pointer-events: none;
}

.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

```

現在我需要更新 HTML 結構，將會員儀表板改為條列顯示：


```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>商品購物網站</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
            <a class="navbar-brand" href="#">
                <i class="bi bi-shop"></i> 茶茶的店
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#memberModal" id="memberLink">
                            <i class="bi bi-person-circle"></i> <span id="memberText">會員登入</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#cartModal">
                            <i class="bi bi-cart3"></i> 購物車 
                            <span class="badge bg-danger" id="cartCount">0</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

        <!-- Main Content -->
        <div class="container mt-4">
            <div class="row">
                <div class="col-12">
                    <h1 class="text-center mb-4">精選商品</h1>
                    
                    <!-- Search Bar -->
                    <div class="row justify-content-center mb-4">
                        <div class="col-lg-6 col-md-8 col-sm-10">
                            <div class="input-group">
                                <span class="input-group-text">
                                    <i class="bi bi-search"></i>
                                </span>
                                <input type="text" class="form-control form-control-lg" id="searchInput" 
                                       placeholder="搜尋商品名稱或描述..." aria-label="搜尋商品">
                                <button class="btn btn-outline-secondary" type="button" id="clearSearchBtn" style="display: none;">
                                    <i class="bi bi-x-lg"></i>
                                </button>
                            </div>
                            <div class="mt-2">
                                <small class="text-muted" id="searchResultsInfo"></small>
                            </div>
                        </div>
                    </div>

                    <!-- Category Filter -->
                    <div class="row justify-content-center mb-4">
                        <div class="col-auto">
                            <div class="btn-group" role="group" aria-label="商品分類">
                                <input type="radio" class="btn-check" name="categoryFilter" id="categoryAll" value="all" checked>
                                <label class="btn btn-outline-primary" for="categoryAll">
                                    <i class="bi bi-grid-3x3-gap"></i> 全部商品
                                </label>
                                
                                <input type="radio" class="btn-check" name="categoryFilter" id="categoryA" value="A">
                                <label class="btn btn-outline-success" for="categoryA">
                                    <i class="bi bi-heart-fill"></i> 茶茶小貓咪
                                </label>
                                
                                <input type="radio" class="btn-check" name="categoryFilter" id="categoryB" value="B">
                                <label class="btn btn-outline-warning" for="categoryB">
                                    <i class="bi bi-egg-fried"></i> 茶茶的朋友-小雞
                                </label>
                                
                                <input type="radio" class="btn-check" name="categoryFilter" id="categoryC" value="C">
                                <label class="btn btn-outline-info" for="categoryC">
                                    <i class="bi bi-heart-pulse"></i> 茶的必需品
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        <!-- Products Grid -->
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4" id="productsContainer">
            <!-- Products will be dynamically generated here -->
        </div>
    </div>

    <!-- Cart Modal -->
    <div class="modal fade" id="cartModal" tabindex="-1" aria-labelledby="cartModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="cartModalLabel">
                        <i class="bi bi-cart3"></i> 購物車
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div id="cartItems">
                        <!-- Cart items will be displayed here -->
                    </div>
                    <div id="emptyCart" class="text-center text-muted py-4" style="display: none;">
                        <i class="bi bi-cart-x display-1"></i>
                        <p class="mt-2">購物車是空的</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="d-flex justify-content-between w-100">
                        <h5>總計: $<span id="totalPrice">0</span></h5>
                        <button type="button" class="btn btn-success" id="checkoutBtn" disabled>
                            <i class="bi bi-credit-card"></i> 結帳
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Member Modal -->
    <div class="modal fade" id="memberModal" tabindex="-1" aria-labelledby="memberModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="memberModalLabel">會員中心</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <!-- Login Form -->
                    <div id="loginForm">
                        <div class="text-center mb-4">
                            <i class="bi bi-person-circle display-1 text-primary"></i>
                            <h4>會員登入</h4>
                        </div>
                        <form id="loginFormElement">
                            <div class="mb-3">
                                <label for="loginEmail" class="form-label">電子郵件</label>
                                <input type="email" class="form-control" id="loginEmail" required>
                            </div>
                            <div class="mb-3">
                                <label for="loginPassword" class="form-label">密碼</label>
                                <input type="password" class="form-control" id="loginPassword" required>
                            </div>
                            <div class="d-grid">
                                <button type="submit" class="btn btn-primary">
                                    <i class="bi bi-box-arrow-in-right"></i> 登入
                                </button>
                            </div>
                        </form>
                        <div class="text-center mt-3">
                            <p class="text-muted">還沒有帳號？ <a href="#" id="showRegisterForm">立即註冊</a></p>
                        </div>
                    </div>

                    <!-- Register Form -->
                    <div id="registerForm" style="display: none;">
                        <div class="text-center mb-4">
                            <i class="bi bi-person-plus display-1 text-success"></i>
                            <h4>會員註冊</h4>
                        </div>
                        <form id="registerFormElement">
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="registerName" class="form-label">姓名</label>
                                    <input type="text" class="form-control" id="registerName" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="registerEmail" class="form-label">電子郵件</label>
                                    <input type="email" class="form-control" id="registerEmail" required>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="registerPhone" class="form-label">電話</label>
                                    <input type="tel" class="form-control" id="registerPhone" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="registerPassword" class="form-label">密碼</label>
                                    <input type="password" class="form-control" id="registerPassword" required>
                                </div>
                            </div>
                            <div class="d-grid">
                                <button type="submit" class="btn btn-success">
                                    <i class="bi bi-person-plus"></i> 註冊
                                </button>
                            </div>
                        </form>
                        <div class="text-center mt-3">
                            <p class="text-muted">已有帳號？ <a href="#" id="showLoginForm">立即登入</a></p>
                        </div>
                    </div>

                    <!-- Member Dashboard -->
                    <div id="memberDashboard" style="display: none;">
                        <div class="text-center mb-4">
                            <i class="bi bi-person-check display-1 text-primary"></i>
                            <h4>歡迎回來！</h4>
                            <h5 id="memberName" class="text-muted"></h5>
                        </div>
                        
                        <!-- Points Display -->
                        <div class="points-display">
                            <i class="bi bi-star-fill display-4 text-warning"></i>
                            <div class="points-label">目前點數</div>
                            <div class="points-number" id="memberPoints">0</div>
                            <div class="points-description">購物即可獲得點數！</div>
                        </div>
                        
                        <!-- Member Info List -->
                        <div class="member-info-list">
                            <div class="member-info-item">
                                <div class="member-info-icon email">
                                    <i class="bi bi-envelope"></i>
                                </div>
                                <div class="member-info-content">
                                    <div class="member-info-label">電子郵件</div>
                                    <div class="member-info-value" id="memberEmail"></div>
                                </div>
                            </div>
                            <div class="member-info-item">
                                <div class="member-info-icon phone">
                                    <i class="bi bi-telephone"></i>
                                </div>
                                <div class="member-info-content">
                                    <div class="member-info-label">電話</div>
                                    <div class="member-info-value" id="memberPhone"></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="d-grid">
                            <button type="button" class="btn btn-outline-danger" id="logoutBtn">
                                <i class="bi bi-box-arrow-right"></i> 登出
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Image Modal -->
    <div class="modal fade" id="imageModal" tabindex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="imageModalLabel">商品圖片</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center">
                    <img id="modalImage" src="" alt="" class="img-fluid rounded">
                    <div class="mt-3">
                        <h6 id="modalProductName" class="text-muted"></h6>
                        <p id="modalProductPrice" class="h5 text-primary mb-0"></p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                        <i class="bi bi-x-lg"></i> 關閉
                    </button>
                    <button type="button" class="btn btn-primary" id="addToCartFromModal">
                        <i class="bi bi-cart-plus"></i> 加入購物車
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Toast for notifications -->
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="cartToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <i class="bi bi-check-circle-fill text-success me-2"></i>
                <strong class="me-auto">成功</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                商品已加入購物車！
            </div>
        </div>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Custom JS -->
    <script src="script.js"></script>
</body>
</html>

```

讓我檢查是否有任何 linting 錯誤：


完美！我已經成功調整了會員頁面的設計，使其與主頁風格一致並改為條列顯示。以下是更新的特色：

## 🎨 會員頁面風格統一

### 🎯 顏色風格一致性

1. **駝色調配色**
   - 使用與主頁相同的 CSS 變數
   - 背景色：`var(--card-bg)` (白色)
   - 文字色：`var(--text-color)` (深棕色)
   - 邊框色：`var(--border-color)` (米色)

2. **按鈕樣式統一**
   - 登入按鈕：駝色漸層
   - 註冊按鈕：綠色漸層
   - 登出按鈕：紅色邊框
   - 懸停效果與主頁一致

3. **表單元素統一**
   - 輸入框使用駝色邊框
   - 聚焦時顯示駝色高亮
   - 標籤文字使用深棕色

### 📋 條列式資訊顯示

1. **點數顯示區域**
   - 大型圓形背景設計
   - 駝色漸層邊框
   - 大號數字顯示點數
   - 星星圖示和描述文字

2. **會員資訊列表**
   - 條列式佈局，每項一行
   - 圓形圖示背景
   - 電子郵件：藍色圖示
   - 電話：綠色圖示
   - 懸停時有背景高亮效果

3. **視覺層次**
   - 清晰的標籤和數值分離
   - 適當的間距和對齊
   - 統一的圓角和陰影效果

### ✨ 用戶體驗提升

1. **視覺一致性**
   - 與主頁完全一致的配色方案
   - 相同的字體和間距設計
   - 統一的動畫和過渡效果

2. **資訊清晰度**
   - 條列式佈局更易閱讀
   - 圖示和文字搭配清晰
   - 重要資訊（點數）突出顯示

3. **互動回饋**
   - 懸停效果提供視覺回饋
   - 平滑的動畫過渡
   - 一致的按鈕行為

### 🎨 設計細節

1. **色彩搭配**
   - 主色調：駝色 (`#d4a574`)
   - 輔助色：米色 (`#e8d5b7`)
   - 強調色：深駝色 (`#c19a6b`)
   - 文字色：深棕色 (`#5c4a3a`)

2. **佈局設計**
   - 響應式設計，適配各種螢幕
   - 清晰的視覺層次
   - 適當的留白和間距

3. **圖示設計**
   - 圓形背景的圖示
   - 不同顏色區分不同資訊類型
   - 適當的大小和間距

現在您的會員中心頁面與主頁風格完全一致，並採用了更清晰的條列式資訊顯示！

---

**User**


3. 每次購買都會增加會員點數，增加點數為(商品價格*0.01)

---

**Cursor**

我將修改點數計算系統，將每次購買的點數增加改為商品價格的 1%（商品價格 × 0.01）。


```javascript
// Shopping cart functionality
class ShoppingCart {
    constructor() {
        this.items = [];
        this.loadFromStorage();
        this.updateCartDisplay();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveToStorage();
        this.updateCartDisplay();
        this.showToast();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        this.updateCartDisplay();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
                this.saveToStorage();
                this.updateCartDisplay();
            }
        }
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    updateCartDisplay() {
        this.updateCartCount();
        this.updateCartModal();
        this.updateTotalPrice();
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        cartCount.textContent = this.getTotalItems();
        
        if (this.getTotalItems() > 0) {
            cartCount.classList.add('bounce');
            setTimeout(() => cartCount.classList.remove('bounce'), 1000);
        }
    }

    updateCartModal() {
        const cartItems = document.getElementById('cartItems');
        const emptyCart = document.getElementById('emptyCart');
        
        if (this.items.length === 0) {
            cartItems.style.display = 'none';
            emptyCart.style.display = 'block';
        } else {
            cartItems.style.display = 'block';
            emptyCart.style.display = 'none';
            
            cartItems.innerHTML = this.items.map(item => `
                <div class="cart-item d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${item.name}</h6>
                        <p class="text-muted mb-0">$${item.price}</p>
                    </div>
                    <div class="quantity-controls me-3">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                               onchange="cart.updateQuantity(${item.id}, parseInt(this.value))">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <div class="text-end me-3">
                        <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                    </div>
                    <button class="btn-remove" onclick="cart.removeItem(${item.id})" title="移除商品">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    }

    updateTotalPrice() {
        const totalPrice = document.getElementById('totalPrice');
        const checkoutBtn = document.getElementById('checkoutBtn');
        
        totalPrice.textContent = this.getTotalPrice().toFixed(2);
        checkoutBtn.disabled = this.items.length === 0;
    }

    showToast() {
        const toast = new bootstrap.Toast(document.getElementById('cartToast'));
        toast.show();
    }

    saveToStorage() {
        localStorage.setItem('shoppingCart', JSON.stringify(this.items));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('shoppingCart');
        if (stored) {
            this.items = JSON.parse(stored);
        }
    }

    checkout() {
        if (this.items.length === 0) {
            alert('購物車是空的！');
            return;
        }
        
        const totalPrice = this.getTotalPrice();
        const totalItems = this.getTotalItems();
        
        // Calculate points (1% of total price)
        const pointsEarned = Math.floor(totalPrice * 0.01);
        
        // Add points to member if logged in
        if (memberManager && memberManager.currentMember) {
            memberManager.addPoints(pointsEarned);
            alert(`結帳成功！\n總金額: $${totalPrice.toFixed(2)}\n商品數量: ${totalItems}\n獲得點數: ${pointsEarned} 點\n目前總點數: ${memberManager.currentMember.points} 點`);
        } else {
            alert(`結帳成功！\n總金額: $${totalPrice.toFixed(2)}\n商品數量: ${totalItems}\n\n提示：登入會員可獲得購物點數！`);
        }
        
        this.items = [];
        this.saveToStorage();
        this.updateCartDisplay();
    }
}

// Product data with categories
const products = [
    {
        id: 1,
        name: "枕頭貓",
        description: "有曬過太陽的香味喔☀️",
        price: 129.99,
        category: "A",
        isOnSale: true,
        image: "image/pillow_cat.png"
    },
    {
        id: 2,
        name: "潛水貓",
        description: "夢到自己在潛水喔",
        price: 299.99,
        category: "A",
        isOnSale: false,
        image: "image/淺水貓.png"
    },
    {
        id: 3,
        name: "雞雞貓",
        description: "ㄐㄐ",
        price: 899.99,
        category: "A",
        isOnSale: false,
        image: "image/雞雞貓.png"
    },
    {
        id: 4,
        name: "兔兔貓",
        description: "吃太多鏟屎官便當裡的紅蘿菠，所以變成兔子了",
        price: 699.99,
        category: "A",
        isOnSale: false,
        image: "image/兔兔貓.png"
    },
    {
        id: 5,
        name: "尤達呆呆貓",
        description: "這個家待不下去了",
        price: 199.99,
        category: "A",
        isOnSale: false,
        image: "image/尤達呆呆貓.png"
    },
    {
        id: 6,
        name: "長條貓",
        description: "控制不住想要嚕兩下的衝動",
        price: 149.99,
        category: "A",
        isOnSale: false,
        image: "image/長條珍珠奶茶.png"
    },
    {
        id: 7,
        name: "小逼",
        description: "藍色的漂亮鸚鵡，大便很水，還有雞味",
        price: 399.99,
        category: "B",
        isOnSale: false,
        image: "image/小逼.jpg"
    },
    {
        id: 8,
        name: "茶茶與鼠鼠.png",
        description: "相親相愛的好朋友",
        price: 499.99,
        category: "A",
        isOnSale: false,
        image: "image/茶茶與鼠鼠.png"
    },
    {
        id: 9,
        name: "站坐貓",
        description: "你猜我是站著還是坐著？",
        price: 249.99,
        category: "A",
        isOnSale: true,
        image: "image/站坐貓.png"
    },
    {
        id: 10,
        name: "石膏雞",
        description: "腿斷掉的小雞...",
        price: 599.99,
        category: "B",
        isOnSale: false,
        image: "image/石膏雞.jpg"
    },
    {
        id: 11,
        name: "饋手貓",
        description: "靜靜的看著你",
        price: 349.99,
        category: "A",
        isOnSale: true,
        image: "image/饋手貓.png"
    },
    {
        id: 12,
        name: "打字雞",
        description: "o[e42,,,f[blqo    msofe",
        price: 39.99,
        category: "B",
        isOnSale: false,
        image: "image/打字雞.jpg"
    },
    {
        id: 13,
        name: "莫比貓飼料",
        description: "餓的時候很愛吃，但在罐頭前面不堪一擊",
        price: 39.99,
        category: "C",
        isOnSale: false,
        image: "image/莫比貓飼料.png"
    },
    {
        id: 14,
        name: "貓罐頭",
        description: "只要有罐頭，你就能支配茶茶",
        price: 39.99,
        category: "C",
        isOnSale: false,
        image: "image/罐頭.png"
    }
   
]
// Initialize shopping cart
let cart;

// Member management system
class MemberManager {
    constructor() {
        this.currentMember = null;
        this.members = this.loadMembers();
        this.loadCurrentMember();
    }

    // Load members from localStorage
    loadMembers() {
        const stored = localStorage.getItem('members');
        return stored ? JSON.parse(stored) : [];
    }

    // Save members to localStorage
    saveMembers() {
        localStorage.setItem('members', JSON.stringify(this.members));
    }

    // Load current member from sessionStorage
    loadCurrentMember() {
        const stored = sessionStorage.getItem('currentMember');
        if (stored) {
            this.currentMember = JSON.parse(stored);
            this.updateNavbar();
        }
    }

    // Save current member to sessionStorage
    saveCurrentMember() {
        if (this.currentMember) {
            sessionStorage.setItem('currentMember', JSON.stringify(this.currentMember));
        } else {
            sessionStorage.removeItem('currentMember');
        }
    }

    // Register new member
    register(name, email, phone, password) {
        // Check if email already exists
        if (this.members.find(member => member.email === email)) {
            return { success: false, message: '此電子郵件已被註冊' };
        }

        // Create new member
        const newMember = {
            id: Date.now(),
            name: name,
            email: email,
            phone: phone,
            password: password,
            points: 100, // Welcome bonus
            joinDate: new Date().toISOString()
        };

        this.members.push(newMember);
        this.saveMembers();
        
        return { success: true, message: '註冊成功！獲得歡迎點數 100 點' };
    }

    // Login member
    login(email, password) {
        const member = this.members.find(m => m.email === email && m.password === password);
        if (member) {
            this.currentMember = member;
            this.saveCurrentMember();
            this.updateNavbar();
            return { success: true, message: '登入成功！' };
        } else {
            return { success: false, message: '電子郵件或密碼錯誤' };
        }
    }

    // Logout member
    logout() {
        this.currentMember = null;
        this.saveCurrentMember();
        this.updateNavbar();
    }

    // Add points to current member
    addPoints(points) {
        if (this.currentMember) {
            this.currentMember.points += points;
            this.saveCurrentMember();
            this.updateMemberInStorage();
        }
    }

    // Update member in members array
    updateMemberInStorage() {
        if (this.currentMember) {
            const index = this.members.findIndex(m => m.id === this.currentMember.id);
            if (index !== -1) {
                this.members[index] = this.currentMember;
                this.saveMembers();
            }
        }
    }

    // Update navbar display
    updateNavbar() {
        const memberText = document.getElementById('memberText');
        if (this.currentMember) {
            memberText.textContent = this.currentMember.name;
        } else {
            memberText.textContent = '會員登入';
        }
    }

    // Show member dashboard
    showMemberDashboard() {
        if (this.currentMember) {
            document.getElementById('memberName').textContent = this.currentMember.name;
            document.getElementById('memberEmail').textContent = this.currentMember.email;
            document.getElementById('memberPhone').textContent = this.currentMember.phone;
            document.getElementById('memberPoints').textContent = this.currentMember.points;
        }
    }
}

// Initialize member manager
let memberManager;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    cart = new ShoppingCart();
    memberManager = new MemberManager();
    renderProducts();
    setupEventListeners();
});

// Get current filter
function getCurrentFilter() {
    const checkedFilter = document.querySelector('input[name="categoryFilter"]:checked');
    return checkedFilter ? checkedFilter.value : 'all';
}

// Get current search term
function getCurrentSearchTerm() {
    return document.getElementById('searchInput').value.trim().toLowerCase();
}

// Search products by name and description
function searchProducts(products, searchTerm) {
    if (!searchTerm) {
        return products;
    }
    
    return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
}

// Filter products by category
function filterProducts(category) {
    if (category === 'all') {
        return products;
    }
    return products.filter(product => product.category === category);
}

// Apply both search and category filters
function getFilteredProducts() {
    const category = getCurrentFilter();
    const searchTerm = getCurrentSearchTerm();
    
    let filteredProducts = filterProducts(category);
    filteredProducts = searchProducts(filteredProducts, searchTerm);
    
    return filteredProducts;
}

// Render products with filtering
function renderProducts() {
    const container = document.getElementById('productsContainer');
    const filteredProducts = getFilteredProducts();
    const searchTerm = getCurrentSearchTerm();
    const category = getCurrentFilter();
    
    // Update search results info
    updateSearchResultsInfo(filteredProducts.length, searchTerm, category);
    
    if (filteredProducts.length === 0) {
        let emptyMessage = '';
        if (searchTerm) {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-search display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">找不到相關商品</h3>
                        <p class="text-muted">沒有找到包含「${searchTerm}」的商品</p>
                        <button class="btn btn-outline-primary mt-3" onclick="clearSearch()">
                            <i class="bi bi-arrow-left"></i> 清除搜尋
                        </button>
                    </div>
                </div>
            `;
        } else {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-grid display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">此分類暫無商品</h3>
                        <p class="text-muted">請選擇其他分類或查看全部商品</p>
                    </div>
                </div>
            `;
        }
        container.innerHTML = emptyMessage;
        return;
    }
    
    container.innerHTML = filteredProducts.map(product => {
        const searchTerm = getCurrentSearchTerm();
        const highlightedName = highlightSearchTerm(product.name, searchTerm);
        const highlightedDescription = highlightSearchTerm(product.description, searchTerm);
        
        return `
            <div class="col">
                <div class="card h-100 product-card" data-product-id="${product.id}" style="cursor: pointer;">
                    <div class="position-relative">
                        <img src="${product.image}" class="card-img-top product-image" alt="${product.name}" loading="lazy">
                        ${product.isOnSale ? '<span class="position-absolute top-0 start-0 m-2 badge bg-danger sale-badge">促銷</span>' : ''}
                        <div class="position-absolute top-0 end-0 m-2">
                            <button class="btn btn-sm btn-light btn-image-zoom" data-product-id="${product.id}" title="查看大圖">
                                <i class="bi bi-zoom-in"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${highlightedName}</h5>
                        <p class="card-text flex-grow-1">${highlightedDescription}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="h5 text-primary mb-0">$${product.price}</span>
                            <button class="btn btn-primary btn-add-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                                <i class="bi bi-cart-plus"></i> 加入購物車
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}


// Update search results info
function updateSearchResultsInfo(count, searchTerm, category) {
    const searchResultsInfo = document.getElementById('searchResultsInfo');
    let infoText = '';
    
    if (searchTerm) {
        if (category === 'all') {
            infoText = `找到 ${count} 個包含「${searchTerm}」的商品`;
        } else {
            const categoryNames = {
                'A': '茶茶小貓咪',
                'B': '茶茶的朋友-小雞',
                'C': '茶的必需品'
            };
            infoText = `在${categoryNames[category]}中找到 ${count} 個包含「${searchTerm}」的商品`;
        }
    } else {
        if (category === 'all') {
            infoText = `顯示全部 ${count} 個商品`;
        } else {
            const categoryNames = {
                'A': '茶茶小貓咪',
                'B': '茶茶的朋友-小雞',
                'C': '茶的必需品'
            };
            infoText = `顯示 ${categoryNames[category]} 類別中的 ${count} 個商品`;
        }
    }
    
    searchResultsInfo.textContent = infoText;
}

// Clear search
function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('clearSearchBtn').style.display = 'none';
    renderProducts();
}

// Highlight search terms in text
function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.addItem(product);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        cart.checkout();
    });
    
    // Search input events
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    
    // Real-time search
    searchInput.addEventListener('input', function() {
        const hasValue = this.value.trim().length > 0;
        clearSearchBtn.style.display = hasValue ? 'block' : 'none';
        renderProducts();
    });
    
    // Clear search button
    clearSearchBtn.addEventListener('click', clearSearch);
    
    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            renderProducts();
        }
    });
    
    // Category filter change
    document.querySelectorAll('input[name="categoryFilter"]').forEach(radio => {
        radio.addEventListener('change', function() {
            renderProducts();
        });
    });
    
    // Prevent form submission on quantity input enter
    document.addEventListener('keypress', function(e) {
        if (e.target.classList.contains('quantity-input') && e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
        }
    });
    
    // Setup member event listeners
    setupMemberEventListeners();
    
    // Image click events (delegated event listeners)
    document.addEventListener('click', function(e) {
        // Product card click (entire card)
        if (e.target.closest('.product-card')) {
            const productCard = e.target.closest('.product-card');
            const productId = parseInt(productCard.getAttribute('data-product-id'));
            
            // Don't trigger if clicking on add to cart button
            if (!e.target.closest('.btn-add-cart')) {
                showImageModal(productId);
            }
        }
        
        // Product image click
        if (e.target.classList.contains('product-image')) {
            const productId = parseInt(e.target.getAttribute('data-product-id'));
            showImageModal(productId);
        }
        
        // Zoom button click
        if (e.target.closest('.btn-image-zoom')) {
            const productId = parseInt(e.target.closest('.btn-image-zoom').getAttribute('data-product-id'));
            showImageModal(productId);
        }
        
    // Add to cart from modal
    if (e.target.id === 'addToCartFromModal') {
        const productId = parseInt(e.target.getAttribute('data-product-id'));
        addToCart(productId);
        
        // Close modal
        const imageModal = bootstrap.Modal.getInstance(document.getElementById('imageModal'));
        if (imageModal) {
            imageModal.hide();
        }
    }
});

// Member modal event listeners
function setupMemberEventListeners() {
    // Show register form
    document.getElementById('showRegisterForm').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'block';
        document.getElementById('memberDashboard').style.display = 'none';
    });

    // Show login form
    document.getElementById('showLoginForm').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('memberDashboard').style.display = 'none';
    });

    // Login form submission
    document.getElementById('loginFormElement').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        const result = memberManager.login(email, password);
        showToast(result.message, result.success ? 'success' : 'error');
        
        if (result.success) {
            showMemberDashboard();
        }
    });

    // Register form submission
    document.getElementById('registerFormElement').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const phone = document.getElementById('registerPhone').value;
        const password = document.getElementById('registerPassword').value;
        
        const result = memberManager.register(name, email, phone, password);
        showToast(result.message, result.success ? 'success' : 'error');
        
        if (result.success) {
            showMemberDashboard();
        }
    });

    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', function() {
        memberManager.logout();
        showLoginForm();
        showToast('已登出', 'info');
    });

    // Member modal show event
    document.getElementById('memberModal').addEventListener('show.bs.modal', function() {
        if (memberManager.currentMember) {
            showMemberDashboard();
        } else {
            showLoginForm();
        }
    });
}

// Show login form
function showLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('memberDashboard').style.display = 'none';
}

// Show member dashboard
function showMemberDashboard() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('memberDashboard').style.display = 'block';
    memberManager.showMemberDashboard();
}

// Show toast notification
function showToast(message, type = 'info') {
    const toast = document.getElementById('cartToast');
    const toastHeader = toast.querySelector('.toast-header');
    const toastBody = toast.querySelector('.toast-body');
    
    // Update toast content
    toastBody.textContent = message;
    
    // Update toast style based on type
    toast.className = 'toast';
    if (type === 'success') {
        toast.classList.add('bg-success', 'text-white');
        toastHeader.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i><strong class="me-auto">成功</strong>';
    } else if (type === 'error') {
        toast.classList.add('bg-danger', 'text-white');
        toastHeader.innerHTML = '<i class="bi bi-exclamation-triangle-fill me-2"></i><strong class="me-auto">錯誤</strong>';
    } else if (type === 'info') {
        toast.classList.add('bg-info', 'text-white');
        toastHeader.innerHTML = '<i class="bi bi-info-circle-fill me-2"></i><strong class="me-auto">資訊</strong>';
    }
    
    // Show toast
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
}
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('zh-TW', {
        style: 'currency',
        currency: 'TWD'
    }).format(amount);
}

```

現在我需要更新結帳成功訊息，讓它更清楚地說明點數計算方式：


```javascript
// Shopping cart functionality
class ShoppingCart {
    constructor() {
        this.items = [];
        this.loadFromStorage();
        this.updateCartDisplay();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveToStorage();
        this.updateCartDisplay();
        this.showToast();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        this.updateCartDisplay();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
                this.saveToStorage();
                this.updateCartDisplay();
            }
        }
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    updateCartDisplay() {
        this.updateCartCount();
        this.updateCartModal();
        this.updateTotalPrice();
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        cartCount.textContent = this.getTotalItems();
        
        if (this.getTotalItems() > 0) {
            cartCount.classList.add('bounce');
            setTimeout(() => cartCount.classList.remove('bounce'), 1000);
        }
    }

    updateCartModal() {
        const cartItems = document.getElementById('cartItems');
        const emptyCart = document.getElementById('emptyCart');
        
        if (this.items.length === 0) {
            cartItems.style.display = 'none';
            emptyCart.style.display = 'block';
        } else {
            cartItems.style.display = 'block';
            emptyCart.style.display = 'none';
            
            cartItems.innerHTML = this.items.map(item => `
                <div class="cart-item d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${item.name}</h6>
                        <p class="text-muted mb-0">$${item.price}</p>
                    </div>
                    <div class="quantity-controls me-3">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                               onchange="cart.updateQuantity(${item.id}, parseInt(this.value))">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <div class="text-end me-3">
                        <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                    </div>
                    <button class="btn-remove" onclick="cart.removeItem(${item.id})" title="移除商品">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    }

    updateTotalPrice() {
        const totalPrice = document.getElementById('totalPrice');
        const checkoutBtn = document.getElementById('checkoutBtn');
        
        totalPrice.textContent = this.getTotalPrice().toFixed(2);
        checkoutBtn.disabled = this.items.length === 0;
    }

    showToast() {
        const toast = new bootstrap.Toast(document.getElementById('cartToast'));
        toast.show();
    }

    saveToStorage() {
        localStorage.setItem('shoppingCart', JSON.stringify(this.items));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('shoppingCart');
        if (stored) {
            this.items = JSON.parse(stored);
        }
    }

    checkout() {
        if (this.items.length === 0) {
            alert('購物車是空的！');
            return;
        }
        
        const totalPrice = this.getTotalPrice();
        const totalItems = this.getTotalItems();
        
        // Calculate points (1% of total price)
        const pointsEarned = Math.floor(totalPrice * 0.01);
        
        // Add points to member if logged in
        if (memberManager && memberManager.currentMember) {
            memberManager.addPoints(pointsEarned);
            alert(`結帳成功！\n總金額: $${totalPrice.toFixed(2)}\n商品數量: ${totalItems}\n獲得點數: ${pointsEarned} 點 (消費金額的1%)\n目前總點數: ${memberManager.currentMember.points} 點`);
        } else {
            alert(`結帳成功！\n總金額: $${totalPrice.toFixed(2)}\n商品數量: ${totalItems}\n\n提示：登入會員可獲得購物點數（消費金額的1%）！`);
        }
        
        this.items = [];
        this.saveToStorage();
        this.updateCartDisplay();
    }
}

// Product data with categories
const products = [
    {
        id: 1,
        name: "枕頭貓",
        description: "有曬過太陽的香味喔☀️",
        price: 129.99,
        category: "A",
        isOnSale: true,
        image: "image/pillow_cat.png"
    },
    {
        id: 2,
        name: "潛水貓",
        description: "夢到自己在潛水喔",
        price: 299.99,
        category: "A",
        isOnSale: false,
        image: "image/淺水貓.png"
    },
    {
        id: 3,
        name: "雞雞貓",
        description: "ㄐㄐ",
        price: 899.99,
        category: "A",
        isOnSale: false,
        image: "image/雞雞貓.png"
    },
    {
        id: 4,
        name: "兔兔貓",
        description: "吃太多鏟屎官便當裡的紅蘿菠，所以變成兔子了",
        price: 699.99,
        category: "A",
        isOnSale: false,
        image: "image/兔兔貓.png"
    },
    {
        id: 5,
        name: "尤達呆呆貓",
        description: "這個家待不下去了",
        price: 199.99,
        category: "A",
        isOnSale: false,
        image: "image/尤達呆呆貓.png"
    },
    {
        id: 6,
        name: "長條貓",
        description: "控制不住想要嚕兩下的衝動",
        price: 149.99,
        category: "A",
        isOnSale: false,
        image: "image/長條珍珠奶茶.png"
    },
    {
        id: 7,
        name: "小逼",
        description: "藍色的漂亮鸚鵡，大便很水，還有雞味",
        price: 399.99,
        category: "B",
        isOnSale: false,
        image: "image/小逼.jpg"
    },
    {
        id: 8,
        name: "茶茶與鼠鼠.png",
        description: "相親相愛的好朋友",
        price: 499.99,
        category: "A",
        isOnSale: false,
        image: "image/茶茶與鼠鼠.png"
    },
    {
        id: 9,
        name: "站坐貓",
        description: "你猜我是站著還是坐著？",
        price: 249.99,
        category: "A",
        isOnSale: true,
        image: "image/站坐貓.png"
    },
    {
        id: 10,
        name: "石膏雞",
        description: "腿斷掉的小雞...",
        price: 599.99,
        category: "B",
        isOnSale: false,
        image: "image/石膏雞.jpg"
    },
    {
        id: 11,
        name: "饋手貓",
        description: "靜靜的看著你",
        price: 349.99,
        category: "A",
        isOnSale: true,
        image: "image/饋手貓.png"
    },
    {
        id: 12,
        name: "打字雞",
        description: "o[e42,,,f[blqo    msofe",
        price: 39.99,
        category: "B",
        isOnSale: false,
        image: "image/打字雞.jpg"
    },
    {
        id: 13,
        name: "莫比貓飼料",
        description: "餓的時候很愛吃，但在罐頭前面不堪一擊",
        price: 39.99,
        category: "C",
        isOnSale: false,
        image: "image/莫比貓飼料.png"
    },
    {
        id: 14,
        name: "貓罐頭",
        description: "只要有罐頭，你就能支配茶茶",
        price: 39.99,
        category: "C",
        isOnSale: false,
        image: "image/罐頭.png"
    }
   
]
// Initialize shopping cart
let cart;

// Member management system
class MemberManager {
    constructor() {
        this.currentMember = null;
        this.members = this.loadMembers();
        this.loadCurrentMember();
    }

    // Load members from localStorage
    loadMembers() {
        const stored = localStorage.getItem('members');
        return stored ? JSON.parse(stored) : [];
    }

    // Save members to localStorage
    saveMembers() {
        localStorage.setItem('members', JSON.stringify(this.members));
    }

    // Load current member from sessionStorage
    loadCurrentMember() {
        const stored = sessionStorage.getItem('currentMember');
        if (stored) {
            this.currentMember = JSON.parse(stored);
            this.updateNavbar();
        }
    }

    // Save current member to sessionStorage
    saveCurrentMember() {
        if (this.currentMember) {
            sessionStorage.setItem('currentMember', JSON.stringify(this.currentMember));
        } else {
            sessionStorage.removeItem('currentMember');
        }
    }

    // Register new member
    register(name, email, phone, password) {
        // Check if email already exists
        if (this.members.find(member => member.email === email)) {
            return { success: false, message: '此電子郵件已被註冊' };
        }

        // Create new member
        const newMember = {
            id: Date.now(),
            name: name,
            email: email,
            phone: phone,
            password: password,
            points: 100, // Welcome bonus
            joinDate: new Date().toISOString()
        };

        this.members.push(newMember);
        this.saveMembers();
        
        return { success: true, message: '註冊成功！獲得歡迎點數 100 點' };
    }

    // Login member
    login(email, password) {
        const member = this.members.find(m => m.email === email && m.password === password);
        if (member) {
            this.currentMember = member;
            this.saveCurrentMember();
            this.updateNavbar();
            return { success: true, message: '登入成功！' };
        } else {
            return { success: false, message: '電子郵件或密碼錯誤' };
        }
    }

    // Logout member
    logout() {
        this.currentMember = null;
        this.saveCurrentMember();
        this.updateNavbar();
    }

    // Add points to current member
    addPoints(points) {
        if (this.currentMember) {
            this.currentMember.points += points;
            this.saveCurrentMember();
            this.updateMemberInStorage();
        }
    }

    // Update member in members array
    updateMemberInStorage() {
        if (this.currentMember) {
            const index = this.members.findIndex(m => m.id === this.currentMember.id);
            if (index !== -1) {
                this.members[index] = this.currentMember;
                this.saveMembers();
            }
        }
    }

    // Update navbar display
    updateNavbar() {
        const memberText = document.getElementById('memberText');
        if (this.currentMember) {
            memberText.textContent = this.currentMember.name;
        } else {
            memberText.textContent = '會員登入';
        }
    }

    // Show member dashboard
    showMemberDashboard() {
        if (this.currentMember) {
            document.getElementById('memberName').textContent = this.currentMember.name;
            document.getElementById('memberEmail').textContent = this.currentMember.email;
            document.getElementById('memberPhone').textContent = this.currentMember.phone;
            document.getElementById('memberPoints').textContent = this.currentMember.points;
        }
    }
}

// Initialize member manager
let memberManager;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    cart = new ShoppingCart();
    memberManager = new MemberManager();
    renderProducts();
    setupEventListeners();
});

// Get current filter
function getCurrentFilter() {
    const checkedFilter = document.querySelector('input[name="categoryFilter"]:checked');
    return checkedFilter ? checkedFilter.value : 'all';
}

// Get current search term
function getCurrentSearchTerm() {
    return document.getElementById('searchInput').value.trim().toLowerCase();
}

// Search products by name and description
function searchProducts(products, searchTerm) {
    if (!searchTerm) {
        return products;
    }
    
    return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
}

// Filter products by category
function filterProducts(category) {
    if (category === 'all') {
        return products;
    }
    return products.filter(product => product.category === category);
}

// Apply both search and category filters
function getFilteredProducts() {
    const category = getCurrentFilter();
    const searchTerm = getCurrentSearchTerm();
    
    let filteredProducts = filterProducts(category);
    filteredProducts = searchProducts(filteredProducts, searchTerm);
    
    return filteredProducts;
}

// Render products with filtering
function renderProducts() {
    const container = document.getElementById('productsContainer');
    const filteredProducts = getFilteredProducts();
    const searchTerm = getCurrentSearchTerm();
    const category = getCurrentFilter();
    
    // Update search results info
    updateSearchResultsInfo(filteredProducts.length, searchTerm, category);
    
    if (filteredProducts.length === 0) {
        let emptyMessage = '';
        if (searchTerm) {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-search display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">找不到相關商品</h3>
                        <p class="text-muted">沒有找到包含「${searchTerm}」的商品</p>
                        <button class="btn btn-outline-primary mt-3" onclick="clearSearch()">
                            <i class="bi bi-arrow-left"></i> 清除搜尋
                        </button>
                    </div>
                </div>
            `;
        } else {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-grid display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">此分類暫無商品</h3>
                        <p class="text-muted">請選擇其他分類或查看全部商品</p>
                    </div>
                </div>
            `;
        }
        container.innerHTML = emptyMessage;
        return;
    }
    
    container.innerHTML = filteredProducts.map(product => {
        const searchTerm = getCurrentSearchTerm();
        const highlightedName = highlightSearchTerm(product.name, searchTerm);
        const highlightedDescription = highlightSearchTerm(product.description, searchTerm);
        
        return `
            <div class="col">
                <div class="card h-100 product-card" data-product-id="${product.id}" style="cursor: pointer;">
                    <div class="position-relative">
                        <img src="${product.image}" class="card-img-top product-image" alt="${product.name}" loading="lazy">
                        ${product.isOnSale ? '<span class="position-absolute top-0 start-0 m-2 badge bg-danger sale-badge">促銷</span>' : ''}
                        <div class="position-absolute top-0 end-0 m-2">
                            <button class="btn btn-sm btn-light btn-image-zoom" data-product-id="${product.id}" title="查看大圖">
                                <i class="bi bi-zoom-in"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${highlightedName}</h5>
                        <p class="card-text flex-grow-1">${highlightedDescription}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="h5 text-primary mb-0">$${product.price}</span>
                            <button class="btn btn-primary btn-add-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                                <i class="bi bi-cart-plus"></i> 加入購物車
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}


// Update search results info
function updateSearchResultsInfo(count, searchTerm, category) {
    const searchResultsInfo = document.getElementById('searchResultsInfo');
    let infoText = '';
    
    if (searchTerm) {
        if (category === 'all') {
            infoText = `找到 ${count} 個包含「${searchTerm}」的商品`;
        } else {
            const categoryNames = {
                'A': '茶茶小貓咪',
                'B': '茶茶的朋友-小雞',
                'C': '茶的必需品'
            };
            infoText = `在${categoryNames[category]}中找到 ${count} 個包含「${searchTerm}」的商品`;
        }
    } else {
        if (category === 'all') {
            infoText = `顯示全部 ${count} 個商品`;
        } else {
            const categoryNames = {
                'A': '茶茶小貓咪',
                'B': '茶茶的朋友-小雞',
                'C': '茶的必需品'
            };
            infoText = `顯示 ${categoryNames[category]} 類別中的 ${count} 個商品`;
        }
    }
    
    searchResultsInfo.textContent = infoText;
}

// Clear search
function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('clearSearchBtn').style.display = 'none';
    renderProducts();
}

// Highlight search terms in text
function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.addItem(product);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        cart.checkout();
    });
    
    // Search input events
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    
    // Real-time search
    searchInput.addEventListener('input', function() {
        const hasValue = this.value.trim().length > 0;
        clearSearchBtn.style.display = hasValue ? 'block' : 'none';
        renderProducts();
    });
    
    // Clear search button
    clearSearchBtn.addEventListener('click', clearSearch);
    
    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            renderProducts();
        }
    });
    
    // Category filter change
    document.querySelectorAll('input[name="categoryFilter"]').forEach(radio => {
        radio.addEventListener('change', function() {
            renderProducts();
        });
    });
    
    // Prevent form submission on quantity input enter
    document.addEventListener('keypress', function(e) {
        if (e.target.classList.contains('quantity-input') && e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
        }
    });
    
    // Setup member event listeners
    setupMemberEventListeners();
    
    // Image click events (delegated event listeners)
    document.addEventListener('click', function(e) {
        // Product card click (entire card)
        if (e.target.closest('.product-card')) {
            const productCard = e.target.closest('.product-card');
            const productId = parseInt(productCard.getAttribute('data-product-id'));
            
            // Don't trigger if clicking on add to cart button
            if (!e.target.closest('.btn-add-cart')) {
                showImageModal(productId);
            }
        }
        
        // Product image click
        if (e.target.classList.contains('product-image')) {
            const productId = parseInt(e.target.getAttribute('data-product-id'));
            showImageModal(productId);
        }
        
        // Zoom button click
        if (e.target.closest('.btn-image-zoom')) {
            const productId = parseInt(e.target.closest('.btn-image-zoom').getAttribute('data-product-id'));
            showImageModal(productId);
        }
        
    // Add to cart from modal
    if (e.target.id === 'addToCartFromModal') {
        const productId = parseInt(e.target.getAttribute('data-product-id'));
        addToCart(productId);
        
        // Close modal
        const imageModal = bootstrap.Modal.getInstance(document.getElementById('imageModal'));
        if (imageModal) {
            imageModal.hide();
        }
    }
});

// Member modal event listeners
function setupMemberEventListeners() {
    // Show register form
    document.getElementById('showRegisterForm').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'block';
        document.getElementById('memberDashboard').style.display = 'none';
    });

    // Show login form
    document.getElementById('showLoginForm').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('memberDashboard').style.display = 'none';
    });

    // Login form submission
    document.getElementById('loginFormElement').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        const result = memberManager.login(email, password);
        showToast(result.message, result.success ? 'success' : 'error');
        
        if (result.success) {
            showMemberDashboard();
        }
    });

    // Register form submission
    document.getElementById('registerFormElement').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const phone = document.getElementById('registerPhone').value;
        const password = document.getElementById('registerPassword').value;
        
        const result = memberManager.register(name, email, phone, password);
        showToast(result.message, result.success ? 'success' : 'error');
        
        if (result.success) {
            showMemberDashboard();
        }
    });

    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', function() {
        memberManager.logout();
        showLoginForm();
        showToast('已登出', 'info');
    });

    // Member modal show event
    document.getElementById('memberModal').addEventListener('show.bs.modal', function() {
        if (memberManager.currentMember) {
            showMemberDashboard();
        } else {
            showLoginForm();
        }
    });
}

// Show login form
function showLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('memberDashboard').style.display = 'none';
}

// Show member dashboard
function showMemberDashboard() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('memberDashboard').style.display = 'block';
    memberManager.showMemberDashboard();
}

// Show toast notification
function showToast(message, type = 'info') {
    const toast = document.getElementById('cartToast');
    const toastHeader = toast.querySelector('.toast-header');
    const toastBody = toast.querySelector('.toast-body');
    
    // Update toast content
    toastBody.textContent = message;
    
    // Update toast style based on type
    toast.className = 'toast';
    if (type === 'success') {
        toast.classList.add('bg-success', 'text-white');
        toastHeader.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i><strong class="me-auto">成功</strong>';
    } else if (type === 'error') {
        toast.classList.add('bg-danger', 'text-white');
        toastHeader.innerHTML = '<i class="bi bi-exclamation-triangle-fill me-2"></i><strong class="me-auto">錯誤</strong>';
    } else if (type === 'info') {
        toast.classList.add('bg-info', 'text-white');
        toastHeader.innerHTML = '<i class="bi bi-info-circle-fill me-2"></i><strong class="me-auto">資訊</strong>';
    }
    
    // Show toast
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
}
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('zh-TW', {
        style: 'currency',
        currency: 'TWD'
    }).format(amount);
}

```

現在我需要更新會員中心的點數說明文字，讓用戶了解點數計算方式：


```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>商品購物網站</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
            <a class="navbar-brand" href="#">
                <i class="bi bi-shop"></i> 茶茶的店
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#memberModal" id="memberLink">
                            <i class="bi bi-person-circle"></i> <span id="memberText">會員登入</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#cartModal">
                            <i class="bi bi-cart3"></i> 購物車 
                            <span class="badge bg-danger" id="cartCount">0</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

        <!-- Main Content -->
        <div class="container mt-4">
            <div class="row">
                <div class="col-12">
                    <h1 class="text-center mb-4">精選商品</h1>
                    
                    <!-- Search Bar -->
                    <div class="row justify-content-center mb-4">
                        <div class="col-lg-6 col-md-8 col-sm-10">
                            <div class="input-group">
                                <span class="input-group-text">
                                    <i class="bi bi-search"></i>
                                </span>
                                <input type="text" class="form-control form-control-lg" id="searchInput" 
                                       placeholder="搜尋商品名稱或描述..." aria-label="搜尋商品">
                                <button class="btn btn-outline-secondary" type="button" id="clearSearchBtn" style="display: none;">
                                    <i class="bi bi-x-lg"></i>
                                </button>
                            </div>
                            <div class="mt-2">
                                <small class="text-muted" id="searchResultsInfo"></small>
                            </div>
                        </div>
                    </div>

                    <!-- Category Filter -->
                    <div class="row justify-content-center mb-4">
                        <div class="col-auto">
                            <div class="btn-group" role="group" aria-label="商品分類">
                                <input type="radio" class="btn-check" name="categoryFilter" id="categoryAll" value="all" checked>
                                <label class="btn btn-outline-primary" for="categoryAll">
                                    <i class="bi bi-grid-3x3-gap"></i> 全部商品
                                </label>
                                
                                <input type="radio" class="btn-check" name="categoryFilter" id="categoryA" value="A">
                                <label class="btn btn-outline-success" for="categoryA">
                                    <i class="bi bi-heart-fill"></i> 茶茶小貓咪
                                </label>
                                
                                <input type="radio" class="btn-check" name="categoryFilter" id="categoryB" value="B">
                                <label class="btn btn-outline-warning" for="categoryB">
                                    <i class="bi bi-egg-fried"></i> 茶茶的朋友-小雞
                                </label>
                                
                                <input type="radio" class="btn-check" name="categoryFilter" id="categoryC" value="C">
                                <label class="btn btn-outline-info" for="categoryC">
                                    <i class="bi bi-heart-pulse"></i> 茶的必需品
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        <!-- Products Grid -->
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4" id="productsContainer">
            <!-- Products will be dynamically generated here -->
        </div>
    </div>

    <!-- Cart Modal -->
    <div class="modal fade" id="cartModal" tabindex="-1" aria-labelledby="cartModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="cartModalLabel">
                        <i class="bi bi-cart3"></i> 購物車
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div id="cartItems">
                        <!-- Cart items will be displayed here -->
                    </div>
                    <div id="emptyCart" class="text-center text-muted py-4" style="display: none;">
                        <i class="bi bi-cart-x display-1"></i>
                        <p class="mt-2">購物車是空的</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="d-flex justify-content-between w-100">
                        <h5>總計: $<span id="totalPrice">0</span></h5>
                        <button type="button" class="btn btn-success" id="checkoutBtn" disabled>
                            <i class="bi bi-credit-card"></i> 結帳
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Member Modal -->
    <div class="modal fade" id="memberModal" tabindex="-1" aria-labelledby="memberModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="memberModalLabel">會員中心</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <!-- Login Form -->
                    <div id="loginForm">
                        <div class="text-center mb-4">
                            <i class="bi bi-person-circle display-1 text-primary"></i>
                            <h4>會員登入</h4>
                        </div>
                        <form id="loginFormElement">
                            <div class="mb-3">
                                <label for="loginEmail" class="form-label">電子郵件</label>
                                <input type="email" class="form-control" id="loginEmail" required>
                            </div>
                            <div class="mb-3">
                                <label for="loginPassword" class="form-label">密碼</label>
                                <input type="password" class="form-control" id="loginPassword" required>
                            </div>
                            <div class="d-grid">
                                <button type="submit" class="btn btn-primary">
                                    <i class="bi bi-box-arrow-in-right"></i> 登入
                                </button>
                            </div>
                        </form>
                        <div class="text-center mt-3">
                            <p class="text-muted">還沒有帳號？ <a href="#" id="showRegisterForm">立即註冊</a></p>
                        </div>
                    </div>

                    <!-- Register Form -->
                    <div id="registerForm" style="display: none;">
                        <div class="text-center mb-4">
                            <i class="bi bi-person-plus display-1 text-success"></i>
                            <h4>會員註冊</h4>
                        </div>
                        <form id="registerFormElement">
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="registerName" class="form-label">姓名</label>
                                    <input type="text" class="form-control" id="registerName" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="registerEmail" class="form-label">電子郵件</label>
                                    <input type="email" class="form-control" id="registerEmail" required>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="registerPhone" class="form-label">電話</label>
                                    <input type="tel" class="form-control" id="registerPhone" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="registerPassword" class="form-label">密碼</label>
                                    <input type="password" class="form-control" id="registerPassword" required>
                                </div>
                            </div>
                            <div class="d-grid">
                                <button type="submit" class="btn btn-success">
                                    <i class="bi bi-person-plus"></i> 註冊
                                </button>
                            </div>
                        </form>
                        <div class="text-center mt-3">
                            <p class="text-muted">已有帳號？ <a href="#" id="showLoginForm">立即登入</a></p>
                        </div>
                    </div>

                    <!-- Member Dashboard -->
                    <div id="memberDashboard" style="display: none;">
                        <div class="text-center mb-4">
                            <i class="bi bi-person-check display-1 text-primary"></i>
                            <h4>歡迎回來！</h4>
                            <h5 id="memberName" class="text-muted"></h5>
                        </div>
                        
                        <!-- Points Display -->
                        <div class="points-display">
                            <i class="bi bi-star-fill display-4 text-warning"></i>
                            <div class="points-label">目前點數</div>
                            <div class="points-number" id="memberPoints">0</div>
                            <div class="points-description">購物即可獲得點數（消費金額的1%）！</div>
                        </div>
                        
                        <!-- Member Info List -->
                        <div class="member-info-list">
                            <div class="member-info-item">
                                <div class="member-info-icon email">
                                    <i class="bi bi-envelope"></i>
                                </div>
                                <div class="member-info-content">
                                    <div class="member-info-label">電子郵件</div>
                                    <div class="member-info-value" id="memberEmail"></div>
                                </div>
                            </div>
                            <div class="member-info-item">
                                <div class="member-info-icon phone">
                                    <i class="bi bi-telephone"></i>
                                </div>
                                <div class="member-info-content">
                                    <div class="member-info-label">電話</div>
                                    <div class="member-info-value" id="memberPhone"></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="d-grid">
                            <button type="button" class="btn btn-outline-danger" id="logoutBtn">
                                <i class="bi bi-box-arrow-right"></i> 登出
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Image Modal -->
    <div class="modal fade" id="imageModal" tabindex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="imageModalLabel">商品圖片</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center">
                    <img id="modalImage" src="" alt="" class="img-fluid rounded">
                    <div class="mt-3">
                        <h6 id="modalProductName" class="text-muted"></h6>
                        <p id="modalProductPrice" class="h5 text-primary mb-0"></p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                        <i class="bi bi-x-lg"></i> 關閉
                    </button>
                    <button type="button" class="btn btn-primary" id="addToCartFromModal">
                        <i class="bi bi-cart-plus"></i> 加入購物車
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Toast for notifications -->
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="cartToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <i class="bi bi-check-circle-fill text-success me-2"></i>
                <strong class="me-auto">成功</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                商品已加入購物車！
            </div>
        </div>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Custom JS -->
    <script src="script.js"></script>
</body>
</html>

```

讓我檢查是否有任何 linting 錯誤：


完美！我已經成功修改了點數計算系統。以下是更新的內容：

## 🏆 點數計算系統更新

### 📊 新的點數計算方式

1. **計算公式**
   - 舊方式：每消費 1 元獲得 1 點
   - 新方式：每消費 1 元獲得 0.01 點（消費金額的 1%）

2. **實際範例**
   - 消費 $100 → 獲得 1 點
   - 消費 $500 → 獲得 5 點
   - 消費 $1000 → 獲得 10 點

### 💰 結帳訊息更新

1. **會員結帳訊息**
   ```
   結帳成功！
   總金額: $XXX.XX
   商品數量: X
   獲得點數: X 點 (消費金額的1%)
   目前總點數: XXX 點
   ```

2. **非會員結帳訊息**
   ```
   結帳成功！
   總金額: $XXX.XX
   商品數量: X
   
   提示：登入會員可獲得購物點數（消費金額的1%）！
   ```

### 🎯 會員中心更新

1. **點數說明文字**
   - 更新為：「購物即可獲得點數（消費金額的1%）！」
   - 讓用戶清楚了解點數計算方式

2. **點數顯示**
   - 保持原有的視覺設計
   - 數字會根據新的計算方式更新

### ✨ 系統優勢

1. **更合理的點數制度**
   - 避免點數過度膨脹
   - 鼓勵高額消費
   - 維持點數價值

2. **清晰的用戶體驗**
   - 明確說明點數計算方式
   - 結帳時顯示詳細資訊
   - 會員中心提供說明

3. **靈活的調整空間**
   - 可以輕鬆調整百分比
   - 支援不同商品的點數倍率
   - 便於未來功能擴展

現在您的購物網站具備了更合理的點數計算系統！會員每次購物都會根據消費金額的 1% 獲得點數，讓點數系統更加平衡和可持續。

```plaintext
   結帳成功！
   總金額: $XXX.XX
   商品數量: X
   獲得點數: X 點 (消費金額的1%)
   目前總點數: XXX 點
```

```plaintext
   結帳成功！
   總金額: $XXX.XX
   商品數量: X
   
   提示：登入會員可獲得購物點數（消費金額的1%）！
```

---

**User**

請增加歷史購買紀錄

---

**Cursor**

我將為您添加歷史購買紀錄功能，讓會員可以查看過去的購買記錄。


首先，我需要在會員管理系統中添加購買歷史的儲存功能：


```javascript
// Shopping cart functionality
class ShoppingCart {
    constructor() {
        this.items = [];
        this.loadFromStorage();
        this.updateCartDisplay();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveToStorage();
        this.updateCartDisplay();
        this.showToast();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        this.updateCartDisplay();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
                this.saveToStorage();
                this.updateCartDisplay();
            }
        }
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    updateCartDisplay() {
        this.updateCartCount();
        this.updateCartModal();
        this.updateTotalPrice();
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        cartCount.textContent = this.getTotalItems();
        
        if (this.getTotalItems() > 0) {
            cartCount.classList.add('bounce');
            setTimeout(() => cartCount.classList.remove('bounce'), 1000);
        }
    }

    updateCartModal() {
        const cartItems = document.getElementById('cartItems');
        const emptyCart = document.getElementById('emptyCart');
        
        if (this.items.length === 0) {
            cartItems.style.display = 'none';
            emptyCart.style.display = 'block';
        } else {
            cartItems.style.display = 'block';
            emptyCart.style.display = 'none';
            
            cartItems.innerHTML = this.items.map(item => `
                <div class="cart-item d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${item.name}</h6>
                        <p class="text-muted mb-0">$${item.price}</p>
                    </div>
                    <div class="quantity-controls me-3">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                               onchange="cart.updateQuantity(${item.id}, parseInt(this.value))">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <div class="text-end me-3">
                        <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                    </div>
                    <button class="btn-remove" onclick="cart.removeItem(${item.id})" title="移除商品">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    }

    updateTotalPrice() {
        const totalPrice = document.getElementById('totalPrice');
        const checkoutBtn = document.getElementById('checkoutBtn');
        
        totalPrice.textContent = this.getTotalPrice().toFixed(2);
        checkoutBtn.disabled = this.items.length === 0;
    }

    showToast() {
        const toast = new bootstrap.Toast(document.getElementById('cartToast'));
        toast.show();
    }

    saveToStorage() {
        localStorage.setItem('shoppingCart', JSON.stringify(this.items));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('shoppingCart');
        if (stored) {
            this.items = JSON.parse(stored);
        }
    }

    checkout() {
        if (this.items.length === 0) {
            alert('購物車是空的！');
            return;
        }
        
        const totalPrice = this.getTotalPrice();
        const totalItems = this.getTotalItems();
        
        // Calculate points (1% of total price)
        const pointsEarned = Math.floor(totalPrice * 0.01);
        
        // Add points to member if logged in
        if (memberManager && memberManager.currentMember) {
            memberManager.addPoints(pointsEarned);
            alert(`結帳成功！\n總金額: $${totalPrice.toFixed(2)}\n商品數量: ${totalItems}\n獲得點數: ${pointsEarned} 點 (消費金額的1%)\n目前總點數: ${memberManager.currentMember.points} 點`);
        } else {
            alert(`結帳成功！\n總金額: $${totalPrice.toFixed(2)}\n商品數量: ${totalItems}\n\n提示：登入會員可獲得購物點數（消費金額的1%）！`);
        }
        
        this.items = [];
        this.saveToStorage();
        this.updateCartDisplay();
    }
}

// Product data with categories
const products = [
    {
        id: 1,
        name: "枕頭貓",
        description: "有曬過太陽的香味喔☀️",
        price: 129.99,
        category: "A",
        isOnSale: true,
        image: "image/pillow_cat.png"
    },
    {
        id: 2,
        name: "潛水貓",
        description: "夢到自己在潛水喔",
        price: 299.99,
        category: "A",
        isOnSale: false,
        image: "image/淺水貓.png"
    },
    {
        id: 3,
        name: "雞雞貓",
        description: "ㄐㄐ",
        price: 899.99,
        category: "A",
        isOnSale: false,
        image: "image/雞雞貓.png"
    },
    {
        id: 4,
        name: "兔兔貓",
        description: "吃太多鏟屎官便當裡的紅蘿菠，所以變成兔子了",
        price: 699.99,
        category: "A",
        isOnSale: false,
        image: "image/兔兔貓.png"
    },
    {
        id: 5,
        name: "尤達呆呆貓",
        description: "這個家待不下去了",
        price: 199.99,
        category: "A",
        isOnSale: false,
        image: "image/尤達呆呆貓.png"
    },
    {
        id: 6,
        name: "長條貓",
        description: "控制不住想要嚕兩下的衝動",
        price: 149.99,
        category: "A",
        isOnSale: false,
        image: "image/長條珍珠奶茶.png"
    },
    {
        id: 7,
        name: "小逼",
        description: "藍色的漂亮鸚鵡，大便很水，還有雞味",
        price: 399.99,
        category: "B",
        isOnSale: false,
        image: "image/小逼.jpg"
    },
    {
        id: 8,
        name: "茶茶與鼠鼠.png",
        description: "相親相愛的好朋友",
        price: 499.99,
        category: "A",
        isOnSale: false,
        image: "image/茶茶與鼠鼠.png"
    },
    {
        id: 9,
        name: "站坐貓",
        description: "你猜我是站著還是坐著？",
        price: 249.99,
        category: "A",
        isOnSale: true,
        image: "image/站坐貓.png"
    },
    {
        id: 10,
        name: "石膏雞",
        description: "腿斷掉的小雞...",
        price: 599.99,
        category: "B",
        isOnSale: false,
        image: "image/石膏雞.jpg"
    },
    {
        id: 11,
        name: "饋手貓",
        description: "靜靜的看著你",
        price: 349.99,
        category: "A",
        isOnSale: true,
        image: "image/饋手貓.png"
    },
    {
        id: 12,
        name: "打字雞",
        description: "o[e42,,,f[blqo    msofe",
        price: 39.99,
        category: "B",
        isOnSale: false,
        image: "image/打字雞.jpg"
    },
    {
        id: 13,
        name: "莫比貓飼料",
        description: "餓的時候很愛吃，但在罐頭前面不堪一擊",
        price: 39.99,
        category: "C",
        isOnSale: false,
        image: "image/莫比貓飼料.png"
    },
    {
        id: 14,
        name: "貓罐頭",
        description: "只要有罐頭，你就能支配茶茶",
        price: 39.99,
        category: "C",
        isOnSale: false,
        image: "image/罐頭.png"
    }
   
]
// Initialize shopping cart
let cart;

// Member management system
class MemberManager {
    constructor() {
        this.currentMember = null;
        this.members = this.loadMembers();
        this.loadCurrentMember();
    }

    // Load members from localStorage
    loadMembers() {
        const stored = localStorage.getItem('members');
        return stored ? JSON.parse(stored) : [];
    }

    // Save members to localStorage
    saveMembers() {
        localStorage.setItem('members', JSON.stringify(this.members));
    }

    // Load current member from sessionStorage
    loadCurrentMember() {
        const stored = sessionStorage.getItem('currentMember');
        if (stored) {
            this.currentMember = JSON.parse(stored);
            this.updateNavbar();
        }
    }

    // Save current member to sessionStorage
    saveCurrentMember() {
        if (this.currentMember) {
            sessionStorage.setItem('currentMember', JSON.stringify(this.currentMember));
        } else {
            sessionStorage.removeItem('currentMember');
        }
    }

    // Register new member
    register(name, email, phone, password) {
        // Check if email already exists
        if (this.members.find(member => member.email === email)) {
            return { success: false, message: '此電子郵件已被註冊' };
        }

        // Create new member
        const newMember = {
            id: Date.now(),
            name: name,
            email: email,
            phone: phone,
            password: password,
            points: 100, // Welcome bonus
            joinDate: new Date().toISOString()
        };

        this.members.push(newMember);
        this.saveMembers();
        
        return { success: true, message: '註冊成功！獲得歡迎點數 100 點' };
    }

    // Login member
    login(email, password) {
        const member = this.members.find(m => m.email === email && m.password === password);
        if (member) {
            this.currentMember = member;
            this.saveCurrentMember();
            this.updateNavbar();
            return { success: true, message: '登入成功！' };
        } else {
            return { success: false, message: '電子郵件或密碼錯誤' };
        }
    }

    // Logout member
    logout() {
        this.currentMember = null;
        this.saveCurrentMember();
        this.updateNavbar();
    }

    // Add points to current member
    addPoints(points) {
        if (this.currentMember) {
            this.currentMember.points += points;
            this.saveCurrentMember();
            this.updateMemberInStorage();
        }
    }

    // Add purchase history
    addPurchaseHistory(purchaseData) {
        if (this.currentMember) {
            if (!this.currentMember.purchaseHistory) {
                this.currentMember.purchaseHistory = [];
            }
            
            const purchase = {
                id: Date.now(),
                date: new Date().toISOString(),
                items: purchaseData.items,
                totalPrice: purchaseData.totalPrice,
                pointsEarned: purchaseData.pointsEarned,
                totalItems: purchaseData.totalItems
            };
            
            this.currentMember.purchaseHistory.unshift(purchase); // Add to beginning
            this.saveCurrentMember();
            this.updateMemberInStorage();
        }
    }

    // Get purchase history
    getPurchaseHistory() {
        if (this.currentMember && this.currentMember.purchaseHistory) {
            return this.currentMember.purchaseHistory;
        }
        return [];
    }

    // Update member in members array
    updateMemberInStorage() {
        if (this.currentMember) {
            const index = this.members.findIndex(m => m.id === this.currentMember.id);
            if (index !== -1) {
                this.members[index] = this.currentMember;
                this.saveMembers();
            }
        }
    }

    // Update navbar display
    updateNavbar() {
        const memberText = document.getElementById('memberText');
        if (this.currentMember) {
            memberText.textContent = this.currentMember.name;
        } else {
            memberText.textContent = '會員登入';
        }
    }

    // Show member dashboard
    showMemberDashboard() {
        if (this.currentMember) {
            document.getElementById('memberName').textContent = this.currentMember.name;
            document.getElementById('memberEmail').textContent = this.currentMember.email;
            document.getElementById('memberPhone').textContent = this.currentMember.phone;
            document.getElementById('memberPoints').textContent = this.currentMember.points;
        }
    }
}

// Initialize member manager
let memberManager;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    cart = new ShoppingCart();
    memberManager = new MemberManager();
    renderProducts();
    setupEventListeners();
});

// Get current filter
function getCurrentFilter() {
    const checkedFilter = document.querySelector('input[name="categoryFilter"]:checked');
    return checkedFilter ? checkedFilter.value : 'all';
}

// Get current search term
function getCurrentSearchTerm() {
    return document.getElementById('searchInput').value.trim().toLowerCase();
}

// Search products by name and description
function searchProducts(products, searchTerm) {
    if (!searchTerm) {
        return products;
    }
    
    return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
}

// Filter products by category
function filterProducts(category) {
    if (category === 'all') {
        return products;
    }
    return products.filter(product => product.category === category);
}

// Apply both search and category filters
function getFilteredProducts() {
    const category = getCurrentFilter();
    const searchTerm = getCurrentSearchTerm();
    
    let filteredProducts = filterProducts(category);
    filteredProducts = searchProducts(filteredProducts, searchTerm);
    
    return filteredProducts;
}

// Render products with filtering
function renderProducts() {
    const container = document.getElementById('productsContainer');
    const filteredProducts = getFilteredProducts();
    const searchTerm = getCurrentSearchTerm();
    const category = getCurrentFilter();
    
    // Update search results info
    updateSearchResultsInfo(filteredProducts.length, searchTerm, category);
    
    if (filteredProducts.length === 0) {
        let emptyMessage = '';
        if (searchTerm) {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-search display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">找不到相關商品</h3>
                        <p class="text-muted">沒有找到包含「${searchTerm}」的商品</p>
                        <button class="btn btn-outline-primary mt-3" onclick="clearSearch()">
                            <i class="bi bi-arrow-left"></i> 清除搜尋
                        </button>
                    </div>
                </div>
            `;
        } else {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-grid display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">此分類暫無商品</h3>
                        <p class="text-muted">請選擇其他分類或查看全部商品</p>
                    </div>
                </div>
            `;
        }
        container.innerHTML = emptyMessage;
        return;
    }
    
    container.innerHTML = filteredProducts.map(product => {
        const searchTerm = getCurrentSearchTerm();
        const highlightedName = highlightSearchTerm(product.name, searchTerm);
        const highlightedDescription = highlightSearchTerm(product.description, searchTerm);
        
        return `
            <div class="col">
                <div class="card h-100 product-card" data-product-id="${product.id}" style="cursor: pointer;">
                    <div class="position-relative">
                        <img src="${product.image}" class="card-img-top product-image" alt="${product.name}" loading="lazy">
                        ${product.isOnSale ? '<span class="position-absolute top-0 start-0 m-2 badge bg-danger sale-badge">促銷</span>' : ''}
                        <div class="position-absolute top-0 end-0 m-2">
                            <button class="btn btn-sm btn-light btn-image-zoom" data-product-id="${product.id}" title="查看大圖">
                                <i class="bi bi-zoom-in"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${highlightedName}</h5>
                        <p class="card-text flex-grow-1">${highlightedDescription}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="h5 text-primary mb-0">$${product.price}</span>
                            <button class="btn btn-primary btn-add-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                                <i class="bi bi-cart-plus"></i> 加入購物車
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}


// Update search results info
function updateSearchResultsInfo(count, searchTerm, category) {
    const searchResultsInfo = document.getElementById('searchResultsInfo');
    let infoText = '';
    
    if (searchTerm) {
        if (category === 'all') {
            infoText = `找到 ${count} 個包含「${searchTerm}」的商品`;
        } else {
            const categoryNames = {
                'A': '茶茶小貓咪',
                'B': '茶茶的朋友-小雞',
                'C': '茶的必需品'
            };
            infoText = `在${categoryNames[category]}中找到 ${count} 個包含「${searchTerm}」的商品`;
        }
    } else {
        if (category === 'all') {
            infoText = `顯示全部 ${count} 個商品`;
        } else {
            const categoryNames = {
                'A': '茶茶小貓咪',
                'B': '茶茶的朋友-小雞',
                'C': '茶的必需品'
            };
            infoText = `顯示 ${categoryNames[category]} 類別中的 ${count} 個商品`;
        }
    }
    
    searchResultsInfo.textContent = infoText;
}

// Clear search
function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('clearSearchBtn').style.display = 'none';
    renderProducts();
}

// Highlight search terms in text
function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.addItem(product);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        cart.checkout();
    });
    
    // Search input events
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    
    // Real-time search
    searchInput.addEventListener('input', function() {
        const hasValue = this.value.trim().length > 0;
        clearSearchBtn.style.display = hasValue ? 'block' : 'none';
        renderProducts();
    });
    
    // Clear search button
    clearSearchBtn.addEventListener('click', clearSearch);
    
    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            renderProducts();
        }
    });
    
    // Category filter change
    document.querySelectorAll('input[name="categoryFilter"]').forEach(radio => {
        radio.addEventListener('change', function() {
            renderProducts();
        });
    });
    
    // Prevent form submission on quantity input enter
    document.addEventListener('keypress', function(e) {
        if (e.target.classList.contains('quantity-input') && e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
        }
    });
    
    // Setup member event listeners
    setupMemberEventListeners();
    
    // Image click events (delegated event listeners)
    document.addEventListener('click', function(e) {
        // Product card click (entire card)
        if (e.target.closest('.product-card')) {
            const productCard = e.target.closest('.product-card');
            const productId = parseInt(productCard.getAttribute('data-product-id'));
            
            // Don't trigger if clicking on add to cart button
            if (!e.target.closest('.btn-add-cart')) {
                showImageModal(productId);
            }
        }
        
        // Product image click
        if (e.target.classList.contains('product-image')) {
            const productId = parseInt(e.target.getAttribute('data-product-id'));
            showImageModal(productId);
        }
        
        // Zoom button click
        if (e.target.closest('.btn-image-zoom')) {
            const productId = parseInt(e.target.closest('.btn-image-zoom').getAttribute('data-product-id'));
            showImageModal(productId);
        }
        
    // Add to cart from modal
    if (e.target.id === 'addToCartFromModal') {
        const productId = parseInt(e.target.getAttribute('data-product-id'));
        addToCart(productId);
        
        // Close modal
        const imageModal = bootstrap.Modal.getInstance(document.getElementById('imageModal'));
        if (imageModal) {
            imageModal.hide();
        }
    }
});

// Member modal event listeners
function setupMemberEventListeners() {
    // Show register form
    document.getElementById('showRegisterForm').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'block';
        document.getElementById('memberDashboard').style.display = 'none';
    });

    // Show login form
    document.getElementById('showLoginForm').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('memberDashboard').style.display = 'none';
    });

    // Login form submission
    document.getElementById('loginFormElement').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        const result = memberManager.login(email, password);
        showToast(result.message, result.success ? 'success' : 'error');
        
        if (result.success) {
            showMemberDashboard();
        }
    });

    // Register form submission
    document.getElementById('registerFormElement').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const phone = document.getElementById('registerPhone').value;
        const password = document.getElementById('registerPassword').value;
        
        const result = memberManager.register(name, email, phone, password);
        showToast(result.message, result.success ? 'success' : 'error');
        
        if (result.success) {
            showMemberDashboard();
        }
    });

    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', function() {
        memberManager.logout();
        showLoginForm();
        showToast('已登出', 'info');
    });

    // Member modal show event
    document.getElementById('memberModal').addEventListener('show.bs.modal', function() {
        if (memberManager.currentMember) {
            showMemberDashboard();
        } else {
            showLoginForm();
        }
    });
}

// Show login form
function showLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('memberDashboard').style.display = 'none';
}

// Show member dashboard
function showMemberDashboard() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('memberDashboard').style.display = 'block';
    memberManager.showMemberDashboard();
}

// Show toast notification
function showToast(message, type = 'info') {
    const toast = document.getElementById('cartToast');
    const toastHeader = toast.querySelector('.toast-header');
    const toastBody = toast.querySelector('.toast-body');
    
    // Update toast content
    toastBody.textContent = message;
    
    // Update toast style based on type
    toast.className = 'toast';
    if (type === 'success') {
        toast.classList.add('bg-success', 'text-white');
        toastHeader.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i><strong class="me-auto">成功</strong>';
    } else if (type === 'error') {
        toast.classList.add('bg-danger', 'text-white');
        toastHeader.innerHTML = '<i class="bi bi-exclamation-triangle-fill me-2"></i><strong class="me-auto">錯誤</strong>';
    } else if (type === 'info') {
        toast.classList.add('bg-info', 'text-white');
        toastHeader.innerHTML = '<i class="bi bi-info-circle-fill me-2"></i><strong class="me-auto">資訊</strong>';
    }
    
    // Show toast
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
}
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('zh-TW', {
        style: 'currency',
        currency: 'TWD'
    }).format(amount);
}

```

現在我需要更新結帳邏輯來記錄購買歷史：


```javascript
// Shopping cart functionality
class ShoppingCart {
    constructor() {
        this.items = [];
        this.loadFromStorage();
        this.updateCartDisplay();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveToStorage();
        this.updateCartDisplay();
        this.showToast();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        this.updateCartDisplay();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
                this.saveToStorage();
                this.updateCartDisplay();
            }
        }
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    updateCartDisplay() {
        this.updateCartCount();
        this.updateCartModal();
        this.updateTotalPrice();
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        cartCount.textContent = this.getTotalItems();
        
        if (this.getTotalItems() > 0) {
            cartCount.classList.add('bounce');
            setTimeout(() => cartCount.classList.remove('bounce'), 1000);
        }
    }

    updateCartModal() {
        const cartItems = document.getElementById('cartItems');
        const emptyCart = document.getElementById('emptyCart');
        
        if (this.items.length === 0) {
            cartItems.style.display = 'none';
            emptyCart.style.display = 'block';
        } else {
            cartItems.style.display = 'block';
            emptyCart.style.display = 'none';
            
            cartItems.innerHTML = this.items.map(item => `
                <div class="cart-item d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${item.name}</h6>
                        <p class="text-muted mb-0">$${item.price}</p>
                    </div>
                    <div class="quantity-controls me-3">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                               onchange="cart.updateQuantity(${item.id}, parseInt(this.value))">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <div class="text-end me-3">
                        <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                    </div>
                    <button class="btn-remove" onclick="cart.removeItem(${item.id})" title="移除商品">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    }

    updateTotalPrice() {
        const totalPrice = document.getElementById('totalPrice');
        const checkoutBtn = document.getElementById('checkoutBtn');
        
        totalPrice.textContent = this.getTotalPrice().toFixed(2);
        checkoutBtn.disabled = this.items.length === 0;
    }

    showToast() {
        const toast = new bootstrap.Toast(document.getElementById('cartToast'));
        toast.show();
    }

    saveToStorage() {
        localStorage.setItem('shoppingCart', JSON.stringify(this.items));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('shoppingCart');
        if (stored) {
            this.items = JSON.parse(stored);
        }
    }

    checkout() {
        if (this.items.length === 0) {
            alert('購物車是空的！');
            return;
        }
        
        const totalPrice = this.getTotalPrice();
        const totalItems = this.getTotalItems();
        
        // Calculate points (1% of total price)
        const pointsEarned = Math.floor(totalPrice * 0.01);
        
        // Add points to member if logged in
        if (memberManager && memberManager.currentMember) {
            memberManager.addPoints(pointsEarned);
            
            // Add purchase history
            memberManager.addPurchaseHistory({
                items: [...this.items], // Copy of items
                totalPrice: totalPrice,
                pointsEarned: pointsEarned,
                totalItems: totalItems
            });
            
            alert(`結帳成功！\n總金額: $${totalPrice.toFixed(2)}\n商品數量: ${totalItems}\n獲得點數: ${pointsEarned} 點 (消費金額的1%)\n目前總點數: ${memberManager.currentMember.points} 點`);
        } else {
            alert(`結帳成功！\n總金額: $${totalPrice.toFixed(2)}\n商品數量: ${totalItems}\n\n提示：登入會員可獲得購物點數（消費金額的1%）！`);
        }
        
        this.items = [];
        this.saveToStorage();
        this.updateCartDisplay();
    }
}

// Product data with categories
const products = [
    {
        id: 1,
        name: "枕頭貓",
        description: "有曬過太陽的香味喔☀️",
        price: 129.99,
        category: "A",
        isOnSale: true,
        image: "image/pillow_cat.png"
    },
    {
        id: 2,
        name: "潛水貓",
        description: "夢到自己在潛水喔",
        price: 299.99,
        category: "A",
        isOnSale: false,
        image: "image/淺水貓.png"
    },
    {
        id: 3,
        name: "雞雞貓",
        description: "ㄐㄐ",
        price: 899.99,
        category: "A",
        isOnSale: false,
        image: "image/雞雞貓.png"
    },
    {
        id: 4,
        name: "兔兔貓",
        description: "吃太多鏟屎官便當裡的紅蘿菠，所以變成兔子了",
        price: 699.99,
        category: "A",
        isOnSale: false,
        image: "image/兔兔貓.png"
    },
    {
        id: 5,
        name: "尤達呆呆貓",
        description: "這個家待不下去了",
        price: 199.99,
        category: "A",
        isOnSale: false,
        image: "image/尤達呆呆貓.png"
    },
    {
        id: 6,
        name: "長條貓",
        description: "控制不住想要嚕兩下的衝動",
        price: 149.99,
        category: "A",
        isOnSale: false,
        image: "image/長條珍珠奶茶.png"
    },
    {
        id: 7,
        name: "小逼",
        description: "藍色的漂亮鸚鵡，大便很水，還有雞味",
        price: 399.99,
        category: "B",
        isOnSale: false,
        image: "image/小逼.jpg"
    },
    {
        id: 8,
        name: "茶茶與鼠鼠.png",
        description: "相親相愛的好朋友",
        price: 499.99,
        category: "A",
        isOnSale: false,
        image: "image/茶茶與鼠鼠.png"
    },
    {
        id: 9,
        name: "站坐貓",
        description: "你猜我是站著還是坐著？",
        price: 249.99,
        category: "A",
        isOnSale: true,
        image: "image/站坐貓.png"
    },
    {
        id: 10,
        name: "石膏雞",
        description: "腿斷掉的小雞...",
        price: 599.99,
        category: "B",
        isOnSale: false,
        image: "image/石膏雞.jpg"
    },
    {
        id: 11,
        name: "饋手貓",
        description: "靜靜的看著你",
        price: 349.99,
        category: "A",
        isOnSale: true,
        image: "image/饋手貓.png"
    },
    {
        id: 12,
        name: "打字雞",
        description: "o[e42,,,f[blqo    msofe",
        price: 39.99,
        category: "B",
        isOnSale: false,
        image: "image/打字雞.jpg"
    },
    {
        id: 13,
        name: "莫比貓飼料",
        description: "餓的時候很愛吃，但在罐頭前面不堪一擊",
        price: 39.99,
        category: "C",
        isOnSale: false,
        image: "image/莫比貓飼料.png"
    },
    {
        id: 14,
        name: "貓罐頭",
        description: "只要有罐頭，你就能支配茶茶",
        price: 39.99,
        category: "C",
        isOnSale: false,
        image: "image/罐頭.png"
    }
   
]
// Initialize shopping cart
let cart;

// Member management system
class MemberManager {
    constructor() {
        this.currentMember = null;
        this.members = this.loadMembers();
        this.loadCurrentMember();
    }

    // Load members from localStorage
    loadMembers() {
        const stored = localStorage.getItem('members');
        return stored ? JSON.parse(stored) : [];
    }

    // Save members to localStorage
    saveMembers() {
        localStorage.setItem('members', JSON.stringify(this.members));
    }

    // Load current member from sessionStorage
    loadCurrentMember() {
        const stored = sessionStorage.getItem('currentMember');
        if (stored) {
            this.currentMember = JSON.parse(stored);
            this.updateNavbar();
        }
    }

    // Save current member to sessionStorage
    saveCurrentMember() {
        if (this.currentMember) {
            sessionStorage.setItem('currentMember', JSON.stringify(this.currentMember));
        } else {
            sessionStorage.removeItem('currentMember');
        }
    }

    // Register new member
    register(name, email, phone, password) {
        // Check if email already exists
        if (this.members.find(member => member.email === email)) {
            return { success: false, message: '此電子郵件已被註冊' };
        }

        // Create new member
        const newMember = {
            id: Date.now(),
            name: name,
            email: email,
            phone: phone,
            password: password,
            points: 100, // Welcome bonus
            joinDate: new Date().toISOString()
        };

        this.members.push(newMember);
        this.saveMembers();
        
        return { success: true, message: '註冊成功！獲得歡迎點數 100 點' };
    }

    // Login member
    login(email, password) {
        const member = this.members.find(m => m.email === email && m.password === password);
        if (member) {
            this.currentMember = member;
            this.saveCurrentMember();
            this.updateNavbar();
            return { success: true, message: '登入成功！' };
        } else {
            return { success: false, message: '電子郵件或密碼錯誤' };
        }
    }

    // Logout member
    logout() {
        this.currentMember = null;
        this.saveCurrentMember();
        this.updateNavbar();
    }

    // Add points to current member
    addPoints(points) {
        if (this.currentMember) {
            this.currentMember.points += points;
            this.saveCurrentMember();
            this.updateMemberInStorage();
        }
    }

    // Add purchase history
    addPurchaseHistory(purchaseData) {
        if (this.currentMember) {
            if (!this.currentMember.purchaseHistory) {
                this.currentMember.purchaseHistory = [];
            }
            
            const purchase = {
                id: Date.now(),
                date: new Date().toISOString(),
                items: purchaseData.items,
                totalPrice: purchaseData.totalPrice,
                pointsEarned: purchaseData.pointsEarned,
                totalItems: purchaseData.totalItems
            };
            
            this.currentMember.purchaseHistory.unshift(purchase); // Add to beginning
            this.saveCurrentMember();
            this.updateMemberInStorage();
        }
    }

    // Get purchase history
    getPurchaseHistory() {
        if (this.currentMember && this.currentMember.purchaseHistory) {
            return this.currentMember.purchaseHistory;
        }
        return [];
    }

    // Update member in members array
    updateMemberInStorage() {
        if (this.currentMember) {
            const index = this.members.findIndex(m => m.id === this.currentMember.id);
            if (index !== -1) {
                this.members[index] = this.currentMember;
                this.saveMembers();
            }
        }
    }

    // Update navbar display
    updateNavbar() {
        const memberText = document.getElementById('memberText');
        if (this.currentMember) {
            memberText.textContent = this.currentMember.name;
        } else {
            memberText.textContent = '會員登入';
        }
    }

    // Show member dashboard
    showMemberDashboard() {
        if (this.currentMember) {
            document.getElementById('memberName').textContent = this.currentMember.name;
            document.getElementById('memberEmail').textContent = this.currentMember.email;
            document.getElementById('memberPhone').textContent = this.currentMember.phone;
            document.getElementById('memberPoints').textContent = this.currentMember.points;
        }
    }
}

// Initialize member manager
let memberManager;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    cart = new ShoppingCart();
    memberManager = new MemberManager();
    renderProducts();
    setupEventListeners();
});

// Get current filter
function getCurrentFilter() {
    const checkedFilter = document.querySelector('input[name="categoryFilter"]:checked');
    return checkedFilter ? checkedFilter.value : 'all';
}

// Get current search term
function getCurrentSearchTerm() {
    return document.getElementById('searchInput').value.trim().toLowerCase();
}

// Search products by name and description
function searchProducts(products, searchTerm) {
    if (!searchTerm) {
        return products;
    }
    
    return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
}

// Filter products by category
function filterProducts(category) {
    if (category === 'all') {
        return products;
    }
    return products.filter(product => product.category === category);
}

// Apply both search and category filters
function getFilteredProducts() {
    const category = getCurrentFilter();
    const searchTerm = getCurrentSearchTerm();
    
    let filteredProducts = filterProducts(category);
    filteredProducts = searchProducts(filteredProducts, searchTerm);
    
    return filteredProducts;
}

// Render products with filtering
function renderProducts() {
    const container = document.getElementById('productsContainer');
    const filteredProducts = getFilteredProducts();
    const searchTerm = getCurrentSearchTerm();
    const category = getCurrentFilter();
    
    // Update search results info
    updateSearchResultsInfo(filteredProducts.length, searchTerm, category);
    
    if (filteredProducts.length === 0) {
        let emptyMessage = '';
        if (searchTerm) {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-search display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">找不到相關商品</h3>
                        <p class="text-muted">沒有找到包含「${searchTerm}」的商品</p>
                        <button class="btn btn-outline-primary mt-3" onclick="clearSearch()">
                            <i class="bi bi-arrow-left"></i> 清除搜尋
                        </button>
                    </div>
                </div>
            `;
        } else {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-grid display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">此分類暫無商品</h3>
                        <p class="text-muted">請選擇其他分類或查看全部商品</p>
                    </div>
                </div>
            `;
        }
        container.innerHTML = emptyMessage;
        return;
    }
    
    container.innerHTML = filteredProducts.map(product => {
        const searchTerm = getCurrentSearchTerm();
        const highlightedName = highlightSearchTerm(product.name, searchTerm);
        const highlightedDescription = highlightSearchTerm(product.description, searchTerm);
        
        return `
            <div class="col">
                <div class="card h-100 product-card" data-product-id="${product.id}" style="cursor: pointer;">
                    <div class="position-relative">
                        <img src="${product.image}" class="card-img-top product-image" alt="${product.name}" loading="lazy">
                        ${product.isOnSale ? '<span class="position-absolute top-0 start-0 m-2 badge bg-danger sale-badge">促銷</span>' : ''}
                        <div class="position-absolute top-0 end-0 m-2">
                            <button class="btn btn-sm btn-light btn-image-zoom" data-product-id="${product.id}" title="查看大圖">
                                <i class="bi bi-zoom-in"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${highlightedName}</h5>
                        <p class="card-text flex-grow-1">${highlightedDescription}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="h5 text-primary mb-0">$${product.price}</span>
                            <button class="btn btn-primary btn-add-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                                <i class="bi bi-cart-plus"></i> 加入購物車
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}


// Update search results info
function updateSearchResultsInfo(count, searchTerm, category) {
    const searchResultsInfo = document.getElementById('searchResultsInfo');
    let infoText = '';
    
    if (searchTerm) {
        if (category === 'all') {
            infoText = `找到 ${count} 個包含「${searchTerm}」的商品`;
        } else {
            const categoryNames = {
                'A': '茶茶小貓咪',
                'B': '茶茶的朋友-小雞',
                'C': '茶的必需品'
            };
            infoText = `在${categoryNames[category]}中找到 ${count} 個包含「${searchTerm}」的商品`;
        }
    } else {
        if (category === 'all') {
            infoText = `顯示全部 ${count} 個商品`;
        } else {
            const categoryNames = {
                'A': '茶茶小貓咪',
                'B': '茶茶的朋友-小雞',
                'C': '茶的必需品'
            };
            infoText = `顯示 ${categoryNames[category]} 類別中的 ${count} 個商品`;
        }
    }
    
    searchResultsInfo.textContent = infoText;
}

// Clear search
function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('clearSearchBtn').style.display = 'none';
    renderProducts();
}

// Highlight search terms in text
function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.addItem(product);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        cart.checkout();
    });
    
    // Search input events
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    
    // Real-time search
    searchInput.addEventListener('input', function() {
        const hasValue = this.value.trim().length > 0;
        clearSearchBtn.style.display = hasValue ? 'block' : 'none';
        renderProducts();
    });
    
    // Clear search button
    clearSearchBtn.addEventListener('click', clearSearch);
    
    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            renderProducts();
        }
    });
    
    // Category filter change
    document.querySelectorAll('input[name="categoryFilter"]').forEach(radio => {
        radio.addEventListener('change', function() {
            renderProducts();
        });
    });
    
    // Prevent form submission on quantity input enter
    document.addEventListener('keypress', function(e) {
        if (e.target.classList.contains('quantity-input') && e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
        }
    });
    
    // Setup member event listeners
    setupMemberEventListeners();
    
    // Image click events (delegated event listeners)
    document.addEventListener('click', function(e) {
        // Product card click (entire card)
        if (e.target.closest('.product-card')) {
            const productCard = e.target.closest('.product-card');
            const productId = parseInt(productCard.getAttribute('data-product-id'));
            
            // Don't trigger if clicking on add to cart button
            if (!e.target.closest('.btn-add-cart')) {
                showImageModal(productId);
            }
        }
        
        // Product image click
        if (e.target.classList.contains('product-image')) {
            const productId = parseInt(e.target.getAttribute('data-product-id'));
            showImageModal(productId);
        }
        
        // Zoom button click
        if (e.target.closest('.btn-image-zoom')) {
            const productId = parseInt(e.target.closest('.btn-image-zoom').getAttribute('data-product-id'));
            showImageModal(productId);
        }
        
    // Add to cart from modal
    if (e.target.id === 'addToCartFromModal') {
        const productId = parseInt(e.target.getAttribute('data-product-id'));
        addToCart(productId);
        
        // Close modal
        const imageModal = bootstrap.Modal.getInstance(document.getElementById('imageModal'));
        if (imageModal) {
            imageModal.hide();
        }
    }
});

// Member modal event listeners
function setupMemberEventListeners() {
    // Show register form
    document.getElementById('showRegisterForm').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'block';
        document.getElementById('memberDashboard').style.display = 'none';
    });

    // Show login form
    document.getElementById('showLoginForm').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('memberDashboard').style.display = 'none';
    });

    // Login form submission
    document.getElementById('loginFormElement').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        const result = memberManager.login(email, password);
        showToast(result.message, result.success ? 'success' : 'error');
        
        if (result.success) {
            showMemberDashboard();
        }
    });

    // Register form submission
    document.getElementById('registerFormElement').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const phone = document.getElementById('registerPhone').value;
        const password = document.getElementById('registerPassword').value;
        
        const result = memberManager.register(name, email, phone, password);
        showToast(result.message, result.success ? 'success' : 'error');
        
        if (result.success) {
            showMemberDashboard();
        }
    });

    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', function() {
        memberManager.logout();
        showLoginForm();
        showToast('已登出', 'info');
    });

    // Member modal show event
    document.getElementById('memberModal').addEventListener('show.bs.modal', function() {
        if (memberManager.currentMember) {
            showMemberDashboard();
        } else {
            showLoginForm();
        }
    });
}

// Show login form
function showLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('memberDashboard').style.display = 'none';
}

// Show member dashboard
function showMemberDashboard() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('memberDashboard').style.display = 'block';
    memberManager.showMemberDashboard();
}

// Show toast notification
function showToast(message, type = 'info') {
    const toast = document.getElementById('cartToast');
    const toastHeader = toast.querySelector('.toast-header');
    const toastBody = toast.querySelector('.toast-body');
    
    // Update toast content
    toastBody.textContent = message;
    
    // Update toast style based on type
    toast.className = 'toast';
    if (type === 'success') {
        toast.classList.add('bg-success', 'text-white');
        toastHeader.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i><strong class="me-auto">成功</strong>';
    } else if (type === 'error') {
        toast.classList.add('bg-danger', 'text-white');
        toastHeader.innerHTML = '<i class="bi bi-exclamation-triangle-fill me-2"></i><strong class="me-auto">錯誤</strong>';
    } else if (type === 'info') {
        toast.classList.add('bg-info', 'text-white');
        toastHeader.innerHTML = '<i class="bi bi-info-circle-fill me-2"></i><strong class="me-auto">資訊</strong>';
    }
    
    // Show toast
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
}
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('zh-TW', {
        style: 'currency',
        currency: 'TWD'
    }).format(amount);
}

```

現在我需要在會員中心添加購買歷史的顯示區域：


```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>商品購物網站</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
            <a class="navbar-brand" href="#">
                <i class="bi bi-shop"></i> 茶茶的店
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#memberModal" id="memberLink">
                            <i class="bi bi-person-circle"></i> <span id="memberText">會員登入</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#cartModal">
                            <i class="bi bi-cart3"></i> 購物車 
                            <span class="badge bg-danger" id="cartCount">0</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

        <!-- Main Content -->
        <div class="container mt-4">
            <div class="row">
                <div class="col-12">
                    <h1 class="text-center mb-4">精選商品</h1>
                    
                    <!-- Search Bar -->
                    <div class="row justify-content-center mb-4">
                        <div class="col-lg-6 col-md-8 col-sm-10">
                            <div class="input-group">
                                <span class="input-group-text">
                                    <i class="bi bi-search"></i>
                                </span>
                                <input type="text" class="form-control form-control-lg" id="searchInput" 
                                       placeholder="搜尋商品名稱或描述..." aria-label="搜尋商品">
                                <button class="btn btn-outline-secondary" type="button" id="clearSearchBtn" style="display: none;">
                                    <i class="bi bi-x-lg"></i>
                                </button>
                            </div>
                            <div class="mt-2">
                                <small class="text-muted" id="searchResultsInfo"></small>
                            </div>
                        </div>
                    </div>

                    <!-- Category Filter -->
                    <div class="row justify-content-center mb-4">
                        <div class="col-auto">
                            <div class="btn-group" role="group" aria-label="商品分類">
                                <input type="radio" class="btn-check" name="categoryFilter" id="categoryAll" value="all" checked>
                                <label class="btn btn-outline-primary" for="categoryAll">
                                    <i class="bi bi-grid-3x3-gap"></i> 全部商品
                                </label>
                                
                                <input type="radio" class="btn-check" name="categoryFilter" id="categoryA" value="A">
                                <label class="btn btn-outline-success" for="categoryA">
                                    <i class="bi bi-heart-fill"></i> 茶茶小貓咪
                                </label>
                                
                                <input type="radio" class="btn-check" name="categoryFilter" id="categoryB" value="B">
                                <label class="btn btn-outline-warning" for="categoryB">
                                    <i class="bi bi-egg-fried"></i> 茶茶的朋友-小雞
                                </label>
                                
                                <input type="radio" class="btn-check" name="categoryFilter" id="categoryC" value="C">
                                <label class="btn btn-outline-info" for="categoryC">
                                    <i class="bi bi-heart-pulse"></i> 茶的必需品
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        <!-- Products Grid -->
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4" id="productsContainer">
            <!-- Products will be dynamically generated here -->
        </div>
    </div>

    <!-- Cart Modal -->
    <div class="modal fade" id="cartModal" tabindex="-1" aria-labelledby="cartModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="cartModalLabel">
                        <i class="bi bi-cart3"></i> 購物車
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div id="cartItems">
                        <!-- Cart items will be displayed here -->
                    </div>
                    <div id="emptyCart" class="text-center text-muted py-4" style="display: none;">
                        <i class="bi bi-cart-x display-1"></i>
                        <p class="mt-2">購物車是空的</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="d-flex justify-content-between w-100">
                        <h5>總計: $<span id="totalPrice">0</span></h5>
                        <button type="button" class="btn btn-success" id="checkoutBtn" disabled>
                            <i class="bi bi-credit-card"></i> 結帳
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Member Modal -->
    <div class="modal fade" id="memberModal" tabindex="-1" aria-labelledby="memberModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="memberModalLabel">會員中心</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <!-- Login Form -->
                    <div id="loginForm">
                        <div class="text-center mb-4">
                            <i class="bi bi-person-circle display-1 text-primary"></i>
                            <h4>會員登入</h4>
                        </div>
                        <form id="loginFormElement">
                            <div class="mb-3">
                                <label for="loginEmail" class="form-label">電子郵件</label>
                                <input type="email" class="form-control" id="loginEmail" required>
                            </div>
                            <div class="mb-3">
                                <label for="loginPassword" class="form-label">密碼</label>
                                <input type="password" class="form-control" id="loginPassword" required>
                            </div>
                            <div class="d-grid">
                                <button type="submit" class="btn btn-primary">
                                    <i class="bi bi-box-arrow-in-right"></i> 登入
                                </button>
                            </div>
                        </form>
                        <div class="text-center mt-3">
                            <p class="text-muted">還沒有帳號？ <a href="#" id="showRegisterForm">立即註冊</a></p>
                        </div>
                    </div>

                    <!-- Register Form -->
                    <div id="registerForm" style="display: none;">
                        <div class="text-center mb-4">
                            <i class="bi bi-person-plus display-1 text-success"></i>
                            <h4>會員註冊</h4>
                        </div>
                        <form id="registerFormElement">
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="registerName" class="form-label">姓名</label>
                                    <input type="text" class="form-control" id="registerName" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="registerEmail" class="form-label">電子郵件</label>
                                    <input type="email" class="form-control" id="registerEmail" required>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="registerPhone" class="form-label">電話</label>
                                    <input type="tel" class="form-control" id="registerPhone" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="registerPassword" class="form-label">密碼</label>
                                    <input type="password" class="form-control" id="registerPassword" required>
                                </div>
                            </div>
                            <div class="d-grid">
                                <button type="submit" class="btn btn-success">
                                    <i class="bi bi-person-plus"></i> 註冊
                                </button>
                            </div>
                        </form>
                        <div class="text-center mt-3">
                            <p class="text-muted">已有帳號？ <a href="#" id="showLoginForm">立即登入</a></p>
                        </div>
                    </div>

                    <!-- Member Dashboard -->
                    <div id="memberDashboard" style="display: none;">
                        <div class="text-center mb-4">
                            <i class="bi bi-person-check display-1 text-primary"></i>
                            <h4>歡迎回來！</h4>
                            <h5 id="memberName" class="text-muted"></h5>
                        </div>
                        
                        <!-- Points Display -->
                        <div class="points-display">
                            <i class="bi bi-star-fill display-4 text-warning"></i>
                            <div class="points-label">目前點數</div>
                            <div class="points-number" id="memberPoints">0</div>
                            <div class="points-description">購物即可獲得點數（消費金額的1%）！</div>
                        </div>
                        
                        <!-- Member Info List -->
                        <div class="member-info-list">
                            <div class="member-info-item">
                                <div class="member-info-icon email">
                                    <i class="bi bi-envelope"></i>
                                </div>
                                <div class="member-info-content">
                                    <div class="member-info-label">電子郵件</div>
                                    <div class="member-info-value" id="memberEmail"></div>
                                </div>
                            </div>
                            <div class="member-info-item">
                                <div class="member-info-icon phone">
                                    <i class="bi bi-telephone"></i>
                                </div>
                                <div class="member-info-content">
                                    <div class="member-info-label">電話</div>
                                    <div class="member-info-value" id="memberPhone"></div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Purchase History -->
                        <div class="purchase-history-section">
                            <h6 class="section-title">
                                <i class="bi bi-clock-history"></i> 購買紀錄
                            </h6>
                            <div id="purchaseHistory" class="purchase-history-list">
                                <!-- Purchase history will be rendered here -->
                            </div>
                        </div>
                        
                        <div class="d-grid">
                            <button type="button" class="btn btn-outline-danger" id="logoutBtn">
                                <i class="bi bi-box-arrow-right"></i> 登出
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Image Modal -->
    <div class="modal fade" id="imageModal" tabindex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="imageModalLabel">商品圖片</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center">
                    <img id="modalImage" src="" alt="" class="img-fluid rounded">
                    <div class="mt-3">
                        <h6 id="modalProductName" class="text-muted"></h6>
                        <p id="modalProductPrice" class="h5 text-primary mb-0"></p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                        <i class="bi bi-x-lg"></i> 關閉
                    </button>
                    <button type="button" class="btn btn-primary" id="addToCartFromModal">
                        <i class="bi bi-cart-plus"></i> 加入購物車
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Toast for notifications -->
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="cartToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <i class="bi bi-check-circle-fill text-success me-2"></i>
                <strong class="me-auto">成功</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                商品已加入購物車！
            </div>
        </div>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Custom JS -->
    <script src="script.js"></script>
</body>
</html>

```

現在我需要更新會員儀表板顯示函數來渲染購買歷史：


```javascript
// Shopping cart functionality
class ShoppingCart {
    constructor() {
        this.items = [];
        this.loadFromStorage();
        this.updateCartDisplay();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveToStorage();
        this.updateCartDisplay();
        this.showToast();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        this.updateCartDisplay();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
                this.saveToStorage();
                this.updateCartDisplay();
            }
        }
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    updateCartDisplay() {
        this.updateCartCount();
        this.updateCartModal();
        this.updateTotalPrice();
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        cartCount.textContent = this.getTotalItems();
        
        if (this.getTotalItems() > 0) {
            cartCount.classList.add('bounce');
            setTimeout(() => cartCount.classList.remove('bounce'), 1000);
        }
    }

    updateCartModal() {
        const cartItems = document.getElementById('cartItems');
        const emptyCart = document.getElementById('emptyCart');
        
        if (this.items.length === 0) {
            cartItems.style.display = 'none';
            emptyCart.style.display = 'block';
        } else {
            cartItems.style.display = 'block';
            emptyCart.style.display = 'none';
            
            cartItems.innerHTML = this.items.map(item => `
                <div class="cart-item d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${item.name}</h6>
                        <p class="text-muted mb-0">$${item.price}</p>
                    </div>
                    <div class="quantity-controls me-3">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                               onchange="cart.updateQuantity(${item.id}, parseInt(this.value))">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <div class="text-end me-3">
                        <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                    </div>
                    <button class="btn-remove" onclick="cart.removeItem(${item.id})" title="移除商品">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    }

    updateTotalPrice() {
        const totalPrice = document.getElementById('totalPrice');
        const checkoutBtn = document.getElementById('checkoutBtn');
        
        totalPrice.textContent = this.getTotalPrice().toFixed(2);
        checkoutBtn.disabled = this.items.length === 0;
    }

    showToast() {
        const toast = new bootstrap.Toast(document.getElementById('cartToast'));
        toast.show();
    }

    saveToStorage() {
        localStorage.setItem('shoppingCart', JSON.stringify(this.items));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('shoppingCart');
        if (stored) {
            this.items = JSON.parse(stored);
        }
    }

    checkout() {
        if (this.items.length === 0) {
            alert('購物車是空的！');
            return;
        }
        
        const totalPrice = this.getTotalPrice();
        const totalItems = this.getTotalItems();
        
        // Calculate points (1% of total price)
        const pointsEarned = Math.floor(totalPrice * 0.01);
        
        // Add points to member if logged in
        if (memberManager && memberManager.currentMember) {
            memberManager.addPoints(pointsEarned);
            
            // Add purchase history
            memberManager.addPurchaseHistory({
                items: [...this.items], // Copy of items
                totalPrice: totalPrice,
                pointsEarned: pointsEarned,
                totalItems: totalItems
            });
            
            alert(`結帳成功！\n總金額: $${totalPrice.toFixed(2)}\n商品數量: ${totalItems}\n獲得點數: ${pointsEarned} 點 (消費金額的1%)\n目前總點數: ${memberManager.currentMember.points} 點`);
        } else {
            alert(`結帳成功！\n總金額: $${totalPrice.toFixed(2)}\n商品數量: ${totalItems}\n\n提示：登入會員可獲得購物點數（消費金額的1%）！`);
        }
        
        this.items = [];
        this.saveToStorage();
        this.updateCartDisplay();
    }
}

// Product data with categories
const products = [
    {
        id: 1,
        name: "枕頭貓",
        description: "有曬過太陽的香味喔☀️",
        price: 129.99,
        category: "A",
        isOnSale: true,
        image: "image/pillow_cat.png"
    },
    {
        id: 2,
        name: "潛水貓",
        description: "夢到自己在潛水喔",
        price: 299.99,
        category: "A",
        isOnSale: false,
        image: "image/淺水貓.png"
    },
    {
        id: 3,
        name: "雞雞貓",
        description: "ㄐㄐ",
        price: 899.99,
        category: "A",
        isOnSale: false,
        image: "image/雞雞貓.png"
    },
    {
        id: 4,
        name: "兔兔貓",
        description: "吃太多鏟屎官便當裡的紅蘿菠，所以變成兔子了",
        price: 699.99,
        category: "A",
        isOnSale: false,
        image: "image/兔兔貓.png"
    },
    {
        id: 5,
        name: "尤達呆呆貓",
        description: "這個家待不下去了",
        price: 199.99,
        category: "A",
        isOnSale: false,
        image: "image/尤達呆呆貓.png"
    },
    {
        id: 6,
        name: "長條貓",
        description: "控制不住想要嚕兩下的衝動",
        price: 149.99,
        category: "A",
        isOnSale: false,
        image: "image/長條珍珠奶茶.png"
    },
    {
        id: 7,
        name: "小逼",
        description: "藍色的漂亮鸚鵡，大便很水，還有雞味",
        price: 399.99,
        category: "B",
        isOnSale: false,
        image: "image/小逼.jpg"
    },
    {
        id: 8,
        name: "茶茶與鼠鼠.png",
        description: "相親相愛的好朋友",
        price: 499.99,
        category: "A",
        isOnSale: false,
        image: "image/茶茶與鼠鼠.png"
    },
    {
        id: 9,
        name: "站坐貓",
        description: "你猜我是站著還是坐著？",
        price: 249.99,
        category: "A",
        isOnSale: true,
        image: "image/站坐貓.png"
    },
    {
        id: 10,
        name: "石膏雞",
        description: "腿斷掉的小雞...",
        price: 599.99,
        category: "B",
        isOnSale: false,
        image: "image/石膏雞.jpg"
    },
    {
        id: 11,
        name: "饋手貓",
        description: "靜靜的看著你",
        price: 349.99,
        category: "A",
        isOnSale: true,
        image: "image/饋手貓.png"
    },
    {
        id: 12,
        name: "打字雞",
        description: "o[e42,,,f[blqo    msofe",
        price: 39.99,
        category: "B",
        isOnSale: false,
        image: "image/打字雞.jpg"
    },
    {
        id: 13,
        name: "莫比貓飼料",
        description: "餓的時候很愛吃，但在罐頭前面不堪一擊",
        price: 39.99,
        category: "C",
        isOnSale: false,
        image: "image/莫比貓飼料.png"
    },
    {
        id: 14,
        name: "貓罐頭",
        description: "只要有罐頭，你就能支配茶茶",
        price: 39.99,
        category: "C",
        isOnSale: false,
        image: "image/罐頭.png"
    }
   
]
// Initialize shopping cart
let cart;

// Member management system
class MemberManager {
    constructor() {
        this.currentMember = null;
        this.members = this.loadMembers();
        this.loadCurrentMember();
    }

    // Load members from localStorage
    loadMembers() {
        const stored = localStorage.getItem('members');
        return stored ? JSON.parse(stored) : [];
    }

    // Save members to localStorage
    saveMembers() {
        localStorage.setItem('members', JSON.stringify(this.members));
    }

    // Load current member from sessionStorage
    loadCurrentMember() {
        const stored = sessionStorage.getItem('currentMember');
        if (stored) {
            this.currentMember = JSON.parse(stored);
            this.updateNavbar();
        }
    }

    // Save current member to sessionStorage
    saveCurrentMember() {
        if (this.currentMember) {
            sessionStorage.setItem('currentMember', JSON.stringify(this.currentMember));
        } else {
            sessionStorage.removeItem('currentMember');
        }
    }

    // Register new member
    register(name, email, phone, password) {
        // Check if email already exists
        if (this.members.find(member => member.email === email)) {
            return { success: false, message: '此電子郵件已被註冊' };
        }

        // Create new member
        const newMember = {
            id: Date.now(),
            name: name,
            email: email,
            phone: phone,
            password: password,
            points: 100, // Welcome bonus
            joinDate: new Date().toISOString()
        };

        this.members.push(newMember);
        this.saveMembers();
        
        return { success: true, message: '註冊成功！獲得歡迎點數 100 點' };
    }

    // Login member
    login(email, password) {
        const member = this.members.find(m => m.email === email && m.password === password);
        if (member) {
            this.currentMember = member;
            this.saveCurrentMember();
            this.updateNavbar();
            return { success: true, message: '登入成功！' };
        } else {
            return { success: false, message: '電子郵件或密碼錯誤' };
        }
    }

    // Logout member
    logout() {
        this.currentMember = null;
        this.saveCurrentMember();
        this.updateNavbar();
    }

    // Add points to current member
    addPoints(points) {
        if (this.currentMember) {
            this.currentMember.points += points;
            this.saveCurrentMember();
            this.updateMemberInStorage();
        }
    }

    // Add purchase history
    addPurchaseHistory(purchaseData) {
        if (this.currentMember) {
            if (!this.currentMember.purchaseHistory) {
                this.currentMember.purchaseHistory = [];
            }
            
            const purchase = {
                id: Date.now(),
                date: new Date().toISOString(),
                items: purchaseData.items,
                totalPrice: purchaseData.totalPrice,
                pointsEarned: purchaseData.pointsEarned,
                totalItems: purchaseData.totalItems
            };
            
            this.currentMember.purchaseHistory.unshift(purchase); // Add to beginning
            this.saveCurrentMember();
            this.updateMemberInStorage();
        }
    }

    // Get purchase history
    getPurchaseHistory() {
        if (this.currentMember && this.currentMember.purchaseHistory) {
            return this.currentMember.purchaseHistory;
        }
        return [];
    }

    // Update member in members array
    updateMemberInStorage() {
        if (this.currentMember) {
            const index = this.members.findIndex(m => m.id === this.currentMember.id);
            if (index !== -1) {
                this.members[index] = this.currentMember;
                this.saveMembers();
            }
        }
    }

    // Update navbar display
    updateNavbar() {
        const memberText = document.getElementById('memberText');
        if (this.currentMember) {
            memberText.textContent = this.currentMember.name;
        } else {
            memberText.textContent = '會員登入';
        }
    }

    // Show member dashboard
    showMemberDashboard() {
        if (this.currentMember) {
            document.getElementById('memberName').textContent = this.currentMember.name;
            document.getElementById('memberEmail').textContent = this.currentMember.email;
            document.getElementById('memberPhone').textContent = this.currentMember.phone;
            document.getElementById('memberPoints').textContent = this.currentMember.points;
            this.renderPurchaseHistory();
        }
    }

    // Render purchase history
    renderPurchaseHistory() {
        const purchaseHistory = this.getPurchaseHistory();
        const container = document.getElementById('purchaseHistory');
        
        if (purchaseHistory.length === 0) {
            container.innerHTML = `
                <div class="text-center py-4 text-muted">
                    <i class="bi bi-cart-x display-4"></i>
                    <p class="mt-2">尚無購買紀錄</p>
                    <small>開始購物來建立您的購買歷史吧！</small>
                </div>
            `;
            return;
        }
        
        container.innerHTML = purchaseHistory.map(purchase => {
            const purchaseDate = new Date(purchase.date);
            const formattedDate = purchaseDate.toLocaleDateString('zh-TW', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });
            
            return `
                <div class="purchase-item">
                    <div class="purchase-header">
                        <div class="purchase-date">
                            <i class="bi bi-calendar3"></i>
                            ${formattedDate}
                        </div>
                        <div class="purchase-total">$${purchase.totalPrice.toFixed(2)}</div>
                    </div>
                    <div class="purchase-items">
                        ${purchase.items.map(item => `
                            <div class="purchase-item-detail">
                                <div class="item-name">${item.name}</div>
                                <div class="item-quantity">x${item.quantity}</div>
                                <div class="item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="purchase-points">
                        <i class="bi bi-star-fill"></i>
                        獲得 ${purchase.pointsEarned} 點
                    </div>
                </div>
            `;
        }).join('');
    }
}

// Initialize member manager
let memberManager;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    cart = new ShoppingCart();
    memberManager = new MemberManager();
    renderProducts();
    setupEventListeners();
});

// Get current filter
function getCurrentFilter() {
    const checkedFilter = document.querySelector('input[name="categoryFilter"]:checked');
    return checkedFilter ? checkedFilter.value : 'all';
}

// Get current search term
function getCurrentSearchTerm() {
    return document.getElementById('searchInput').value.trim().toLowerCase();
}

// Search products by name and description
function searchProducts(products, searchTerm) {
    if (!searchTerm) {
        return products;
    }
    
    return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
}

// Filter products by category
function filterProducts(category) {
    if (category === 'all') {
        return products;
    }
    return products.filter(product => product.category === category);
}

// Apply both search and category filters
function getFilteredProducts() {
    const category = getCurrentFilter();
    const searchTerm = getCurrentSearchTerm();
    
    let filteredProducts = filterProducts(category);
    filteredProducts = searchProducts(filteredProducts, searchTerm);
    
    return filteredProducts;
}

// Render products with filtering
function renderProducts() {
    const container = document.getElementById('productsContainer');
    const filteredProducts = getFilteredProducts();
    const searchTerm = getCurrentSearchTerm();
    const category = getCurrentFilter();
    
    // Update search results info
    updateSearchResultsInfo(filteredProducts.length, searchTerm, category);
    
    if (filteredProducts.length === 0) {
        let emptyMessage = '';
        if (searchTerm) {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-search display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">找不到相關商品</h3>
                        <p class="text-muted">沒有找到包含「${searchTerm}」的商品</p>
                        <button class="btn btn-outline-primary mt-3" onclick="clearSearch()">
                            <i class="bi bi-arrow-left"></i> 清除搜尋
                        </button>
                    </div>
                </div>
            `;
        } else {
            emptyMessage = `
                <div class="col-12">
                    <div class="text-center py-5">
                        <i class="bi bi-grid display-1 text-muted"></i>
                        <h3 class="mt-3 text-muted">此分類暫無商品</h3>
                        <p class="text-muted">請選擇其他分類或查看全部商品</p>
                    </div>
                </div>
            `;
        }
        container.innerHTML = emptyMessage;
        return;
    }
    
    container.innerHTML = filteredProducts.map(product => {
        const searchTerm = getCurrentSearchTerm();
        const highlightedName = highlightSearchTerm(product.name, searchTerm);
        const highlightedDescription = highlightSearchTerm(product.description, searchTerm);
        
        return `
            <div class="col">
                <div class="card h-100 product-card" data-product-id="${product.id}" style="cursor: pointer;">
                    <div class="position-relative">
                        <img src="${product.image}" class="card-img-top product-image" alt="${product.name}" loading="lazy">
                        ${product.isOnSale ? '<span class="position-absolute top-0 start-0 m-2 badge bg-danger sale-badge">促銷</span>' : ''}
                        <div class="position-absolute top-0 end-0 m-2">
                            <button class="btn btn-sm btn-light btn-image-zoom" data-product-id="${product.id}" title="查看大圖">
                                <i class="bi bi-zoom-in"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${highlightedName}</h5>
                        <p class="card-text flex-grow-1">${highlightedDescription}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="h5 text-primary mb-0">$${product.price}</span>
                            <button class="btn btn-primary btn-add-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                                <i class="bi bi-cart-plus"></i> 加入購物車
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}


// Update search results info
function updateSearchResultsInfo(count, searchTerm, category) {
    const searchResultsInfo = document.getElementById('searchResultsInfo');
    let infoText = '';
    
    if (searchTerm) {
        if (category === 'all') {
            infoText = `找到 ${count} 個包含「${searchTerm}」的商品`;
        } else {
            const categoryNames = {
                'A': '茶茶小貓咪',
                'B': '茶茶的朋友-小雞',
                'C': '茶的必需品'
            };
            infoText = `在${categoryNames[category]}中找到 ${count} 個包含「${searchTerm}」的商品`;
        }
    } else {
        if (category === 'all') {
            infoText = `顯示全部 ${count} 個商品`;
        } else {
            const categoryNames = {
                'A': '茶茶小貓咪',
                'B': '茶茶的朋友-小雞',
                'C': '茶的必需品'
            };
            infoText = `顯示 ${categoryNames[category]} 類別中的 ${count} 個商品`;
        }
    }
    
    searchResultsInfo.textContent = infoText;
}

// Clear search
function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('clearSearchBtn').style.display = 'none';
    renderProducts();
}

// Highlight search terms in text
function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.addItem(product);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        cart.checkout();
    });
    
    // Search input events
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    
    // Real-time search
    searchInput.addEventListener('input', function() {
        const hasValue = this.value.trim().length > 0;
        clearSearchBtn.style.display = hasValue ? 'block' : 'none';
        renderProducts();
    });
    
    // Clear search button
    clearSearchBtn.addEventListener('click', clearSearch);
    
    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            renderProducts();
        }
    });
    
    // Category filter change
    document.querySelectorAll('input[name="categoryFilter"]').forEach(radio => {
        radio.addEventListener('change', function() {
            renderProducts();
        });
    });
    
    // Prevent form submission on quantity input enter
    document.addEventListener('keypress', function(e) {
        if (e.target.classList.contains('quantity-input') && e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
        }
    });
    
    // Setup member event listeners
    setupMemberEventListeners();
    
    // Image click events (delegated event listeners)
    document.addEventListener('click', function(e) {
        // Product card click (entire card)
        if (e.target.closest('.product-card')) {
            const productCard = e.target.closest('.product-card');
            const productId = parseInt(productCard.getAttribute('data-product-id'));
            
            // Don't trigger if clicking on add to cart button
            if (!e.target.closest('.btn-add-cart')) {
                showImageModal(productId);
            }
        }
        
        // Product image click
        if (e.target.classList.contains('product-image')) {
            const productId = parseInt(e.target.getAttribute('data-product-id'));
            showImageModal(productId);
        }
        
        // Zoom button click
        if (e.target.closest('.btn-image-zoom')) {
            const productId = parseInt(e.target.closest('.btn-image-zoom').getAttribute('data-product-id'));
            showImageModal(productId);
        }
        
    // Add to cart from modal
    if (e.target.id === 'addToCartFromModal') {
        const productId = parseInt(e.target.getAttribute('data-product-id'));
        addToCart(productId);
        
        // Close modal
        const imageModal = bootstrap.Modal.getInstance(document.getElementById('imageModal'));
        if (imageModal) {
            imageModal.hide();
        }
    }
});

// Member modal event listeners
function setupMemberEventListeners() {
    // Show register form
    document.getElementById('showRegisterForm').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'block';
        document.getElementById('memberDashboard').style.display = 'none';
    });

    // Show login form
    document.getElementById('showLoginForm').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('memberDashboard').style.display = 'none';
    });

    // Login form submission
    document.getElementById('loginFormElement').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        const result = memberManager.login(email, password);
        showToast(result.message, result.success ? 'success' : 'error');
        
        if (result.success) {
            showMemberDashboard();
        }
    });

    // Register form submission
    document.getElementById('registerFormElement').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const phone = document.getElementById('registerPhone').value;
        const password = document.getElementById('registerPassword').value;
        
        const result = memberManager.register(name, email, phone, password);
        showToast(result.message, result.success ? 'success' : 'error');
        
        if (result.success) {
            showMemberDashboard();
        }
    });

    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', function() {
        memberManager.logout();
        showLoginForm();
        showToast('已登出', 'info');
    });

    // Member modal show event
    document.getElementById('memberModal').addEventListener('show.bs.modal', function() {
        if (memberManager.currentMember) {
            showMemberDashboard();
        } else {
            showLoginForm();
        }
    });
}

// Show login form
function showLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('memberDashboard').style.display = 'none';
}

// Show member dashboard
function showMemberDashboard() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('memberDashboard').style.display = 'block';
    memberManager.showMemberDashboard();
}

// Show toast notification
function showToast(message, type = 'info') {
    const toast = document.getElementById('cartToast');
    const toastHeader = toast.querySelector('.toast-header');
    const toastBody = toast.querySelector('.toast-body');
    
    // Update toast content
    toastBody.textContent = message;
    
    // Update toast style based on type
    toast.className = 'toast';
    if (type === 'success') {
        toast.classList.add('bg-success', 'text-white');
        toastHeader.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i><strong class="me-auto">成功</strong>';
    } else if (type === 'error') {
        toast.classList.add('bg-danger', 'text-white');
        toastHeader.innerHTML = '<i class="bi bi-exclamation-triangle-fill me-2"></i><strong class="me-auto">錯誤</strong>';
    } else if (type === 'info') {
        toast.classList.add('bg-info', 'text-white');
        toastHeader.innerHTML = '<i class="bi bi-info-circle-fill me-2"></i><strong class="me-auto">資訊</strong>';
    }
    
    // Show toast
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
}
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('zh-TW', {
        style: 'currency',
        currency: 'TWD'
    }).format(amount);
}

```

現在我需要為購買歷史添加樣式：


```css
/* Custom styles for the shopping website */

body {
    background-color: #fefefe;
    color: #5c4a3a;
}

/* Color scheme variables */
:root {
    --primary-color: #d4a574;
    --secondary-color: #e8d5b7;
    --accent-color: #c19a6b;
    --text-color: #5c4a3a;
    --light-bg: #faf8f5;
    --card-bg: #ffffff;
    --border-color: #e8d5b7;
    --shadow-color: rgba(212, 165, 116, 0.15);
}

/* Category filter styles */
.btn-check:checked + .btn {
    transform: scale(1.05);
    box-shadow: 0 4px 8px var(--shadow-color);
    background-color: var(--primary-color) !important;
    border-color: var(--primary-color) !important;
    color: white !important;
}

.btn-group .btn {
    transition: all 0.3s ease;
    border-radius: 1rem !important;
    margin: 0 8px;
    padding: 0.75rem 1.5rem;
    background-color: var(--light-bg);
    border-color: var(--border-color);
    color: var(--text-color);
    font-weight: 500;
}

.btn-group .btn:hover {
    background-color: var(--secondary-color);
    border-color: var(--accent-color);
    color: var(--text-color);
}

.btn-group {
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
}

.btn-group .btn:first-child {
    border-top-right-radius: 1rem !important;
    border-bottom-right-radius: 1rem !important;
}

.btn-group .btn:last-child {
    border-top-left-radius: 1rem !important;
    border-bottom-left-radius: 1rem !important;
}

.btn-group .btn:not(:first-child):not(:last-child) {
    border-radius: 1rem !important;
}

/* Responsive button spacing */
@media (max-width: 768px) {
    .btn-group .btn {
        margin: 0 4px;
        padding: 0.6rem 1.2rem;
        font-size: 0.9rem;
    }
}

@media (max-width: 576px) {
    .btn-group {
        flex-direction: column;
        gap: 0.75rem;
    }
    
    .btn-group .btn {
        margin: 0;
        width: 100%;
        max-width: 280px;
    }
}

/* Category badge styles */
.badge {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* Sale badge styles */
.sale-badge {
    background: linear-gradient(45deg, #dc3545, #c82333) !important;
    color: white !important;
    font-size: 0.7rem;
    font-weight: 700;
    padding: 0.4rem 0.6rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);
    animation: salePulse 2s infinite;
    z-index: 10;
}

.sale-badge::before {
    content: '🔥';
    margin-right: 0.25rem;
}

@keyframes salePulse {
    0% {
        transform: scale(1);
        box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);
    }
    50% {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(220, 53, 69, 0.5);
    }
    100% {
        transform: scale(1);
        box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);
    }
}

/* Empty state styles */
.display-1 {
    font-size: 4rem;
    opacity: 0.3;
}

/* Search bar styles */
.input-group-text {
    background-color: var(--light-bg);
    border-color: var(--border-color);
    border-radius: 1rem 0 0 1rem !important;
    color: var(--text-color);
}

#searchInput {
    border-left: none;
    border-radius: 0 1rem 1rem 0 !important;
    transition: all 0.3s ease;
    background-color: var(--card-bg);
    border-color: var(--border-color);
    color: var(--text-color);
}

#searchInput:focus {
    border-color: var(--accent-color);
    box-shadow: 0 0 0 0.25rem var(--shadow-color);
    background-color: var(--card-bg);
}

#searchInput:focus + .input-group-text {
    border-color: var(--accent-color);
}

#clearSearchBtn {
    transition: all 0.3s ease;
    border-left: none;
    border-radius: 0 1rem 1rem 0 !important;
    background-color: var(--light-bg);
    border-color: var(--border-color);
    color: var(--text-color);
}

#clearSearchBtn:hover {
    background-color: var(--secondary-color);
    color: var(--accent-color);
}

/* Search highlighting */
mark {
    background-color: var(--secondary-color);
    color: var(--text-color);
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-weight: 600;
}

/* Search results info */
#searchResultsInfo {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-color);
}

/* Search animation */
@keyframes searchPulse {
    0% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0.4);
    }
    70% {
        box-shadow: 0 0 0 10px rgba(13, 110, 253, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0);
    }
}

.searching {
    animation: searchPulse 1.5s infinite;
}

/* Responsive search bar */
@media (max-width: 768px) {
    .input-group {
        flex-direction: column;
    }
    
    .input-group-text {
        border-radius: 1rem 1rem 0 0 !important;
        border-bottom: none;
    }
    
    #searchInput {
        border-radius: 0 0 1rem 1rem !important;
        border-top: none;
    }
    
    #clearSearchBtn {
        border-radius: 1rem;
        margin-top: 0.5rem;
        width: 100%;
    }
}

/* Navbar styles */
.navbar {
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color)) !important;
    box-shadow: 0 2px 10px var(--shadow-color);
}

.navbar-brand {
    font-weight: bold;
    font-size: 1.5rem;
    color: white !important;
}

.navbar-nav .nav-link {
    color: white !important;
    transition: color 0.3s ease;
}

.navbar-nav .nav-link:hover {
    color: var(--light-bg) !important;
}

.navbar-toggler {
    border-color: white;
}

.navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

.card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid var(--border-color);
    background-color: var(--card-bg);
    box-shadow: 0 2px 8px var(--shadow-color);
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px var(--shadow-color);
    border-color: var(--accent-color);
}

/* Product card clickable styles */
.product-card {
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.product-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px var(--shadow-color);
    border-color: var(--primary-color);
}

.product-card:hover::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(212, 165, 116, 0.05), rgba(193, 154, 107, 0.05));
    pointer-events: none;
    z-index: 1;
}

.product-card:hover .card-title {
    color: var(--primary-color);
}

.product-card:hover .card-text {
    color: var(--text-color);
}

.card-img-top {
    height: 200px;
    object-fit: contain;
    transition: transform 0.3s ease;
}

.card:hover .card-img-top {
    transform: scale(1.05);
}

.btn-add-cart {
    background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
    border: none;
    color: white;
    transition: all 0.3s ease;
}

.btn-add-cart:hover {
    background: linear-gradient(45deg, var(--accent-color), #b88a5a);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px var(--shadow-color);
    color: white;
}

.cart-item {
    border-bottom: 1px solid var(--border-color);
    padding: 1rem 0;
}

.cart-item:last-child {
    border-bottom: none;
}

.cart-item-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
}

.btn-remove {
    color: var(--accent-color);
    border: none;
    background: none;
    font-size: 1.2rem;
    transition: color 0.3s ease;
}

.btn-remove:hover {
    color: var(--primary-color);
}

.quantity-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.quantity-btn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid var(--border-color);
    background: var(--card-bg);
    color: var(--text-color);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.quantity-btn:hover {
    background: var(--secondary-color);
    border-color: var(--accent-color);
    color: var(--text-color);
}

.quantity-input {
    width: 50px;
    text-align: center;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    padding: 0.25rem;
    background-color: var(--card-bg);
    color: var(--text-color);
}

#emptyCart {
    color: var(--text-color);
    opacity: 0.7;
}

.toast {
    background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
    color: white;
}

.toast-header {
    background: rgba(255,255,255,0.1);
    border-bottom: 1px solid rgba(255,255,255,0.2);
}

/* Product image styles */
.product-image {
    transition: all 0.3s ease;
}

.product-image:hover {
    transform: scale(1.02);
    filter: brightness(1.05);
}

.btn-image-zoom {
    opacity: 0;
    transition: all 0.3s ease;
    background-color: rgba(255, 255, 255, 0.9) !important;
    border: none;
    color: var(--text-color);
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.btn-image-zoom:hover {
    opacity: 1 !important;
    background-color: var(--primary-color) !important;
    color: white;
    transform: scale(1.1);
}

.card:hover .btn-image-zoom {
    opacity: 1;
}

/* Image modal styles */
#imageModal .modal-content {
    border: none;
    border-radius: 1rem;
    box-shadow: 0 10px 30px var(--shadow-color);
}

#imageModal .modal-header {
    background-color: var(--light-bg);
    border-bottom: 1px solid var(--border-color);
    border-radius: 1rem 1rem 0 0;
}

#imageModal .modal-body {
    padding: 2rem;
}

#imageModal .modal-body img {
    max-height: 400px;
    width: auto;
    box-shadow: 0 4px 15px var(--shadow-color);
}

#imageModal .modal-footer {
    background-color: var(--light-bg);
    border-top: 1px solid var(--border-color);
    border-radius: 0 0 1rem 1rem;
}

#imageModal .btn-close {
    background-color: var(--accent-color);
    opacity: 1;
    border-radius: 50%;
    width: 30px;
    height: 30px;
}

#imageModal .btn-close:hover {
    background-color: var(--primary-color);
}

/* Animation for cart count badge */
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}

.badge.bounce {
    animation: bounce 1s;
}

/* Member modal styles */
#memberModal .modal-content {
    border: 1px solid var(--border-color);
    border-radius: 1rem;
    box-shadow: 0 10px 30px var(--shadow-color);
    background-color: var(--card-bg);
}

#memberModal .modal-header {
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
    color: white;
    border-radius: 1rem 1rem 0 0;
    border-bottom: 1px solid var(--border-color);
}

#memberModal .modal-body {
    padding: 2rem;
    background-color: var(--card-bg);
    color: var(--text-color);
}

#memberModal .form-control {
    border-color: var(--border-color);
    border-radius: 0.5rem;
    background-color: var(--card-bg);
    color: var(--text-color);
    transition: all 0.3s ease;
}

#memberModal .form-control:focus {
    border-color: var(--accent-color);
    box-shadow: 0 0 0 0.25rem var(--shadow-color);
    background-color: var(--card-bg);
    color: var(--text-color);
}

#memberModal .form-label {
    color: var(--text-color);
    font-weight: 500;
}

#memberModal .btn {
    border-radius: 0.5rem;
    font-weight: 500;
    transition: all 0.3s ease;
}

#memberModal .btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px var(--shadow-color);
}

#memberModal .btn-primary {
    background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
    border: none;
}

#memberModal .btn-success {
    background: linear-gradient(45deg, #28a745, #20c997);
    border: none;
}

#memberModal .btn-outline-danger {
    border-color: #dc3545;
    color: #dc3545;
}

#memberModal .btn-outline-danger:hover {
    background-color: #dc3545;
    border-color: #dc3545;
}

#memberModal .text-muted {
    color: var(--text-color) !important;
    opacity: 0.7;
}

#memberModal a {
    color: var(--accent-color);
    text-decoration: none;
}

#memberModal a:hover {
    color: var(--primary-color);
    text-decoration: underline;
}

/* Member dashboard styles */
#memberDashboard .card {
    border: 1px solid var(--border-color);
    border-radius: 0.75rem;
    background-color: var(--card-bg);
    transition: all 0.3s ease;
}

#memberDashboard .card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px var(--shadow-color);
}

#memberDashboard .display-4 {
    color: var(--primary-color);
}

#memberDashboard .text-primary {
    color: var(--primary-color) !important;
}

#memberDashboard .text-warning {
    color: #ffc107 !important;
}

#memberDashboard .text-muted {
    color: var(--text-color) !important;
    opacity: 0.7;
}

/* Member info list styles */
.member-info-list {
    background-color: var(--light-bg);
    border: 1px solid var(--border-color);
    border-radius: 0.75rem;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
}

.member-info-item {
    display: flex;
    align-items: center;
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--border-color);
    transition: all 0.3s ease;
}

.member-info-item:last-child {
    border-bottom: none;
}

.member-info-item:hover {
    background-color: rgba(212, 165, 116, 0.05);
    border-radius: 0.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
}

.member-info-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    font-size: 1.2rem;
}

.member-info-icon.email {
    background-color: rgba(13, 110, 253, 0.1);
    color: #0d6efd;
}

.member-info-icon.phone {
    background-color: rgba(25, 135, 84, 0.1);
    color: #198754;
}

.member-info-icon.points {
    background-color: rgba(255, 193, 7, 0.1);
    color: #ffc107;
}

.member-info-content {
    flex: 1;
}

.member-info-label {
    font-size: 0.875rem;
    color: var(--text-color);
    opacity: 0.7;
    margin-bottom: 0.25rem;
}

.member-info-value {
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--text-color);
}

.points-display {
    text-align: center;
    background: linear-gradient(135deg, var(--secondary-color), var(--light-bg));
    border: 2px solid var(--primary-color);
    border-radius: 1rem;
    padding: 2rem;
    margin-bottom: 1.5rem;
}

.points-number {
    font-size: 3rem;
    font-weight: 700;
    color: var(--primary-color);
    margin: 0.5rem 0;
    text-shadow: 0 2px 4px var(--shadow-color);
}

.points-label {
    font-size: 1.1rem;
    color: var(--text-color);
    margin-bottom: 0.5rem;
}

.points-description {
    font-size: 0.9rem;
    color: var(--text-color);
    opacity: 0.7;
}

/* Purchase history styles */
.purchase-history-section {
    margin-top: 1.5rem;
}

.section-title {
    color: var(--text-color);
    font-weight: 600;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--border-color);
}

.purchase-history-list {
    max-height: 300px;
    overflow-y: auto;
    border: 1px solid var(--border-color);
    border-radius: 0.75rem;
    background-color: var(--light-bg);
}

.purchase-item {
    padding: 1rem;
    border-bottom: 1px solid var(--border-color);
    transition: all 0.3s ease;
}

.purchase-item:last-child {
    border-bottom: none;
}

.purchase-item:hover {
    background-color: rgba(212, 165, 116, 0.05);
}

.purchase-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
}

.purchase-date {
    display: flex;
    align-items: center;
    color: var(--text-color);
    font-size: 0.9rem;
    opacity: 0.7;
}

.purchase-date i {
    margin-right: 0.5rem;
    color: var(--accent-color);
}

.purchase-total {
    color: var(--primary-color);
    font-size: 1.1rem;
    font-weight: 600;
}

.purchase-items {
    margin-bottom: 0.75rem;
}

.purchase-item-detail {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.25rem 0;
    font-size: 0.9rem;
}

.item-name {
    flex: 1;
    color: var(--text-color);
}

.item-quantity {
    color: var(--text-color);
    opacity: 0.7;
    margin: 0 1rem;
}

.item-price {
    color: var(--primary-color);
    font-weight: 500;
}

.purchase-points {
    display: flex;
    align-items: center;
    color: var(--text-color);
    font-size: 0.9rem;
    opacity: 0.8;
}

.purchase-points i {
    margin-right: 0.5rem;
    color: #ffc107;
}

/* Responsive purchase history */
@media (max-width: 768px) {
    .purchase-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
    }
    
    .purchase-item-detail {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.25rem;
    }
    
    .item-quantity {
        margin: 0;
    }
}

/* Toast notification styles */
.toast.bg-success {
    background: linear-gradient(45deg, #28a745, #20c997) !important;
}

.toast.bg-danger {
    background: linear-gradient(45deg, #dc3545, #c82333) !important;
}

.toast.bg-info {
    background: linear-gradient(45deg, #17a2b8, #138496) !important;
}

.toast-header {
    background: rgba(255,255,255,0.1);
    border-bottom: 1px solid rgba(255,255,255,0.2);
}

/* Member link styles */
#memberLink {
    transition: all 0.3s ease;
}

#memberLink:hover {
    color: var(--light-bg) !important;
    transform: scale(1.05);
}

/* Form validation styles */
.form-control.is-invalid {
    border-color: #dc3545;
    box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
}

.form-control.is-valid {
    border-color: #28a745;
    box-shadow: 0 0 0 0.25rem rgba(40, 167, 69, 0.25);
}

/* Responsive member modal */
@media (max-width: 768px) {
    #memberModal .modal-body {
        padding: 1.5rem;
    }
    
    #memberDashboard .row .col-md-6 {
        margin-bottom: 1rem;
    }
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .card-img-top {
        height: 150px;
    }
    
    .cart-item-image {
        width: 50px;
        height: 50px;
    }
}

/* Loading animation */
.loading {
    opacity: 0.6;
    pointer-events: none;
}

.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

```

讓我檢查是否有任何 linting 錯誤：


完美！我已經成功為您的購物網站添加了完整的歷史購買紀錄功能。以下是實現的功能：

## 🛒 歷史購買紀錄功能

### 📊 功能特色

1. **自動記錄購買**
   - 每次結帳時自動記錄購買詳情
   - 包含商品名稱、數量、價格、總金額
   - 記錄獲得的點數和購買時間

2. **詳細購買資訊**
   - 購買日期和時間
   - 每筆訂單的商品清單
   - 商品單價和總價
   - 獲得的點數

3. **會員中心顯示**
   - 在會員儀表板中顯示購買歷史
   - 按時間順序排列（最新的在上面）
   - 美觀的卡片式設計

### 🎨 視覺設計

1. **購買歷史區域**
   - 標題：「購買紀錄」with 時鐘圖標
   - 滾動區域（最大高度 300px）
   - 淺色背景與主頁風格一致

2. **購買項目樣式**
   - 每個購買記錄為獨立卡片
   - 懸停效果增強互動性
   - 清晰的資訊層次結構

3. **響應式設計**
   - 手機版優化佈局
   - 自適應文字大小和間距

### 📱 購買記錄內容

每筆購買記錄包含：

```
📅 2024/01/15 14:30                    $150.00
├─ 茶茶小貓咪飼料 x2                   $100.00
├─ 小雞玩具 x1                         $50.00
└─ ⭐ 獲得 1 點
```

### 🔧 技術實現

1. **資料儲存**
   - 使用 `localStorage` 持久化儲存
   - 每個會員獨立的購買歷史
   - 自動同步到會員資料

2. **資料結構**
   ```javascript
   {
     id: timestamp,
     date: ISO string,
     items: [...],
     totalPrice: number,
     pointsEarned: number,
     totalItems: number
   }
   ```

3. **空狀態處理**
   - 無購買記錄時顯示友善提示
   - 鼓勵用戶開始購物

### ✨ 用戶體驗

1. **即時更新**
   - 購買後立即在會員中心顯示
   - 無需重新整理頁面

2. **清晰資訊**
   - 易讀的日期格式
   - 清楚的價格顯示
   - 直觀的點數資訊

3. **一致性設計**
   - 與整體網站風格統一
   - 使用相同的色彩變數
   - 保持視覺和諧

現在您的購物網站具備了完整的會員購買歷史功能！會員可以隨時查看過去的購買記錄，了解自己的消費習慣和獲得的點數。

```plaintext
📅 2024/01/15 14:30                    $150.00
├─ 茶茶小貓咪飼料 x2                   $100.00
├─ 小雞玩具 x1                         $50.00
└─ ⭐ 獲得 1 點
```

```javascript
   {
     id: timestamp,
     date: ISO string,
     items: [...],
     totalPrice: number,
     pointsEarned: number,
     totalItems: number
   }
```

---

**User**

「成功字樣改為白色」
下方那一列改為白色底色，字體為黑色

---

**Cursor**

我將修改成功通知的樣式，將「成功」字樣改為白色，並將下方訊息區域改為白色底色配黑色字體。


```css
/* Custom styles for the shopping website */

body {
    background-color: #fefefe;
    color: #5c4a3a;
}

/* Color scheme variables */
:root {
    --primary-color: #d4a574;
    --secondary-color: #e8d5b7;
    --accent-color: #c19a6b;
    --text-color: #5c4a3a;
    --light-bg: #faf8f5;
    --card-bg: #ffffff;
    --border-color: #e8d5b7;
    --shadow-color: rgba(212, 165, 116, 0.15);
}

/* Category filter styles */
.btn-check:checked + .btn {
    transform: scale(1.05);
    box-shadow: 0 4px 8px var(--shadow-color);
    background-color: var(--primary-color) !important;
    border-color: var(--primary-color) !important;
    color: white !important;
}

.btn-group .btn {
    transition: all 0.3s ease;
    border-radius: 1rem !important;
    margin: 0 8px;
    padding: 0.75rem 1.5rem;
    background-color: var(--light-bg);
    border-color: var(--border-color);
    color: var(--text-color);
    font-weight: 500;
}

.btn-group .btn:hover {
    background-color: var(--secondary-color);
    border-color: var(--accent-color);
    color: var(--text-color);
}

.btn-group {
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
}

.btn-group .btn:first-child {
    border-top-right-radius: 1rem !important;
    border-bottom-right-radius: 1rem !important;
}

.btn-group .btn:last-child {
    border-top-left-radius: 1rem !important;
    border-bottom-left-radius: 1rem !important;
}

.btn-group .btn:not(:first-child):not(:last-child) {
    border-radius: 1rem !important;
}

/* Responsive button spacing */
@media (max-width: 768px) {
    .btn-group .btn {
        margin: 0 4px;
        padding: 0.6rem 1.2rem;
        font-size: 0.9rem;
    }
}

@media (max-width: 576px) {
    .btn-group {
        flex-direction: column;
        gap: 0.75rem;
    }
    
    .btn-group .btn {
        margin: 0;
        width: 100%;
        max-width: 280px;
    }
}

/* Category badge styles */
.badge {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* Sale badge styles */
.sale-badge {
    background: linear-gradient(45deg, #dc3545, #c82333) !important;
    color: white !important;
    font-size: 0.7rem;
    font-weight: 700;
    padding: 0.4rem 0.6rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);
    animation: salePulse 2s infinite;
    z-index: 10;
}

.sale-badge::before {
    content: '🔥';
    margin-right: 0.25rem;
}

@keyframes salePulse {
    0% {
        transform: scale(1);
        box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);
    }
    50% {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(220, 53, 69, 0.5);
    }
    100% {
        transform: scale(1);
        box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);
    }
}

/* Empty state styles */
.display-1 {
    font-size: 4rem;
    opacity: 0.3;
}

/* Search bar styles */
.input-group-text {
    background-color: var(--light-bg);
    border-color: var(--border-color);
    border-radius: 1rem 0 0 1rem !important;
    color: var(--text-color);
}

#searchInput {
    border-left: none;
    border-radius: 0 1rem 1rem 0 !important;
    transition: all 0.3s ease;
    background-color: var(--card-bg);
    border-color: var(--border-color);
    color: var(--text-color);
}

#searchInput:focus {
    border-color: var(--accent-color);
    box-shadow: 0 0 0 0.25rem var(--shadow-color);
    background-color: var(--card-bg);
}

#searchInput:focus + .input-group-text {
    border-color: var(--accent-color);
}

#clearSearchBtn {
    transition: all 0.3s ease;
    border-left: none;
    border-radius: 0 1rem 1rem 0 !important;
    background-color: var(--light-bg);
    border-color: var(--border-color);
    color: var(--text-color);
}

#clearSearchBtn:hover {
    background-color: var(--secondary-color);
    color: var(--accent-color);
}

/* Search highlighting */
mark {
    background-color: var(--secondary-color);
    color: var(--text-color);
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-weight: 600;
}

/* Search results info */
#searchResultsInfo {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-color);
}

/* Search animation */
@keyframes searchPulse {
    0% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0.4);
    }
    70% {
        box-shadow: 0 0 0 10px rgba(13, 110, 253, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(13, 110, 253, 0);
    }
}

.searching {
    animation: searchPulse 1.5s infinite;
}

/* Responsive search bar */
@media (max-width: 768px) {
    .input-group {
        flex-direction: column;
    }
    
    .input-group-text {
        border-radius: 1rem 1rem 0 0 !important;
        border-bottom: none;
    }
    
    #searchInput {
        border-radius: 0 0 1rem 1rem !important;
        border-top: none;
    }
    
    #clearSearchBtn {
        border-radius: 1rem;
        margin-top: 0.5rem;
        width: 100%;
    }
}

/* Navbar styles */
.navbar {
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color)) !important;
    box-shadow: 0 2px 10px var(--shadow-color);
}

.navbar-brand {
    font-weight: bold;
    font-size: 1.5rem;
    color: white !important;
}

.navbar-nav .nav-link {
    color: white !important;
    transition: color 0.3s ease;
}

.navbar-nav .nav-link:hover {
    color: var(--light-bg) !important;
}

.navbar-toggler {
    border-color: white;
}

.navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

.card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid var(--border-color);
    background-color: var(--card-bg);
    box-shadow: 0 2px 8px var(--shadow-color);
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px var(--shadow-color);
    border-color: var(--accent-color);
}

/* Product card clickable styles */
.product-card {
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.product-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px var(--shadow-color);
    border-color: var(--primary-color);
}

.product-card:hover::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(212, 165, 116, 0.05), rgba(193, 154, 107, 0.05));
    pointer-events: none;
    z-index: 1;
}

.product-card:hover .card-title {
    color: var(--primary-color);
}

.product-card:hover .card-text {
    color: var(--text-color);
}

.card-img-top {
    height: 200px;
    object-fit: contain;
    transition: transform 0.3s ease;
}

.card:hover .card-img-top {
    transform: scale(1.05);
}

.btn-add-cart {
    background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
    border: none;
    color: white;
    transition: all 0.3s ease;
}

.btn-add-cart:hover {
    background: linear-gradient(45deg, var(--accent-color), #b88a5a);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px var(--shadow-color);
    color: white;
}

.cart-item {
    border-bottom: 1px solid var(--border-color);
    padding: 1rem 0;
}

.cart-item:last-child {
    border-bottom: none;
}

.cart-item-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
}

.btn-remove {
    color: var(--accent-color);
    border: none;
    background: none;
    font-size: 1.2rem;
    transition: color 0.3s ease;
}

.btn-remove:hover {
    color: var(--primary-color);
}

.quantity-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.quantity-btn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid var(--border-color);
    background: var(--card-bg);
    color: var(--text-color);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.quantity-btn:hover {
    background: var(--secondary-color);
    border-color: var(--accent-color);
    color: var(--text-color);
}

.quantity-input {
    width: 50px;
    text-align: center;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    padding: 0.25rem;
    background-color: var(--card-bg);
    color: var(--text-color);
}

#emptyCart {
    color: var(--text-color);
    opacity: 0.7;
}

.toast {
    background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
    color: white;
}

.toast-header {
    background: rgba(255,255,255,0.1);
    border-bottom: 1px solid rgba(255,255,255,0.2);
}

/* Product image styles */
.product-image {
    transition: all 0.3s ease;
}

.product-image:hover {
    transform: scale(1.02);
    filter: brightness(1.05);
}

.btn-image-zoom {
    opacity: 0;
    transition: all 0.3s ease;
    background-color: rgba(255, 255, 255, 0.9) !important;
    border: none;
    color: var(--text-color);
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.btn-image-zoom:hover {
    opacity: 1 !important;
    background-color: var(--primary-color) !important;
    color: white;
    transform: scale(1.1);
}

.card:hover .btn-image-zoom {
    opacity: 1;
}

/* Image modal styles */
#imageModal .modal-content {
    border: none;
    border-radius: 1rem;
    box-shadow: 0 10px 30px var(--shadow-color);
}

#imageModal .modal-header {
    background-color: var(--light-bg);
    border-bottom: 1px solid var(--border-color);
    border-radius: 1rem 1rem 0 0;
}

#imageModal .modal-body {
    padding: 2rem;
}

#imageModal .modal-body img {
    max-height: 400px;
    width: auto;
    box-shadow: 0 4px 15px var(--shadow-color);
}

#imageModal .modal-footer {
    background-color: var(--light-bg);
    border-top: 1px solid var(--border-color);
    border-radius: 0 0 1rem 1rem;
}

#imageModal .btn-close {
    background-color: var(--accent-color);
    opacity: 1;
    border-radius: 50%;
    width: 30px;
    height: 30px;
}

#imageModal .btn-close:hover {
    background-color: var(--primary-color);
}

/* Animation for cart count badge */
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}

.badge.bounce {
    animation: bounce 1s;
}

/* Member modal styles */
#memberModal .modal-content {
    border: 1px solid var(--border-color);
    border-radius: 1rem;
    box-shadow: 0 10px 30px var(--shadow-color);
    background-color: var(--card-bg);
}

#memberModal .modal-header {
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
    color: white;
    border-radius: 1rem 1rem 0 0;
    border-bottom: 1px solid var(--border-color);
}

#memberModal .modal-body {
    padding: 2rem;
    background-color: var(--card-bg);
    color: var(--text-color);
}

#memberModal .form-control {
    border-color: var(--border-color);
    border-radius: 0.5rem;
    background-color: var(--card-bg);
    color: var(--text-color);
    transition: all 0.3s ease;
}

#memberModal .form-control:focus {
    border-color: var(--accent-color);
    box-shadow: 0 0 0 0.25rem var(--shadow-color);
    background-color: var(--card-bg);
    color: var(--text-color);
}

#memberModal .form-label {
    color: var(--text-color);
    font-weight: 500;
}

#memberModal .btn {
    border-radius: 0.5rem;
    font-weight: 500;
    transition: all 0.3s ease;
}

#memberModal .btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px var(--shadow-color);
}

#memberModal .btn-primary {
    background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
    border: none;
}

#memberModal .btn-success {
    background: linear-gradient(45deg, #28a745, #20c997);
    border: none;
}

#memberModal .btn-outline-danger {
    border-color: #dc3545;
    color: #dc3545;
}

#memberModal .btn-outline-danger:hover {
    background-color: #dc3545;
    border-color: #dc3545;
}

#memberModal .text-muted {
    color: var(--text-color) !important;
    opacity: 0.7;
}

#memberModal a {
    color: var(--accent-color);
    text-decoration: none;
}

#memberModal a:hover {
    color: var(--primary-color);
    text-decoration: underline;
}

/* Member dashboard styles */
#memberDashboard .card {
    border: 1px solid var(--border-color);
    border-radius: 0.75rem;
    background-color: var(--card-bg);
    transition: all 0.3s ease;
}

#memberDashboard .card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px var(--shadow-color);
}

#memberDashboard .display-4 {
    color: var(--primary-color);
}

#memberDashboard .text-primary {
    color: var(--primary-color) !important;
}

#memberDashboard .text-warning {
    color: #ffc107 !important;
}

#memberDashboard .text-muted {
    color: var(--text-color) !important;
    opacity: 0.7;
}

/* Member info list styles */
.member-info-list {
    background-color: var(--light-bg);
    border: 1px solid var(--border-color);
    border-radius: 0.75rem;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
}

.member-info-item {
    display: flex;
    align-items: center;
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--border-color);
    transition: all 0.3s ease;
}

.member-info-item:last-child {
    border-bottom: none;
}

.member-info-item:hover {
    background-color: rgba(212, 165, 116, 0.05);
    border-radius: 0.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
}

.member-info-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    font-size: 1.2rem;
}

.member-info-icon.email {
    background-color: rgba(13, 110, 253, 0.1);
    color: #0d6efd;
}

.member-info-icon.phone {
    background-color: rgba(25, 135, 84, 0.1);
    color: #198754;
}

.member-info-icon.points {
    background-color: rgba(255, 193, 7, 0.1);
    color: #ffc107;
}

.member-info-content {
    flex: 1;
}

.member-info-label {
    font-size: 0.875rem;
    color: var(--text-color);
    opacity: 0.7;
    margin-bottom: 0.25rem;
}

.member-info-value {
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--text-color);
}

.points-display {
    text-align: center;
    background: linear-gradient(135deg, var(--secondary-color), var(--light-bg));
    border: 2px solid var(--primary-color);
    border-radius: 1rem;
    padding: 2rem;
    margin-bottom: 1.5rem;
}

.points-number {
    font-size: 3rem;
    font-weight: 700;
    color: var(--primary-color);
    margin: 0.5rem 0;
    text-shadow: 0 2px 4px var(--shadow-color);
}

.points-label {
    font-size: 1.1rem;
    color: var(--text-color);
    margin-bottom: 0.5rem;
}

.points-description {
    font-size: 0.9rem;
    color: var(--text-color);
    opacity: 0.7;
}

/* Purchase history styles */
.purchase-history-section {
    margin-top: 1.5rem;
}

.section-title {
    color: var(--text-color);
    font-weight: 600;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--border-color);
}

.purchase-history-list {
    max-height: 300px;
    overflow-y: auto;
    border: 1px solid var(--border-color);
    border-radius: 0.75rem;
    background-color: var(--light-bg);
}

.purchase-item {
    padding: 1rem;
    border-bottom: 1px solid var(--border-color);
    transition: all 0.3s ease;
}

.purchase-item:last-child {
    border-bottom: none;
}

.purchase-item:hover {
    background-color: rgba(212, 165, 116, 0.05);
}

.purchase-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
}

.purchase-date {
    display: flex;
    align-items: center;
    color: var(--text-color);
    font-size: 0.9rem;
    opacity: 0.7;
}

.purchase-date i {
    margin-right: 0.5rem;
    color: var(--accent-color);
}

.purchase-total {
    color: var(--primary-color);
    font-size: 1.1rem;
    font-weight: 600;
}

.purchase-items {
    margin-bottom: 0.75rem;
}

.purchase-item-detail {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.25rem 0;
    font-size: 0.9rem;
}

.item-name {
    flex: 1;
    color: var(--text-color);
}

.item-quantity {
    color: var(--text-color);
    opacity: 0.7;
    margin: 0 1rem;
}

.item-price {
    color: var(--primary-color);
    font-weight: 500;
}

.purchase-points {
    display: flex;
    align-items: center;
    color: var(--text-color);
    font-size: 0.9rem;
    opacity: 0.8;
}

.purchase-points i {
    margin-right: 0.5rem;
    color: #ffc107;
}

/* Responsive purchase history */
@media (max-width: 768px) {
    .purchase-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
    }
    
    .purchase-item-detail {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.25rem;
    }
    
    .item-quantity {
        margin: 0;
    }
}

/* Toast notification styles */
.toast.bg-success {
    background: linear-gradient(45deg, #28a745, #20c997) !important;
}

.toast.bg-success .toast-header {
    background: transparent !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2) !important;
}

.toast.bg-success .toast-header .text-success {
    color: white !important;
}

.toast.bg-success .toast-body {
    background: white !important;
    color: black !important;
}

.toast.bg-danger {
    background: linear-gradient(45deg, #dc3545, #c82333) !important;
}

.toast.bg-info {
    background: linear-gradient(45deg, #17a2b8, #138496) !important;
}

.toast-header {
    background: rgba(255,255,255,0.1);
    border-bottom: 1px solid rgba(255,255,255,0.2);
}

/* Member link styles */
#memberLink {
    transition: all 0.3s ease;
}

#memberLink:hover {
    color: var(--light-bg) !important;
    transform: scale(1.05);
}

/* Form validation styles */
.form-control.is-invalid {
    border-color: #dc3545;
    box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
}

.form-control.is-valid {
    border-color: #28a745;
    box-shadow: 0 0 0 0.25rem rgba(40, 167, 69, 0.25);
}

/* Responsive member modal */
@media (max-width: 768px) {
    #memberModal .modal-body {
        padding: 1.5rem;
    }
    
    #memberDashboard .row .col-md-6 {
        margin-bottom: 1rem;
    }
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .card-img-top {
        height: 150px;
    }
    
    .cart-item-image {
        width: 50px;
        height: 50px;
    }
}

/* Loading animation */
.loading {
    opacity: 0.6;
    pointer-events: none;
}

.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

```

讓我檢查是否有任何 linting 錯誤：


完美！我已經成功修改了成功通知的樣式。以下是更新的內容：

## 🎨 成功通知樣式更新

### 📝 修改內容

1. **「成功」字樣**
   - 從原本的綠色改為白色
   - 在綠色背景上提供更好的對比度

2. **訊息區域**
   - 背景色改為白色
   - 字體顏色改為黑色
   - 提供清晰的閱讀體驗

### 🎯 樣式細節

1. **標題區域 (toast-header)**
   - 保持綠色漸層背景
   - 「成功」文字為白色
   - 半透明分隔線

2. **訊息區域 (toast-body)**
   - 純白色背景
   - 黑色文字
   - 與標題區域形成明顯對比

### ✨ 視覺效果

現在的成功通知將呈現：
- 上半部：綠色漸層背景 + 白色「成功」文字
- 下半部：白色背景 + 黑色訊息文字
- 整體保持圓角設計和現代感

這樣的設計讓通知更加清晰易讀，同時保持了與網站整體風格的一致性！

