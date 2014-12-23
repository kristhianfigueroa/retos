
<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Kristhian Figueroa Villegas
 * mail: kristhian@appfactory.com.mx
 * Date: 9/18/13
 * */
$pageTitle = $this->pageTitle = Yii::app()->name;
$baseUrl = Yii::app()->request->baseUrl;
?>


<?php
$form = $this->beginWidget('DynamicTabularForm', array(
    'defaultRowView' => '_rowForm',
        ));
?>
<section class="panel">
    <header class="panel-heading">
        <h5>Dar de alta un nuevo Trayectoria Laboral</h5>
    </header>
    <div class="panel-body">
<?php
echo $form->rowForm($trayectoriaLaborales);
?>

        <?php echo CHtml::submitButton('Guardar', array('class' => 'btn btn-success')); ?>

        <?php $this->endWidget(); ?>
    </div>
</section>

