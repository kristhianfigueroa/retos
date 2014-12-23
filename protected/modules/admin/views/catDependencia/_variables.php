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
$idCatDependencia = $catDependencia->id_cat_dependencia;
$catDependencia = $catDependencia->cat_dependencia;
$personaCreacion = $catDependencia->persona_creacion;
$fechaCreacion = $catDependencia->fecha_creacion;
$personaModificacion = $catDependencia->persona_modificacion;
$fechaModificacion = $catDependencia->fecha_modificacion;
$activo = $catDependencia->activo;
