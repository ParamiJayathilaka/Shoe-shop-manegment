function loadCustomers() {
    const accessToken = localStorage.getItem('accessToken');

    $.ajax({
        url: 'http://localhost:8080/customer/getAllCustomers',
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function(response) {
            const customers = response;
            const customerSelect = $('#CustomerId');

            customers.forEach(customer => {
                customerSelect.append(new Option(customer.code));
            });
        },
        error: function(xhr, status, error) {
            console.error(error);
            alert('Failed to retrieve customer information. Please try again.');
        }
    });
}

function setCustomerName() {
    const id = document.getElementById('CustomerId').value;
    const customerNameInput = document.getElementById('customerName');
    customerNameInput.value = "Customer not found";
    const accessToken = localStorage.getItem('accessToken');

    $.ajax({
        url: `http://localhost:8080/customer/searchName/${id}`,
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function(response) {
            const customer = response;
            console.log(customer);

            if (customer && customer.name) {
                customerNameInput.value = customer.name;
            } else {
                customerNameInput.value = "Customer not found";
            }
        },
        error: function(xhr, status, error) {
            console.error(error);
            alert("Failed to retrieve customer information. Please try again.");
        }
    });
}

function loadItem() {

    const accessToken = localStorage.getItem('accessToken');

    $.ajax({
        url: 'http://localhost:8080/item/getAllItem',
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function(response) {
            const items = response;
            const customerSelect = $('#ItemId');

            items.forEach(item => {
                customerSelect.append(new Option(item.itemCode));
            });
        },
        error: function(xhr, status, error) {
            console.error(error);
            alert('Failed to retrieve item information. Please try again.');
        }
    });
}
loadItem();

function setItemName() {
    const id = document.getElementById('ItemId').value;
    const itemNameInput = document.getElementById('itemName');
    const itemPriceInput = document.getElementById('unitPrice');

    itemNameInput.value = "Item not found";
    itemPriceInput.value = "Unit price not found";

    const accessToken = localStorage.getItem('accessToken');

    $.ajax({
        url: `http://localhost:8080/item/searchName/${id}`,
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function(response) {
            const item = response;
            console.log(item);

            if (item && item.itemDesc) {
                itemNameInput.value = item.itemDesc;
                itemPriceInput.value = item.unitPriceSale;
            } else {
                itemNameInput.value = "Item not found";
            }
        },
        error: function(xhr, status, error) {
            console.error(error);
            alert("Failed to retrieve item information. Please try again.");
        }
    });
}

loadCustomers();

function addToCart() {
    const itemCode = $("#ItemId").val();
    const itemName = $("#itemName").val();
    const itemSize = $("#Size").val();
    const unitPrice = parseFloat($("#unitPrice").val());
    const buyingQty = parseInt($("#quantity").val());

    if (isNaN(unitPrice) || isNaN(buyingQty) || buyingQty <= 0) {
        alert("Invalid item price or quantity.");
        return;
    }

    const total = unitPrice * buyingQty;

    let found = false;

    $("#tbody-orderCart tr").each(function() {
        const rowItemCode = $(this).find("td:eq(0)").text();
        const rowItemSize = $(this).find("td:eq(2)").text();

        if (itemCode === rowItemCode && itemSize === rowItemSize) {
            found = true;
            const currentQty = parseInt($(this).find("td:eq(4)").text());
            const newQty = currentQty + buyingQty;
            const newTotal = unitPrice * newQty;

            $(this).find("td:eq(4)").text(newQty);
            $(this).find("td:eq(5)").text(newTotal.toFixed(2));
            calculateTotal();
        }
    });

    if (!found) {
        const newRow = `
          <tr>
            <td>${itemCode}</td>
            <td>${itemName}</td>
            <td>${itemSize}</td>
            <td>${unitPrice.toFixed(2)}</td>
            <td>${buyingQty}</td>
            <td>${total.toFixed(2)}</td>
          </tr>
        `;
        $("#tbody-orderCart").append(newRow);
        calculateTotal();
    }
}

function calculateTotal() {
    let total = 0;
    $("#tbody-orderCart tr").each(function() {
        const rowTotal = parseFloat($(this).find("td:eq(5)").text());
        total += rowTotal;
    });
    $("#totalAmount").text(total.toFixed(2));
}

function calculateBalance() {
    const totalAmount = parseFloat($("#totalAmount").text());
    const cash = parseFloat($("#cash").val());
    const balance = cash - totalAmount;
    $("#balance").text(balance.toFixed(2));
}

///plase order======================================

$(document).ready(function() {
    $("form").submit(function(event) {
        event.preventDefault();

        const orderDetails = [];
        $("#tbody-orderCart tr").each(function() {

            const order_id= $("#orderId").val();
            const itemCode = $(this).find("td:eq(0)").text();
            const itemName = $(this).find("td:eq(1)").text();
            const size = $(this).find("td:eq(2)").text();
            const unitPrice = parseFloat($(this).find("td:eq(3)").text());
            const quantity = parseInt($(this).find("td:eq(4)").text());

            orderDetails.push({
                order_id:order_id,
                item_code: itemCode,
                itemName: itemName,
                unitPrice: unitPrice,
                itemQty: quantity,
                size: size
            });
        });

        const orderData = {
            orderId: document.getElementById('orderId').value,
            orderDate: new Date($("#orderDate").val()).toISOString(), // Ensure date is in ISO format
            totalPrice: parseFloat($("#totalAmount").text()), // Changed totalAmount to totalPrice
            addedPoints: parseInt($("#addedPoints").val()),
            paymentMethod: $("#PaymentMethord").val(), // Corrected the capitalization
            cashierName: $("#cashierName").val(),
            customer_id: $("#CustomerId").val(),
            customerName: $("#customerName").val(),
            orderDetailDTOList: orderDetails // Changed orderDetails to orderDetailDTOList
        };

        console.log(orderData);

        const accessToken = localStorage.getItem('accessToken');

        $.ajax({
            url: ' http://localhost:8080/order/save',
            type: 'POST',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            contentType: 'application/json',
            data: JSON.stringify(orderData),
            success: function(response) {
                alert("Order saved successfully!");
            },
            error: function(xhr, status, error) {
                console.error(error);
                alert("Failed to save order. Please try again.");
            }
        });
    });
});
