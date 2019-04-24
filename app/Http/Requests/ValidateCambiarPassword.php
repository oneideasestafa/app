<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class ValidateCambiarPassword extends FormRequest
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
            'oldpassword'    => 'required',
            'newpassword'    => 'required',
            'repeatpassword' => 'required|same:newpassword'
        ];
    }

    public function messages()
    {
        return [
            'oldpassword.required'    => 'El password actual es requerido',
            'newpassword.required'    => 'El password nuevo es requerido',
            'repeatpassword.required' => 'La confirmación del nuevo password es requerida',
            'repeatpassword.same'     => 'La confirmación del password no coincide'
        ];
    }

    public function failedValidation(Validator $validator) {

        throw new HttpResponseException(response()->json($validator->errors()->first(), 422));
    }
}
