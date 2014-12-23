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
$objPHPExcel->getProperties()->setTitle("ReporteTrayectoriaLaboral");
$objPHPExcel->getProperties()->setSubject("ReporteTrayectoriaLaboral");
$objPHPExcel->getProperties()->setDescription("ReporteTrayectoriaLaboral");


$arrayTrayectoriaLaboral = TrayectoriaLaboral::model()->findAll(Yii::app()->session['TrayectoriaLaboralCriteria']);


if ($arrayTrayectoriaLaboral == null || count($arrayTrayectoriaLaboral) == 0)
return;


		 $objPHPExcel->getActiveSheet()->SetCellValue("A1","ID SERVIDOR PUBLICO" ); 
		 $objPHPExcel->getActiveSheet()->SetCellValue("B1","PUESTO" ); 
		 $objPHPExcel->getActiveSheet()->SetCellValue("C1","SECTOR" ); 
		 $objPHPExcel->getActiveSheet()->SetCellValue("D1","DESCRIPCION" ); 
		 $objPHPExcel->getActiveSheet()->SetCellValue("E1","FECHA INICIO" ); 
		 $objPHPExcel->getActiveSheet()->SetCellValue("F1","FECHA FIN" ); 



    $contadorRenglones = 2;

        foreach ($arrayTrayectoriaLaboral as $trayectoriaLaboral) {

		 if (isset($trayectoriaLaboral->idServidorPublico))
			 $objPHPExcel->getActiveSheet()->SetCellValue("A$contadorRenglones",$trayectoriaLaboral->idServidorPublico->servidor_publico ); 
		 $objPHPExcel->getActiveSheet()->SetCellValue("B$contadorRenglones",$trayectoriaLaboral->puesto ); 
		 $objPHPExcel->getActiveSheet()->SetCellValue("C$contadorRenglones",$trayectoriaLaboral->sector ); 
		 $objPHPExcel->getActiveSheet()->SetCellValue("D$contadorRenglones",$trayectoriaLaboral->descripcion ); 
		 $objPHPExcel->getActiveSheet()->SetCellValue("E$contadorRenglones",$trayectoriaLaboral->fecha_inicio ); 
		 $objPHPExcel->getActiveSheet()->SetCellValue("F$contadorRenglones",$trayectoriaLaboral->fecha_fin ); 

$contadorRenglones++;
}


$nombreArchivo = "ReporteTrayectoriaLaboral" . date('d-m-Y');

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