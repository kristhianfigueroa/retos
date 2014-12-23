<?php
class AreaInteresController extends Controller
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
                                    'index','autocompleteAreaInteres'),
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

			$areaInteres = new AreaInteres();

        // Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($areaInteres);

		if(isset($_POST['AreaInteres']))
		{
			$areaInteres->attributes=$_POST['AreaInteres'];


            $areaInteres->fecha_creacion = date('Y-m-d h:i:s');
            $areaInteres->persona_creacion = Yii::app()->user->id;
            $areaInteres->fecha_modificacion = date('Y-m-d h:i:s');
            $areaInteres->persona_modificacion = Yii::app()->user->id;
            $areaInteres->activo = 1;


           if($areaInteres->save())
				$this->redirect(array('index','id_area_interes'=>$areaInteres->id_area_interes));
    		}

		$this->render('create',array(
'areaInteres'=>$areaInteres,
		));
	}

/**
* Displays a particular model.
* @param integer $id_area_interes the ID of the model to be displayed
*/
public function actionView($id_area_interes)
{
$this->render('view',array(
'areaInteres'=>$this->loadModel($id_area_interes),
));
}

	/**
	 * Updates a particular model.
	 * If update is successful, the browser will be redirected to the 'index' page.
	 * @param integer $id_area_interes the ID of the model to be updated
	 */
	public function actionUpdate($id_area_interes)
	{
		$areaInteres=$this->loadModel($id_area_interes);

		// Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($areaInteres);

		if(isset($_POST['AreaInteres']))
		{
			$areaInteres->attributes=$_POST['AreaInteres'];

            $areaInteres->fecha_modificacion = date('Y-m-d h:i:s');
            $areaInteres->persona_modificacion = Yii::app()->user->id;


			if($areaInteres->save())
				$this->redirect(array('index','id_area_interes'=>$areaInteres->id_area_interes));
		}

		$this->render('update',array(
        'areaInteres'=>$areaInteres,
		));
	}

	/**
	 * Deletes a particular model.
	 * If deletion is successful, the browser will be redirected to the 'admin' page.
	 * @param integer $id_area_interes the ID of the model to be deleted
	 */
	public function actionDelete($id_area_interes)
	{
        $areaInteres = $this->loadModel($id_area_interes);
        $areaInteres -> activo = 0;
        $areaInteres->save();

		// if AJAX request (triggered by deletion via admin grid view), we should not redirect the browser
		if(!isset($_GET['ajax']))
			$this->redirect(isset($_POST['returnUrl']) ? $_POST['returnUrl'] : array('index'));
	}

	/**
	 * Lists all models.
	 */
	public function actionIndex()
	{
		$areaInteres=new AreaInteres('search');
		$areaInteres->unsetAttributes();  // clear any default values
		if(isset($_GET['AreaInteres']))
			$areaInteres->attributes=$_GET['AreaInteres'];
        
		$this->render('index',array(
'areaInteres'=>$areaInteres,
                                    ));
	}


	/**
	 * Returns the data model based on the primary key given in the GET variable.
	 * If the data model is not found, an HTTP exception will be raised.
	 * @param integer $id_area_interes the ID of the model to be loaded
	 * @return AreaInteres the loaded model
	 * @throws CHttpException
	 */
	public function loadModel($id_area_interes)
	{


		$areaInteres=AreaInteres::model()->findByPk($id_area_interes);


		if($areaInteres===null)
			throw new CHttpException(404,'The requested page does not exist.');
		return $areaInteres;
	}

	/**
	 * Performs the AJAX validation.
	 * @param AreaInteres $areaInteres the model to be validated
	 */
	protected function performAjaxValidation($areaInteres)
	{
		if(isset($_POST['ajax']) && $_POST['ajax']==='area-interes-form')
		{
			echo CActiveForm::validate($areaInteres);
			Yii::app()->end();
		}
	}



    /**
    * Manages all models.
    */
    public function actionAutocompleteAreaInteres()
    {

        if(isset($_GET['term']))
        {
            $criteria = new CDbCriteria();
            $criteria->compare('activo',true, false);
            $criteria->compare('nombre',$_GET['term'],true);
            $areaInteress=AreaInteres::model()->findAll($criteria);
            $arr = array();
            if($areaInteress!=null){
                foreach($areaInteress as $areaInteres) {
                $arr[] = array(
                'label'=>$areaInteres->nombre,  // label for dropdown list
                'value'=>$areaInteres->nombre,  // value for input field
                'id_area_interes'=>$areaInteres->id_area-interes,  // return value from autocomplete
                );
            }
            }else{
                $arr[] = array(
                'label'=>'No hay datos',  // label for dropdown list
                'value'=>'',  // value for input field
                'id_area_interes'=>'',            // return value from autocomplete
                );
        }
        echo CJSON::encode($arr);
    }
}

    public function actionGetDetalle()
    {

        if (isset($_GET['id_area_interes'])) {
             $id_area_interes = $_GET['id_area_interes'];
            $areaInteres = AreaInteres::model()->findByPk($id_area_interes);
            $this->renderPartial("_view",
                    array(
                       'areaInteres'=>$areaInteres,
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
            $areaInteres = AreaInteres::model() -> findAll(array('condition'=>'activo = true'));
        }

        if(TODOS == 1)
        {
            $areaInteres = AreaInteres::model() -> findAll();
        }

        if ($areaInteres == null || count($areaInteres) == 0)
            return;
        $this->renderPartial("exportPdf", array('areaInteres' => $areaInteres));
    }


    //Exporta a excel el modelo
    public function actionExportarExcel()
    {

            $this->renderPartial('excel');

     }

}
?>
