generateEmployeeID();

function generateEmployeeID() {
    $("#txtEmpCode").val("E00-001");
    $.ajax({
        url: "http://localhost:8080/employee/employeeIdGenerate",
        method: "GET",
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
            console.error("Error generating customer ID:", statusText, error);
        }
    });
}

////////////save/////

$('#btnSaveEmployee').click(function (){
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
        url: 'http://localhost:8080/employee/save',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(employee),
        success: function (response) {
            alert('Employee information saved successfully!');
            console.log(employee);
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
        contentType: 'application/json',
        data: JSON.stringify(employee),
        success: function (response) {
            alert('employee information update successfully!');
            console.log(employee);
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

    $.ajax({
        url: 'http://localhost:8080/employee/' + empCode,
        type: 'DELETE',
        success: function (response) {
            alert('employee information deleted successfully!');
            console.log('Deleted employee with code:', empCode);
            // getAll();
        },
        error: function (xhr, status, error) {
            console.error('Error deleting employee information:', error);
            alert('employee Not Found!');
        }
    });
});



