generateCustomerID();

function generateCustomerID() {
    $("#cusId").val("C00-001");
    $.ajax({
        url: "http://localhost:8080/customer/cusIdGenerate",
        method: "GET",
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
//
// $("#btnSaveCustomer").click(function (e) {
//     e.preventDefault();
//     let formData = $("#customerForm").serialize();
//
//     let empId = $("#cusId").val();
//     formData += "&code=" + empId;
//
//     $.ajax({
//         url: "http://localhost:8080/back_End/customer",
//         method: "POST",
//         data: formData,
//         dataType: "json",
//         success: function (res) {
//             alert("Save Customer");
//         },
//         error: function (xhr, status, error) {
//             let errorMessage = "An error occurred.";
//             if (xhr.responseText) {
//                 errorMessage = JSON.parse(xhr.responseText).message;
//             }
//
//         }
//     });
// });
//
// function loadAllCustomer() {
//     $("#customerTable").empty();
//     // Set purchaseDate field to current date and time
//     $('#purchaseDate').val(new Date().toISOString().slice(0, 19).replace('T', ' '));
//
//     $.ajax({
//         url:  "http://localhost:8080/back_End/customer",
//         method: "GET",
//         dataType: "json",
//         success: function (res) {
//             for (let i of res.data) {
//                 let code = i.code;
//                 let name = i.name;
//                 let email = i.email;
//                 let contact = i.contact;
//                 let dob = i.dob;
//                 let addressLine1 = i.addressLine1;
//                 let addressLine2 = i.addressLine2;
//                 let addressLine3 = i.addressLine3;
//                 let addressLine4 = i.addressLine4;
//                 let addressLine5 = i.addressLine5;
//                 let addressLine6 = i.addressLine6;
//                 let loyaltyDate = i.loyaltyDate;
//                 let loyaltyLevel = i.loyaltyLevel;
//                 let State = i.State;
//                 let recentPurchaseDate = i.recentPurchaseDate;
//
//
//
//                 // let addressColumn = `${ad1}, ${ad2}, ${ad3}, ${ad4}, ${ad5}`;
//
//                 let row = `<tr><td>${code}</td><td>${name}</td><td>${email}</td><td>${contact}</td><td>${dob}</td><td>${addressLine1}</td><td>${addressLine2}</td><td>${addressLine3}</td><td>${addressLine4}</td><td>${addressLine5}</td><td>${addressLine6}</td><td>${loyaltyDate}</td><td>${loyaltyLevel}</td><td>${State}</td><td>${recentPurchaseDate}</td></tr>`;
//                 $("#customerTable").append(row);
//             }
//             // blindClickEventsC();
//             generateCustomerID();
//             // setTextFieldValuesC("", "", "", "", "", "", "", "", "", "", "", "", "", "", "");
//             console.log(res.message);
//         },
//         error: function (error) {
//             let message = JSON.parse(error.responseText).message;
//             console.log(message);
//         }
//     });
// }
//

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

    $.ajax({
        url: 'http://localhost:8080/customer/save',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(customer),
        success: function (response) {
            alert('Customer information saved successfully!');
            console.log(customer);
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

    $.ajax({
        url: 'http://localhost:8080/customer/update',
        type: 'PATCH',
        contentType: 'application/json',
        data: JSON.stringify(customer),
        success: function (response) {
            alert('Customer information update successfully!');
            console.log(customer);
            getAll();
        },
        error: function (xhr, status, error) {
            console.error('Error updating customer information:', error);
            alert('Customer Not Found!');
        }
    });
})

