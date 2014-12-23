
<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Kristhian Figueroa Villegas
 * mail: kristhian@appfactory.com.mx
 * Date: 22-12-2014
**/

        $pageTitle = $this->pageTitle = Yii::app()->name;
        $baseUrl = Yii::app()->request->baseUrl;
     ?>
     
<?php

 $this->breadcrumbs=array(
	'Cat Puesto'=>array('index'),
	'Alta',
);


include('menu.php');
$r = $_GET['r'];
$array = explode('/', $r);
$this->menu = menu($array[1]);

?>
<section class="panel panel-info">
    <header class="panel-heading">
        <h5>Dar de alta un nuevo Cat Puesto</h5>
    </header>
    <div class="panel-body">
        <?php echo $this->renderPartial('_form', array('catPuesto'=>$catPuesto)); ?>    </div>
</section>

