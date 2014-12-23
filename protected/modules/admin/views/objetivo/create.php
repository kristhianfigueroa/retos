<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Kristhian Figueroa Villegas
 * mail: kristhian@appfactory.com.mx
 * Date: 23-12-2014
 **/

$pageTitle = $this->pageTitle = Yii::app()->name;
$baseUrl = Yii::app()->request->baseUrl;
?>

<?php
$form = $this->beginWidget('DynamicTabularForm', array(
    'defaultRowView' => '_rowForm',
));

echo $form->rowForm($objetivos);

echo CHtml::submitButton('Guardar', array('class' => 'btn btn-success'));

$this->endWidget();

