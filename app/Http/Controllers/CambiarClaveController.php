<?php

namespace App\Http\Controllers;
use App\Http\Requests\ValidateCambiarPassword;
use App\Models\MongoDB\Cliente;
use Illuminate\Support\Facades\Auth;
use Hash;

//controlador encargado de la vista de cambiar contraseña
class CambiarClaveController extends Controller
{

    //metodo para llamar la vista de perfil
    public function index(){

        //devuleve la vista
        return view('cambiar-clave');
    }

    public function ajaxPostCambiarClave(ValidateCambiarPassword $request){

        $input = $request->all();

        //capturo los datos y los acomodo en un arreglo
        $data = [
            'old'  => $input['oldpassword'],
            'new'  => $input['newpassword']
        ];

        //ubico el password actual del usuario
        $user = Cliente::find(Auth::user()->_id);

        //verifico que conicida con el ingresado, sino mando un error
        if(Hash::check($data['old'], $user->Password)){

            //guardo el nuevo password en la bd
            $user->Password = Hash::make($data['new']);

            //verifico que fue guardado
            if($user->save()){
                return response()->json(['code' => 200, 'msj' => 'Clave cambiada exitosamente']);
            }else{
                return response()->json(['code' => 500, 'msj' => 'Ocurrio un problema al cambiar la clave']);
            }

        }else{
            return response()->json(['code' => 600, 'msj' => 'Clave actual incorrecta']);
        }

    }


}