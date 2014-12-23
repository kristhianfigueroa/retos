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
    'id' => 'trayectoria-laboral-form',
    'enableAjaxValidation' => false,
));
?>

s

<p class="note">Los campos con <span class="required">*</span> son requeridos.</p>

<?php //$trayectoriaLaboral->id_servidor_publico = $_GET['id_servidor_publico']; ?>





<?php echo $form->hiddenField($trayectoriaLaboral, 'id_servidor_publico'); ?>

<?php
$sectores = array(
    array('label' => 'Público', 'index' => '0'),
    array('label' => 'Privado', 'index' => '1')
);
?>
<div class='row'><!--Fila n-->
    <div class="col-md-4 form-group">
        <?php
        echo $form->labelEx($trayectoriaLaboral, 'puesto');
        echo $form->textField($trayectoriaLaboral, 'puesto', array('size' => 60, 'maxlength' => 200, 'class' => 'form-control'));
        echo $form->error($trayectoriaLaboral, 'puesto');
        ?>
    </div>
    <div class="col-md-4 form-group">
        <?php
        echo $form->labelEx($trayectoriaLaboral, 'sector');
        echo $form->dropDownList($trayectoriaLaboral, 'sector', CHtml::listData($sectores, 'index', 'label'), array('empty' => 'Seleccionar ..', 'class' => 'form-control'));
        echo $form->error($trayectoriaLaboral, 'sector');
        ?>
    </div>
    <div class="col-md-4 form-group">
        <label>Periodo</label>
        <?php //echo $form->labelEx($trayectoriaLaboral, 'fecha_inicio');  ?>
        <div data-date-format="mm/dd/yyyy" data-date="13/07/2013" class="input-group input-large">
            <!--<input type="text" name="from" class="form-control dpd1">-->
            <?php
            $this->widget('zii.widgets.jui.CJuiDatePicker', array(
                'model' => $trayectoriaLaboral,
                'attribute' => 'fecha_inicio',
                'language' => 'es',
                'options' => array(
                    'changeYear' => true,
                    'changeMonth' => true,
                    'showAnim' => 'fold',
                    'yearRange' => '-70:+0',
                    'dateFormat' => 'yy-mm-dd',
                ),
                'htmlOptions' => array('class' => 'form-control dp1'
                )
            ));
            echo $form->error($trayectoriaLaboral, 'fecha_inicio');
            ?>
            <span class="input-group-addon">A</span>
            <?php
            $this->widget('zii.widgets.jui.CJuiDatePicker', array(
                'model' => $trayectoriaLaboral,
                'attribute' => 'fecha_fin',
                'language' => 'es',
                'options' => array(
                    'changeYear' => true,
                    'changeMonth' => true,
                    'showAnim' => 'fold',
                    'yearRange' => '-70:+0',
                    'dateFormat' => 'yy-mm-dd',
                ),
                'htmlOptions' => array('class' => 'form-control dp2'
                )
            ));
            echo $form->error($trayectoriaLaboral, 'fecha_fin');
            ?>
        </div>
    </div>
</div>
<div class='row'><!--Fila n-->
    <div class="col-md-4 form-group">
        <?php
        echo $form->labelEx($trayectoriaLaboral, 'descripcion');
        echo
        $form->textArea($trayectoriaLaboral, 'descripcion', array('size' => 60, 'class' => 'form-control')
        );
        echo $form->error($trayectoriaLaboral, 'descripcion');
        ?>

    </div>


</div>


<div class="row">
    <div class="col-md-4 form-group">

        <?php echo CHtml::submitButton(($trayectoriaLaboral->isNewRecord) ? 'Crear' : 'Actualizar', array('class' => 'btn btn-primary')); ?>
    </div>
</div>

<?php $this->endWidget(); ?>

