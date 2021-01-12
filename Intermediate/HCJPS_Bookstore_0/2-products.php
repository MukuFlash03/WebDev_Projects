<?php
// (A) CONNECT TO DATABASE
// ! CHANGE SETTINGS TO YOUR OWN !
define('DB_HOST', 'localhost');
define('DB_NAME', 'JSTest');
define('DB_CHARSET', 'utf8');
define('DB_USER', 'root');
define('DB_PASSWORD', '');
try {
  $pdo = new PDO(
    "mysql:host=" . DB_HOST . ";charset=" . DB_CHARSET . ";dbname=" . DB_NAME,
    DB_USER, DB_PASSWORD, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
  );
} catch (Exception $ex) {
  die($ex->getMessage());
}

// (B) GET PRODUCTS
$stmt = $pdo->prepare("SELECT * FROM `hcjpsBookstore_0`");
$stmt->execute();
$products = $stmt->fetchAll(PDO::FETCH_NAMED);
?>
