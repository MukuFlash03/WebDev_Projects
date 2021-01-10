// https://code-boxx.com/simple-vanilla-javascript-shopping-cart/#sec-download


var cart = {

    // A. objects/properties

    prodList: null, // HTML cart-products
    currCart: null, // HTML cart-items
    currItems: {}, // Current items in cart ->  {product id: qty}


    // B. JS Window.localstorage use to store cart details

    // save current cart
    save: function() {
        localStorage.setItem("cart", JSON.stringify(cart.currItems));
    },

    // load cart
    load: function() {
        cart.currItems = localStorage.getItem("cart");
        if (cart.currItems === null) {
            cart.currItems = {};
        }
        else {
            cart.currItems = JSON.parse(cart.currItems)
        }
    },

    // empty cart
    empty: function() {
        if (confirm("Empty Cart?")) {
            cart.currItems = {};
            localStorage.removeItem("cart");
            cart.list();
        }
    },


    // C. Initialze Shopping Cart
    init: function() {

        //get html elements
        cart.prodList = document.getElementById("cart-products");
        cart.currCart = document.getElementById("cart-items");

        // draw products list
        cart.prodList.innerHTML = "";
        let p, item, part;
        for (let id in products) {

            // wrapper
            p = products[id];
            item = document.createElement("div");
            item.className = "p-item";
            cart.prodList.appendChild(item);

            // product image
            part = document.createElement("img");
            part.src = "images/" + p.img;
            part.className = "p-img";
            item.appendChild(part);

            // product name
            part = document.createElement("div");
            part.innerHTML = p.name;
            part.className = "p-name";
            item.appendChild(part);

            // product price
            part = document.createElement("div");
            part.innerHTML = '$' + p.price;
            part.className = "p-price";
            item.appendChild(part);

            // product description
            part = document.createElement("div");
            part.innerHTML = p.desc;
            part.className = "p-desc";
            item.appendChild(part);

            // add to cart
            part = document.createElement("input");
            part.type = "button";
            part.value = "Add to Cart";
            part.className = "cart p-add";
            // part.onclick = cart.add;
            part.addEventListener("click", cart.add)
            part.dataset.id = id;
            item.appendChild(part);
        }

        // load cart from previous session
        cart.load();

        // list current cart items
        cart.list();
    },

    // D. List current cart items
    list: function() {
        
        // reset
        cart.currCart.innerHTML = "";
        let item, part, pdt;
        let flag = true;
        for (let key in cart.currItems) {
            if (cart.currItems.hasOwnProperty(key)) {
                flag = false;
                break;
            }
        }

        // cart is empty
        if (flag) {
            item = document.createElement("div");
            item.innerHTML = "Cart is Empty!";
            cart.currCart.appendChild(item);
        }

        // cart is not empty -> list items
        else {
            let p, total = 0, subtotal = 0;
            for (let id in cart.currItems) {
                
                // item
                p = products[id];
                item = document.createElement("div");
                item.className = "c-item";
                cart.currCart.appendChild(item);

                // name
                part = document.createElement("div");
                part.innerHTML = p.name;
                part.className = "c-name";
                item.appendChild(part);

                // remove
                part = document.createElement("input");
                part.type = "button";
                part.value = "X";
                part.dataset.id = id;
                part.className = "c-del cart";
                part.addEventListener("click", cart.remove)
                item.appendChild(part);

                // quantity
                part = document.createElement("input");
                part.type = "number";
                part.value = cart.currItems[id];
                part.dataset.id = id;
                part.className = "c-qty";
                part.addEventListener("change", cart.change)
                item.appendChild(part);

                // subtotal
                subtotal = cart.currItems[id] * p.price;
                total += subtotal;
            }

            // empty buttons
            item = document.createElement("input");
            item.type = "button";
            item.value = "Empty";
            item.addEventListener('click', cart.empty);
            item.className = 'c-empty cart';
            cart.currCart.appendChild(item);

            // checkout buttons
            item = document.createElement("input");
            item.type = "button";
            item.value = "Checkout - " + '$' + total;
            item.addEventListener('click', cart.checkout);
            item.className = 'c-checkout cart';
            cart.currCart.appendChild(item);
        }
    },

    // E. Add item to cart
    add: function() {
        if (cart.currItems[this.dataset.id] === undefined) {
            cart.currItems[this.dataset.id] = 1;
        }
        else {
            cart.currItems[this.dataset.id]++
        }
        cart.save();
        cart.list();
    },

    // F. Change quantity
    change: function() {
        if (this.value === 0) {
            delete cart.currItems[this.dataset.id];
        }
        else {
            cart.currItems[this.dataset.id] = this.value;
        }
        cart.save();
        cart.list();
    },

    // G. Remove item from cart
    remove:  function() {
        delete cart.currItems[this.dataset.id];
        cart.save();
        cart.list();
    },

    // H. Checkout
    checkout: function() {
        /*
         SEND DATA TO SERVER
         CHECKS
         SEND AN EMAIL
         RECORD TO DATABASE
         PAYMENT
         WHATEVER IS REQUIRED
        */

        //  alert("Order successful!")
        swal("Order successful!", "Your order has been placed successfully!", "success");


    /* AJAX to handle server and database backend
    var data = new FormData();
    data.append('cart', JSON.stringify(cart.items));
    data.append('products', JSON.stringify(cart.products));
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "SERVER-SCRIPT");
    xhr.onload = function(){ ... };
    xhr.send(data);
    */
    }
};
window.addEventListener("DOMContentLoaded", cart.init);