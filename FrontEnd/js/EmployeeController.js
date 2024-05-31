$(document).ready(function () {
    generateEmployeeID();
    getAll();

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
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: 'http://localhost:8080/employee/save',
            type: 'POST',
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

        $.ajax({
            url: 'http://localhost:8080/employee/' + empCode,
            type: 'DELETE',
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

        $.ajax({
            url: "http://localhost:8080/employee/getAllEmployee",
            method: "GET",
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
// generateEmployeeID();
//
// function generateEmployeeID() {
//     $("#txtEmpCode").val("E00-001");
//     $.ajax({
//         url: "http://localhost:8080/employee/employeeIdGenerate",
//         method: "GET",
//         contentType: "application/json",
//         dataType: "json",
//         success: function (resp) {
//             let id = resp.value;
//             console.log("id: " + id);
//             if (id) {
//                 let tempId = parseInt(id.split("-")[1]) + 1;
//                 let newId = "E00-" + tempId.toString().padStart(3, '0');
//                 $("#txtEmpCode").val(newId);
//             }
//         },
//         error: function (ob, statusText, error) {
//             console.error("Error generating employee ID:", statusText, error);
//         }
//     });
// }
//
//
//
// $('#btnSaveEmployee').click(function () {
//     var formData = new FormData();
//     var image = $("#txtEmpProfilePic")[0].files[0];
//
//     if (!image) {
//         alert('Please upload a profile picture');
//         return;
//     }
//
//     let empCode = $('#txtEmpCode').val();
//     let employeeName = $('#txtEmpName').val();
//     let gender = $('#txtEmpGender').val();
//     let status = $('#txtEmpStatus').val();
//     let designation = $('#txtEmpDesignation').val();
//     let accessRole = $('#txtEmpAccessRole').val();
//     let dob = $('#txtEmpDob').val();
//     let dateOfJoin = $('#txtEmpDateOfJoin').val();
//     let branch = $('#txtEmpAttachedBranch').val();
//     let addressLine1 = $('#txtEmpBuildingNo').val();
//     let addressLine2 = $('#txtEmpLane').val();
//     let addressLine3 = $('#txtEmpCity').val();
//     let addressLine4 = $('#txtEmpState').val();
//     let addressLine5 = $('#txtEmpPostalCode').val();
//     let contactNum = $('#txtEmpContact').val();
//     let email = $('#txtEmpEmail').val();
//     let emergency = $('#txtEmpEmergencyGuardian').val();
//     let emergencyContact = $('#txtEmpEmergencyContact').val();
//
//     formData.append('employeeProfilePic', image);
//     formData.append('empCode', empCode);
//     formData.append('employeeName', employeeName);
//     formData.append('gender', gender);
//     formData.append('status', status);
//     formData.append('designation', designation);
//     formData.append('accessRole', accessRole);
//     formData.append('dob', dob);
//     formData.append('dateOfJoin', dateOfJoin);
//     formData.append('branch', branch);
//     formData.append('addressLine1', addressLine1);
//     formData.append('addressLine2', addressLine2);
//     formData.append('addressLine3', addressLine3);
//     formData.append('addressLine4', addressLine4);
//     formData.append('addressLine5', addressLine5);
//     formData.append('contactNum', contactNum);
//     formData.append('email', email);
//     formData.append('emergency', emergency);
//     formData.append('emergencyContact', emergencyContact);
//
//     $.ajax({
//         url: 'http://localhost:8080/employee/save',
//         type: 'POST',
//         contentType: false,
//         processData: false,
//         data: formData,
//         success: function (response) {
//             alert('Employee information saved successfully!');
//             console.log(response);
//             getAll();
//         },
//         error: function (xhr, status, error) {
//             console.error('Error saving employee information:', error);
//             alert('Employee Not Found!');
//         }
//     });
// });
//
//
//
// $('#btnUpdateEmployee').click(function () {
//     var formData = new FormData();
//     var image = $("#txtEmpProfilePic")[0].files[0];
//
//     let empCode = $('#txtEmpCode').val();
//     let employeeName = $('#txtEmpName').val();
//     let gender = $('#txtEmpGender').val();
//     let status = $('#txtEmpStatus').val();
//     let designation = $('#txtEmpDesignation').val();
//     let accessRole = $('#txtEmpAccessRole').val();
//     let dob = $('#txtEmpDob').val();
//     let dateOfJoin = $('#txtEmpDateOfJoin').val();
//     let branch = $('#txtEmpAttachedBranch').val();
//     let addressLine1 = $('#txtEmpBuildingNo').val();
//     let addressLine2 = $('#txtEmpLane').val();
//     let addressLine3 = $('#txtEmpCity').val();
//     let addressLine4 = $('#txtEmpState').val();
//     let addressLine5 = $('#txtEmpPostalCode').val();
//     let contactNum = $('#txtEmpContact').val();
//     let email = $('#txtEmpEmail').val();
//     let emergency = $('#txtEmpEmergencyGuardian').val();
//     let emergencyContact = $('#txtEmpEmergencyContact').val();
//
//     if (image) {
//         formData.append('employeeProfilePic', image);
//     }
//     formData.append('empCode', empCode);
//     formData.append('employeeName', employeeName);
//     formData.append('gender', gender);
//     formData.append('status', status);
//     formData.append('designation', designation);
//     formData.append('accessRole', accessRole);
//     formData.append('dob', dob);
//     formData.append('dateOfJoin', dateOfJoin);
//     formData.append('branch', branch);
//     formData.append('addressLine1', addressLine1);
//     formData.append('addressLine2', addressLine2);
//     formData.append('addressLine3', addressLine3);
//     formData.append('addressLine4', addressLine4);
//     formData.append('addressLine5', addressLine5);
//     formData.append('contactNum', contactNum);
//     formData.append('email', email);
//     formData.append('emergency', emergency);
//     formData.append('emergencyContact', emergencyContact);
//
//     $.ajax({
//         url: 'http://localhost:8080/employee/update',
//         type: 'PATCH',
//         contentType: false,
//         processData: false,
//         data: formData,
//         success: function (response) {
//             alert('Employee information updated successfully!');
//             console.log(response);
//             getAll();
//         },
//         error: function (xhr, status, error) {
//             console.error('Error updating employee information:', error);
//             alert('Employee Not Found!');
//         }
//     });
// });
//
// $('#btnDeleteEmployee').click(function () {
//     let empCode = $('#txtEmpCode').val();
//
//     $.ajax({
//         url: 'http://localhost:8080/employee/' + empCode,
//         type: 'DELETE',
//         success: function (response) {
//             alert('Employee information deleted successfully!');
//             console.log('Deleted employee with code:', empCode);
//             getAll();
//         },
//         error: function (xhr, status, error) {
//             console.error('Error deleting employee information:', error);
//             alert('Employee Not Found!');
//         }
//     });
// });
//
// $('#txtEmpProfilePic').change(function() {
//     var fileInput = $('#txtEmpProfilePic')[0];
//     var file = fileInput.files[0];
//
//     if (file && (file.type.includes('image'))) {
//         var reader = new FileReader();
//         reader.onload = function (e) {
//             $('#img').attr('src', e.target.result);
//         };
//         reader.readAsDataURL(file);
//     } else {
//         alert('Please select a valid image file.');
//     }
// });
