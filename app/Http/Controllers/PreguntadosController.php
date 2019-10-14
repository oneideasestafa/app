<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\MongoDB\QuestionAnswers;
use MongoDB\BSON\ObjectId;

class PreguntadosController extends Controller
{
    // Retorna la lista de preguntas
    public function getPreguntas(){

        $preguntas_respuestas = QuestionAnswers::all();
        
        // Retorna un objeto json con los valores del estado civil
        return response()->json(['code' => 200, 'preguntas' => $preguntas_respuestas]);
    }
}
