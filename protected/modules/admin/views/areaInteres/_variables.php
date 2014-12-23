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

     ?> 
$idAreaInteres = $areaInteres->id_area_interes;
$areaInteres = $areaInteres->area_interes;
$personaCreacion = $areaInteres->persona_creacion;
$fechaCreacion = $areaInteres->fecha_creacion;
$personaModificacion = $areaInteres->persona_modificacion;
$fechaModificacion = $areaInteres->fecha_modificacion;
$activo = $areaInteres->activo;
