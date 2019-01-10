// Jeffrey Toppings
// 11137038
// jtt607

// Script that uses localStorage to populate the shopping Cart

// function that resets the quantity of all items in cart to 0
function clearCart() {
    var itemsInShop = ["French Roast", "Trapper Creek", "Aeropress",
        "Bodum French Press", "Chemist Brew Kit"];
    for (var i=0; i < itemsInShop.length; i++) {
        localStorage.setItem(itemsInShop[i], 0);
    }
}

// function to increase the quantity of an item in the cart by 1
function addToCart(itemName) {
    var currentQuantity = parseInt(localStorage.getItem(itemName));
    currentQuantity += 1;
    localStorage.setItem(itemName, currentQuantity);
    updateHeaderTotal();
    alert("You have added " + itemName + " to the cart.");
}

// function to reset the quantity of an item in the cart to 0
function removeFromCart(itemName) {
    localStorage.setItem(itemName, 0);
    updateHeaderTotal();
    alert("Removed " + itemName + " from the cart.");
}

// function to obtain total number of items currently in Cart
function itemsInCart() {
    var total = 0;
    var itemsInShop = ["French Roast", "Trapper Creek", "Aeropress",
        "Bodum French Press", "Chemist Brew Kit"];
    for (var i=0; i < itemsInShop.length; i++) {
        total += parseInt(localStorage.getItem(itemsInShop[i]));
    }
    return total;
}

// function to update items in cart in Header
function updateHeaderTotal() {
    var totalHeader = document.getElementById("cart-items");
    var total = itemsInCart();
    total = parseInt(total);
    totalHeader.innerHTML = total;
}

// function to update the Cart to include items in localStorage
function updateCart() {
    // alert("Entering updateCart()");
    var table = document.getElementById("cart-table");
    var currentRow = 1;
    var itemsInShop = ["French Roast", "Trapper Creek", "Aeropress",
        "Bodum French Press", "Chemist Brew Kit"];
    var prices = [15, 15, 30, 36, 215];
    var subtotal = 0; // before taxes
    var total = 10; // after taxes

    // loop through localStorage
    for (var i=0; i < itemsInShop.length; i++) {
        var current = localStorage.getItem(itemsInShop[i]);
        if (current != "0") {
            var row = table.insertRow(currentRow);
            row.className = "row" + i;
            var item = row.insertCell(0);
            item.className = "items";
            item.id = "item" + i;
            var quantity = row.insertCell(1);
            quantity.className = "quantity";
            quantity.id = "quantity" + i;
            var cost = row.insertCell(2);
            cost.className = "price";
            cost.id = "cost" + i;
            var remove = row.insertCell(3);
            remove.className = "remove-column";
            remove.id = "remove-column" + i;

            // set HTML values
            item.innerHTML = itemsInShop[i];
            quantity.innerHTML = current;
            cost.innerHTML = "$" + (prices[i] * parseInt(current));
            remove.innerHTML = '<img src="./images/removebuttonsmall.png" onclick="removeSomething(' + i + ')"></img>';
            // i represents the code for item (0 = fr, 1=tc, 2=a, 3=bfp, 4=cbk)
            total += prices[i] * parseInt(current);
            subtotal += prices[i] * parseInt(current);
            currentRow++;
        }
    }

    // update subtotal and total
    var subtotalAmount = document.getElementById("subtotal-amount");
    var totalAmount = document.getElementById("total-amount");
    subtotalAmount.innerHTML = "$" + subtotal;
    if (subtotal == 0) {
        total = 0;
    }
    totalAmount.innerHTML = "$" + total;
}

function removeSomething(itemCode) {
    // reset item in localStorage
    var itemToReset = document.getElementById("item" + itemCode).innerHTML;
    localStorage.setItem(itemToReset, 0);

    // remove row from table by updating table to match localStorage
    var table = document.getElementById("cart-table");
    table.innerHTML =   "<tr id=\"cart-table-top\"><th class=\"items\">Item</th><th class=\"quantity\">Quantity</th><th class=\"price\">Total</th><th class=\"remove-heading\"></th></tr><tr class=\"cart-table-bottom-underline\"><td colspan=\"3\"></td><td></td></tr>"
    updateCart();
    updateHeaderTotal();
}

function completePurchase() {
    clearCart();
    updateCart();
    alert("Success! Thank you for making a purchase from No Milk Coffee Shop.");
}
