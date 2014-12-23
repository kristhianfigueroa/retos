<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="ThemeBucket">
    <link rel="shortcut icon" href="img/favicon.png">

    <title>Login</title>

    <!--Core CSS -->
    <link href="css/bs3/css/bootstrap.min.css" rel="stylesheet">
    <link href="css/bootstrap-reset.css" rel="stylesheet">
    <link href="css/font-awesome/css/font-awesome.css" rel="stylesheet"/>

    <!-- Custom styles for this template -->
    <link href="css/style-responsive.css" rel="stylesheet"/>
    <link href="css/cliente.css" rel="stylesheet"/>

    <!-- Just for debugging purposes. Don't actually copy this line! -->
    <!--[if lt IE 9]>
    <script src="js/ie8-responsive-file-warning.js"></script><![endif]-->

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->

    <link href="css/style.css" rel="stylesheet">

</head>

<body class="login-body">

<div class="container" >

<div class="row" style="margin-top: 4%">
    <div class="col-md-3 col-md-offset-1">

        <img src="img/logo.png" class="img-responsive" style="width: 100%">
    </div>

    <div class="col-md-2 col-md-offset-6">
        <img src="img/logoGobierno.png" class="img-responsive" style="width: 100%">
    </div>


</div>


    <?php $form = $this->beginWidget('CActiveForm', array(
        'id' => 'login-form',
        'enableClientValidation' => true,
        'htmlOptions' => array(
            'class' => 'form-signin'
        ),

        'clientOptions' => array(
            'validateOnSubmit' => true
        )
    )); ?>


    <h2 class="form-signin-heading login">
        BIENVENIDO
        <br>
        <br>
        Iniciar Sesión
    </h2>

    <div class="login-wrap">
        <div class="user-login-info">

            <?php


            echo $form->textField($model, 'username',
                array('autocomplete' => 'off', "class" => "form-control login-input", 'required' => true, 'autofocus' => true, 'placeholder' => 'Usuario'));
            echo $form->error($model, 'username');



            echo $form->passwordField($model, 'password',
                array('autocomplete' => 'off', "class" => "form-control", 'placeholder' => 'Contraseña'));
            echo $form->error($model, 'password');
            ?>


        </div>


        <button class="btn btn-lg btn-login btn-block
        btn-login" type="submit">

            INICIAR SESIÓN</button>

        

    </div>

    <!-- Modal -->
    <div aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" tabindex="-1" id="myModal" class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title">Forgot Password ?</h4>
                </div>
                <div class="modal-body">
                    <p>Enter your e-mail address below to reset your password.</p>
                    <input type="text" name="email" placeholder="Email" autocomplete="off"
                           class="form-control placeholder-no-fix">

                </div>
                <div class="modal-footer">
                    <button data-dismiss="modal" class="btn btn-default" type="button">Cancel</button>
                    <button class="btn btn-success" type="button">Submit</button>
                </div>
            </div>
        </div>
    </div>
    <!-- modal -->
    <?php $this->endWidget(); ?>


</div>


<!-- Placed js at the end of the document so the pages load faster -->

<!--Core js-->
<script src="js/jquery.js"></script>
<script src="css/bs3/js/bootstrap.min.js"></script>

</body>
</html>
