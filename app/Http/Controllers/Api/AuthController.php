<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use DB;
use App\User;
use Validator;

class AuthController extends Controller
{
  private $apiToken;
  public function __construct()
  {
    // Token unico
    $this->apiToken = uniqid(base64_encode(str_random(60)));
  }
  /**
   * Login del Usuarios
   */
  public function postLogin(Request $request)
  {
    // Validaciones
    $rules = [
      'email'=>'required|email',
      'password'=>'required|min:8'
    ];
    $validator = Validator::make($request->all(), $rules);
    if ($validator->fails()) {
      // En caso de que la validación falle
      return response()->json([
        'message' => $validator->messages(),
      ]);
    }

    // Se obtiene el usuario
    $user = User::where('email',$request->email)->first();
    if($user) {
      // Se verifica el password
      if( password_verify($request->password, $user->password) ) {
        // Se actualiza el token
        $postArray = ['api_token' => $this->apiToken];
        $login = User::where('email',$request->email)->update($postArray);
        
        if($login) {
          return response()->json([
            'name'         => $user->name,
            'email'        => $user->email,
            'access_token' => $this->apiToken,
          ]);
        }
      }
      return response()->json([
        'message' => 'Invalid Password',
      ]);
      
    }
    return response()->json([
      'message' => 'User not found',
    ]);
  }
  /**
   * Register
   */
  public function postRegister(Request $request)
  {
    // Validaciones
    $rules = [
      'name'     => 'required|min:3',
      'email'    => 'required|unique:users,email',
      'password' => 'required|min:8'
    ];
    $validator = Validator::make($request->all(), $rules);
    if ($validator->fails()) {
      // Si la validación falla
      return response()->json([
        'message' => $validator->messages(),
      ]);
    }
    $postArray = [
      'name'      => $request->name,
      'email'     => $request->email,
      'password'  => bcrypt($request->password),
      'api_token' => $this->apiToken
    ];
    // $user = User::GetInsertId($postArray);
    $user = User::insert($postArray);

    if($user) {
      return response()->json([
        'name'         => $request->name,
        'email'        => $request->email,
        'access_token' => $this->apiToken,
      ]);
    }
    return response()->json([
      'message' => 'Registration failed, please try again.',
    ]);
  }
  /**
   * Logout
   */
  public function postLogout(Request $request)
  {
    $token = $request->header('Authorization');
    $user = User::where('api_token',$token)->first();
    if($user) {
      $postArray = ['api_token' => null];
      $logout = User::where('id',$user->id)->update($postArray);
      if($logout) {
        return response()->json([
          'message' => 'User Logged Out',
        ]);
      }
    }
    return response()->json([
      'message' => 'User not found',
    ]);
  }
}