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
?>

<br>
<br>

<div class='row'><!--Fila n-->
    <div class="col-md-11 col-md-offset-1">
        <div class='row'><!--Fila n-->
            <div class="col-md-11 form-group">
                <h5 class="titulo-curso">Cursos Tomados</h5>
                <br>
                <br>
                <?php

                $cursosTomados = $servidorPublico->getCursosTomados();

                foreach ($cursosTomados as $cursosTomadosTemp) {

                    $curso = isset($cursosTomadosTemp->idCursoDisponible) ? $cursosTomadosTemp->idCursoDisponible->nombre_curso : '';

                    echo '<div class="row" style="border-bottom: 1px solid darkred">
                              <div class="col-md-11">';

                    echo "<h6 class='titulo-puesto'> <span>Curso: </span>$curso </h6>";
                    echo "<h6 class='titulo-puesto'> <span>Folio: </span>$cursosTomadosTemp->folio_socio_tecnologico </h6>";
                    echo "<h6 class='desc-curso' ><span>Fecha Inicio:</span> $cursosTomadosTemp->fecha_inicio </h6>";
                    echo "<h6 class='desc-curso' ><span>Fecha Final:</span> " . ($cursosTomadosTemp->fecha_fin == "0000-00-00" ? 'En proceso' : $cursosTomadosTemp->fecha_fin) . "</h6>";
                    echo "<button class='btn btn-danger'> Compartir </button>";
                    echo '<br>';
                    echo '<br>';
                    echo '  </div>';
                    echo '</div>';
                }
                ?>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <?php echo CHtml::link('Ver cursos Actuales',array('')); ?>
            </div>
        </div>

    </div>




