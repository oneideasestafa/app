@extends('layouts.master')

@section('content')

    <div id="login" data-url="{{ url('/') }}" data-eventos="{{ json_encode($eventos) }}"></div>

@endsection

@section('javascript')

@endsection
