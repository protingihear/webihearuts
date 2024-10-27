$(document).ready(function () {
    // Fetch user data from the JSON file using jQuery
    $.ajax({
        url: "https://api.jsonbin.io/v3/qs/671e50fae41b4d34e449b3a9", //sesuaiin lg ntar klo json expire 
        method: "GET",
        dataType: "json",
        success: function (user) {
            $('#name').val(user.record.username || '');
            $('#bio').val(user.record.bio || '');
            $('#email').val(user.record.email || '');
            $('#gender-display').text(user.record.gender === "P" ? "Perempuan" : "Laki-Laki");
            
            if (user.record.profilePic) {
                $('#profile-pic').attr('src', user.record.profilePic);
            }
        },
        error: function () {
            console.log("Error fetching data from JSONBin.");
        }
    });    

    const $editButton = $(".btn.btn-primary");
    $editButton.on("click", function () {
        if ($editButton.text() === "Edit") {
            $editButton.text("Save");
            enableEditing();
        } else {
            $editButton.text("Edit");
            saveData();
        }
    });

    // Ganti PP
    $('#profile-pic-input').on("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                $('#profile-pic').attr('src', e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });
});

function enableEditing() {
    $('#bio, #name, #email, #password').removeAttr('disabled');
    $('#gender-view').addClass("d-none");
    $('#gender-edit').removeClass("d-none");

    $('.edit-icon').show();
    $('.profile-edit-btn').show();

    const currentGender = $('#gender-display').text() === "Perempuan" ? "P" : "L";
    $(`#gender-${currentGender.toLowerCase()}`).prop('checked', true);
}

function saveData() {
    const userData = {
        username: $('#name').val(),
        bio: $('#bio').val(),
        email: $('#email').val(),
        password: $('#password').val(),
        gender: $('input[name="gender"]:checked').val(),
        profilePic: $('#profile-pic').attr('src')
    };

    // CEK UBAH DATA
    console.log("Simulated save:", JSON.stringify(userData));

    $('#gender-display').text(userData.gender === "P" ? "Perempuan" : "Laki-Laki");
    $('#gender-view').removeClass("d-none");
    $('#gender-edit').addClass("d-none");
    
    $('#bio, #name, #email, #password').attr('disabled', true);
    $('.edit-icon').hide();
    $('.profile-edit-btn').hide();
}
