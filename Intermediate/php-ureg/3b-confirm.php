<!DOCTYPE html>
<html>
  <head>
    <title>Confirmation Page Demo</title>
  </head>
  <body>
    <?php
    require "2-user-core.php";
    $status = $USR->verify($_GET['i'], $_GET['h']);
    if ($status) { echo "Thank you! Your account has been successfully activated."; }
    else { echo $USR->error; }
    ?>
  </body>
</html>