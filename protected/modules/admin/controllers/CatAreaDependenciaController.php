<?php
class CatAreaDependenciaController extends Controller
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
        $admins = CatNivelAcceso::getAdmins();

		return array(
			array('allow', // allow authenticated user to perform 'create' and 'update' actions
				'actions'=>array('view','create','update','delete','getDetalle','exportToPdf','exportarExcel',
                                    'index','autocompleteCatAreaDependencia'),
				'users'=> $admins
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

			$catAreaDependencia = new CatAreaDependencia();

        // Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($catAreaDependencia);

		if(isset($_POST['CatAreaDependencia']))
		{
			$catAreaDependencia->attributes=$_POST['CatAreaDependencia'];


            $catAreaDependencia->fecha_creacion = date('Y-m-d h:i:s');
            $catAreaDependencia->persona_creacion = Yii::app()->user->id;
            $catAreaDependencia->fecha_modificacion = date('Y-m-d h:i:s');
            $catAreaDependencia->persona_modificacion = Yii::app()->user->id;
            $catAreaDependencia->activo = 1;


           if($catAreaDependencia->save())
				$this->redirect(array('index','id_cat_area_dependencia'=>$catAreaDependencia->id_cat_area_dependencia));
    		}

		$this->render('create',array(
'catAreaDependencia'=>$catAreaDependencia,
		));
	}

/**
* Displays a particular model.
* @param integer $id_cat_area_dependencia the ID of the model to be displayed
*/
public function actionView($id_cat_area_dependencia)
{
$this->render('view',array(
'catAreaDependencia'=>$this->loadModel($id_cat_area_dependencia),
));
}

	/**
	 * Updates a particular model.
	 * If update is successful, the browser will be redirected to the 'index' page.
	 * @param integer $id_cat_area_dependencia the ID of the model to be updated
	 */
	public function actionUpdate($id_cat_area_dependencia)
	{
		$catAreaDependencia=$this->loadModel($id_cat_area_dependencia);

		// Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($catAreaDependencia);

		if(isset($_POST['CatAreaDependencia']))
		{
			$catAreaDependencia->attributes=$_POST['CatAreaDependencia'];

            $catAreaDependencia->fecha_modificacion = date('Y-m-d h:i:s');
            $catAreaDependencia->persona_modificacion = Yii::app()->user->id;


			if($catAreaDependencia->save())
				$this->redirect(array('index','id_cat_area_dependencia'=>$catAreaDependencia->id_cat_area_dependencia));
		}

		$this->render('update',array(
        'catAreaDependencia'=>$catAreaDependencia,
		));
	}

	/**
	 * Deletes a particular model.
	 * If deletion is successful, the browser will be redirected to the 'admin' page.
	 * @param integer $id_cat_area_dependencia the ID of the model to be deleted
	 */
	public function actionDelete($id_cat_area_dependencia)
	{
        $catAreaDependencia = $this->loadModel($id_cat_area_dependencia);
        $catAreaDependencia -> activo = 0;
        $catAreaDependencia->save();

		// if AJAX request (triggered by deletion via admin grid view), we should not redirect the browser
		if(!isset($_GET['ajax']))
			$this->redirect(isset($_POST['returnUrl']) ? $_POST['returnUrl'] : array('index'));
	}

	/**
	 * Lists all models.
	 */
	public function actionIndex()
	{
		$catAreaDependencia=new CatAreaDependencia('search');
		$catAreaDependencia->unsetAttributes();  // clear any default values
		if(isset($_GET['CatAreaDependencia']))
			$catAreaDependencia->attributes=$_GET['CatAreaDependencia'];
        
		$this->render('index',array(
'catAreaDependencia'=>$catAreaDependencia,
                                    ));
	}


	/**
	 * Returns the data model based on the primary key given in the GET variable.
	 * If the data model is not found, an HTTP exception will be raised.
	 * @param integer $id_cat_area_dependencia the ID of the model to be loaded
	 * @return CatAreaDependencia the loaded model
	 * @throws CHttpException
	 */
	public function loadModel($id_cat_area_dependencia)
	{


		$catAreaDependencia=CatAreaDependencia::model()->findByPk($id_cat_area_dependencia);


		if($catAreaDependencia===null)
			throw new CHttpException(404,'The requested page does not exist.');
		return $catAreaDependencia;
	}

	/**
	 * Performs the AJAX validation.
	 * @param CatAreaDependencia $catAreaDependencia the model to be validated
	 */
	protected function performAjaxValidation($catAreaDependencia)
	{
		if(isset($_POST['ajax']) && $_POST['ajax']==='cat-area-dependencia-form')
		{
			echo CActiveForm::validate($catAreaDependencia);
			Yii::app()->end();
		}
	}



    /**
    * Manages all models.
    */
    public function actionAutocompleteCatAreaDependencia()
    {

        if(isset($_GET['term']))
        {
            $criteria = new CDbCriteria();
            $criteria->compare('activo',true, false);
            $criteria->compare('nombre',$_GET['term'],true);
            $catAreaDependencias=CatAreaDependencia::model()->findAll($criteria);
            $arr = array();
            if($catAreaDependencias!=null){
                foreach($catAreaDependencias as $catAreaDependencia) {
                $arr[] = array(
                'label'=>$catAreaDependencia->nombre,  // label for dropdown list
                'value'=>$catAreaDependencia->nombre,  // value for input field
                'id_cat_area_dependencia'=>$catAreaDependencia->id_cat-area-dependencia,  // return value from autocomplete
                );
            }
            }else{
                $arr[] = array(
                'label'=>'No hay datos',  // label for dropdown list
                'value'=>'',  // value for input field
                'id_cat_area_dependencia'=>'',            // return value from autocomplete
                );
        }
        echo CJSON::encode($arr);
    }
}

    public function actionGetDetalle()
    {
        if (isset($_GET['IdRegistro'])) {
             $id_cat_area_dependencia = $_GET['IdRegistro'];
            $catAreaDependencia = CatAreaDependencia::model()->findByPk($id_cat_area_dependencia);
            $this->renderPartial("_view",array('catAreaDependencia'=>$catAreaDependencia));

        }
    }
    /**
    Exportar a pdf el modelo
    */

    public function actionExportToPdf()
    {
        if(TODOS == 0)
        {
            $catAreaDependencia = CatAreaDependencia::model() -> findAll(array('condition'=>'activo = true'));
        }

        if(TODOS == 1)
        {
            $catAreaDependencia = CatAreaDependencia::model() -> findAll();
        }

        if ($catAreaDependencia == null || count($catAreaDependencia) == 0)
            return;
        $this->renderPartial("exportPdf", array('catAreaDependencia' => $catAreaDependencia));
    }


    //Exporta a excel el modelo
    public function actionExportarExcel()
    {

            $this->renderPartial('excel');

     }

}
?>
