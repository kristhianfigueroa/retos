<?php
class CursoDisponibleServidorPublicoController extends Controller
{
	/**
	 * @var string the default layout for the views. Defaults to '//layouts/column2', meaning
	 * using two-column layout. See 'protected/views/layouts/column2.php'.
	 */
	public $layout='//layouts/column2';

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

		return array(
			array('allow', // allow authenticated user to perform 'create' and 'update' actions
				'actions'=>array('view','create','update','delete','getDetalle','exportToPdf','exportarExcel',
                                    'index','autocompleteCursoDisponibleServidorPublico'),
				'users'=>array('@')
			),
			array('deny',  // deny all users
				'users'=>array('*')
			)
		);
	}


	/**
	 * Creates a new model.
	 * If creation is successful, the browser will be redirected to the 'index' page.
	 */
	public function actionCreate()
	{

			$cursoDisponibleServidorPublico = new CursoDisponibleServidorPublico();

        // Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($cursoDisponibleServidorPublico);

		if(isset($_POST['CursoDisponibleServidorPublico']))
		{
			$cursoDisponibleServidorPublico->attributes=$_POST['CursoDisponibleServidorPublico'];


            $cursoDisponibleServidorPublico->fecha_creacion = date('Y-m-d h:i:s');
            $cursoDisponibleServidorPublico->persona_creacion = Yii::app()->user->id;
            $cursoDisponibleServidorPublico->fecha_modificacion = date('Y-m-d h:i:s');
            $cursoDisponibleServidorPublico->persona_modificacion = Yii::app()->user->id;
            $cursoDisponibleServidorPublico->activo = 1;


           if($cursoDisponibleServidorPublico->save())
				$this->redirect(array('index','id_curso_disponible_servidor_publico'=>$cursoDisponibleServidorPublico->id_curso_disponible_servidor_publico));
    		}

		$this->render('create',array(
'cursoDisponibleServidorPublico'=>$cursoDisponibleServidorPublico,
		));
	}

/**
* Displays a particular model.
* @param integer $id_curso_disponible_servidor_publico the ID of the model to be displayed
*/
public function actionView($id_curso_disponible_servidor_publico)
{
$this->render('view',array(
'cursoDisponibleServidorPublico'=>$this->loadModel($id_curso_disponible_servidor_publico),
));
}

	/**
	 * Updates a particular model.
	 * If update is successful, the browser will be redirected to the 'index' page.
	 * @param integer $id_curso_disponible_servidor_publico the ID of the model to be updated
	 */
	public function actionUpdate($id_curso_disponible_servidor_publico)
	{
		$cursoDisponibleServidorPublico=$this->loadModel($id_curso_disponible_servidor_publico);

		// Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($cursoDisponibleServidorPublico);

		if(isset($_POST['CursoDisponibleServidorPublico']))
		{
			$cursoDisponibleServidorPublico->attributes=$_POST['CursoDisponibleServidorPublico'];

            $cursoDisponibleServidorPublico->fecha_modificacion = date('Y-m-d h:i:s');
            $cursoDisponibleServidorPublico->persona_modificacion = Yii::app()->user->id;


			if($cursoDisponibleServidorPublico->save())
				$this->redirect(array('index','id_curso_disponible_servidor_publico'=>$cursoDisponibleServidorPublico->id_curso_disponible_servidor_publico));
		}

		$this->render('update',array(
        'cursoDisponibleServidorPublico'=>$cursoDisponibleServidorPublico,
		));
	}

	/**
	 * Deletes a particular model.
	 * If deletion is successful, the browser will be redirected to the 'admin' page.
	 * @param integer $id_curso_disponible_servidor_publico the ID of the model to be deleted
	 */
	public function actionDelete($id_curso_disponible_servidor_publico)
	{
        $cursoDisponibleServidorPublico = $this->loadModel($id_curso_disponible_servidor_publico);
        $cursoDisponibleServidorPublico -> activo = 0;
        $cursoDisponibleServidorPublico->save();

		// if AJAX request (triggered by deletion via admin grid view), we should not redirect the browser
		if(!isset($_GET['ajax']))
			$this->redirect(isset($_POST['returnUrl']) ? $_POST['returnUrl'] : array('index'));
	}

	/**
	 * Lists all models.
	 */
	public function actionIndex()
	{
		$cursoDisponibleServidorPublico=new CursoDisponibleServidorPublico('search');
		$cursoDisponibleServidorPublico->unsetAttributes();  // clear any default values
		if(isset($_GET['CursoDisponibleServidorPublico']))
			$cursoDisponibleServidorPublico->attributes=$_GET['CursoDisponibleServidorPublico'];
        
		$this->render('index',array(
'cursoDisponibleServidorPublico'=>$cursoDisponibleServidorPublico,
                                    ));
	}


	/**
	 * Returns the data model based on the primary key given in the GET variable.
	 * If the data model is not found, an HTTP exception will be raised.
	 * @param integer $id_curso_disponible_servidor_publico the ID of the model to be loaded
	 * @return CursoDisponibleServidorPublico the loaded model
	 * @throws CHttpException
	 */
	public function loadModel($id_curso_disponible_servidor_publico)
	{


		$cursoDisponibleServidorPublico=CursoDisponibleServidorPublico::model()->findByPk($id_curso_disponible_servidor_publico);


		if($cursoDisponibleServidorPublico===null)
			throw new CHttpException(404,'The requested page does not exist.');
		return $cursoDisponibleServidorPublico;
	}

	/**
	 * Performs the AJAX validation.
	 * @param CursoDisponibleServidorPublico $cursoDisponibleServidorPublico the model to be validated
	 */
	protected function performAjaxValidation($cursoDisponibleServidorPublico)
	{
		if(isset($_POST['ajax']) && $_POST['ajax']==='curso-disponible-servidor-publico-form')
		{
			echo CActiveForm::validate($cursoDisponibleServidorPublico);
			Yii::app()->end();
		}
	}



    /**
    * Manages all models.
    */
    public function actionAutocompleteCursoDisponibleServidorPublico()
    {

        if(isset($_GET['term']))
        {
            $criteria = new CDbCriteria();
            $criteria->compare('activo',true, false);
            $criteria->compare('nombre',$_GET['term'],true);
            $cursoDisponibleServidorPublicos=CursoDisponibleServidorPublico::model()->findAll($criteria);
            $arr = array();
            if($cursoDisponibleServidorPublicos!=null){
                foreach($cursoDisponibleServidorPublicos as $cursoDisponibleServidorPublico) {
                $arr[] = array(
                'label'=>$cursoDisponibleServidorPublico->nombre,  // label for dropdown list
                'value'=>$cursoDisponibleServidorPublico->nombre,  // value for input field
                'id_curso_disponible_servidor_publico'=>$cursoDisponibleServidorPublico->id_curso-disponible-servidor-publico,  // return value from autocomplete
                );
            }
            }else{
                $arr[] = array(
                'label'=>'No hay datos',  // label for dropdown list
                'value'=>'',  // value for input field
                'id_curso_disponible_servidor_publico'=>'',            // return value from autocomplete
                );
        }
        echo CJSON::encode($arr);
    }
}

    public function actionGetDetalle()
    {

        if (isset($_GET['id_curso_disponible_servidor_publico'])) {
             $id_curso_disponible_servidor_publico = $_GET['id_curso_disponible_servidor_publico'];
            $cursoDisponibleServidorPublico = CursoDisponibleServidorPublico::model()->findByPk($id_curso_disponible_servidor_publico);
            $this->renderPartial("_view",
                    array(
                       'cursoDisponibleServidorPublico'=>$cursoDisponibleServidorPublico,
                       'disabled'=>'disabled',
               ));

        }

    }
    /**
    Exportar a pdf el modelo
    */

    public function actionExportToPdf()
    {
        if(TODOS == 0)
        {
            $cursoDisponibleServidorPublico = CursoDisponibleServidorPublico::model() -> findAll(array('condition'=>'activo = true'));
        }

        if(TODOS == 1)
        {
            $cursoDisponibleServidorPublico = CursoDisponibleServidorPublico::model() -> findAll();
        }

        if ($cursoDisponibleServidorPublico == null || count($cursoDisponibleServidorPublico) == 0)
            return;
        $this->renderPartial("exportPdf", array('cursoDisponibleServidorPublico' => $cursoDisponibleServidorPublico));
    }


    //Exporta a excel el modelo
    public function actionExportarExcel()
    {

            $this->renderPartial('excel');

     }

}
?>
