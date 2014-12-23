<?php

class CursoDisponibleController extends Controller
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
                'actions' => array('view',
                    'create', 'update',
                    'delete', 'getDetalle', 'exportToPdf', 'exportarExcel',
                    'index', 'autocompleteCursoDisponible'),
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
    public function actionCreate($id_socio_tecnologico = 0)
    {

        $cursoDisponible = new CursoDisponible();

        $cursoDisponible->id_socio_tecnologico = $id_socio_tecnologico;

        if (isset($_POST['CursoDisponible'])) {
            $cursoDisponible->attributes = $_POST['CursoDisponible'];

            $cursoDisponible->fecha_creacion = date('Y-m-d h:i:s');
            $cursoDisponible->persona_creacion = Yii::app()->user->id;
            $cursoDisponible->fecha_modificacion = date('Y-m-d h:i:s');
            $cursoDisponible->persona_modificacion = Yii::app()->user->id;
            $cursoDisponible->activo = 1;

            $temario = CUploadedFile::getInstance($cursoDisponible, 'pdf_temario');

            if ($cursoDisponible->save()) {

                if ($temario != null) {
                    $ruta_pdf = "temario/temario_{$cursoDisponible->id_curso_disponible}.pdf";
                    $temario->saveAs($ruta_pdf);
                    $cursoDisponible->pdf_temario = $ruta_pdf;
                }

                if ($cursoDisponible->save()) {

                    $this->redirect(array('index', 'id_socio_tecnologico' => $id_socio_tecnologico));
                }
            }


        }

        $this->render('create', array(
            'cursoDisponible' => $cursoDisponible,
        ));

    }

    /**
     * Muestra todos los cursos disponibles
     * @param integer $id_curso_disponible the ID of the model to be displayed
     */
    public function actionView()
    {

        $cursoDisponible = new CursoDisponible('search');
        $cursoDisponible->unsetAttributes(); // clear any default values

        if (isset($_GET['CursoDisponible'])) {
            $cursoDisponible->attributes = $_GET['CursoDisponible'];
        }


        $this->render('view', array(
            'cursoDisponible' => $cursoDisponible,
        ));



    }

    /**
     * Updates a particular model.
     * If update is successful, the browser will be redirected to the 'index' page.
     * @param integer $id_curso_disponible the ID of the model to be updated
     */
    public function actionUpdate($id_curso_disponible)
    {
        $cursoDisponible = $this->loadModel($id_curso_disponible);

        // Uncomment the following line if AJAX validation is needed
        // $this->performAjaxValidation($cursoDisponible);

        if (isset($_POST['CursoDisponible'])) {
            $cursoDisponible->attributes = $_POST['CursoDisponible'];

            $cursoDisponible->fecha_modificacion = date('Y-m-d h:i:s');
            $cursoDisponible->persona_modificacion = Yii::app()->user->id;


            if ($cursoDisponible->save())
                $this->redirect(array('index', 'id_curso_disponible' => $cursoDisponible->id_curso_disponible));
        }

        $this->render('update', array(
            'cursoDisponible' => $cursoDisponible,
        ));
    }

    /**
     * Deletes a particular model.
     * If deletion is successful, the browser will be redirected to the 'admin' page.
     * @param integer $id_curso_disponible the ID of the model to be deleted
     */
    public function actionDelete($id_curso_disponible)
    {
        $cursoDisponible = $this->loadModel($id_curso_disponible);
        $cursoDisponible->activo = 0;
        $cursoDisponible->save();

        // if AJAX request (triggered by deletion via admin grid view), we should not redirect the browser
        if (!isset($_GET['ajax']))
            $this->redirect(isset($_POST['returnUrl']) ? $_POST['returnUrl'] : array('index'));
    }

    /**
     * Lists all models.
     */

    public function actionIndex($id_socio_tecnologico = 0)
    {

        $cursoDisponible = new CursoDisponible('search');
        $cursoDisponible->unsetAttributes(); // clear any default values

        if (isset($_GET['CursoDisponible'])) {
            $cursoDisponible->attributes = $_GET['CursoDisponible'];
        }

        if ($id_socio_tecnologico != 0)
            $cursoDisponible->id_socio_tecnologico = $id_socio_tecnologico;


        $this->render('index', array(
            'cursoDisponible' => $cursoDisponible,
        ));
    }

    /**
     * Returns the data model based on the primary key given in the GET variable.
     * If the data model is not found, an HTTP exception will be raised.
     * @param integer $id_curso_disponible the ID of the model to be loaded
     * @return CursoDisponible the loaded model
     * @throws CHttpException
     */
    public function loadModel($id_curso_disponible)
    {


        $cursoDisponible = CursoDisponible::model()->findByPk($id_curso_disponible);


        if ($cursoDisponible === null)
            throw new CHttpException(404, 'The requested page does not exist.');
        return $cursoDisponible;
    }

    /**
     * Performs the AJAX validation.
     * @param CursoDisponible $cursoDisponible the model to be validated
     */
    protected function performAjaxValidation($cursoDisponible)
    {
        if (isset($_POST['ajax']) && $_POST['ajax'] === 'curso-disponible-form') {
            echo CActiveForm::validate($cursoDisponible);
            Yii::app()->end();
        }
    }

    /**
     * Manages all models.
     */
    public function actionAutocompleteCursoDisponible()
    {

        if (isset($_GET['term'])) {
            $criteria = new CDbCriteria();
            $criteria->compare('activo', true, false);
            $criteria->compare('nombre', $_GET['term'], true);
            $cursoDisponibles = CursoDisponible::model()->findAll($criteria);
            $arr = array();
            if ($cursoDisponibles != null) {
                foreach ($cursoDisponibles as $cursoDisponible) {
                    $arr[] = array(
                        'label' => $cursoDisponible->nombre, // label for dropdown list
                        'value' => $cursoDisponible->nombre, // value for input field
                        'id_curso_disponible' => $cursoDisponible->id_curso - disponible, // return value from autocomplete
                    );
                }
            } else {
                $arr[] = array(
                    'label' => 'No hay datos', // label for dropdown list
                    'value' => '', // value for input field
                    'id_curso_disponible' => '', // return value from autocomplete
                );
            }
            echo CJSON::encode($arr);
        }
    }

    public function actionGetDetalle()
    {
        if (isset($_GET['IdRegistro'])) {
            $id_curso_disponible = $_GET['IdRegistro'];
            $cursoDisponible = CursoDisponible::model()->findByPk($id_curso_disponible);
            $this->renderPartial("_view", array('cursoDisponible' => $cursoDisponible));
        }
    }

    /**
     * Exportar a pdf el modelo
     */
    public function actionExportToPdf()
    {
        if (TODOS == 0) {
            $cursoDisponible = CursoDisponible::model()->findAll(array('condition' => 'activo = true'));
        }

        if (TODOS == 1) {
            $cursoDisponible = CursoDisponible::model()->findAll();
        }

        if ($cursoDisponible == null || count($cursoDisponible) == 0)
            return;
        $this->renderPartial("exportPdf", array('cursoDisponible' => $cursoDisponible));
    }

    //Exporta a excel el modelo
    public function actionExportarExcel()
    {

        $this->renderPartial('excel');
    }

}

?>
