<?php
$baseUrl = Yii::app()->request->baseUrl;
$pageTitle = $this->pageTitle = Yii::app()->name;

?>



<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="AppFactory">
    <link rel="shortcut icon" href="img/logo_moodprint.png">
    <title><?php echo $pageTitle ?></title>


    <?php

    //<link rel="stylesheet" href="js/data-tables/DT_bootstrap.css" />


    $cs = Yii::app()->getClientScript();
    $cs->registerCssFile($baseUrl . '/css/panel.min.css');
    $cs->registerCssFile($baseUrl . '/css/miEstilo.css');


    $cs->registerCssFile($baseUrl . '/js/data-tables/DT_bootstrap.css');
    //$cs->registerCssFile($baseUrl . '/css/jquery-ui-1.10.4.custom.min.css');
    $cs->registerCssFile($baseUrl . '/css/bootstrap-reset.css');
    $cs->registerCssFile($baseUrl . '/css/font-awesome/css/font-awesome.css');
    $cs->registerCssFile($baseUrl . '/css/cliente.css');
    $cs->registerCssFile($baseUrl . '/css/bs3/css/bootstrap.min.css');


    ?>
    <!--Core CSS -->
    <link href="js/jvector-map/jquery-jvectormap-1.2.2.css" rel="stylesheet">
    <link href="css/clndr.css" rel="stylesheet">
    <!--clock css-->


    <link href="js/css3clock/css/style.css" rel="stylesheet">
    <!--Morris Chart CSS -->
    <link rel="stylesheet" href="js/morris-chart/morris.css">
    <!-- Custom styles for this template -->
    <link href="css/style.css" rel="stylesheet">
    <link href="css/style-responsive.css" rel="stylesheet"/>
    <!-- Just for debugging purposes. Don't actually copy this line! -->
    <!--[if lt IE 9]>
    <script src="js/ie8-responsive-file-warning.js"></script><![endif]-->
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
</head>

<body>

<section id="container">
    <!--header start-->
    <header class="header fixed-top clearfix">
        <?php require_once('tpl_navigation.php') ?>

    </header>


    <!--header end-->
    <aside>
        <?php require_once('menu_izquierdo.php') ?>

    </aside>

    <!--sidebar end-->

    <!--main content start-->
    <section id="main-content">
        <section class="wrapper">
            <!-- page start-->
            <div class="row">
                <div class="col-sm-12">
                    <section class="panel">

                        <?php echo $content; ?>

                    </section>

                </div>

                <?php require_once('tpl_footer.php') ?>
            </div>
            <!-- page end-->
        </section>
    </section>
    <!--main content end-->

</section>

<!-- Placed js at the end of the document so the pages load faster -->

<!--Core js-->



<?php

$cs->registerScriptFile($baseUrl . '/js/jquery.js');

$cs->registerScriptFile($baseUrl . '/js/bootstrap.min.js');
$cs->registerScriptFile($baseUrl . '/js/jquery.ba-bbq.js');
$cs->registerScriptFile($baseUrl . '/css/bs3/js/bootstrap.min.js');
// http://localhost/moodprint/bs3/js/bootstrap.min.js"


?>


<script src="js/bootstrap.min.js"></script>
<script class="include" type="text/javascript" src="js/jquery.dcjqaccordion.2.7.js"></script>
<script src="js/jquery.scrollTo.min.js"></script>
<script src="js/jQuery-slimScroll-1.3.0/jquery.slimscroll.js"></script>
<script src="js/jquery.nicescroll.js"></script>
<!--Easy Pie Chart-->
<script src="js/easypiechart/jquery.easypiechart.js"></script>
<!--Sparkline Chart-->
<script src="js/sparkline/jquery.sparkline.js"></script>

<script src="js/bootstrap-inputmask/bootstrap-inputmask.min.js"></script>
<!--
<!--jQuery Flot Chart
<script src="js/flot-chart/jquery.flot.js"></script>
<script src="js/flot-chart/jquery.flot.tooltip.min.js"></script>
<script src="js/flot-chart/jquery.flot.resize.js"></script>
<script src="js/flot-chart/jquery.flot.pie.resize.js"></script>


-->


<!--common script init for all pages-->
<script src="js/scripts.js"></script>

</body>
</html>


