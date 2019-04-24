@extends('layouts.master-inside')

@section('header-text')
    Perfil
@endsection

@section('content')


    <div class="centrado-absoluto" style="min-height: 60vh">

        <div id="cambiar-datos-perfil" data-url="{{ url('/') }}"></div>

    </div>

@endsection

@section('javascript')

@endsection
