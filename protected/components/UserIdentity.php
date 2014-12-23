<?php

/**
 * UserIdentity represents the data needed to identity a user.
 * It contains the authentication method that checks if the provided
 * data can identity the user.
 */
class UserIdentity extends CUserIdentity
{

    /**
     * Authenticates a user.
     * The example implementation makes sure if the username and password
     * are both 'demo'.
     * In practical applications, this should be changed to authenticate
     * against some persistent user identity storage (e.g. database).
     * @return boolean whether authentication succeeds.
     */
    public $id;
    public $idPuesto;

    public function authenticate()
    {

        $record = ServidorPublico::model()->findByAttributes(array('usuario' => $this->username, 'activo' => 1));
        $this->errorCode = self::ERROR_NONE;

        if ($record === null) {
            $this->errorCode = self::ERROR_USERNAME_INVALID;
            return;
        }

        if ($record->contrasenia !== md5($this->password)) {
            $this->errorCode = self::ERROR_PASSWORD_INVALID;
            return;

        }
        $this->id = $record->id_servidor_publico;
        Yii::app()->session['tipo_loogin'] = $record->id_cat_nivel_acceso;


        return !$this->errorCode;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getIdPuesto()
    {
        return $this->idPuesto;
    }

}
