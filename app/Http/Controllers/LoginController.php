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


    // Verifica si un usuario es válido
    public function login(ValidateLogin $request)
    {
    
        $input = $request->all();

        $credenciales = [
            'correo'   => strtolower($input['correo']),
            'password' => $input['pass']
        ];

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

                    $user->QuestionEvent = true;
                    
                    if($user->save()){

                        $exito = Auth::guard('web')->login($user);

                        //genero el log de inicio de sesion
                        //$log = generateLog('inicio', 'web');

                        return response()->json(['code' => 200, 'msj' => 'exito', 'tipo' => 'one' , 'userid' => $user->_id]);

                    }
                    // En caso contrario retorna un mensaje de error al usuario
                    return response()->json(['code' => 600, 'msj' => 'Error al iniciar sesión. Consulte al administrador' ]);

                }
                // En caso contrario retorna un mensaje de error al usuario
                return response()->json(['code' => 600, 'msj' => 'Correo y/o Contraseña incorrectos' ]);

            }
            // En caso contrario retorna un mensaje de error al usuario
            return response()->json(['code' => 600, 'msj' => 'Usuario inactivo' ]);

        }
        // En caso contrario retorna un mensaje de error al usuario
        return response()->json(['code' => 600, 'msj' => 'Usuario no registrado' ]);
    }


    // Permite cerrar la session
    public function logout(Request $request){

        $cuenta = $this->auth->user()->TipoCuenta;

        //genero log de cierre de sesion
        //$log = generateLog('cierre', 'web');

        //invoca al metodo de cierre de session
        $this->auth->logout();

        //redirecciono de nuevo al login
        return redirect()->route('index');
    }


}

