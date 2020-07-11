'use strict';
//Взял за основу интернет-магазин из прошлого курса


let cart;

class Cart {
    constructor (element) {
         this.element = element;
         this.products = {};
         this.updateTotal();
    }

    updateTotal() {
        this.totalPrice = 0;
        this.totalCount = 0;
        for (let key in this.products) {
            this.totalPrice += this.products[key]['price'] * this.products[key]['count']; 
            this.totalCount += this.products[key]['count'];  
        }
        
        this.element.querySelector('span.cart_count').innerText = this.totalCount;
        this.element.querySelector('.dropdown__cart__total-price').innerText = '$' + this.totalPrice;

    }
    
    deleteInCart(id) {
        delete this.products[id];
        let delEl = this.element.querySelector('.dropdown__cart__product[data-id="'+id+'"]');
        delEl.remove();
        this.updateTotal();

    }

    addToCart(id, name, price, img) {
          if (this.products[id]) {
              this.products[id].count = this.products[id].count + 1; 
              this.element.querySelector('.dropdown__cart__product[data-id="'+id+'"] .dropdown__cart__product__price').innerHTML = 
                  this.products[id].count + '<span> X</span>$' +price;
          } else {
               this.products[id] = {'name': name,
                                   'count': 1,
                                   'price': price};  
                
               this.element.querySelector(".dropdown__cart__products").insertAdjacentHTML('beforeend',
                  `<div class="dropdown__cart__product" data-id="${id}" data-name="${name}">
                     <a href="#"><img class="dropdown__cart__product__img" src="${img}" alt="Rebox Zaine"></a>
                     <div class="dropdown__cart__product__content">
                         <a href="#" class="dropdown__cart__product__name">Rebox Zane</a>
                         <div class="rating_container rating_container12"></div>
                         <div class="dropdown__cart__product__price">1<span> X</span> $${price}</div>
                     </div>
                     <a href="#" class="dropdown__cart__product__del"></a>
                   </div>`);        
                   let delBtn = this.element.querySelector('.dropdown__cart__product[data-id="'+id+'"] .dropdown__cart__product__del');  
                   delBtn.addEventListener('click', delInCart);
          }
          
          this.updateTotal();

    }

}

function delInCart(event) {
    event.target.parentElement
    let delEl = event.target.parentElement;
    if (confirm('Вы уверены, что хотите удалить товар "' + delEl.attributes['data-name'].value + '" из корзины?')) {
        cart.deleteInCart(delEl.attributes['data-id'].value);
    }
}

function clickAddToCart(event) {
    let currentEl = event.target;
    let productEl;
    while (currentEl && currentEl.tagName != 'BODY') {
         if (currentEl.classList.contains("product")) {
             productEl = currentEl;
             break;
         } 
         currentEl = currentEl.parentElement;
    } 
    if (productEl) {
        cart.addToCart(productEl.attributes["data-id"].value,
            productEl.attributes["data-name"].value,
            productEl.attributes["data-price"].value,
            productEl.querySelector("img.product__img").attributes["src"].value);
    }
    event.preventDefault();
}

function init() {
    const cartEl = document.querySelector('.header__right .drop');
    if (cartEl) {
        cart = new Cart(cartEl);
        const buttons = document.querySelectorAll('.button__add-to-cart');
        buttons.forEach(element => {
           element.addEventListener('click', clickAddToCart); 
        });
    }    
}

document.addEventListener('DOMContentLoaded', init);