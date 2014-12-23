<?php
/**
 * Created by PhpStorm.
 * User: appfactory-Roberto Cruz
 * Date: 19-12-2014 * Time: 11:15 PM
 */



$pageTitle = $this->pageTitle = Yii::app()->name;
$baseUrl = Yii::app()->request->baseUrl;

date_default_timezone_set("Mexico/General");
Yii::createComponent('application.extensions.tcpdf.ETcPdf',
    'P', 'cm', 'A4', true, 'UTF-8');


// Extend the TCPDF class to create custom Header and Footer
class MYPDF extends TCPDF {

    //Page header
    public function Header() {
        // Logo
        // $image_file = K_PATH_IMAGES.'logo_example.jpg';
        $image_file = "img/avatar1.jpg";
        $this->Image($image_file, 10, 10, 15, '', 'JPG', '', 'T', false, 300, '', false, false, 0, false, false, false);
        // Set font
        $this->SetFont('helvetica', 'B', 14);
        // Title
        $this->Cell(0, 15, 'Powered by Roberto Cruz', 0, false, 'C', 0, '', 0, false, 'M', 'M');
    }

    // Page footer
    public function Footer() {
        // Position at 15 mm from bottom
        $this->SetY(-15);
        // Set font
        $this->SetFont('helvetica', 'I', 8);
        // Page number
        $this->Cell(0, 10, 'Página  '.$this->getAliasNumPage().'/'.$this->getAliasNbPages(), 0, false, 'C', 0, '', 0, false, 'T', 'M');
    }
}

// create new PDF document
$pdf = new MYPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// set document information
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Nicola Asuni');
$pdf->SetTitle('TCPDF Example 003');
$pdf->SetSubject('TCPDF Tutorial');
$pdf->SetKeywords('TCPDF, PDF, example, test, guide');

// set default header data
$pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, PDF_HEADER_TITLE, PDF_HEADER_STRING);

// set header and footer fonts
$pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
$pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

// set default monospaced font
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

// set margins
$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
$pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
$pdf->SetFooterMargin(PDF_MARGIN_FOOTER);

// set auto page breaks
$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

// set image scale factor
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

// set some language-dependent strings (optional)
if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
    require_once(dirname(__FILE__).'/lang/eng.php');
    $pdf->setLanguageArray($l);
}

// ---------------------------------------------------------

// set font
$pdf->SetFont('times', 'BI', 8);

// add a page
$pdf->AddPage();

// set some text to print
$txt = <<<EOD
Reporte
EOD;

$html="";
$html.="<table style='border: solid 1px black;' class='table table-bordered'><thead>
</thead><tbody>";

if(count($trayectoriaLaboral)==0|| $trayectoriaLaboral==null)
    return;


foreach(   $trayectoriaLaboral as $itemModel ){
    $html.="<tr>";
    foreach($itemModel as $columnModel){
        $html.="<td>";
        $html.=$columnModel;
        $html.="</td>";
    }
    $html.="</tr>";
}
$html.="</tbody>";
$html.="</table>";




// print a block of text using Write()
$pdf->writeHTML($html, true, false, true, false, '');

// ---------------------------------------------------------

//Close and output PDF document
$pdf->Output('example_003.pdf', 'I');

//============================================================+
// END OF FILE
//============================================================+
?>

