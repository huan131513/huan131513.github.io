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
        
        // Auto login newly registered member
        this.currentMember = newMember;
        this.saveCurrentMember();
        this.updateNavbar();
        
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
