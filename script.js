const cart = document.getElementById("cart");
const products = document.getElementById("products");
const header = document.getElementById("header");
const heading = document.getElementById("heading");

let cartBuy;
let cartRemove;
let totalBuy;

const cartBackground = document.createElement("div");
cartBackground.id = "cart-background";
document.body.appendChild(cartBackground);
const cartElement = document.getElementById("cart-background");

const qrElement = document.createElement("div");
document.body.appendChild(qrElement);
qrElement.className = "qr-div";
qrElement.id = "qr";

const imagesURL = [
  "https://i.imgur.com/LuWzBCD.jpg",
  "https://i.imgur.com/5AaNff4.jpg",
  "https://i.imgur.com/mCUfRde.jpg"
];

async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); 
        const { categories, products } = data;
        productFn(categories, products);
        addAndRemove(products);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

fetchData('https://gist.githubusercontent.com/PriteshThorat/e7c837a6d6d044a81f2cd65b7ec4f198/raw/170488a99b5c77ecbf64419d32760211202d4d55/ecommerce.json');

const cartObj = {
  id: [],
  name: [],
  price: [],
  add: []
};

const productFn = (category, data) => {
  data.forEach((el, i) => {
    products.innerHTML += `
    <div class="product-div">
      <img class="product-img" src="${el.category_id === 1 ? imagesURL[0] : el.category_id === 2 ? imagesURL[1] : imagesURL[2]}">
      <p class="product-name">${el.name}</p>
      <p class="product-price">$${el.price}</p>
      <div class="item-add">
        <button class="product-add" id="add-${el.id}">+</button>
        <span class="product-add-value" id="text-${el.id}">0</span>
        <button class="product-sub" id="sub-${el.id}">-</button>
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
    total += el * add[i];
  });
  return total.toLocaleString();
};

const cutAll = () => {
  cartObj.name = [];
  cartObj.price = [];
  cartObj.add = [];
  cartObj.id = [];

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

  cartElement.innerHTML = "";
  cartDisplay();
  totalAmount();
  eventListener();
};

const buy = () => {
  if (totalAmount() == 0) {
    alert("Your Cart is Empty!");
    return;
  }
  
  cartElement.style.display = "none";
  header.style.display = "none";

  const qr = document.getElementById("qr");
  qr.innerHTML = `
  <img class="buy-img" src="https://i.imgur.com/d1YqY14.jpg">
  <p class="buy-text">Your Total Payment is ₹${totalAmount()}</p>
  `;
}

const eventListener = () => {
  if (clicked && cartObj.price.length !== 0) {
    
    cartBuy.forEach((el) => {
        el.addEventListener("click", () => {
          buy();
          cut(el.id);
          document.addEventListener("mousemove", () => {
            const qr = document.getElementById("qr");
            qr.innerHTML = "";
            cartElement.style.display = "flex";
            header.style.display = "flex";
          });
        });
      });
      
      cartRemove.forEach((el) => {
        el.addEventListener("click", () => {
          cut(el.id);
        });
      });
    }

    totalBuy.addEventListener("click", () => {
      buy();
      cutAll();
      document.addEventListener("mousemove", () => {
        const qr = document.getElementById("qr");
        qr.innerHTML = "";
        cartElement.style.display = "flex";
        header.style.display = "flex";
      });
    });
};

const cartDisplay = () => {
  cartElement.innerHTML = `
  <div id="cart-div"></div>
  <div class="total-div">
    <p class="total-text">Total:</p>
    <p class="total-amount">$ ${totalAmount()}</p>
    <button id="total-buy">Buy All</button>
  </div>
  `;

  const { name, price, add, id } = cartObj;
  const cartDiv = document.getElementById("cart-div");
  name.forEach((el, i) => {
    cartDiv.innerHTML += `
    <div class="cart-child">
      <p class="cart-name">${el}</p>
      <span class="cart-price">$${price[i]}</span>
      <span class="cart-add">${add[i]} Items</span>
      <div class="cart-btn">
        <button class="cart-buy" id="buy-${id[i]}">Buy</button>
        <button class="cart-remove" id="remove-${id[i]}">Remove</button>
      </div>
    </div>
    `;
  });

  cartBuy = document.querySelectorAll(".cart-buy");
  cartRemove = document.querySelectorAll(".cart-remove");
  totalBuy = document.getElementById("total-buy");
};

const addAndRemove = (data) => {
  const productAdd = document.querySelectorAll(".product-add");
  const productSub = document.querySelectorAll(".product-sub");
  const productAddValue = document.querySelectorAll(".product-add-value");

  data.forEach((element) => {
    productAdd.forEach((el, i) => {
      el.addEventListener("click", () => {
        if (el.id == `add-${element.id}`) {
          if (!cartObj.id.includes(element.id)) {
            cartObj.name.push(element.name);
            cartObj.price.push(element.price);
            cartObj.id.push(element.id);
            cartObj.add.push(0);
          }
          let addIndex = cartObj.name.indexOf(element.name);
          cartObj.add[addIndex]++;
          productAddValue[i].textContent = cartObj.add[addIndex];
        }
    });
  });

  productSub.forEach((el, i) => {
    el.addEventListener("click", () => {
      if (el.id == `sub-${element.id}`) {
        if (!cartObj.id.includes(element.id)) {
        alert("You Have Not Choosen Any Item!");
        } else {
        let removeIndex = cartObj.name.indexOf(element.name);

        if (cartObj.add[removeIndex] === 1) {
          cartObj.add.splice(removeIndex, 1);
          cartObj.name.splice(removeIndex, 1);
          cartObj.id.splice(removeIndex, 1);
          cartObj.price.splice(removeIndex, 1);
          productAddValue[i].textContent = 0;
        } else {
          cartObj.add[removeIndex]--;
          productAddValue[i].textContent = cartObj.add[removeIndex];
        }
      }
      }
    });
  });
  });
};

cart.addEventListener("click", () => {
  if (clicked) {
     clicked = false;

     cart.textContent = "Cart";
     heading.textContent = "E-Commerce Website";
     products.style.display = "flex";
     cartElement.innerHTML = "";
  } else {
    clicked = true;

    cart.textContent = "Home";
    heading.textContent = "Cart"
    products.style.display = "none";

    cartDisplay();
    eventListener();
  }
});
