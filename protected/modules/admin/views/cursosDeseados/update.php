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
/* @var $this CursosDeseadosController */
/* @var $cursosDeseados CursosDeseados */

$this->breadcrumbs=array(
	'Cursos Deseados'=>array('index'),
	'Actualizar',
);



include('menu.php');
$r = $_GET['r'];
$array = explode('/', $r);
$this->menu = menu($array[1]);

?>


<h1>Actualizar   <span> <?php echo $cursosDeseados ->cursos_deseados; ?>  </span> </h1>

<?php echo $this->renderPartial('_form', array('cursosDeseados'=>$cursosDeseados )); ?>


















