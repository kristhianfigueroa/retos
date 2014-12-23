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
echo $form->labelEx(SocioTecnologico,'nombre');
echo $form->textField($socioTecnologico,'nombre' ,
                           array('disabled'=>'disabled','class'=>'form-control'));     
?> 
                                </div>
                            </div><br>
                                                                                                <div class="row">
                                <div class="col-md-6">
                                     <?php 
echo $form->labelEx(SocioTecnologico,'razon_social');
echo $form->textField($socioTecnologico,'razon_social' ,
                           array('disabled'=>'disabled','class'=>'form-control'));     
?> 
                                </div>
                            </div><br>
                                                                                                <div class="row">
                                <div class="col-md-6">
                                     <?php 
echo $form->labelEx(SocioTecnologico,'telefono');
echo $form->textField($socioTecnologico,'telefono' ,
                           array('disabled'=>'disabled','class'=>'form-control'));     
?> 
                                </div>
                            </div><br>
                                                                                                <div class="row">
                                <div class="col-md-6">
                                     <?php 
echo $form->labelEx(SocioTecnologico,'email');
echo $form->textField($socioTecnologico,'email' ,
                           array('disabled'=>'disabled','class'=>'form-control'));     
?> 
                                </div>
                            </div><br>
                                                                                                <div class="row">
                                <div class="col-md-6">
                                     <?php 
echo $form->labelEx(SocioTecnologico,'direccion');
echo $form->textField($socioTecnologico,'direccion' ,
                           array('disabled'=>'disabled','class'=>'form-control'));     
?> 
                                </div>
                            </div><br>
                                                                                                <div class="row">
                                <div class="col-md-6">
                                     <?php 
echo $form->labelEx(SocioTecnologico,'usuario');
echo $form->textField($socioTecnologico,'usuario' ,
                           array('disabled'=>'disabled','class'=>'form-control'));     
?> 
                                </div>
                            </div><br>
                                                                                                <div class="row">
                                <div class="col-md-6">
                                     <?php 
echo $form->labelEx(SocioTecnologico,'contrasenia');
echo $form->textField($socioTecnologico,'contrasenia' ,
                           array('disabled'=>'disabled','class'=>'form-control'));     
?> 
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

<?php  $this->endWidget();