<!--logo start-->
<div class="brand">

    <a href="index.php" class="logo">

        <img style="width: 50px;" src="img/logo_aplicacion.png" alt="">

    </a>

    <div class="sidebar-toggle-box">
        <div class="fa fa-bars fa-personal"></div>
    </div>
</div>
<!--logo end-->


<div class="top-nav clearfix"">
<!--search & user info start-->

<?php if (!Yii::app()->user->isGuest) { ?>

    <ul class="nav pull-right top-menu">


        <!-- user login dropdown start-->
        <li class="dropdown">

            <a data-toggle="dropdown" class="dropdown-toggle" href="#">

                <?php

                    $cliente = ServidorPublico::model()->findByPK(Yii::app()->user->id);


                    if (file_exists($cliente->foto))
                        echo '<img alt="" src=" ' . $cliente->foto . '" class="img-rounded">';
                    else
                        echo '<img alt="" src="img/logo_aplicacion.png" class="img-rounded">';
                    ?>


                <span class="username"><?php echo Yii::app()->user->name; ?>  </span>
                <b class="caret"></b>
            </a>
            <ul class="dropdown-menu extended logout">
                <?php
                echo CHtml::link('
                <i class="fa fa-power-off"></i>
                <span> Salir</span>',
                    array('/site/logout'));
                ?>


            </ul>
        </li>
        <!-- user login dropdown end -->

    </ul>

    <script>
        $(document).ready(function () {
            $('.dropdown-toggle').dropdown();
        });
    </script>
    <!--search & user info end-->

<?php } ?>
</div>

