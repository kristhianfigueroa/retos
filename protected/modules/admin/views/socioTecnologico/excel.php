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
$objPHPExcel->getProperties()->setTitle("ReporteSocioTecnologico");
$objPHPExcel->getProperties()->setSubject("ReporteSocioTecnologico");
$objPHPExcel->getProperties()->setDescription("ReporteSocioTecnologico");


$arraySocioTecnologico = SocioTecnologico::model()->findAll(Yii::app()->session['SocioTecnologicoCriteria']);


if ($arraySocioTecnologico == null || count($arraySocioTecnologico) == 0)
return;


		 $objPHPExcel->getActiveSheet()->SetCellValue("A1","NOMBRE" ); 
		 $objPHPExcel->getActiveSheet()->SetCellValue("B1","RAZON SOCIAL" ); 
		 $objPHPExcel->getActiveSheet()->SetCellValue("C1","TELEFONO" ); 
		 $objPHPExcel->getActiveSheet()->SetCellValue("D1","EMAIL" ); 
		 $objPHPExcel->getActiveSheet()->SetCellValue("E1","DIRECCION" ); 
		 $objPHPExcel->getActiveSheet()->SetCellValue("F1","USUARIO" ); 
		 $objPHPExcel->getActiveSheet()->SetCellValue("G1","CONTRASENIA" ); 



    $contadorRenglones = 2;

        foreach ($arraySocioTecnologico as $socioTecnologico) {

		 $objPHPExcel->getActiveSheet()->SetCellValue("A$contadorRenglones",$socioTecnologico->nombre ); 
		 $objPHPExcel->getActiveSheet()->SetCellValue("B$contadorRenglones",$socioTecnologico->razon_social ); 
		 $objPHPExcel->getActiveSheet()->SetCellValue("C$contadorRenglones",$socioTecnologico->telefono ); 
		 $objPHPExcel->getActiveSheet()->SetCellValue("D$contadorRenglones",$socioTecnologico->email ); 
		 $objPHPExcel->getActiveSheet()->SetCellValue("E$contadorRenglones",$socioTecnologico->direccion ); 
		 $objPHPExcel->getActiveSheet()->SetCellValue("F$contadorRenglones",$socioTecnologico->usuario ); 
		 $objPHPExcel->getActiveSheet()->SetCellValue("G$contadorRenglones",$socioTecnologico->contrasenia ); 

$contadorRenglones++;
}


$nombreArchivo = "ReporteSocioTecnologico" . date('d-m-Y');

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