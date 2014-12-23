<?php
/**
 * Created by JetBrains PhpStorm.
 * User: App Factory
 * mail: kristhian@appfactory.com.mx
 * Date: 23-12-2014
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
$objPHPExcel->getProperties()->setTitle("ReporteObjetivo");
$objPHPExcel->getProperties()->setSubject("ReporteObjetivo");
$objPHPExcel->getProperties()->setDescription("ReporteObjetivo");


$arrayObjetivo = Objetivo::model()->findAll(Yii::app()->session['ObjetivoCriteria']);


if ($arrayObjetivo == null || count($arrayObjetivo) == 0)
return;


		 $objPHPExcel->getActiveSheet()->SetCellValue("A1","OBJETIVO" ); 
		 $objPHPExcel->getActiveSheet()->SetCellValue("B1","ANIO" ); 
		 $objPHPExcel->getActiveSheet()->SetCellValue("C1","CUMPLIDO" ); 
		 $objPHPExcel->getActiveSheet()->SetCellValue("D1","ID SERVIDOR PUBLICO" ); 



    $contadorRenglones = 2;

        foreach ($arrayObjetivo as $objetivo) {

		 $objPHPExcel->getActiveSheet()->SetCellValue("A$contadorRenglones",$objetivo->objetivo ); 
		 $objPHPExcel->getActiveSheet()->SetCellValue("B$contadorRenglones",$objetivo->anio ); 
		 $objPHPExcel->getActiveSheet()->SetCellValue("C$contadorRenglones",$objetivo->cumplido ); 
		 if (isset($objetivo->idServidorPublico))
			 $objPHPExcel->getActiveSheet()->SetCellValue("D$contadorRenglones",$objetivo->idServidorPublico->servidor_publico ); 

$contadorRenglones++;
}


$nombreArchivo = "ReporteObjetivo" . date('d-m-Y');

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