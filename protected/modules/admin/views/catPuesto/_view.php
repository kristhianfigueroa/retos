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
echo $form->labelEx(CatPuesto,'cat_puesto');
echo $form->textField($catPuesto,'cat_puesto' ,
                           array('disabled'=>'disabled','class'=>'form-control'));     
?> 
                                </div>
                            </div><br>
                                                                                                                                                                                                                                                                                <div class="row">
                                <div class="col-md-6">
                                     <?php 
                                    echo $form->checkBox($catPuesto,'activo',array('class'=>'form-control')); 
                                    echo $form->labelEx($catPuesto,'activo',
                                array('style'=>'display:inline; margin: 5px'),
                                array('disabled'=>'disabled','class'=>'form-control')
                                );

                                    ?> 
                                    <br>
                                    <br>
                                    <br>
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
echo $form->labelEx(CatPuesto,'persona_creacion');
$personaModel  = Persona::model()->findByPk($catPuesto->persona_creacion);
$nombreCampo=''; 
if(count($personaModel) == 1) 
  $nombreCampo =  $personaModel->nombre . ' ' . $personaModel->apellidos ; 
echo CHtml::textField('name',$nombreCampo, array('disabled'=>'disabled','class'=>'form-control'));?> 
                                </div>
                            </div><br>
                                                    <div class="row"><!--Fila 1-->
                                <div class="col-md-6">
                                     <?php 
echo $form->labelEx(CatPuesto,'fecha_creacion');
echo $form->'textField'($catPuesto,'fecha_creacion' ,
                           array('disabled'=>'disabled','class'=>'form-control'));     
?> 

                                </div>
                            </div><br>
                                                    <div class="row">
                                <div class="col-md-6">

                                     <?php 
echo $form->labelEx(CatPuesto,'persona_modificacion');
$personaModel  = Persona::model()->findByPk($catPuesto->persona_modificacion);
$nombreCampo=''; 
if(count($personaModel) == 1) 
  $nombreCampo =  $personaModel->nombre . ' ' . $personaModel->apellidos ; 
echo CHtml::textField('name',$nombreCampo, array('disabled'=>'disabled','class'=>'form-control'));?> 
                                </div>
                            </div><br>
                                                    <div class="row"><!--Fila 1-->
                                <div class="col-md-6">
                                     <?php 
echo $form->labelEx(CatPuesto,'fecha_modificacion');
echo $form->'textField'($catPuesto,'fecha_modificacion' ,
                           array('disabled'=>'disabled','class'=>'form-control'));     
?> 

                                </div>
                            </div><br>
                                        </div>


            </div>

        </div>
    </div>
    </div>

<?php  $this->endWidget();