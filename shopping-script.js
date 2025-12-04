let cart = {};
const TAX_RATE = 0.06;
const SHIPPING = 5.00;

const cartItemsBox = document.getElementById("cart-items");

document.querySelectorAll(".add").forEach(btn => {
  btn.onclick = function() {
    const box = btn.parentElement;
    const id = box.dataset.id;
    const name = box.dataset.name;
    const price = parseFloat(box.dataset.price);

    if(!cart[id]) cart[id] = {name, price, qty:1};
    else cart[id].qty++;

    updateCart();
  }
});

function updateCart() {
  cartItemsBox.innerHTML = "";
  let subtotal = 0;

  for(let id in cart) {
    const item = cart[id];
    subtotal += item.price * item.qty;

    const row = document.createElement("div");
    row.className = "cart-item";

    row.innerHTML = `
      <img src="https://via.placeholder.com/80x80?text=${item.name.charAt(item.name.length-1)}">
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <p>$${item.price.toFixed(2)} each</p>
        <div class="qty-controls">
          <button onclick="changeQty('${id}',-1)">-</button>
          <span>${item.qty}</span>
          <button onclick="changeQty('${id}',1)">+</button>
          <button onclick="removeItem('${id}')">Remove</button>
        </div>
      </div>
      <div>$${(item.price*item.qty).toFixed(2)}</div>
    `;
    cartItemsBox.appendChild(row);
  }

  document.getElementById("subtotal").textContent = "$" + subtotal.toFixed(2);
  const tax = subtotal * TAX_RATE;
  document.getElementById("tax").textContent = "$" + tax.toFixed(2);
  const total = subtotal + tax + SHIPPING;
  document.getElementById("total").textContent = "$" + total.toFixed(2);
}

function changeQty(id, amount) {
  if(cart[id]) {
    cart[id].qty += amount;
    if(cart[id].qty <= 0) delete cart[id];
    updateCart();
  }
}

function removeItem(id) {
  delete cart[id];
  updateCart();
}

document.getElementById("checkout").onclick = function() {
  if(Object.keys(cart).length === 0) {
    alert("Cart is empty!");
    return;
  }
  const subtotal = Object.values(cart).reduce((sum,i)=>sum+i.price*i.qty,0);
  const tax = subtotal*TAX_RATE;
  const total = subtotal + tax + SHIPPING;
  alert(`Order Summary:\nSubtotal: $${subtotal.toFixed(2)}\nTax: $${tax.toFixed(2)}\nShipping: $${SHIPPING.toFixed(2)}\nTotal: $${total.toFixed(2)}\n\nThank you for your purchase!`);
  cart = {};
  updateCart();
}