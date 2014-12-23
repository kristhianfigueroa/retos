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
<section class="panel">
    <header class="panel-heading">
        <h5>Dar de alta un nuevo Servidor Publico</h5>
    </header>
    <div class="panel-body">
        <?php echo $this->renderPartial('_form', array('servidorPublico' => $servidorPublico)); ?>    </div>
</section>

