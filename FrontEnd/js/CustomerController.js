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

////delete///////
$('#btnDeleteCustomer').click(function () {
    let code = $('#cusId').val();

    $.ajax({
        url: 'http://localhost:8080/customer/' + code,
        type: 'DELETE',
        success: function (response) {
            alert('Customer information deleted successfully!');
            console.log('Deleted customer with code:', code);
            // getAll();
        },
        error: function (xhr, status, error) {
            console.error('Error deleting customer information:', error);
            alert('Customer Not Found!');
        }
    });
});


// ////////////getall////////
//
// function getAll() {
//     $('#customerTable tbody').empty();
//
//     $.ajax({
//         url: "http://localhost:8080/customer/getAllCustomers",
//         method: "GET",
//         success: function (resp) {
//             for (const customer of resp) {
//                 let row = `<tr>
//                                 <td>${customer.code}</td>
//                                 <td>${customer.name}</td>
//                                 <td>${customer.email}</td>
//                                 <td>${customer.gender}</td>
//                                 <td>${customer.contact}</td>
//                                 <td>${customer.dob}</td>
//                                 <td>${customer.addressLine1}</td>
//                                 <td>${customer.addressLine2}</td>
//                                 <td>${customer.addressLine3}</td>
//                                 <td>${customer.addressLine4}</td>
//                                 <td>${customer.addressLine5}</td>
//                                 <td>${customer.addressLine6}</td>
//                                 <td>${customer.loyaltyDate}</td>
//                                 <td>${customer.loyaltyLevel}</td>
//                                 <td>${customer.loyaltyPoints}</td>
//                                 <td>${customer.recentPurchaseDate}</td>
//                             </tr>`;
//
//                 $('#customerTable tbody').append(row);
//             }
//             bindClickEvents();
//         },
//         error: function (error) {
//             console.log("Error: ", error);
//         }
//     });
// }
//
// function bindClickEvents() {
//     $('#customerTable tbody>tr').click(function () {
//         let code = $(this).children(':nth-child(1)').text();
//         let name = $(this).children(':nth-child(2)').text();
//         let email = $(this).children(':nth-child(3)').text();
//         let gender = $(this).children(':nth-child(4)').text();
//         let contact = $(this).children(':nth-child(6)').text();
//         let dob = $(this).children(':nth-child(7)').text();
//         let addressLine1 = $(this).children(':nth-child(8)').text();
//         let addressLine2 = $(this).children(':nth-child(6)').text();
//         let addressLine3 = $(this).children(':nth-child(7)').text();
//         let addressLine4 = $(this).children(':nth-child(8)').text();
//         let addressLine5 = $(this).children(':nth-child(9)').text();
//         let addressLine6 = $(this).children(':nth-child(10)').text();
//         let loyaltyDate = $(this).children(':nth-child(11)').text();
//         let loyaltyLevel = $(this).children(':nth-child(12)').text();
//         let loyaltyPoints = $(this).children(':nth-child(13)').text();
//         let recentPurchaseDate = $(this).children(':nth-child(14)').text();
//
//         $('#cusId').val(code);
//         $('#txtCusName').val(name);
//         $('#txtEmail').val(email);
//         $('#txtGender').val(gender);
//         $('#txtContact').val(contact);
//         $('#txtDob').val(dob);
//         $('#txtAddress1').val(addressLine1);
//         $('#txtAddress2').val(addressLine2);
//         $('#txtAddress3').val(addressLine3);
//         $('#txtAddress4').val(addressLine4);
//         $('#txtAddress5').val(addressLine5);
//         $('#txtAddress6').val(addressLine6);
//         $('#txtloyaltyDate').val(loyaltyDate);
//         $('#txtloyaltyLevel').val(loyaltyLevel);
//         $('#txtloyaltyPoints').val(loyaltyPoints);
//         $('#txtCusPurchaseDate').val(recentPurchaseDate);
//
//
//
//     });
// }


