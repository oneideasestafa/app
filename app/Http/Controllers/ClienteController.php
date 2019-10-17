<?php

namespace App\Http\Controllers;
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
use MongoDB\BSON\ObjectId;
use Illuminate\Support\Facades\Validator;

class ClienteController extends Controller
{
    public function index()
    {
        return view('test');
    }
    public function create()
    {
        return view('carcreate');
    }
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

    public function update (Request $request) {
      Validator::make($request->all(), [
        'name' => 'required|string',
        'lastname' => 'required|string',
        'birthdate' => 'required|date',
        'gender' => 'required|string',
        'maritalStatus' => 'nullable|string|exists:EstadosCiviles,_id',
        'profilePicture' => 'file|image',
        'phone' => 'nullable|string',
        'countryId' => 'required|string|exists:Pais,_id',
        'teamId' => 'nullable|string|exists:Club,id',
        'userId' => 'required|string|exists:Clientes,_id',
      ])->validate();

      $client = Cliente::where('_id', $request->userId)->first();

      $client->Nombre = $request->name; 
      $client->Apellido = $request->lastname; 
      $client->Sexo = $request->gender;
      $client->FechaNacimiento = $request->birthdate;
      $client->Equipo = $request->teamId;
      $client->Telefono = $request->phone;
      $client->Pais_id = $request->countryId;
      $client->EstadoCivil_id = $request->maritalStatus;
      if ($request->hasFile('profilePicture')) {
        $client->Foto = $request->file('profilePicture')->store('avatars', 'public');
      }

      $client->save();

      return response()->json([
        'Nombre' => $client->Nombre,
        'Apellido' => $client->Apellido,
        'Sexo' => $client->Sexo,
        'FechaNacimiento' => $client->FechaNacimiento,
        'Equipo' => $client->Equipo,
        'Telefono' => $client->Telefono,
        'Pais_id' => $client->Pais_id,
        'EstadoCivil_id' => $client->EstadoCivil_id,
        'Foto' => $client->Foto,
      ], 200);
    }
}
