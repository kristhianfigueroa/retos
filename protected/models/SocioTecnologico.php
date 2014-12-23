<?php
/**
 * This is the model class for table "socio_tecnologico".
 *
 * The followings are the available columns in table 'socio_tecnologico':
 * @property string $id_socio_tecnologico
 * @property string $nombre
 * @property string $razon_social
 * @property string $telefono
 * @property string $email
 * @property string $direccion
 * @property string $usuario
 * @property string $contrasenia
 * @property string $persona_creacion
 * @property string $fecha_creacion
 * @property string $persona_modificacion
 * @property string $fecha_modificacion
 * @property integer $activo
 * @property string $token
 *
 * The followings are the available model relations:
 * @property CursoDisponible[] $cursoDisponibles
 */
class SocioTecnologico extends CActiveRecord
{
    public $updateType;

    /**
     * Returns the static model of the specified AR class.
     * @param string $className active record class name.
     * @return SocioTecnologico the static model class
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
        return 'socio_tecnologico';
    }

    /**
     * @return Validaciones de modelo
     */
    public function rules()
    {
        // NOTE: you should only define rules for those attributes that
        // will receive user inputs.
        return array(
            array('activo', 'numerical', 'integerOnly' => true),
            array('nombre, razon_social, telefono, email, token,direccion, usuario, contrasenia', 'length', 'max' => 200),
            array('persona_creacion, persona_modificacion', 'length', 'max' => 20),
            array('fecha_creacion, fecha_modificacion', 'safe'),

            // The following rule is used by search().
            // Please remove those attributes that should not be searched.
            array('id_socio_tecnologico, nombre, razon_social, telefono, email, direccion, usuario, contrasenia, persona_creacion, fecha_creacion, persona_modificacion, fecha_modificacion, activo\n', 'safe', 'on' => 'search'),
        );
    }

    /**
     * @return array relational rules.
     */
    public function relations()
    {
        // NOTE: you may need to adjust the relation name and the related
        // class name for the relations automatically generated below.
        return array(
            'cursoDisponibles' => array(self::HAS_MANY, 'CursoDisponible', 'id_socio_tecnologico'),
        );
    }

    /**
     * @return array customized attribute labels (name=>label)
     */
    public function attributeLabels()
    {
        return array(
            'id_socio_tecnologico' => 'Socio Tecnológico',
            'nombre' => 'Nombre',
            'razon_social' => 'Razón Social',
            'telefono' => 'Teléfono',
            'email' => 'Email',
            'direccion' => 'Dirección',
            'usuario' => 'Usuario',
            'contrasenia' => 'Contraseña',
            'persona_creacion' => 'Persona Creacion',
            'fecha_creacion' => 'Fecha Creacion',
            'persona_modificacion' => 'Persona Modificacion',
            'fecha_modificacion' => 'Fecha Modificacion',
            'activo' => 'Activo',
        );
    }

    /**
     * @return array para Combobox
     */
    public function comboBox()
    {


        return CHtml::listData(SocioTecnologico::model()->findAll(),
            'id_socio_tecnologico', 'socio_tecnologico');

    }

    /**
     * Retrieves a list of models based on the current search/filter conditions.
     * @return CActiveDataProvider the data provider that can return the models based on the search/filter conditions.
     */

    public function search()
    {

        $criteria = new CDbCriteria();
        $criteria->compare('nombre', $this->nombre, true);
        $criteria->compare('razon_social', $this->razon_social, true);
        $criteria->compare('telefono', $this->telefono, true);
        $criteria->compare('email', $this->email, true);
        $criteria->compare('direccion', $this->direccion, true);
        $criteria->compare('usuario', $this->usuario, true);


        $criteria->compare('activo', 1);
        Yii::app()->session['SocioTecnologicoCriteria'] = $criteria;


        return new CActiveDataProvider($this, array(
                'criteria' => $criteria,
                'pagination' => array(
                    'pageSize' => 20),
            )
        );

    }
}