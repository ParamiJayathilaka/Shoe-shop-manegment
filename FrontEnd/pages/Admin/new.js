
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

