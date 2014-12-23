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

                <h5 class="titulo-curso">Datos Generales</h5>

                <h4 class="titulo-curso">
                    <span>Nombre:</span>
                    <?php
                    echo $servidorPublico->getNombreCompleto()
                    ?></h4>

                <h6 class="titulo-puesto">
                    <span>Puesto: </span><?php echo $servidorPublico->getPuestoActual();
                    ?>
                </h6>
                <h6 class="titulo-puesto">
                    <span>Dependencia: </span><?php echo $servidorPublico->getDependencia();;
                    ?>
                </h6>           <h6 class="titulo-puesto">
                    <span>Área dentro de la dependencia: </span><?php echo $servidorPublico->getAreaDependencia();;
                    ?>
                </h6>


                <a class=" titulo-puesto" href="<?php echo $servidorPublico->linkedin; ?>">
                    <span class="fa fa-linkedin" style="width: 30px"> </span> Linkedin</a>
                <br>
                <br>


                <p class="desc-curso">
                    <span>Descripción Profesional: </span><?php echo $servidorPublico->breve_descripcion; ?></p>
            </div>
        </div>


        <div class="row">
            <div class="col-md-11">

                <h5 class="titulo-curso">Formación Académica</h5>



                <?php
                $formaciones = $servidorPublico->getFormacionAcademica();

                foreach ($formaciones as $formacionAcademicaTemp) {


                    echo '<div class="row">
                              <div class="col-md-11">';
                    $tipoEstudio = $formacionAcademicaTemp->idTipoEstudio;
                    echo "<h6 class='titulo-puesto'> <span>Estudio: </span>$tipoEstudio->tipo_estudio </h6>";
                    echo "<p class='desc-curso'>

                    <span>Descripción Profesional: </span> $formacionAcademicaTemp->descripcion; </p>";

                    echo "<h6 class='desc-curso' ><span>Fecha Inicio:</span> $formacionAcademicaTemp->fecha_inicio </h6>";
                    echo "<h6 class='desc-curso' ><span>Fecha Final:</span> " . ($formacionAcademicaTemp->fecha_fin == "" ? 'En proceso' : $formacionAcademicaTemp->fecha_fin) . "</h6>";

              echo '  <p class="desc-curso"><span>Descripción del trabajo: </span>'.
                  $formacionAcademicaTemp->descripcion .'</p>';


                echo '  </div>';
                    echo '</div>';
                }



                ?>


            </div>
        </div>
        <div class="row">
            <div class="col-md-11">
                <h5 class="titulo-curso">Trayectoria Laboral</h5>

                <?php
                $trayectoria = $servidorPublico->getTrayectoriaLaboral();

                foreach ($trayectoria as $trayectoriaTemp) {

                    echo '<div class="row">
                              <div class="col-md-11">';;
                    echo "<h6 class='titulo-puesto'> <span>Puesto: </span>$trayectoriaTemp->puesto</h6>";
                    echo "<p class='desc-curso'>

                    <span>Sector: </span> " . $trayectoriaTemp->getSector() ." </p>";
                    echo '  <p class="desc-curso"><span>Descripción del trabajo: </span>'.
                        $trayectoriaTemp->descripcion .'</p>';



                    echo "<h6 class='desc-curso' ><span>Fecha Inicio:</span> $trayectoriaTemp->fecha_inicio </h6>";
                    echo "<h6 class='desc-curso' ><span>Fecha Final:</span> " . $trayectoriaTemp->fecha_fin  . "</h6>";

                    echo '  </div>';
                    echo '</div>';
                }



                ?>


            </div>
        </div>


    </div>
</div>
