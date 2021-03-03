<?php
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
    $this->stmt = $this->pdo->prepare("SELECT * FROM `users` WHERE `user_email`=?");
    $this->stmt->execute([$email]);
    return $this->stmt->fetch();
  }

  // (D) VERIFY EMAIL PASSWORD
  // SESSION MUST BE STARTED!
  function login ($email, $password) {
    // (D1) ALREADY SIGNED IN
    if (isset($_SESSION['user'])) { return true; }
    
    // (D2) GET USER
    $user = $this->getByEmail($email);
    if (!is_array($user)) { return false; }

    // (D3) USER STATUS
    if ($user['user_status']!="A") { return false; }

    // (D4) VERIFY PASSWORD + REGISTER SESSION
    if (password_verify($password, $user['user_password'])) {
      $_SESSION['user'] = [];
      foreach ($user as $k=>$v) {
        if ($k!="user_password") { $_SESSION['user'][$k] = $v; }
      }
      return true;
    }
    return false;
  }
  
  // (E) SAVE USER
  function save ($name, $email, $pass, $status, $data=null, $id=null) {
    if ($id===null) {
      $sql = "INSERT INTO `users` (`user_name`, `user_email`, `user_password`, `user_status`, `user_data`) VALUES (?,?,?,?,?)";
      $data = [$name, $email, $pass, $status, $data];
    } else {
      $sql = "UPDATE `users` SET `user_name`=?, `user_email`=?, `user_password`=?, `user_status`=?, `user_data`=? WHERE `user_id`=?";
      $data = [$name, $email, $pass, $status, $data, $id];
    }
    try {
      $this->stmt = $this->pdo->prepare($sql);
      $this->stmt->execute($data);
      return true;
    } catch (Exception $ex) {
      $this->error = $ex->getMessage();
      return false;
    }
  }
}

// (F) DATABASE SETTINGS - CHANGE TO YOUR OWN!
define('DB_HOST', 'localhost');
define('DB_NAME', 'JSTest');
define('DB_CHARSET', 'utf8');
define('DB_USER', 'root');
define('DB_PASSWORD', '');

// (G) CREATE USER OBJECT
$USR = new Users();
