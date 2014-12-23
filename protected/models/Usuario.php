<?php
/**
 * This is the model class for table "usuario".
 *
 * The followings are the available columns in table 'usuario':
 * @property integer $id_usuario
 * @property string $usuario
 * @property string $contrasenia
 * @property string $nombre
 * @property string $apellidos
 * @property string $telefono
 * @property string $celular
 * @property string $email
 * @property integer $activo
 * @property string $fecha_creacion
 * @property integer $persona_creacion
 * @property string $fecha_modificacion
 * @property integer $persona_modificacion
 */
class Usuario extends CActiveRecord
{
    /**
     * Returns the static model of the specified AR class.
     * @param string $className active record class name.
     * @return Usuario the static model class
     */
    public static function model($className = __CLASS__)
    {
        return parent::model($className);
    }

    /**
     * @return string the associated database table name
     */
    public function tableName()
    {
        return 'usuario';
    }

    /**
     * @return array validation rules for model attributes.
     */
    public function rules()
    {
// NOTE: you should only define rules for those attributes that
// will receive user inputs.
        return array(
            array('activo,usuario,contrasenia,nombre,email', 'required'),
            array('activo, persona_creacion, persona_modificacion', 'numerical', 'integerOnly' => true),
            array('usuario,email', 'unique'),
            array('usuario, telefono, celular, email', 'length', 'max' => 50),
            array('contrasenia', 'length', 'max' => 45),
            array('nombre, apellidos', 'length', 'max' => 100),
            array('fecha_creacion, fecha_modificacion', 'safe'),

// The following rule is used by search().
// Please remove those attributes that should not be searched.
            array('id_usuario, usuario, contrasenia, nombre, apellidos, telefono, celular, email, activo, fecha_creacion, persona_creacion, fecha_modificacion, persona_modificacion\n', 'safe', 'on' => 'search'),
        );
    }

    /**
     * @return array relational rules.
     */
    public function relations()
    {
// NOTE: you may need to adjust the relation name and the related
// class name for the relations automatically generated below.
        return array();
    }

    /**
     * @return array customized attribute labels (name=>label)
     */
    public function attributeLabels()
    {
        return array(
            'id_usuario' => 'Usuario',
            'usuario' => 'Usuario',
            'contrasenia' => 'Contraseña',
            'nombre' => 'Nombre',
            'apellidos' => 'Apellidos',
            'telefono' => 'Telefono',
            'celular' => 'Celular',
            'email' => 'Email',
            'activo' => 'Activo',
            'fecha_creacion' => 'Fecha Creacion',
            'persona_creacion' => 'Persona Creacion',
            'fecha_modificacion' => 'Fecha Modificacion',
            'persona_modificacion' => 'Persona Modificacion',
        );
    }

    /**
     * Retrieves a list of models based on the current search/filter conditions.
     * @return CActiveDataProvider the data provider that can return the models based on the search/filter conditions.
     */
    public function search()
    {
// Warning: Please modify the following code to remove attributes that
// should not be searched.

        $criteria = new CDbCriteria();
        $criteria->order = 'id_usuario desc ';
        $criteria->compare('usuario', $this->usuario, true);
        $criteria->compare('contrasenia', $this->contrasenia, true);
        $criteria->compare('nombre', $this->nombre, true);
        $criteria->compare('apellidos', $this->apellidos, true);
        $criteria->compare('telefono', $this->telefono, true);
        $criteria->compare('celular', $this->celular, true);
        $criteria->compare('email', $this->email, true);
        $criteria->compare('activo', 1);


        Yii::app()->session['UsuarioCriteria'] = $criteria;

        return new CActiveDataProvider($this, array(
                'criteria' => $criteria,
                'pagination' => array(
                    'pageSize' => 20),
            )
        );

    }
}