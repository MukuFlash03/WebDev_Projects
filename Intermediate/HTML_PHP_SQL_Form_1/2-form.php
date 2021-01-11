<!DOCTYPE html>
<html>
  <head>
    <title>Favorite Color Survey</title>
  </head>
  <body>
    <?php
    // (A) SAVE SURVEY FORM ON SUBMIT
    if (isset($_POST['email'])) {
      require "3-save.php";
    }
    ?>

    <!-- (B) SURVEY FORM -->
    <form method="post">
      <label for="email">Email</label>
      <input type="email" name="email" required/>
      <label for="name">Name</label>
      <input type="text" name="name" required/>
      <label for="color">Favorite Color</label>
      <input type="text" name="color" required/>
      <input type="submit" value="Go!"/>
    </form>
  </body>
</html>