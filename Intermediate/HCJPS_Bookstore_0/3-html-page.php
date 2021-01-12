<!DOCTYPE html>
<html>
  <head>
    <title>
      Products Demo Page
    </title>
    
    <!-- (A) CSS & JS -->
    <link href="4-style.css" rel="stylesheet">
    <script src="5-script.js"></script>
  </head>
  <body>
    <!-- (B) BOOKS LIST -->
    <h1>OUR BOOKS</h1>
    <div id="our-books">
      <?php 
      require "2-products.php";
      foreach ($products as $p) { ?>
      <div class="book-wrap" data-id="<?=$p['product_id']?>">
        <div class="book-title"><?=$p['product_name']?></div>
        <div class="book-desc"><?=$p['product_description']?></div>
      </div>
      <?php } ?>
    </div>
  </body>
</html>