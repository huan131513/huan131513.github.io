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
        description: "ㄐㄐ",
        price: 899.99,
        category: "A",
        isOnSale: false,
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/雞雞貓.png"
    },
    {
        id: 4,
        name: "兔兔貓",
        description: "吃太多鏟屎官便當裡的紅蘿菠，所以變成兔子了",
        price: 699.99,
        category: "A",
        isOnSale: false,
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/兔兔貓.png"
    },
    {
        id: 5,
        name: "尤達呆呆貓",
        description: "這個家待不下去了",
        price: 199.99,
        category: "A",
        isOnSale: false,
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/尤達呆呆貓.png"
    },
    {
        id: 6,
        name: "長條貓",
        description: "控制不住想要嚕兩下的衝動",
        price: 149.99,
        category: "A",
        isOnSale: false,
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/長條珍珠奶茶.png"
    },
    {
        id: 7,
        name: "小逼",
        description: "藍色的漂亮鸚鵡，大便很水，還有雞味",
        price: 399.99,
        category: "B",
        isOnSale: false,
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
        description: "腿斷掉的小雞...",
        price: 599.99,
        category: "B",
        isOnSale: false,
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/石膏雞.jpg"
    },
    {
        id: 11,
        name: "饋手貓",
        description: "靜靜的看著你",
        price: 349.99,
        category: "A",
        isOnSale: true,
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/饋手貓.png"
    },
    {
        id: 12,
        name: "打字雞",
        description: "o[e42,,,f[blqo    msofe",
        price: 39.99,
        category: "B",
        isOnSale: false,
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/打字雞.jpg"
    },
    {
        id: 13,
        name: "莫比貓飼料",
        description: "餓的時候很愛吃，但在罐頭前面不堪一擊",
        price: 39.99,
        category: "C",
        isOnSale: false,
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/莫比貓飼料.png"
    },
    {
        id: 14,
        name: "貓罐頭",
        description: "只要有罐頭，你就能支配茶茶",
        price: 39.99,
        category: "C",
        isOnSale: false,
        image: "/Users/pengzihuan/Documents/GitHub/wp1141/hw4/image/罐頭.png"
    }
   
]
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
