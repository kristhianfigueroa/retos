<?php
$form = $this->beginWidget('CActiveForm', array(
    'id' => 'cliente-form',
    'enableAjaxValidation' => false,
        ));
?>

<div class="row clearfix">
    <div class="col-md-12 column">
        <div class="panel panel-success">
            <div class="panel-heading">
                <h3 class="panel-title">
                    Datos Generales</h3>
            </div>

            <div class="panel-body">
              

                <div class="row">
                    <div class="col-md-6">
                        <?php
                        echo $form->labelEx($formacionAcademica, 'id_servidor_publico');
                        $nombreServidor = "{$formacionAcademica->idServidorPublico->nombre} {$formacionAcademica->idServidorPublico->apellido_paterno}";
                        echo CHtml::textField('', $nombreServidor, array('disabled' => 'disabled', 'class' => 'form-control lectura'));
                        ?> 
                    </div>
                    <div class="col-md-6">
                        <?php
                        echo $form->labelEx($formacionAcademica, 'id_tipo_estudio');
                        $valorCampo = $formacionAcademica->idTipoEstudio->tipo_estudio;
                        echo CHtml::textField('id_tipo_estudio', $valorCampo, array('disabled' => 'disabled', 'class' => 'form-control'));
                        ?> 
                        <br>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <?php
                        echo $form->labelEx($formacionAcademica, 'descripcion');
                        echo $form->textArea($formacionAcademica, 'descripcion', array('disabled' => 'disabled', 'class' => 'form-control lectura'));
                        ?> 
                    </div>
                </div><br>

                <div class="row">
                    <div class="col-md-6 form-group">
                        <label>Periodo</label>
                        <div class="input-group input-large">
                            <?php
                            echo $form->textField($formacionAcademica, 'fecha_inicio', array('disabled' => 'disabled', 'class' => 'form-control'));
                            ?> 
                            <span class="input-group-addon">A</span>
                            <?php
                            echo $form->textField($formacionAcademica, 'fecha_fin', array('disabled' => 'disabled', 'class' => 'form-control'));
                            ?> 
                        </div>
                    </div>
                 
                </div><br>


            </div>
        </div>
    </div>
</div>

<div class="row clearfix">
    <div class="col-md-12 column">
        <div class="panel panel-success">
            <div class="panel-heading">
                <h3 class="panel-title">
                    Datos Internos
                </h3>
            </div>
            <div class="panel-body">

            </div>


        </div>

    </div>
</div>
</div>

<?php
$this->endWidget();
