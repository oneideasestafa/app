<?php

namespace App\Http\Controllers;
use App\Http\Requests\ValidateRegistro;
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
use Image, Storage, File, Hash;
use MongoDB\BSON\ObjectId;


//controlador encargado de la vista de perfil
class PerfilController extends Controller
{

    //metodo para llamar a los clubes de futbol
    public function ajaxPostSync(Request $request){

        $input = $request->all();

        //capturo los datos y los acomodo en un arreglo
        $data = [
            'torrent'              => $input['torrent']
        ];
       
        $id = Auth::user()->_id;

        $client = Cliente::find($id);

        if($client){
            
            if($client->Sincronizado!=null&&count($client->Sincronizado)>0){
                $Sincronizado=$client->Sincronizado;
                array_push($Sincronizado,$data['torrent']);
                $client->Sincronizado=$Sincronizado;
            }else{
                $Sincronizado=[];
                 array_push($Sincronizado,$data['torrent']);
                 $client->Sincronizado=$Sincronizado;
            }
            if($client->save()){
                return response()->json(['code' => 200, 'msj' => 'Registrado']);
            }else{
                return response()->json(['code' => 500, 'msj' => 'Error al registrar. Consulte al administrador']);
            }


            
        }else{
            return response()->json(['code' => 500, 'msj' => 'Error al registrar. Consulte al administrador']);
        }

    }


}
