<?php

namespace App\Http\Controllers;
use App\Http\Requests\ValidatePerfil;
use Illuminate\Http\Request;
use App\Models\MongoDB\Cliente;
use App\Models\MongoDB\EstadoCivil;
use App\Models\MongoDB\Pais;
use Carbon\Carbon;
use Image, Storage, File, Hash;
use MongoDB\BSON\ObjectId;

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

        }else{

            return response()->json(['code' => 500, 'msj' => 'Ocurrio un problema al cargar el perfil']);
        }

    }

        //metodo para guardar perfil
        public function editarCliente(ValidatePerfil $request){
    
                $input = $request->all();
                //dd($input);
                $fnac = Carbon::parse($input['fechaNacimiento'])->format('d/m/Y');
    
                $tipofoto = $input['tipofoto'];
                //guardo la imagen en una variable
                $image = $input['fotonew'];
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
    
                //verifico si fue exitoso el insert en la bd
                if($registro->save()){
                    return response()->json(['code' => 200, 'msj' => 'Data actualizada exitosamente']);
                }else{
                    return response()->json(['code' => 500, 'msj' => 'Error al Actualizar data']);
                }
    
            }

}
