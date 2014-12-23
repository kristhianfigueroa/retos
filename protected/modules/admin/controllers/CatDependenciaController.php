<?php
class CatDependenciaController extends Controller
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
                                    'index','autocompleteCatDependencia'),
				'users'=>$admins
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

			$catDependencia = new CatDependencia();

        // Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($catDependencia);

		if(isset($_POST['CatDependencia']))
		{
			$catDependencia->attributes=$_POST['CatDependencia'];


            $catDependencia->fecha_creacion = date('Y-m-d h:i:s');
            $catDependencia->persona_creacion = Yii::app()->user->id;
            $catDependencia->fecha_modificacion = date('Y-m-d h:i:s');
            $catDependencia->persona_modificacion = Yii::app()->user->id;
            $catDependencia->activo = 1;


           if($catDependencia->save())
				$this->redirect(array('index','id_cat_dependencia'=>$catDependencia->id_cat_dependencia));
    		}

		$this->render('create',array(
'catDependencia'=>$catDependencia,
		));
	}

/**
* Displays a particular model.
* @param integer $id_cat_dependencia the ID of the model to be displayed
*/
public function actionView($id_cat_dependencia)
{
$this->render('view',array(
'catDependencia'=>$this->loadModel($id_cat_dependencia),
));
}

	/**
	 * Updates a particular model.
	 * If update is successful, the browser will be redirected to the 'index' page.
	 * @param integer $id_cat_dependencia the ID of the model to be updated
	 */
	public function actionUpdate($id_cat_dependencia)
	{
		$catDependencia=$this->loadModel($id_cat_dependencia);

		// Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($catDependencia);

		if(isset($_POST['CatDependencia']))
		{
			$catDependencia->attributes=$_POST['CatDependencia'];

            $catDependencia->fecha_modificacion = date('Y-m-d h:i:s');
            $catDependencia->persona_modificacion = Yii::app()->user->id;


			if($catDependencia->save())
				$this->redirect(array('index','id_cat_dependencia'=>$catDependencia->id_cat_dependencia));
		}

		$this->render('update',array(
        'catDependencia'=>$catDependencia,
		));
	}

	/**
	 * Deletes a particular model.
	 * If deletion is successful, the browser will be redirected to the 'admin' page.
	 * @param integer $id_cat_dependencia the ID of the model to be deleted
	 */
	public function actionDelete($id_cat_dependencia)
	{
        $catDependencia = $this->loadModel($id_cat_dependencia);
        $catDependencia -> activo = 0;
        $catDependencia->save();

		// if AJAX request (triggered by deletion via admin grid view), we should not redirect the browser
		if(!isset($_GET['ajax']))
			$this->redirect(isset($_POST['returnUrl']) ? $_POST['returnUrl'] : array('index'));
	}

	/**
	 * Lists all models.
	 */
	public function actionIndex()
	{
		$catDependencia=new CatDependencia('search');
		$catDependencia->unsetAttributes();  // clear any default values
		if(isset($_GET['CatDependencia']))
			$catDependencia->attributes=$_GET['CatDependencia'];
        
		$this->render('index',array(
'catDependencia'=>$catDependencia,
                                    ));
	}


	/**
	 * Returns the data model based on the primary key given in the GET variable.
	 * If the data model is not found, an HTTP exception will be raised.
	 * @param integer $id_cat_dependencia the ID of the model to be loaded
	 * @return CatDependencia the loaded model
	 * @throws CHttpException
	 */
	public function loadModel($id_cat_dependencia)
	{


		$catDependencia=CatDependencia::model()->findByPk($id_cat_dependencia);


		if($catDependencia===null)
			throw new CHttpException(404,'The requested page does not exist.');
		return $catDependencia;
	}

	/**
	 * Performs the AJAX validation.
	 * @param CatDependencia $catDependencia the model to be validated
	 */
	protected function performAjaxValidation($catDependencia)
	{
		if(isset($_POST['ajax']) && $_POST['ajax']==='cat-dependencia-form')
		{
			echo CActiveForm::validate($catDependencia);
			Yii::app()->end();
		}
	}



    /**
    * Manages all models.
    */
    public function actionAutocompleteCatDependencia()
    {

        if(isset($_GET['term']))
        {
            $criteria = new CDbCriteria();
            $criteria->compare('activo',true, false);
            $criteria->compare('nombre',$_GET['term'],true);
            $catDependencias=CatDependencia::model()->findAll($criteria);
            $arr = array();
            if($catDependencias!=null){
                foreach($catDependencias as $catDependencia) {
                $arr[] = array(
                'label'=>$catDependencia->nombre,  // label for dropdown list
                'value'=>$catDependencia->nombre,  // value for input field
                'id_cat_dependencia'=>$catDependencia->id_cat-dependencia,  // return value from autocomplete
                );
            }
            }else{
                $arr[] = array(
                'label'=>'No hay datos',  // label for dropdown list
                'value'=>'',  // value for input field
                'id_cat_dependencia'=>'',            // return value from autocomplete
                );
        }
        echo CJSON::encode($arr);
    }
}

    public function actionGetDetalle()
    {
        if (isset($_GET['IdRegistro'])) {
             $id_cat_dependencia = $_GET['IdRegistro'];
            $catDependencia = CatDependencia::model()->findByPk($id_cat_dependencia);
            $this->renderPartial("_view",array('catDependencia'=>$catDependencia));

        }
    }
    /**
    Exportar a pdf el modelo
    */

    public function actionExportToPdf()
    {
        if(TODOS == 0)
        {
            $catDependencia = CatDependencia::model() -> findAll(array('condition'=>'activo = true'));
        }

        if(TODOS == 1)
        {
            $catDependencia = CatDependencia::model() -> findAll();
        }

        if ($catDependencia == null || count($catDependencia) == 0)
            return;
        $this->renderPartial("exportPdf", array('catDependencia' => $catDependencia));
    }


    //Exporta a excel el modelo
    public function actionExportarExcel()
    {

            $this->renderPartial('excel');

     }

}
?>
