$("#btnSingUp").click(function() {
    let value = {
        email: $("#upUser_Name").val(),
        password: $("#upPassword").val(),
        role: $('#role_Type').val()
    };
    console.log(value);
    $.ajax({
        url:  "http://localhost:8080/api/v1/auth/signup",
        method: "POST",
        data: JSON.stringify(value),
        contentType: "application/json",
        success: function (res, textStatus, jsXH) {
            localStorage.setItem('accessToken', res.token);
            Swal.fire({
                icon: "success",
                title: "User Added Successfully",
                showConfirmButton: true,
                timer: 1500
            });
        },
        error: function (ob, textStatus, error) {
            Swal.fire({
                icon: "error",
                title: "Error User Not Added",
                showConfirmButton: false,
                timer: 1500
            });
        }
    });
});

/////login///

$("#btnLogin").click(function() {
    let value = {
        email: $("#user_Name").val(),
        password: $("#password").val(),
    };
    console.log(value);
    $.ajax({
        url: "http://localhost:8080/api/v1/auth/signin",
        method: "POST",
        data: JSON.stringify(value),
        contentType: "application/json",
        success: function (res, textStatus, jsXH) {
            localStorage.setItem('email', value.email);
            localStorage.setItem('password', value.password);
            localStorage.setItem('accessToken', res.token);
            console.log("User SignIn Successfully " + res.token);
            fetchUserDetails(value.email, res.token);
        },
        error: function (ob, textStatus, error) {
            Swal.fire({
                icon: "error",
                title: "Error Sign in",
                showConfirmButton: false,
                timer: 1500
            });
        }
    });
});

////token ////
function isTokenExpired(token) {
    const jwtPayload = JSON.parse(atob(token.split('.')[1]));
    const expiryTime = jwtPayload.exp * 1000;
    return Date.now() >= expiryTime;
}

///// authentication request ////

function performAuthenticatedRequest() {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken || isTokenExpired(accessToken)) {
        $.ajax({
            url:  "http://localhost:8080/api/v1/auth/signin",
            method: "POST",
            data: JSON.stringify({
                email: localStorage.getItem('email'),
                password: localStorage.getItem('password'),
            }),
            contentType: "application/json",
            success: function (res, textStatus, jsXH) {
                localStorage.setItem('accessToken', res.token);
                console.log("Sign in successfully, new token: " + res.token);
            },
            error: function (ob, textStatus, error) {
                console.log("Token renew sign in error " + error);
            }
        });
    }
}

/////////

function fetchUserDetails(email, token) {
    $.ajax({
        url: "http://localhost:8080/api/v1/auth/search/" + email,
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + token
        },
        dataType: "json",
        success: function (res, textStatus, xhr) {
            localStorage.setItem('role', res.role);
            localStorage.setItem('cashier', email);

            then((result) => {
                if (result.isConfirmed) {
                    if (res.role === "ADMIN") {
                        window.location.href = "AdminPanel.html";
                    } else if(res.role === "USER"){
                        window.location.href = "UserDashBoard.html";
                    }
                }
            });
        },
        error: function (ob, textStatus, error) {
            Swal.fire({
                icon: "error",
                title: "Error fetching user details",
                showConfirmButton: false,
                timer: 1500
            });
        }
    });
}