<?php

namespace App\Http\Controllers;

//controlador encargado del index

class IndexController extends Controller
{

    //metodo que crea la vista
    public function index(){
        //devuelve la vista asociada
        //return view('index');
        return view('inicio');
    }

}