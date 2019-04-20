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
        return [
            'nombre'      => 'required',
            'apellido'    => 'required',
            'sexo'        => 'required',
            'edad'        => 'required',
            'equipo'      => 'required',
            'correo'      => 'required|email|unique:Clientes,Correo',
            'password'    => 'required'
        ];
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
            'password.required'  => 'El password es requerido'
        ];
    }

    public function failedValidation(Validator $validator) {

        throw new HttpResponseException(response()->json($validator->errors()->first(), 422));
    }
}
