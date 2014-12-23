<?php

// uncomment the following to define a path alias
// Yii::setPathOfAlias('local','path/to/local-folder');

// This is the main Web application configuration. Any writable
// CWebApplication properties can be configured here.
Yii::setPathOfAlias('bootstrap', dirname(__FILE__) . '/../extensions/bootstrap');


return array(
    'basePath' => dirname(__FILE__) . DIRECTORY_SEPARATOR . '..',
    'name' => 'Sistema Institucional de Capacitación para Funcionarios Públicos', //TODO Cambiar el nombre del proyecto
    'sourceLanguage' => 'en',
    'language' => 'es',
    'preload' => array('log'),

    // autoloading model and component classes
    'import' => array(
        'application.models.*',
        'application.components.*',
        'ext.gtc.components.*',
        'application.vendors.PHPExcel',
        'ext.dynamictabularform.*',
        'application.vendors.libchart.libchart.classes.libchart',
    ),
    'theme' => 'theme',

    'modules' => array(
        // uncomment the following to enable the Gii tool
        'admin',

//        'gii' => array(
//            'class' => 'system.gii.GiiModule',
//            'password' => 'gii',
//            'ipFilters' => array('127.0.0.1', '::1'),
//            'generatorPaths' => array(
//                'ext.template',
//                'bootstrap.gii',
//            ),
//        ), //TODO En produccion, se debe comentar.


    ),

    // application components

    'components' => array(

        'bootstrap' => array(
            'class' => 'bootstrap.components.Bootstrap',
        ),

        'user' => array(
            'allowAutoLogin' => true,
        ),
        'request' => array(
            'baseUrl' => '/retos',
        ),
        'utils' => array(
            'class' => 'application.components.Utils',
        ),


        'ePdf' => array(
            'class' => 'ext.yii-pdf.EYiiPdf',
            'params' => array(
                'mpdf' => array(
                    'librarySourcePath' => 'application.vendors.mpdf.*',
                    'constants' => array(
                        '_MPDF_TEMP_PATH' => Yii::getPathOfAlias('application.runtime'),
                    ),
                    'class' => 'mpdf', // the literal class filename to be loaded from the vendors folder
                ),
                'HTML2PDF' => array(
                    'librarySourcePath' => 'application.vendors.html2pdf.*',
                    'classFile' => 'html2pdf.class.php', // For adding to Yii::$classMap
                )
            ),
        ),


        // uncomment the following to use a MySQL database
//BJTxfx2KP9WGR59N
        'db'=>array(
            'connectionString' => 'mysql:host=localhost;port=3306;dbname=retos',
            'emulatePrepare' => true,
            'username' => 'root',
            'password' => '',
            'charset' => 'utf8'
        ),

        'errorHandler' => array(
            'errorAction' => 'site/error',
        ),
        'log' => array(
            'class' => 'CLogRouter',
            'routes' => array(
                array(
                    'class' => 'CFileLogRoute',
                    'levels' => 'error, warning',
                ),
            ),
        ),
    ),
    'params' => array(
        // this is used in contact page
        'adminEmail' => 'webmaster@example.com', //TODO email de notificaciones
        'adminPass' => 'webmaster@example.com', //TODO email de notificaciones
    ),
);