<?php
/**
 * This is the model class for table "cat_nivel_acceso".
 *
 * The followings are the available columns in table 'cat_nivel_acceso':
 * @property string $id_cat_nivel_acceso
 * @property string $cat_nivel_acceso
 * @property string $persona_creacion
 * @property string $fecha_creacion
 * @property string $persona_modificacion
 * @property string $fecha_modificacion
 * @property integer $activo
 *
 * The followings are the available model relations:
 * @property ServidorPublico[] $servidorPublicos
 */
class CatNivelAcceso extends CActiveRecord
{

    const ADMIN = 1;
    const FUNCIONARIO = 2;


    /**
     * Returns the static model of the specified AR class.
     * @param string $className active record class name.
     * @return CatNivelAcceso the static model class
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
        return 'cat_nivel_acceso';
    }

    /**
     * @return Validaciones de modelo
     */
    public function rules()
    {
        // NOTE: you should only define rules for those attributes that
        // will receive user inputs.
        return array(
            array('cat_nivel_acceso', 'required'),
            array('activo', 'numerical', 'integerOnly' => true),
            array('cat_nivel_acceso', 'length', 'max' => 200),
            array('persona_creacion, persona_modificacion', 'length', 'max' => 20),
            array('fecha_creacion, fecha_modificacion', 'safe'),

            // The following rule is used by search().
            // Please remove those attributes that should not be searched.
            array('id_cat_nivel_acceso, cat_nivel_acceso, persona_creacion, fecha_creacion, persona_modificacion, fecha_modificacion, activo\n', 'safe', 'on' => 'search'),
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
            'servidorPublicos' => array(self::HAS_MANY, 'ServidorPublico', 'id_cat_nivel_acceso'),
        );
    }

    /**
     * @return array customized attribute labels (name=>label)
     */
    public function attributeLabels()
    {
        return array(
            'id_cat_nivel_acceso' => 'Cat Nivel Acceso',
            'cat_nivel_acceso' => 'Cat Nivel Acceso',
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


        return CHtml::listData(CatNivelAcceso::model()->findAll(),
            'id_cat_nivel_acceso', 'cat_nivel_acceso');

    }

    public function getAdmins(){

        $criteria = new CDbCriteria();
        $criteria->select = 'usuario';
        $criteria->addCondition('id_cat_nivel_acceso', CatNivelAcceso::ADMIN);

        return ServidorPublico::model()->findAll($criteria);


    }

    /**
     * Retrieves a list of models based on the current search/filter conditions.
     * @return CActiveDataProvider the data provider that can return the models based on the search/filter conditions.
     */

    public function search()
    {

        $criteria = new CDbCriteria();
        $criteria->compare('cat_nivel_acceso', $this->cat_nivel_acceso, true);

        $criteria->compare('activo', 1);
        Yii::app()->session['CatNivelAccesoCriteria'] = $criteria;


        return new CActiveDataProvider($this, array(
                'criteria' => $criteria,
                'pagination' => array(
                    'pageSize' => 20),
            )
        );

    }
}