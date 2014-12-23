<?php
/**
 * Created by PhpStorm.
 * User: kristhian
 * Date: 4/24/14
 * Time: 2:39 PM
 */




?>


<?php
if (!Yii::app()->user->isGuest) {
    ?>

    <div id="sidebar" class="nav-collapse">
        <!-- sidebar menu start-->
        <div class="leftside-navigation">
            <ul class="sidebar-menu" id="nav-accordion">

                <?php
                if (Yii::app()->session['tipo_loogin'] == CatNivelAcceso::ADMIN) {
                    ?>

                    <li class="sub-menu">
                        <a href="javascript:;">
                            <i class="fa fa-laptop"></i>
                            <span>Administración</span>
                        </a>
                        <ul class="sub">
                            <li><?php
                                //echo CHtml::link('<i class="fa fa-power-off"></i><span>Eventos</span>', array('/evento'));
                                echo CHtml::link('<i class="fa fa-users"></i><span>Dependencia</span>', array('/admin/catDependencia'));
                                ?></li>
                            <li><?php
                                echo CHtml::link('<i class="fa fa-desktop"></i><span>Servidor público</span>', array('/admin/servidorPublico'));
                                ?>
                            </li>
                            <li><?php
                                echo CHtml::link('<i class="fa fa-desktop"></i><span>Socio tecnológico</span>', array('/admin/socioTecnologico'));
                                ?>
                            </li>
                        </ul>
                    </li>
                <?php
                }
                elseif (Yii::app()->session['tipo_loogin'] == CatNivelAcceso::FUNCIONARIO) { ?>

                    <li class="menu"><?php
                        echo CHtml::link('<i class="fa fa-users"></i><span>Mis Datos</span>', array('/funcionario'));
                        ?>
                    </li>

                    <li class="menu"><?php
                        echo CHtml::link('<i class="fa fa-users"></i><span>Cursos</span>', array('/funcionario/cursosDisponibles'));
                        ?>
                    </li>


                <?php } ?>




            </ul>
        </div>
        <!-- sidebar menu end-->
    </div>
<?php
}
?>