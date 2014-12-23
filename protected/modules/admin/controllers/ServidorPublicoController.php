<?php

class ServidorPublicoController extends Controller
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
                'actions' => array('view', 'create', 'update', 'delete', 'getDetalle', 'exportToPdf', 'exportarExcel',
                    'index', 'autocompleteServidorPublico'),
                'users' =>         $admins

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
    public function actionCreate()
    {


        $servidorPublico = new ServidorPublico();

        // Uncomment the following line if AJAX validation is needed
        // $this->performAjaxValidation($servidorPublico);

        if (isset($_POST['ServidorPublico'])) {
            $servidorPublico->attributes = $_POST['ServidorPublico'];
            $fotoTemp = CUploadedFile::getInstance($servidorPublico, 'foto');

            $servidorPublico->fecha_creacion = date('Y-m-d h:i:s');
            $servidorPublico->persona_creacion = Yii::app()->user->id;
            $servidorPublico->fecha_modificacion = date('Y-m-d h:i:s');
            $servidorPublico->persona_modificacion = Yii::app()->user->id;
            $servidorPublico->activo = 1;

            if ($servidorPublico->save()) {

                if ($fotoTemp != null) {
                    $extension_imagen = $fotoTemp->getExtensionName();
                    $ruta_img = "img/servidor_publico/servidor_{$servidorPublico->id_servidor_publico}.{$extension_imagen}";
                    $servidorPublico->foto->saveAs($ruta_img);
                    $servidorPublico->foto = $ruta_img;
                }

                if ($servidorPublico->save()) {

                    $this->redirect(array('index'));

                }

            }

        }

        $this->render('create', array(
            'servidorPublico' => $servidorPublico
        ));
    }

    /**
     * Displays a particular model.
     * @param integer $id_servidor_publico the ID of the model to be displayed
     */
    public function actionView($id_servidor_publico)
    {
        $this->render('view', array(
            'servidorPublico' => $this->loadModel($id_servidor_publico),
        ));
    }

    /**
     * Updates a particular model.
     * If update is successful, the browser will be redirected to the 'index' page.
     * @param integer $id_servidor_publico the ID of the model to be updated
     */
    public function actionUpdate($id_servidor_publico)
    {

        $servidorPublico = $this->loadModel($id_servidor_publico);


        if (isset($_POST['ServidorPublico'])) {
            $_POST['ServidorPublico']['foto'] = $servidorPublico->foto;

            $servidorPublico->attributes = $_POST['ServidorPublico'];
            $servidorPublico->fecha_modificacion = date('Y-m-d h:i:s');
            $servidorPublico->persona_modificacion = Yii::app()->user->id;

            $foto = CUploadedFile::getInstance($servidorPublico, 'foto');

            if (file_exists($servidorPublico->foto)) {
                $ruta_foto = $servidorPublico->foto;
                $servidorPublico->foto = $ruta_foto;
            }

            if ($servidorPublico->save()) {
                if (!empty($foto)) {
                    $foto->saveAs($servidorPublico->foto);
                }
                $this->redirect(array('index'));
            }
        }

        $this->render('update', array(
            'servidorPublico' => $servidorPublico,
        ));
    }

    /**
     * Deletes a particular model.
     * If deletion is successful, the browser will be redirected to the 'admin' page.
     * @param integer $id_servidor_publico the ID of the model to be deleted
     */
    public function actionDelete($id_servidor_publico)
    {
        $servidorPublico = $this->loadModel($id_servidor_publico);
        $servidorPublico->activo = 0;
        $servidorPublico->save();

        // if AJAX request (triggered by deletion via admin grid view), we should not redirect the browser
        if (!isset($_GET['ajax']))
            $this->redirect(isset($_POST['returnUrl']) ? $_POST['returnUrl'] : array('index'));
    }

    /**
     * Lists all models.
     */
    public function actionIndex()
    {
        $servidorPublico = new ServidorPublico('search');
        $servidorPublico->unsetAttributes(); // clear any default values
        if (isset($_GET['ServidorPublico']))
            $servidorPublico->attributes = $_GET['ServidorPublico'];

        $this->render('index', array(
            'servidorPublico' => $servidorPublico,
        ));
    }

    /**
     * Returns the data model based on the primary key given in the GET variable.
     * If the data model is not found, an HTTP exception will be raised.
     * @param integer $id_servidor_publico the ID of the model to be loaded
     * @return ServidorPublico the loaded model
     * @throws CHttpException
     */
    public function loadModel($id_servidor_publico)
    {


        $servidorPublico = ServidorPublico::model()->findByPk($id_servidor_publico);


        if ($servidorPublico === null)
            throw new CHttpException(404, 'The requested page does not exist.');
        return $servidorPublico;
    }

    /**
     * Performs the AJAX validation.
     * @param ServidorPublico $servidorPublico the model to be validated
     */
    protected function performAjaxValidation($servidorPublico)
    {
        if (isset($_POST['ajax']) && $_POST['ajax'] === 'servidor-publico-form') {
            echo CActiveForm::validate($servidorPublico);
            Yii::app()->end();
        }
    }

    /**
     * Manages all models.
     */
    public function actionAutocompleteServidorPublico()
    {

        if (isset($_GET['term'])) {
            $criteria = new CDbCriteria();
            $criteria->compare('activo', true, false);
            $criteria->compare('nombre', $_GET['term'], true);
            $servidorPublicos = ServidorPublico::model()->findAll($criteria);
            $arr = array();
            if ($servidorPublicos != null) {
                foreach ($servidorPublicos as $servidorPublico) {
                    $arr[] = array(
                        'label' => $servidorPublico->nombre, // label for dropdown list
                        'value' => $servidorPublico->nombre, // value for input field
                        'id_servidor_publico' => $servidorPublico->id_servidor - publico, // return value from autocomplete
                    );
                }
            } else {
                $arr[] = array(
                    'label' => 'No hay datos', // label for dropdown list
                    'value' => '', // value for input field
                    'id_servidor_publico' => '', // return value from autocomplete
                );
            }
            echo CJSON::encode($arr);
        }
    }

    public function actionGetDetalle()
    {
        if (isset($_GET['IdRegistro'])) {
            $id_servidor_publico = $_GET['IdRegistro'];
            $servidorPublico = ServidorPublico::model()->findByPk($id_servidor_publico);
            $this->renderPartial("_view", array('servidorPublico' => $servidorPublico));
        }
    }

    /**
     * Exportar a pdf el modelo
     */
    public function actionExportToPdf()
    {
        if (TODOS == 0) {
            $servidorPublico = ServidorPublico::model()->findAll(array('condition' => 'activo = true'));
        }

        if (TODOS == 1) {
            $servidorPublico = ServidorPublico::model()->findAll();
        }

        if ($servidorPublico == null || count($servidorPublico) == 0)
            return;
        $this->renderPartial("exportPdf", array('servidorPublico' => $servidorPublico));
    }

    //Exporta a excel el modelo
    public function actionExportarExcel()
    {

        $this->renderPartial('excel');
    }

}

?>
