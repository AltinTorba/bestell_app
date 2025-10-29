// Basket state
let basket = [];
const deliveryCost = 5.00;
let currentCategory = 'hauptgerichte';


// Category data
const categories = [
    { id: 'hauptgerichte', name: 'Hauptgerichte' },
    { id: 'beilagen', name: 'Beilage' }
  ];

// Initialize the app
function init() {
    renderCategories();
    renderDishes();
    updateBasket();
    setupEventListeners();
}

// Render category navigation
function renderCategories() {
    if (!categoryNavigation) return;
    
    categoryNavigation.innerHTML = '';
    categories.forEach(category => {
        const categoryBtn = document.createElement('button');
        categoryBtn.className = `category-btn ${category.id === currentCategory ? 'active' : ''}`;
        categoryBtn.textContent = category.name;
        categoryBtn.dataset.category = category.id;
        
        categoryBtn.addEventListener('click', () => {
            switchCategory(category.id);
        });
        
        categoryNavigation.appendChild(categoryBtn);
    });
}

// Switch category
function switchCategory(categoryId) {
    currentCategory = categoryId;
    
    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === categoryId) {
            btn.classList.add('active');
        }
    });
    
    // Update category title
    const category = categories.find(cat => cat.id === categoryId);
    if (currentCategoryTitle && category) {
        currentCategoryTitle.textContent = category.name;
    }
    
    // Render dishes for selected category
    renderDishes();
}

// Setup event listeners
function setupEventListeners() {
    // Basket modal controls
    if (responsiveBasketToggle) {
        responsiveBasketToggle.addEventListener('click', () => {
            basketModal.style.display = 'flex';
        });
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            basketModal.style.display = 'none';
        });
    }
    
    // Checkout buttons
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleCheckout);
    }
    
    if (modalCheckoutBtn) {
        modalCheckoutBtn.addEventListener('click', handleCheckout);
    }
    
    // Close modal when clicking outside
    if (basketModal) {
        basketModal.addEventListener('click', (e) => {
            if (e.target === basketModal) {
                basketModal.style.display = 'none';
            }
        });
    }
}

// Render dishes to the DOM
function renderDishes() {
    if (!dishesContainer) return;
    
    const filteredDishes = dishes.filter(dish => dish.category === currentCategory);
    
    dishesContainer.innerHTML = '';
    
    if (filteredDishes.length === 0) {
        dishesContainer.innerHTML = `
            <div class="empty-basket">
                <p>Keine Gerichte in dieser Kategorie verfügbar</p>
            </div>
        `;
        return;
    }
    
    filteredDishes.forEach(dish => {
        const dishElement = createDishElement(dish);
        dishesContainer.appendChild(dishElement);
    });
}

// Create dish element with image
function createDishElement(dish) {
    const dishCard = document.createElement('div');
    dishCard.className = 'dish-card';
    dishCard.innerHTML = dishCardTemplate(dish);
    
    // Add event listeners to buttons
    const addBtn = dishCard.querySelector('.add-btn');
    
    if (addBtn) {
        addBtn.addEventListener('click', () => addToBasket(dish.name));
    }
    
    return dishCard;
}

// Update basket display
function updateBasket() {
    // Update basket items
    renderBasketItems(basketItems);
    renderBasketItems(modalBasketItems);
    
    // Calculate totals
    const subtotal = calculateSubtotal();
    const total = subtotal + deliveryCost;
    
    // Update totals
    if (subtotalElement) subtotalElement.textContent = `${subtotal.toFixed(2)}€`;
    if (modalSubtotalElement) modalSubtotalElement.textContent = `${subtotal.toFixed(2)}€`;
    if (totalElement) totalElement.textContent = `${total.toFixed(2)}€`;
    if (modalTotalElement) modalTotalElement.textContent = `${total.toFixed(2)}€`;
    if (responsiveTotalElement) responsiveTotalElement.textContent = `${total.toFixed(2)}€`;
    
    // Update basket count
    const itemCount = basket.reduce((sum, item) => sum + item.quantity, 0);
    if (basketCount) basketCount.textContent = itemCount;
    
    // Enable/disable checkout buttons
    const hasItems = basket.length > 0;
    if (checkoutBtn) checkoutBtn.disabled = !hasItems;
    if (modalCheckoutBtn) modalCheckoutBtn.disabled = !hasItems;
}

// Render basket items
function renderBasketItems(container) {
    if (!container) return;
    
    if (basket.length === 0) {
        container.innerHTML = renderBasketItemsTemplate();
        return;
    }
    
    container.innerHTML = '';
    
    basket.forEach(item => {
        const basketItem = document.createElement('div');
        basketItem.className = 'basket-item';
        basketItem.innerHTML = basketItemTemplate(item);
        container.appendChild(basketItem);
        
        // Add event listeners to basket item buttons
        const plusBtn = basketItem.querySelector('.plus');
        const minusBtn = basketItem.querySelector('.minus');
        const removeBtn = basketItem.querySelector('.remove');
        
        if (plusBtn) {
            plusBtn.addEventListener('click', () => addToBasket(item.name));
        }
        
        if (minusBtn) {
            minusBtn.addEventListener('click', () => removeFromBasket(item.name));
        }
        
        if (removeBtn) {
            removeBtn.addEventListener('click', () => removeFromBasket(item.name, true));
        }
    });
}

// Calculate subtotal
function calculateSubtotal() {
    return basket.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// Add item to basket
function addToBasket(dishName) {
    const dish = dishes.find(d => d.name === dishName);
    if (!dish) return;
    
    const existingItem = basket.find(item => item.name === dishName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        basket.push({
            name: dish.name,
            price: dish.price,
            quantity: 1
        });
    }
    
    updateBasket();
}

// Remove item from basket
function removeFromBasket(dishName, removeAll = false) {
    const itemIndex = basket.findIndex(item => item.name === dishName);
    if (itemIndex === -1) return;
    
    if (removeAll || basket[itemIndex].quantity === 1) {
        basket.splice(itemIndex, 1);
    } else {
        basket[itemIndex].quantity -= 1;
    }
    
    updateBasket();
}

// Handle checkout
function handleCheckout() {
    if (basket.length === 0) return;
    
    // Show success message
    if (successMessage) successMessage.style.display = 'block';
    if (modalSuccessMessage) modalSuccessMessage.style.display = 'block';
    
    // Clear basket
    basket = [];
    updateBasket();
    
    // Hide success message after 3 seconds
    setTimeout(() => {
        if (successMessage) successMessage.style.display = 'none';
        if (modalSuccessMessage) modalSuccessMessage.style.display = 'none';
    }, 3000);
    
    // Close modal if open
    if (basketModal) {
        basketModal.classList.remove('active');
    }
}

// Initialize the app when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
