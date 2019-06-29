<?php

namespace App\Http\Middleware;

use Closure;
use App\User;

class ApiToken
{
  /**
   * Handle an incoming request.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \Closure  $next
   * @return mixed
   */
  public function handle($request, Closure $next)
  {
    $token = $this->getBearerToken($request);
    if($token){
      $user = User::where('api_token',$token)->first();
      if($user) {
        return $next($request);
      }  
      return response()->json([
        'message' => 'Not a valid access token.',
      ]);        
    }
    return response()->json([
      'message' => 'Not a valid api request.',
    ]);
  }

  /**
   * Obtiene el token de acceso de la cabecera, ya que viene en el formato "Bearer xxxxxx"
   * */
  function getBearerToken($request) {
      $headers = trim($request->header('Authorization'));
      // HEADER: Get the access token from the header
      if (!empty($headers)) {
          if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
              return $matches[1];
          }
      }
      return null;
  }
}
