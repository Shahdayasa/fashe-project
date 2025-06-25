function updateCartIcon(){
const cart=JSON.parse(localStorage.getItem('cart')) || [];
const cartCount =cart.reduce((sum,item)=>sum + item.quantity, 0);
const cartSpan=document.querySelector('.cart');
if(cartSpan){
    cartSpan.textContent = cartCount;
}
}
function loadCart(){
const cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartContainer = document.getElementById('cart-items');
const totalElements = document.getElementById('total-items');
const totalPrices = document.getElementById('total-price');
const emptyCart = document.getElementById('empty-cart'); 
if(!cartContainer || !totalElements || !totalPrices) return;
cartContainer.innerHTML ='';
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
    <button class="btn btn-sm btn-outline-secondary  less" data-index="${index}">-</button>
    <input type="number" class="form-control text-center quantity" data-index="${index}" value="${item.quantity}" min="1">
<button class="btn btn-sm btn-outline-secondary  more" data-index="${index}">+</button>
</div>
</td>
<td>$${itemTotal.toFixed(2)}</td>
<td><button class="btn btn-sm btn-outline-secondary  remove " data-index="${index}">Remove</button></td>
</tr>
`;
});
totalElements.textContent=totalItems;
totalPrices.textContent=totalPrice.toFixed(2);
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
        
                    alert('Added to cart successfully!')
                
            });
        });
        
        loadCart();
        updateCartIcon();
    });


document.addEventListener('click' , function(e) {
const cart = JSON.parse(localStorage.getItem('cart')) || [];
if (e.target.classList.contains('less')){
    const index = parseInt(e.target.dataset.index);
    if(cart[index].quantity > 1){
      cart[index].quantity -=1;
}
localStorage.setItem('cart' , JSON.stringify(cart));
loadCart();
updateCartIcon();
}
if (e.target.classList.contains('more')){
     const index = parseInt(e.target.dataset.index);
      cart[index].quantity +=1;
 localStorage.setItem('cart' , JSON.stringify(cart));
loadCart();
updateCartIcon();
}
 if (e.target.classList.contains('remove')){
     const index = parseInt(e.target.dataset.index);
      cart.splice(index,1)
 localStorage.setItem('cart' , JSON.stringify(cart));
loadCart();
updateCartIcon();
 
  alert('Added to cart successfully!')
               
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
    let  new_quantity = parseInt(e.target.value);
    if(isNaN(new_quantity) || new_quantity < 1) new_quantity = 1;
    const cart=JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity = new_quantity;
    localStorage.setItem('cart',JSON.stringify(cart))
    loadCart();
         updateCartIcon();

}

});


