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
    'id' => 'formacion-academica-form',
    'enableAjaxValidation' => false,
        ));
?>



<p class="note">Los campos con <span class="required">*</span> son requeridos.</p>
<div  class="row">
    <div class="col-md-6">
        <div class="row">
            <div class="col-md-12 form-group">
                <?php
                echo $form->labelEx($formacionAcademica, 'id_tipo_estudio');
                echo $form->dropDownList($formacionAcademica, 'id_tipo_estudio', TipoEstudio::comboBox(), array('empty' => 'Seleccionar ..', 'class' => 'form-control'));
                echo $form->error($formacionAcademica, 'id_tipo_estudio');
                ?> 
            </div>
        </div>
        <div class="row">
               <div class="col-md-12 form-group">
            <label>Periodo</label>
            <div  class="input-group input-large">
                <?php
                $this->widget('zii.widgets.jui.CJuiDatePicker', array(
                    'model' => $formacionAcademica,
                    'attribute' => "fecha_inicio",
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
                echo $form->error($formacionAcademica, "fecha_inicio");
                ?> 
                <span class="input-group-addon">A</span>
                <?php
                $this->widget('zii.widgets.jui.CJuiDatePicker', array(
                    'model' => $formacionAcademica,
                    'attribute' => "fecha_fin",
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
                echo $form->error($formacionAcademica, "fecha_fin");
                ?> 
            </div>
        </div>
        </div>
    </div>
    <div class="col-md-6">
         <?php
        echo $form->labelEx($formacionAcademica, 'descripcion');
        echo $form->textArea($formacionAcademica, 'descripcion', array('size' => 60, 'class' => 'form-control','rows'=>'4') );
        echo $form->error($formacionAcademica, 'descripcion');
        ?> 
    </div>
</div>

<div class="row">
    <div class="col-md-4 form-group">

        <?php echo CHtml::submitButton(($formacionAcademica->isNewRecord) ? 'Crear' : 'Actualizar', array('class' => 'btn btn-primary')); ?>
    </div>
</div>

<?php $this->endWidget(); ?>

