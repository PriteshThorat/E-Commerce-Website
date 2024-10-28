const cart = document.getElementById("cart");
const products = document.getElementById("products");
const header = document.getElementById("header");
const heading = document.getElementById("heading");
const signIn = document.getElementById("sign-in");

let cartBuy;
let cartRemove;
let totalBuy;
let deliveryCharges = 0.48;
let cout = 1;

const cartBackground = document.createElement("div"); //Created an Element for Cart
cartBackground.id = "cart-background";
document.body.appendChild(cartBackground);
const cartElement = document.getElementById("cart-background");

const productInfo = document.createElement("div"); //Created an Element for Product Information
productInfo.id = "product-info";
document.body.appendChild(productInfo);
const productInfoDiv = document.getElementById("product-info");

const qrElement = document.createElement("div"); //Created an Element for QR
document.body.appendChild(qrElement);
qrElement.className = "qr-div";
qrElement.id = "qr";

//Fetching E-Commerce Data
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); 
        productFn(data);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

//Giving the JSON File
fetchData('https://fakestoreapi.com/products');

//Creating Cart Data
const cartObj = {
  id: [],
  name: [],
  price: [],
  add: [],
  img: []
};

//Adding Fetched Data to Home Page
const productFn = (data) => {
  data.forEach(el => {
    products.innerHTML += `
    <button class="product-div" id="product-${el.id}">
      <img class="product-img" src="${el.image}">
      <div class="product-name">${el.title}</div>
      <p class="product-price">$${el.price}</p>
    </button>
    `;
  });
  eventListenerForProductDiv(data);
};

let clicked = false;

// Calculating Total Amount
const totalAmount = () => {
  let total = 0;
  const { price, add } = cartObj;
  price.forEach((el, i) => {
    total += el * add[i];
  });
  return parseFloat(total).toFixed(2);
};

//Making Fuction for Buy All Operation to Remove All Element from Cart
const cutAll = () => {
  cartObj.name = [];
  cartObj.price = [];
  cartObj.add = [];
  cartObj.id = [];
  cartObj.img = [];

  const productAddValue = document.querySelectorAll(".product-add-value");
  productAddValue.forEach((el) => {
    el.textContent = 0;
  });

  cartElement.innerHTML = "";
  totalAmount();
  eventListener();
};

// Making Fuction for Cut Operation to Remove an Element from Cart
const cut = (index) => {
  let removeStr = index.replace(/buy|remove|-/g, ' ');
  let removeInt = parseInt(removeStr);
  let removeIndex = cartObj.id.indexOf(removeInt);
  const productAddValue = document.querySelectorAll(".product-add-value");
  productAddValue.forEach((el, i) => {
    let id = el.id;
    let idStr = id.replace(/text|-/g, ' ');
    let idInt = parseInt(idStr);
    if (removeInt === idInt) {
      productAddValue[i].textContent = 0;
    }
  });

  cartObj.add.splice(removeIndex, 1);
  cartObj.price.splice(removeIndex, 1);
  cartObj.name.splice(removeIndex, 1);
  cartObj.id.splice(removeIndex, 1);
  cartObj.img.splice(removeIndex, 1);

  cartElement.innerHTML = "";
  console.log(cout);
  cout++;
  cartDisplay();
  totalAmount();
  eventListener();
};

// To display Payment Operation after clicking on Buy All
const buyAll = () => {
  productInfoDiv.style.display = "none";
  header.style.display = "none";
  cartElement.style.display = "none";

  const qr = document.getElementById("qr");
  qr.innerHTML = `
  <img class="buy-img" src="QR_Code.jpeg">
  <p class="buy-text">Your Total Payment is $${totalAmount()}</p>
  `;
}

// To display Payment Operation after clicking on Buy in Info Page
const buy = (price) => {
  cartElement.style.display = "none";
  productInfoDiv.style.display = "none";
  header.style.display = "none";

  const qr = document.getElementById("qr");
  qr.innerHTML = `
  <img class="buy-img" src="QR_Code.jpeg">
  <p class="buy-text">Your Total Payment is $${price.toLocaleString()}</p>
  `;
}

//Going to signIn.html
signIn.addEventListener("click", () => {
  window.location.href = "signIn.html";
});

// Making an Function for Event Listener, Because it comes after creating Cart Elements
const eventListener = () => {
  if (cartObj.price.length !== 0) {
      cartRemove.forEach((el) => {
        el.addEventListener("click", () => {
          cut(el.id);
        });
      });
    }

    totalBuy.addEventListener("click", () => {
      buyAll();
      cutAll();
      setTimeout(function qrTimeoutFn() {
        const qr = document.getElementById("qr");
        qr.innerHTML = "";
        cartElement.innerHTML = "";
        cartElement.style.display = "flex";
        header.style.display = "flex";
        console.log('totalBuy: ${cout}');
        cout++;
        cartDisplay();
        eventListener();
      }, 2000);
    });
};

// Making an Event Listenr for Prodcts Info
const eventListenerForProductDiv = (data) => {
  const productDiv = document.querySelectorAll(".product-div");
    productDiv.forEach(el => {
      el.addEventListener("click", () => {
        cartElement.style.display = "none";
        let id = el.id.replace(/product|-/g, ' ');
        data.forEach(el => {
          if(parseInt(el.id) === parseInt(id)) {
            gotoInfo(el);
          }
        });
      });
    });
};

const addCart = (data) => {
  const addToCart = document.getElementById(`add-${data.id}`);
  addToCart.addEventListener("click", () => {
    if (!cartObj.id.includes(data.id)) {
      cartObj.name.push(data.title);
      cartObj.price.push(data.price);
      cartObj.id.push(data.id);
      cartObj.img.push(data.image);
      cartObj.add.push(1);
    }

    setTimeout(function addCartTimeFn() {
      clicked = true;
      cart.textContent = "Home";
      productInfoDiv.style.display = "none";
      productInfoDiv.innerHTML = "";
      cartElement.style.display = "flex";
      console.log('addcart: ${cout}');
      cout++;
      cartDisplay();
      eventListener();
    }, 1000);
  });
};

const infoBuy = (data) => {
  const addToBuy = document.getElementById(`buy-${data.id}`);
  addToBuy.addEventListener("click", () => {
    buy(data.price);
    setTimeout(function infoBuyTimeFn() {
      console.log(`info`);
      const qr = document.getElementById("qr");
      qr.innerHTML = "";
      productInfoDiv.style.display = "flex";
      header.style.display = "flex";
      //cartElement.style.display = "flex";
    }, 2000);
  });
};

// Making an Function for Info Page
const gotoInfo = (data) => {
  console.log("hii");
  products.style.display = "none";
  productInfoDiv.textContent = "";
  productInfoDiv.innerHTML = `
  <div class="img-mobile">
    <img class="prd-img" src="${data.image}">
  </div>
  <div class="info-img-div">
    <img class="info-img" src="${data.image}">
    <div class="info-buttons">
      <button class="info-add-cart" id="add-${data.id}">&#x1F6D2; ADD TO CART</button>
      <button class="info-buy cart-buy" id="buy-${data.id}">&#x26A1; BUY NOW</button>
    </div>
  </div>
  <div class="info-div">
    <h1 class="info-title">${data.title}</h1>
    <p class="info-desc">${data.description}</p>
    <span>
      <span class="info-rate"> ${data.rating.rate} &#9733; </span>
      <span class="info-count">${data.rating.count} Rating</span>
    </span>
    <h2 class="info-price">$ ${data.price.toLocaleString()}</h2>
  </div>
  `;
  addCart(data);
  infoBuy(data);
};

// Making Inner Cart Elements 
const cartDisplay = () => {
  console.log(cartObj);
  const { name, price, add, id, img } = cartObj;

  if (name.length !== 0) {
    cartElement.innerHTML = `
    <div class="order-full">
      <div id="cart-div"></div>
      <div class="place-order">
        <p class="total-phone">$ ${(parseFloat(totalAmount()) + parseFloat(deliveryCharges)).toFixed(2)}</p>
        <button id="total-buy">PLACE ORDER</button>
      </div>
    </div>
    <div class="total-div">
      <p class="details-head">PRICE DETAILS</p>
      <hr>
      <div class="total-subdiv">
        <span class="price-text">Price (${cartObj.name.length} Item)</span>
        <span class="price-value">$ ${totalAmount()}</span>
      </div>
      <div class="total-subdiv">
        <span class="delivery-text">Delivery Charges</span>
        <span class="delivery-value">$ 0.48</span>
      </div>
      <hr>
      <div class="total-subdiv">
        <span class="total-text"><b>Total Amount</b></span>
        <span class="total-amount"><b>$ ${(parseFloat(totalAmount()) + parseFloat(deliveryCharges)).toFixed(2)}</b></span>
      </div>
    </div>
  `;

  const cartDiv = document.getElementById("cart-div");

  name.forEach((el, i) => {
    cartDiv.innerHTML += `
      <div class="order-info">
        <div class="cart-name-img">
          <img class="cart-product-img" src="${img[i]}">
          <div class="cart-name-price">
            <p class="cart-name">${el}</p>
            <p class="cart-price">$${price[i]}</p>
          </div>
        </div>
        <div class="updation-div">
          <div class="item-add updation">
            <button class="product-sub" id="sub-${id[i]}" disabled>-</button>
            <span class="product-add-value" id="text-${id[i]}">${add[i]}</span>
            <button class="product-add" id="add-${id[i]}">+</button>
          </div>
          <button class="cart-remove" id="remove-${id[i]}">Remove</button>
        </div>
      </div>
    `;

    cartBuy = document.querySelectorAll(".cart-buy");
    cartRemove = document.querySelectorAll(".cart-remove");
    totalBuy = document.getElementById("total-buy");
  });

  addAndRemove(cartObj);
  }
};

//To Add and Subtract Items from Cart
const addAndRemove = (data) => {
  const productAdd = document.querySelectorAll(".product-add");
  const productSub = document.querySelectorAll(".product-sub");
  const productAddValue = document.querySelectorAll(".product-add-value");

  const { id, name } = data;
  for (let i=0; i<1; i++) {
    productAdd.forEach((el, i) => {
      let disabledBtn = document.getElementById(`sub-${id[i]}`);
      if (cartObj.add[i] !== 1) {
        disabledBtn.removeAttribute('disabled');
        disabledBtn.style.cursor = "pointer";
      }

      el.addEventListener("click", () => {
        if (el.id == `add-${id[i]}`) {
          disabledBtn.removeAttribute('disabled');
          disabledBtn.style.cursor = "pointer";
          let addIndex = cartObj.name.indexOf(name[i]);
          cartObj.add[addIndex]++;
          productAddValue[i].textContent = cartObj.add[addIndex];

          document.querySelector('.total-amount').textContent = `$ ${(parseFloat(totalAmount()) + parseFloat(deliveryCharges)).toFixed(2)}`;
          document.querySelector(".price-value").textContent = `$ ${parseFloat(totalAmount()).toFixed(2)}`;
        }
    });
  });
  
  productSub.forEach((el, i) => {
    let disabledBtn = document.getElementById(el.id);

    el.addEventListener("click", () => {
      if (el.id == `sub-${id[i]}`) {
        if (cartObj.add[i] === 2) {
          disabledBtn.disabled = "true";
          disabledBtn.style.cursor = "default";
        }

        if (cartObj.id.includes(id[i])) {
        let removeIndex = cartObj.name.indexOf(name[i]);
        
        if (cartObj.add[removeIndex] !== 1){
          cartObj.add[removeIndex]--;
          productAddValue[i].textContent = cartObj.add[removeIndex];

          document.querySelector('.total-amount').textContent = `$ ${(parseFloat(totalAmount()) + parseFloat(deliveryCharges)).toFixed(2)}`;
          document.querySelector(".price-value").textContent = `$ ${parseFloat(totalAmount()).toFixed(2)}`;
        }
      }
      }
    });
  });
  }
};

//Event Listener for Cart Element to Call Necesscery Function and Do that Operation
cart.addEventListener("click", () => {
  if (clicked) {
     clicked = false;

     cart.textContent = "Cart";
     heading.textContent = "Thorat";
     products.style.display = "flex";
     productInfoDiv.style.display = "flex";
     productInfoDiv.innerHTML = "";
     cartElement.inneHTML = "";
     cartElement.style.display = "none";
  } else {
    clicked = true;

    cart.textContent = "Home";
    products.style.display = "none";
    productInfoDiv.style.display = "none";
    productInfoDiv.innerHTML = "";
    cartElement.style.display = "flex";

    if (cartObj.name.length > 0) {
      console.log('button: ${cout}');
      cout++;
      cartDisplay();
      eventListener();
    }
  }
});
