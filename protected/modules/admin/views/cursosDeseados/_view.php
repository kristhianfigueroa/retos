<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Kristhian Figueroa Villegas
 * ail: kristhian@appfactory.com.mx
 * Date: 9/18/13
 * Time: 10:09 AM

 * */
$pageTitle = $this->pageTitle = Yii::app()->name;
$baseUrl = Yii::app()->request->baseUrl;
$idPersona = Yii::app()->user->id;


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
                        echo $form->labelEx($cursosDeseados, 'id_servidor_publico');
                        $nombre = $cursosDeseados->idServidorPublico->nombre;
                        echo CHtml::textField('name', $nombre, array('disabled' => 'disabled', 'class' => 'form-control'));
                        ?> 
                    </div>
                     <div class="col-md-6">
                        <?php
                        echo $form->labelEx($cursosDeseados, 'id_area_interes');
                        $area = $cursosDeseados->idAreaInteres->area_interes;
                        echo CHtml::textField('name', $area, array('disabled' => 'disabled', 'class' => 'form-control'));
                        ?>
                    </div>
                </div>
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

                <div class="row">
                    <div class="col-md-6">
                        <?php
                        echo $form->labelEx($cursosDeseados, 'persona_creacion');
                        $personaModel = ServidorPublico::model()->findByPk($cursosDeseados->persona_creacion);
                        $nombreCampo = '';
                        if (count($personaModel) == 1)
                            $nombreCampo = $personaModel->nombre . ' ' . $personaModel->apellido_paterno;
                        echo CHtml::textField('name', $nombreCampo, array('disabled' => 'disabled', 'class' => 'form-control'));
                        ?> 
                    </div>
                    <div class="col-md-6">
                        <?php
                        echo $form->labelEx($cursosDeseados, 'fecha_creacion');
                        echo $form->textField($cursosDeseados, 'fecha_creacion',
                        array('disabled' => 'disabled', 'class' => 'form-control'));
                        ?> 
                    </div>
                </div><br>
           
                <div class="row">
                    <div class="col-md-6">
                        <?php
                        echo $form->labelEx($cursosDeseados, 'persona_modificacion');
                        $personaModel = ServidorPublico::model()->findByPk($cursosDeseados->persona_modificacion);
                        $nombreCampo = '';
                        if (count($personaModel) == 1){
                            $nombreCampo ="{$personaModel->nombre} {$personaModel->apellido_paterno}";
                        }   
                        echo CHtml::textField('name', $nombreCampo, array('disabled' => 'disabled', 'class' => 'form-control'));
                        ?> 
                    </div>
                     <div class="col-md-6">
                        <?php
                        echo $form->labelEx($cursosDeseados, 'fecha_modificacion');
                        echo $form->textField($cursosDeseados, 'fecha_modificacion',
                        array('disabled' => 'disabled', 'class' => 'form-control'));
                        ?> 
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>

<?php
$this->endWidget();
