function updateCartIcon(){
const cart=JSON.parse(localStorage.getItem('cart')) || [];
const cartCount =cart.reduce((sum,item)=>sum + item.quantity, 0);
const cartSpan=document.querySelector('#cart-count') || document.querySelector('.cart');
if(cartSpan){
    cartSpan.textContent = cartCount;
}
}
function loadCart(){
const cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartContainer = document.getElementById('cart-items');
const totalItemsEl = document.getElementById('total-items');
const totalPriceEl = document.getElementById('total-price');
const emptyCart = document.getElementById('empty-cart'); 
if(!cartContainer || !totalItemsEl || !totalPriceEl) return;
cartContainer.innerHTML = '';
let totalItems=0;
let totalPrice=0;
if (cart.length ==0 && emptyCart){
   emptyCart.style.display='block';
   return;
}else if (emptyCart){
    emptyCart.style.display='none';
}
cart.forEach((item,index) => {
    const itemTotal = item.price * item.quantity;
    totalItems += item.quantity;
    totalPrice += itemTotal;
cartContainer.innerHTML += `
        <tr>
<td><img src="${item.image}" width="60" height="60"></td>
<td>${item.name}</td>
<td>$${item.price.toFixed(2)}</td>
<td>
<div class="input-group">
    <button class="btn btn-sm btn-outline-secondary  decrease" data-index="${index}">-</button>
    <input type="number" class="form-control text-center quantity" data-index="${index}" value="${item.quantity}" min="1">
<button class="btn btn-sm btn-outline-secondary  increase" data-index="${index}">+</button>
</div>
</td>
<td>$${itemTotal.toFixed(2)}</td>
</tr>
`;
});
totalItemsEl.textContent=totalItems;
totalPriceEl.textContent=totalPrice.toFixed(2);
}
document.addEventListener('DOMContentLoaded',() => {
    const addToCartButtons=document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button=>{
            button.addEventListener('click',()=>{
                const name = button.getAttribute('data-name');
                const price=parseFloat(button.getAttribute('data-price'));
                const image=button.getAttribute('data-image');
                let cart=JSON.parse(localStorage.getItem('cart')) || [];
                const existing = cart.find(item => item.name === name);
                if(existing){
                    existing.quantity += 1;
                } else{
                    cart.push({name,price,image, quantity:1});
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartIcon();
                const notification = document.getElementById('cart-notification');
                if(notification){
                    notification.style.display='block';
                    setTimeout (() =>  (notification.style.display = 'none') ,2000);
                
                } else{
                    alert('Added to cart successfully')
                }
            });
        });
        
        loadCart();
        updateCartIcon();
    });


document.addEventListener('click' , function(e) {
const cart = JSON.parse(localStorage.getItem('cart')) || [];
if (e.target.classList.contains('decrease')){
    const index = parseInt(e.target.dataset.index);
    if(cart[index].quantity > 1){
      cart[index].quantity -=1;
}
localStorage.setItem('cart' , JSON.stringify(cart));
loadCart();
updateCartIcon();
}
if (e.target.classList.contains('increase')){
     const index = parseInt(e.target.dataset.index);
      cart[index].quantity +=1;
 localStorage.setItem('cart' , JSON.stringify(cart));
loadCart();
updateCartIcon();
}
if(e.target.id === 'clear-cart'){
    localStorage.removeItem('cart');
    loadCart();
     updateCartIcon();
}
});
document.addEventListener('input',function(e){
    if(e.target.classList.contains('quantity')){
        const index = parseInt(e.target.dataset.index);
    let  newQty = parseInt(e.target.value);
    if(isNaN(newQty) || newQty < 1) newQty = 1;
    const cart=JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity = newQty;
    localStorage.setItem('cart',JSON.stringify(cart))
    loadCart();
         updateCartIcon();

}

});


