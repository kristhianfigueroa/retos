<?php
/**
 * This is the model class for table "cat_comprobante".
 *
 * The followings are the available columns in table 'cat_comprobante':
 * @property string $id_cat_comprobante
 * @property string $cat_comprobante
 *
 * The followings are the available model relations:
 * @property CursoDisponible[] $cursoDisponibles
 */
class CatComprobante extends CActiveRecord
{
    /**
     * Returns the static model of the specified AR class.
     * @param string $className active record class name.
     * @return CatComprobante the static model class
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
        return 'cat_comprobante';
    }

    /**
     * @return Validaciones de modelo
     */
    public function rules()
    {
        // NOTE: you should only define rules for those attributes that
        // will receive user inputs.
        return array(
            array('cat_comprobante', 'required'),
            array('cat_comprobante', 'length', 'max' => 200),

            // The following rule is used by search().
            // Please remove those attributes that should not be searched.
            array('id_cat_comprobante, cat_comprobante\n', 'safe', 'on' => 'search'),
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
            'cursoDisponibles' => array(self::HAS_MANY, 'CursoDisponible', 'id_cat_comprobante'),
        );
    }

    /**
     * @return array customized attribute labels (name=>label)
     */
    public function attributeLabels()
    {
        return array(
            'id_cat_comprobante' => 'Cat Comprobante',
            'cat_comprobante' => 'Cat Comprobante',
        );
    }

    /**
     * @return array para Combobox
     */
    public function comboBox()
    {


        return CHtml::listData(CatComprobante::model()->findAll(),
            'id_cat_comprobante', 'cat_comprobante');

    }

    /**
     * Retrieves a list of models based on the current search/filter conditions.
     * @return CActiveDataProvider the data provider that can return the models based on the search/filter conditions.
     */

    public function search()
    {

        $criteria = new CDbCriteria();
        $criteria->compare('cat_comprobante', $this->cat_comprobante, true);

        $criteria->compare('activo', 1);
        Yii::app()->session['CatComprobanteCriteria'] = $criteria;


        return new CActiveDataProvider($this, array(
                'criteria' => $criteria,
                'pagination' => array(
                    'pageSize' => 20),
            )
        );

    }
}