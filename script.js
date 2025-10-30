let basket = [];
const deliveryCost = 5.00;
let currentCategory = 'hauptgerichte';


const categories = [
    { id: 'hauptgerichte', name: 'Hauptgerichte' },
    { id: 'beilagen', name: 'Beilage' }
];

function init() {
    renderCategories();
    renderDishes();
    updateBasket();
    setupEventListeners();
}

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

function switchCategory(categoryId) {
    currentCategory = categoryId;
    
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === categoryId) {
            btn.classList.add('active');
        }
    });
    
    const category = categories.find(cat => cat.id === categoryId);
    if (currentCategoryTitle && category) {
        currentCategoryTitle.textContent = category.name;
    }
    
    renderDishes();
}

function setupEventListeners() {
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
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleCheckout);
    }
    
    if (modalCheckoutBtn) {
        modalCheckoutBtn.addEventListener('click', handleCheckout);
    }
    
    if (basketModal) {
        basketModal.addEventListener('click', (e) => {
            if (e.target === basketModal) {
                basketModal.style.display = 'none';
            }
        });
    }
}

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

function createDishElement(dish) {
    const dishCard = document.createElement('div');
    dishCard.className = 'dish-card';
    dishCard.innerHTML = dishCardTemplate(dish);
    
    const addBtn = dishCard.querySelector('.add-btn');
    
    if (addBtn) {
        addBtn.addEventListener('click', () => addToBasket(dish.name));
    }
    
    return dishCard;
}

function updateBasket() {
    renderBasketItems(basketItems);
    renderBasketItems(modalBasketItems);
    
    const subtotal = calculateSubtotal();
    const total = subtotal + deliveryCost;
    
    if (subtotalElement) subtotalElement.textContent = `${subtotal.toFixed(2)}€`;
    if (modalSubtotalElement) modalSubtotalElement.textContent = `${subtotal.toFixed(2)}€`;
    if (totalElement) totalElement.textContent = `${total.toFixed(2)}€`;
    if (modalTotalElement) modalTotalElement.textContent = `${total.toFixed(2)}€`;
    if (responsiveTotalElement) responsiveTotalElement.textContent = `${total.toFixed(2)}€`;
    
    const itemCount = basket.reduce((sum, item) => sum + item.quantity, 0);
    if (basketCount) basketCount.textContent = itemCount;
    
    const hasItems = basket.length > 0;
    if (checkoutBtn) checkoutBtn.disabled = !hasItems;
    if (modalCheckoutBtn) modalCheckoutBtn.disabled = !hasItems;
}

function setupBasketItemEvents(basketItemElement, item) {
    const plusBtn = basketItemElement.querySelector('.plus');
    const minusBtn = basketItemElement.querySelector('.minus');
    const removeBtn = basketItemElement.querySelector('.remove');
    
    if (plusBtn) {
        plusBtn.addEventListener('click', () => addToBasket(item.name));
    }
    
    if (minusBtn) {
        minusBtn.addEventListener('click', () => removeFromBasket(item.name));
    }
    
    if (removeBtn) {
        removeBtn.addEventListener('click', () => removeFromBasket(item.name, true));
    }
}

function renderBasketItems(container) {
    if (!container) return;
    
    container.innerHTML = basketItemsTemplate(basket);
    
    if (basket.length > 0) {
        const basketItemElements = container.querySelectorAll('.basket-item');
        basketItemElements.forEach((element, index) => {
            setupBasketItemEvents(element, basket[index]);
        });
    }
}

function calculateSubtotal() {
    return basket.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

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

function handleCheckout() {
    if (basket.length === 0) return;
    
    if (successMessage) successMessage.style.display = 'block';
    if (modalSuccessMessage) modalSuccessMessage.style.display = 'block';
    
    basket = [];
    updateBasket();
    
    setTimeout(() => {
        if (successMessage) successMessage.style.display = 'none';
        if (modalSuccessMessage) modalSuccessMessage.style.display = 'none';
    }, 3000);
    
    if (basketModal) {
        basketModal.classList.remove('active');
    }
}
