let items = [];

function addItem() {
    const name = document.getElementById("itemName").value;
    const price = parseFloat(document.getElementById("itemPrice").value);

    if (name === "" || isNaN(price) || price <= 0) {
        alert("Masukkan nama dan harga barang yang valid.");
        return;
    }

    items.push({ name, price });

    document.getElementById("itemName").value = "";
    document.getElementById("itemPrice").value = "";

    renderItems();
    calculateTotal();
}

function removeItem(index) {
    items.splice(index, 1);

    renderItems();
    calculateTotal();
}

function renderItems() {
    const itemList = document.getElementById("itemList");
    itemList.innerHTML = "";

    items.forEach((item, index) => {
        itemList.innerHTML += `
            <div class="item">
                <span class="item-name">${item.name}</span>
                <span class="item-price">Rp ${item.price.toLocaleString()}</span>
                <button onclick="removeItem(${index})">Hapus</button>
            </div>
        `;
    });
}

function calculateTotal() {
    let subtotal = items.reduce((sum, item) => sum + item.price, 0);
    let discount = 0;

    if (subtotal > 2000000) {
        discount = subtotal * 0.15;
    } else if (subtotal > 1000000) {
        discount = subtotal * 0.1;
    }

    if (items.length > 5) {
        discount += subtotal * 0.05;
    }

    const total = subtotal - discount;

    document.getElementById("subtotal").textContent = `Subtotal: Rp ${subtotal.toLocaleString()}`;
    document.getElementById("discount").textContent = `Diskon: Rp ${discount.toLocaleString()}`;
    document.getElementById("total").textContent = `Total Akhir: Rp ${total.toLocaleString()}`;
}
