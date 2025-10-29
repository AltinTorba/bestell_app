// Dish card template - Nur mit + Button in der rechten oberen Ecke
function dishCardTemplate(dish) {
    return `
        <img src="${dish.image}" alt="${dish.name}" class="dish-image">
        <div class="dish-info">
            <div class="dish-name">${dish.name}</div>
            <div class="dish-description">${dish.description}</div>
            <div class="dish-price">${dish.price.toFixed(2)}€</div>
            <div class="dish-actions">
                <button class="add-btn" data-id="${dish.name}">+</button>
            </div>
        </div>
    `;
}

// Empty basket template
function renderBasketItemsTemplate() {
    return `
        <div class="empty-basket">
            <div class="empty-basket-icon">🛒</div>
            <p>Ihr Warenkorb ist leer</p>
            <p>Fügen Sie leckere Gerichte hinzu!</p>
        </div>
    `;
}

// Basket item template
function basketItemTemplate(item) {
    return `
    <div class="basket-item-info">
        <div class="basket-item-name">${item.name}</div>
        <div class="basket-item-price">${item.price.toFixed(2)}€</div>
    </div>
    <div class="basket-item-actions">
        <button class="quantity-btn minus" data-id="${item.name}">-</button>
        <span>${item.quantity}x</span>
        <button class="quantity-btn plus" data-id="${item.name}">+</button>
        <button class="quantity-btn remove" data-id="${item.name}">🗑️</button>
    </div>
    `;
}