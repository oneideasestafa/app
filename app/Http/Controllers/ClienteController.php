<?php

namespace App\Http\Controllers;

use App\User;
use App\Http\Requests\ValidatePerfil;
Use App\Http\Requests\ValidateCambiarPassword;
use App\Http\Requests\ValidateRegistro;
use Illuminate\Http\Request;
use App\Models\MongoDB\Cliente;
use App\Models\MongoDB\Clubs;
use App\Models\MongoDB\EstadoCivil;
use App\Models\MongoDB\Pais;
use Carbon\Carbon;
use Image, Storage, File, Hash, DB;
use Illuminate\Support\Facades\Auth;
use MongoDB\BSON\ObjectId;
use Illuminate\Support\Facades\Validator;

class ClienteController extends Controller
{
  public function store(Request $request)
  {
      $car = new Car();
      $car->carcompany = $request->get('carcompany');
      $car->model = $request->get('model');
      $car->price = $request->get('price');        
      $car->save();
      return redirect('car')->with('success', 'Car has been successfully added');
  }

  // Permite registrar cliente
  public function crearCliente(ValidateRegistro $request){

      $input = $request->all();

      $fnac = Carbon::parse($input['edad'])->format('d/m/Y');

      $tipofoto = $input['tipofoto'];
      //guardo la imagen en una variable
      $image = $input['foto'];
      $base64 = '';

      if($tipofoto == 'upload'){

          if($image != ''){

              //obtengo la extension
              $type = explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
              //creo un nombre temporal
              $name = time().'.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
              //ruta imagen temporal
              $pathImgTemporal = public_path('images/'.$name);
              //proceso la imagen a 200x200
              $img = Image::make($image)->fit(200,200)->save($pathImgTemporal);
              //obtengo la data de la imagen
              $data = file_get_contents($pathImgTemporal);
              //convierto a base64
              $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
              //elimino imagen temporal
              File::delete($pathImgTemporal);
          }

      }

      //capturo los datos y los acomodo en un arreglo
      $data = [
          'nombre'              => $input['nombre'],
          'apellido'            => $input['apellido'],
          'sexo'                => $input['sexo'],
          'edad'                => $fnac,
          'equipo'              => $input['equipo'],
          'telefono'            => $input['telefono'],
          'correo'              => strtolower($input['correo']),
          'from'                => 'ONE',
          'password'            => bcrypt($input['password']),
          'pais'                => new ObjectId($input['pais']),
          'civil'               => $input['civil'] == '' ? '' : new ObjectId($input['civil']),
          'tipofoto'            => $tipofoto == null ? '' : $tipofoto,
          'foto'                => $base64,
          'borrado'             => false,
          'activo'              => true
      ];

      //procedo a guardarlos en la bd
      $registro = new Cliente;
      $registro->Nombre              = $data['nombre'];
      $registro->Apellido            = $data['apellido'];
      $registro->Sexo                = $data['sexo'];
      $registro->FechaNacimiento     = $data['edad'];
      $registro->Equipo              = $data['equipo'];
      $registro->Correo              = $data['correo'];
      $registro->Telefono            = $data['telefono'];
      $registro->Password            = $data['password'];
      $registro->TipoCuenta          = $data['from'];
      $registro->ProviderID          = '';
      $registro->Pais_id             = $data['pais'];
      $registro->EstadoCivil_id      = $data['civil'];
      $registro->TipoFoto            = $data['tipofoto'];
      $registro->Foto                = $data['foto'];
      $registro->Borrado             = $data['borrado'];
      $registro->Activo              = $data['activo'];

      // Si fue exitoso el insert en la bd
      if($registro->save()){
          return response()->json(['code' => 200, 'msj' => 'Registrado exitosamente']);
      }

      // En caso contrario retorna un mensaje de error al usuario
      return response()->json(['code' => 500, 'msj' => 'Error al registrar. Consulte al administrador']);

  }

  public function getCliente($id){

      $client = Cliente::find($id);

      if($client){
          $paises  = Pais::borrado(false)->get();
          $civiles = EstadoCivil::borrado(false)->activo(true)->orderBy('Nombre', 'asc')->get();
          foreach ($paises as $p){
              $pa[] = [
                  'id' => $p->_id,
                  'pais' => $p->Nombre
              ];
          }

          return response()->json(['code' => 200, 'cliente' => $client, 'civiles'=> $civiles]);

      }
      // En caso contrario retorna un mensaje de error al usuario
      return response()->json(['code' => 500, 'msj' => 'Ocurrio un problema al cargar el perfil']);
  }

  // Permite guardar perfil
  public function editarCliente(ValidatePerfil $request) {    
      $input = $request->all();
      $fnac = Carbon::parse($input['fechaNacimiento'])->format('d/m/Y');
      
      $tipofoto = $input['tipofoto'];
      //guardo la imagen en una variable
      $image = $input['fotonew'];
      $base64 = '';

      if ($tipofoto == 'upload') {
          if($image != '') {

              //obtengo la extension
              $type = explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
              //creo un nombre temporal
              $name = time().'.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
              //ruta imagen temporal
              $pathImgTemporal = public_path('images/'.$name);
              //proceso la imagen a 200x200
              $img = Image::make($image)->fit(200,200)->save($pathImgTemporal);
              //obtengo la data de la imagen
              $data = file_get_contents($pathImgTemporal);
              //convierto a base64
              $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
              //elimino imagen temporal
              File::delete($pathImgTemporal);
          }
      }
  
      //capturo los datos y los acomodo en un arreglo
      $data = [
          'nombre'              => $input['nombre'],
          'apellido'            => $input['apellido'],
          'pais'                => new ObjectId($input['pais']),
          'telefono'            => $input['telefono'],
          'fechan'              => $fnac,
          'sexo'                => $input['sexo'],
          'equipo'              => $input['equipo'],
          'civil'               => $input['civil'] == '' ? '' : new ObjectId($input['civil']),
          'tipofoto'            => $tipofoto == null ? '' : $tipofoto,
          'foto'                => $base64
      ];

      $id = $input['idUsuario'];

      //procedo a guardarlos en la bd
      $registro = Cliente::find($id);
      $registro->Pais_id             = $data['pais'];
      $registro->Telefono            = $data['telefono'];
      $registro->Nombre              = $data['nombre'];
      $registro->Apellido            = $data['apellido'];
      $registro->Sexo                = $data['sexo'];
      $registro->FechaNacimiento     = $data['fechan'];
      $registro->Equipo              = $data['equipo'];
      $registro->EstadoCivil_id      = $data['civil'];
      $registro->TipoFoto            = $data['tipofoto'];

      if($data['foto'] != ''){
          $registro->Foto            = $data['foto'];
      }

      // Si fue exitoso el insert en la bd
      if($registro->save()){
          return response()->json(['code' => 200, 'msj' => 'Data actualizada exitosamente']);
      }
      // En caso contrario retorna un mensaje de error al usuario
      return response()->json(['code' => 500, 'msj' => 'Error al Actualizar data']);
  
  }

  public function cambiarClave(ValidateCambiarPassword $request){

      $input = $request->all();
      
      // Se capturan los datos y se acomodan en un arreglo
      $data = [
          'old'  => $input['oldpassword'],
          'new'  => $input['newpassword']
      ];

      // Se ubica el password actual del usuario
      $user = Cliente::find($input['idUsuario']);

      //verifico que conicida con el ingresado, sino mando un error
      if(Hash::check($data['old'], $user->Password)){

          // Se guarda el nuevo password en la bd
          $user->Password = Hash::make($data['new']);

          if($user->save()){
              return response()->json(['code' => 200, 'msj' => 'Clave cambiada exitosamente']);
          }
          // En caso contrario retorna un mensaje de error al usuario
          return response()->json(['code' => 500, 'msj' => 'Ocurrio un problema al cambiar la clave']);
      }
      // En caso contrario retorna un mensaje de error al usuario
      return response()->json(['code' => 600, 'msj' => 'Clave actual incorrecta']);
  }

  // Retorna la lista de estados civiles
  public function getEstadoCivil(){

      $estado_civil = EstadoCivil::borrado(false)->activo(true)->orderBy('Nombre', 'asc')->get();
      
      // Retorna un objeto json con los valores del estado civil
      return response()->json(['code' => 200, 'estado_civil' => $estado_civil]);
  }

  // Retorna los clubes de futbol
  public function getClubsPais(Request $request){

      $input = $request->all();

      // Se capturan los datos y se acomodan en un arreglo
      $data = [
          'idpais' => $input['pais']
      ];

      $registro = Clubs::borrado(false)->activo(true)->where('Pais',new ObjectId($data['idpais']) )->orderBy('Nombre', 'asc')->get();
      $clubs = [];
      if($registro){

          foreach ($registro as $club) {
              $clubs[]=$club;
          }

          return response()->json(['code' => 200, 'msj' => 'Registrado exitosamente','datos'=>$clubs]);
      }

      // En caso contrario retorna un mensaje de error al usuario
      return response()->json(['code' => 500, 'msj' => 'Error al registrar. Consulte al administrador']);
  }

  public function create (Request $request) {
    /**
     * This conversion is because the file upload plugin converts this
     * variable to a string, making it impossible for the "exists"
     * validation to work correctly
     */
    $data = $request->except('equipo');
    $data['equipo'] = intval($request->equipo);

    Validator::make($data, [
      'nombre' => 'required|string',
      'correo' => 'required|unique:Clientes,Correo',
      'password' => 'required|string|min:6',
      'apellido' => 'required|string',
      'nacimiento' => 'required|date',
      'genero' => 'required|string',
      'estado_civil' => 'nullable|string|exists:EstadosCiviles,_id',
      'profilePicture' => 'file|image',
      'telefono' => 'nullable|string',
      'avatarURL' => 'nullable|string',
      'pais' => 'nullable|string|exists:Pais,_id',
      'equipo' => 'nullable|integer|exists:Clubs,id',
    ])->validate();

    $client = new User();

    $client->nombre = $request->nombre; 
    $client->apellido = $request->apellido; 
    $client->email = strtolower($request->correo);
    $client->password = bcrypt($request->password);
    $client->tipoCuenta = 'ONE';
    $client->providerId = '';
    $client->sexo = $request->genero;
    $client->fechaNacimiento = $request->nacimiento;
    $client->equipo = $request->equipo;
    $client->telefono = $request->telefono;
    $client->paisId = $request->pais;
    $client->estadoCivilId = $request->estado_civil;

    if ($request->hasFile('profilePicture')) {
      $client->foto = 'storage/' .$request->file('profilePicture')->store('avatars', 'public');
    } else {
      $client->foto = '';
    }

    $client->save();

    return response()->json([
      'Nombre' => $client->nombre,
      'Apellido' => $client->apellido,
      'Sexo' => $client->sexo,
      'FechaNacimiento' => $client->fechaNacimiento,
      'Equipo' => $client->equipo,
      'Telefono' => $client->telefono,
      'Pais_id' => $client->paisId,
      'EstadoCivil_id' => $client->estadoCivilId,
      'Foto' => $client->foto,
    ], 200);
  }

  public function read (Request $request) {
    $user = $request->user();

    return response()->json([
      '_id' => $user->_id,
      'correo' => $user->email,
      'nombre' => $user->nombre,
      'apellido' => $user->apellido,
      'fechaNacimiento' => $user->fechaNacimiento,
      'sexo' => $user->sexo,
      'foto' => $user->foto,
      'telefono' => $user->telefono,
      'tipoCuenta' => $user->tipoCuenta,
      'providerId' => $user->providerId,
      'equipoId' => $user->equipo,
      'paisId' => $user->paisId,
      'estadoCivilId' => $user->estadoCivilId,
      'creado' => $user->creado,
    ]);
  }

  public function update (Request $request) {
    /**
     * This conversion is because the file upload plugin converts this
     * variable to a string, making it impossible for the "exists"
     * validation to work correctly
     */
    $data = $request->except('equipo');
    $data['equipo'] = intval($request->equipo);

    Validator::make($data, [
      'nombre' => 'required|string',
      'apellido' => 'required|string',
      'nacimiento' => 'required|date',
      'genero' => 'required|string',
      'estado_civil' => 'nullable|string|exists:EstadosCiviles,_id',
      'profilePicture' => 'file|image',
      'telefono' => 'nullable|string',
      'avatarURL' => 'nullable|string',
      'pais' => 'required|string|exists:Pais,_id',
      'equipo' => 'nullable|integer|exists:Clubs,id'
    ])->validate();

    $client = $request->user();

    $client->nombre = $request->nombre; 
    $client->apellido = $request->apellido; 
    $client->sexo = $request->genero;
    $client->fechaNacimiento = $request->nacimiento;
    $client->equipo = $request->equipo;
    $client->telefono = $request->telefono;
    $client->paisId = $request->pais;
    $client->estadoCivilId = $request->estado_civil;
    
    if ($request->hasFile('profilePicture')) {
      if ($client->foto) 
        Storage::disk('public')->delete($client->foto);

      $client->foto = 'storage/' . $request->file('profilePicture')->store('avatars', 'public');
    
    } else if (!$request->avatarURL && $client->foto) {
      Storage::disk('public')->delete($client->foto);
      $client->foto = '';
    }

    $client->save();

    return response()->json([
      'nombre' => $client->nombre,
      'apellido' => $client->apellido,
      'sexo' => $client->sexo,
      'fechaNacimiento' => $client->fechaNacimiento,
      'equipo' => $client->equipo,
      'telefonos' => $client->telefonos,
      'paisId' => $client->paisId,
      'estadoCivilId' => $client->estadoCivilId,
      'foto' => $client->foto,
    ], 200);
  }

  public function socialAuthenticate (Request $request) {
    $token = $request->header('Authorization');

    $client = Cliente::where('api_token', $token)->first();

    if (!$client) {
      return response()->json([
        'errors' => [
          'email' => 'El usuario no fue encontrado, inténtelo nuevamente'
        ]
      ], 422);
    }

    return response()->json([
      '_id' => $client->_id,
      'Nombre' => $client->Nombre,
      'Correo' => $client->Correo,
      'Foto' => $client->Foto,
      'apiToken' => $token, 
    ]);
  }
}
