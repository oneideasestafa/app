<header class="navbar navbar-dark fixed-top navbar-full bg-rojo">
    <button aria-controls="navdrawerDefault" aria-expanded="false" aria-label="Toggle Navdrawer" class="navbar-toggler" data-target="#navdrawerDefault" data-toggle="navdrawer"><span class="navbar-toggler-icon"></span></button>
    <span class="navbar-brand mr-auto">
        @yield('header-text')
    </span>

</header>

<div aria-hidden="true" class="navdrawer" id="navdrawerDefault" tabindex="-1">
    <div class="navdrawer-content">
        <div class="navdrawer-header roboto-condensed">
            <a class="navbar-brand px-0" href="javascript:void(0)">Menú</a>
        </div>

        <div id="menu" data-tipocuenta="{{ Auth::user()->TipoCuenta }}" data-url="{{ url('/') }}" ></div>

    </div>
</div>

