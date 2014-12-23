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


echo '<div id="form-perfil" >';
$form = $this->beginWidget('DynamicTabularForm', array(
    'defaultRowView' => '_rowFormCursos',
    'htmlOptions' => array('name' => 'cursos', 'id' => 'cursos'),
    'rowUrl' => $this->createUrl('/admin/cursosDeseados/getRowForm'),
));

echo '<h5> Cursos deseados</h5>';
echo $form->rowForm($cursoDeseado);


echo  ' <br>';
echo  '<br>';

echo '<div class="btn btn-success" onclick="guardarCursos()"> Guardar Preferencias</div> ';

    $this->endWidget();

echo '</div>';


?>


<script type="text/javascript">
    function guardarCursos() {

        $.ajax({

                data: $('#cursos').serialize(),
                url: '<?php echo $this->createUrl('/admin/cursosDeseados/createFuncionario'); ?>',
                type: 'POST',
                success: function (response) {
                    $("#form-perfil").html(response);
                },
                beforeSend: function () {
                    var indicator = '<div class="row" > <div class="col-xs-12" style="text-align: center"><p>Cargando...</p><img src="img/load.gif"></div></div>';
                    $("#form-perfil").html(indicator);
                },
                error: function () {
                    alert('Hubo un error, por favor recarga la página e intenta nuevamente');
                }

            }
        );


    }

</script>