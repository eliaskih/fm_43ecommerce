let root = document.querySelector(":root");
let btnRaiseOrderCount = document.querySelector("#btn-raise-order-count");
let btnReduceOrderCount = document.querySelector("#btn-reduce-order-count");
let currentOrderCount = document.querySelector("#current-order-count");

let btnAddToCart = document.querySelector("#btn-add-to-cart");
let btnCartRemoveItem = document.querySelector("#btn-cart-remove-item");

let cartProductPrice = document.querySelector("#cart-product-price");
let cartProductAmount = document.querySelector("#cart-product-amount");
let cartProductTotal = document.querySelector("#cart-product-total");
let shoppingCartIcon = document.querySelector("#shopping-cart-icon");

let modalCartBodyEmpty = document.querySelector("#modal-cart-body-empty");
let modalCartBodyFilled = document.querySelector("#modal-cart-body-filled");
let modalCartFooter = document.querySelector("#modal-cart-footer");

let imgThumbContainers = document.querySelectorAll(".img-thumb-container");

let lastSelectedImageElement;

function switchProductMainImage(event) {
  let currentElement = event.target;
  let targetElement;

  if (currentElement.tagName == "BUTTON") {
    currentElement = currentElement.children[0];
  }
  if (lastSelectedImageElement) {
    console.log(lastSelectedImageElement);
    lastSelectedImageElement.classList.remove("border");
    lastSelectedImageElement.classList.remove("border-2");
    lastSelectedImageElement.classList.remove("border-warning");
    lastSelectedImageElement.classList.remove("opacity-75");
  }

  lastSelectedImageElement = currentElement;
  console.log(lastSelectedImageElement);
  targetElement =
    currentElement.parentElement.parentElement.previousElementSibling
      .children[0];

  if (currentElement.src.includes("product-1")) {
    targetElement.src = "./images/image-product-1.jpg";
  } else if (currentElement.src.includes("product-2")) {
    targetElement.src = "./images/image-product-2.jpg";
  } else if (currentElement.src.includes("product-3")) {
    targetElement.src = "./images/image-product-3.jpg";
  } else if (currentElement.src.includes("product-4")) {
    targetElement.src = "./images/image-product-4.jpg";
  }
  currentElement.classList.add("border");
  currentElement.classList.add("border-2");
  currentElement.classList.add("border-warning");
  currentElement.classList.add("opacity-75");
}

function addItemToCart() {
  let totalPrice;
  let selectedAmount;
  let productPrice = 125.0;

  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (modalCartBodyFilled.classList.contains("d-none")) {
    showCartMsgItems();
  }

  selectedAmount = parseInt(currentOrderCount.textContent);
  totalPrice = productPrice * selectedAmount;

  cartProductPrice.textContent = formatter.format(productPrice);
  cartProductAmount.textContent = selectedAmount;
  cartProductTotal.textContent = formatter.format(totalPrice);

  root.style.setProperty("--amount-items-in-cart", selectedAmount);

  currentOrderCount.textContent = "1";
}

function cartRemoveItem() {
  cartProductPrice.textContent = "";
  cartProductAmount.textContent = "";
  cartProductTotal.textContent = "";
  showCartMsgEmpty();
}

function showCartMsgItems() {
  modalCartBodyEmpty.classList.add("d-none");
  modalCartBodyFilled.classList.remove("d-none");
  modalCartFooter.classList.remove("d-none");
  shoppingCartIcon.classList.add("filled");
}

function showCartMsgEmpty() {
  modalCartBodyEmpty.classList.remove("d-none");
  modalCartBodyFilled.classList.add("d-none");
  modalCartFooter.classList.add("d-none");
  shoppingCartIcon.classList.remove("filled");
}

function handleOrderCount(event) {
  let currentElement = event.target;
  let currentCount = parseInt(currentOrderCount.textContent);

  if (event.target.tagName === "IMG") {
    currentElement = currentElement.parentElement;
  }
  if (currentElement.value === "raise") {
    currentCount++;
  } else {
    if (currentCount > 1) {
      currentCount--;
    }
  }
  currentOrderCount.textContent = currentCount.toString();
}

function init() {
  btnRaiseOrderCount.addEventListener("click", handleOrderCount);
  btnReduceOrderCount.addEventListener("click", handleOrderCount);
  btnAddToCart.addEventListener("click", addItemToCart);
  btnCartRemoveItem.addEventListener("click", cartRemoveItem);

  imgThumbContainers.forEach((button) => {
    button.addEventListener("click", switchProductMainImage);
  });
}

window.onload = init();
