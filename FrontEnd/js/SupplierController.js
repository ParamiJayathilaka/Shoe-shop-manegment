generateSupplierID();

function generateSupplierID() {
    $("#txtSupplierCode").val("S00-001");
    $.ajax({
        url: "http://localhost:8080/supplier/supplierIdGenerate",
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (resp) {
            let id = resp.value;
            console.log("id: " + id);
            if (id) {
                let tempId = parseInt(id.split("-")[1]) + 1;
                let newId = "S00-" + tempId.toString().padStart(3, '0');
                $("#txtSupplierCode").val(newId);
            }
        },
        error: function (ob, statusText, error) {
            console.error("Error generating Supplier ID:", statusText, error);
        }
    });
}


////////////save/////

$('#btnSaveSupplier').click(function (){
    let supCode = $('#txtSupplierCode').val();
    let name = $('#txtSupplierName').val();
    let category = $('#txtSupCategory').val();
    let addressLine1 = $('#txtSupBuildingNo').val();
    let addressLine2 = $('#txtSupLane').val();
    let addressLine3 = $('#txtSupCity').val();
    let addressLine4 = $('#txtSupState').val();
    let addressLine5 = $('#txtSupPostalCode').val();
    let addressLine6 = $('#txtSupCountry').val();
    let contactNo1 = $('#txtSupMobileNumber').val();
    let contactNo2 = $('#txtSupLandlineNumber').val();
    let email = $('#txtSupEmail').val();


    var supplier = {
        supCode:supCode,
        name:name,
        category:category,
        addressLine1:addressLine1,
        addressLine2:addressLine2,
        addressLine3:addressLine3,
        addressLine4:addressLine4,
        addressLine5:addressLine5,
        addressLine6:addressLine6,
        contactNo1:contactNo1,
        contactNo2:contactNo2,
        email:email

    }

    $.ajax({
        url: 'http://localhost:8080/supplier/save',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(supplier),
        success: function (response) {
            alert('supplier information saved successfully!');
            console.log(supplier);
            getAll();
        },
        error: function (xhr, status, error) {
            console.error('Error saving supplier information:', error);
            alert('supplier Not Found!');
        }
    });
})

////// update///

$('#btnUpdateSupplier').click(function (){
    let supCode = $('#txtSupplierCode').val();
    let name = $('#txtSupplierName').val();
    let category = $('#txtSupCategory').val();
    let addressLine1 = $('#txtSupBuildingNo').val();
    let addressLine2 = $('#txtSupLane').val();
    let addressLine3 = $('#txtSupCity').val();
    let addressLine4 = $('#txtSupState').val();
    let addressLine5 = $('#txtSupPostalCode').val();
    let addressLine6 = $('#txtSupCountry').val();
    let contactNo1 = $('#txtSupMobileNumber').val();
    let contactNo2 = $('#txtSupLandlineNumber').val();
    let email = $('#txtSupEmail').val();

    var supplier = {
        supCode:supCode,
        name:name,
        category:category,
        addressLine1:addressLine1,
        addressLine2:addressLine2,
        addressLine3:addressLine3,
        addressLine4:addressLine4,
        addressLine5:addressLine5,
        addressLine6:addressLine6,
        contactNo1:contactNo1,
        contactNo2:contactNo2,
        email:email

    }


    $.ajax({
        url: 'http://localhost:8080/supplier/update',
        type: 'PATCH',
        contentType: 'application/json',
        data: JSON.stringify(supplier),
        success: function (response) {
            alert('supplier information update successfully!');
            console.log(supplier);
            getAll();
        },
        error: function (xhr, status, error) {
            console.error('Error updating supplier information:', error);
            alert('supplier Not Found!');
        }
    });
})

////delete///////
$('#btnDeleteSupplier').click(function () {
    let supCode = $('#txtSupplierCode').val();

    $.ajax({
        url: 'http://localhost:8080/supplier/' + supCode,
        type: 'DELETE',
        success: function (response) {
            alert('supplier information deleted successfully!');
            console.log('Deleted supplier with code:', supCode);
            // getAll();
        },
        error: function (xhr, status, error) {
            console.error('Error deleting supplier information:', error);
            alert('supplier Not Found!');
        }
    });
});

///getall//

function getAll() {
    $('#tblCustomers tbody').empty();

    $.ajax({
        url: "http://localhost:8080/app1/cust/getAllCustomers",
        method: "GET",
        success: function (resp) {
            for (const customer of resp) {
                let row = `<tr>
                                <td>${customer.customerCode}</td>
                                <td>${customer.customerName}</td>
                                <td>${customer.gender}</td>
                                <td>${customer.joinDateLoyaltyCustomer}</td>
                                <td>${customer.level}</td>
                                <td>${customer.totalPoints}</td>
                                <td>${customer.dateOfBirth}</td>
                                <td>${customer.address}</td>
                            </tr>`;
                $('#tblCustomers tbody').append(row);
            }
            bindClickEvents();
        },
        error: function (error) {
            console.log("Error: ", error);
        }
    });
}

function bindClickEvents() {
    $('#tblCustomers tbody>tr').click(function () {
        let customerCode = $(this).children(':nth-child(1)').text();
        let customerName = $(this).children(':nth-child(2)').text();
        let gender = $(this).children(':nth-child(3)').text();
        let joinDateLoyaltyCustomer = $(this).children(':nth-child(4)').text();
        let level = $(this).children(':nth-child(5)').text();
        let totalPoints = $(this).children(':nth-child(6)').text();
        let dateOfBirth = $(this).children(':nth-child(7)').text();
        let address = $(this).children(':nth-child(8)').text();

        $('#txtCustomerCode').val(customerCode);
        $('#txtCustomerName').val(customerName);
        $('#txtGender').val(gender);
        $('#txtJoinDateLoyaltyCustomer').val(joinDateLoyaltyCustomer);
        $('#txtLevel').val(level);
        $('#txtTotalPoints').val(totalPoints);
        $('#txtDateOfBirth').val(dateOfBirth);
        $('#txtAddress').val(address);
    });
}