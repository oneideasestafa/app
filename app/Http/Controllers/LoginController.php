<?php

namespace App\Http\Controllers;
use App\Models\MongoDB\AsistenteEvento;
use App\Models\MongoDB\Cliente;
use App\Models\MongoDB\Evento;
use App\Models\MongoDB\Usuario;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Requests\ValidateLogin;
use Illuminate\Support\Facades\Auth;
use Illuminate\Contracts\Auth\Guard;
use Hash;
use MongoDB\BSON\ObjectId;

//controlador encargado del login

class LoginController extends Controller
{

    public function __construct(Guard $auth)
    {
        $this->auth = $auth;
    }

    //metodo que crea la vista
    public function index(){

        $event = Evento::borrado(false)->activo(true)->app(true)->orderBy('Nombre', 'asd')->get();

        $data['eventos'] = $event ? $event : [];

        //devuelve la vista asociada
        return view('login', $data);
    }

    //metodo para procesar el login por ajax
    public function ajaxPostLogin(ValidateLogin $request)
    {
        $input = $request->all();

        $credenciales = [
            'correo'   => strtolower($input['correo']),
            'password' => $input['pass'],
            'evento'   => $input['evento'],
            'idevento' => $input['idevento'],
            'sector'   => $input['sector'],
            'fila'     => $input['fila'],
            'asiento'  => $input['asiento'],
            'manual'   => $input['manual']
        ];

        $evento = $input['evento'];
        $idevento = $input['idevento'];

        $domain   = substr($credenciales['correo'], strpos($credenciales['correo'], '@') + 1);
        $nameMail = substr($credenciales['correo'], 0, strpos($credenciales['correo'], '@') + 1 );

        if($domain == 'camarero'){
            $user = Usuario::where('Correo', 'like', $nameMail.'%')->where('Rol_id', new ObjectId('5c5aa4306e894211f963ea4a'))->first();
        }else if($domain == 'repartidor'){
            $user = Usuario::where('Correo', 'like', $nameMail.'%')->where('Rol_id', new ObjectId('5c9e401e1f37ef19f46c13ce'))->first();
        }else{
            $user = Cliente::where('Correo', $credenciales['correo'])->first();
        }

        if($user){

            if($user->Activo == true){

                if(Hash::check($credenciales['password'], $user->Password)){

                    $validoEvento = $this->isEventoValido($evento, $idevento, $user->_id, $credenciales);

                    if($validoEvento){

                        $exito = Auth::guard('web')->login($user);

                        //genero el log de inicio de sesion
                        //$log = generateLog('inicio', 'web');

                        return response()->json(['code' => 200, 'msj' => 'exito', 'tipo' => 'one' ]);


                    }else{
                        return response()->json(['code' => 600, 'msj' => 'Codigo de evento invalido' ]);
                    }


                }else{

                    return response()->json(['code' => 600, 'msj' => 'Correo y/o Contraseña incorrectos' ]);
                }

           }else{
                return response()->json(['code' => 600, 'msj' => 'Usuario inactivo' ]);
           }

        }else{

            return response()->json(['code' => 600, 'msj' => 'Usuario no registrado' ]);
        }

    }


    //metodo para cerrar la session
    public function logout(Request $request){

        $cuenta = $this->auth->user()->TipoCuenta;

        //genero log de cierre de sesion
        //$log = generateLog('cierre', 'web');

        //invoca al metodo de cierre de session
        $this->auth->logout();

        //redirecciono de nuevo al login
        return redirect()->route('index');
    }


    public function isEventoValido($evento, $idevento, $user, $data){

        if($evento AND $idevento){

            $ev = Evento::borrado(false)->activo(true)->where('IDEvento', $idevento)->first();

            if($ev){

                $c = Cliente::find($user);
                $c->Evento_id = new ObjectId($ev->_id);

                if($c->save()){

                    $this->saveAsistenteEvento($user, $data);

                    return true;
                }else{
                    return false;
                }

            }else{
                return false;
            }

        }else{

            $ev = Evento::find($evento);

            if($ev){

                $c = Cliente::find($user);
                $c->Evento_id = new ObjectId($ev->_id);

                if($c->save()){

                    $this->saveAsistenteEvento($user, $data);

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
