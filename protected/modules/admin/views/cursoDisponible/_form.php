<?php
/**
 * @author Roberto Cruz <roberto@appfactory.com.mx>
 */
$pageTitle = $this->pageTitle = Yii::app()->name;
$baseUrl = Yii::app()->request->baseUrl;
$idPersonal = Yii::app()->user->id;
?> 

<?php
$form = $this->beginWidget('CActiveForm', array(
    'id' => 'curso-disponible-form',
    'enableAjaxValidation' => false,
    'htmlOptions' => array('enctype' => 'multipart/form-data')
        ));
?>



<?php  $formatos=array(
    array('value'=>0,'label'=>'Presencial'),
    array('value'=>1,'label'=>'En línea')
);

?>

<p class="note">Los campos con <span class="required">*</span> son requeridos.</p>

<div class='row' ><!--Fila n-->


    <div class="col-md-4 form-group">
        <?php
        echo $form->labelEx($cursoDisponible, 'folio_socio_tecnologico');
        echo $form->textField($cursoDisponible, 'folio_socio_tecnologico', array('size' => 20, 'maxlength' => 20, 'class' => 'form-control'));
        echo $form->error($cursoDisponible, 'folio_socio_tecnologico');
        ?> 
    </div>

</div >
<div class='row' ><!--Fila n-->


    <div class="col-md-4 form-group">
        <?php
        echo $form->labelEx($cursoDisponible, 'folio_socio_tecnologico');
        echo $form->textField($cursoDisponible, 'folio_socio_tecnologico', array('size' => 20, 'maxlength' => 20, 'class' => 'form-control'));
        echo $form->error($cursoDisponible, 'folio_socio_tecnologico');
        ?>
    </div>
    <div class="col-md-4 form-group">
        <?php
        echo $form->labelEx($cursoDisponible, 'nombre_curso');
        echo $form->textField($cursoDisponible, 'nombre_curso', array('size' => 60, 'maxlength' => 200, 'class' => 'form-control'));
        echo $form->error($cursoDisponible, 'nombre_curso');
        ?>
    </div>
    <div class="col-md-4 form-group">
        <?php
        echo $form->labelEx($cursoDisponible, 'pdf_temario');
        echo $form->fileField($cursoDisponible, 'pdf_temario');
        echo $form->error($cursoDisponible, 'pdf_temario');
        ?>
    </div>
</div >
<div class='row' ><!--Fila n--> 
    
    <div class="col-md-4 form-group">
        <?php
        echo $form->labelEx($cursoDisponible, 'id_cat_curso');
        echo $form->dropDownList($cursoDisponible, 'id_cat_curso', CatCurso::comboBox(), array('empty' => 'Seleccionar ..', 'class' => 'form-control'));
        echo $form->error($cursoDisponible, 'id_cat_curso');
        ?> 
    </div>
    <div class="col-md-4 form-group">
        <?php
        echo $form->labelEx($cursoDisponible, 'horas_curso');
        echo $form->textField($cursoDisponible, 'horas_curso', array('class' => 'form-control'));
        echo $form->error($cursoDisponible, 'horas_curso');
        ?> 
    </div>
     <div class="col-md-4 form-group">
        <?php
        echo $form->labelEx($cursoDisponible, 'formato');
        echo $form->dropDownList($cursoDisponible, 'formato', CHtml::listData($formatos, 'value','label'), array('empty' => 'Seleccionar ..', 'class' => 'form-control'));
        echo $form->error($cursoDisponible, 'formato');
        ?> 
    </div>
</div > 

<div  class="row">
    <div class="col-md-4">
        <div class="row">
             <div class="col-md-12 form-group">
        <?php
        echo $form->labelEx($cursoDisponible, 'fecha_inicio');


        $this->widget('zii.widgets.jui.CJuiDatePicker', array(
            'model' => $cursoDisponible,
            'attribute' => 'fecha_inicio',
            'language' => 'es',
            'options' => array(
                'changeYear' => true,
                'changeMonth' => true,
                'showAnim' => 'fold',
                'yearRange' => '-70:+0',
                'dateFormat' => 'yy-mm-dd',
            ),
            'htmlOptions' => array('class' => 'form-control'
            )
        ));
        echo $form->error($cursoDisponible, 'fecha_inicio');
        ?> 
    </div>
        </div>
        <div class="row">
            <div class="col-md-12 form-group">
        <?php
        echo $form->labelEx($cursoDisponible, 'id_cat_comprobante');
        echo $form->dropDownList($cursoDisponible, 'id_cat_comprobante', CatComprobante::comboBox(), array('empty' => 'Seleccionar ..', 'class' => 'form-control'));
        echo $form->error($cursoDisponible, 'id_cat_comprobante');
        ?> 
        
    </div>
        </div>
    </div>
     <div class="col-md-8">
         <div class="row">
             <div class="col-md-12 form-group">
        <?php
        echo $form->labelEx($cursoDisponible, 'descripcion');
        echo $form->textArea($cursoDisponible, 'descripcion', array('size' => 60, 'class' => 'form-control','rows'=>'4'));
        echo $form->error($cursoDisponible, 'descripcion');
        ?> 

    </div>
         </div>
    </div>
</div>


<div class="row">
    <div class="col-md-4 form-group">

        <?php echo CHtml::submitButton(($cursoDisponible->isNewRecord) ? 'Crear' : 'Actualizar', array('class' => 'btn btn-primary')); ?>
    </div>
</div>

<?php $this->endWidget(); ?>

