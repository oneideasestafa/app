<?php

namespace App\Http\Controllers;

//controlador encargado del index

class IndexController extends Controller
{

    // Método que se usa como punto de entrada a la aplicación
    public function index(){
        return view('index');
    }
}