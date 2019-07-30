<?php

namespace App\Http\Controllers;
use App\Models\MongoDB\AsistenteEvento;
use App\Models\MongoDB\Cliente;
use App\Models\MongoDB\Evento;
use App\Models\MongoDB\Usuario;
use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Requests\ValidateLogin;
use Illuminate\Support\Facades\Auth;
use Illuminate\Contracts\Auth\Guard;
use Hash;
use MongoDB\BSON\ObjectId;

// Controlador encargado del login y logout de usuarios
class LoginController extends Controller
{
    private $apiToken;

    public function __construct(Guard $auth)
    {
        // Unique Token
        $this->apiToken = uniqid(base64_encode(str_random(60)));
        $this->auth = $auth;
    }


    // Verifica si un usuario es válido
    public function login(ValidateLogin $request)
    {
    
        $input = $request->all();

        $credenciales = [
            'email'   => strtolower($input['email']),
            'password' => $input['password']
        ];

        $domain   = substr($credenciales['email'], strpos($credenciales['email'], '@') + 1);
        $nameMail = substr($credenciales['email'], 0, strpos($credenciales['email'], '@') + 1 );

        if($domain == 'camarero'){
           
            $user = Usuario::where('Correo', 'like', $nameMail.'%')->where('Rol_id', new ObjectId('5c5aa4306e894211f963ea4a'))->first();
        }else if($domain == 'repartidor'){
            $user = Usuario::where('Correo', 'like', $nameMail.'%')->where('Rol_id', new ObjectId('5c9e401e1f37ef19f46c13ce'))->first();
          
        }else{
            $user = Cliente::where('Correo', $credenciales['email'])->first();
           
        }


        if($user){

            if($user->Activo == true){

                if(Hash::check($credenciales['password'], $user->Password)){

                    $user->QuestionEvent = true;
                    $user->api_token = Str::random(60);
                    $apiToken =  $user->api_token;
                    
                    if($user->save()){

                        $exito = Auth::guard('web')->login($user);

                        // Se actualiza el token
                        //$postArray = ['api_token' => $this->apiToken];
                        //$login = Cliente::where('Correo',$credenciales['email'])->update($postArray);

                        //genero el log de inicio de sesion
                        //$log = generateLog('inicio', 'web');

                        return response()->json([
                            'code' => 200, 
                            'msj' => 'exito', 
                            'tipo' => 'one' , 
                            'userid' => $user->_id, 
                            'access_token' => $apiToken
                        ]);

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
    public function logout(Request $request)
    {
        $token = $request->bearerToken();
        $user = Cliente::where('api_token',$token)->first();
        if($user) {
            //se establece el token como null            
            $postArray = ['api_token' => null];
            $logout = Cliente::where('_id',$user->id)->update($postArray);
            if($logout) {
                return response()->json([
                  'message' => 'User Logged Out',
                ]);
            }
            return response()->json([
              'message' => 'Logged Out Problem',
            ]);            
        }
        return response()->json([
            'message' => 'User not found',
        ]);
    }

}

