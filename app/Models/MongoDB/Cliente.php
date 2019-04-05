<?php

namespace App\Models\MongoDB;

use Illuminate\Auth\Authenticatable;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Jenssegers\Mongodb\Eloquent\Model;

class Cliente extends Model implements AuthenticatableContract, AuthorizableContract, CanResetPasswordContract
{

    use Authenticatable, Authorizable, CanResetPassword;

    protected $connection = 'mongodb';
    protected $table = 'Clientes';

    const CREATED_AT = 'Creado';
    const UPDATED_AT = 'Actualizado';

    protected $hidden = [
        'Password', 'RememberToken', 'FacebookID', 'GoogleID'
    ];

    //renombro el campo de remember token
    public function getRememberTokenName(){
        return 'RememberToken';
    }

    //scope para buscar por borrado
    public function scopeBorrado($query, $flag) {
        return $query->where('Borrado', $flag);
    }

    //scope para buscar por activo
    public function scopeActivo($query, $flag) {
        return $query->where('Activo', $flag);
    }

    //scope para buscar por tipo de cuenta
    public function scopeCuenta($query, $flag) {
        return $query->where('TipoCuenta', $flag);
    }

}
