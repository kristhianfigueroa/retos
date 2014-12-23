<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Kristhian Figueroa Villegas, Roberto Cruz
 * mail: kristhian@appfactory.com.mx
 * Date: 19-12-2014
 * */
$pageTitle = $this->pageTitle = Yii::app()->name;
$baseUrl = Yii::app()->request->baseUrl;
?>

<?php
/* @var $this ServidorPublicoController */
/* @var $servidorPublico ServidorPublico */
?>

<section class="panel">

    <div class="row">
        <div class="col-md-4">
            <?php

            if (file_exists($servidorPublico->foto)) {
                echo '<img src="' . $servidorPublico->foto . '" class="img-rounded" style="width:100%">';
            } else {
                echo '<img src="img/logoGobierno.png" class="img-rounded" style="width:100%">';
            }
            ?>


        </div>

        <div class="col-md-8">
            <div class="row">
                <div class="col-md-12">
                    <h4 class="titulo-curso">
                        <?php
                        echo $servidorPublico->nombre . ' ' . $servidorPublico->apellido_paterno . ' ' . $servidorPublico->apellido_materno;
                        ?></h4>
                    <h6 class="titulo-puesto">
                        <?php echo $servidorPublico->getPuestoActual();
                        ?>
                    </h6>

                </div>
            </div>
            <div class="row">
                <div class="col-md-8">

                    <?php
                    echo CHtml::link('Editar Perfil', array('funcionario/editarPerfil'), array('class' => 'btn btn-danger', 'disabled'=>'disabled'));
                    ?>
                </div>
            </div>

        </div>
    </div>

</section>


<!-- Nav tabs -->
<ul class="nav nav-tabs" role="tablist" style="border: 0px" id="myTab">
    <li><a id="a-perfil" href="#perfil" role="tab" data-toggle="tab">Mi Perfil</a></li>
    <li><a id="a-interes" href="#interes" role="tab" data-toggle="tab">Mis Temas de Interés</a></li>
    <li><a id="a-cursos-tomados" href="#cursos-tomados" role="tab" data-toggle="tab">Cursos Tomados</a></li>
    <li><a id="a-conclusion" href="#conclusion" role="tab" data-toggle="tab">Objetivos y plan de crecimiento</a></li>
</ul>

<!-- Tab panes -->
<div class="tab-content">
    <div class="tab-pane active" id="perfil">
        <br>


        <?php
        /*
                $form = $this->beginWidget('CActiveForm', array(
                    'id' => 'servidor-publico-form',
                    'enableAjaxValidation' => false,
                    'htmlOptions' => array('enctype' => 'multipart/form-data')
                ));


                $this->renderPartial(
                    '_form_perfil_editar',
                    array('servidorPublico' => $servidorPublico,
                        'form' => $form));


                $this->endWidget();*/


        $this->renderPartial(
            '_form_perfil',
            array('servidorPublico' => $servidorPublico,
            ));





        ?>


    </div>

    <div class="tab-pane" id="interes">
        <?php
        $cursoDeseado = $servidorPublico->getCursosDeseados();

        $this->renderPartial('_form_interes',
            array('cursoDeseado' => $cursoDeseado
            )
        );


        ?>


    </div>
    <div class="tab-pane" id="cursos-tomados">


        <div class="panel-body">
            <?php
            $this->renderPartial('_form_cursos_tomados',
                array('servidorPublico' => $servidorPublico,
                ));
            ?>
        </div>
    </div>
</div>
<div class="tab-pane" id="conclusion">
    <?php

    $objetivos= $servidorPublico->getObjetivos();

    $this->renderPartial('_form_objetivo',
        array('objetivos' => $objetivos
        )
    );


    ?>


</div>
</div>
<br>
<br>

<script type="text/javascript">


    function buscaErrores() {


        var tabDatoPersonal = document.getElementById('perfil').getElementsByClassName('errorMessage');
        var tabDatointeres = document.getElementById('interes').getElementsByClassName('errorMessage');
        var tabDatoCursosTomados = document.getElementById('cursos-tomados').getElementsByClassName('errorMessage');
        var tabDatoConclusion = document.getElementById('conclusion').getElementsByClassName('errorMessage');


        $('#myTab a[href="#perfil"]').tab('show');

        console.log('tabDatoConclusion: ' + tabDatoConclusion);
        if (tabDatoConclusion.length > 0) {
            $('#myTab a[href="#conclusion"]').tab('show') // Select tab by name
            $("#a-conclusion").append('<span> <i class="fa fa-times"></i></span>');

        }

        if (tabDatoCursosTomados.length > 0) {
            $('#myTab a[href="#cursos-tomados"]').tab('show') // Select tab by name
            $("#a-cursos-tomados").append('<span> <i class="fa fa-times"></i></span>');

        }
        if (tabDatointeres.length > 0) {
            $('#myTab a[href="#interes"]').tab('show') // Select tab by name
            $("#a-interes").append('<span> <i class="fa fa-times"></i></span>');
        }

        if (tabDatoPersonal.length > 0) {
            $("#a-perfil").append('<span> <i class="fa fa-times"></i></span>');
            $('#myTab a[href="#perfil"]').tab('show') // Select tab by name

        }


    }


    $('#dato-personal-form').submit(function () {
        $('.form-control').prop("disabled", false); // Element(s) are now enabled.

    });


    $(document).ready(function () {
        buscaErrores();

    });

</script>
