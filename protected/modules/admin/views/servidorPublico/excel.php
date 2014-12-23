<?php
/**
 * Created by JetBrains PhpStorm.
 * User: App Factory
 * mail: kristhian@appfactory.com.mx
 * Date: 19-12-2014
 * Time: 10:09 AM
 **/

$pageTitle = $this->pageTitle = Yii::app()->name;
$baseUrl = Yii::app()->request->baseUrl;
$idPersonal = Yii::app()->user->id;


date_default_timezone_set('UTC'); // PHP's date function uses this value!
Yii::import('application.vendors.PHPExcel', true); //Importar la libreria


$objPHPExcel = new PHPExcel();
// Set properties
$objPHPExcel->getProperties()->setCreator("App Factory sa de cv");
$objPHPExcel->getProperties()->setLastModifiedBy("App factory SA de CV");
$objPHPExcel->getProperties()->setTitle("ReporteServidorPublico");
$objPHPExcel->getProperties()->setSubject("ReporteServidorPublico");
$objPHPExcel->getProperties()->setDescription("ReporteServidorPublico");


$arrayServidorPublico = ServidorPublico::model()->findAll(Yii::app()->session['ServidorPublicoCriteria']);


if ($arrayServidorPublico == null || count($arrayServidorPublico) == 0)
    return;


$objPHPExcel->getActiveSheet()->SetCellValue("A1", "NOMBRE");
$objPHPExcel->getActiveSheet()->SetCellValue("B1", "APELLIDO PATERNO");
$objPHPExcel->getActiveSheet()->SetCellValue("C1", "APELLIDO MATERNO");
$objPHPExcel->getActiveSheet()->SetCellValue("D1", "ID CAT DEPENDENCIA");
$objPHPExcel->getActiveSheet()->SetCellValue("E1", "ID CAT AREA DEPENDENCIA");
$objPHPExcel->getActiveSheet()->SetCellValue("F1", "LINKEDIN");
$objPHPExcel->getActiveSheet()->SetCellValue("G1", "EMAIL");
$objPHPExcel->getActiveSheet()->SetCellValue("H1", "USUARIO");
$objPHPExcel->getActiveSheet()->SetCellValue("I1", "CONTRASENIA");
$objPHPExcel->getActiveSheet()->SetCellValue("J1", "TELEFONO");
$objPHPExcel->getActiveSheet()->SetCellValue("K1", "FOTO");
$objPHPExcel->getActiveSheet()->SetCellValue("L1", "ID JEFE DIRECTO");
$objPHPExcel->getActiveSheet()->SetCellValue("M1", "ID CAT NIVEL ACCESO");


$contadorRenglones = 2;

foreach ($arrayServidorPublico as $servidorPublico) {

    $objPHPExcel->getActiveSheet()->SetCellValue("A$contadorRenglones", $servidorPublico->nombre);
    $objPHPExcel->getActiveSheet()->SetCellValue("B$contadorRenglones", $servidorPublico->apellido_paterno);
    $objPHPExcel->getActiveSheet()->SetCellValue("C$contadorRenglones", $servidorPublico->apellido_materno);
    if (isset($servidorPublico->idCatDependencia))
        $objPHPExcel->getActiveSheet()->SetCellValue("D$contadorRenglones", $servidorPublico->idCatDependencia->cat_dependencia);
    if (isset($servidorPublico->idCatAreaDependencia))
        $objPHPExcel->getActiveSheet()->SetCellValue("E$contadorRenglones", $servidorPublico->idCatAreaDependencia->cat_area_dependencia);
    $objPHPExcel->getActiveSheet()->SetCellValue("F$contadorRenglones", $servidorPublico->linkedin);
    $objPHPExcel->getActiveSheet()->SetCellValue("G$contadorRenglones", $servidorPublico->email);
    $objPHPExcel->getActiveSheet()->SetCellValue("H$contadorRenglones", $servidorPublico->usuario);
    $objPHPExcel->getActiveSheet()->SetCellValue("I$contadorRenglones", $servidorPublico->contrasenia);
    $objPHPExcel->getActiveSheet()->SetCellValue("J$contadorRenglones", $servidorPublico->telefono);
    $objPHPExcel->getActiveSheet()->SetCellValue("K$contadorRenglones", $servidorPublico->foto);

    if (isset($servidorPublico->idJefeDirecto))
        $objPHPExcel->getActiveSheet()->SetCellValue("L$contadorRenglones", $servidorPublico->idJefeDirecto->nombre . ' ' . $servidorPublico->idJefeDirecto->apellido_paterno);

    if (isset($servidorPublico->idCatNivelAcceso))
        $objPHPExcel->getActiveSheet()->SetCellValue("M$contadorRenglones", $servidorPublico->idCatNivelAcceso->cat_nivel_acceso);

    $contadorRenglones++;
}


$nombreArchivo = "ReporteServidorPublico" . date('d-m-Y');

header("Pragma: public");
header("Expires: 0");
header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
header("Content-Type: application/force-download");
header("Content-Type: application/octet-stream");
header("Content-Type: application/download");;
header("Content-Disposition: attachment;filename=$nombreArchivo.xls");
header("Content-Transfer-Encoding: binary ");

$objWriter = new PHPExcel_Writer_Excel5($objPHPExcel);
$objWriter->save('php://output');