<?php

namespace App\Models\MongoDB;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Envio extends Eloquent
{
  protected $connection = 'mongodb';
  protected $table = 'Envios';

  const CREATED_AT = 'Creado';
  const UPDATED_AT = 'Actualizado';

  protected $fillable = ['Evento', 'Tipo', 'Estado', 'Inicio', 'Fin', 'Parametro'];
}
