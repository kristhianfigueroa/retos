<?php
/**
 * Created by JetBrains PhpStorm.
 * User: App Factory
 * mail: kristhian@appfactory.com.mx
 * Date: 19-12-2014
 * Time: 10:09 AM

 * */
$pageTitle = $this->pageTitle = Yii::app()->name;
$baseUrl = Yii::app()->request->baseUrl;
$idPersonal = Yii::app()->user->id;
?> 

<?php
$form = $this->beginWidget('CActiveForm', array(
    'id' => 'socio-tecnologico-form',
    'enableAjaxValidation' => false,
        ));
?>



<p class="note">Los campos con <span class="required">*</span> son requeridos.</p>


<div class='row' ><!--Fila n--> 

    <div class="col-md-4 form-group">
        <?php
        echo $form->labelEx($socioTecnologico, 'nombre');
        echo $form->textField($socioTecnologico, 'nombre', array('size' => 60, 'maxlength' => 200, 'class' => 'form-control'));
        echo $form->error($socioTecnologico, 'nombre');
        ?> 

    </div>

    <div class="col-md-4 form-group">
        <?php
        echo $form->labelEx($socioTecnologico, 'razon_social');
        echo $form->textField($socioTecnologico, 'razon_social', array('size' => 60, 'maxlength' => 200, 'class' => 'form-control'));
        echo $form->error($socioTecnologico, 'razon_social');
        ?> 

    </div>

    <div class="col-md-4 form-group">
<?php
echo $form->labelEx($socioTecnologico, 'telefono');
echo $form->textField($socioTecnologico, 'telefono', array('size' => 60, 'maxlength' => 200, 'class' => 'form-control'));
echo $form->error($socioTecnologico, 'telefono');
?> 

    </div>
</div > 
<div class='row' ><!--Fila n--> 
    <div class="col-md-4 form-group">
<?php
echo $form->labelEx($socioTecnologico, 'email');
echo $form->textField($socioTecnologico, 'email', array('size' => 60, 'maxlength' => 200, 'class' => 'form-control'));
echo $form->error($socioTecnologico, 'email');
?> 
    </div>

    <div class="col-md-4 form-group">
        <?php
        echo $form->labelEx($socioTecnologico, 'direccion');
        echo $form->textField($socioTecnologico, 'direccion', array('size' => 60, 'maxlength' => 200, 'class' => 'form-control'));
        echo $form->error($socioTecnologico, 'direccion');
        ?> 

    </div>

    <div class="col-md-4 form-group">
        <?php
        echo $form->labelEx($socioTecnologico, 'usuario');
        echo $form->textField($socioTecnologico, 'usuario', array('size' => 60, 'maxlength' => 200, 'class' => 'form-control'));
        echo $form->error($socioTecnologico, 'usuario');
        ?> 

    </div>
</div > 
<div class='row' ><!--Fila n--> 

    <div class="col-md-4 form-group">
<?php
echo $form->labelEx($socioTecnologico, 'contrasenia');
echo $form->passwordField($socioTecnologico, 'contrasenia', array('size' => 60, 'maxlength' => 200, 'class' => 'form-control'));
echo $form->error($socioTecnologico, 'contrasenia');
?> 

    </div>
</div >

<div class="row">
    <div class="col-md-4 form-group">

<?php echo CHtml::submitButton(($socioTecnologico->isNewRecord) ? 'Crear' : 'Actualizar', array('class' => 'btn btn-primary')); ?>
    </div>
</div>

<?php $this->endWidget(); ?>

