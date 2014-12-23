<?php
function menu($pagina)
{
    $index = '';
    $create = '';

    switch ($pagina) {

        case '':
        {
            $index = 'active';
            break;
        }
        case 'index':
        {
            $index = 'active';
            break;
        }
        case 'create':
        {
            $create = 'active';
            break;
        }
        default:
            {
            $index = 'active';
            break;
            }
    }

    return array(
        array('label' => 'Agregar Servidor Publico',
            'url' => array('create'), 'itemOptions' => array('class' => $create)),

        array('label' => 'Lista de Servidor Publico',
            'url' => array('index'), 'itemOptions' => array('class' => $index))
    );
}


