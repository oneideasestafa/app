<?php

namespace App\Models\MongoDB;
use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Cliente extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection = 'Clientes';

    const CREATED_AT = 'Creado';
    const UPDATED_AT = 'Actualizado';

    //scope para buscar por borrado
    public function scopeBorrado($query, $flag) {
        return $query->where('Borrado', $flag);
    }

    //scope para buscar por activo
    public function scopeActivo($query, $flag) {
        return $query->where('Activo', $flag);
    }
    protected $fillable = [
        'Nombre', 'Apellido','FechaNacimiento'
    ];

}
