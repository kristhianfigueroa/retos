
<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Kristhian Figueroa Villegas
 * mail: kristhian@appfactory.com.mx
 * Date: 9/18/13
**/

        $pageTitle = $this->pageTitle = Yii::app()->name;
        $baseUrl = Yii::app()->request->baseUrl;
     ?>
     
<?php

 $this->breadcrumbs=array(
	'Formacion Academica'=>array('index'),
	'Alta',
);


include('menu.php');
$r = $_GET['r'];
$array = explode('/', $r);
$this->menu = menu($array[1]);

?>

<h1>Detalle  <span> <?php  echo $nombreModel-> formacion_academica  </span> </h1>

<?php echo $this->renderPartial('_view',
                        array('formacionAcademica'=>$formacionAcademica)); ?>