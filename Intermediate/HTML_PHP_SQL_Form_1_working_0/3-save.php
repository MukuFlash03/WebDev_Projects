<?php
// (A) DATABASE CREDENTIALS - CHANGE TO YOUR OWN!
define('DB_HOST', 'localhost');
define('DB_NAME', 'JSTest');
define('DB_CHARSET', 'utf8');
define('DB_USER', 'root');
define('DB_PASSWORD', '');

// (B) CONNECT TO DATABASE
$error = null;
try {
  $pdo = new PDO(
    "mysql:host=" . DB_HOST . ";charset=" . DB_CHARSET . ";dbname=" . DB_NAME,
    DB_USER, DB_PASSWORD, [ 
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]
  );
} catch (Exception $ex) { $error = $ex->getMessage(); }

// (C) INSERT
if (is_null($error)) {
  try {
    $sql = "INSERT INTO `hpsForm_1` (`email`, `name`, `color`) VALUES (?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$_POST['email'], $_POST['name'], $_POST['color']]);
  } catch (Exception $ex) { $error = $ex->getMessage(); }
}

// (X) SEND EMAIL
if (is_null($error)) {
  $message = "";
  foreach ($_POST as $k=>$v) { $message .= "$k : $v\r\n"; }
  if (!mail("admin@site.com", "Survey Received", $message)) {
    $error = "Failed to send email";
  }
}


// (D) RESULTS
echo is_null($error) ? "OK" : $error ;

// https://code-boxx.com/save-form-php-mysql/