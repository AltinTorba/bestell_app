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

function renderBasketItemsTemplate() {
    return `
        <div class="empty-basket">
            <div class="empty-basket-icon">🛒</div>
            <p>Ihr Warenkorb ist leer</p>
            <p>Fügen Sie leckere Gerichte hinzu!</p>
        </div>
    `;
}

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

function basketItemsTemplate(items) {
    if (items.length === 0) {
        return emptyBasketTemplate();
    }
    
    return items.map(item => basketItemTemplate(item)).join('');
}

function emptyBasketTemplate() {
    return `
        <div class="basket-empty">
            <p>Dein Warenkorb ist leer</p>
        </div>
    `;
}

function basketItemTemplate(item) {
    return `
        <div class="basket-item" data-item-name="${item.name}">
            <div class="basket-item-info">
                <h4>${item.name}</h4>
                <p>€${item.price.toFixed(2)}</p>
            </div>
            <div class="basket-item-controls">
                <button class="minus" type="button">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="plus" type="button">+</button>
                <button class="remove" type="button">🗑️</button>
            </div>
        </div>
    `;
}