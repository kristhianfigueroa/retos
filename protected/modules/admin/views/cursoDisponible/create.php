
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
	'Curso Disponible'=>array('index'),
	'Alta',
);


include('menu.php');
$r = $_GET['r'];
$array = explode('/', $r);
$this->menu = menu($array[1]);

?>
<section class="panel">
    <header class="panel-heading">
        <h5>Dar de alta un nuevo Curso Disponible</h5>
    </header>
    <div class="panel-body">
        <?php echo $this->renderPartial('_form', array('cursoDisponible'=>$cursoDisponible)); ?>    </div>
</section>

