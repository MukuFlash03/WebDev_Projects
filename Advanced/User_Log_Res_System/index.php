<!doctype html>
<html lang="en">
<head>
    <title>Signup Form</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div class="container">
        <h1>Signup Form</h1>
        <div class="form-field">
            <label for="Name">Name:</label>
            <input type="text" class="name" name="name" id="name" autocomplete="off" placeholder="Enter your name">
            <small></small>
        </div>

        <div class="form-field">
            <label for="Email">Email:</label>
            <input type="text" class="email" name="email" id="email" autocomplete="off" placeholder="Enter your email ID">
            <small></small>
        </div>

        <div class="form-field">
            <label for="Subject">Subject:</label>
            <input type="text" class="subject" name="subject" id="subject" autocomplete="off" placeholder="Enter email subject">
            <small></small>
        </div>

        <div class="form-field">
            <label for="Message">Message:</label>
            <textarea class="msg" name="msg" id="msg" placeholder="Enter email message"></textarea>
            <small></small>
        </div>

        <div class="form-field">
            <input type="button" onclick="sendEmail()" value="Send An Email" class="btn">
        </div>
    </div>



    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <script src="http://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    <script type="text/javascript">
        function sendEmail() {
            var name = $("#name");
            var email = $("#email");
            var subject = $("#subject");
            var msg = $("#msg");

            if (isNotEmpty(name) && isNotEmpty(email) && isNotEmpty(subject) && isNotEmpty(msg)) {
                $.ajax({
                   url: 'sendEmail.php',
                   method: 'POST',
                   dataType: 'json',
                   data: {
                       name: name.val(),
                       email: email.val(),
                       subject: subject.val(),
                       msg: msg.val()
                   }, success: function (response) {
                        if (response.status == "success") {
                            swal("Welcome Aboard!", "You have registered successfully!", "success");
                        }
                        else {
                            swal("Oops!", "Mail server error. Please try again later.", "error");
                            console.log(response);
                        }
                   }
                });
            }
        }

        function isNotEmpty(caller) {
            if (caller.val() == "") {
                caller.css('border', 'solid 2px #dc3545');
                return false;
            } else
                caller.css('border', 'solid 2px #f0f0f0');

            return true;
        }

    /*
        function sendEmail() {
            var iname = document.querySelector('#name');
            var iemail = document.querySelector('#email');
            var isubject = document.querySelector('#subject');
            var imsg = document.querySelector('#msg');

            if (isNotEmpty(iname) && isNotEmpty(iemail) && isNotEmpty(isubject) && isNotEmpty(imsg)) {
                $.ajax({
                   url: 'sendEmail.php',
                   method: 'POST',
                   dataType: 'json',
                   data: {
                       name: iname,
                       email: iemail,
                       subject: isubject,
                       msg: imsg
                   }, success: function (response) {
                        if (response.status == "success")
                            alert('Email Has Been Sent!');
                        else {
                            alert('Please Try Again!');
                            console.log(response);
                        }
                   }
                });
            }
        }

        function isNotEmpty(caller) {
            const formField = caller.parentElement;
            if (caller == "") {
                formField.classList.remove('success');
                formField.classList.add('error');
                return false;
            } 

            return true;
        }

        
        function isNotEmpty(input) {
            const formField = (input.value.trim()).parentElement;
            if (input.val() == "") {
                formField.classList.remove('success');
                formField.classList.add('error');

                const error = formField.querySelector('small');
                error.textContent = 'Cannot be blank';

                return false;
            } 
            else {
                formField.classList.remove('error');
                formField.classList.add('success');

                const error = formField.querySelector('small');
                error.textContent = '';
            }
            return true;
        }
        */
    </script>

</body>
</html> 