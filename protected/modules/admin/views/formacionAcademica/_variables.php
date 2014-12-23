<?php
/**
 * Created by JetBrains PhpStorm.
 * User: App Factory
 * mail: kristhian@appfactory.com.mx
 * Date: 20-12-2014
 * Time: 10:09 AM

        **/

        $pageTitle = $this->pageTitle = Yii::app()->name;
        $baseUrl = Yii::app()->request->baseUrl;
        $idPersonal = Yii::app()->user->id;

     ?> 
$idFormacionAcademica = $formacionAcademica->id_formacion_academica;
$servidorPublico = $formacionAcademica->idServidorPublico == null ? '' : $formacionAcademica->idServidorPublico->servidor_publico;
$tipoEstudio = $formacionAcademica->idTipoEstudio == null ? '' : $formacionAcademica->idTipoEstudio->tipo_estudio;
$descripcion = $formacionAcademica->descripcion;
$fechaInicio = $formacionAcademica->fecha_inicio;
$fechaFin = $formacionAcademica->fecha_fin;
