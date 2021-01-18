<?php
    use PHPMailer\PHPMailer\PHPMailer;

    if (isset($_POST['name']) && isset($_POST['email'])) {
        $name = $_POST['name'];
        $email = $_POST['email'];
        $subject = $_POST['subject'];
        $msg = $_POST['msg'];

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
?>
