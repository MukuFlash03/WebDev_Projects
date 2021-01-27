<?php
    use PHPMailer\PHPMailer\PHPMailer;
 
    /* For POST
    // Read the input stream and Decode the JSON object
    $dataIn = json_decode(file_get_contents("php://input"), true);
    $dataOut = json_encode($dataIn);
    echo $dataOut;
     */
    
    /* For GET
    $myObj = new stdClass(); 
    $myObj->name = "Geeks"; 
    $myObj->college="NIT"; 
    $myObj->gender = "Male"; 
    $myObj->age = 30; 
    $myJSON = json_encode($myObj); 
    echo $myJSON; 
    */

    
    $dataIn = json_decode(file_get_contents("php://input"), true);

    if (isset($dataIn['name']) && isset($dataIn['email'])) {
        $name = $dataIn['name'];
        $email = $dataIn['email'];
        $subject = $dataIn['subject'];
        $msg = $dataIn['msg'];

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
        } 
        else {
            $status = "failed";
            $response = "Mail server error."; //.$mail->ErrorInfo;
        }
        
        
        $myObj = new stdClass();
        $myObj->name = $name;
        $myObj->email = $email;
        $myObj->subject = $subject;
        $myObj->msg = $msg;
        $myObj->status = $status;
        $myObj->response = $response;
        $dataOut = json_encode($myObj);
        exit($dataOut);

    } // main if 
    // $dataOut = json_encode($dataIn);
    // echo $dataOut;
?>
