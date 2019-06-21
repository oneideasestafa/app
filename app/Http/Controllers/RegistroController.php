<?php

namespace App\Http\Controllers;

//controlador encargado del registro de usuario

use App\Http\Requests\ValidateRegistro;
use App\Models\MongoDB\Cliente;
use App\Models\MongoDB\Clubs;
use App\Models\MongoDB\EstadoCivil;
use MongoDB\BSON\ObjectId;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Image, Storage, File;

class RegistroController extends Controller{

    //metodo que crea la vista
    public function index(){

        $data['civiles'] = EstadoCivil::borrado(false)->activo(true)->orderBy('Nombre', 'asc')->get();

        //devuelve la vista asociada
        return view('registro', $data);
    }

    //Retorna la lista de estados civiles
    public function estado_civil(){

        $estado_civil = EstadoCivil::borrado(false)->activo(true)->orderBy('Nombre', 'asc')->get();
        
        // Retorna un objeto json con los valores del estado civil
        return response()->json(['code' => 200, 'estado_civil' => $estado_civil]);
    }

    //metodo para registrar cliente
    public function ajaxPostRegistro(ValidateRegistro $request){

        $input = $request->all();

        $fnac = Carbon::parse($input['edad'])->format('d/m/Y');

        $tipofoto = $input['tipofoto'];
        //guardo la imagen en una variable
        $image = $input['foto'];
        $base64 = '';

        if($tipofoto == 'upload'){

            if($image != ''){

                //obtengo la extension
                $type = explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
                //creo un nombre temporal
                $name = time().'.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
                //ruta imagen temporal
                $pathImgTemporal = public_path('images/'.$name);
                //proceso la imagen a 200x200
                $img = Image::make($image)->fit(200,200)->save($pathImgTemporal);
                //obtengo la data de la imagen
                $data = file_get_contents($pathImgTemporal);
                //convierto a base64
                $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
                //elimino imagen temporal
                File::delete($pathImgTemporal);
            }

        }

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
            'civil'               => $input['civil'] == '' ? '' : new ObjectId($input['civil']),
            'tipofoto'            => $tipofoto == null ? '' : $tipofoto,
            'foto'                => $base64,
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
        $registro->EstadoCivil_id      = $data['civil'];
        $registro->TipoFoto            = $data['tipofoto'];
        $registro->Foto                = $data['foto'];
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
            'idpais' => $input['pais']
        ];

        $registro = Clubs::borrado(false)->activo(true)->where('Pais',new ObjectId($data['idpais']) )->orderBy('Nombre', 'asc')->get();
        $clubs = [];
        if($registro){
            foreach ($registro as $club) {
                $clubs[]=$club;
            }
            return response()->json(['code' => 200, 'msj' => 'Registrado exitosamente','datos'=>$clubs]);

        return response()->json(['code' => 500, 'msj' => 'Error al registrar. Consulte al administrador']);

        }
    }

}
