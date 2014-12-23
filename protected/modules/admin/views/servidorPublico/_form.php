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
    'id' => 'servidor-publico-form',
    'enableAjaxValidation' => false,
    'htmlOptions' => array('enctype' => 'multipart/form-data')
));
?>



<p class="note">Los campos con <span class="required">*</span> son requeridos.</p>


<div class='row'><!--Fila n-->
    <div class="col-md-4 form-group">
        <?php
        echo $form->labelEx($servidorPublico, 'nombre');
        echo $form->textField($servidorPublico, 'nombre', array('size' => 60, 'maxlength' => 200, 'class' => 'form-control'));
        echo $form->error($servidorPublico, 'nombre');
        ?>
    </div>
    <div class="col-md-4 form-group">
        <?php
        echo $form->labelEx($servidorPublico, 'apellido_paterno');
        echo $form->textField($servidorPublico, 'apellido_paterno', array('size' => 60, 'maxlength' => 200, 'class' => 'form-control'));
        echo $form->error($servidorPublico, 'apellido_paterno');
        ?>
    </div>

    <div class="col-md-4 form-group">
        <?php
        echo $form->labelEx($servidorPublico, 'apellido_materno');
        echo $form->textField($servidorPublico, 'apellido_materno', array('size' => 60, 'maxlength' => 200, 'class' => 'form-control'));
        echo $form->error($servidorPublico, 'apellido_materno');
        ?>

    </div>
</div>

<div class='row'><!--Fila n-->
    <div class="col-md-4 form-group">
        <?php
        echo $form->labelEx($servidorPublico, 'id_cat_dependencia');
        echo $form->dropDownList($servidorPublico, 'id_cat_dependencia', CatDependencia::comboBox(), array('empty' => 'Seleccionar ..', 'class' => 'form-control'));
        echo $form->error($servidorPublico, 'id_cat_dependencia');
        ?>
        <br>
    </div>
    <div class="col-md-4 form-group">
        <?php
        echo $form->labelEx($servidorPublico, 'id_cat_area_dependencia');
        echo $form->dropDownList($servidorPublico, 'id_cat_area_dependencia', CatAreaDependencia::comboBox(), array('empty' => 'Seleccionar ..', 'class' => 'form-control'));
        echo $form->error($servidorPublico, 'id_cat_area_dependencia');
        ?>
        <br>
    </div>

    <div class="col-md-4 form-group">
        <?php
        echo $form->labelEx($servidorPublico, 'linkedin');
        echo $form->textField($servidorPublico, 'linkedin', array('size' => 60, 'maxlength' => 500, 'class' => 'form-control'));
        echo $form->error($servidorPublico, 'linkedin');
        ?>

    </div>
</div>
<div class='row'><!--Fila n-->
    <div class="col-md-4 form-group">
        <?php
        echo $form->labelEx($servidorPublico, 'email');
        echo $form->textField($servidorPublico, 'email', array('size' => 60, 'maxlength' => 200, 'class' => 'form-control'));
        echo $form->error($servidorPublico, 'email');
        ?>
    </div>

    <div class="col-md-4 form-group">
        <?php
        echo $form->labelEx($servidorPublico, 'usuario');
        echo $form->textField($servidorPublico, 'usuario', array('size' => 60, 'maxlength' => 200, 'class' => 'form-control'));
        echo $form->error($servidorPublico, 'usuario');
        ?>

    </div>

</div>
<div class='row'><!--Fila n-->

    <div class="col-md-4 form-group">
        <?php
        echo $form->labelEx($servidorPublico, 'telefono');
        echo $form->textField($servidorPublico, 'telefono', array('size' => 60, 'maxlength' => 200, 'class' => 'form-control'));
        echo $form->error($servidorPublico, 'telefono');
        ?>

    </div>
    <div class="col-md-4 form-group">
        <?php
        echo $form->labelEx($servidorPublico, 'id_cat_nivel_acceso');
        echo $form->dropDownList($servidorPublico, 'id_cat_nivel_acceso', CatNivelAcceso::comboBox(), array('empty' => 'Seleccionar ..', 'class' => 'form-control'));
        echo $form->error($servidorPublico, 'id_cat_nivel_acceso');
        ?>

    </div>

    <div class="col-md-4 form-group">
        <?php
        echo $form->labelEx($servidorPublico, 'id_jefe_directo');
        echo $form->dropDownList($servidorPublico, 'id_jefe_directo', ServidorPublico::comboBox($servidorPublico->id_servidor_publico), array('empty' => 'Seleccionar ..', 'class' => 'form-control'));
        echo $form->error($servidorPublico, 'id_jefe_directo');
        ?>
    </div>
</div>

<div class='row'><!--Fila n-->
    <div class="col-md-4 form-group">
        <?php
        echo $form->labelEx($servidorPublico, 'foto');
        echo $form->fileField($servidorPublico, 'foto');
        echo $form->error($servidorPublico, 'foto');
        ?>
        <?php if (file_exists($servidorPublico->foto)): ?>
            <br>
            <p>
                <img src="<?php echo $servidorPublico->foto; ?>" alt="<?php echo $servidorPublico->nombre; ?>"
                     class="img-rounded img_user" style="width: 100%">
            </p>
        <?php endif; ?>
    </div>
</div>

<div class="row">
    <div class="col-md-4 form-group">

        <?php echo CHtml::submitButton(($servidorPublico->isNewRecord) ? 'Crear' : 'Actualizar', array('class' => 'btn btn-primary')); ?>
    </div>
</div>

<?php $this->endWidget(); ?>

