<?php

namespace App\Http\Middleware;

use App\Models\MongoDB\Rol;
use Closure;
use Auth;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, ...$roles)
    {

        //inicio el la variable en null
        $rolID = null;
        $rol='';
        $redirect = '/login';
        //obtengo los datos del usuario en la sesion
        $user = Auth::user();

        //verifico si el usuario contiene rol_id
        if(empty($user->Rol_id)){
            $rolID = null;
            $rol = 'cliente';
            $redirect = '/';
        }

        foreach($roles as $role) {

            //verificamos si el usuario tiene el rol asignado
            if($rol == $role)
                return $next($request);
        }

        return redirect($redirect);
    }
}
