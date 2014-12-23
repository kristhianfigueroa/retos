<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Kristhian Figueroa Villegas
 * ail: kristhian@appfactory.com.mx
 * Date: 9/18/13
 * Time: 10:09 AM
 **/

$pageTitle = $this->pageTitle = Yii::app()->name;
$baseUrl = Yii::app()->request->baseUrl;
$idPersona = Yii::app()->user->id;


?>

<div class="row" style="margin-bottom: 10px;">
    <div class="col-md-10">
        <div class="row">
            <div class="col-md-6">
                <img src="cursos/no-disponible.png" class="img-rounded" style="width: 90%">
            </div>
            <div class="col-md-6">
                <h5 class="titulo-curso">
                    <?php
                    echo $data->nombre_curso;
                    ?>
                </h5>
                <p class="desc-curso"><?php
                    echo $data->descripcion;
                    ?>
                </p>
                <?php


                if(file_exists($data->pdf_temario)){

                    echo '<a href=" ' .$data->pdf_temario . '" class="btn btn-danger" target="black"> Temario</a>';

                }



                ?>

            </div>
        </div>


    </div>
</div>
