<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MongoDB\EstadoCivil;

class MaritalStatusController extends Controller
{
  public function get (Request $request) {
    $maritalStatuses = EstadoCivil::where('Borrado', false)->get()->map(function ($status) {
      return [
        '_id' => $status->_id,
        'Nombre' => $status->Nombre,
      ];
    });
    
    return response()->json($maritalStatuses);
  }
}
