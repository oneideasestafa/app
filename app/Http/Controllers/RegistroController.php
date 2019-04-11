<?php

namespace App\Http\Controllers;

//controlador encargado del registro de usuario

use App\Http\Requests\ValidateRegistro;
use App\Models\MongoDB\Cliente;
use App\Models\MongoDB\Clubs;
use MongoDB\BSON\ObjectId;
use Illuminate\Http\Request;

class RegistroController extends Controller
{

    //metodo que crea la vista
    public function index(){
        //devuelve la vista asociada
        return view('registro');
    }

    //metodo para registrar cliente
    public function ajaxPostRegistro(ValidateRegistro $request){

        $input = $request->all();

        //capturo los datos y los acomodo en un arreglo
        $data = [
            'nombre'              => $input['nombre'],
            'apellido'            => $input['apellido'],
            'correo'              => strtolower($input['correo']),
            'from'                => 'ONE',
            'password'            => bcrypt($input['password']),
            'pais'                => new ObjectId($input['pais']),
            'borrado'             => false,
            'activo'              => true,
            'fotoproducto'        => true,
            'promociones'         => false,
            'descuentos'          => false,
            'cupones'             => false,
            'mail'                => true,
            'app'                 => false
        ];

        //procedo a guardarlos en la bd
        $registro = new Cliente;
        $registro->Nombre              = $data['nombre'];
        $registro->Apellido            = $data['apellido'];
        $registro->Correo              = $data['correo'];
        $registro->Password            = $data['password'];
        $registro->TipoCuenta          = $data['from'];
        $registro->ProviderID          = '';
        $registro->Pais_id             = $data['pais'];
        $registro->Telefono            = '';
        $registro->Vehiculo            = '';
        $registro->Direccion           = '';
        $registro->Borrado             = $data['borrado'];
        $registro->Activo              = $data['activo'];
        $registro->MostrarFotoProducto = $data['fotoproducto'];
        $registro->NotificacionPromociones          = $data['promociones'];
        $registro->NotificacionDescuentos           = $data['descuentos'];
        $registro->NotificacionCupones              = $data['cupones'];
        $registro->NotificacionMailPedidos          = $data['mail'];
        $registro->NotificacionAppPedidos           = $data['app'];

        //verifico si fue exitoso el insert en la bd
        if($registro->save()){
            return response()->json(['code' => 200, 'msj' => 'Registrado exitosamente']);
        }else{
           return response()->json(['code' => 500, 'msj' => 'Error al registrar. Consulte al administrador']);
        }

    }
        //metodo para registrar cliente con clubs
    public function ajaxPostClubs(Request $request){

        $input = $request->all();

        //capturo los datos y los acomodo en un arreglo
        $data = [
            'idpais'              => $input['pais']
        ];

        $registro = Clubs::where('Pais',new ObjectId($data['idpais']) )->get();


        //verifico si fue exitoso el insert en la bd
        if($registro){
            return response()->json(['code' => 200, 'msj' => 'Registrado exitosamente','datos'=>$registro]);
        }else{
           return response()->json(['code' => 500, 'msj' => 'Error al registrar. Consulte al administrador']);
        }

    }

}