$(document).ready(function () {
    generateEmployeeID();
    getAll();

    function generateEmployeeID() {
        $("#txtEmpCode").val("E00-001");
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: "http://localhost:8080/employee/employeeIdGenerate",
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
                    let newId = "E00-" + tempId.toString().padStart(3, '0');
                    $("#txtEmpCode").val(newId);
                }
            },
            error: function (ob, statusText, error) {
                console.error("Error generating employee ID:", statusText, error);
            }
        });
    }

    ////////////save/////

    $('#btnSaveEmployee').click(function (){

        // var image = $("#img");
        // var imageUrl = image.attr('src');
        // if (!imageUrl || imageUrl === '../assest/image/background.jpg') {
        //     // Handle error scenario
        // }

        let empCode = $('#txtEmpCode').val();
        let employeeName = $('#txtEmpName').val();
        let employeeProfilePic = $('#txtEmpProfilePic').val();
        let gender = $('#txtEmpGender').val();
        let status = $('#txtEmpStatus').val();
        let designation = $('#txtEmpDesignation').val();
        let accessRole = $('#txtEmpAccessRole').val();
        let dob = $('#txtEmpDob').val();
        let dateOfJoin = $('#txtEmpDateOfJoin').val();
        let branch = $('#txtEmpAttachedBranch').val();
        let addressLine1 = $('#txtEmpBuildingNo').val();
        let addressLine2 = $('#txtEmpLane').val();
        let addressLine3 = $('#txtEmpCity').val();
        let addressLine4 = $('#txtEmpState').val();
        let addressLine5 = $('#txtEmpPostalCode').val();
        let contactNum = $('#txtEmpContact').val();
        let email = $('#txtEmpEmail').val();
        let emergency = $('#txtEmpEmergencyGuardian').val();
        let emergencyContact = $('#txtEmpEmergencyContact').val();

        // formData.push({name: "employeeProfilePic", value: imageUrl});

        var employee = {
            empCode :empCode,
            employeeName :employeeName,
            employeeProfilePic : employeeProfilePic,
            gender :gender,
            status :status,
            designation : designation,
            accessRole :accessRole,
            dob :dob,
            dateOfJoin :dateOfJoin,
            branch :branch,
            addressLine1 : addressLine1,
            addressLine2 :addressLine2,
            addressLine3 :addressLine3,
            addressLine4 :addressLine4,
            addressLine5 :addressLine5,
            contactNum :contactNum,
            email :email,
            emergency : emergency,
            emergencyContact :emergencyContact
        }
        // performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: 'http://localhost:8080/employee/save',
            type: 'POST',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            contentType: 'application/json',
            data: JSON.stringify(employee),
            success: function (response) {
                alert('Employee information saved successfully!');
                console.log(employee);
                clearFields();
                getAll();
            },
            error: function (xhr, status, error) {
                console.error('Error saving employee information:', error);
                alert('Employee Not Found!');
            }
        });
    })

    //// update///
    $('#btnUpdateEmployee').click(function (){
        let empCode = $('#txtEmpCode').val();
        let employeeName = $('#txtEmpName').val();
        let employeeProfilePic = $('#txtEmpProfilePic').val();
        let gender = $('#txtEmpGender').val();
        let status = $('#txtEmpStatus').val();
        let designation = $('#txtEmpDesignation').val();
        let accessRole = $('#txtEmpAccessRole').val();
        let dob = $('#txtEmpDob').val();
        let dateOfJoin = $('#txtEmpDateOfJoin').val();
        let branch = $('#txtEmpAttachedBranch').val();
        let addressLine1 = $('#txtEmpBuildingNo').val();
        let addressLine2 = $('#txtEmpLane').val();
        let addressLine3 = $('#txtEmpCity').val();
        let addressLine4 = $('#txtEmpState').val();
        let addressLine5 = $('#txtEmpPostalCode').val();
        let contactNum = $('#txtEmpContact').val();
        let email = $('#txtEmpEmail').val();
        let emergency = $('#txtEmpEmergencyGuardian').val();
        let emergencyContact = $('#txtEmpEmergencyContact').val();
        val();

        var employee = {
            empCode :empCode,
            employeeName :employeeName,
            employeeProfilePic : employeeProfilePic,
            gender :gender,
            status :status,
            designation : designation,
            accessRole :accessRole,
            dob :dob,
            dateOfJoin :dateOfJoin,
            branch :branch,
            addressLine1 : addressLine1,
            addressLine2 :addressLine2,
            addressLine3 :addressLine3,
            addressLine4 :addressLine4,
            addressLine5 :addressLine5,
            contactNum :contactNum,
            email :email,
            emergency : emergency,
            emergencyContact :emergencyContact

        }

        $.ajax({
            url: 'http://localhost:8080/employee/update',
            type: 'PATCH',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            contentType: 'application/json',
            data: JSON.stringify(employee),
            success: function (response) {
                alert('employee information update successfully!');
                console.log(employee);
                clearFields();
                getAll();
            },
            error: function (xhr, status, error) {
                console.error('Error updating employee information:', error);
                alert('employee Not Found!');
            }
        });
    })

////delete////

    $('#btnDeleteEmployee').click(function () {
        let empCode = $('#txtEmpCode').val();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: 'http://localhost:8080/employee/' + empCode,
            type: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function (response) {
                alert('employee information deleted successfully!');
                console.log('Deleted employee with code:', empCode);
                clearFields();
                getAll();
            },
            error: function (xhr, status, error) {
                console.error('Error deleting employee information:', error);
                alert('employee Not Found!');
            }
        });
    });

    //get all //

    function getAll() {
        $('#employeeTable tbody').empty();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: "http://localhost:8080/employee/getAllEmployee",
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function (resp) {
                for (const employee of resp) {
                    let row = `<tr>
                                   <td>${employee.empCode}</td>
                                <td>${employee.employeeName}</td>
                                <td>${employee.employeeProfilePic}</td>
                                <td>${employee.gender}</td>
                                <td>${employee.status}</td>
                                <td>${employee.designation}</td>
                                <td>${employee.accessRole}</td>
                                <td>${employee.dob}</td>
                                <td>${employee.dateOfJoin}</td>
                                <td>${employee.branch}</td>
                                <td>${employee.addressLine1}</td>
                                <td>${employee.addressLine2}</td>
                                <td>${employee.addressLine3}</td>
                                <td>${employee.addressLine4}</td>
                                <td>${employee.addressLine5}</td>
                                <td>${employee.contactNum}</td>
                                <td>${employee.email}</td>
                                <td>${employee.emergency}</td>
                                <td>${employee.emergencyContact}</td>
                                
                                </tr>`;
                    $('#employeeTable tbody').append(row);
                }
                bindClickEvents();
            },
            error: function (error) {
                console.log("Error: ", error);
            }
        });
    }

    function bindClickEvents() {
        $('#employeeTable tbody>tr').click(function () {
            let empCode = $(this).children(':nth-child(1)').text();
            let employeeName = $(this).children(':nth-child(2)').text();
            let employeeProfilePic = $(this).children(':nth-child(3)').text();
            let gender = $(this).children(':nth-child(4)').text();
            let status = $(this).children(':nth-child(6)').text();
            let designation = $(this).children(':nth-child(7)').text();
            let accessRole = $(this).children(':nth-child(8)').text();
            let dob = $(this).children(':nth-child(6)').text();
            let dateOfJoin = $(this).children(':nth-child(7)').text();
            let branch = $(this).children(':nth-child(8)').text();
            let addressLine1 = $(this).children(':nth-child(9)').text();
            let addressLine2 = $(this).children(':nth-child(10)').text();
            let addressLine3 = $(this).children(':nth-child(11)').text();
            let addressLine4 = $(this).children(':nth-child(12)').text();
            let addressLine5 = $(this).children(':nth-child(13)').text();
            let contactNum = $(this).children(':nth-child(14)').text();
            let email = $(this).children(':nth-child(15)').text();
            let emergency = $(this).children(':nth-child(16)').text();
            let emergencyContact = $(this).children(':nth-child(17)').text();



            $('#txtEmpCode').val(empCode);
            $('#txtEmpName').val(employeeName);
            $('#txtEmpProfilePic').val(employeeProfilePic);
            $('#txtEmpGender').val(gender);
            $('#txtEmpStatus').val(status);
            $('#txtEmpDesignation').val(designation);
            $('#txtEmpAccessRole').val(accessRole);
            $('#txtEmpDob').val(dob);
            $('#txtEmpDateOfJoin').val(dateOfJoin);
            $('#txtEmpAttachedBranch').val(branch);
            $('#txtEmpBuildingNo').val(addressLine1);
            $('#txtEmpLane').val(addressLine2);
            $('#txtEmpCity').val(addressLine3);
            $('#txtEmpState').val(addressLine4);
            $('#txtEmpPostalCode').val(addressLine5);
            $('#txtEmpContact').val(contactNum);
            $('#txtEmpEmail').val(email);
            $('#txtEmpEmergencyGuardian').val(emergency);
            $('#txtEmpEmergencyContact').val(emergencyContact);

        });
    }

    function clearFields() {
        $('#txtEmpCode').val(empCode);
        $('#txtEmpName').val(employeeName);
        $('#txtEmpProfilePic').val(employeeProfilePic);
        $('#txtEmpGender').val(gender);
        $('#txtEmpStatus').val(status);
        $('#txtEmpDesignation').val(designation);
        $('#txtEmpAccessRole').val(accessRole);
        $('#txtEmpDob').val(dob);
        $('#txtEmpDateOfJoin').val(dateOfJoin);
        $('#txtEmpAttachedBranch').val(branch);
        $('#txtEmpBuildingNo').val(addressLine1);
        $('#txtEmpLane').val(addressLine2);
        $('#txtEmpCity').val(addressLine3);
        $('#txtEmpState').val(addressLine4);
        $('#txtEmpPostalCode').val(addressLine5);
        $('#txtEmpContact').val(contactNum);
        $('#txtEmpEmail').val(email);
        $('#txtEmpEmergencyGuardian').val(emergency);
        $('#txtEmpEmergencyContact').val(emergencyContact);
    }
});








/// employee pic add //

// $('#txtEmpProfilePic').change(function() {
//     var fileInput = $('#txtEmpProfilePic')[0];
//     var file = fileInput.files[0];
//
//     if (file && (file.type.includes('image') || file.type === 'image/gif')) {
//         var reader = new FileReader();
//         reader.onload = function (e) {
//             $('#img').attr('src', e.target.result);
//         };
//         reader.readAsDataURL(file);
//         $(this).val("");
//     } else {
//         // Handle error scenario
//     }
// });

//////////////////////////////

$("#txtEmpCode").focus();
const regExEmpID = /^(E00-)[0-9]{3,4}$/;
const regExEmpName = /^[A-z ]{3,20}$/;
const regExEmpStatus = /^[A-z ]{3,20}$/;
const regExEmpDesignation = /^[A-z ]{3,20}$/;
const regExEmpBranch = /^[A-z ]{3,20}$/;
const regExEmpAddress1 = /^[A-z0-9/ ]{4,30}$/;
const regExEmpAddress2 = /^[A-z0-9/ ]{4,30}$/;
const regExEmpAddress3 = /^[A-z0-9/ ]{4,30}$/;
const regExEmpAddress4 = /^[A-z0-9/ ]{4,30}$/;
const regExEmpAddress5 = /^[A-z0-9/ ]{4,30}$/;
const regExEmpContactNum = /^(07(0|1|2|4|5|6|7|8)[0-9]{7})$/;
const regExEmpEmailAddress = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regExEmpEmergency = /^[A-z ]{3,20}$/;
const regExEmpEmerContactNum = /^(07(0|1|2|4|5|6|7|8)[0-9]{7})$/;

let employeeValidations = [];
employeeValidations.push({
    reg: regExEmpID, field: $('#txtEmpCode'), error: 'employee ID Pattern is Wrong : E00-001'
});
employeeValidations.push({
    reg: regExEmpName, field: $('#txtEmpName'), error: 'employee Name Pattern is Wrong : A-z 3-20'
});
employeeValidations.push({
    reg: regExEmpStatus, field: $('#txtEmpStatus'), error: 'employee Point is Wrong : Enter Number'
});
employeeValidations.push({
    reg: regExEmpDesignation, field: $('#txtEmpDesignation'), error: 'employee Address is Wrong : Enter address'
});
employeeValidations.push({
    reg: regExEmpBranch, field: $('#txtEmpAttachedBranch'), error: 'employee Address is Wrong : Enter address'
});
employeeValidations.push({
    reg: regExEmpAddress1, field: $('#txtEmpBuildingNo'), error: 'employee Address is Wrong : Enter address'
});
employeeValidations.push({
    reg: regExEmpAddress2, field: $('#txtEmpLane'), error: 'employee Address is Wrong : Enter address'
});
employeeValidations.push({
    reg: regExEmpAddress3, field: $('#txtEmpCity'), error: 'employee Address is Wrong : Enter address'
});

employeeValidations.push({
    reg: regExEmpAddress4, field: $('#txtEmpState'), error: 'employee Address is Wrong : Enter address'
});
employeeValidations.push({
    reg: regExEmpAddress5, field: $('#txtEmpPostalCode'), error: 'employee email is Wrong : Enter email address'
});
employeeValidations.push({
    reg: regExEmpContactNum, field: $('#txtEmpContact'), error: 'employee email is Wrong : Enter email address'
});

employeeValidations.push({
    reg: regExEmpEmailAddress, field: $('#txtEmpEmail'), error: 'employee email is Wrong : Enter email address'
});

employeeValidations.push({
    reg: regExEmpEmergency, field: $('#txtEmpEmergencyGuardian'), error: 'employee email is Wrong : Enter email address'
});

employeeValidations.push({
    reg: regExEmpEmerContactNum, field: $('#txtEmpEmergencyContact'), error: 'Customer email is Wrong : Enter email address'
});



$("#txtEmpCode,#txtEmpName,#txtEmpStatus,#txtEmpDesignation,#txtEmpAttachedBranch,#txtEmpBuildingNo,#txtEmpLane,#txtEmpCity,#txtEmpState,#txtEmpPostalCode,#txtEmpContact,#txtEmpEmail,#txtEmpEmergencyGuardian,#txtEmpEmergencyContact").on('keydown', function (event) {
    if (event.key === "Tab") {
        event.preventDefault();
    }
});

$("#txtEmpCode,#txtEmpName,#txtEmpStatus,#txtEmpDesignation,#txtEmpAttachedBranch,#txtEmpBuildingNo,#txtEmpLane,#txtEmpCity,#txtEmpState,#txtEmpPostalCode,#txtEmpContact,#txtEmpEmail,#txtEmpEmergencyGuardian,#txtEmpEmergencyContact").on('keyup', function (event) {
    checkValidity(employeeValidations);
});

$("#txtEmpCode,#txtEmpName,#txtEmpStatus,#txtEmpDesignation,#txtEmpAttachedBranch,#txtEmpBuildingNo,#txtEmpLane,#txtEmpCity,#txtEmpState,#txtEmpPostalCode,#txtEmpContact,#txtEmpEmail,#txtEmpEmergencyGuardian,#txtEmpEmergencyContact").on('blur', function (event) {
    checkValidity(employeeValidations);
});

$("#txtEmpCode").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExEmpID, $("#txtEmpCode"))) {
        $("#txtEmpName").focus();
    } else {
        focusText($("#txtEmpCode"));
    }
});

$("#txtEmpName").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExEmpName, $("#txtEmpName"))) {
        focusText($("#txtEmpProfilePic"));
    }
});

$("#txtEmpProfilePic").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusPoint, $("#txtEmpProfilePic"))) {
        focusText($("#txtEmpGender"));
    }
});

$("#txtEmpGender").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusAddress1, $("#txtEmpGender"))) {
        focusText($("#txtEmpStatus"));
    }
});

$("#txtEmpStatus").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExEmpStatus, $("#txtEmpStatus"))) {
        focusText($("#txtEmpDesignation"));
    }
});

$("#txtEmpDesignation").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusAddress3, $("#txtEmpDesignation"))) {
        focusText($("#txtEmpAccessRole"));
    }
});

$("#txtEmpAccessRole").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusAddress2, $("#txtEmpAccessRole"))) {
        focusText($("#txtEmpDob"));
    }
});

$("#txtEmpDob").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusAddress2, $("#txtEmpDob"))) {
        focusText($("#txtEmpDateOfJoin"));
    }
});

$("#txtEmpDateOfJoin").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusContactNum, $("#txtEmpDateOfJoin"))) {
        focusText($("#txtEmpAttachedBranch"));
    }
});
$("#txtEmpAttachedBranch").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusEmailCusAddress, $("#txtEmpAttachedBranch"))) {
        focusText($("#txtEmpBuildingNo"));
    }
});

$("#txtEmpBuildingNo").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusEmailCusAddress, $("#txtEmpBuildingNo"))) {
        if (event.which === 13) {
            $('#txtEmpLane').focus();
        }
    }
});

$("#txtEmpLane").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusEmailCusAddress, $("#txtEmpLane"))) {
        if (event.which === 13) {
            $('#txtEmpCity').focus();
        }
    }
});

$("#txtEmpCity").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusEmailCusAddress, $("#txtEmpCity"))) {
        if (event.which === 13) {
            $('#txtEmpState').focus();
        }
    }
});

$("#txtEmpState").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusEmailCusAddress, $("#txtEmpState"))) {
        if (event.which === 13) {
            $('#txtEmpPostalCode').focus();
        }
    }
});

$("#txtEmpPostalCode").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusEmailCusAddress, $("#txtEmpPostalCode"))) {
        if (event.which === 13) {
            $('#txtEmpContact').focus();
        }
    }
});

$("#txtEmpContact").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusEmailCusAddress, $("#txtEmpContact"))) {
        if (event.which === 13) {
            $('#txtEmpEmail').focus();
        }
    }
});

$("#txtEmpEmail").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusEmailCusAddress, $("#txtEmpEmail"))) {
        if (event.which === 13) {
            $('#txtEmpEmergencyGuardian').focus();
        }
    }
});

$("#txtEmpEmergencyGuardian").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusEmailCusAddress, $("#txtEmpEmergencyGuardian"))) {
        if (event.which === 13) {
            $('#txtEmpEmergencyContact').focus();
        }
    }
});

$("#txtEmpEmergencyContact").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusEmailCusAddress, $("#txtEmpEmergencyContact"))) {
        if (event.which === 13) {
            $('#btnSaveEmployee').focus();
        }
    }
});

function setButtonState(value) {
    if (value > 0) {
        $("#btnSaveEmployee").attr('disabled', true);
        $("#btnUpdateEmployee").attr('disabled', true);
        $("#btnDeleteEmployee").attr('disabled', true);
    } else {
        $("#btnSaveEmployee").attr('disabled', false);
        $("#btnUpdateEmployee").attr('disabled', false);
        $("#btnDeleteEmployee").attr('disabled',false);
    }
}

