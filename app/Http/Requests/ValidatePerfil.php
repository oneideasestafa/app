<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class ValidatePerfil extends FormRequest
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
            'fechan'      => 'required',
            'sexo'        => 'required',
            'pais'        => 'required',
            'equipo'      => 'required'
        ];
    }

    public function messages()
    {
        return [
            'nombre.required'    => 'El nombre es requerido',
            'apellido.required'  => 'El apellido es requerido',
            'sexo.required'  => 'El sexo es requerido',
            'fechan.required'  => 'La fecha de nacimiento es requerido',
            'equipo.required'  => 'El equipo es requerido',
            'pais.required'    => 'El pais es requerido'
        ];
    }

    public function failedValidation(Validator $validator) {

        throw new HttpResponseException(response()->json($validator->errors()->first(), 422));
    }
}
