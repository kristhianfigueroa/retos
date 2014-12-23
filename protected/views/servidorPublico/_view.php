<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Kristhian Figueroa Villegas
 * ail: kristhian@appfactory.com.mx
 * Date: 9/18/13
 * Time: 10:09 AM
 **/

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
                            echo $form->labelEx(ServidorPublico, 'nombre');
                            echo $form->textField($servidorPublico, 'nombre',
                                array('disabled' => 'disabled', 'class' => 'form-control'));
                            ?>
                        </div>
                    </div>
                    <br>

                    <div class="row">
                        <div class="col-md-6">
                            <?php
                            echo $form->labelEx(ServidorPublico, 'apellido_paterno');
                            echo $form->textField($servidorPublico, 'apellido_paterno',
                                array('disabled' => 'disabled', 'class' => 'form-control'));
                            ?>
                        </div>
                    </div>
                    <br>

                    <div class="row">
                        <div class="col-md-6">
                            <?php
                            echo $form->labelEx(ServidorPublico, 'apellido_materno');
                            echo $form->textField($servidorPublico, 'apellido_materno',
                                array('disabled' => 'disabled', 'class' => 'form-control'));
                            ?>
                        </div>
                    </div>
                    <br>

                    <div class="row">
                        <div class="col-md-6">
                            <?php
                            echo $form->labelEx(ServidorPublico, 'id_cat_dependencia');
                            $nombreCampo = $nombreModel->id CatDependencia->$nombreCampo;
echo CHtml::textField('name', $nombreCampo, array('disabled' => 'disabled', 'class' => 'form-control'));?>
                            <br>
                        </div>
                    </div>
                    <br>

                    <div class="row">
                        <div class="col-md-6">
                            <?php
                            echo $form->labelEx(ServidorPublico, 'id_cat_area_dependencia');
                            $nombreCampo = $nombreModel->id CatAreaDependencia->$nombreCampo;
echo CHtml::textField('name', $nombreCampo, array('disabled' => 'disabled', 'class' => 'form-control'));?>
                            <br>
                        </div>
                    </div>
                    <br>

                    <div class="row">
                        <div class="col-md-6">
                            <?php
                            echo $form->labelEx(ServidorPublico, 'linkedin');
                            echo $form->textField($servidorPublico, 'linkedin',
                                array('disabled' => 'disabled', 'class' => 'form-control'));
                            ?>
                        </div>
                    </div>
                    <br>

                    <div class="row">
                        <div class="col-md-6">
                            <?php
                            echo $form->labelEx(ServidorPublico, 'email');
                            echo $form->textField($servidorPublico, 'email',
                                array('disabled' => 'disabled', 'class' => 'form-control'));
                            ?>
                        </div>
                    </div>
                    <br>

                    <div class="row">
                        <div class="col-md-6">
                            <?php
                            echo $form->labelEx(ServidorPublico, 'usuario');
                            echo $form->textField($servidorPublico, 'usuario',
                                array('disabled' => 'disabled', 'class' => 'form-control'));
                            ?>
                        </div>
                    </div>
                    <br>

                    <div class="row">
                        <div class="col-md-6">
                            <?php
                            echo $form->labelEx(ServidorPublico, 'contrasenia');
                            echo $form->textField($servidorPublico, 'contrasenia',
                                array('disabled' => 'disabled', 'class' => 'form-control'));
                            ?>
                        </div>
                    </div>
                    <br>

                    <div class="row">
                        <div class="col-md-6">
                            <?php
                            echo $form->labelEx(ServidorPublico, 'telefono');
                            echo $form->textField($servidorPublico, 'telefono',
                                array('disabled' => 'disabled', 'class' => 'form-control'));
                            ?>
                        </div>
                    </div>
                    <br>

                    <div class="row">
                        <div class="col-md-6">
                            <?php
                            echo $form->labelEx(ServidorPublico, 'foto');
                            echo $form->textField($servidorPublico, 'foto',
                                array('disabled' => 'disabled', 'class' => 'form-control'));
                            ?>
                        </div>
                    </div>
                    <br>

                    <div class="row">
                        <div class="col-md-6">
                            <?php
                            echo $form->labelEx(ServidorPublico, 'id_jefe_directo');
                            $nombreCampo = $nombreModel->id JefeDirecto->$nombreCampo;
echo CHtml::textField('name', $nombreCampo, array('disabled' => 'disabled', 'class' => 'form-control'));?>
                            <br>
                        </div>
                    </div>
                    <br>

                    <div class="row">
                        <div class="col-md-6">
                            <?php
                            echo $form->checkBox($servidorPublico, 'activo', array('class' => 'form-control'));
                            echo $form->labelEx($servidorPublico, 'activo',
                                array('style' => 'display:inline; margin: 5px'),
                                array('disabled' => 'disabled', 'class' => 'form-control')
                            );

                            ?>
                            <br>
                            <br>
                            <br>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <?php
                            echo $form->labelEx(ServidorPublico, 'id_cat_nivel_acceso');
                            $nombreCampo = $nombreModel->id CatNivelAcceso->$nombreCampo;
echo CHtml::textField('name', $nombreCampo, array('disabled' => 'disabled', 'class' => 'form-control'));?>
                            <br>
                        </div>
                    </div>
                    <br>


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
                            echo $form->labelEx(ServidorPublico, 'persona_creacion');
                            $personaModel = Persona::model()->findByPk($servidorPublico->persona_creacion);
                            $nombreCampo = '';
                            if (count($personaModel) == 1)
                                $nombreCampo = $personaModel->nombre . ' ' . $personaModel->apellidos;
                            echo CHtml::textField('name', $nombreCampo, array('disabled' => 'disabled', 'class' => 'form-control'));?>
                        </div>
                    </div>
                    <br>

                    <div class="row"><!--Fila 1-->
                        <div class="col-md-6">
                            <?php
                            echo $form->labelEx(ServidorPublico, 'fecha_creacion');
                            echo $form->'textField'($servidorPublico,'fecha_creacion' ,
                           array('disabled' => 'disabled', 'class' => 'form-control'));
?>

                        </div>
                    </div>
                    <br>

                    <div class="row">
                        <div class="col-md-6">

                            <?php
                            echo $form->labelEx(ServidorPublico, 'persona_modificacion');
                            $personaModel = Persona::model()->findByPk($servidorPublico->persona_modificacion);
                            $nombreCampo = '';
                            if (count($personaModel) == 1)
                                $nombreCampo = $personaModel->nombre . ' ' . $personaModel->apellidos;
                            echo CHtml::textField('name', $nombreCampo, array('disabled' => 'disabled', 'class' => 'form-control'));?>
                        </div>
                    </div>
                    <br>

                    <div class="row"><!--Fila 1-->
                        <div class="col-md-6">
                            <?php
                            echo $form->labelEx(ServidorPublico, 'fecha_modificacion');
                            echo $form->'textField'($servidorPublico,'fecha_modificacion' ,
                           array('disabled' => 'disabled', 'class' => 'form-control'));
?>

                        </div>
                    </div>
                    <br>
                </div>


            </div>

        </div>
    </div>
    </div>

<?php $this->endWidget();