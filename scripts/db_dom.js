const dishes = [
    {
        name: "Spaghetti Carbonara",
        price: 12.99,
        description: "Cremige Pasta mit Speck und Parmesan, verfeinert mit frischen Kräutern",
        category: "hauptgerichte",
        image: "./assets/img/icons/saitousai-4uVu-Zxa2SA-unsplash.jpg" 
    },
    {
        name: "Pizza Margherita",
        price: 8.90,
        description: "Klassische Pizza mit Mozzarella, frischen Tomaten und Basilikum",
        category: "hauptgerichte",
        image: "./assets/img/icons/pexels-mikhail-nilov-7780260.jpg" 
    },
    {
        name: "Pizza Peperoni",
        price: 11.50,
        description: "Scharfe Pizza mit Salami, Peperoni, Zwiebeln und Knoblauch",
        category: "hauptgerichte",
        image: "./assets/img/icons/pexels-vlada-karpovich-7902939.jpg" 
    },
    {
        name: "Nudelbox Asia",
        price: 10.90,
        description: "Asiatische Nudeln mit Gemüse und Hähnchen in Sojasauce",
        category: "hauptgerichte",
        image: "./assets/img/icons/nudeln1.jpg" 
    },
    {
        name: "Lasagne Classico",
        price: 13.50,
        description: "Hausgemachte Lasagne mit Hackfleischsauce und Béchamel",
        category: "hauptgerichte, pizza",
        image: "./assets/img/icons/saitousai-4uVu-Zxa2SA-unsplash.jpg" 
    },
    {
        name: "Pommes Frites",
        price: 3.50,
        description: "Knusprige Pommes Frites mit Ketchup oder Mayo",
        category: "beilagen",
        image: "./assets/img/icons/Pschritt1materialien.jpg" 
    },
    {
        name: "Gemischter Salat",
        price: 4.20,
        description: "Frischer Salat mit Tomaten, Gurken und Hausdressing",
        category: "beilagen",
        image: "./assets/img/icons/salad.jpg" 
    },
    {
        name: "Knoblauchbrot",
        price: 2.80,
        description: "Knuspriges Brot mit Knoblauchbutter und Kräutern",
        category: "beilagen",
        image: "./assets/img/icons/brot.jpg" 
    }
];


const dishesContainer = document.getElementById('dishes-container');
const categoryNavigation = document.getElementById('category-navigation');
const currentCategoryTitle = document.getElementById('current-category-title');
const basketItems = document.getElementById('basket-items');
const modalBasketItems = document.getElementById('modal-basket-items');
const subtotalElement = document.getElementById('subtotal');
const modalSubtotalElement = document.getElementById('modal-subtotal');
const totalElement = document.getElementById('total');
const modalTotalElement = document.getElementById('modal-total');
const responsiveTotalElement = document.getElementById('responsive-total');
const basketCount = document.querySelector('.basket-count');
const checkoutBtn = document.getElementById('checkout-btn');
const modalCheckoutBtn = document.getElementById('modal-checkout-btn');
const basketModal = document.getElementById('basket-modal');
const responsiveBasketToggle = document.getElementById('responsive-basket-toggle');
const closeModal = document.getElementById('close-modal');
const successMessage = document.getElementById('success-message');
const modalSuccessMessage = document.getElementById('modal-success-message');
