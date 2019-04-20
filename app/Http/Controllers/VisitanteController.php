<?php

namespace App\Http\Controllers;
use App\Models\MongoDB\Cliente;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Hash;
use Faker\Factory as Faker;
use MongoDB\BSON\ObjectId;
use Illuminate\Support\Str;

//controlador encargado de los visitantes

class VisitanteController extends Controller
{

    //metodo para procesar el login
    public function login(Request $request)
    {

        $faker = Faker::create();

        //capturo los datos y los acomodo en un arreglo
        $data = [
            'nombre'              => 'Visitante ONE Show',
            'apellido'            => 'Visitante ONE Show',
            'sexo'                => 'm',
            'fn'                  => Carbon::now()->format('d/m/Y'),
            'equipo'              => '105',
            'correo'              => strtolower($faker->email),
            'telefono'            => '',
            'password'            => bcrypt(Str::random(20)),
            'from'                => 'Visitante',
            'pais'                => new ObjectId('5caf334dff6eff0ae30e450b'),
            'borrado'             => false,
            'activo'              => true,
            'civil'               => new ObjectId('5cbad5c4cf88fb319a3b5503'),
            'foto'                => ''

        ];

        //procedo a guardarlos en la bd
        $registro = new Cliente;
        $registro->Nombre              = $data['nombre'];
        $registro->Apellido            = $data['apellido'];
        $registro->Sexo                = $data['sexo'];
        $registro->FechaNacimiento     = $data['fn'];
        $registro->Equipo              = $data['equipo'];
        $registro->Correo              = $data['correo'];
        $registro->Telefono            = $data['telefono'];
        $registro->Password            = $data['password'];
        $registro->TipoCuenta          = $data['from'];
        $registro->ProviderID          = '';
        $registro->Pais_id             = $data['pais'];
        $registro->Borrado             = $data['borrado'];
        $registro->Activo              = $data['activo'];
        $registro->EstadoCivil_id      = $data['civil'];
        $registro->Foto                = $data['foto'];

        //verifico si fue exitoso el insert en la bd
        if($registro->save()){

            $credenciales = [
                'correo'   => $data['correo'],
                'password' => $data['password']
            ];

            $user = Cliente::where('Correo', $credenciales['correo'])->first();

            if($user){

                if($credenciales['password'] == $user->Password){

                    $exito = Auth::login($user);

                    return redirect()->intended('inicio');

                }else{
                    $mensaje = 'Correo y/o Contraseña incorrectos';
                }

            }else{

                $mensaje = 'Usuario no registrado';
            }

            return redirect()
                ->route('index')
                ->withInput()
                ->with('error', $mensaje);

        }

    }


}
