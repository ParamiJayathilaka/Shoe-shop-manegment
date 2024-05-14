$('#btnGetAll').click(function () {
    $.ajax({
        url : "http://localhost:8080/app/api/v1/customers",
        method : "GET",
        success : function (resp) {
            console.log("Success: ", resp);
            for (const customer of resp) {
                console.log(customer.id);
                console.log(customer.name);
                console.log(customer.address);

                const row = `<tr>
                                <td>${customer.id}</td>
                                <td>${customer.name}</td>
                                <td>${customer.address}</td>
                            </tr>`;
                $('#tblCustomers').append(row);
            }

        },
        error : function (error) {
            console.log("error: ", error);
        }
    })
});

$('#btnSave').click(function () {
    /* application/x-www-form-urlencoded */
    /*var data = $('#formCustomers').serialize();
    console.log(data);*/

    const id = $('#txt-id').val();
    const name = $('#txt-name').val();
    const address = $('#txt-address').val();

    const customerObj = {
        id:id,
        name:name,
        address:address
    };

    const jsonObj = JSON.stringify(customerObj);

    $.ajax({
        url: "http://localhost:8080/app/api/v1/customers",
        method: "POST",
        data: jsonObj,
        contentType: "application/json",
        success: function (resp, textStatus, jqxhr) {
            console.log("success: ", resp);
            console.log("success: ", textStatus);
            console.log("success: ", jqxhr);
            /*if(jqxhr.status == 201)
                alert("Added customer successfully")*/
            if (jqxhr.status == 201)
                alert(jqxhr.responseText);
        },
        error: function (jqxhr, textStatus, error) {
            console.log("error: ", jqxhr);
            console.log("error: ", textStatus);
            console.log("error: ", error);
        }
    })
});

$('#btnDelete').click(function () {
    const id = $('#txt-id').val();

    $.ajax({
        url: "http://localhost:8080/app/api/v1/customers/" + id,
        method: "DELETE",
        success: function (resp, textStatus, jqxhr) {
            console.log("success: ", resp);
            console.log("success: ", textStatus);
            console.log("success: ", jqxhr);
        },
        error: function (jqxhr, textStatus, error) {
            console.log("error: ", jqxhr);
            console.log("error: ", textStatus);
            console.log("error: ", error);
        }
    })
});

$('#btnUpdate').click(function () {
    const id = $('#txt-id').val();
    const name = $('#txt-name').val();
    const address = $('#txt-address').val();

    const customerObj = {
        id:id,
        name:name,
        address:address
    };

    const jsonObj = JSON.stringify(customerObj);

    $.ajax({
        url: "http://localhost:8080/app/api/v1/customers/"+id,
        method: "PATCH",
        data: jsonObj,
        contentType: "application/json",
        success: function (resp, textStatus, jqxhr) {
            console.log("success: ", resp);
            console.log("success: ", textStatus);
            console.log("success: ", jqxhr);
        },
        error: function (jqxhr, textStatus, error) {
            console.log("error: ", jqxhr);
            console.log("error: ", textStatus);
            console.log("error: ", error);
        }
    })
});

