<?php

namespace App\Http\Middleware;

use Closure;
use App\User;
use Illuminate\Http\Request;
use App\Models\MongoDB\Cliente;

class ApiToken
{
  /**
   * Handle an incoming request.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \Closure  $next
   * @return mixed
   */
  public function handle(Request $request, Closure $next)
  {
    
    $token = $request->header('Authorization'); 
    if($token){
      $user = Cliente::where('api_token',$token)->first();
      if($user) {
        return $next($request);
      }  
      return response()->json([
        'message' => 'Not a valid access token.','request'=>$request,'token'=>$token
      ]);        
    }
    return response()->json([
      'message' => 'Not a valid api request.','prueba'=>$request->header('Authorization')
    ]);
  }
}
