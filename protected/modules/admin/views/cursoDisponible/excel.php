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
$objPHPExcel->getProperties()->setTitle("ReporteCursoDisponible");
$objPHPExcel->getProperties()->setSubject("ReporteCursoDisponible");
$objPHPExcel->getProperties()->setDescription("ReporteCursoDisponible");


$arrayCursoDisponible = CursoDisponible::model()->findAll(Yii::app()->session['CursoDisponibleCriteria']);


if ($arrayCursoDisponible == null || count($arrayCursoDisponible) == 0)
return;


		 $objPHPExcel->getActiveSheet()->SetCellValue("A1","ID SOCIO TECNOLOGICO" ); 
		 $objPHPExcel->getActiveSheet()->SetCellValue("B1","FOLIO SOCIO TECNOLOGICO" ); 
		 $objPHPExcel->getActiveSheet()->SetCellValue("C1","NOMBRE CURSO" ); 
		 $objPHPExcel->getActiveSheet()->SetCellValue("D1","DESCRIPCION" ); 
		 $objPHPExcel->getActiveSheet()->SetCellValue("E1","PDF TEMARIO" ); 
		 $objPHPExcel->getActiveSheet()->SetCellValue("F1","ID CAT CURSO" ); 
		 $objPHPExcel->getActiveSheet()->SetCellValue("G1","HORAS CURSO" ); 
		 $objPHPExcel->getActiveSheet()->SetCellValue("H1","FORMATO" ); 
		 $objPHPExcel->getActiveSheet()->SetCellValue("I1","FECHA INICIO" ); 
		 $objPHPExcel->getActiveSheet()->SetCellValue("J1","ESTATUS CURSO" ); 
		 $objPHPExcel->getActiveSheet()->SetCellValue("K1","ID CAT COMPROBANTE" ); 



    $contadorRenglones = 2;

        foreach ($arrayCursoDisponible as $cursoDisponible) {

		 if (isset($cursoDisponible->idSocioTecnologico))
			 $objPHPExcel->getActiveSheet()->SetCellValue("A$contadorRenglones",$cursoDisponible->idSocioTecnologico->nombre );
		 $objPHPExcel->getActiveSheet()->SetCellValue("B$contadorRenglones",$cursoDisponible->folio_socio_tecnologico ); 
		 $objPHPExcel->getActiveSheet()->SetCellValue("C$contadorRenglones",$cursoDisponible->nombre_curso ); 
		 $objPHPExcel->getActiveSheet()->SetCellValue("D$contadorRenglones",$cursoDisponible->descripcion ); 
		 $objPHPExcel->getActiveSheet()->SetCellValue("E$contadorRenglones",$cursoDisponible->pdf_temario ); 
		 if (isset($cursoDisponible->idCatCurso))
			 $objPHPExcel->getActiveSheet()->SetCellValue("F$contadorRenglones",$cursoDisponible->idCatCurso->cat_curso ); 
		 $objPHPExcel->getActiveSheet()->SetCellValue("G$contadorRenglones",$cursoDisponible->horas_curso ); 
		 $objPHPExcel->getActiveSheet()->SetCellValue("H$contadorRenglones",$cursoDisponible->formato ); 
		 $objPHPExcel->getActiveSheet()->SetCellValue("I$contadorRenglones",$cursoDisponible->fecha_inicio ); 
		 $objPHPExcel->getActiveSheet()->SetCellValue("J$contadorRenglones",$cursoDisponible->estatus_curso ); 
		 if (isset($cursoDisponible->idCatComprobante))
			 $objPHPExcel->getActiveSheet()->SetCellValue("K$contadorRenglones",$cursoDisponible->idCatComprobante->cat_comprobante ); 

$contadorRenglones++;
}


$nombreArchivo = "ReporteCursoDisponible" . date('d-m-Y');

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