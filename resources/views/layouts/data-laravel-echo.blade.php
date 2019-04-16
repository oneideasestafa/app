<script type="text/javascript">
    window.Laravel = {!! json_encode([
        'cliente' => auth()->guard('web')->check() ? (string)auth()->guard('web')->user()->_id : null,
        'telefono' => auth()->guard('web')->check() ? (string)auth()->guard('web')->user()->Telefono : null,
        'evento' => auth()->guard('web')->check() ? 'evento' : null
        'empresa' => auth()->guard('web')->check() ? 'empresa' : null
    ]) !!};
</script>