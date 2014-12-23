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

     ?> 
$idObjetivo = $objetivo->id_objetivo;
$objetivo = $objetivo->objetivo;
$anio = $objetivo->anio;
$cumplido = $objetivo->cumplido;
$servidorPublico = $objetivo->idServidorPublico == null ? '' : $objetivo->idServidorPublico->servidor_publico;
$personaCreacion = $objetivo->persona_creacion;
$fechaCreacion = $objetivo->fecha_creacion;
$personaModificacion = $objetivo->persona_modificacion;
$fechaModificacion = $objetivo->fecha_modificacion;
$activo = $objetivo->activo;
