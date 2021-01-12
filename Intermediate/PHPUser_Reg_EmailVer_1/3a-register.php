<!DOCTYPE html>
<html>
  <head>
    <title>Registration Page Demo</title>
    <style>
    #regForm {
      max-width: 400px;
      background: #f7f7f7;
      padding: 10px;
    }
    #regForm label, #regForm input {
      box-sizing: border-box;
      display: block;
      width: 100%;
      padding: 5px;
    }
    div.error {
      background: #e80000;
      color: white;
      font-weight: bold;
      padding: 10px;
    }
    html, body { font-family: arial, sans-serif; }
    </style>
  </head>
  <body>
    <?php
    // (A) PROCESS SUBMITTED REGISTRATION FORM 
    $show = true;
    if (count($_POST)!=0) {
      require "2-user-core.php";
      $result = $USR->register($_POST['userName'], $_POST['userEmail'], $_POST['userPass'], $_POST['userCpass']);
      if ($result === 1) { $show = false; }
    }

    // (B) SHOW REGISTRATION FORM
    if ($show) { 
    if (isset($USR->error) && $USR->error !== null) {
      echo "<div class='error'>$USR->error</div>"; 
    } ?>
    <h1>REGISTRATION FORM</h1>
    <form id="regForm" method="post">
      <label>Name: </label>
      <input type="text" name="userName" placeholder="Full name" required autofocus value="John Doe"><br>

      <label>Email: </label>
      <input type="email" name="userEmail" placeholder="Email" required value="john@doe.com"><br>

      <label>Password: </label>
      <input type="password" name="userPass" placeholder="Password" required value="12345"><br>

      <label>Confirm Password: </label>
      <input type="password" name="userCpass" placeholder="Confirm Password" required value="12345"><br>

      <input type="submit" value="Register"/>
    </form>
    <?php } 
    
    // (C) SHOW SUCCESSFUL MESSAGE 
    else { ?>
    <h1>ONE MORE STEP...</h1>
    <div>Check your email and click on the link to complete the registration.</div>
    <?php } ?>
  </body>
</html>