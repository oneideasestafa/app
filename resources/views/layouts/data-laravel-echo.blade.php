<script type="text/javascript">
    window.Laravel = {!! json_encode([
        'cliente' => auth()->guard('web')->check() ? (string)auth()->guard('web')->user()->_id : null,
        'telefono' => auth()->guard('web')->check() ? (string)auth()->guard('web')->user()->Telefono : null,
        'evento' => auth()->guard('web')->check() ? (string)auth()->guard('web')->user()->Evento_id : null,
        'gtm' => auth()->guard('web')->check() ? (string)auth()->guard('web')->user()->GTM : null,
        'empresa' => auth()->guard('web')->check() ? (string)auth()->guard('web')->user()->Empresa_id : null,
        'archivos' => auth()->guard('web')->check() ? auth()->guard('web')->user()->Archivos : null,
        'sincronizado' => auth()->guard('web')->check() ? auth()->guard('web')->user()->Sincronizado : null
    ]) !!};
</script>