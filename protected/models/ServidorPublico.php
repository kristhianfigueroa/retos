<?php

/**
 * This is the model class for table "servidor_publico".
 *
 * The followings are the available columns in table 'servidor_publico':
 * @property string $id_servidor_publico
 * @property string $nombre
 * @property string $apellido_paterno
 * @property string $apellido_materno
 * @property string $id_cat_dependencia
 * @property string $id_cat_area_dependencia
 * @property string $linkedin
 * @property string $email
 * @property string $usuario
 * @property string $contrasenia
 * @property string $telefono
 * @property string $foto
 * @property string $id_jefe_directo
 * @property string $persona_creacion
 * @property string $fecha_creacion
 * @property string $persona_modificacion
 * @property string $fecha_modificacion
 * @property integer $activo
 * @property string $id_cat_nivel_acceso
 * @property string $breve_descripcion
 *
 * The followings are the available model relations:
 * @property CursoDisponibleServidorPublico[] $cursoDisponibleServidorPublicos
 * @property CursosDeseados[] $cursosDeseadoses
 * @property FormacionAcademica[] $formacionAcademicas
 * @property CatAreaDependencia $idCatAreaDependencia
 * @property CatDependencia $idCatDependencia
 * @property CatNivelAcceso $idCatNivelAcceso
 * @property ServidorPublico $idJefeDirecto
 * @property ServidorPublico[] $servidorPublicos
 * @property ServidorPublicoCatPuesto[] $servidorPublicoCatPuestos
 * @property TrayectoriaLaboral[] $trayectoriaLaborals
 * @property Objetivos[] $objetivos
 */
class ServidorPublico extends CActiveRecord
{


    /**
     * Returns the static model of the specified AR class.
     * @param string $className active record class name.
     * @return ServidorPublico the static model class
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
        return 'servidor_publico';
    }

    /**
     * @return Validaciones de modelo
     */
    public function rules()
    {
        // NOTE: you should only define rules for those attributes that
        // will receive user inputs.
        return array(
            array('nombre, apellido_paterno,apellido_materno, id_cat_dependencia,linkedin, id_cat_area_dependencia,email, id_jefe_directo, id_cat_nivel_acceso,breve_descripcion', 'required', 'message' => '{attribute} es requerido!'),
            array('activo', 'numerical', 'integerOnly' => true),
            array('usuario', 'unique'),
            array('nombre, apellido_paterno, apellido_materno,usuario, contrasenia, telefono', 'length', 'max' => 200),
            array('id_cat_dependencia, id_cat_area_dependencia, id_jefe_directo, id_cat_nivel_acceso', 'length', 'max' => 19),
            array('linkedin', 'length', 'max' => 500),
            array('breve_descripcion', 'length', 'max' => 1000),
            array('persona_creacion, persona_modificacion', 'length', 'max' => 20),
            array('fecha_creacion, fecha_modificacion', 'safe'),
            array('foto', 'file', 'types' => 'jpg, png', 'allowEmpty' => true, 'on' => 'update'),
            array('email', 'email'),
            array('linkedin', 'url'),
            // The following rule is used by search().
            // Please remove those attributes that should not be searched.
            array('id_servidor_publico, nombre, apellido_paterno, apellido_materno, id_cat_dependencia, id_cat_area_dependencia, linkedin, email, usuario, contrasenia, telefono, foto, id_jefe_directo, persona_creacion, fecha_creacion, persona_modificacion, fecha_modificacion, activo, id_cat_nivel_acceso\n', 'safe', 'on' => 'search'),
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
            'cursoDisponibleServidorPublicos' => array(self::HAS_MANY, 'CursoDisponibleServidorPublico', 'id_servidor_publico'),
            'cursosDeseadoses' => array(self::HAS_MANY, 'CursosDeseados', 'id_servidor_publico'),
            'formacionAcademicas' => array(self::HAS_MANY, 'FormacionAcademica', 'id_servidor_publico'),
            'idCatAreaDependencia' => array(self::BELONGS_TO, 'CatAreaDependencia', 'id_cat_area_dependencia'),
            'idCatDependencia' => array(self::BELONGS_TO, 'CatDependencia', 'id_cat_dependencia'),
            'idCatNivelAcceso' => array(self::BELONGS_TO, 'CatNivelAcceso', 'id_cat_nivel_acceso'),
            'idJefeDirecto' => array(self::BELONGS_TO, 'ServidorPublico', 'id_jefe_directo'),
            'servidorPublicos' => array(self::HAS_MANY, 'ServidorPublico', 'id_jefe_directo'),
            'servidorPublicoCatPuestos' => array(self::HAS_MANY, 'ServidorPublicoCatPuesto', 'id_servidor_publico'),
            'trayectoriaLaborals' => array(self::HAS_MANY, 'TrayectoriaLaboral', 'id_servidor_publico'),
            'objetivos' => array(self::HAS_MANY, 'Objetivo', 'id_servidor_publico'),
        );
    }

    function __toString()
    {
        return $this->usuario;
    }

    function getPuestoActual()
    {

        $criteria = new CDbCriteria();
        $criteria->condition = "id_servidor_publico = $this->id_servidor_publico AND fecha_fin IS NULL ";
        $puestoActual = ServidorPublicoCatPuesto::model()->find($criteria);


        if ($puestoActual != null)
            return $puestoActual->idCatPuesto->cat_puesto;
        else

            return 'No se ha actualizado esta información';


    }

    function getFormacionAcademica()
    {

        return $this->formacionAcademicas;


    }

    /**
     * Regresa los cursos tomados, o que está tomando actualmente el Servidor Público.
     * @return CursoDisponibleServidorPublico[]
     */

    function getCursosTomados()
    {

        return $this->cursoDisponibleServidorPublicos;


    }

    function getTrayectoriaLaboral()
    {

        return $this->trayectoriaLaborals;


    }

    /**
     * @return string Regresa el String con el nombre completo del Servidor Público
     */

    function getNombreCompleto()
    {
        return $this->nombre . ' ' . $this->apellido_paterno . ' ' . $this->apellido_materno;;
    }


    /**
     * @return string Regresa un String con el nombre de la dependencia a la cual es asignado el servidor público,
     * o en su defecto muestra un mensaje de error
     */

    function getDependencia()
    {
        if ($this->idCatDependencia != null)
            return $this->idCatDependencia->cat_dependencia;
        else
            return 'No se ha actualizado esta información';

    }



    public function  getCursosDeseados(){

        return $this->cursosDeseadoses == null ? array(new CursosDeseados()) : $this->cursosDeseadoses ;


    }

    public function getObjetivos(){

    return $this->objetivos == null ? array(new Objetivo()) : $this->objetivos ;
    }


    public function getAreaDependencia()
    {
        if ($this->idCatAreaDependencia != null)
            return $this->idCatAreaDependencia->cat_area_dependencia;
        else
            return 'No se ha actualizado esta información';
    }

    /**
     * @return array customized attribute labels (name=>label)
     */
    public function attributeLabels()
    {
        return array(
            'id_servidor_publico' => 'Servidor Publico',
            'nombre' => 'Nombre',
            'apellido_paterno' => 'Apellido Paterno',
            'apellido_materno' => 'Apellido Materno',
            'id_cat_dependencia' => 'Dependencia',
            'id_cat_area_dependencia' => 'Area de la Dependencia',
            'linkedin' => 'Perfil de Linkedin',
            'email' => 'Email',
            'usuario' => 'Usuario',
            'contrasenia' => 'Contraseña',
            'telefono' => 'Teléfono',
            'foto' => 'Foto',
            'id_jefe_directo' => 'Jefe Directo',
            'persona_creacion' => 'Persona Creacion',
            'fecha_creacion' => 'Fecha Creacion',
            'persona_modificacion' => 'Persona Modificacion',
            'fecha_modificacion' => 'Fecha Modificacion',
            'activo' => 'Activo',
            'id_cat_nivel_acceso' => 'Nivel de Acceso',
            'breve_descripcion' => 'Descripción de funciones',
        );
    }

    /**
     * @return array para Combobox
     */
    public function comboBox($id_servidor_publico = 0)
    {

        if ($id_servidor_publico == null) {
            $id_servidor_publico = 0;
        }
        $criteria = new CDbCriteria;

        $criteria->condition = 'activo = 1 AND id_jefe_directo <> ' . $id_servidor_publico;


        return CHtml::listData(ServidorPublico::model()->findAll($criteria),
            'id_servidor_publico',
            'nombre');
    }

    /**
     * Retrieves a list of models based on the current search/filter conditions.
     * @return CActiveDataProvider the data provider that can return the models based on the search/filter conditions.
     */
    public function search()
    {

        $criteria = new CDbCriteria();
        $criteria->compare('nombre', $this->nombre, true);
        $criteria->compare('apellido_paterno', $this->apellido_paterno, true);
        $criteria->compare('apellido_materno', $this->apellido_materno, true);
        $criteria->compare('id_cat_dependencia', $this->id_cat_dependencia);
        $criteria->compare('id_cat_area_dependencia', $this->id_cat_area_dependencia);
        $criteria->compare('linkedin', $this->linkedin, true);
        $criteria->compare('email', $this->email, true);
        $criteria->compare('usuario', $this->usuario, true);
        $criteria->compare('activo', 1);


        Yii::app()->session['ServidorPublicoCriteria'] = $criteria;


        return new CActiveDataProvider($this, array(
                'criteria' => $criteria,
                'pagination' => array(
                    'pageSize' => 20),
            )
        );
    }

}
