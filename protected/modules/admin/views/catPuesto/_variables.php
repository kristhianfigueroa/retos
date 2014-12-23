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
$idCatPuesto = $catPuesto->id_cat_puesto;
$catPuesto = $catPuesto->cat_puesto;
$personaCreacion = $catPuesto->persona_creacion;
$fechaCreacion = $catPuesto->fecha_creacion;
$personaModificacion = $catPuesto->persona_modificacion;
$fechaModificacion = $catPuesto->fecha_modificacion;
$activo = $catPuesto->activo;
