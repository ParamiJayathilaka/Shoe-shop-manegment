

$(document).ready(function () {
    generateCustomerID();
    getAll();

    function generateCustomerID() {
        $("#cusId").val("C00-001");
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: "http://localhost:8080/customer/cusIdGenerate",
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
                    let newId = "C00-" + tempId.toString().padStart(3, '0');
                    $("#cusId").val(newId);
                }
            },
            error: function (ob, statusText, error) {
                console.error("Error generating customer ID:", statusText, error);
            }
        });
    }

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


//////////// validation ////////////

const Cust_ID_Check = /^(C00-)[0-9]{3}$/;
const Cust_Name_Check = /^[A-Za-z ]{5,}$/;
const Cust_Address1_Check = /^[A-Za-z0-9 ]{5,}$/;
const Cust_Address2_Check = /^[A-Za-z0-9 ]{5,}$/;
const Cust_Address3_Check = /^[A-Za-z0-9 ]{5,}$/;
const Cust_Address4_Check = /^[A-Za-z0-9 ]{5,}$/;
const Cust_Address5_Check = /^[A-Za-z0-9 ]{5,}$/;
const Cust_Address6_Check = /^[A-Za-z0-9 ]{5,}$/;
const Cust_Contact_Check = /^(07(0|1|2|4|5|6|7|8)[0-9]{7})$/;

let custArray = new Array();
custArray.push({field: $("#cusId"), regEx: Cust_ID_Check});
custArray.push({field: $("#txtCusName"), regEx: Cust_Name_Check});
custArray.push({field: $("#txtAddress1"), regEx: Cust_Address1_Check});
custArray.push({field: $("#txtAddress2"), regEx: Cust_Address2_Check});
custArray.push({field: $("#txtAddress3"), regEx: Cust_Address3_Check});
custArray.push({field: $("#txtAddress4"), regEx: Cust_Address4_Check});
custArray.push({field: $("#txtAddress5"), regEx: Cust_Address5_Check});
custArray.push({field: $("#txtAddress6"), regEx: Cust_Address6_Check});
custArray.push({field: $("#txtContact"), regEx: Cust_Contact_Check});



function clearCustomerInputFields() {
    $("#cusId,#txtCusName,#txtAddress1,#txtAddress2,#txtAddress3,#txtAddress4,#txtAddress5,#txtAddress6,#txtContact").val("");
    $("#cusId,#txtCusName,#txtAddress1,#txtAddress2,#txtAddress3,#txtAddress4,#txtAddress5,#txtAddress6,#txtContact").css("border", "1px solid #ced4da");
    $("#cusId").focus();
    setBtn();
}
//


function setBtn() {
    $("#btnDeleteCustomer").prop("disabled", true);
    $("#btnUpdateCustomer").prop("disabled", true);

    if (checkAll()) {
        $("#btnSaveCustomer").prop("disabled", false);
    } else {
        $("#btnSaveCustomer").prop("disabled", true);
    }

    let id = $("#cusId").val();
    if (searchCustomer(id) == undefined) {
        $("#btnDeleteCustomer").prop("disabled", true);
        $("#btnUpdateCustomer").prop("disabled", true);
    } else {
        $("#btnDeleteCustomer").prop("disabled", false);
        $("#btnUpdateCustomer").prop("disabled", false);
    }

}


$(document).ready(function () {
    $("#cusId,#txtCusName,#txtAddress1,#txtAddress2,#txtAddress3,#txtAddress4,#txtAddress5,#txtAddress6,#txtContact").on("keydown keyup", function (e) {

        let indexNo = custArray.indexOf(custArray.find((c) => c.field.attr("id") == e.target.id));

        if (e.key == "Tab") {
            e.preventDefault();
        }

        checkValidations(custArray[indexNo]);

        setBtn();

        if (e.key == "Enter") {

            if (e.target.id != custArray[custArray.length - 1].field.attr("id")) {
                if (checkValidations(custArray[indexNo])) {
                    custArray[indexNo + 1].field.focus();
                }
            } else {
                if (checkValidations(custArray[indexNo])) {
                    saveCustomer();
                }
            }
        }
    });
});






function checkValidations(object) {
    if (object.regEx.test(object.field.val())) {
        setBorder(true, object)
        return true;
    }
    setBorder(false, object)
    return false;
}

function setBorder(bol, ob) {
    if (!bol) {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid red");
        } else {
            ob.field.css("border", "2px solid white");
        }
    } else {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid green");
        } else {
            ob.field.css("border", "2px solid white");
        }
    }

}


function checkAllCus() {
    for (let i = 0; i < custArray.length; i++) {
        if (!checkValidations(custArray[i])) return false;
    }
    return true;
}

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
const regExCusEmailCusAddress = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regExCusContactNum = /^(07(0|1|2|4|5|6|7|8)[0-9]{7})$/;

let customerValidations = [];
customerValidations.push({
    reg: regExCusID, field: $('#cusId'), error: 'Customer ID Pattern is Wrong : C00-001'
});
customerValidations.push({
    reg: regExCusName, field: $('#customer_name'), error: 'Customer Name Pattern is Wrong : A-z 3-20'
});
customerValidations.push({
    reg: regExCusPoint, field: $('#total_point'), error: 'Customer Point is Wrong : Enter Number'
});
customerValidations.push({
    reg: regExCusAddress1, field: $('#c_address_01'), error: 'Customer Address is Wrong : Enter address'
});
customerValidations.push({
    reg: regExCusAddress2, field: $('#c_address_02'), error: 'Customer Address is Wrong : Enter address'
});
customerValidations.push({
    reg: regExCusAddress3, field: $('#c_address_03'), error: 'Customer Address is Wrong : Enter address'
});
customerValidations.push({
    reg: regExCusAddress4, field: $('#c_address_04'), error: 'Customer Address is Wrong : Enter address'
});
customerValidations.push({
    reg: regExCusAddress5, field: $('#c_address_05'), error: 'Customer Address is Wrong : Enter address'
});
customerValidations.push({
    reg: regExCusContactNum, field: $('#c_contact_num'), error: 'Customer email is Wrong : Enter email address'
});
customerValidations.push({
    reg: regExCusEmailCusAddress, field: $('#customer_email'), error: 'Customer email is Wrong : Enter email address'
});

$("#cusId,#customer_name,#total_point,#c_address_01,#c_address_02,#c_address_03,#c_address_04,#c_address_05,#c_contact_num,#customer_email").on('keydown', function (event) {
    if (event.key === "Tab") {
        event.preventDefault();
    }
});

$("#cusId,#customer_name,#total_point,#c_address_01,#c_address_02,#c_address_03,#c_address_04,#c_address_05,#c_contact_num,#customer_email").on('keyup', function (event) {
    checkValidity(customerValidations);
});

$("#cusId,#customer_name,#total_point,#c_address_01,#c_address_02,#c_address_03,#c_address_04,#c_address_05,#c_contact_num,#customer_email").on('blur', function (event) {
    checkValidity(customerValidations);
});

$("#cusId").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusID, $("#cusId"))) {
        $("#customer_name").focus();
    } else {
        focusText($("#cusId"));
    }
});

$("#customer_name").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusName, $("#customer_name"))) {
        focusText($("#customer_gender"));
    }
});

$("#total_point").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusPoint, $("#total_point"))) {
        focusText($("#customer_dob"));
    }
});

$("#c_address_01").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusAddress1, $("#c_address_01"))) {
        focusText($("#c_address_02"));
    }
});

$("#c_address_02").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusAddress2, $("#c_address_02"))) {
        focusText($("#c_address_03"));
    }
});

$("#c_address_03").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusAddress3, $("#c_address_03"))) {
        focusText($("#c_address_04"));
    }
});

$("#c_address_04").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusAddress2, $("#c_address_04"))) {
        focusText($("#c_address_05"));
    }
});

$("#c_contact_num").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusContactNum, $("#c_contact_num"))) {
        focusText($("#customer_email"));
    }
});
$("#customer_email").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusEmailCusAddress, $("#customer_email"))) {
        focusText($("#purchaseDate"));
    }
});

$("#customer_email").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusEmailCusAddress, $("#customer_email"))) {
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













