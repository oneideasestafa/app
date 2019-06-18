<?php

namespace App\Http\Controllers;

use App\Http\Requests\ValidateEvento;
use App\Models\MongoDB\Evento;
use Carbon\Carbon;
use Illuminate\Http\Request;
use DB, DataTables, Image, Storage, File, Auth, Mail, QrCode;
use MongoDB\BSON\ObjectID;
use Illuminate\Support\Str;


//controlador encargado de la seccion de eventos
class EventoController extends Controller {

    //Retorna en orden ascendente todos los eventos que no hayan sido borrados 
    //y que esten activos (antes QuestionEventController:ajaxEventos)
    public function index(){
        $eventos = Evento::borrado(false)->activo(true)->app(true)->orderBy('Nombre', 'asc')->get();
        //devuelve un objeto json con todos los eventos
        return response()->json(['code'=>200,'eventos'=>$eventos ? $eventos : []]);
    }

    //Obtiene la información del evento por id (antes getEvento)
    public function show($id){
        $data = Evento::find($id);
        return response()->json($data);
    }

    //metodo para retornar la informacion del evento
    public function getEvento($id){
        $data = Evento::find($id);
        return response()->json($data);
    }
}

?>
