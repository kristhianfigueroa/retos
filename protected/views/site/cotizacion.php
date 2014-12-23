<?php $pdf = Yii::createComponent('application.extensions.tcpdf.ETcPdf',
    'P', 'cm', 'A4', true, 'UTF-8');

class MYPDF extends TCPDF
{

    //Page header
    public function Header()
    {
        // Logo
        $image_file = K_PATH_IMAGES . 'logo_example.jpg';
        $this->Image($image_file, 10, 10, 15, '', 'JPG', '', 'T', false, 300, '', false, false, 0, false, false, false);
        // Set font
        $this->SetFont('helvetica', 'B', 20);
        // Title
    }

    // Page footer
    public function Footer()
    {
        // Position at 15 mm from bottom
        $this->SetY(-15);
        // Set font
        $this->SetFont('helvetica', 'I', 8);
        // Page number
        $this->Cell(0, 10, 'Termografos', 0, false, 'C', 0, '', 0, false, 'T', 'M');
        $this->Ln(3);
        $this->Cell(0, 10, '', 0, false, 'C', 0, '', 0, false, 'T', 'M');
        $this->Ln(2);
    }
}

// create new PDF document
$pdf = new MYPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// set document information
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('REDESCEBA');
$pdf->SetTitle('COTIZACION 003');
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

// ---------------------------------------------------------

// set font
$pdf->SetFont('helvetica', 'empty', 11);

// add a page
$pdf->AddPage();

// set some text to print
$html = '
<table>
    <tr>
        <td width="50%">Atn: Sr. Omar Cardenas</td>
        <td width="50%" align="center">FECHA 12-jul-13</td>
    </tr>
    <tr>
        <td>GRUPO FRISA</td>
        <td align="center">COTIZACION 07/13-12071</td>
    </tr>
    <tr>
        <td>Tel: 01 (55) 91 14 22 91</td>
        <td align="center">PROYECTO REDES PARA BASEBALL</td>
    </tr>
</table>
<br>
<br>
<table rules="all" border="1">
    <tr>
        <th align="center" width="12%" BGCOLOR="#81F79F" scope="col">Cantidad</th>
        <th align="center" width="10%" BGCOLOR="#81F79F" scope="col">Unidad</th>
        <th align="center" width="51%" BGCOLOR="#81F79F" scope="col">Descripcion</th>
        <th align="center" width="12%" BGCOLOR="#81F79F" scope="col">P.Unitario</th>
        <th align="center" width="15%" BGCOLOR="#81F79F" scope="col">Importe</th>
    </tr>
    <tr>
        <td align="center">
            <p>3</p>
            <p>6</p>
        </td>
        <td align="center">
            <p>m2</p>
            <p>m2</p>
        </td>
        <td align="center">
            <p>Red calibre 3s 18 x 2(cuadro de 2.5 cm)</p>
            <p>Television de 23 x 18 pulgadas</p>
        </td>
        <td align="center">
            <p>$ 2837.00</p>
            <p>$ 12838.00</p>
        </td>
        <td align="center">
            <p>$ 68,987.00</p>
            <p>$ 300,000.00</p>
        </td>
    </tr>
</table>
<br/>
<br/>
<table rules="none">
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td>Subtotal</td>
        <td>$ 276.00</td>
    </tr>
    <tr>
        <td colspan="3" align="center"></td>
        <td>I.V.A</td>
        <td>$ 89.00</td>
    </tr>
    <tr>
        <td colspan="3"></td>
        <td>Total</td>
        <td>$ 635.00</td>
    </tr>
</table>
<br/>
<br/>
<p>Se fabrica un paño de 2.5 x 120 mts <br>Envío por paqueteria por cobrar <br>Tiempo de entrega 12 días a partir de recibido anticipo <br>Vigencia de la cotización 10 dias. <br>Forma de pago 50% de anticipo para iniciar la fabricación y 50% antes del envío.</p>
<br/>
<br/>
<h4 align="center">Mejoramos cualquier cotización por escrito.</h4>
<p align="center">Sin más por el momento y en espera de vernos favorecidos con su preferencia quedo de usted</p>
<br>
<br>
<p align="center">ING. IRVING J CEREZA BARRAGAN <br>TEL: (442) 4123477, ID: 52*14*2920 <br>i.cereza@redesceba.com</p>
';

// output the HTML content
$pdf->writeHTML($html, true, false, true, false, '');

//Close and output PDF document
$pdf->Output('example_003.pdf', 'I');

?>