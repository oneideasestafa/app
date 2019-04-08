@extends('layouts.master')

@section('content')


    <div id="registro-cliente" data-facebook="{{ url('auth/facebook') }}" data-google="{{ url('auth/google') }}" class="abs-center roboto-condensed"  data-url="{{ url('/') }}" ></div>

@endsection

@section('javascript')

@endsection
