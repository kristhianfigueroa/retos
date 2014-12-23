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

<style type="text/css">

    label {
        color: #C2002F;

    }
</style>

<div class='row'><!--Fila n-->
    <div class="col-md-4 form-group">

<div class="btn btn-info" onclick="registrarFuncionario(<?php echo $curso->id_curso_disponible?>)">
    Registrarme al Curso
</div>

    </div>
</div>

<div class='row'><!--Fila n-->


    <div class="col-md-4 form-group">
        <?php
        echo CHtml::activeLabelEx($curso, 'folio_socio_tecnologico');
        echo '<h5>' . $curso->folio_socio_tecnologico . '</h5>';

        ?>
    </div>

</div>
<div class='row'><!--Fila n-->


    <div class="col-md-4 form-group">
        <?php
        echo CHtml::activeLabelEx($curso, 'folio_socio_tecnologico');
        echo '<h5>' . $curso->folio_socio_tecnologico . '</h5>';

        ?>
    </div>
    <div class="col-md-4 form-group">
        <?php
        echo CHtml::activeLabelEx($curso, 'nombre_curso');
        echo '<h5>' . $curso->nombre_curso . '</h5>';
        ?>
    </div>
    <div class="col-md-4 form-group">
        <?php
        echo CHtml::activeLabelEx($curso, 'pdf_temario');

        if (file_exists($curso->pdf_temario))
            echo '<a href="' . $curso->pdf_temario . '"> </a>'


        ?>
    </div>
</div>
<div class='row'><!--Fila n-->

    <div class="col-md-4 form-group">
        <?php
        echo CHtml::activeLabelEx($curso, 'id_cat_curso');
        $catCurso = isset($curso->idCatCurso) ? $curso->idCatCurso->cat_curso : '';

        echo '<h5>' . $catCurso . '<h5>';

        ?>
    </div>
    <div class="col-md-4 form-group">
        <?php
        echo CHtml::activeLabelEx($curso, 'horas_curso');
        echo '<h5>' . $curso->horas_curso . '</h5>';
        ?>
    </div>
    <div class="col-md-4 form-group">
        <?php
        echo CHtml::activeLabelEx($curso, 'formato');
        $formato = isset($curso->idFormato) ? $curso->idFormato->formato : '';
        echo '<h5>' . $formato . '</h5>';
        ?>
    </div>
</div>

<div class="row">
    <div class="col-md-4">
        <div class="row">
            <div class="col-md-12 form-group">
                <?php
                echo CHtml::activeLabelEx($curso, 'fecha_inicio');


                echo '<h5>' . $curso->fecha_inicio . '</h5>';

                ?>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 form-group">
                <?php
                echo CHtml::activeLabelEx($curso, 'id_cat_comprobante');
                $comprobante = isset($curso->idCatComprobante) ? $curso->idCatComprobante->cat_comprobante : '';
                echo '<h5>' . $comprobante . '</h5>';

                ?>

            </div>
        </div>
    </div>
    <div class="col-md-8">
        <div class="row">
            <div class="col-md-12 form-group">
                <?php
                echo CHtml::activeLabelEx($curso, 'descripcion');
                echo '<p class="desc-curso">' . $curso->descripcion . '</h5>';
                ?>

            </div>
        </div>
    </div>
</div>
