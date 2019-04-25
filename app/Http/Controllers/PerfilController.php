<?php

namespace App\Http\Controllers;
use App\Http\Requests\ValidateCambiarPassword;
use App\Http\Requests\ValidatePerfil;
use App\Models\MongoDB\Cliente;
use App\Models\MongoDB\Clubs;
use App\Models\MongoDB\EstadoCivil;
use App\Models\MongoDB\Pais;
use App\Models\MongoDB\Venta;
use App\Models\MongoDB\Sucursal;
use App\Models\MongoDB\Empresa;
use App\Models\MongoDB\Producto;
use App\Models\MongoDB\EstatusPedido;
use App\Models\MongoDB\Notificacion;
use App\Models\MongoDB\Sentido;
use App\Models\MongoDB\Reserva;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Hash;
use MongoDB\BSON\ObjectId;


//controlador encargado de la vista de perfil
class PerfilController extends Controller
{

    //metodo para llamar la vista de perfil
    public function index(){

        //devuleve la vista
        return view('Perfil.perfil');
    }

    //metodo para obtener los datos del cliente
    public function ajaxGetPerfil(){

        $pa = [];

        $id = Auth::user()->_id;

        $client = Cliente::find($id);

        if($client){

            $paises  = Pais::borrado(false)->get();
            $civiles = EstadoCivil::borrado(false)->activo(true)->orderBy('Nombre', 'asc')->get();


            foreach ($paises as $p){

                $pa[] = [
                    'id' => $p->_id,
                    'pais' => $p->Nombre
                ];
            }

            return response()->json(['code' => 200, 'cliente' => $client, 'civiles'=> $civiles]);

        }else{

            return response()->json(['code' => 500, 'msj' => 'Ocurrio un problema al cargar el perfil']);
        }

    }

    //metodo para guardar perfil
    public function ajaxPostPerfil(ValidatePerfil $request){

        if(Auth::user()->TipoCuenta == 'Visitante'){

            return response()->json(['code' => 200, 'msj' => 'Data actualizada exitosamente. Recuerda que la cuenta es solo para demostración.']);

        }else{

            $input = $request->all();

            $fnac = Carbon::parse($input['fechan'])->format('d/m/Y');

            //capturo los datos y los acomodo en un arreglo
            $data = [
                'nombre'              => $input['nombre'],
                'apellido'            => $input['apellido'],
                'pais'                => new ObjectId($input['pais']),
                'telefono'            => $input['telefono'],
                'fechan'              => $fnac,
                'sexo'                => $input['sexo'],
                'equipo'              => $input['equipo'],
                'civil'               => $input['civil'] == '' ? '' : new ObjectId($input['civil'])
            ];

            $id = Auth::user()->_id;

            //procedo a guardarlos en la bd
            $registro = Cliente::find($id);
            $registro->Pais_id             = $data['pais'];
            $registro->Telefono            = $data['telefono'];
            $registro->Nombre              = $data['nombre'];
            $registro->Apellido            = $data['apellido'];
            $registro->Sexo                = $data['sexo'];
            $registro->FechaNacimiento     = $data['fechan'];
            $registro->Equipo              = $data['equipo'];
            $registro->EstadoCivil_id      = $data['civil'];

            //verifico si fue exitoso el insert en la bd
            if($registro->save()){
                return response()->json(['code' => 200, 'msj' => 'Data actualizada exitosamente']);
            }else{
                return response()->json(['code' => 500, 'msj' => 'Error al Actualizar data']);
            }

        }

    }

    //metodo para llamar a los clubes de futbol
    public function ajaxPostClubs(Request $request){

        $input = $request->all();

        //capturo los datos y los acomodo en un arreglo
        $data = [
            'idpais'              => $input['pais']
        ];

        $registro = Clubs::borrado(false)->activo(true)->where('Pais',new ObjectId($data['idpais']) )->orderBy('Nombre', 'asc')->get();
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
