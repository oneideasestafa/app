@extends('layouts.master-inside')

@section('header-text')
    Invitación
@endsection

@section('content')


    <div class="centrado-absoluto" style="min-height: 60vh">

        <div id="invitacion" data-url="{{ url('/') }}" data-invitaciones="{{ json_encode($invitaciones) }}"></div>

    </div>

@endsection

@section('javascript')

@endsection
