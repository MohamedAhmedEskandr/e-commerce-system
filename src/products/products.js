document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('nav ul li:nth-child(1) button').addEventListener('click', OnClickHomeButton);
    document.querySelector('nav ul li:nth-child(2) button').addEventListener('click', AboutButtonOnClick);
    document.querySelector('nav ul li:nth-child(3) button').addEventListener('click', OnClickContactButton);
    document.querySelector('nav ul li:nth-child(6) button').addEventListener('click', OnClickCart);
    document.getElementById('nextBtn').addEventListener('click', showNextImage);
    document.getElementById('prevBtn').addEventListener('click', showPreviousImage);
    document.getElementById('RealMadrid1').addEventListener('click', OnClickRealMadridImage);
    document.getElementById('Barcelona1').addEventListener('click', OnClickBarcelonaImage);
    document.getElementById('Zamalek1').addEventListener('click', OnClickZamalekImage);
    document.getElementById('Elitthad1').addEventListener('click', OnClickElitthadImage);
    startAutomaticSlider();
    var logoutButton = document.getElementById('logoutButton');
    if (logoutButton) 
        logoutButton.addEventListener('click', OnClickLogOut);
});
var circularButton = document.getElementById('circularButton');
if (circularButton) {
    circularButton.addEventListener('click', OnClickupbutton);
}
document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username');
    if (username) {
        document.getElementById('username').textContent = username;
    }
});
/***************************************************************************************************************/
function OnClickHomeButton() {
    var containers = document.querySelectorAll('.container, .show, .products, #about, #contact');
    containers.forEach(function(container) {
        container.style.display = 'block';
    });

    var homeDiv = document.getElementById('home');
    if (homeDiv) {
        var originalBackgroundColor = homeDiv.style.backgroundColor;
        var originalFontColor = homeDiv.style.color;
        homeDiv.style.backgroundColor = '#4CAF50'; 
        homeDiv.style.color = '#FFF'; 
        nc = document.getElementById('newcontainer');
        nc.style.display='none';
    }
}
function AboutButtonOnClick() {
    var aboutDiv = document.getElementById('about');
    aboutDiv.scrollIntoView({ behavior: 'smooth' });
    aboutDiv.style.backgroundColor = '#4CAF50'; 
    aboutDiv.style.color = '#FFF';
}
function OnClickContactButton() {
    var contactDiv = document.getElementById('contact');
    contactDiv.scrollIntoView({ behavior: 'smooth' });
    contactDiv.style.backgroundColor = '#4CAF50';
    contactDiv.style.color = '#FFF';
}
function OnClickLogOut() {
    window.location.href = '../login/login.html';
}
function OnClickupbutton() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
/***************************************************************************************************************/
var cartItems = [];

function OnClickCart() {
    var containers = document.querySelectorAll('.container, .newcontainer, .detailed-view');
    containers.forEach(function(container) {
        container.style.display = 'none';
    });

    var cartContent = document.getElementById('Cart');
    cartContent.style.display = 'block';
    cartContent.innerHTML = '';
    if (cartItems.length === 0) {
        cartContent.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cartItems.forEach(function(item, index) {
            var itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            
            var imgElement = document.createElement('img');
            imgElement.src = item.img;
            itemElement.appendChild(imgElement);

            var titleElement = document.createElement('h3');
            titleElement.textContent = item.title;
            itemElement.appendChild(titleElement);

            var priceElement = document.createElement('p');
            priceElement.textContent = item.price;
            itemElement.appendChild(priceElement);

            var quantityElement = document.createElement('p');
            quantityElement.textContent = 'Quantity: ' + item.quantity;
            itemElement.appendChild(quantityElement);

            var increaseButton = document.createElement('button');
            increaseButton.textContent = '+';
            increaseButton.addEventListener('click', function() {
                increaseQuantity(index);
            });
            itemElement.appendChild(increaseButton);

            var removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', function() {
                removeFromCart(index);
            });
            itemElement.appendChild(removeButton);

            cartContent.appendChild(itemElement);
        });

        var cashButton = document.createElement('button');
        cashButton.textContent = 'Cash';
        cashButton.addEventListener('click', calculateTotal);
        cartContent.appendChild(cashButton);
    }
}

function addToCart(kit) {
    var existingItem = cartItems.find(item => item.title === kit.title);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        kit.quantity = 1;
        cartItems.push(kit);
    }
    incrementCartCounter();
}

function removeFromCart(index) {
    if (cartItems[index].quantity > 1) {
        cartItems[index].quantity--;
    } else {
        cartItems.splice(index, 1);
    }
    incrementCartCounter(-1);
    OnClickCart();
}

function increaseQuantity(index) {
    cartItems[index].quantity++;
    OnClickCart();
}

function calculateTotal() {
    var total = cartItems.reduce(function(acc, item) {
        return acc + (parseFloat(item.price.replace('$', '')) * item.quantity);
    }, 0);
    alert('Total Price: $' + total.toFixed(2));
}

function incrementCartCounter(amount = 1) {
    var cartCounter = document.getElementById('cartCounter');
    var currentCount = parseInt(cartCounter.textContent);
    cartCounter.textContent = currentCount + amount;
}

/***************************************************************************************************************/ 
/*slide bar الصور الي بتتعرض في ال  */
var images = ["1.jpg", "2.jpg", "3.jpg", "4.jpg"];
var currentImageIndex = 0;
function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    document.getElementById('sliderImage').src = images[currentImageIndex];
}
function showPreviousImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    document.getElementById('sliderImage').src = images[currentImageIndex];
}
function startAutomaticSlider() {
    setInterval(showNextImage, 1500);
}
/***************************************************************************************************************/
function OnClickRealMadridImage() {
    displayNewContainer();
    loadCategory('RealMadrid');
}
function OnClickBarcelonaImage() {
    displayNewContainer();
    loadCategory('Barcelona');
}
function OnClickZamalekImage() {
    displayNewContainer();
    loadCategory('Zamalek');
}
function OnClickElitthadImage() {
    displayNewContainer();
    loadCategory('Elitthad');
}
function displayNewContainer() {
    // بخفي الكونتينر الاساسي الاول
    var containers = document.querySelectorAll('.container, .show, .products, #about, #contact');
    containers.forEach(function(container) {
        container.style.display = 'none';
    });
    // بعرض الكونتينر الجديد
    var newContainer = document.getElementById('newcontainer');
    newContainer.style.display = 'block';
}
function loadCategory(category) {
    var kitsContainer = document.getElementById('kits');
    kitsContainer.innerHTML = ''; 
 // دي الداتا الي حاعرضها  
    var kitsData = {
        RealMadrid: [
            {
                title: 'Real Madrid Home Kit',
                img: 'r1kit.jpg',
                price: '$90',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum nulla vel metus ultrices, eget interdum ipsum dignissim. Nullam quis lacus maximus, dignissim est at, elementum justo.'
            },
            {
                title: 'Real Madrid Away Kit',
                img: 'r2kit.jpg',
                price: '$85',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum nulla vel metus ultrices, eget interdum ipsum dignissim. Nullam quis lacus maximus, dignissim est at, elementum justo.'
            },
            {
                title: 'Real Madrid Third Kit',
                img: 'r3kit.jpg',
                price: '$80',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum nulla vel metus ultrices, eget interdum ipsum dignissim. Nullam quis lacus maximus, dignissim est at, elementum justo.'
            }
        ],
        Barcelona: [
            {
                title: 'Barcelona Home Kit',
                img: 'b1kit.jpg',
                price: '$90',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum nulla vel metus ultrices, eget interdum ipsum dignissim. Nullam quis lacus maximus, dignissim est at, elementum justo.'
            },
            {
                title: 'Barcelona Away Kit',
                img: 'b2kit.jpg',
                price: '$85',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum nulla vel metus ultrices, eget interdum ipsum dignissim. Nullam quis lacus maximus, dignissim est at, elementum justo.'
            },
            {
                title: 'Barcelona Third Kit',
                img: 'b3kit.jpg',
                price: '$80',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum nulla vel metus ultrices, eget interdum ipsum dignissim. Nullam quis lacus maximus, dignissim est at, elementum justo.'
            }
        ],
        Zamalek: [
            {
                title: 'Zamalek Home Kit',
                img: 'z1kit.jpg',
                price: '$90',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum nulla vel metus ultrices, eget interdum ipsum dignissim. Nullam quis lacus maximus, dignissim est at, elementum justo.'
            },
            {
                title: 'Zamalek Away Kit',
                img: 'z2kit.jpg',
                price: '$85',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum nulla vel metus ultrices, eget interdum ipsum dignissim. Nullam quis lacus maximus, dignissim est at, elementum justo.'
            },
            {
                title: 'Zamalek Third Kit',
                img: 'z3kit.jpg',
                price: '$80',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum nulla vel metus ultrices, eget interdum ipsum dignissim. Nullam quis lacus maximus, dignissim est at, elementum justo.'
            }
        ],
        Elitthad: [
            {
                title: 'ElItthad Home Kit',
                img: 'i1kit.jpg',
                price: '$90',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum nulla vel metus ultrices, eget interdum ipsum dignissim. Nullam quis lacus maximus, dignissim est at, elementum justo.'
            },
            {
                title: 'ElItthad Away Kit',
                img: 'i2kit.jpg',
                price: '$85',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum nulla vel metus ultrices, eget interdum ipsum dignissim. Nullam quis lacus maximus, dignissim est at, elementum justo.'
            },
            {
                title: 'ElItthad Third Kit',
                img: 'i3kit.jpg',
                price: '$80',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum nulla vel metus ultrices, eget interdum ipsum dignissim. Nullam quis lacus maximus, dignissim est at, elementum justo.'
            }
        ]
    };
 // هنا ببعت الباراميتر بتاع الكاتيجوري الي حاعرضه
    var kits = kitsData[category];
 // بعمل اسين للداتا و بكريت 
    kits.forEach(function(kit) {
        var kitElement = document.createElement('div');
        kitElement.classList.add('kit-item');

        var imgElement = document.createElement('img');
        imgElement.src = kit.img;
        kitElement.appendChild(imgElement);

        var titleElement = document.createElement('h3');
        titleElement.textContent = kit.title;
        kitElement.appendChild(titleElement);

        var priceElement = document.createElement('p');
        priceElement.textContent = kit.price;
        kitElement.appendChild(priceElement);

        var descriptionElement = document.createElement('p');
        descriptionElement.textContent = kit.description;
        kitElement.appendChild(descriptionElement);
        
        /************************************************/
        var buyButton = document.createElement('button');
        buyButton.textContent = 'Buy';
        buyButton.addEventListener('click', function() {
            alert('Added ' + kit.title + ' to cart');
            addToCart(kit);
        });
        kitElement.appendChild(buyButton);
        /************************************************/

        /************************************************/
        var showButton = document.createElement('button');
        showButton.textContent = 'Show';
        showButton.addEventListener('click', function() {
            showDetailedView(kit); 
        });
        kitElement.appendChild(showButton);
        /************************************************/
        kitsContainer.appendChild(kitElement);
    });
}
function hideKits() {
    var kits = document.querySelectorAll('.kit-item');
    kits.forEach(function(kitItem) {
        kitItem.style.display = 'none';
    });
}
function showKits() {
    var kits = document.querySelectorAll('.kit-item');
    kits.forEach(function(kitItem) {
        kitItem.style.display = 'inline-block'; // Or set to whatever display style it had before hiding
    });
}
function showDetailedView(kit) {
    var detailedView = document.getElementById('detailedView');
    detailedView.innerHTML = ''; 

    var imgElement = document.createElement('img');
    imgElement.src = kit.img;
    detailedView.appendChild(imgElement);

    var titleElement = document.createElement('h3');
    titleElement.textContent = kit.title;
    detailedView.appendChild(titleElement);

    var priceElement = document.createElement('p');
    priceElement.textContent = kit.price;
    detailedView.appendChild(priceElement);

    var descriptionElement = document.createElement('p');
    descriptionElement.textContent = kit.description;
    detailedView.appendChild(descriptionElement);

    var closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.addEventListener('click', function() {
        detailedView.style.display = 'none';
        showKits(); 
    });
    detailedView.appendChild(closeButton);

    detailedView.style.display = 'block';

    hideKits();
}
/********************************************************************************************************************* */






