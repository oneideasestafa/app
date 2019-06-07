@extends('layouts.master')

@section('content')

	<div class="centrado-absoluto" style="min-height: 60vh">
		<!--Se renderiza el contenido Perfil y Contraseña-->
		<div id="content">
		</div>
		<!--Se renderiza el boton activar flash-->
		<div id="inicio" data-url="{{ url('/') }}" data-googleplay="{{ config('app.url-google-play') }}" data-applestore="{{ config('app.url-app-store') }}" ></div>		
	</div>

@endsection

@section('javascript')

@endsection