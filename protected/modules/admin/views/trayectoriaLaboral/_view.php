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
                                    echo $form->labelEx(TrayectoriaLaboral,'id_servidor_publico');
                                    $nombreCampo =  $nombreModel->id ServidorPublico->$nombreCampo; 
echo CHtml::textField('name',$nombreCampo, array('disabled'=>'disabled','class'=>'form-control'));?> 
                                    <br>
                                </div>
                            </div><br>
                                                                                                <div class="row">
                                <div class="col-md-6">
                                     <?php 
echo $form->labelEx(TrayectoriaLaboral,'puesto');
echo $form->textField($trayectoriaLaboral,'puesto' ,
                           array('disabled'=>'disabled','class'=>'form-control'));     
?> 
                                </div>
                            </div><br>
                                                                                                <div class="row">
                                <div class="col-md-6">
                                     <?php 
echo $form->labelEx(TrayectoriaLaboral,'sector');
echo $form->textField($trayectoriaLaboral,'sector' ,
                           array('disabled'=>'disabled','class'=>'form-control'));     
?> 
                                </div>
                            </div><br>
                                                                                                <div class="row">
                                <div class="col-md-6">
                                     <?php 
echo $form->labelEx(TrayectoriaLaboral,'descripcion');
echo $form->textField($trayectoriaLaboral,'descripcion' ,
                           array('disabled'=>'disabled','class'=>'form-control'));     
?> 
                                </div>
                            </div><br>
                                                                                                <div class="row">
                                <div class="col-md-6">
                                     <?php 
echo $form->labelEx(TrayectoriaLaboral,'fecha_inicio');
echo $form->textField($trayectoriaLaboral,'fecha_inicio' ,
                           array('disabled'=>'disabled','class'=>'form-control'));     
?> 
                                </div>
                            </div><br>
                                                                                                <div class="row">
                                <div class="col-md-6">
                                     <?php 
echo $form->labelEx(TrayectoriaLaboral,'fecha_fin');
echo $form->textField($trayectoriaLaboral,'fecha_fin' ,
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