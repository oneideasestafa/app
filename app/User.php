<?php

namespace App;

use Laravel\Passport\HasApiTokens;
use Illuminate\Support\Facades\Hash;
use Jenssegers\Mongodb\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use DesignMyNight\Mongodb\Auth\User as Authenticatable;

class User extends Authenticatable
{
  use HasApiTokens, SoftDeletes, Notifiable;

  /**
   * The collection name in the database
   * 
   * @var string
   */
  protected $collection = 'Clientes';

  /**
   * The primary key associated with the table.
   *
   * @var string
   */
  protected $primaryKey = '_id';

  /**
   * Indicates if the IDs are auto-incrementing.
   *
   * @var bool
   */
  public $incrementing = false;

  /**
   * The "type" of the auto-incrementing ID.
   *
   * @var string
   */
  protected $keyType = 'string';

  const CREATED_AT = 'creado';
  
  const UPDATED_AT = 'actualizado';
  
  const DELETED_AT = 'borrado';

  /**
   * The model's default values for attributes.
   *
   * @var array
   */
  protected $attributes = [
    'activo' => true,
  ];
}
