<?php
/* @var $this SiteController */
/* @var $error array */

$this->pageTitle = Yii::app()->name . ' - Error';
$this->breadcrumbs = array(
    'Error',
);
?>


<div class="error-head"></div>
<div class="container" style="width: 100%;">
    <section class="error-wrapper text-center">
        <h1><img src="img/404.png" alt=""></h1>

        <div class="error-desk">
            <h2>Error <?php echo $code; ?></h2>

            <p class="nrml-txt">   <?php echo CHtml::encode($message); ?></p>
        </div>
        <a href="index.php" class="back-btn"><i class="fa fa-home"></i> ir al índice</a>
    </section>

</div>
