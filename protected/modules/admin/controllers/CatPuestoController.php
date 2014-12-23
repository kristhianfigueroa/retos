<?php
class CatPuestoController extends Controller
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
                                    'index','autocompleteCatPuesto'),
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

			$catPuesto = new CatPuesto();

        // Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($catPuesto);

		if(isset($_POST['CatPuesto']))
		{
			$catPuesto->attributes=$_POST['CatPuesto'];


            $catPuesto->fecha_creacion = date('Y-m-d h:i:s');
            $catPuesto->persona_creacion = Yii::app()->user->id;
            $catPuesto->fecha_modificacion = date('Y-m-d h:i:s');
            $catPuesto->persona_modificacion = Yii::app()->user->id;
            $catPuesto->activo = 1;


           if($catPuesto->save())
				$this->redirect(array('index','id_cat_puesto'=>$catPuesto->id_cat_puesto));
    		}

		$this->render('create',array(
'catPuesto'=>$catPuesto,
		));
	}

/**
* Displays a particular model.
* @param integer $id_cat_puesto the ID of the model to be displayed
*/
public function actionView($id_cat_puesto)
{
$this->render('view',array(
'catPuesto'=>$this->loadModel($id_cat_puesto),
));
}

	/**
	 * Updates a particular model.
	 * If update is successful, the browser will be redirected to the 'index' page.
	 * @param integer $id_cat_puesto the ID of the model to be updated
	 */
	public function actionUpdate($id_cat_puesto)
	{
		$catPuesto=$this->loadModel($id_cat_puesto);

		// Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($catPuesto);

		if(isset($_POST['CatPuesto']))
		{
			$catPuesto->attributes=$_POST['CatPuesto'];

            $catPuesto->fecha_modificacion = date('Y-m-d h:i:s');
            $catPuesto->persona_modificacion = Yii::app()->user->id;


			if($catPuesto->save())
				$this->redirect(array('index','id_cat_puesto'=>$catPuesto->id_cat_puesto));
		}

		$this->render('update',array(
        'catPuesto'=>$catPuesto,
		));
	}

	/**
	 * Deletes a particular model.
	 * If deletion is successful, the browser will be redirected to the 'admin' page.
	 * @param integer $id_cat_puesto the ID of the model to be deleted
	 */
	public function actionDelete($id_cat_puesto)
	{
        $catPuesto = $this->loadModel($id_cat_puesto);
        $catPuesto -> activo = 0;
        $catPuesto->save();

		// if AJAX request (triggered by deletion via admin grid view), we should not redirect the browser
		if(!isset($_GET['ajax']))
			$this->redirect(isset($_POST['returnUrl']) ? $_POST['returnUrl'] : array('index'));
	}

	/**
	 * Lists all models.
	 */
	public function actionIndex()
	{
		$catPuesto=new CatPuesto('search');
		$catPuesto->unsetAttributes();  // clear any default values
		if(isset($_GET['CatPuesto']))
			$catPuesto->attributes=$_GET['CatPuesto'];
        
		$this->render('index',array(
'catPuesto'=>$catPuesto,
                                    ));
	}


	/**
	 * Returns the data model based on the primary key given in the GET variable.
	 * If the data model is not found, an HTTP exception will be raised.
	 * @param integer $id_cat_puesto the ID of the model to be loaded
	 * @return CatPuesto the loaded model
	 * @throws CHttpException
	 */
	public function loadModel($id_cat_puesto)
	{


		$catPuesto=CatPuesto::model()->findByPk($id_cat_puesto);


		if($catPuesto===null)
			throw new CHttpException(404,'The requested page does not exist.');
		return $catPuesto;
	}

	/**
	 * Performs the AJAX validation.
	 * @param CatPuesto $catPuesto the model to be validated
	 */
	protected function performAjaxValidation($catPuesto)
	{
		if(isset($_POST['ajax']) && $_POST['ajax']==='cat-puesto-form')
		{
			echo CActiveForm::validate($catPuesto);
			Yii::app()->end();
		}
	}



    /**
    * Manages all models.
    */
    public function actionAutocompleteCatPuesto()
    {

        if(isset($_GET['term']))
        {
            $criteria = new CDbCriteria();
            $criteria->compare('activo',true, false);
            $criteria->compare('nombre',$_GET['term'],true);
            $catPuestos=CatPuesto::model()->findAll($criteria);
            $arr = array();
            if($catPuestos!=null){
                foreach($catPuestos as $catPuesto) {
                $arr[] = array(
                'label'=>$catPuesto->nombre,  // label for dropdown list
                'value'=>$catPuesto->nombre,  // value for input field
                'id_cat_puesto'=>$catPuesto->id_cat-puesto,  // return value from autocomplete
                );
            }
            }else{
                $arr[] = array(
                'label'=>'No hay datos',  // label for dropdown list
                'value'=>'',  // value for input field
                'id_cat_puesto'=>'',            // return value from autocomplete
                );
        }
        echo CJSON::encode($arr);
    }
}

    public function actionGetDetalle()
    {

        if (isset($_GET['id_cat_puesto'])) {
             $id_cat_puesto = $_GET['id_cat_puesto'];
            $catPuesto = CatPuesto::model()->findByPk($id_cat_puesto);
            $this->renderPartial("_view",
                    array(
                       'catPuesto'=>$catPuesto
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
            $catPuesto = CatPuesto::model() -> findAll(array('condition'=>'activo = true'));
        }

        if(TODOS == 1)
        {
            $catPuesto = CatPuesto::model() -> findAll();
        }

        if ($catPuesto == null || count($catPuesto) == 0)
            return;
        $this->renderPartial("exportPdf", array('catPuesto' => $catPuesto));
    }


    //Exporta a excel el modelo
    public function actionExportarExcel()
    {

            $this->renderPartial('excel');

     }

}
?>
