<?php

namespace App\Http\Controllers;
use App\Http\Requests\ValidateEvento;
use App\Models\MongoDB\Evento;
use App\Models\MongoDB\Invitacion;
use Carbon\Carbon;
use Illuminate\Http\Request;
use DB, DataTables, Image, Storage, File, Auth, Mail, QrCode;
use MongoDB\BSON\ObjectID;
use Illuminate\Support\Str;


//controlador encargado de la seccion de eventos
class EventoController extends Controller {


    public function evento(Request $request){

        // Si se envía el parámetro id, se obtiene el detalle del evento (antes getEvento)
        $id = $request->id;
        if($request->id){
            $data = Evento::find($id);
            return response()->json($data);
        }

        // En otro caso, se retorna en orden ascendente todos los eventos que no hayan sido borrados 
        // y que esten activos (antes QuestionEventController:ajaxEventos)
        $eventos = Evento::borrado(false)->activo(true)->app(true)->orderBy('Nombre', 'asc')->get();
        //devuelve un objeto json con todos los eventos
        return response()->json(['code'=>200,'eventos'=>$eventos ? $eventos : []]);
    }


    //metodo para retornar la informacion del evento
    public function getEvento($id){
        $data = Evento::find($id);
        return response()->json($data);
    }

    public function getEventos(){
        $data = Evento::all();
        return response()->json($data);
    }

    public function getInvitacionEvento($id){

        $result = [];

        $eve = $id;

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
        return response()->json(['code'=>200,'invitaciones'=>$data]);
    }

}


