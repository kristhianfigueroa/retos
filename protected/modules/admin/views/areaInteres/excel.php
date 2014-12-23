<?php
/**
 * Created by JetBrains PhpStorm.
 * User: App Factory
 * mail: kristhian@appfactory.com.mx
 * Date: 22-12-2014
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
$objPHPExcel->getProperties()->setTitle("ReporteAreaInteres");
$objPHPExcel->getProperties()->setSubject("ReporteAreaInteres");
$objPHPExcel->getProperties()->setDescription("ReporteAreaInteres");


$arrayAreaInteres = AreaInteres::model()->findAll(Yii::app()->session['AreaInteresCriteria']);


if ($arrayAreaInteres == null || count($arrayAreaInteres) == 0)
return;


		 $objPHPExcel->getActiveSheet()->SetCellValue("A1","AREA INTERES" ); 



    $contadorRenglones = 2;

        foreach ($arrayAreaInteres as $areaInteres) {

		 $objPHPExcel->getActiveSheet()->SetCellValue("A$contadorRenglones",$areaInteres->area_interes ); 

$contadorRenglones++;
}


$nombreArchivo = "ReporteAreaInteres" . date('d-m-Y');

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