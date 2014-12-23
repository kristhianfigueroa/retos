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

<div style="display:<?php echo $visible; ?>" id="<?php echo $row_id ?>">
    <?php
    // echo $form->hiddenField($model, "[$key]id_servidor_publico");
    echo $form->updateTypeField($model, $key, "updateType", array('key' => $key));
    ?>
    <div class="row">
        <div class="col-md-4 form-group">
            <?php
            echo $form->dropDownList($model, "[$key]id_area_interes", AreaInteres::comboBox(), array('empty' => 'Seleccionar ..', 'class' => 'form-control'));
            echo $form->error($model, "[$key]id_area_interes");
            ?>
        </div>
        <div class="col-md-1">
            <?php if ($key > 0): ?>
                <p><br>
                    <?php echo $form->deleteRowButton($row_id, $key, 'x', array('class' => 'btn btn-danger btn-sm')); ?>
                </p>
            <?php endif; ?>
        </div>
    </div>
</div>