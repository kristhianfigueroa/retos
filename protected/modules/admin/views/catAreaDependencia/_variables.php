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

     ?> 
$idCatAreaDependencia = $catAreaDependencia->id_cat_area_dependencia;
$catAreaDependencia = $catAreaDependencia->cat_area_dependencia;
$catDependencia = $catAreaDependencia->idCatDependencia == null ? '' : $catAreaDependencia->idCatDependencia->cat_dependencia;
$personaCreacion = $catAreaDependencia->persona_creacion;
$fechaCreacion = $catAreaDependencia->fecha_creacion;
$personaModificacion = $catAreaDependencia->persona_modificacion;
$fechaModificacion = $catAreaDependencia->fecha_modificacion;
$activo = $catAreaDependencia->activo;
