<?php
class ObjetivoController extends Controller
{
    /**
     * @var string the default layout for the views. Defaults to '//layouts/column2', meaning
     * using two-column layout. See 'protected/views/layouts/column2.php'.
     */
    public $layout = '//layouts/column2';

    /**
     * @return array action filters
     */
    public function filters()
    {
        return array(
            'accessControl', // perform access control for CRUD operations
            'postOnly + delete', // we only allow deletion via POST request
        );
    }

    public function actions()
    {
        return array(
            'getRowForm' => array(
                'class' => 'ext.dynamictabularform.actions.GetRowForm',
                'view' => '_rowForm',
                'modelClass' => 'Objetivo'
            )
        );
    }

    /**
     * Specifies the access control rules.
     * This method is used by the 'accessControl' filter.
     * @return array access control rules
     */
    public function accessRules()
    {
        $admins = CatNivelAcceso::getAdmins();

        return array(
            array('allow', // allow authenticated user to perform 'create' and 'update' actions
                'actions' => array('view', 'create', 'update', 'createFuncionario', 'delete', 'getDetalle', 'exportToPdf', 'exportarExcel', 'getRowForm',
                    'index', 'autocompleteObjetivo'),
                'users' => $admins
            ),
            array('allow', // allow authenticated user to perform 'create' and 'update' actions
                'actions' => array('getRowForm','createFuncionario'),
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
    public function actionCreate($id_servidor_publico)
    {

        $objetivo = new Objetivo();
        $objetivo->id_servidor_publico = $objetivo;

        // Uncomment the following line if AJAX validation is needed
        // $this->performAjaxValidation($objetivo);

        if (isset($_POST['Objetivo'])) {
            $objetivo->attributes = $_POST['Objetivo'];
            $objetivo->fecha_creacion = date('Y-m-d h:i:s');
            $objetivo->persona_creacion = Yii::app()->user->id;
            $objetivo->fecha_modificacion = date('Y-m-d h:i:s');
            $objetivo->persona_modificacion = Yii::app()->user->id;
            $objetivo->activo = 1;


            if ($objetivo->save())
                $this->redirect(array('index', 'id_objetivo' => $objetivo->id_objetivo));
        }

        $this->render('create', array(
            'objetivo' => $objetivo,
        ));
    }

    /**
     * Displays a particular model.
     * @param integer $id_objetivo the ID of the model to be displayed
     */
    public function actionCreateFuncionario()
    {

        $objetivo = new Objetivo();

        $objetivos = array($objetivo);

        if (isset($_POST['Objetivo'])) {

            $objetivos = array();
            foreach ($_POST['Objetivo'] as $objetivoTemp) {


                if ($objetivoTemp['updateType'] == DynamicTabularForm::UPDATE_TYPE_CREATE) {

                    $objetivo = new Objetivo();
                    $objetivo->attributes = $objetivoTemp;
                    $objetivo->fecha_creacion = date('Y-m-d h:i:s');
                    $objetivo->persona_creacion = Yii::app()->user->id;
                    $objetivo->fecha_modificacion = date('Y-m-d h:i:s');
                    $objetivo->persona_modificacion = Yii::app()->user->id;
                    $objetivo->activo = 1;
                    $objetivo->id_servidor_publico = Yii::app()->user->id;
                    $objetivos[] = $objetivo;

                }
                if ($objetivoTemp['updateType'] == DynamicTabularForm::UPDATE_TYPE_UPDATE) {

                    $objetivo = Objetivo::model()->findByPk($objetivoTemp['id_objetivo']);

                    $objetivo->attributes = $objetivoTemp;
                    $objetivos[] = $objetivo;

                }
                if ($objetivoTemp['updateType'] == DynamicTabularForm::UPDATE_TYPE_DELETE) {

                    $delete = Objetivo::model()->findByPk($objetivoTemp['id_objetivo']);
                    if ($delete->delete()) {


                    }
                }

            }

            $valid = true;
            foreach ($objetivos as $objetivoDeseado) {
                $valid = $objetivoDeseado->validate() & $valid;
            }

            if ($valid) {
                $transaction = $objetivo->getDbConnection()->beginTransaction();
                try {
                    foreach ($objetivos as $objetivoDeseado) {
                        $objetivoDeseado->save();
                    }

                    $transaction->commit();
                } catch (Exception $exc) {
                    $transaction->rollback();
                }
            }
        }
        $this->renderPartial('create', array(
            'objetivos' => $objetivos
        ));
    }

    /**
     * Displays a particular model.
     * @param integer $id_objetivo the ID of the model to be displayed
     */
    public function actionView($id_objetivo)
    {

        $this->render('view', array(
            'objetivo' => $this->loadModel($id_objetivo),
        ));
    }

    /**
     * Updates a particular model.
     * If update is successful, the browser will be redirected to the 'index' page.
     * @param integer $id_objetivo the ID of the model to be updated
     */
    public function actionUpdate($id_objetivo)
    {
        $objetivo = $this->loadModel($id_objetivo);

        // Uncomment the following line if AJAX validation is needed
        // $this->performAjaxValidation($objetivo);

        if (isset($_POST['Objetivo'])) {
            $objetivo->attributes = $_POST['Objetivo'];

            $objetivo->fecha_modificacion = date('Y-m-d h:i:s');
            $objetivo->persona_modificacion = Yii::app()->user->id;


            if ($objetivo->save())
                $this->redirect(array('index', 'id_objetivo' => $objetivo->id_objetivo));
        }

        $this->render('update', array(
            'objetivo' => $objetivo,
        ));
    }

    /**
     * Deletes a particular model.
     * If deletion is successful, the browser will be redirected to the 'admin' page.
     * @param integer $id_objetivo the ID of the model to be deleted
     */
    public function actionDelete($id_objetivo)
    {
        $objetivo = $this->loadModel($id_objetivo);
        $objetivo->activo = 0;
        $objetivo->save();

        // if AJAX request (triggered by deletion via admin grid view), we should not redirect the browser
        if (!isset($_GET['ajax']))
            $this->redirect(isset($_POST['returnUrl']) ? $_POST['returnUrl'] : array('index'));
    }

    /**
     * Lists all models.
     */
    public function actionIndex($id_servidor_publico = 0)
    {
        $objetivo = new Objetivo('search');
        $objetivo->unsetAttributes(); // clear any default values
        if (isset($_GET['Objetivo']))
            $objetivo->attributes = $_GET['Objetivo'];

        if ($id_servidor_publico != 0) {
            $objetivo->id_servidor_publico = $id_servidor_publico;
        }

        $this->render('index', array(
            'objetivo' => $objetivo,
        ));
    }


    /**
     * Returns the data model based on the primary key given in the GET variable.
     * If the data model is not found, an HTTP exception will be raised.
     * @param integer $id_objetivo the ID of the model to be loaded
     * @return Objetivo the loaded model
     * @throws CHttpException
     */
    public function loadModel($id_objetivo)
    {


        $objetivo = Objetivo::model()->findByPk($id_objetivo);


        if ($objetivo === null)
            throw new CHttpException(404, 'The requested page does not exist.');
        return $objetivo;
    }

    /**
     * Performs the AJAX validation.
     * @param Objetivo $objetivo the model to be validated
     */
    protected function performAjaxValidation($objetivo)
    {
        if (isset($_POST['ajax']) && $_POST['ajax'] === 'objetivo-form') {
            echo CActiveForm::validate($objetivo);
            Yii::app()->end();
        }
    }


    /**
     * Manages all models.
     */
    public function actionAutocompleteObjetivo()
    {

        if (isset($_GET['term'])) {
            $criteria = new CDbCriteria();
            $criteria->compare('activo', true, false);
            $criteria->compare('nombre', $_GET['term'], true);
            $objetivos = Objetivo::model()->findAll($criteria);
            $arr = array();
            if ($objetivos != null) {
                foreach ($objetivos as $objetivo) {
                    $arr[] = array(
                        'label' => $objetivo->nombre, // label for dropdown list
                        'value' => $objetivo->nombre, // value for input field
                        'id_objetivo' => $objetivo->id_objetivo, // return value from autocomplete
                    );
                }
            } else {
                $arr[] = array(
                    'label' => 'No hay datos', // label for dropdown list
                    'value' => '', // value for input field
                    'id_objetivo' => '', // return value from autocomplete
                );
            }
            echo CJSON::encode($arr);
        }
    }

    public function actionGetDetalle()
    {

        if (isset($_GET['id_objetivo'])) {
            $id_objetivo = $_GET['id_objetivo'];
            $objetivo = Objetivo::model()->findByPk($id_objetivo);
            $this->renderPartial("_view",
                array(
                    'objetivo' => $objetivo,
                    'disabled' => 'disabled',
                ));

        }

    }

    /**
     * Exportar a pdf el modelo
     */

    public function actionExportToPdf()
    {
        if (TODOS == 0) {
            $objetivo = Objetivo::model()->findAll(array('condition' => 'activo = true'));
        }

        if (TODOS == 1) {
            $objetivo = Objetivo::model()->findAll();
        }

        if ($objetivo == null || count($objetivo) == 0)
            return;
        $this->renderPartial("exportPdf", array('objetivo' => $objetivo));
    }


    //Exporta a excel el modelo
    public function actionExportarExcel()
    {

        $this->renderPartial('excel');

    }

}

?>
