<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class ValidateQuestionEvent extends FormRequest
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
    public function rules(Request $request)
    {

        if( $this->input('evento') == 'idevento' ){
            $idevento = 'required';
        }else{
            $idevento = 'nullable';
        }

        $sector  = 'nullable';
        $fila    = 'nullable';
        $asiento = 'nullable';

        if( $this->input('manual') == '' ){
            $manual = 'required';
        }else if($this->input('manual') == false){
            $manual = 'required';
        }else if($this->input('manual') == true){
            $manual = 'required';
        }

        $rules = [
            'evento'  => 'required',
            'idevento'=> $idevento,
            'manual'  => $manual,
            'sector'  => $sector,
            'fila'    => $fila,
            'asiento' => $asiento

        ];

        return $rules;
    }

    public function messages()
    {
        return [
            'evento.required'    => 'El evento es requerido',
            'idevento.required'  => 'Debe ingresar el codigo del evento',
            'manual.required'    => 'El codigo de evento es invalido. Intente con otro',
            'sector.required'    => 'El sector es requerido',
            'fila.required'      => 'La fila es requerida',
            'asiento.required'   => 'El asiento es requerido'
        ];
    }

    public function failedValidation(Validator $validator) {

        throw new HttpResponseException(response()->json($validator->errors()->first(), 422));
    }
}
