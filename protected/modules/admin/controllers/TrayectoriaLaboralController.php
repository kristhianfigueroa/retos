<?php

class TrayectoriaLaboralController extends Controller {

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
                'modelClass' => 'TrayectoriaLaboral'
            ),
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
                    'index', 'autocompleteTrayectoriaLaboral'),
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

        $trayectoriaLaboral = new TrayectoriaLaboral();
        $trayectoriaLaboral->id_servidor_publico = $id_servidor_publico;
        $trayectoriaLaborales = array($trayectoriaLaboral);


        // Uncomment the following line if AJAX validation is needed
        // $this->performAjaxValidation($trayectoriaLaboral);

        if (isset($_POST['TrayectoriaLaboral'])) {
            $trayectoriaLaborales = array();
            foreach ($_POST['TrayectoriaLaboral'] as $traLaboral) {
                $miTrayectoriaLaboral = new TrayectoriaLaboral();
                $miTrayectoriaLaboral->attributes = $traLaboral;
                $miTrayectoriaLaboral->id_servidor_publico = $id_servidor_publico;
               /* $miTrayectoriaLaboral->fecha_creacion = date('Y-m-d h:i:s');
                $miTrayectoriaLaboral->persona_creacion = Yii::app()->user->id;
                $miTrayectoriaLaboral->fecha_modificacion = date('Y-m-d h:i:s');
                $miTrayectoriaLaboral->persona_modificacion = Yii::app()->user->id;
                $miTrayectoriaLaboral->activo=1;*/
                $trayectoriaLaborales[] = $miTrayectoriaLaboral;
            }
            $valid = true;

            foreach ($trayectoriaLaborales as $traLaboral) {
                $valid = $traLaboral->validate() & $valid;
            }

            if ($valid) {
                $transaction = $trayectoriaLaboral->getDbConnection()->beginTransaction();
                try {
                    foreach ($trayectoriaLaborales as $traLaboral) {
                        $traLaboral->save();
                    }
                    $transaction->commit();
                } catch (Exception $exc) {
                    $transaction->rollback();
                }
                $this->redirect(array('servidorPublico/index'));
            }
            // $trayectoriaLaboral->attributes = $_POST['TrayectoriaLaboral'];


            /* $trayectoriaLaboral->fecha_creacion = date('Y-m-d h:i:s');
              $trayectoriaLaboral->persona_creacion = Yii::app()->user->id;
              $trayectoriaLaboral->fecha_modificacion = date('Y-m-d h:i:s');
              $trayectoriaLaboral->persona_modificacion = Yii::app()->user->id;
              $trayectoriaLaboral->activo = 1; */


            //if ($trayectoriaLaboral->save())
                $this->redirect(array('index', 'id_trayectoria_laboral' => $trayectoriaLaboral->id_trayectoria_laboral));
        }
        $this->render('create', array(
            'trayectoriaLaborales' => $trayectoriaLaborales,
        ));
    }

    /**
     * Displays a particular model.
     * @param integer $id_trayectoria_laboral the ID of the model to be displayed
     */
    public function actionView($id_trayectoria_laboral) {
        $this->render('view', array(
            'trayectoriaLaboral' => $this->loadModel($id_trayectoria_laboral),
        ));
    }

    /**
     * Updates a particular model.
     * If update is successful, the browser will be redirected to the 'index' page.
     * @param integer $id_trayectoria_laboral the ID of the model to be updated
     */
    public function actionUpdate($id_trayectoria_laboral) {
        $trayectoriaLaboral = $this->loadModel($id_trayectoria_laboral);

        // Uncomment the following line if AJAX validation is needed
        // $this->performAjaxValidation($trayectoriaLaboral);

        if (isset($_POST['TrayectoriaLaboral'])) {
            $trayectoriaLaboral->attributes = $_POST['TrayectoriaLaboral'];

            $trayectoriaLaboral->fecha_modificacion = date('Y-m-d h:i:s');
            $trayectoriaLaboral->persona_modificacion = Yii::app()->user->id;


            if ($trayectoriaLaboral->save())
                $this->redirect(array('index', 'id_trayectoria_laboral' => $trayectoriaLaboral->id_servidor_publico));
        }

        $this->render('update', array(
            'trayectoriaLaboral' => $trayectoriaLaboral,
        ));
    }

    /**
     * Deletes a particular model.
     * If deletion is successful, the browser will be redirected to the 'admin' page.
     * @param integer $id_trayectoria_laboral the ID of the model to be deleted
     */
    public function actionDelete($id_trayectoria_laboral) {
        $trayectoriaLaboral = $this->loadModel($id_trayectoria_laboral);
        $trayectoriaLaboral->activo = 0;
        $trayectoriaLaboral->save();

        // if AJAX request (triggered by deletion via admin grid view), we should not redirect the browser
        if (!isset($_GET['ajax']))
            $this->redirect(isset($_POST['returnUrl']) ? $_POST['returnUrl'] : array('index'));
    }

    /**
     * Lists all models.
     */
    public function actionIndex($id_servidor_publico) {
        $trayectoriaLaboral = new TrayectoriaLaboral('search');
        $trayectoriaLaboral->unsetAttributes();  // clear any default values
        if (isset($_GET['TrayectoriaLaboral'])){
            $trayectoriaLaboral->attributes = $_GET['TrayectoriaLaboral'];
        }
        $trayectoriaLaboral->id_servidor_publico = $id_servidor_publico;


        $this->render('index', array(
            'trayectoriaLaboral' => $trayectoriaLaboral,
        ));
    }

    /**
     * Returns the data model based on the primary key given in the GET variable.
     * If the data model is not found, an HTTP exception will be raised.
     * @param integer $id_trayectoria_laboral the ID of the model to be loaded
     * @return TrayectoriaLaboral the loaded model
     * @throws CHttpException
     */
    public function loadModel($id_trayectoria_laboral) {


        $trayectoriaLaboral = TrayectoriaLaboral::model()->findByPk($id_trayectoria_laboral);


        if ($trayectoriaLaboral === null)
            throw new CHttpException(404, 'The requested page does not exist.');
        return $trayectoriaLaboral;
    }

    /**
     * Performs the AJAX validation.
     * @param TrayectoriaLaboral $trayectoriaLaboral the model to be validated
     */
    protected function performAjaxValidation($trayectoriaLaboral) {
        if (isset($_POST['ajax']) && $_POST['ajax'] === 'trayectoria-laboral-form') {
            echo CActiveForm::validate($trayectoriaLaboral);
            Yii::app()->end();
        }
    }

    /**
     * Manages all models.
     */
    public function actionAutocompleteTrayectoriaLaboral() {

        if (isset($_GET['term'])) {
            $criteria = new CDbCriteria();
            $criteria->compare('activo', true, false);
            $criteria->compare('nombre', $_GET['term'], true);
            $trayectoriaLaborals = TrayectoriaLaboral::model()->findAll($criteria);
            $arr = array();
            if ($trayectoriaLaborals != null) {
                foreach ($trayectoriaLaborals as $trayectoriaLaboral) {
                    $arr[] = array(
                        'label' => $trayectoriaLaboral->nombre, // label for dropdown list
                        'value' => $trayectoriaLaboral->nombre, // value for input field
                        'id_trayectoria_laboral' => $trayectoriaLaboral->id_trayectoria - laboral, // return value from autocomplete
                    );
                }
            } else {
                $arr[] = array(
                    'label' => 'No hay datos', // label for dropdown list
                    'value' => '', // value for input field
                    'id_trayectoria_laboral' => '', // return value from autocomplete
                );
            }
            echo CJSON::encode($arr);
        }
    }

    public function actionGetDetalle() {
        if (isset($_GET['IdRegistro'])) {
            $id_trayectoria_laboral = $_GET['IdRegistro'];
            $trayectoriaLaboral = TrayectoriaLaboral::model()->findByPk($id_trayectoria_laboral);
            $this->renderPartial("_view", array('trayectoriaLaboral' => $trayectoriaLaboral));
        }
    }

    /**
      Exportar a pdf el modelo
     */
    public function actionExportToPdf() {
        if (TODOS == 0) {
            $trayectoriaLaboral = TrayectoriaLaboral::model()->findAll(array('condition' => 'activo = true'));
        }

        if (TODOS == 1) {
            $trayectoriaLaboral = TrayectoriaLaboral::model()->findAll();
        }

        if ($trayectoriaLaboral == null || count($trayectoriaLaboral) == 0)
            return;
        $this->renderPartial("exportPdf", array('trayectoriaLaboral' => $trayectoriaLaboral));
    }

    //Exporta a excel el modelo
    public function actionExportarExcel() {

        $this->renderPartial('excel');
    }

}

?>
