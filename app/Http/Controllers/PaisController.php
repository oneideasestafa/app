<?php

namespace App\Http\Controllers;

use MongoDB\BSON\ObjectId;
use Illuminate\Http\Request;
use App\Models\MongoDB\Clubs;

class PaisController extends Controller
{
  
  public function getTeams (Request $request, $countryId) {
    $teams = Clubs::where('Pais', new ObjectId($countryId))
      ->where('Activo', true)
      ->where('Borrado', false)
      ->get()
      ->map(function ($team) { 
        return [
          '_id' => $team->_id,
          'id' => $team->id,
          'Nombre' => $team->Nombre,
          'Pais' => $team->Pais,
        ];
      });

    return response()->json($teams);
  }
}
