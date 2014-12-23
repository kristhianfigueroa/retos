<?php
$row_id = "sladetail-{$key}";
/* $visible = 'none';
  if ($key == 0) {
  $visible = 'block';
  }
  if ($model->getErrors() != null) {
  $visible = 'block';
  } */
$visible = 'block';
?>
<?php
$sectores = array(
    array('label' => 'Público', 'index' => '0'),
    array('label' => 'Privado', 'index' => '1')
);
?>
<div style="display:<?php echo $visible; ?>" id="<?php echo $row_id ?>">
    <?php
    echo $form->hiddenField($model, "[$key]id_servidor_publico");
    echo $form->updateTypeField($model, $key, "updateType", array('key' => $key));
    ?>
    <div class="row">
        <div class="col-md-5" >
            <div class="row">
                <div class="col-md-12">
                    <?php
                    //echo $form->textField($model, "[$key]id_capacitacion");
                    echo $form->labelEx($model, "[$key]puesto");
                    echo $form->textField($model, "[$key]puesto", array('size' => 60, 'maxlength' => 200, 'class' => 'form-control'));
                    echo $form->error($model, "[$key]puesto");
                    ?>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 form-group">
                    <?php
                    echo $form->labelEx($model, "[$key]sector");
                    echo $form->dropDownList($model, "[$key]sector", CHtml::listData($sectores, 'index', 'label'), array('empty' => 'Seleccionar ..', 'class' => 'form-control'));
                    echo $form->error($model, "[$key]sector");
                    ?> 
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 form-group">
                    <label>Periodo</label>
                    <?php //echo $form->labelEx($model, 'fecha_inicio');   ?>
                    <div  class="input-group input-large">
                        <!--<input type="text" name="from" class="form-control dpd1">-->
                        <?php
                        $this->widget('zii.widgets.jui.CJuiDatePicker', array(
                            'model' => $model,
                            'attribute' => "[$key]fecha_inicio",
                            'language' => 'es',
                            'options' => array(
                                'changeYear' => true,
                                'changeMonth' => true,
                                'showAnim' => 'fold',
                                'yearRange' => '-70:+0',
                                'dateFormat' => 'yy-mm-dd',
                            ),
                            'htmlOptions' => array('class' => 'form-control'
                            )
                        ));
                        echo $form->error($model, "[$key]fecha_inicio");
                        ?> 
                        <span class="input-group-addon">A</span>
                        <?php
                        $this->widget('zii.widgets.jui.CJuiDatePicker', array(
                            'model' => $model,
                            'attribute' => "[$key]fecha_fin",
                            'language' => 'es',
                            'options' => array(
                                'changeYear' => true,
                                'changeMonth' => true,
                                'showAnim' => 'fold',
                                'yearRange' => '-70:+0',
                                'dateFormat' => 'yy-mm-dd',
                            ),
                            'htmlOptions' => array('class' => 'form-control'
                            )
                        ));
                        echo $form->error($model, "[$key]fecha_fin");
                        ?> 
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-7" >
            <div class="row">
                <div class="col-md-10 form-group">
                    <?php
                    echo $form->labelEx($model, "[$key]descripcion");
                    echo $form->textArea($model, "[$key]descripcion", array('size' => 60, 'class' => 'form-control', 'rows' => '7'));
                    echo $form->error($model, "[$key]descripcion");
                    ?> 
                </div>
                <div class="col-md-2">
                    <?php if ($key > 0): ?>
                        <p><br>
                            <?php echo $form->deleteRowButton($row_id, $key, 'x', array('class' => 'btn btn-danger btn-sm')); ?>
                        </p>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>
    <hr/>
</div>