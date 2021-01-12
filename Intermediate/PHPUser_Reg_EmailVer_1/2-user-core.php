<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'path/to/PHPMailer/src/Exception.php';
require 'path/to/PHPMailer/src/PHPMailer.php';
require 'path/to/PHPMailer/src/SMTP.php';

class Users {
  // (A) CONSTRUCTOR - CONNECT DATABASE
  private $pdo = null;
  private $stmt = null;
  public $error = null;
  function __construct () {
    try {
      $this->pdo = new PDO(
        "mysql:host=".DB_HOST.";dbname=".DB_NAME.";charset=".DB_CHARSET,
        DB_USER, DB_PASSWORD, [
          PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
          PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]
      );
    } catch (Exception $ex) { exit($ex->getMessage()); }
  }

  // (B) DESTRUCTOR - CLOSE CONNECTION
  function __destruct () {
    if ($this->stmt !== null) { $this->stmt = null; }
    if ($this->pdo !== null) { $this->pdo = null; }
  }

  // (C) GET USER BY EMAIL
  function getByEmail ($email) {
    $this->stmt = $this->pdo->prepare("SELECT * FROM `psEmailVer` WHERE `user_email`=?");
    $this->stmt->execute([$email]);
    return $this->stmt->fetch();
  }

  // (D) GET USER BY ID
  function getByID ($id) {
    $this->stmt = $this->pdo->prepare("SELECT * FROM `psEmailVer` WHERE `user_id`=?");
    $this->stmt->execute(array($id));
    return $this->stmt->fetch();
  }

  // (E) REGISTER NEW USER
  // RETURN CODE
  // 0 - ERROR, 1 - OK, 2 - REGISTERED
  // 3 - REGISTERED NOT ACTIVATED, 4 - REGISTERED BANNED
  function register ($name, $email, $pass, $cpass) {
    // (E1) CHECK IF USER REGISTERED
    $check = $this->getByEmail($email);
    if (is_array($check)) { switch ($check['user_status']) {
      default:
        $this->error = "$email is already registered.";
        return 0; break;
      case "A":
        $this->error = "$email is already registered.";
        return 2; break;
      case "P":
        $this->error = "$email has a pending activation.";
        return 3; break;
      case "S":
        $this->error = "$email has been suspended.";
        return 4; break;
    }}

    // (E2) CHECK PASSWORD
    if ($pass != $cpass) {
      $this->error = "Passwords do not match.";
      return 0;
    }
    
    // (E3) GENERATE NOT-SO-RANDOM TOKEN HASH FOR VERIFICATION
    $token = md5(date("YmdHis") . $email);
    
    // (E4) INSERT INTO DATABASE
    try {
      $this->stmt = $this->pdo->prepare(
        "INSERT INTO `psEmailVer` (`user_name`, `user_email`, `user_password`, `user_data`) VALUES (?, ?, ?, ?)"
      );
      $this->stmt->execute([
        $name, $email, password_hash($pass, PASSWORD_DEFAULT), 
        json_encode(["confirm"=>$token])
      ]);
      $this->lastID = $this->pdo->lastInsertId();
    } catch (Exception $ex) {
      $this->error = $ex;
      return 0;
    }
    
    // (E5) SEND CONFIRMATION EMAIL
    // ! CHANGE TO YOUR OWN MESSAGE + URL !
    $url = "http://localhost/projects/PHPUser_Reg_EmailVer_1/3b-confirm.php";
    $msg = sprintf(
      "Visit this <a href='%s?i=%u&h=%s'>link</a> to complete your registration.",
      $url, $this->lastID, $token
    );
    if (@mail($email, "Confirm your email", $msg)) { return 1; }
    else {
      $this->error = "Error sending out email";
      return 0;
    }
  }

  // (F) VERIFY REGISTRATION
  function verify ($id, $hash) {
    // (F1) GET + CHECK THE USER
    $user = $this->getByID($id);
    if ($user === false) {
      $this->error = "User not found.";
      return false;
    }
    if ($user['user_status']=="A") {
      $this->error = "Account already activated.";
      return false;
    }
    if ($user['user_status']=="S") {
      $this->error = "Account is suspended.";
      return false;
    }

    // (F2) HASH TOKEN CHECK
    $confirm = json_decode($user['user_data'], 1)['confirm'];
    if ($confirm != $hash) { 
      $this->error = "Invalid token.";
      return false; 
    }
    
    // (F3) ACTIVATE ACCOUNT IF OK
    try {
      $this->stmt = $this->pdo->prepare("UPDATE `psEmailVer` SET `user_status`='A' WHERE `user_id`=?");
      $this->stmt->execute([$id]);
      $this->lastID = $this->pdo->lastInsertId();
    } catch (Exception $ex) {
      $this->error = $ex;
      return false;
    }

    // (F4) SEND WELCOME MESSAGE IF YOU WANT
    // mail ($user['user_email'], "WELCOME!", "Welcome message here.");
    return true;
  }
}

// (G) DATABASE SETTINGS - CHANGE TO YOUR OWN!
define('DB_HOST', 'localhost');
define('DB_NAME', 'JSTest');
define('DB_CHARSET', 'utf8');
define('DB_USER', 'root');
define('DB_PASSWORD', '');

// (H) NEW USER OBJECT
$USR = new Users();
