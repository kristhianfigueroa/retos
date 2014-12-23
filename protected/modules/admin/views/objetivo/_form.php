<?php
/**
 * Created by JetBrains PhpStorm.
 * User: App Factory
 * mail: kristhian@appfactory.com.mx
 * Date: 23-12-2014
 * Time: 10:09 AM

        **/

        $pageTitle = $this->pageTitle = Yii::app()->name;
        $baseUrl = Yii::app()->request->baseUrl;
        $idPersonal = Yii::app()->user->id;
        $disabled = isset($disabled) ? $disabled : "" ;
     ?> 

<?php $form=$this->beginWidget('CActiveForm', array(
	'id'=>'objetivo-form',
	'enableAjaxValidation'=>false,
)); ?>

<?php echo $form->errorSummary($objetivo); ?>


<p class="note">Los campos con <span class="required">*</span> son requeridos.</p>


<div class='row' ><!--Fila n--> 
    </div > 
<div class='row' ><!--Fila n--> 

                <div class="col-md-4 form-group">
                     <?php 
                    echo $form->labelEx($objetivo,'objetivo');
                    echo $form->textField($objetivo,'objetivo',
				            array('size'=>60,'maxlength'=>200,'class'=>'form-control', 'disabled' => $disabled));
                    echo $form->error($objetivo,'objetivo'); 
                    ?> 

                </div>
                
                <div class="col-md-4 form-group">
                     <?php 
                    echo $form->labelEx($objetivo,'anio');
                    echo $form->textField($objetivo,'anio',array('class'=>'form-control', 'disabled' => $disabled));
                    echo $form->error($objetivo,'anio'); 
                    ?> 

                </div>
                
                <div class="col-md-4 form-group">
                    <br>

                     <?php 
                    echo $form->checkBox($objetivo,'cumplido'); 
                    echo $form->labelEx($objetivo,'cumplido',array('style'=>'display:inline; margin: 5px'));
                    echo $form->error($objetivo,'cumplido'); 
                    ?> 
                    <br>
                    <br>
                </div>
                </div > 
<div class='row' ><!--Fila n--> 
                <div class="col-md-4 form-group">
                     <?php 
                    echo $form->labelEx($objetivo,'id_servidor_publico');
                    echo $form->dropDownList($objetivo,'id_servidor_publico',
                            ServidorPublico::comboBox(),
                           array('empty'=>'Seleccionar ..','class'=>'form-control'));     
                    echo $form->error($objetivo,'id_servidor_publico'); 
                    ?> 
                    <br>
                </div>
                                     </div >

<div class="row">
    <div class="col-md-4 form-group">

        <?php echo CHtml::submitButton(($objetivo->isNewRecord)?'Crear':'Actualizar',array('class'=>'btn btn-primary')); ?>
    </div>
</div>

<?php $this->endWidget(); ?>

