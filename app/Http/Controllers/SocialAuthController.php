<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\MongoDB\Cliente;
use Socialite;
use Exception;

//controlador encargado de la autenticacion de facebook y google
class SocialAuthController extends Controller
{

    //metodo para reedirigir a facebook o google
    public function redirect($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    //metodo donde se devuelve la respuesta de google y facebook
    public function callback($provider)
    {

       try{
           //obtengo los datos del usuario
           $user = Socialite::driver($provider)->user();

        } catch (\Exception $e) {

            //si oucrre un error redirijo a la pagina principal
            return redirect('/');
        }
        
        $existingUser = Cliente::where('Correo', $user->email)->first();

        if($existingUser){

            if($existingUser->TipoCuenta == ucwords($provider)){

                Auth::login($existingUser);

                //genero log de inicio de sesion
                //$log = generateLog('inicio', 'web');

            }else{

                return redirect()->route('login')->with('error', 'Correo ya registrado');
            }

        } else {

            $registro = new Cliente;
            $registro->Nombre              = $user->name;
            $registro->Apellido            = '';
            $registro->Correo              = strtolower($user->email);
            $registro->Password            = '';
            $registro->TipoCuenta          = ucwords($provider);
            $registro->ProviderID          = $user->id;
            $registro->Pais_id             = '';
            $registro->Telefono            = '';
            $registro->Vehiculo            = '';
            $registro->Direccion           = '';
            $registro->Borrado             = false;
            $registro->Activo              = true;
            $registro->MostrarFotoProducto = true;
            $registro->NotificacionPromociones = false;
            $registro->NotificacionDescuentos  = false;
            $registro->NotificacionCupones     = false;
            $registro->NotificacionMailPedidos = true;
            $registro->NotificacionAppPedidos  = false;
            $registro->save();

            Auth::login($registro);

            //genero log de inicio de sesion
           // $log = generateLog('inicio', 'web');

        }

        return redirect()->to('/inicio');

    }


}
