$(document).ready(function () {
    generateInventoryID();
    getAll();

    function generateInventoryID() {
        $("#txtItemCode").val("I00-001");
        $.ajax({
            url: "http://localhost:8080/inventory/inventoryIdGenerate",
            method: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (resp) {
                let id = resp.value;
                console.log("id: " + id);
                if (id) {
                    let tempId = parseInt(id.split("-")[1]) + 1;
                    let newId = "I00-" + tempId.toString().padStart(3, '0');
                    $("#txtItemCode").val(newId);
                }
            },
            error: function (ob, statusText, error) {
                console.error("Error generating inventory ID:", statusText, error);
            }
        });
    }

    /////////save///

    $('#btnSaveItem').click(function (){
        let itemCode = $('#txtItemCode').val();
        let itemDesc = $('#txtItemDesc').val();
        let itemPicture = $('#txtItemPicture').val();
        let category = $('#txtItemCategory').val();
        let size = $('#txtItemSize').val();
        let supplierCode = $('#txtItemSupplierCode').val();
        let supplierName = $('#txtItemSupplierName').val();
        let unitPriceSale = $('#txtItemUnitPriceSale').val();
        let unitPriceBuy = $('#txtItemUnitPriceBuy').val();
        let expectedProfit = $('#txtItemExpectedProfit').val();
        let profitMargin = $('#txtItemProfitMargin').val();
        let Status = $('#txtItemStatus').val();


        var inventory = {
            itemCode:itemCode,
            itemDesc:itemDesc,
            itemPicture:itemPicture,
            category:category,
            size:size,
            supplierCode:supplierCode,
            supplierName:supplierName,
            unitPriceSale:unitPriceSale,
            unitPriceBuy:unitPriceBuy,
            expectedProfit:expectedProfit,
            profitMargin:profitMargin,
            Status:Status

        }

        $.ajax({
            url: 'http://localhost:8080/inventory/save',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(inventory),
            success: function (response) {
                alert('inventory information saved successfully!');
                console.log(inventory);
                clearFields();
                getAll();
            },
            error: function (xhr, status, error) {
                console.error('Error saving inventory information:', error);
                alert('inventory Not Found!');
            }
        });
    })


//////update////////

    $('#btnUpdateItem').click(function (){
        let itemCode = $('#txtItemCode').val();
        let itemDesc = $('#txtItemDesc').val();
        let itemPicture = $('#txtItemPicture').val();
        let category = $('#txtItemCategory').val();
        let size = $('#txtItemSize').val();
        let supplierCode = $('#txtItemSupplierCode').val();
        let supplierName = $('#txtItemSupplierName').val();
        let unitPriceSale = $('#txtItemUnitPriceSale').val();
        let unitPriceBuy = $('#txtItemUnitPriceBuy').val();
        let expectedProfit = $('#txtItemExpectedProfit').val();
        let profitMargin = $('#txtItemProfitMargin').val();
        let Status = $('#txtItemStatus').val();

        var inventory = {
            itemCode:itemCode,
            itemDesc:itemDesc,
            itemPicture:itemPicture,
            category:category,
            size:size,
            supplierCode:supplierCode,
            supplierName:supplierName,
            unitPriceSale:unitPriceSale,
            unitPriceBuy:unitPriceBuy,
            expectedProfit:expectedProfit,
            profitMargin:profitMargin,
            Status:Status

        }

        $.ajax({
            url: 'http://localhost:8080/inventory/update',
            type: 'PATCH',
            contentType: 'application/json',
            data: JSON.stringify(inventory),
            success: function (response) {
                alert('inventory information update successfully!');
                console.log(inventory);
                clearFields();
                getAll();
            },
            error: function (xhr, status, error) {
                console.error('Error updating inventory information:', error);
                alert('inventory Not Found!');
            }
        });
    })

////delete///////
    $('#btnDeleteItem').click(function () {
        let itemCode = $('#txtItemCode').val();

        $.ajax({
            url: 'http://localhost:8080/inventory/' + itemCode,
            type: 'DELETE',
            success: function (response) {
                alert('inventory information deleted successfully!');
                console.log('Deleted inventory with code:', itemCode);
                clearFields();
                getAll();
            },
            error: function (xhr, status, error) {
                console.error('Error deleting inventory information:', error);
                alert('inventory Not Found!');
            }
        });
    });

    function getAll() {
        $('#itemTable tbody').empty();

        $.ajax({
            url: "http://localhost:8080/inventory/getAllInventory",
            method: "GET",
            success: function (resp) {
                for (const item of resp) {
                    let row = `<tr>
                                <td>${item.itemCode}</td>
                                <td>${item.itemDesc}</td>
                                <td>${item.itemPicture}</td>
                                <td>${item.category}</td>
                                <td>${item.size}</td>
                                <td>${item.supplierCode}</td>
                                <td>${item.supplierName}</td>
                                <td>${item.unitPriceSale}</td>
                                <td>${item.unitPriceBuy}</td>
                                <td>${item.expectedProfit}</td>
                                <td>${item.profitMargin}</td>
                                <td>${item.Status}</td>
                               
                                </tr>`;
                    $('#itemTable tbody').append(row);
                }
                bindClickEvents();
            },
            error: function (error) {
                console.log("Error: ", error);
            }
        });
    }

    function bindClickEvents() {
        $('#itemTable tbody>tr').click(function () {
            let itemCode = $(this).children(':nth-child(1)').text();
            let itemDesc = $(this).children(':nth-child(2)').text();
            let itemPicture = $(this).children(':nth-child(3)').text();
            let category = $(this).children(':nth-child(4)').text();
            let size = $(this).children(':nth-child(6)').text();
            let supplierCode = $(this).children(':nth-child(7)').text();
            let supplierName = $(this).children(':nth-child(8)').text();
            let unitPriceSale = $(this).children(':nth-child(6)').text();
            let unitPriceBuy = $(this).children(':nth-child(7)').text();
            let expectedProfit = $(this).children(':nth-child(8)').text();
            let profitMargin = $(this).children(':nth-child(9)').text();
            let Status = $(this).children(':nth-child(10)').text();

            $('#txtItemCode').val(itemCode);
            $('#txtItemDesc').val(itemDesc);
            $('#txtItemPicture').val(itemPicture);
            $('#txtItemCategory').val(category);
            $('#txtItemSize').val(size);
            $('#txtItemSupplierCode').val(supplierCode);
            $('#txtItemSupplierName').val(supplierName);
            $('#txtItemUnitPriceSale').val(unitPriceSale);
            $('#txtItemUnitPriceBuy').val(unitPriceBuy);
            $('#txtItemExpectedProfit').val(expectedProfit);
            $('#txtItemProfitMargin').val(profitMargin);
            $('#txtItemStatus').val(Status);

        });
    }

    function clearFields() {
        $('#txtItemCode').val(itemCode);
        $('#txtItemDesc').val(itemDesc);
        $('#txtItemPicture').val(itemPicture);
        $('#txtItemCategory').val(category);
        $('#txtItemSize').val(size);
        $('#txtItemSupplierCode').val(supplierCode);
        $('#txtItemSupplierName').val(supplierName);
        $('#txtItemUnitPriceSale').val(unitPriceSale);
        $('#txtItemUnitPriceBuy').val(unitPriceBuy);
        $('#txtItemExpectedProfit').val(expectedProfit);
        $('#txtItemProfitMargin').val(profitMargin);
        $('#txtItemStatus').val(Status);
    }
});








