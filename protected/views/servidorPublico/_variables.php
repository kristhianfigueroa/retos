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
$idServidorPublico = $servidorPublico->id_servidor_publico;
$nombre = $servidorPublico->nombre;
$apellidoPaterno = $servidorPublico->apellido_paterno;
$apellidoMaterno = $servidorPublico->apellido_materno;
$catDependencia = $servidorPublico->idCatDependencia == null ? '' : $servidorPublico->idCatDependencia->cat_dependencia;
$catAreaDependencia = $servidorPublico->idCatAreaDependencia == null ? '' : $servidorPublico->idCatAreaDependencia->cat_area_dependencia;
$linkedin = $servidorPublico->linkedin;
$email = $servidorPublico->email;
$usuario = $servidorPublico->usuario;
$contrasenia = $servidorPublico->contrasenia;
$telefono = $servidorPublico->telefono;
$foto = $servidorPublico->foto;
$jefeDirecto = $servidorPublico->idJefeDirecto == null ? '' : $servidorPublico->idJefeDirecto->servidor_publico;
$personaCreacion = $servidorPublico->persona_creacion;
$fechaCreacion = $servidorPublico->fecha_creacion;
$personaModificacion = $servidorPublico->persona_modificacion;
$fechaModificacion = $servidorPublico->fecha_modificacion;
$activo = $servidorPublico->activo;
$catNivelAcceso = $servidorPublico->idCatNivelAcceso == null ? '' : $servidorPublico->idCatNivelAcceso->cat_nivel_acceso;
