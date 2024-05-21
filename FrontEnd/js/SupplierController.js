// generateSupplierID();
//
// function generateSupplierID() {
//     $("#txtSupplierCode").val("S00-001");
//     $.ajax({
//         url: "http://localhost:8080/supplier/supplierIdGenerate",
//         method: "GET",
//         contentType: "application/json",
//         dataType: "json",
//         success: function (resp) {
//             let id = resp.value;
//             console.log("id: " + id);
//             if (id) {
//                 let tempId = parseInt(id.split("-")[1]) + 1;
//                 let newId = "S00-" + tempId.toString().padStart(3, '0');
//                 $("#txtSupplierCode").val(newId);
//             }
//         },
//         error: function (ob, statusText, error) {
//             console.error("Error generating Supplier ID:", statusText, error);
//         }
//     });
// }

$(document).ready(function () {

    generateSupplierID();
    getAll();

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
                clearFields();
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
                clearFields();
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
                clearFields();
                getAll();
            },
            error: function (xhr, status, error) {
                console.error('Error deleting supplier information:', error);
                alert('supplier Not Found!');
            }
        });
    });


///getall//

    function getAll() {
        $('#supplierTable tbody').empty();

        $.ajax({
            url: "http://localhost:8080/supplier/getAllSupplier",
            method: "GET",
            success: function (resp) {
                for (const supplier of resp) {
                    let row = `<tr>
                                   <td>${supplier.supCode}</td>
                                <td>${supplier.name}</td>
                                <td>${supplier.category}</td>
                                <td>${supplier.addressLine1}</td>
                                <td>${supplier.addressLine2}</td>
                                <td>${supplier.addressLine3}</td>
                                <td>${supplier.addressLine4}</td>
                                <td>${supplier.addressLine5}</td>
                                <td>${supplier.addressLine6}</td>
                                <td>${supplier.contactNo1}</td>
                                <td>${supplier.contactNo2}</td>
                                <td>${supplier.email}</td>
                                
                                </tr>`;
                    $('#supplierTable tbody').append(row);
                }
                bindClickEvents();
            },
            error: function (error) {
                console.log("Error: ", error);
            }
        });
    }

    function bindClickEvents() {
        $('#supplierTable tbody>tr').click(function () {
            let supCode = $(this).children(':nth-child(1)').text();
            let name = $(this).children(':nth-child(2)').text();
            let category = $(this).children(':nth-child(3)').text();
            let addressLine1 = $(this).children(':nth-child(4)').text();
            let addressLine2 = $(this).children(':nth-child(6)').text();
            let addressLine3 = $(this).children(':nth-child(7)').text();
            let addressLine4 = $(this).children(':nth-child(8)').text();
            let addressLine5 = $(this).children(':nth-child(6)').text();
            let addressLine6 = $(this).children(':nth-child(7)').text();
            let contactNo1 = $(this).children(':nth-child(8)').text();
            let contactNo2 = $(this).children(':nth-child(9)').text();
            let email = $(this).children(':nth-child(10)').text();

            $('#txtSupplierCode').val(supCode);
            $('#txtSupplierName').val(name);
            $('#txtSupCategory').val(category);
            $('#txtSupBuildingNo').val(addressLine1);
            $('#txtSupLane').val(addressLine2);
            $('#txtSupCity').val(addressLine3);
            $('#txtSupState').val(addressLine4);
            $('#txtSupPostalCode').val(addressLine5);
            $('#txtSupCountry').val(addressLine6);
            $('#txtSupMobileNumber').val(contactNo1);
            $('#txtSupLandlineNumber').val(contactNo2);
            $('#txtSupEmail').val(email);

        });
    }

    function clearFields() {
        $('#txtSupplierCode').val(supCode);
        $('#txtSupplierName').val(name);
        $('#txtSupCategory').val(category);
        $('#txtSupBuildingNo').val(addressLine1);
        $('#txtSupLane').val(addressLine2);
        $('#txtSupCity').val(addressLine3);
        $('#txtSupState').val(addressLine4);
        $('#txtSupPostalCode').val(addressLine5);
        $('#txtSupCountry').val(addressLine6);
        $('#txtSupMobileNumber').val(contactNo1);
        $('#txtSupLandlineNumber').val(contactNo2);
        $('#txtSupEmail').val(email);
    }

});


