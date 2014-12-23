<?php

class SocioTecnologicoController extends Controller {

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

    /**
     * Specifies the access control rules.
     * This method is used by the 'accessControl' filter.
     * @return array access control rules
     */
    public function accessRules() {


        $admins = CatNivelAcceso::getAdmins();

        return array(
            array('allow', // allow authenticated user to perform 'create' and 'update' actions
                'actions' => array('view', 'create', 'update', 'delete', 'getDetalle', 'exportToPdf', 'exportarExcel',
                    'index', 'autocompleteSocioTecnologico'),
                'users' =>$admins
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
    public function actionCreate() {

        $socioTecnologico = new SocioTecnologico();
        // Uncomment the following line if AJAX validation is needed
        // $this->performAjaxValidation($socioTecnologico);

        if (isset($_POST['SocioTecnologico'])) {
            $socioTecnologico->attributes = $_POST['SocioTecnologico'];


            $socioTecnologico->fecha_creacion = date('Y-m-d h:i:s');
            $socioTecnologico->persona_creacion = Yii::app()->user->id;
            $socioTecnologico->fecha_modificacion = date('Y-m-d h:i:s');
            $socioTecnologico->persona_modificacion = Yii::app()->user->id;
            $socioTecnologico->activo = 1;


            if ($socioTecnologico->save())
                $this->redirect(array('index', 'id_socio_tecnologico' => $socioTecnologico->id_socio_tecnologico));
        }

        $this->render('create', array(
            'socioTecnologico' => $socioTecnologico,
        ));
    }

    /**
     * Displays a particular model.
     * @param integer $id_socio_tecnologico the ID of the model to be displayed
     */
    public function actionView($id_socio_tecnologico) {
        $this->render('view', array(
            'socioTecnologico' => $this->loadModel($id_socio_tecnologico),
        ));
    }

    /**
     * Updates a particular model.
     * If update is successful, the browser will be redirected to the 'index' page.
     * @param integer $id_socio_tecnologico the ID of the model to be updated
     */
    public function actionUpdate($id_socio_tecnologico) {
        $socioTecnologico = $this->loadModel($id_socio_tecnologico);

        // Uncomment the following line if AJAX validation is needed
        // $this->performAjaxValidation($socioTecnologico);

        if (isset($_POST['SocioTecnologico'])) {
            $socioTecnologico->attributes = $_POST['SocioTecnologico'];

            $socioTecnologico->fecha_modificacion = date('Y-m-d h:i:s');
            $socioTecnologico->persona_modificacion = Yii::app()->user->id;


            if ($socioTecnologico->save())
                $this->redirect(array('index', 'id_socio_tecnologico' => $socioTecnologico->id_socio_tecnologico));
        }

        $this->render('update', array(
            'socioTecnologico' => $socioTecnologico,
        ));
    }

    /**
     * Deletes a particular model.
     * If deletion is successful, the browser will be redirected to the 'admin' page.
     * @param integer $id_socio_tecnologico the ID of the model to be deleted
     */
    public function actionDelete($id_socio_tecnologico) {
        $socioTecnologico = $this->loadModel($id_socio_tecnologico);
        $socioTecnologico->activo = 0;
        $socioTecnologico->save();

        // if AJAX request (triggered by deletion via admin grid view), we should not redirect the browser
        if (!isset($_GET['ajax']))
            $this->redirect(isset($_POST['returnUrl']) ? $_POST['returnUrl'] : array('index'));
    }

    /**
     * Lists all models.
     */
    public function actionIndex() {

        $socioTecnologico = new SocioTecnologico('search');
        $socioTecnologico->unsetAttributes();  // clear any default values

        if (isset($_GET['SocioTecnologico']))
            $socioTecnologico->attributes = $_GET['SocioTecnologico'];

        $this->render('index', array(
            'socioTecnologico' => $socioTecnologico,
        ));
    }

    /**
     * Returns the data model based on the primary key given in the GET variable.
     * If the data model is not found, an HTTP exception will be raised.
     * @param integer $id_socio_tecnologico the ID of the model to be loaded
     * @return SocioTecnologico the loaded model
     * @throws CHttpException
     */
    public function loadModel($id_socio_tecnologico) {


        $socioTecnologico = SocioTecnologico::model()->findByPk($id_socio_tecnologico);


        if ($socioTecnologico === null)
            throw new CHttpException(404, 'The requested page does not exist.');
        return $socioTecnologico;
    }

    /**
     * Performs the AJAX validation.
     * @param SocioTecnologico $socioTecnologico the model to be validated
     */
    protected function performAjaxValidation($socioTecnologico) {
        if (isset($_POST['ajax']) && $_POST['ajax'] === 'socio-tecnologico-form') {
            echo CActiveForm::validate($socioTecnologico);
            Yii::app()->end();
        }
    }

    /**
     * Manages all models.
     */
    public function actionAutocompleteSocioTecnologico() {

        if (isset($_GET['term'])) {
            $criteria = new CDbCriteria();
            $criteria->compare('activo', true, false);
            $criteria->compare('nombre', $_GET['term'], true);
            $socioTecnologicos = SocioTecnologico::model()->findAll($criteria);
            $arr = array();
            if ($socioTecnologicos != null) {
                foreach ($socioTecnologicos as $socioTecnologico) {
                    $arr[] = array(
                        'label' => $socioTecnologico->nombre, // label for dropdown list
                        'value' => $socioTecnologico->nombre, // value for input field
                        'id_socio_tecnologico' => $socioTecnologico->id_socio - tecnologico, // return value from autocomplete
                    );
                }
            } else {
                $arr[] = array(
                    'label' => 'No hay datos', // label for dropdown list
                    'value' => '', // value for input field
                    'id_socio_tecnologico' => '', // return value from autocomplete
                );
            }
            echo CJSON::encode($arr);
        }
    }

    public function actionGetDetalle() {
        if (isset($_GET['IdRegistro'])) {
            $id_socio_tecnologico = $_GET['IdRegistro'];
            $socioTecnologico = SocioTecnologico::model()->findByPk($id_socio_tecnologico);
            $this->renderPartial("_view", array('socioTecnologico' => $socioTecnologico));
        }
    }

    /**
      Exportar a pdf el modelo
     */
    public function actionExportToPdf() {
        if (TODOS == 0) {
            $socioTecnologico = SocioTecnologico::model()->findAll(array('condition' => 'activo = true'));
        }

        if (TODOS == 1) {
            $socioTecnologico = SocioTecnologico::model()->findAll();
        }

        if ($socioTecnologico == null || count($socioTecnologico) == 0)
            return;
        $this->renderPartial("exportPdf", array('socioTecnologico' => $socioTecnologico));
    }

    //Exporta a excel el modelo
    public function actionExportarExcel() {

        $this->renderPartial('excel');
    }

}

?>
