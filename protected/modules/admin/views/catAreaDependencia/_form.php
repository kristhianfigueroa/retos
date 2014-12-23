<?php
/**
 * Created by JetBrains PhpStorm.
 * User: App Factory
 * mail: kristhian@appfactory.com.mx
 * Date: 19-12-2014
 * Time: 10:09 AM

        **/

        $pageTitle = $this->pageTitle = Yii::app()->name;
        $baseUrl = Yii::app()->request->baseUrl;
        $idPersonal = Yii::app()->user->id;

     ?> 

<?php $form=$this->beginWidget('CActiveForm', array(
	'id'=>'cat-area-dependencia-form',
	'enableAjaxValidation'=>false,
)); ?>



<p class="note">Los campos con <span class="required">*</span> son requeridos.</p>


<div class='row' ><!--Fila n--> 
    </div > 
<div class='row' ><!--Fila n--> 

                <div class="col-md-4 form-group">
                     <?php 
                    echo $form->labelEx($catAreaDependencia,'cat_area_dependencia');
                    echo $form->textField($catAreaDependencia,'cat_area_dependencia',
				            array('size'=>60,'maxlength'=>200,'class'=>'form-control'));
                    echo $form->error($catAreaDependencia,'cat_area_dependencia'); 
                    ?> 

                </div>
                                <div class="col-md-4 form-group">
                     <?php 
                    echo $form->labelEx($catAreaDependencia,'id_cat_dependencia');
                    echo $form->dropDownList($catAreaDependencia,'id_cat_dependencia',
                            CatDependencia::comboBox(),
                           array('empty'=>'Seleccionar ..','class'=>'form-control'));     
                    echo $form->error($catAreaDependencia,'id_cat_dependencia'); 
                    ?> 
                    <br>
                </div>
                                     </div >

<div class="row">
    <div class="col-md-4 form-group">

        <?php echo CHtml::submitButton(($catAreaDependencia->isNewRecord)?'Crear':'Actualizar',array('class'=>'btn btn-primary')); ?>
    </div>
</div>

<?php $this->endWidget(); ?>

