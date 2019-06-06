@extends('layouts.master')

@section('content')

    <div id="index" data-url="{{ url('/') }}" data-googleplay="{{ config('app.url-google-play') }}" data-applestore="{{ config('app.url-app-store') }}" ></div>

@endsection

@section('javascript')

@endsection