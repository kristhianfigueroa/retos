<?php
/**
 * Created by JetBrains PhpStorm.
 * User: App Factory
 * mail: kristhian@appfactory.com.mx
 * Date: 22-12-2014
 * Time: 10:09 AM

        **/

        $pageTitle = $this->pageTitle = Yii::app()->name;
        $baseUrl = Yii::app()->request->baseUrl;
        $idPersonal = Yii::app()->user->id;
        $disabled = isset($disabled) ? $disabled : "" ;
     ?> 

<?php $form=$this->beginWidget('CActiveForm', array(
	'id'=>'cat-puesto-form',
	'enableAjaxValidation'=>false,
)); ?>

<?php echo $form->errorSummary($catPuesto); ?>


<p class="note">Los campos con <span class="required">*</span> son requeridos.</p>


<div class='row' ><!--Fila n--> 
    </div > 
<div class='row' ><!--Fila n--> 

                <div class="col-md-4 form-group">
                     <?php 
                    echo $form->labelEx($catPuesto,'cat_puesto');
                    echo $form->textField($catPuesto,'cat_puesto',
				            array('size'=>60,'maxlength'=>200,'class'=>'form-control', 'disabled' => $disabled));
                    echo $form->error($catPuesto,'cat_puesto'); 
                    ?> 

                </div>
                                     </div >

<div class="row">
    <div class="col-md-4 form-group">

        <?php echo CHtml::submitButton(($catPuesto->isNewRecord)?'Crear':'Actualizar',array('class'=>'btn btn-primary')); ?>
    </div>
</div>

<?php $this->endWidget(); ?>

