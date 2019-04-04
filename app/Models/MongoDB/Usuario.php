<?php

namespace App\Models\MongoDB;

use Illuminate\Auth\Authenticatable;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Jenssegers\Mongodb\Eloquent\Model;

class Usuario extends Model implements AuthenticatableContract, AuthorizableContract, CanResetPasswordContract {

    use Authenticatable, Authorizable, CanResetPassword;

    protected $connection = 'mongodb';
    protected $table = 'Usuarios';

    const CREATED_AT = 'Creado';
    const UPDATED_AT = 'Actualizado';

    protected $hidden = [
        'Password', 'RememberToken',
    ];

    //renombro el campo de remember token
    public function getRememberTokenName(){
        return 'RememberToken';
    }

    //muestro el nombre del rol
    public function nameRol(){
        return formatTextFirstCharacterToUpper(Rol::find($this->Rol_id)->Nombre);
    }

    //verifica si tiene permisos para acceder a los modulos del aplicativo
    public function hasPermission($ruta, $valor = null){

        $permisos = Rol::find($this->Rol_id)->Permisos;

        if(isset($permisos)){

            $result = getValueThroughKeyFromArray($ruta, $permisos);

            if($result !== false){

                if(gettype($result) === 'array'){

                    if($valor !== NULL){
                        return isInTheList($result, $valor);
                    }
                }

                return true;
            }
        }

        return false;

    }

    //verifica si realizo el cambio de password
    public function isChangePassword(){
        return $this->CambioPassword;
    }

    //scope para buscar por borrado
    public function scopeBorrado($query, $flag) {
        return $query->where('Borrado', $flag);
    }

    //scope para buscar por activo
    public function scopeActivo($query, $flag) {
        return $query->where('Activo', $flag);
    }

}
