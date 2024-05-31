$(document).ready(function () {
    // generateCustomerID();
    getAll();

    // function generateCustomerID() {
    //     $("#cusId").val("C00-001");
    //     performAuthenticatedRequest();
    //     const accessToken = localStorage.getItem('accessToken');
    //     $.ajax({
    //         url: "http://localhost:8080/customer/cusIdGenerate",
    //         method: "GET",
    //         headers: {
    //             'Authorization': 'Bearer ' + accessToken
    //         },
    //         contentType: "application/json",
    //         dataType: "json",
    //         success: function (resp) {
    //             let id = resp.value;
    //             console.log("id: " + id);
    //             if (id) {
    //                 let tempId = parseInt(id.split("-")[1]) + 1;
    //                 let newId = "C00-" + tempId.toString().padStart(3, '0');
    //                 $("#cusId").val(newId);
    //             }
    //         },
    //         error: function (ob, statusText, error) {
    //             console.error("Error generating customer ID:", statusText, error);
    //         }
    //     });
    // }

    ////////////save/////

    $('#btnSaveCustomer').click(function (){
        let code = $('#cusId').val();
        let name = $('#txtCusName').val();
        let email = $('#txtEmail').val();
        let gender = $('#txtGender').val();
        let contact = $('#txtContact').val();
        let dob = $('#txtDob').val();
        let addressLine1 = $('#txtAddress1').val();
        let addressLine2 = $('#txtAddress2').val();
        let addressLine3 = $('#txtAddress3').val();
        let addressLine4 = $('#txtAddress4').val();
        let addressLine5 = $('#txtAddress5').val();
        let addressLine6 = $('#txtAddress6').val();
        let loyaltyDate = $('#txtloyaltyDate').val();
        let loyaltyLevel = $('#txtloyaltyLevel').val();
        let loyaltyPoints = $('#txtloyaltyPoints').val();
        let recentPurchaseDate = $('#txtCusPurchaseDate').val();

        var customer = {
            code:code,
            name:name,
            email:email,
            gender:gender,
            contact:contact,
            dob:dob,
            addressLine1:addressLine1,
            addressLine2:addressLine2,
            addressLine3:addressLine3,
            addressLine4:addressLine4,
            addressLine5:addressLine5,
            addressLine6:addressLine6,
            loyaltyDate:loyaltyDate,
            loyaltyLevel:loyaltyLevel,
            loyaltyPoints:loyaltyPoints,
            recentPurchaseDate:recentPurchaseDate

        }

        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');

        $.ajax({
            url: 'http://localhost:8080/customer/save',
            type: 'POST',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            contentType: 'application/json',
            data: JSON.stringify(customer),
            success: function (response) {
                alert('Customer information saved successfully!');
                console.log(customer);
                clearFields();
                getAll();
            },
            error: function (xhr, status, error) {
                console.error('Error saving customer information:', error);
                alert('Customer Not Found!');
            }
        });
    })

////// update///

    $('#btnUpdateCustomer').click(function (){
        let code = $('#cusId').val();
        let name = $('#txtCusName').val();
        let email = $('#txtEmail').val();
        let gender = $('#txtGender').val();
        let contact = $('#txtContact').val();
        let dob = $('#txtDob').val();
        let addressLine1 = $('#txtAddress1').val();
        let addressLine2 = $('#txtAddress2').val();
        let addressLine3 = $('#txtAddress3').val();
        let addressLine4 = $('#txtAddress4').val();
        let addressLine5 = $('#txtAddress5').val();
        let addressLine6 = $('#txtAddress6').val();
        let loyaltyDate = $('#txtloyaltyDate').val();
        let loyaltyLevel = $('#txtloyaltyLevel').val();
        let loyaltyPoints = $('#txtloyaltyPoints').val();
        let recentPurchaseDate = $('#txtCusPurchaseDate').val();

        var customer = {
            code:code,
            name:name,
            email:email,
            gender:gender,
            contact:contact,
            dob:dob,
            addressLine1:addressLine1,
            addressLine2:addressLine2,
            addressLine3:addressLine3,
            addressLine4:addressLine4,
            addressLine5:addressLine5,
            addressLine6:addressLine6,
            loyaltyDate:loyaltyDate,
            loyaltyLevel:loyaltyLevel,
            loyaltyPoints:loyaltyPoints,
            recentPurchaseDate:recentPurchaseDate

        }

        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');

        $.ajax({
            url: 'http://localhost:8080/customer/update',
            type: 'PATCH',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            contentType: 'application/json',
            data: JSON.stringify(customer),
            success: function (response) {
                alert('Customer information update successfully!');
                console.log(customer);
                clearFields();
                getAll();
            },
            error: function (xhr, status, error) {
                console.error('Error updating customer information:', error);
                alert('Customer Not Found!');
            }
        });
    })

////delete///////
    $('#btnDeleteCustomer').click(function () {
        let code = $('#cusId').val();

        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');

        $.ajax({
            url: 'http://localhost:8080/customer/' + code,
            type: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function (response) {
                alert('Customer information deleted successfully!');
                console.log('Deleted customer with code:', code);
                clearFields();
                getAll();
            },
            error: function (xhr, status, error) {
                console.error('Error deleting customer information:', error);
                alert('Customer Not Found!');
            }
        });
    });


///getall//
    function getAll() {
        $('#customerTable tbody').empty();

        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');

        $.ajax({
            url: "http://localhost:8080/customer/getAllCustomers",
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function (resp) {
                for (const customer of resp) {
                    let row = `<tr>
                                   <td>${customer.code}</td>
                                <td>${customer.name}</td>
                                <td>${customer.email}</td>
                                <td>${customer.gender}</td>
                                <td>${customer.contact}</td>
                                <td>${customer.dob}</td>
                                <td>${customer.addressLine1}</td>
                                <td>${customer.addressLine2}</td>
                                <td>${customer.addressLine3}</td>
                                <td>${customer.addressLine4}</td>
                                <td>${customer.addressLine5}</td>
                                <td>${customer.addressLine6}</td>
                                <td>${customer.loyaltyDate}</td>
                                <td>${customer.loyaltyLevel}</td>
                                <td>${customer.loyaltyPoints}</td>
                                <td>${customer.recentPurchaseDate}</td>
                                </tr>`;
                    $('#customerTable tbody').append(row);
                }
                bindClickEvents();
            },
            error: function (error) {
                console.log("Error: ", error);
            }
        });
    }

    function bindClickEvents() {
        $('#customerTable tbody>tr').click(function () {
            let code = $(this).children(':nth-child(1)').text();
            let name = $(this).children(':nth-child(2)').text();
            let email = $(this).children(':nth-child(3)').text();
            let gender = $(this).children(':nth-child(4)').text();
            let contact = $(this).children(':nth-child(6)').text();
            let dob = $(this).children(':nth-child(7)').text();
            let addressLine1 = $(this).children(':nth-child(8)').text();
            let addressLine2 = $(this).children(':nth-child(6)').text();
            let addressLine3 = $(this).children(':nth-child(7)').text();
            let addressLine4 = $(this).children(':nth-child(8)').text();
            let addressLine5 = $(this).children(':nth-child(9)').text();
            let addressLine6 = $(this).children(':nth-child(10)').text();
            let loyaltyDate = $(this).children(':nth-child(11)').text();
            let loyaltyLevel = $(this).children(':nth-child(12)').text();
            let loyaltyPoints = $(this).children(':nth-child(13)').text();
            let recentPurchaseDate = $(this).children(':nth-child(14)').text();

            $('#cusId').val(code);
            $('#txtCusName').val(name);
            $('#txtEmail').val(email);
            $('#txtGender').val(gender);
            $('#txtContact').val(contact);
            $('#txtDob').val(dob);
            $('#txtAddress1').val(addressLine1);
            $('#txtAddress2').val(addressLine2);
            $('#txtAddress3').val(addressLine3);
            $('#txtAddress4').val(addressLine4);
            $('#txtAddress5').val(addressLine5);
            $('#txtAddress6').val(addressLine6);
            $('#txtloyaltyDate').val(loyaltyDate);
            $('#txtloyaltyLevel').val(loyaltyLevel);
            $('#txtloyaltyPoints').val(loyaltyPoints);
            $('#txtCusPurchaseDate').val(recentPurchaseDate);

        });
    }

    function clearFields() {
        $('#cusId').val(code);
        $('#txtCusName').val(name);
        $('#txtEmail').val(email);
        $('#txtGender').val(gender);
        $('#txtContact').val(contact);
        $('#txtDob').val(dob);
        $('#txtAddress1').val(addressLine1);
        $('#txtAddress2').val(addressLine2);
        $('#txtAddress3').val(addressLine3);
        $('#txtAddress4').val(addressLine4);
        $('#txtAddress5').val(addressLine5);
        $('#txtAddress6').val(addressLine6);
        $('#txtloyaltyDate').val(loyaltyDate);
        $('#txtloyaltyLevel').val(loyaltyLevel);
        $('#txtloyaltyPoints').val(loyaltyPoints);
        $('#txtCusPurchaseDate').val(recentPurchaseDate);
    }
});




/////////////////////////////////////


$("#cusId").focus();
const regExCusID = /^(C00-)[0-9]{3,4}$/;
const regExCusName = /^[A-z ]{3,20}$/;
const regExCusPoint = /^[0-9]{0,}[.]?[0-9]{1,2}$/;
const regExCusAddress1 = /^[A-z0-9/ ]{4,30}$/;
const regExCusAddress2 = /^[A-z0-9/ ]{4,30}$/;
const regExCusAddress3 = /^[A-z0-9/ ]{4,30}$/;
const regExCusAddress4 = /^[A-z0-9/ ]{4,30}$/;
const regExCusAddress5 = /^[A-z0-9/ ]{4,30}$/;
const regExCusAddress6 = /^[A-z0-9/ ]{4,30}$/;
const regExCusEmailCusAddress = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regExCusContactNum = /^(07(0|1|2|4|5|6|7|8)[0-9]{7})$/;

let customerValidations = [];
customerValidations.push({
    reg: regExCusID, field: $('#cusId'), error: 'Customer ID Pattern is Wrong : C00-001'
});
customerValidations.push({
    reg: regExCusName, field: $('#txtCusName'), error: 'Customer Name Pattern is Wrong : A-z 3-20'
});
customerValidations.push({
    reg: regExCusPoint, field: $('#txtloyaltyPoints'), error: 'Customer Point is Wrong : Enter Number'
});
customerValidations.push({
    reg: regExCusAddress1, field: $('#txtAddress1'), error: 'Customer Address is Wrong : Enter address'
});
customerValidations.push({
    reg: regExCusAddress2, field: $('#txtAddress2'), error: 'Customer Address is Wrong : Enter address'
});
customerValidations.push({
    reg: regExCusAddress3, field: $('#txtAddress3'), error: 'Customer Address is Wrong : Enter address'
});
customerValidations.push({
    reg: regExCusAddress4, field: $('#txtAddress4'), error: 'Customer Address is Wrong : Enter address'
});
customerValidations.push({
    reg: regExCusAddress5, field: $('#txtAddress5'), error: 'Customer Address is Wrong : Enter address'
});

customerValidations.push({
    reg: regExCusAddress6, field: $('#txtAddress6'), error: 'Customer Address is Wrong : Enter address'
});
customerValidations.push({
    reg: regExCusContactNum, field: $('#txtContact'), error: 'Customer email is Wrong : Enter email address'
});
customerValidations.push({
    reg: regExCusEmailCusAddress, field: $('#txtEmail'), error: 'Customer email is Wrong : Enter email address'
});

$("#cusId,#txtCusName,#txtloyaltyPoints,#txtAddress1,#txtAddress2,#txtAddress3,#txtAddress4,#txtAddress5,#txtAddress6,#txtContact,#txtEmail").on('keydown', function (event) {
    if (event.key === "Tab") {
        event.preventDefault();
    }
});

$("#cusId,#txtCusName,#txtloyaltyPoints,#txtAddress1,#txtAddress2,#txtAddress3,#txtAddress4,#txtAddress5,#txtAddress6,#txtContact,#txtEmail").on('keyup', function (event) {
    checkValidity(customerValidations);
});

$("#cusId,#txtCusName,#txtloyaltyPoints,#txtAddress1,#txtAddress2,#txtAddress3,#txtAddress4,#txtAddress5,#txtAddress6,#txtContact,#txtEmail").on('blur', function (event) {
    checkValidity(customerValidations);
});

$("#cusId").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusID, $("#cusId"))) {
        $("#txtCusName").focus();
    } else {
        focusText($("#cusId"));
    }
});

$("#txtCusName").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusName, $("#txtCusName"))) {
        focusText($("#txtGender"));
    }
});

$("#txtloyaltyPoints").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusPoint, $("#txtloyaltyPoints"))) {
        focusText($("#txtDob"));
    }
});

$("#txtAddress1").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusAddress1, $("#txtAddress1"))) {
        focusText($("#txtAddress2"));
    }
});

$("#txtAddress2").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusAddress2, $("#txtAddress2"))) {
        focusText($("#txtAddress3"));
    }
});

$("#txtAddress3").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusAddress3, $("#txtAddress3"))) {
        focusText($("#txtAddress4"));
    }
});

$("#txtAddress4").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusAddress2, $("#txtAddress4"))) {
        focusText($("#txtAddress5"));
    }
});

$("#txtAddress5").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusAddress2, $("#txtAddress5"))) {
        focusText($("#txtAddress6"));
    }
});

$("#txtContact").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusContactNum, $("#txtContact"))) {
        focusText($("#txtEmail"));
    }
});
$("#txtEmail").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusEmailCusAddress, $("#txtEmail"))) {
        focusText($("#txtCusPurchaseDate"));
    }
});

$("#txtEmail").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusEmailCusAddress, $("#txtEmail"))) {
        if (event.which === 13) {
            $('#btnSaveCustomer').focus();
        }
    }
});

function setButtonState(value) {
    if (value > 0) {
        $("#btnSaveCustomer").attr('disabled', true);
        $("#btnUpdateCustomer").attr('disabled', true);
        $("#btnDeleteCustomer").attr('disabled', true);
    } else {
        $("#btnSaveCustomer").attr('disabled', false);
        $("#btnUpdateCustomer").attr('disabled', false);
        $("#btnDeleteCustomer").attr('disabled',false);
    }
}













