<?php

namespace App\Http\Controllers;
use App\Models\MongoDB\Cliente;
use App\Models\MongoDB\Evento;
use App\Models\MongoDB\Usuario;
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
            'password' => $input['pass']
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

                    $validoEvento = $this->isEventoValido($evento, $idevento, $user->_id);

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

        if($cuenta == 'Visitante'){

            $user = $this->auth->user()->_id;

            removeUserVisitante($user);
        }

        $request->session()->forget('cart');
        $request->session()->forget('empresa');
        $request->session()->forget('confirmacion');
        $request->session()->forget('pedido');

        //genero log de cierre de sesion
        //$log = generateLog('cierre', 'web');

        //invoca al metodo de cierre de session
        $this->auth->logout();

        //redirecciono de nuevo al login
        return redirect()->route('index');
    }


    public function isEventoValido($evento, $idevento, $user){

        if($evento AND $idevento){

            $ev = Evento::borrado(false)->activo(true)->where('IDEvento', $idevento)->first();

            if($ev){

                $c = Cliente::find($user);
                $c->Evento_id = new ObjectId($ev->_id);

                if($c->save()){
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
                    return true;
                }else{
                    return false;
                }

            }else{
                return false;
            }

        }


    }

}
