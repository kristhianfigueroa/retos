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
$idTrayectoriaLaboral = $trayectoriaLaboral->id_trayectoria_laboral;
$servidorPublico = $trayectoriaLaboral->idServidorPublico == null ? '' : $trayectoriaLaboral->idServidorPublico->servidor_publico;
$puesto = $trayectoriaLaboral->puesto;
$sector = $trayectoriaLaboral->sector;
$descripcion = $trayectoriaLaboral->descripcion;
$fechaInicio = $trayectoriaLaboral->fecha_inicio;
$fechaFin = $trayectoriaLaboral->fecha_fin;
