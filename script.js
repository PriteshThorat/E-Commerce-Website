const cart = document.getElementById("cart");
const products = document.getElementById("products");

let cartBuy;
let cartRemove;
let totalBuy;

const cartBackground = document.createElement("div");
cartBackground.id = "cart-background";
document.body.appendChild(cartBackground);
const cartElement = document.getElementById("cart-background");

const productsObj = {
  img : [
    "https://rukminim2.flixcart.com/image/200/200/xif0q/mobile/j/b/n/-original-imahyuhfzvybhaat.jpeg?q=70",
    "https://rukminim2.flixcart.com/image/200/200/xif0q/mobile/g/b/x/-original-imagtt4h4ptmxgwn.jpeg?q=70",
    "https://rukminim2.flixcart.com/image/200/200/xif0q/mobile/s/9/i/m6-pro-5g-mzb0eqjin-poco-original-imags3e7dazavyje.jpeg?q=70",
    "https://rukminim2.flixcart.com/image/200/200/xif0q/mobile/b/m/g/-original-imagxaqtqng2hpxn.jpeg?q=70",
    "https://rukminim2.flixcart.com/image/200/200/xif0q/mobile/i/k/l/edge-50-fusion-pb300001in-motorola-original-imahywzpfd2jh9ep.jpeg?q=70",
    "https://rukminim2.flixcart.com/image/200/200/xif0q/mobile/4/y/b/-original-imahyzygycuyg3mq.jpeg?q=70",
    "https://rukminim2.flixcart.com/image/200/200/xif0q/mobile/i/k/k/c65-mzb0g8rin-poco-original-imagw6gyhhu7hur5.jpeg?q=70",
    "https://rukminim2.flixcart.com/image/200/200/xif0q/mobile/q/y/m/-original-imagz7f9hzrahd2z.jpeg?q=70",
    "https://rukminim2.flixcart.com/image/200/200/xif0q/mobile/k/g/j/t3x-5g-v2338-vivo-original-imahyyzaqhgwzfup.jpeg?q=70",
    "https://rukminim2.flixcart.com/image/200/200/xif0q/mobile/v/c/2/-original-imahfsy9xyk5fujz.jpeg?q=70",
    "https://rukminim2.flixcart.com/image/200/200/xif0q/mobile/h/d/9/-original-imagtc2qzgnnuhxh.jpeg?q=70"
  ],
  name: [
    "Realme P1 5G",
    "vivo T2 Pro 5g",
    "Poco M6 Pro 5G",
    "Redmi 12 5G",
    "Moto Edge 50 Fusion",
    "Realme P1 Pro 5G",
    "Poco C65",
    "Nothing Phone 2a",
    "Vivo t3x 5G",
    "Infinix Nota 40 Pro",
    "iPhone 15"
  ],
  price: [
    "14,999",
    "20,999",
    "9,249",
    "9,999",
    "20,999",
    "20,999",
    "6,799",
    "22,999",
    "12,499",
    "15,999",
    "63,999"
  ],
  add: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
};

const cartObj = {
  name: [],
  price: [],
  add: []
};

const productFn = () => {
  const { img, name, price} = productsObj;
  name.forEach((el, i) => {
    products.innerHTML += `
    <div class="product-div">
      <img class="product-img" src="${img[i]}">
      <p class="product-name">${el}</p>
      <p class="product-price">₹${price[i]}</p>
      <div class="item-add">
        <button class="product-add" id="add-${i}">+</button>
        <span class="product-add-value">${productsObj.add[i]}</span>
        <button class="product-sub" id="sub-${i}">-</button>
      </div>
    </div>
    `;
  });
};

let clicked = false;

const totalAmount = () => {
  let total = 0;
  const { price, add } = cartObj;
  price.forEach((el, i) => {
    total += parseInt(el.replace(/,/g, "")) * add[i];
  });
  return total.toLocaleString();
};

const cutAll = () => {
  cartObj.name = [];
  cartObj.price = [];
  cartObj.add = [];
  productsObj.add = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  const productAddValue = document.querySelectorAll(".product-add-value");
  productAddValue.forEach((el) => {
    el.textContent = 0;
  });

  cartElement.innerHTML = "";
  cartDisplay();
  totalAmount();
  eventListener();
};

const cut = (index) => {
  let replaceIndex = productsObj.name.indexOf(cartObj.name[index]);
  console.log(replaceIndex);
  productsObj.add[replaceIndex] = 0;

  const productAddValue = document.querySelectorAll(".product-add-value");
  productAddValue[replaceIndex].textContent = 0;

  cartObj.add.splice(index, 1);
  cartObj.price.splice(index, 1);
  cartObj.name.splice(index, 1);

  cartElement.innerHTML = "";
  cartDisplay();
  totalAmount();
  eventListener();
};

const eventListener = () => {
  if (clicked && cartObj.price.length !== 0) {
    
    cartBuy.forEach((el, i) => {
        el.addEventListener("click", () => {
          cut(el.id);
        });
      });
      
      cartRemove.forEach((el, i) => {
        el.addEventListener("click", () => {
          cut(el.id);
        });
      });
    }

    totalBuy.addEventListener("click", () => {
      cutAll();
    });
};

const cartDisplay = () => {
  cartElement.innerHTML = `
  <h1 class="cart-heading">Cart</h1>
  <div id="cart-div"></div>
  <div class="total-div">
    <p class="total-text">Total:</p>
    <p class="total-amount">₹ ${totalAmount()}</p>
    <button id="total-buy">Buy All</button>
  </div>
  `;

  const { name, price, add } = cartObj;

  const cartDiv = document.getElementById("cart-div");
  name.forEach((el, i) => {
    cartDiv.innerHTML += `
    <div class="cart-child">
      <p class="cart-name">${el}</p>
      <span class="cart-price">₹${price[i]}</span>
      <span class="cart-add">${add[i]} Items</span>
      <div class="cart-btn">
        <button class="cart-buy" id="${i}">Buy</button>
        <button class="cart-remove" id="${i}">Remove</button>
      </div>
    </div>
    `;
  });

  cartBuy = document.querySelectorAll(".cart-buy");
  cartRemove = document.querySelectorAll(".cart-remove");
  totalBuy = document.getElementById("total-buy");
};

cart.addEventListener("click", () => {
  if (clicked) {
     clicked = false;

     cart.textContent = "Cart";
     products.style.display = "flex";
     cartElement.innerHTML = "";
  } else {
    clicked = true;

    cart.textContent = "Home";
    products.style.display = "none";

    cartDisplay();
    eventListener();
  }
});

window.addEventListener("load", () => {
  productFn();

  const productAdd = document.querySelectorAll(".product-add");
  const productSub = document.querySelectorAll(".product-sub");
  const productAddValue = document.querySelectorAll(".product-add-value");

  productAdd.forEach((el, i) => {
    el.addEventListener("click", () => {
      if (productsObj.add[i] === 0) {
        cartObj.name.push(productsObj.name[i]);
        cartObj.price.push(productsObj.price[i]);
        cartObj.add.push(productsObj.add[i]);
      }

      let addIndex = cartObj.add.indexOf(productsObj.add[i]);
      cartObj.add[addIndex]++;
      productsObj.add[i]++;
      productAddValue[i].textContent = productsObj.add[i];
    });
  });

  productSub.forEach((el, i) => {
    el.addEventListener("click", () => {
      if (productsObj.add[i] === 0) {
        alert("You Have Not Choosen Any Item!");
      } else {
        let removeIndex = cartObj.name.indexOf(productsObj.name[i]);

        if (productsObj.add[i] === 1) {
          
          cartObj.add.splice(removeIndex, 1);
          cartObj.name.splice(removeIndex, 1);
          cartObj.price.splice(removeIndex, 1);
        }

        cartObj.add[removeIndex]--;
        productsObj.add[i]--;
        productAddValue[i].textContent = productsObj.add[i];
      }
    });
  });
});
