<?php

namespace App\Http\Controllers;

//controlador encargado del registro de usuario

use App\Http\Requests\ValidateRegistro;
use App\Models\MongoDB\Cliente;
use App\Models\MongoDB\Clubs;
use MongoDB\BSON\ObjectId;
use Illuminate\Http\Request;
use Carbon\Carbon;

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

        $fnac = Carbon::parse($input['edad'])->format('d/m/Y');

        //capturo los datos y los acomodo en un arreglo
        $data = [
            'nombre'              => $input['nombre'],
            'apellido'            => $input['apellido'],
            'sexo'                => $input['sexo'],
            'edad'                => $fnac,
            'equipo'              => $input['equipo'],
            'telefono'            => $input['telefono'],
            'correo'              => strtolower($input['correo']),
            'from'                => 'ONE',
            'password'            => bcrypt($input['password']),
            'pais'                => new ObjectId($input['pais']),
            'borrado'             => false,
            'activo'              => true
        ];

        //procedo a guardarlos en la bd
        $registro = new Cliente;
        $registro->Nombre              = $data['nombre'];
        $registro->Apellido            = $data['apellido'];
        $registro->Sexo                = $data['sexo'];
        $registro->FechaNacimiento     = $data['edad'];
        $registro->Equipo              = $data['equipo'];
        $registro->Correo              = $data['correo'];
        $registro->Telefono            = $data['telefono'];
        $registro->Password            = $data['password'];
        $registro->TipoCuenta          = $data['from'];
        $registro->ProviderID          = '';
        $registro->Pais_id             = $data['pais'];
        $registro->Borrado             = $data['borrado'];
        $registro->Activo              = $data['activo'];

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
        $clubs = [];
        if($registro){

            foreach ($registro as $club) {
                $clubs[]=$club;
            }
            return response()->json(['code' => 200, 'msj' => 'Registrado exitosamente','datos'=>$clubs]);
        }else{
           return response()->json(['code' => 500, 'msj' => 'Error al registrar. Consulte al administrador']);
        }

    }

}
