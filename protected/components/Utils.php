<?php

/**
 * UserIdentity represents the data needed to identity a user.
 * It contains the authentication method that checks if the provided
 * data can identity the user.
 */
class Utils
{
    function __construct()
    {

    }

    public function init()
    {

    }

    function formatMoney($number, $fractional = false)
    {
        if ($fractional) {
            $number = sprintf('%.2f', $number);
        }
        while (true) {
            $replaced = preg_replace('/(-?\d+)(\d\d\d)/', '$1,$2', $number);
            if ($replaced != $number) {
                $number = $replaced;
            } else {
                break;
            }
        }
        return $number;
    }

// (c) 2007 Lukasz Grzegorz Maciak
// Code Snippet ID: 5e8cf864-db67-4a30-9857-2ce8f3fcb1d5

// takes a database resource returned by a query
    function csv_from_mysql_resource($resource)
    {
        $output = "";
        $headers_printed = false;

        while ($row = mysql_fetch_array($resource, MYSQL_ASSOC)) {
            // print out column names as the first row
            if (!$headers_printed) {
                $output .= join(',', array_keys($row)) . "\n";
                $headers_printed = true;
            }

            // remove newlines from all the fields and
            // surround them with quote marks
            foreach ($row as &$value) {
                $value = str_replace("\r\n", "", $value);
                $value = "\"" . $value . "\"";
            }

            $output .= join(',', $row) . "\n";

        }

        // set the headers
        $size_in_bytes = strlen($output);
        header("Content-type: application/vnd.ms-excel");
        header("Content-disposition:  attachment; filename=export_data.csv; size=$size_in_bytes");

        // send output
        print $output;
        exit;
    }

    public function enviarCorreo(
        $mailDestinatario,
        $cuerpo,
        $nombreDestinatario,
        $asunto,
        $archivoAdjunto = array()
    )
    {

        Yii::import('application.extensions.phpmailer.JPhpMailer');
        $mail = new JPhpMailer();
        $mail->IsSMTP();
        $mail->Host = "smtp.googlemail.com:465";
        $mail->SMTPSecure = "ssl";
        $mail->SMTPAuth = true;
        $mail->CharSet = "utf-8";
        $mail->Username = "notificaciones.moodprint@gmail.com";
        $mail->Password = "mailsautomaticos";
        $mail->SetFrom("notificaciones.moodprint@gmail.com", "Equipo Moodprint");
        $mail->AddCC("kristhian@appfactory.com.mx");

        $mail->Subject = $asunto;
        $mail->Timeout = 180; //Tiempo de espera
        $bodyMessaje = $cuerpo;
        //Cuerpo alternativo para los correros q no aceptan html
        $mail->AltBody = '';
        $mail->MsgHTML($bodyMessaje);


        if (count($archivoAdjunto) > 0 && $archivoAdjunto != null) {

            foreach ($archivoAdjunto as $ruta) {
                $mail->AddAttachment($ruta);
            }
        }
        $mail->AddAddress($mailDestinatario);

        return $mail->Send();
    }

}