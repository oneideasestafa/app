<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class ValidateRegistro extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {

        $foto   = 'nullable';

        if( $this->input('tipofoto') == 'upload' ){
            $foto = 'required';
        }

        if( $this->input('tipofoto') == 'camera' ){
            $foto = 'required';
        }

        $rules = [
            'nombre'      => 'required',
            'apellido'    => 'required',
          /*  'edad'        => 'required',*/
          /*  'sexo'        => 'required',*/
            'correo'      => 'required|email|unique:Clientes,Correo',
            'password'    => 'required',
            'foto'        => $foto,
          /*  'equipo'      => 'required'*/
        ];

        return $rules;
    }

    public function messages()
    {
        return [
            'nombre.required'    => 'El nombre es requerido',
            'apellido.required'  => 'El apellido es requerido',
            'sexo.required'  => 'El sexo es requerido',
            'edad.required'  => 'La fecha de nacimiento es requerido',
            'equipo.required'  => 'El equipo es requerido',
            'correo.required'    => 'El correo es requerido',
            'correo.email'    => 'Formato de correo invalido',
            'correo.unique' => 'El correo ya esta registrado, intente otro',
            'password.required'  => 'El password es requerido',
            'foto.required' => 'La imagen o foto es requerida',
        ];
    }

    public function failedValidation(Validator $validator) {

        throw new HttpResponseException(response()->json($validator->errors()->first(), 422));
    }
}
