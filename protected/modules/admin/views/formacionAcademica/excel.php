<?php

/**
 * Created by JetBrains PhpStorm.
 * User: App Factory
 * mail: kristhian@appfactory.com.mx
 * Date: 22-12-2014
 * Time: 10:09 AM

 * */
$pageTitle = $this->pageTitle = Yii::app()->name;
$baseUrl = Yii::app()->request->baseUrl;
$idPersonal = Yii::app()->user->id;


date_default_timezone_set('UTC'); // PHP's date function uses this value!
Yii::import('application.vendors.PHPExcel', true); //Importar la libreria


$objPHPExcel = new PHPExcel();
// Set properties
$objPHPExcel->getProperties()->setCreator("Smart Nova");
$objPHPExcel->getProperties()->setLastModifiedBy("App factory SA de CV");
$objPHPExcel->getProperties()->setTitle("ReporteFormacionAcademica");
$objPHPExcel->getProperties()->setSubject("ReporteFormacionAcademica");
$objPHPExcel->getProperties()->setDescription("ReporteFormacionAcademica");


$formacionAcademicas = FormacionAcademica::model()->findAll(Yii::app()->session['FormacionAcademicaCriteria']);


if ($formacionAcademicas == null || count($formacionAcademicas) == 0)
    return;


$objPHPExcel->getActiveSheet()->SetCellValue("A2", "NOMBRE SERVIDOR PUBLICO");
$objPHPExcel->getActiveSheet()->SetCellValue("D1", "PERIODO");
$objPHPExcel->getActiveSheet()->SetCellValue("B2", "ID TIPO ESTUDIO");
$objPHPExcel->getActiveSheet()->SetCellValue("C2", "DESCRIPCION");
$objPHPExcel->getActiveSheet()->SetCellValue("D2", "FECHA INICIO");
$objPHPExcel->getActiveSheet()->SetCellValue("E2", "FECHA FIN");
$objPHPExcel->getActiveSheet()->mergeCells("D1:E1");



$fila = 3;

foreach ($formacionAcademicas as $formacionAcademica) {

    if (isset($formacionAcademica->idServidorPublico))
        $objPHPExcel->getActiveSheet()->SetCellValue("A$fila", $formacionAcademica->idServidorPublico->nombre);
    if (isset($formacionAcademica->idTipoEstudio))
        $objPHPExcel->getActiveSheet()->SetCellValue("B$fila", $formacionAcademica->idTipoEstudio->tipo_estudio);
    $objPHPExcel->getActiveSheet()->SetCellValue("C$fila", $formacionAcademica->descripcion);
    $objPHPExcel->getActiveSheet()->SetCellValue("D$fila", $formacionAcademica->fecha_inicio);
    $objPHPExcel->getActiveSheet()->SetCellValue("E$fila", $formacionAcademica->fecha_fin);

    $fila++;
}


$nombreArchivo = "ReporteFormacionAcademica" . date('d-m-Y');

header("Pragma: public");
header("Expires: 0");
header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
header("Content-Type: application/force-download");
header("Content-Type: application/octet-stream");
header("Content-Type: application/download");
;
header("Content-Disposition: attachment;filename=$nombreArchivo.xls");
header("Content-Transfer-Encoding: binary ");

$objWriter = new PHPExcel_Writer_Excel5($objPHPExcel);
$objWriter->save('php://output');
?>