<?php

class WebservicesController extends Controller{

    public function filters()
    {
        return array(
            'accessControl',
            'postOnly + delete',
        );
    }

    public function accessRules()
    {
        return array(
            array('allow',
                'actions' => array('crearCurso', 'modificarCurso', 'borrarCurso', 'modificarCursoDisponible'),
                'users' => array('*')
            )
        );

    }

    private function logueo()
    {
        $usuario = isset($_POST['usuario']) ? $_POST['usuario'] : "";
        $password = isset($_POST['contrasenia']) ? $_POST['contrasenia'] : "";

        $criteria = new CDbCriteria();
        $criteria->select = 'usuario';
        $criteria->condition = 'contrasenia = :password AND usuario = :usuario';
        $criteria->params = array(':password' => $password, ':usuario' => $usuario);
        $socio = SocioTecnologico::model()->findAll($criteria);
        if($socio == NULL){
            return 0;
        }else {
            return 1;
        }
    }


    public function actionCrearCurso()
    {
        if($this->logueo()) {
            $idSocioTecnologico = isset($_POST['idSocioTecnologico']) ? $_POST['idSocioTecnologico'] : "";
            $folioSocioTecnologico = isset($_POST['folioSocioTecnologico']) ? $_POST['folioSocioTecnologico'] : "";
            $nombreCurso = isset($_POST['nombreCurso']) ? $_POST['nombreCurso'] : "";
            $descripcion = isset($_POST['descripcion']) ? $_POST['descripcion'] : "";
            $pdfTemario = isset($_POST['pdfTemario']) ? $_POST['pdfTemario'] : "";
            $idCategoriaCurso = isset($_POST['idCategoriaCurso']) ? $_POST['idCategoriaCurso'] : "";
            $horasCurso = isset($_POST['horasCurso']) ? $_POST['horasCurso'] : "";
            $formato = isset($_POST['formato']) ? $_POST['formato'] : "";
            $fechaInicio = isset($_POST['fechaInicio']) ? $_POST['fechaInicio'] : "";
            $estatusCurso = isset($_POST['estatusCurso']) ? $_POST['estatusCurso'] : "";
            $idCategoriaComprobante = isset($_POST['idCategoriaComprobante']) ? $_POST['idCategoriaComprobante'] : "";

            $modelo = new CursoDisponible();
            $modelo->id_socio_tecnologico = $idSocioTecnologico;
            $modelo->folio_socio_tecnologico = $folioSocioTecnologico;
            $modelo->nombre_curso = $nombreCurso;
            $modelo->descripcion = $descripcion;
            $modelo->pdf_temario = $pdfTemario;
            $modelo->id_cat_curso = $idCategoriaCurso;
            $modelo->horas_curso = $horasCurso;
            $modelo->formato = $formato;
            $modelo->fecha_inicio = $fechaInicio;
            $modelo->estatus_curso = $estatusCurso;
            $modelo->id_cat_comprobante = $idCategoriaComprobante;
            $modelo->fecha_creacion = date('Y-m-d h:i:s');
            $modelo->persona_creacion = Yii::app()->user->id;
            $modelo->fecha_modificacion = date('Y-m-d h:i:s');
            $modelo->persona_modificacion = Yii::app()->user->id;
            $modelo->activo = 1;

            if ($modelo->save()) {
                header('Content-type: application/json');
                $error = array('error' => 0, 'mensaje' => 'Datos almacenados con éxito.');
                echo CJSON::encode($error);
                Yii::app()->end();
            } else {
                header('Content-type: application/json');
                $error = array('error' => 1, 'mensaje' => $modelo->errors);
                echo CJSON::encode($error);
                Yii::app()->end();
            }
        }else {
            header('Content-type: application/json');
            $error = array('error' => 1, 'mensaje' => 'No se cuenta con permisos para acceder.');
            echo CJSON::encode($error);
            Yii::app()->end();
        }
    }

    public function actionModificarCurso()
    {
        if($this->logueo()) {
            $idCurso = isset($_POST['idCurso']) && $_POST['idCurso'] ? $_POST['idCurso'] : "";
            if($idCurso == ""){
                header('Content-type: application/json');
                $error = array('error' => 1, 'mensaje' => 'Es indispensable que indique el id del curso que desea modificar.');
                echo CJSON::encode($error);
                Yii::app()->end();
            }else {
                $idSocioTecnologico = isset($_POST['idSocioTecnologico']) ? $_POST['idSocioTecnologico'] : "";
                $folioSocioTecnologico = isset($_POST['folioSocioTecnologico']) ? $_POST['folioSocioTecnologico'] : "";
                $nombreCurso = isset($_POST['nombreCurso']) ? $_POST['nombreCurso'] : "";
                $descripcion = isset($_POST['descripcion']) ? $_POST['descripcion'] : "";
                $pdfTemario = isset($_POST['pdfTemario']) ? $_POST['pdfTemario'] : "";
                $idCategoriaCurso = isset($_POST['idCategoriaCurso']) ? $_POST['idCategoriaCurso'] : "";
                $horasCurso = isset($_POST['horasCurso']) ? $_POST['horasCurso'] : "";
                $formato = isset($_POST['formato']) ? $_POST['formato'] : "";
                $fechaInicio = isset($_POST['fechaInicio']) ? $_POST['fechaInicio'] : "";
                $estatusCurso = isset($_POST['estatusCurso']) ? $_POST['estatusCurso'] : "";
                $idCategoriaComprobante = isset($_POST['idCategoriaComprobante']) ? $_POST['idCategoriaComprobante'] : "";

                $modelo = CursoDisponible::model()->findByPk($idCurso);
                $modelo->id_socio_tecnologico = $idSocioTecnologico;
                $modelo->folio_socio_tecnologico = $folioSocioTecnologico;
                $modelo->nombre_curso = $nombreCurso;
                $modelo->descripcion = $descripcion;
                $modelo->pdf_temario = $pdfTemario;
                $modelo->id_cat_curso = $idCategoriaCurso;
                $modelo->horas_curso = $horasCurso;
                $modelo->formato = $formato;
                $modelo->fecha_inicio = $fechaInicio;
                $modelo->estatus_curso = $estatusCurso;
                $modelo->id_cat_comprobante = $idCategoriaComprobante;
                $modelo->fecha_creacion = date('Y-m-d h:i:s');
                $modelo->persona_modificacion = Yii::app()->user->id;

                if ($modelo->update()) {
                    header('Content-type: application/json');
                    $error = array('error' => 0, 'mensaje' => 'Datos almacenados con éxito.');
                    echo CJSON::encode($error);
                    Yii::app()->end();
                } else {
                    header('Content-type: application/json');
                    $error = array('error' => 1, 'mensaje' => $modelo->errors);
                    echo CJSON::encode($error);
                    Yii::app()->end();
                }
            }
        }else {
            header('Content-type: application/json');
            $error = array('error' => 1, 'mensaje' => 'No se cuenta con permisos para acceder.');
            echo CJSON::encode($error);
            Yii::app()->end();
        }
    }

    public function actionBorrarCurso()
    {
        if($this->logueo()) {
            $idCurso = isset($_POST['idCurso']) && $_POST['idCurso'] ? $_POST['idCurso'] : "";
            if($idCurso == ""){
                header('Content-type: application/json');
                $error = array('error' => 1, 'mensaje' => 'Es indispensable que indique el id del curso que desea eliminar.');
                echo CJSON::encode($error);
                Yii::app()->end();
            }else {
                $modelo = CursoDisponible::model()->findByPk($idCurso);
                if ($modelo->delete()) {
                    header('Content-type: application/json');
                    $error = array('error' => 0, 'mensaje' => 'Curso eliminado con éxito.');
                    echo CJSON::encode($error);
                    Yii::app()->end();
                } else {
                    header('Content-type: application/json');
                    $error = array('error' => 1, 'mensaje' => $modelo->errors);
                    echo CJSON::encode($error);
                    Yii::app()->end();
                }
            }
        }else {
            header('Content-type: application/json');
            $error = array('error' => 1, 'mensaje' => 'No se cuenta con permisos para acceder.');
            echo CJSON::encode($error);
            Yii::app()->end();
        }
    }

    public function actionModificarCursoDisponible()
    {
        if ($this->logueo()) {
            $idCurso = isset($_POST['cursoDisponible']) && $_POST['cursoDisponible'] ? $_POST['cursoDisponible'] : "";

            if ($idCurso == "") {
                header('Content-type: application/json');
                $error = array('error' => 1, 'mensaje' => 'Es indispensable que indique el id del curso que desea modificar.');
                echo CJSON::encode($error);
                Yii::app()->end();
            } else {
                $idCursoDisponible = isset($_POST['idCursoDisponible']) ? $_POST['idCursoDisponible'] : "";
                $folioSocioTecnologico = isset($_POST['folioSocioTecnologico']) ? $_POST['folioSocioTecnologico'] : "";
                $idServidorPublico = isset($_POST['idServidorPublico']) ? $_POST['idServidorPublico'] : "";
                $fechaInicio = isset($_POST['fechaInicio']) ? $_POST['fechaInicio'] : "";
                $fechaFin = isset($_POST['fechaFin']) ? $_POST['fechaFin'] : "";
                $finalizacionCurso = isset($_POST['finalizacionCurso']) ? $_POST['finalizacionCurso'] : "";
                $calificacion = isset($_POST['calificacion']) ? $_POST['calificacion'] : "";

                $modelo = CursoDisponibleServidorPublico::model()->findByPk($idCurso);
                $modelo->id_curso_disponible = $idCursoDisponible;
                $modelo->folio_socio_tecnologico = $folioSocioTecnologico;
                $modelo->id_servidor_publico = $idServidorPublico;
                $modelo->fecha_inicio = $fechaInicio;
                $modelo->fecha_fin = $fechaFin;
                $modelo->finalizacion_curso = $finalizacionCurso;
                $modelo->calificacion = $calificacion;
                $modelo->fecha_creacion = date('Y-m-d h:i:s');
                $modelo->persona_modificacion = Yii::app()->user->id;

                if ($modelo->update()) {
                    header('Content-type: application/json');
                    $error = array('error' => 0, 'mensaje' => 'Datos almacenados con éxito.');
                    echo CJSON::encode($error);
                    Yii::app()->end();
                } else {
                    header('Content-type: application/json');
                    $error = array('error' => 1, 'mensaje' => $modelo->errors);
                    echo CJSON::encode($error);
                    Yii::app()->end();
                }
            }
        } else {
            header('Content-type: application/json');
            $error = array('error' => 1, 'mensaje' => 'No se cuenta con permisos para acceder.');
            echo CJSON::encode($error);
            Yii::app()->end();
        }
    }
}