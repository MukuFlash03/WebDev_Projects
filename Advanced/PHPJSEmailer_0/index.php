<!doctype html>
<html lang="en">
<head>
    <title>Signup Form</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div class="container">
        <form id="signup" class="form">
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
                <label for="Password">Password:</label>
                <input type="password" class="password" name="password" id="password" autocomplete="off" placeholder="Enter a strong password">
                <small></small>
            </div>

            <div class="form-field">
                <label for="Confirm-password">Confirm Password:</label>
                <input type="password" class="confirm-password" name="confirm-password" id="confirm-password" autocomplete="off" placeholder="Reenter your password">
                <small></small>
            </div>

            <div class="form-field">
                <input type="submit" id="sendbtn" name="sendbtn" value="Send An Email" class="btn">
                <small></small>
            </div>

            <div class="form-field">
                <input type="reset" id="resbtn" name="resbtn" value="Reset" class="btn">
                <small></small>
            </div>
        </form>
    </div>

    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <script type="text/javascript" src="registerScript.js"></script>

</body>
</html> 