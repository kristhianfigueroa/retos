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
$objPHPExcel->getProperties()->setTitle("ReporteCatAreaDependencia");
$objPHPExcel->getProperties()->setSubject("ReporteCatAreaDependencia");
$objPHPExcel->getProperties()->setDescription("ReporteCatAreaDependencia");


$arrayCatAreaDependencia = CatAreaDependencia::model()->findAll(Yii::app()->session['CatAreaDependenciaCriteria']);


if ($arrayCatAreaDependencia == null || count($arrayCatAreaDependencia) == 0)
return;


		 $objPHPExcel->getActiveSheet()->SetCellValue("A1","CAT AREA DEPENDENCIA" ); 
		 $objPHPExcel->getActiveSheet()->SetCellValue("B1","ID CAT DEPENDENCIA" ); 



    $contadorRenglones = 2;

        foreach ($arrayCatAreaDependencia as $catAreaDependencia) {

		 $objPHPExcel->getActiveSheet()->SetCellValue("A$contadorRenglones",$catAreaDependencia->cat_area_dependencia ); 
		 if (isset($catAreaDependencia->idCatDependencia))
			 $objPHPExcel->getActiveSheet()->SetCellValue("B$contadorRenglones",$catAreaDependencia->idCatDependencia->cat_dependencia ); 

$contadorRenglones++;
}


$nombreArchivo = "ReporteCatAreaDependencia" . date('d-m-Y');

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