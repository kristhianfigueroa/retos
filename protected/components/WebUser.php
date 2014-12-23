<?php

/**
 * Created by JetBrains PhpStorm.
 * Date: 28/08/13
 * Time: 17:56
 * To change this template use File | Settings | File Templates.
 */
class  WebUser extends CWebUser
{
    protected $_session = 'wu_default';

    public function getSession()
    {
        $session = Yii::app()->user->getState('session');
        return (null !== $session) ? $session : $this->_session;
    }

    public function setSession($value)
    {
        Yii::app()->user->setState('session', $value);
    }
}