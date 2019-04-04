<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MongoDB\Cliente;
class ClienteController extends Controller
{
    public function index()
    {
        return view('test');
    }
    public function create()
    {
        return view('carcreate');
    }
    public function store(Request $request)
    {
        $car = new Car();
        $car->carcompany = $request->get('carcompany');
        $car->model = $request->get('model');
        $car->price = $request->get('price');        
        $car->save();
        return redirect('car')->with('success', 'Car has been successfully added');
    }
}
