<?php

namespace App\Http\Controllers;
use App\Http\Requests\ValidateQuestionEvent;
use App\Models\MongoDB\AsistenteEvento;
use App\Models\MongoDB\Cliente;
use App\Models\MongoDB\Evento;
use App\Models\MongoDB\Usuario;
use App\Models\MongoDB\Pais;
use App\Models\MongoDB\Bibliotecas;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Hash, Auth;
use MongoDB\BSON\ObjectId;

//controlador encargado del form que pregunta el tipo de evento

class QuestionEventController extends Controller
{

    //metodo que crea la vista
    public function index(){

        $event = Evento::borrado(false)->activo(true)->app(true)->orderBy('Nombre', 'asc')->get();

        $data['eventos'] = $event ? $event : [];

        //devuelve la vista asociada
        return view('question-event', $data);
    }

    //metodo para procesar el login por ajax
    public function ajaxContinuar(ValidateQuestionEvent $request)
    {
        $input = $request->all();

        $credenciales = [
            'evento'   => $input['evento'],
            'idevento' => $input['idevento'],
            'sector'   => $input['sector'],
            'fila'     => $input['fila'],
            'asiento'  => $input['asiento'],
            'manual'   => $input['manual']
        ];

        $evento = $input['evento'];
        $idevento = $input['idevento'];

        $validoEvento = $this->isEventoValido($evento, $idevento, Auth::user()->_id, $credenciales);

        if($validoEvento){

            $user = Cliente::find(Auth::user()->_id);
            $user->QuestionEvent = false;

            if($user->save()){

                return response()->json(['code' => 200, 'msj' => 'exito' ]);

            }else{
                return response()->json(['code' => 600, 'msj' => 'Ocurrio un error al seleccionar el evento. Consulte al administrador']);

            }

        }else{
            return response()->json(['code' => 600, 'msj' => 'Codigo de evento invalido' ]);
        }

    }



    public function isEventoValido($evento, $idevento, $user, $data){

        if($evento AND $idevento){
            $bibliotecas = Bibliotecas::where('Evento_id', new ObjectId($evento))->get();
            $ev = Evento::borrado(false)->activo(true)->where('IDEvento', $idevento)->first();

            if($ev){

                $c = Cliente::find($user);
                $c->Evento_id = new ObjectId($ev->_id);
                $c->Empresa_id = new ObjectId($ev->Empresa_id);
                $pais = Pais::find($ev->Pais_id);
                $c->GTM = $pais->GTM;
                foreach ($bibliotecas as $archivo) {
                   $lista[]=$archivo->MagnetURI;
                }
                $c->Archivos = $lista;

                if($c->save()){
                    Auth::guard('web')->login($c);
                    $this->saveAsistenteEvento($user, $data);
                    //echo $c->Archivos;
                    return true;
                }else{
                    return false;
                }

            }else{
                return false;
            }

        }else{
            $bibliotecas = Bibliotecas::where('Evento_id', new ObjectId($evento))->get();
            $ev = Evento::find($evento);

            if($ev){

                $c = Cliente::find($user);
                $c->Evento_id = new ObjectId($ev->_id);
                $c->Empresa_id = new ObjectId($ev->Empresa_id);
                $pais = Pais::find($ev->Pais_id);
                $c->GTM = $pais->GTM;
                foreach ($bibliotecas as $archivo) {
                   $lista[]=$archivo->MagnetURI;
                }
                $c->Archivos = $lista;

                if($c->save()){

                    $this->saveAsistenteEvento($user, $data);
                   // echo var_export($c->Archivos);
                    return true;
                }else{
                    return false;
                }

            }else{
                return false;
            }

        }


    }

    //metodo para revisar si el evento tiene ubicacion
    public function ajaxEventoCheckUbicacion(Request $request)
    {
        $input = $request->all();

        $evento = $input['evento'];
        $idevento = $input['idevento'];

        if($idevento){

            $ev = Evento::borrado(false)->activo(true)->where('IDEvento', $idevento)->first();

            if($ev){

                if($ev->Ubicacion == 'GPS'){

                    return response()->json(['code' => 200, 'msj' => 'Evento es de tipo GPS', 'ubicacion' => false ]);

                }else if($ev->Ubicacion == 'MANUAL'){

                    return response()->json(['code' => 200, 'msj' => 'Evento es de tipo MANUAL', 'ubicacion' => true ]);

                }

            }else{

                return response()->json(['code' => 700, 'msj' => 'Codigo de evento invalido', 'ubicacion' => false ]);
            }

        }else{

            $ev = Evento::find($evento);

            if($ev){

                if($ev->Ubicacion == 'GPS'){

                    return response()->json(['code' => 200, 'msj' => 'Evento es de tipo GPS', 'ubicacion' => false ]);

                }else if($ev->Ubicacion == 'MANUAL'){

                    return response()->json(['code' => 200, 'msj' => 'Evento es de tipo MANUAL', 'ubicacion' => true ]);

                }

            }else{

                return response()->json(['code' => 600, 'msj' => 'Error al consultar Evento. Consulte al administrador', 'ubicacion' => false ]);
            }

        }

    }

    public function saveAsistenteEvento($cliente, $data){

        $ubicacion = 'GPS';

        if($data['manual'] == true){
            $ubicacion = 'MANUAL';
        }

        if($data['evento'] AND $data['idevento']){

            $ev = Evento::borrado(false)->activo(true)->where('IDEvento', $data['idevento'])->first();

            $evento = $ev->_id;

        }else{
            $evento = $data['evento'];
        }

        $registro = new AsistenteEvento;
        $registro->Evento_id = new ObjectId($evento);
        $registro->Cliente_id = new ObjectId($cliente);
        $registro->Latitud = '';
        $registro->Longitud = '';
        $registro->Sector = $data['sector'];
        $registro->Fila = $data['fila'];
        $registro->Asiento = $data['asiento'];
        $registro->Fecha = Carbon::now();
        $registro->Ubicacion = $ubicacion;
        $registro->Activo = true;
        $registro->Borrado = false;

        if($registro->save()){
            return true;
        }else{
            return false;
        }
    }

}
