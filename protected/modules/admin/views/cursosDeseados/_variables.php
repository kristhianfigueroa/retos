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
$idCursosDeseados = $cursosDeseados->id_cursos_deseados;
$servidorPublico = $cursosDeseados->idServidorPublico == null ? '' : $cursosDeseados->idServidorPublico->servidor_publico;
$areaInteres = $cursosDeseados->idAreaInteres == null ? '' : $cursosDeseados->idAreaInteres->area_interes;
$personaCreacion = $cursosDeseados->persona_creacion;
$fechaCreacion = $cursosDeseados->fecha_creacion;
$personaModificacion = $cursosDeseados->persona_modificacion;
$fechaModificacion = $cursosDeseados->fecha_modificacion;
$activo = $cursosDeseados->activo;
