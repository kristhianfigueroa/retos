<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Kristhian Figueroa Villegas
 * ail: kristhian@appfactory.com.mx
 * Date: 9/18/13
 * Time: 10:09 AM

        **/

        $pageTitle = $this->pageTitle = Yii::app()->name;
        $baseUrl = Yii::app()->request->baseUrl;
     ?> 

<?php
/* @var $this CatPuestoController */
/* @var $catPuesto CatPuesto */

$this->breadcrumbs=array(
	'Cat Puesto'=>array('index'),
	'Actualizar',
);



include('menu.php');
$r = $_GET['r'];
$array = explode('/', $r);
$this->menu = menu($array[1]);

?>


<h1>Actualizar   <span> <?php echo $catPuesto ->cat_puesto; ?>  </span> </h1>

<?php echo $this->renderPartial('_form', array('catPuesto'=>$catPuesto )); ?>


















