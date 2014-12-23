<?php
/**
 * This is the model class for table "tipo_estudio".
 *
 * The followings are the available columns in table 'tipo_estudio':
 * @property string $id_tipo_estudio
 * @property string $tipo_estudio
 *
 * The followings are the available model relations:
 * @property FormacionAcademica[] $formacionAcademicas
 */
class TipoEstudio extends CActiveRecord
{
    /**
     * Returns the static model of the specified AR class.
     * @param string $className active record class name.
     * @return TipoEstudio the static model class
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
        return 'tipo_estudio';
    }

    /**
     * @return Validaciones de modelo
     */
    public function rules()
    {
        // NOTE: you should only define rules for those attributes that
        // will receive user inputs.
        return array(
            array('tipo_estudio', 'required'),
            array('tipo_estudio', 'length', 'max' => 200),

            // The following rule is used by search().
            // Please remove those attributes that should not be searched.
            array('id_tipo_estudio, tipo_estudio\n', 'safe', 'on' => 'search'),
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
            'formacionAcademicas' => array(self::HAS_MANY, 'FormacionAcademica', 'id_tipo_estudio'),
        );
    }

    /**
     * @return array customized attribute labels (name=>label)
     */
    public function attributeLabels()
    {
        return array(
            'id_tipo_estudio' => 'Tipo Estudio',
            'tipo_estudio' => 'Tipo Estudio',
        );
    }

    /**
     * @return array para Combobox
     */
    public function comboBox()
    {


        return CHtml::listData(TipoEstudio::model()->findAll(),
            'id_tipo_estudio', 'tipo_estudio');

    }

    /**
     * Retrieves a list of models based on the current search/filter conditions.
     * @return CActiveDataProvider the data provider that can return the models based on the search/filter conditions.
     */

    public function search()
    {

        $criteria = new CDbCriteria();
        $criteria->compare('tipo_estudio', $this->tipo_estudio, true);

        $criteria->compare('activo', 1);
        Yii::app()->session['TipoEstudioCriteria'] = $criteria;


        return new CActiveDataProvider($this, array(
                'criteria' => $criteria,
                'pagination' => array(
                    'pageSize' => 20),
            )
        );

    }
}