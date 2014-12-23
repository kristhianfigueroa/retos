<?php
/**
 * Created by JetBrains PhpStorm.
 * User: App Factory
 * mail: kristhian@appfactory.com.mx
 * Date: 19-12-2014
 * Time: 10:09 AM
 * */
$pageTitle = $this->pageTitle = Yii::app()->name;
$baseUrl = Yii::app()->request->baseUrl;
$idPersonal = Yii::app()->user->id;

echo '<br>';
echo '<br>';

echo '<div id="form-objetivo" >';
$form = $this->beginWidget('DynamicTabularForm', array(
    'defaultRowView' => '_rowFormObjetivo',
    'htmlOptions' => array('name' => 'objetivos', 'id' => 'objetivos'),
    'rowUrl' => $this->createUrl('/admin/objetivo/getRowForm'),
));


//echo $form->rowForm($objetivos);


echo  ' <br>';
echo  '<br>';

echo '<div class="btn btn-success" onclick="guardarObjetivos()"> Guardar </div> ';

    $this->endWidget();

echo '</div>';


?>


<script type="text/javascript">
    function guardarObjetivos() {

        $.ajax({

                data: $('#objetivos').serialize(),
                url: '<?php echo $this->createUrl('/admin/objetivo/createFuncionario'); ?>',
                type: 'POST',
                success: function (response) {
                    $("#form-objetivo").html(response);
                },
                beforeSend: function () {
                    var indicator = '<div class="row" > <div class="col-xs-12" style="text-align: center"><p>Cargando...</p><img src="img/load.gif"></div></div>';
                    $("#form-objetivo").html(indicator);
                },
                error: function () {
                    alert('Hubo un error, por favor recarga la página e intenta nuevamente');
                }

            }
        );


    }

</script>