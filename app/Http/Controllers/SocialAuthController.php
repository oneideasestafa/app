<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\MongoDB\Cliente;
use MongoDB\BSON\ObjectId;
use Socialite;
use Exception;

//controlador encargado de la autenticacion de facebook y google
class SocialAuthController extends Controller
{
  //metodo para reedirigir a facebook o google
  public function redirectToProvider($provider)
  {
    return Socialite::driver($provider)->redirect();
  }

  // metodo donde se devuelve la respuesta de google y facebook
  public function handleProviderCallback($provider)
  {
    $user = Socialite::driver($provider)->stateless()->user();
    $client = Cliente::where('Correo', $user->getEmail())->first();

    if ($client) {
      if ($client->TipoCuenta == $provider) {
        
        $client->api_token = $user->token;
        $client->save();

        return redirect('/oauth/' . $provider . '?apiToken=' . $user->token);
      
      } else {
        return redirect('/oauth/' . $provider);
      }
    } else {

      $client = new Cliente;
      $client->Nombre = $user->getName();
      $client->Apellido = '';
      $client->Sexo = '';
      $client->FechaNacimiento = '';
      $client->Equipo = '';
      $client->Correo = strtolower($user->getEmail());
      $client->Telefono = '';
      $client->Password = '';
      $client->TipoCuenta = $provider;
      $client->ProviderID = $user->getId();
      $client->Pais_id = '';
      $client->EstadoCivil_id = new ObjectId('5cbad5c4cf88fb319a3b5503');
      $client->TipoFoto = '';
      $client->Foto = $user->getAvatar();
      $client->Borrado = false;
      $client->Activo = true;
      $client->api_token = $user->token;
      $client->QuestionEvent = true;

      $client->save();

      return redirect('/oauth/' . $provider . '?apiToken=' . $user->token);
    }
  }
}
