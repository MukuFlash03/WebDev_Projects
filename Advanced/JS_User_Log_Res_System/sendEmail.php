<?php
    use PHPMailer\PHPMailer\PHPMailer;
 
    // /*
// Read the input stream and Decode the JSON object
    $dataIn = json_decode(file_get_contents("php://input"), true);
    $dataOut = json_encode($dataIn);
    echo $dataOut;
    // */
    
    /*
    $myObj = new stdClass(); 
    $myObj->name = "Geeks"; 
    $myObj->college="NIT"; 
    $myObj->gender = "Male"; 
    $myObj->age = 30; 
    $myJSON = json_encode($myObj); 
    echo $myJSON; 
    */

    /*
    if (isset($_POST['data'['name']]) && isset($_POST['data'['email']])) {
        $name = $_POST['data'['name']];
        $email = $_POST['data'['email']];
        $subject = $_POST['data'['subject']];
        $msg = $_POST['data'['msg']];

        $adminEmail = "cosmicflash03@gmail.com";
        $adminPass = 'zffxthrjzbhjdzao';
        $adminName = 'Cosmic Flash';

        require_once "PHPMailer/PHPMailer.php";
        require_once "PHPMailer/SMTP.php";
        require_once "PHPMailer/Exception.php";

        $mail = new PHPMailer();

        //SMTP Settings
        $mail->isSMTP();
        $mail->Host = "smtp.gmail.com";
        $mail->SMTPAuth = true;
        $mail->Username = $adminEmail;
        $mail->Password = $adminPass;
        $mail->Port = 465; //587
        $mail->SMTPSecure = "ssl"; //tls

        //Email Settings
        $mail->isHTML(true);
        $mail->setFrom($adminEmail, $adminName);
        $mail->addAddress($email);
        $mail->Subject = $subject;
        $mail->Body = $msg;

        if ($mail->send()) {
            $status = "success";
            $response = "You have registered successfully!";
        } else {
            $status = "failed";
            $response = "Mail server error.".$mail->ErrorInfo;
        }

         echo "Test";
        // exit("Test");
        // echo json_encode(array("status" => $status, "response" => $response));
       // exit(json_encode(array("status" => $status, "response" => $response)));
    }
    */
  //  echo "Test";
?>
