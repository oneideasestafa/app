<?php

namespace App\Http\Controllers;
use App\Models\MongoDB\Invitacion;
use App\Models\MongoDB\Reserva;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Image, Storage, File, Hash, Auth;
use MongoDB\BSON\ObjectId;


//controlador encargado de la vista de invitacion
class InvitacionController extends Controller
{

    //metodo para llamar la vista de invitacion
    public function index(){

        $result = [];

        $eve = (string)Auth::user()->Evento_id;

        $invitacion = Invitacion::where('Evento_id', new ObjectId($eve))->get();

        foreach ($invitacion as $i){

            if($i->Modo == 'HORIZONTAL'){

                $result[0] = [
                    'PathImg' => $i->PathImg,
                    'PathPdf' => $i->PathPdf
                ];

            }else if($i->Modo == 'VERTICAL'){

                $result[1] = [
                    'PathImg' => $i->PathImg,
                    'PathPdf' => $i->PathPdf
                ];

            }

        }

        $data['invitaciones'] = $result;

        //devuleve la vista
        return view('Invitacion', $data);
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



}
