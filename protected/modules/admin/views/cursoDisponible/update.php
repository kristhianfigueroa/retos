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
/* @var $this CursoDisponibleController */
/* @var $cursoDisponible CursoDisponible */

$this->breadcrumbs=array(
	'Curso Disponible'=>array('index'),
	'Actualizar',
);



include('menu.php');
$r = $_GET['r'];
$array = explode('/', $r);
$this->menu = menu($array[1]);

?>


<h1>Actualizar   <span> <?php echo $cursoDisponible ->nombre_curso; ?>  </span> </h1>

<?php echo $this->renderPartial('_form', array('cursoDisponible'=>$cursoDisponible )); ?>


















