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
            <input type="button" id="sendbtn" name="sendbtn" onclick="sendEmail()" value="Send An Email" class="btn">
            <small></small>
        </div>
    </div>



    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <script type="text/javascript">
        function sendEmail() {
            let name = document.querySelector("#name");
            let email = document.querySelector("#email");
            let subject = document.querySelector("#subject");
            let msg = document.querySelector("#msg");
            let butn = document.querySelector("#sendbtn");

            if (isNotEmpty(name) && isNotEmpty(email) && isNotEmpty(subject) && isNotEmpty(msg)) {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', 'sendEmail.php', true);
                // xhr.open('GET', 'sendEmail.php', true);
                // xhr.responseType = 'json';
                xhr.responseType = 'text';
                const data = {
                       name: name.value.trim(),
                       email: email.value.trim(),
                       subject: subject.value.trim(),
                       msg: msg.value.trim()
                };

                console.log(data);
            

                xhr.onreadystatechange = function() { 
                    if (this.readyState == 4 && this.status == 200) { 
                       let myObj = JSON.parse(this.responseText); 


                        let ff = butn.parentElement;
                        let err = ff.querySelector('small');
                        err.textContent = "Response: " + myObj;

                        console.log(myObj);
                    }
                };
                
                xhr.send(JSON.stringify(data));
                // xhr.send();

                /*
                // Returns empty.
                xhr.onload = function () {
                    const result = xhr.response;
                    if (xhr.readyState === xhr.DONE) {
                        if (xhr.status === 200) {
                            console.log(xhr.response);
                            console.log(xhr.responseText);
                            console.log(result.status);
                            console.log(result.response);
                        }
                    }
                };
                */

                
                /*
                xhr.onload = function(result) {
                    if (this.status == 200) {
                        let ff = butn.parentElement;
                        let err = ff.querySelector('small');
                        err.textContent = "Response: " + result['response'] + "\t" + "Status: " + result['status'];

                        console.log(result);

                        if (result.status === "status") {
                            console.log(result.status);
                        // alert(this.status + ' ' + "Success");
                        swal("Welcome Aboard!", "You have registered successfully! " + this.status, "success");
                        }
                        else if (result.status === 200 || result.statusText === "OK") {
                            console.log(result.status);
                            swal("Oops!", "Duh." + result.response, "error");
                        }
                        else {
                            console.log("DUH" + result.response + "Duh");
                            console.log(JSON.stringify(data));
                        // alert(xhr.status + ' ' + "Mail Error" + '\n');
                        swal("Oops!", "Mail server error. " + result.response, "error");
                        }   
                        console.log(xhr.responseURL);
                    }
                }
                */

                // xhr.setRequestHeader('Content-Type', 'application/json');
                // xhr.setRequestHeader('Accept', '*/*'); // accept all

                // xhr.send(JSON.stringify(data));
            }
        }

        function isNotEmpty(input) {
            let caller = input.value.trim();
            const formField = input.parentElement;
            if (caller === "") {
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

    </script>

</body>
</html> 