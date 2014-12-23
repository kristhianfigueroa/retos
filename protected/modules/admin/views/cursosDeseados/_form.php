<?php
/**
 * Created by JetBrains PhpStorm.
 * User: App Factory
 * mail: kristhian@appfactory.com.mx
 * Date: 20-12-2014
 * Time: 10:09 AM

 * */
$pageTitle = $this->pageTitle = Yii::app()->name;
$baseUrl = Yii::app()->request->baseUrl;
$idPersonal = Yii::app()->user->id;
?> 

<?php
$form = $this->beginWidget('CActiveForm', array(
    'id' => 'cursos-deseados-form',
    'enableAjaxValidation' => false,
        ));
?>



<p class="note">Los campos con <span class="required">*</span> son requeridos.</p>


<div class='row' ><!--Fila n--> 
</div > 
<div class='row' ><!--Fila n--> 
    <div class="col-md-4 form-group">
        <?php
        echo $form->labelEx($cursosDeseados, 'id_servidor_publico');
        echo $form->dropDownList($cursosDeseados, 'id_servidor_publico', ServidorPublico::comboBox(), array('empty' => 'Seleccionar ..', 'class' => 'form-control'));
        echo $form->error($cursosDeseados, 'id_servidor_publico');
        ?> 
        <br>
    </div>
    <div class="col-md-4 form-group">
        <?php
        echo $form->labelEx($cursosDeseados, 'id_area_interes');
        echo $form->dropDownList($cursosDeseados, 'id_area_interes', AreaInteres::comboBox(), array('empty' => 'Seleccionar ..', 'class' => 'form-control'));
        echo $form->error($cursosDeseados, 'id_area_interes');
        ?> 
        <br>
    </div>
</div >

<div class="row">
    <div class="col-md-4 form-group">

        <?php echo CHtml::submitButton(($cursosDeseados->isNewRecord) ? 'Crear' : 'Actualizar', array('class' => 'btn btn-primary')); ?>
    </div>
</div>

<?php $this->endWidget(); ?>

