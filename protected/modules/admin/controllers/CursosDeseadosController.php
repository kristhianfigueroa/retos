<?php

class CursosDeseadosController extends Controller {

    /**
     * @var string the default layout for the views. Defaults to '//layouts/column2', meaning
     * using two-column layout. See 'protected/views/layouts/column2.php'.
     */
    public $layout = '//layouts/column2';

    /**
     * @return array action filters
     */
    public function filters() {
        return array(
            'accessControl', // perform access control for CRUD operations
            'postOnly + delete', // we only allow deletion via POST request
        );
    }

    public function actions() {
        return array(
            'getRowForm' => array(
                'class' => 'ext.dynamictabularform.actions.GetRowForm',
                'view' => '_rowForm',
                'modelClass' => 'CursosDeseados'
            )
        );
    }

    /**
     * Specifies the access control rules.
     * This method is used by the 'accessControl' filter.
     * @return array access control rules
     */
    public function accessRules() {

        $admins = CatNivelAcceso::getAdmins();

        return array(
            array('allow', // allow authenticated user to perform 'create' and 'update' actions
                'actions' => array('view', 'create', 'update', 'delete', 'getDetalle', 'exportToPdf', 'exportarExcel', 'getRowForm',
                    'index', 'autocompleteCursosDeseados'),
                'users' => $admins
            ),

            array('allow', // allow authenticated user to perform 'create' and 'update' actions
                'actions' => array('createFuncionario', 'getRowForm',),
                'users' => array('@')
            ),


            array('deny', // deny all users
                'users' => array('*')
            )
        );
    }

    /**
     * Creates a new model.
     * If creation is successful, the browser will be redirected to the 'index' page.
     */
    public function actionCreate($id_servidor_publico) {


        $curso = new CursosDeseados();
        $cursosDeseados = array($curso);

        if (isset($_POST['CursosDeseados'])) {
            $cursosDeseados = array();
            foreach ($_POST['CursosDeseados'] as $curDeseados) {

                $miCursoDeseado = new CursosDeseados();
                $miCursoDeseado->attributes = $curDeseados;
                $miCursoDeseado->fecha_creacion = date('Y-m-d h:i:s');
                $miCursoDeseado->persona_creacion = Yii::app()->user->id;
                $miCursoDeseado->fecha_modificacion = date('Y-m-d h:i:s');
                $miCursoDeseado->persona_modificacion = Yii::app()->user->id;
                $miCursoDeseado->activo = 1;
                $miCursoDeseado->id_servidor_publico = $id_servidor_publico;
                $cursosDeseados[] = $miCursoDeseado;
            }
            $valid = true;
            foreach ($cursosDeseados as $cursoDeseado) {
                $valid = $cursoDeseado->validate() & $valid;
            }
            if ($valid) {
                $transaction = $curso->getDbConnection()->beginTransaction();
                try {
                    foreach ($cursosDeseados as $cursoDeseado) {
                        $cursoDeseado->save();
                    }
                    $transaction->commit();
                } catch (Exception $exc) {
                    $transaction->rollback();
                }
                $this->redirect(array('index', 'id_servidor_publico' => $id_servidor_publico));
            }
        }
        $this->render('create', array(
            'cursosDeseados' => $cursosDeseados
        ));
    }

    /**
     * Creates a new model.
     * If creation is successful, the browser will be redirected to the 'index' page.
     */
    public function actionCreateFuncionario() {

        $curso = new CursosDeseados();
        $cursosDeseados = array($curso);

        if (isset($_POST['CursosDeseados'])) {
            $cursosDeseados = array();

            foreach ($_POST['CursosDeseados'] as $curDeseados) {


                if ($curDeseados['updateType'] == DynamicTabularForm::UPDATE_TYPE_CREATE) {

                    $miCursoDeseado = new CursosDeseados();
                    $miCursoDeseado->attributes = $curDeseados;
                    $miCursoDeseado->fecha_creacion = date('Y-m-d h:i:s');
                    $miCursoDeseado->persona_creacion = Yii::app()->user->id;
                    $miCursoDeseado->fecha_modificacion = date('Y-m-d h:i:s');
                    $miCursoDeseado->persona_modificacion = Yii::app()->user->id;
                    $miCursoDeseado->activo = 1;
                    $miCursoDeseado->id_servidor_publico = Yii::app()->user->id;

                    $cursosDeseados[] = $miCursoDeseado;

                }
                if ($curDeseados['updateType'] == DynamicTabularForm::UPDATE_TYPE_UPDATE) {

                    $miCursoDeseado = CursosDeseados::model()->findByPk($curDeseados['id_cursos_deseados']);
                    $miCursoDeseado->attributes = $curDeseados;

                    $cursosDeseados[] = $miCursoDeseado;

                }
                if ($curDeseados['updateType'] == DynamicTabularForm::UPDATE_TYPE_DELETE) {

                    $delete = CursosDeseados::model()->findByPk($curDeseados['id_cursos_deseados']);
                        if ($delete->delete()) {


                    }
                }

            }

            $valid = true;
            foreach ($cursosDeseados as $cursoDeseado) {
                $valid = $cursoDeseado->validate() & $valid;
            }

            if ($valid) {
                $transaction = $curso->getDbConnection()->beginTransaction();

                try {

                    foreach ($cursosDeseados as $cursoDeseado) {
                        $cursoDeseado->save();
                    }

                    $transaction->commit();
                } catch (Exception $exc) {
                    $transaction->rollback();
                }
            }
        }
        $this->renderPartial('create', array(
            'cursosDeseados' => $cursosDeseados
        ));
    }

    /**
     * Displays a particular model.
     * @param integer $id_cursos_deseados the ID of the model to be displayed
     */
    public function actionView($id_cursos_deseados) {
        $this->render('view', array(
            'cursosDeseados' => $this->loadModel($id_cursos_deseados),
        ));
    }

    /**
     * Updates a particular model.
     * If update is successful, the browser will be redirected to the 'index' page.
     * @param integer $id_cursos_deseados the ID of the model to be updated
     */
    public function actionUpdate($id_cursos_deseados) {
        $cursosDeseados = $this->loadModel($id_cursos_deseados);

        // Uncomment the following line if AJAX validation is needed
        // $this->performAjaxValidation($cursosDeseados);

        if (isset($_POST['CursosDeseados'])) {
            $cursosDeseados->attributes = $_POST['CursosDeseados'];

            $cursosDeseados->fecha_modificacion = date('Y-m-d h:i:s');
            $cursosDeseados->persona_modificacion = Yii::app()->user->id;


            if ($cursosDeseados->save())
                $this->redirect(array('index', 'id_cursos_deseados' => $cursosDeseados->id_cursos_deseados));
        }

        $this->render('update', array(
            'cursosDeseados' => $cursosDeseados,
        ));
    }

    /**
     * Deletes a particular model.
     * If deletion is successful, the browser will be redirected to the 'admin' page.
     * @param integer $id_cursos_deseados the ID of the model to be deleted
     */
    public function actionDelete($id_cursos_deseados) {
        $cursosDeseados = $this->loadModel($id_cursos_deseados);
        $cursosDeseados->activo = 0;
        $cursosDeseados->save();

        // if AJAX request (triggered by deletion via admin grid view), we should not redirect the browser
        if (!isset($_GET['ajax']))
            $this->redirect(isset($_POST['returnUrl']) ? $_POST['returnUrl'] : array('index'));
    }

    /**
     * Lists all models.
     */
    public function actionIndex($id_servidor_publico) {
        $cursosDeseados = new CursosDeseados('search');
        $cursosDeseados->unsetAttributes();  // clear any default values
        if (isset($_GET['CursosDeseados'])) {
            $cursosDeseados->attributes = $_GET['CursosDeseados'];
        }
        $cursosDeseados->id_servidor_publico = $id_servidor_publico;

        $this->render('index', array(
            'cursosDeseados' => $cursosDeseados
        ));
    }

    /**
     * Returns the data model based on the primary key given in the GET variable.
     * If the data model is not found, an HTTP exception will be raised.
     * @param integer $id_cursos_deseados the ID of the model to be loaded
     * @return CursosDeseados the loaded model
     * @throws CHttpException
     */
    public function loadModel($id_cursos_deseados) {


        $cursosDeseados = CursosDeseados::model()->findByPk($id_cursos_deseados);


        if ($cursosDeseados === null)
            throw new CHttpException(404, 'The requested page does not exist.');
        return $cursosDeseados;
    }

    /**
     * Performs the AJAX validation.
     * @param CursosDeseados $cursosDeseados the model to be validated
     */
    protected function performAjaxValidation($cursosDeseados) {
        if (isset($_POST['ajax']) && $_POST['ajax'] === 'cursos-deseados-form') {
            echo CActiveForm::validate($cursosDeseados);
            Yii::app()->end();
        }
    }

    /**
     * Manages all models.
     */
    public function actionAutocompleteCursosDeseados() {

        if (isset($_GET['term'])) {
            $criteria = new CDbCriteria();
            $criteria->compare('activo', true, false);
            $criteria->compare('nombre', $_GET['term'], true);
            $cursosDeseadoss = CursosDeseados::model()->findAll($criteria);
            $arr = array();
            if ($cursosDeseadoss != null) {
                foreach ($cursosDeseadoss as $cursosDeseados) {
                    $arr[] = array(
                        'label' => $cursosDeseados->nombre, // label for dropdown list
                        'value' => $cursosDeseados->nombre, // value for input field
                        'id_cursos_deseados' => $cursosDeseados->id_cursos - deseados, // return value from autocomplete
                    );
                }
            } else {
                $arr[] = array(
                    'label' => 'No hay datos', // label for dropdown list
                    'value' => '', // value for input field
                    'id_cursos_deseados' => '', // return value from autocomplete
                );
            }
            echo CJSON::encode($arr);
        }
    }

    public function actionGetDetalle() {
        if (isset($_GET['IdRegistro'])) {
            $id_cursos_deseados = $_GET['IdRegistro'];
            $cursosDeseados = CursosDeseados::model()->findByPk($id_cursos_deseados);
            $this->renderPartial("_view", array('cursosDeseados' => $cursosDeseados));
        }
    }

    /**
      Exportar a pdf el modelo
     */
    public function actionExportToPdf() {
        if (TODOS == 0) {
            $cursosDeseados = CursosDeseados::model()->findAll(array('condition' => 'activo = true'));
        }

        if (TODOS == 1) {
            $cursosDeseados = CursosDeseados::model()->findAll();
        }

        if ($cursosDeseados == null || count($cursosDeseados) == 0)
            return;
        $this->renderPartial("exportPdf", array('cursosDeseados' => $cursosDeseados));
    }

    //Exporta a excel el modelo
    public function actionExportarExcel() {

        $this->renderPartial('excel');
    }

}

?>
