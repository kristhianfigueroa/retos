<?php

class FormacionAcademicaController extends Controller {

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
                'modelClass' => 'FormacionAcademica'
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
                    'index', 'autocompleteFormacionAcademica'),
                'users' => $admins
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

        $formacionAcademica = new FormacionAcademica();
        $formacionAcademicas = array($formacionAcademica);
        // Uncomment the following line if AJAX validation is needed
        // $this->performAjaxValidation($formacionAcademica);

        if (isset($_POST['FormacionAcademica'])) {
            $formacionAcademicas = array();
            foreach ($_POST['FormacionAcademica'] as $forAcademica) {
                $miFormacionAcademica = new FormacionAcademica();
                $miFormacionAcademica->attributes = $forAcademica;
                $miFormacionAcademica->id_servidor_publico=$id_servidor_publico;
                /* $formacionAcademica->fecha_creacion = date('Y-m-d h:i:s');
                  $formacionAcademica->persona_creacion = Yii::app()->user->id;
                  $formacionAcademica->fecha_modificacion = date('Y-m-d h:i:s');
                  $formacionAcademica->persona_modificacion = Yii::app()->user->id;
                  $formacionAcademica->activo = 1; */
                $formacionAcademicas[] = $miFormacionAcademica;
            }
            $valid = true;
            foreach ($formacionAcademicas as $formacionAcademica) {
                $valid = $formacionAcademica->validate() & $valid;
            }
            if ($valid) {
                $transaction = $formacionAcademica->getDbConnection()->beginTransaction();
                try {
                    foreach ($formacionAcademicas as $formAcademica) {
                        $formAcademica->save();
                    }
                    $transaction->commit();
                } catch (Exception $exc) {
                    $transaction->rollback();
                }
                $this->redirect(array('index', 'id_servidor_publico' => $id_servidor_publico));
            }
        }

        $this->render('create', array(
            //'formacionAcademica' => $formacionAcademica,
            'formacionAcademicas' => $formacionAcademicas
        ));
    }

    /**
     * Displays a particular model.
     * @param integer $id_formacion_academica the ID of the model to be displayed
     */
    public function actionView($id_formacion_academica) {
        $this->render('view', array(
            'formacionAcademica' => $this->loadModel($id_formacion_academica),
        ));
    }

    /**
     * Updates a particular model.
     * If update is successful, the browser will be redirected to the 'index' page.
     * @param integer $id_formacion_academica the ID of the model to be updated
     */
    public function actionUpdate($id_formacion_academica) {
        $formacionAcademica = $this->loadModel($id_formacion_academica);

        // Uncomment the following line if AJAX validation is needed
        // $this->performAjaxValidation($formacionAcademica);

        if (isset($_POST['FormacionAcademica'])) {
            $formacionAcademica->attributes = $_POST['FormacionAcademica'];
            //$formacionAcademica->fecha_modificacion = date('Y-m-d h:i:s');
            //$formacionAcademica->persona_modificacion = Yii::app()->user->id;


            if ($formacionAcademica->save()){
               $this->redirect(array('formacionAcademica/index', 'id_servidor_publico' => $formacionAcademica->id_servidor_publico)); 
            }
        }

        $this->render('update', array(
            'formacionAcademica' => $formacionAcademica,
        ));
    }

    /**
     * Deletes a particular model.
     * If deletion is successful, the browser will be redirected to the 'admin' page.
     * @param integer $id_formacion_academica the ID of the model to be deleted
     */
    public function actionDelete($id_formacion_academica) {
        $formacionAcademica = $this->loadModel($id_formacion_academica);
        $formacionAcademica->activo = 0;
        $formacionAcademica->save();

        // if AJAX request (triggered by deletion via admin grid view), we should not redirect the browser
        if (!isset($_GET['ajax']))
            $this->redirect(isset($_POST['returnUrl']) ? $_POST['returnUrl'] : array('index'));
    }

    /**
     * Lists all models.
     */
    public function actionIndex($id_servidor_publico) {
        $formacionAcademica = new FormacionAcademica('search');
        $formacionAcademica->unsetAttributes();  // clear any default values
        if (isset($_GET['FormacionAcademica'])) {
            $formacionAcademica->attributes = $_GET['FormacionAcademica'];
        }
         $formacionAcademica->id_servidor_publico = $id_servidor_publico;

        $this->render('index', array(
            'formacionAcademica' => $formacionAcademica
        ));
    }

    /**
     * Returns the data model based on the primary key given in the GET variable.
     * If the data model is not found, an HTTP exception will be raised.
     * @param integer $id_formacion_academica the ID of the model to be loaded
     * @return FormacionAcademica the loaded model
     * @throws CHttpException
     */
    public function loadModel($id_formacion_academica) {


        $formacionAcademica = FormacionAcademica::model()->findByPk($id_formacion_academica);


        if ($formacionAcademica === null)
            throw new CHttpException(404, 'The requested page does not exist.');
        return $formacionAcademica;
    }

    /**
     * Performs the AJAX validation.
     * @param FormacionAcademica $formacionAcademica the model to be validated
     */
    protected function performAjaxValidation($formacionAcademica) {
        if (isset($_POST['ajax']) && $_POST['ajax'] === 'formacion-academica-form') {
            echo CActiveForm::validate($formacionAcademica);
            Yii::app()->end();
        }
    }

    /**
     * Manages all models.
     */
    public function actionAutocompleteFormacionAcademica() {

        if (isset($_GET['term'])) {
            $criteria = new CDbCriteria();
            $criteria->compare('activo', true, false);
            $criteria->compare('nombre', $_GET['term'], true);
            $formacionAcademicas = FormacionAcademica::model()->findAll($criteria);
            $arr = array();
            if ($formacionAcademicas != null) {
                foreach ($formacionAcademicas as $formacionAcademica) {
                    $arr[] = array(
                        'label' => $formacionAcademica->nombre, // label for dropdown list
                        'value' => $formacionAcademica->nombre, // value for input field
                        'id_formacion_academica' => $formacionAcademica->id_formacion - academica, // return value from autocomplete
                    );
                }
            } else {
                $arr[] = array(
                    'label' => 'No hay datos', // label for dropdown list
                    'value' => '', // value for input field
                    'id_formacion_academica' => '', // return value from autocomplete
                );
            }
            echo CJSON::encode($arr);
        }
    }

    public function actionGetDetalle() {
        if (isset($_GET['IdRegistro'])) {
            $id_formacion_academica = $_GET['IdRegistro'];
            $formacionAcademica = FormacionAcademica::model()->findByPk($id_formacion_academica);
            $this->renderPartial("_view", array('formacionAcademica' => $formacionAcademica));
        }
    }

    /**
      Exportar a pdf el modelo
     */
    public function actionExportToPdf() {
        if (TODOS == 0) {
            $formacionAcademica = FormacionAcademica::model()->findAll(array('condition' => 'activo = true'));
        }

        if (TODOS == 1) {
            $formacionAcademica = FormacionAcademica::model()->findAll();
        }

        if ($formacionAcademica == null || count($formacionAcademica) == 0)
            return;
        $this->renderPartial("exportPdf", array('formacionAcademica' => $formacionAcademica));
    }

    //Exporta a excel el modelo
    public function actionExportarExcel() {

        $this->renderPartial('excel');
    }

}

?>
