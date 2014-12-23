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
$idCursoDisponible = $cursoDisponible->id_curso_disponible;
$socioTecnologico = $cursoDisponible->idSocioTecnologico == null ? '' : $cursoDisponible->idSocioTecnologico->socio_tecnologico;
$folioSocioTecnologico = $cursoDisponible->folio_socio_tecnologico;
$nombreCurso = $cursoDisponible->nombre_curso;
$descripcion = $cursoDisponible->descripcion;
$pdfTemario = $cursoDisponible->pdf_temario;
$catCurso = $cursoDisponible->idCatCurso == null ? '' : $cursoDisponible->idCatCurso->cat_curso;
$horasCurso = $cursoDisponible->horas_curso;
$formato = $cursoDisponible->formato;
$fechaInicio = $cursoDisponible->fecha_inicio;
$estatusCurso = $cursoDisponible->estatus_curso;
$catComprobante = $cursoDisponible->idCatComprobante == null ? '' : $cursoDisponible->idCatComprobante->cat_comprobante;
$personaCreacion = $cursoDisponible->persona_creacion;
$fechaCreacion = $cursoDisponible->fecha_creacion;
$personaModificacion = $cursoDisponible->persona_modificacion;
$fechaModificacion = $cursoDisponible->fecha_modificacion;
$activo = $cursoDisponible->activo;
