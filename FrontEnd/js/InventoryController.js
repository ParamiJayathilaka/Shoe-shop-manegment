generateInventoryID();

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
            // getAll();
        },
        error: function (xhr, status, error) {
            console.error('Error deleting inventory information:', error);
            alert('inventory Not Found!');
        }
    });
});


