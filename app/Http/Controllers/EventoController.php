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
class EventoController extends Controller
{
    //metodo para retornar la informacion del evento
    public function getEvento($id){
        $data = Evento::find($id);
        return response()->json($data);
    }

    public function getEventos(){
        $data = Evento::all();
        return response()->json($data);
    }

}

?>
