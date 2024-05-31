$(document).ready(function () {
    generateInventoryID();
    getAll();

    function generateInventoryID() {
        $("#txtItemCode").val("I00-001");

        const accessToken = localStorage.getItem('accessToken');

        $.ajax({
            url: "http://localhost:8080/inventory/inventoryIdGenerate",
            method: "GET",

            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
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
            itemDescription:itemDesc,
            itemPicture:itemPicture,
            category:category,
            size6:4,
            size8:4,
            size10:4,
            size11:4,
            supCode:supplierCode,
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
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            },
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
            supCode:supplierCode,
            supplierName:supplierName,
            unitPriceSale:unitPriceSale,
            unitPriceBuy:unitPriceBuy,
            expectedProfit:expectedProfit,
            profitMargin:profitMargin,
            Status:Status

        }
        var accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: 'http://localhost:8080/inventory/update',
            type: 'PATCH',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
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

        var accessToken = localStorage.getItem('accessToken');

        $.ajax({
            url: 'http://localhost:8080/inventory/' + itemCode,
            type: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
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
        var accessToken = localStorage.getItem('accessToken');

        $.ajax({
            url: "http://localhost:8080/inventory/getAllInventory",
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
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


///////validation ////


$("#txtItemCode").focus();
const regExItemID = /^(I00-)[0-9]{3,4}$/;
const regExItemName = /^[A-z ]{3,20}$/;
// const regExItemUnitPriceSale =  /^[0-9]{1,}$/;
// const regExItemUnitPriceBuy =/^[0-9]{2,}([.][0-9]{2})?$/;
// const regExItemExpectProfit = /^[0-9]{2,}([.][0-9]{2})?$/;
// const regExItemProfitMargin = /^[0-9]{2,}([.][0-9]{2})?$/;
const regExItemStatus =/^[A-z ]{3,20}$/;

let itemValidations = [];
itemValidations.push({
    reg: regExItemID, field: $('#txtItemCode'), error: 'employee ID Pattern is Wrong : E00-001'
});
itemValidations.push({
    reg: regExItemName, field: $('#txtItemDesc'), error: 'employee Name Pattern is Wrong : A-z 3-20'
});
// itemValidations.push({
//     reg: regExItemUnitPriceSale, field: $('#txtItemUnitPriceSale'), error: 'employee Point is Wrong : Enter Number'
// });
// itemValidations.push({
//     reg: regExItemUnitPriceBuy, field: $('#txtItemUnitPriceBuy'), error: 'employee Address is Wrong : Enter address'
// });
// itemValidations.push({
//     reg: regExItemExpectProfit, field: $('#txtItemExpectedProfit'), error: 'employee Address is Wrong : Enter address'
// });
// itemValidations.push({
//     reg: regExItemProfitMargin, field: $('#txtItemProfitMargin'), error: 'employee Address is Wrong : Enter address'
// });
itemValidations.push({
    reg: regExItemStatus, field: $('#txtItemStatus'), error: 'employee Address is Wrong : Enter address'
});

//#txtItemCode,#txtItemDesc,#txtItemUnitPriceSale,#txtItemUnitPriceBuy,#txtItemExpectedProfit,#txtItemProfitMargin,#txtItemStatus

$("#txtItemCode,#txtItemDesc,#txtItemStatus").on('keydown', function (event) {
    if (event.key === "Tab") {
        event.preventDefault();
    }
});

$("#txtItemCode,#txtItemDesc,#txtItemStatus").on('keyup', function (event) {
    checkValidity(itemValidations);
});

$("#txtItemCode,#txtItemDesc,#txtItemStatus").on('blur', function (event) {
    checkValidity(itemValidations);
});

$("#txtItemCode").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExItemID, $("#txtItemCode"))) {
        $("#txtItemDesc").focus();
    } else {
        focusText($("#txtItemCode"));
    }
});

$("#txtItemDesc").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExItemName, $("#txtItemDesc"))) {
        focusText($("#txtItemUnitPriceSale"));
    }
});
//
// $("#txtItemUnitPriceSale").on('keydown', function (event) {
//     if (event.key === "Enter" && check(regExItemUnitPriceSale, $("#txtItemUnitPriceSale"))) {
//         focusText($("#txtItemUnitPriceBuy"));
//     }
// });
//
// $("#txtItemUnitPriceBuy").on('keydown', function (event) {
//     if (event.key === "Enter" && check(regExItemUnitPriceBuy, $("#txtItemUnitPriceBuy"))) {
//         focusText($("#txtItemExpectedProfit"));
//     }
// });
//
// $("#txtItemExpectedProfit").on('keydown', function (event) {
//     if (event.key === "Enter" && check(regExItemExpectProfit, $("#txtItemExpectedProfit"))) {
//         focusText($("#txtItemProfitMargin"));
//     }
// });
//
// $("#txtItemProfitMargin").on('keydown', function (event) {
//     if (event.key === "Enter" && check(regExItemProfitMargin, $("#txtItemProfitMargin"))) {
//         focusText($("#txtItemStatus"));
//     }
// });


$("#txtItemStatus").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExItemStatus, $("#txtItemStatus"))) {
        if (event.which === 13) {
            $('#btnSaveItem').focus();
        }
    }
});

function setButtonState(value) {
    if (value > 0) {
        $("#btnSaveItem").attr('disabled', true);
        $("#btnUpdateItem").attr('disabled', true);
        $("#btnDeleteItem").attr('disabled', true);
    } else {
        $("#btnSaveItem").attr('disabled', false);
        $("#btnUpdateItem").attr('disabled', false);
        $("#btnDeleteItem").attr('disabled',false);
    }
}



//
// $("#txtItemCode").focus();
// const regExItemID = /^(I00-)[0-9]{3,4}$/;
// const regExItemName = /^[A-z ]{3,20}$/;
// const regExItemUnitPriceSale = /^[A-z ]{3,20}$/;
// const regExItemUnitPriceBuy = /^[A-z ]{3,20}$/;
// const regExItemExpectProfit = /^[A-z ]{3,20}$/;
// const regExItemProfitMargin = /^[A-z0-9/ ]{4,30}$/;
// const regExItemStatus =/^[A-z ]{3,20}$/;
//
// let itemValidations = [];
// itemValidations.push({
//     reg: regExItemID, field: $('#txtItemCode'), error: 'employee ID Pattern is Wrong : E00-001'
// });
// itemValidations.push({
//     reg: regExItemName, field: $('#txtItemDesc'), error: 'employee Name Pattern is Wrong : A-z 3-20'
// });
// itemValidations.push({
//     reg: regExItemUnitPriceSale, field: $('#txtItemUnitPriceSale'), error: 'employee Point is Wrong : Enter Number'
// });
// itemValidations.push({
//     reg: regExItemUnitPriceBuy, field: $('#txtItemUnitPriceBuy'), error: 'employee Address is Wrong : Enter address'
// });
// itemValidations.push({
//     reg: regExItemExpectProfit, field: $('#txtItemExpectedProfit'), error: 'employee Address is Wrong : Enter address'
// });
// itemValidations.push({
//     reg: regExItemProfitMargin, field: $('#txtItemProfitMargin'), error: 'employee Address is Wrong : Enter address'
// });
// itemValidations.push({
//     reg: regExItemStatus, field: $('#txtItemStatus'), error: 'employee Address is Wrong : Enter address'
// });
//
//
//
// $("#txtItemCode,#txtItemDesc,#txtItemUnitPriceSale,#txtItemUnitPriceBuy,#txtItemExpectedProfit,#txtItemProfitMargin,#txtItemStatus").on('keydown', function (event) {
//     if (event.key === "Tab") {
//         event.preventDefault();
//     }
// });
//
// $("#txtItemCode,#txtItemDesc,#txtItemUnitPriceSale,#txtItemUnitPriceBuy,#txtItemExpectedProfit,#txtItemProfitMargin,#txtItemStatus").on('keyup', function (event) {
//     checkValidity(itemValidations);
// });
//
// $("#txtItemCode,#txtItemDesc,#txtItemUnitPriceSale,#txtItemUnitPriceBuy,#txtItemExpectedProfit,#txtItemProfitMargin,#txtItemStatus").on('blur', function (event) {
//     checkValidity(itemValidations);
// });
//
// $("#txtItemCode").on('keydown', function (event) {
//     if (event.key === "Enter" && check(regExItemID, $("#txtItemCode"))) {
//         $("#txtItemDesc").focus();
//     } else {
//         focusText($("#txtItemCode"));
//     }
// });
//
// $("#txtItemDesc").on('keydown', function (event) {
//     if (event.key === "Enter" && check(regExItemName, $("#txtItemDesc"))) {
//         focusText($("#txtItemUnitPriceSale"));
//     }
// });
//
// $("#txtItemUnitPriceSale").on('keydown', function (event) {
//     if (event.key === "Enter" && check(regExItemUnitPriceSale, $("#txtItemUnitPriceSale"))) {
//         focusText($("#txtItemUnitPriceBuy"));
//     }
// });
//
// $("#txtItemUnitPriceBuy").on('keydown', function (event) {
//     if (event.key === "Enter" && check(regExItemUnitPriceBuy, $("#txtItemUnitPriceBuy"))) {
//         focusText($("#txtItemExpectedProfit"));
//     }
// });
//
// $("#txtItemExpectedProfit").on('keydown', function (event) {
//     if (event.key === "Enter" && check(regExItemExpectProfit, $("#txtItemExpectedProfit"))) {
//         focusText($("#txtItemProfitMargin"));
//     }
// });
//
// $("#txtItemProfitMargin").on('keydown', function (event) {
//     if (event.key === "Enter" && check(regExItemProfitMargin, $("#txtItemProfitMargin"))) {
//         focusText($("#txtItemStatus"));
//     }
// });
//
//
// $("#txtItemStatus").on('keydown', function (event) {
//     if (event.key === "Enter" && check(regExItemStatus, $("#txtItemStatus"))) {
//         if (event.which === 13) {
//             $('#btnSaveItem').focus();
//         }
//     }
// });
//
// function setButtonState(value) {
//     if (value > 0) {
//         $("#btnSaveItem").attr('disabled', true);
//         $("#btnUpdateItem").attr('disabled', true);
//         $("#btnDeleteItem").attr('disabled', true);
//     } else {
//         $("#btnSaveItem").attr('disabled', false);
//         $("#btnUpdateItem").attr('disabled', false);
//         $("#btnDeleteItem").attr('disabled',false);
//     }
// }
//
//
//
//
//
//
//
//
//
//
//
