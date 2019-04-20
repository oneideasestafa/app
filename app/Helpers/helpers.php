<?php

use Carbon\Carbon;
use Spatie\OpeningHours\OpeningHours;
use App\Models\MongoDB\Cliente;
use App\Models\MongoDB\ClienteDireccion;
use App\Models\MongoDB\ClienteSucursalFavorito;
use App\Models\MongoDB\ClienteVehiculo;
use App\Models\MongoDB\ClienteTarjeta;
use App\Models\MongoDB\EstatusPedido;
use App\Models\MongoDB\Pais;
use App\Models\MongoDB\Empresa;
use App\Models\MongoDB\Producto;
use App\Models\MongoDB\Valoracion;
use App\Models\MongoDB\Cobranza;
use App\Models\MongoDB\Sucursal;
use App\Models\MongoDB\Venta;
use App\Models\MongoDB\MarcaVehiculo;
use App\Models\MongoDB\ModeloVehiculo;
use App\Models\MongoDB\TipoComercio;
use App\Models\MongoDB\Color;
use App\Models\MongoDB\Logistica;
use App\Models\MongoDB\Reserva;
use MongoDB\BSON\ObjectId;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Mail\MailPedido;
use Illuminate\Support\Arr;

function formatText($string){

    if(valueNull($string)){
        return NULL;
    }else{
        return strtoupper(unaccent(trim($string)));
    }

}

function formatTextFirstCharacterToUpper($string){

    if(valueNull($string)){
        return NULL;
    }else{
        return title_case(strtolower(unaccent(trim($string))));
    }

}

function formatPorcent($number){

    if(valueNull($number)){
        return NULL;
    }else{
        return strtoupper(number_format((float)trim($number), 0, '.', '') . '%');
    }

}

function valueNull($string){

    $text = trim((is_null($string) || empty($string) ? NULL : $string));

    if($text){
        return false;
    }else{
        return true;
    }

}

function clean($text){

    $utf8 = array(
        '/[áàâãªä]/u'   =>   'a',
        '/[ÁÀÂÃÄ]/u'    =>   'A',
        '/[ÍÌÎÏ]/u'     =>   'I',
        '/[íìîï]/u'     =>   'i',
        '/[éèêë]/u'     =>   'e',
        '/[ÉÈÊË]/u'     =>   'E',
        '/[óòôõºö]/u'   =>   'o',
        '/[ÓÒÔÕÖ]/u'    =>   'O',
        '/[úùûü]/u'     =>   'u',
        '/[ÚÙÛÜ]/u'     =>   'U',
        '/ç/'           =>   'c',
        '/Ç/'           =>   'C',
        '/ñ/'           =>   'n',
        '/Ñ/'           =>   'N',
        '/–/'           =>   '-', // UTF-8 hyphen to "normal" hyphen
        '/[’‘‹›‚]/u'    =>   ' ', // Literally a single quote
        '/[“”«»„]/u'    =>   ' ', // Double quote
        '/ /'           =>   ' ', // nonbreaking space (equiv. to 0x160)
    );

    return preg_replace(array_keys($utf8), array_values($utf8), $text);
}

function unaccent($string){

    $string = trim($string);

    $string = str_replace(
        array('á', 'à', 'ä', 'â', 'ª', 'Á', 'À', 'Â', 'Ä'),
        array('a', 'a', 'a', 'a', 'a', 'A', 'A', 'A', 'A'),
        $string
    );

    $string = str_replace(
        array('é', 'è', 'ë', 'ê', 'É', 'È', 'Ê', 'Ë'),
        array('e', 'e', 'e', 'e', 'E', 'E', 'E', 'E'),
        $string
    );

    $string = str_replace(
        array('í', 'ì', 'ï', 'î', 'Í', 'Ì', 'Ï', 'Î'),
        array('i', 'i', 'i', 'i', 'I', 'I', 'I', 'I'),
        $string
    );

    $string = str_replace(
        array('ó', 'ò', 'ö', 'ô', 'Ó', 'Ò', 'Ö', 'Ô'),
        array('o', 'o', 'o', 'o', 'O', 'O', 'O', 'O'),
        $string
    );

    $string = str_replace(
        array('ú', 'ù', 'ü', 'û', 'Ú', 'Ù', 'Û', 'Ü'),
        array('u', 'u', 'u', 'u', 'U', 'U', 'U', 'U'),
        $string
    );

    $string = str_replace(
        array('ç', 'Ç'),
        array('c', 'C',),
        $string
    );

    $string = str_replace(
        array('ñ', 'Ñ'),
        array('Ñ', 'Ñ',),
        $string
    );

    //Esta parte se encarga de eliminar cualquier caracter extraño
    /*$string = str_replace(
        array("\\", "¨", "º", "-", "~",
             "#", "@", "|", "!", "\"",
             "·", "$", "%", "&", "/",
             "(", ")", "?", "'", "¡",
             "¿", "[", "^", "`", "]",
             "+", "}", "{", "¨", "´",
             ">", "< ", ";", ",", ":",
             ".", " "),
        '',
        $string
    );*/

    return $string;

}

function getValueThroughKeyFromObject($key, $object){

    $keys = explode('.', $key);

    if (count($keys) > 1){

        $temp = $keys[0];

        if (isset($object->$temp)){

            unset($keys[0]);

            $newKeys = implode('.', $keys);

            if (gettype($object->$temp) === 'array'){

                return getValueThroughKeyFromArray($newKeys, $object->$temp);
            }

            if (gettype($object->$temp) === 'object'){

                return getValueThroughKeyFromObject($newKeys, $object->$temp);
            }

        }else{
            return FALSE;
        }


    }else{

        if(isset($object->$key)){

            return $object->$key;

        }else{
            return FALSE;
        }
    }
}


function getValueThroughKeyFromArray($key, $array){

    $keys = explode('.', $key);

    if (count($keys) > 1)
    {
        $temp = $keys[0];

        if (isset($array[$temp]))
        {
            unset($keys[0]);

            $newKeys = implode('.', $keys);

            if (gettype($array[$temp]) === 'array')
            {
                return getValueThroughKeyFromArray($newKeys, $array[$temp]);
            }

            if (gettype($array[$temp]) === 'object')
            {
                return getValueThroughKeyFromObject($newKeys, $array[$temp]);
            }
        }
        else
        {
            return FALSE;
        }
    }
    else
    {
        if (isset($array[$key]))
        {
            return $array[$key];
        }
        else
        {
            return FALSE;
        }
    }
}

 function isInTheList($list, $item){

    foreach ($list as $key)
    {
        if ($key === $item)
        {
            return TRUE;
        }
    }

    return FALSE;
 }

 function formatDni($data){

     $pre = explode('-', $data);
     return strtoupper(implode('', $pre));
 }

function humanFileSize($size, $precision = 2) {
    $units = array('B','kB','MB','GB','TB','PB','EB','ZB','YB');
    $step = 1024;
    $i = 0;

    while (($size / $step) > 0.9) {
        $size = $size / $step;
        $i++;
    }

    return round($size, $precision).$units[$i];
}


function group_by($key, $data) {

    $result = array();

    foreach($data as $val) {
        if(array_key_exists($key, $val)){
            $result[$val[$key]][] = $val;
        }else{
            $result[""][] = $val;
        }
    }

    ksort($result);

    return $result;
}

function calcularDistanciaLatLng($lat1, $lng1, $lat2, $lng2, $unit = 'km', $decimals = 1) {
    // Cálculo de la distancia en grados
    $degrees = rad2deg(acos((sin(deg2rad($lat1))*sin(deg2rad($lat2))) + (cos(deg2rad($lat1))*cos(deg2rad($lat2))*cos(deg2rad($lng1-$lng2)))));

    // Conversión de la distancia en grados a la unidad escogida (kilómetros, millas o millas naúticas)
    switch($unit) {
        case 'km':
            $distance = $degrees * 111.13384; // 1 grado = 111.13384 km, basándose en el diametro promedio de la Tierra (12.735 km)
            break;
        case 'mi':
            $distance = $degrees * 69.05482; // 1 grado = 69.05482 millas, basándose en el diametro promedio de la Tierra (7.913,1 millas)
            break;
        case 'nmi':
            $distance =  $degrees * 59.97662; // 1 grado = 59.97662 millas naúticas, basándose en el diametro promedio de la Tierra (6,876.3 millas naúticas)
    }

    return round($distance, $decimals);
}

function sucursalOpen($apertura, $cierre){

    $horaApertura = Carbon::createFromFormat('h:i A', $apertura)->format('H:i');
    $horaCierre   = Carbon::createFromFormat('h:i A', $cierre)->format('H:i');

    $openingHours = OpeningHours::create([
        'monday' => [$horaApertura.'-'.$horaCierre],
        'tuesday' => [$horaApertura.'-'.$horaCierre],
        'wednesday' => [$horaApertura.'-'.$horaCierre],
        'thursday' => [$horaApertura.'-'.$horaCierre],
        'friday' => [$horaApertura.'-'.$horaCierre],
        'saturday' => [$horaApertura.'-'.$horaCierre],
        'sunday' => [$horaApertura.'-'.$horaCierre]
    ]);

    return $openingHours->isOpen();
}

function nextDateOpenSucursal($apertura, $cierre){

    $horaApertura = Carbon::createFromFormat('h:i A', $apertura)->format('H:i');
    $horaCierre   = Carbon::createFromFormat('h:i A', $cierre)->format('H:i');
    $fechaActual = Carbon::now();

    $openingHours = OpeningHours::create([
        'monday' => [$horaApertura.'-'.$horaCierre],
        'tuesday' => [$horaApertura.'-'.$horaCierre],
        'wednesday' => [$horaApertura.'-'.$horaCierre],
        'thursday' => [$horaApertura.'-'.$horaCierre],
        'friday' => [$horaApertura.'-'.$horaCierre],
        'saturday' => [$horaApertura.'-'.$horaCierre],
        'sunday' => [$horaApertura.'-'.$horaCierre]
    ]);

    $nextOpen = $openingHours->nextOpen($fechaActual);

    return $nextOpen;
}

function validateProductoPedido($sesion, $sucursal, $logistica){

    $logi = $sesion['logistica'];
    $suc  = $sesion['sucursalid'];

    if( ($sucursal == $suc) AND ($logistica == $logi) ){
        return true;
    }else{
        return false;
    }

}

function validateProductoEncargo($carrito, $producto){

    foreach($carrito as $c){

        $encargoCart = $c['onlyencargo'];
        $fechaEncargoCart = $c['fechaencargo'];

        $encargoPro = $producto['onlyencargo'];
        $fechaEncargoPro = $producto['fechaencargo'];

        if( ($encargoCart == true) AND ($encargoPro == true) ){

            if($fechaEncargoCart != $fechaEncargoPro){
                return false;
            }
        }

    }

    return true;

}

function sumPriceProductoExtra($arregloData, $cant){

    $sum = 0;

    if(!empty($arregloData)){

        if( is_array($arregloData) AND !empty($arregloData) ){

            foreach ($arregloData as $a){

                $arr = explode("-", $a);
                $sum = (float) $sum + $arr[4];

            }

        }else{

            $arr = explode("-", $arregloData);
            $sum = (float) $arr[4] * $cant;

        }

    }

    return $sum;

}

function checkProductoRepeatPedido($arregloData, $producto){

    foreach ($arregloData as $key => $value){

        $arr = explode("-", $key);

        if($arr[0] == $producto){
            return true;
        }

    }

    return false;

}

function createNumeroPedido(){

    $fecha = Carbon::now();

    $year    = substr($fecha->year, 2);
    $month   = str_pad($fecha->month, 2, '0', STR_PAD_LEFT);
    $day     = str_pad($fecha->day, 2, '0', STR_PAD_LEFT);
    $micro   = str_pad($fecha->micro, 6, '0', STR_PAD_LEFT);

    return $year.$month.$day.$micro;

}

function procesarItemsPedido($cart){

    $result = [];

    if($cart){

        //recorremos el carrito
        foreach ($cart as $value ){

            $unidadmedida = $value['unidadmedida'];

            if($unidadmedida == '5c4871abb3d3f632dfef73fc'){
                $cant = (int) $value['productocantidad'];
            }else if($unidadmedida == '5c48723ad5674c32df1b74ff'){
                $cant = $value['productocantidad'];
            }else if($unidadmedida == '5c6482cade58c52f24306155'){
                $cant = $value['productocantidad'];
            }

            $extra1 = procesarProductoExtra($value['extra1'], $value['cant1']);
            $extra2 = procesarProductoExtra($value['extra2'], $value['cant2']);
            $extra3 = procesarProductoExtra($value['extra3'], $value['cant3']);

            $extras = array_merge($extra1, $extra2, $extra3);

            $result[] = [
                'cantidad' => $cant,
                'productoid' => new \MongoDB\BSON\ObjectId($value['productoid']),
                'precioind' => (float) $value['productoprecio'],
                'preciototalsinextras' => (float) $value['productoprecio'] * (float) $value['productocantidad'],
                'preciototalconextras' => (float) $value['productopreciototal'],
                'precioextras' => $value['productoprecioextras'],
                'precioextra1' => $value['precioextra1'],
                'precioextra2' => $value['precioextra2'],
                'precioextra3' => $value['precioextra3'],
                'aclaraciones' => $value['aclaraciones'],
                'extras' => $extras
            ];
        }

    }

    //devuelvo el resultado en formato json
    return $result;

}

function procesarItemsPedidoCamarero($cart){

    $result = [];

    if($cart){

        //recorremos el carrito
        foreach ($cart as $value ){

            $unidadmedida = $value['unidadmedida'];

            if($unidadmedida == '5c4871abb3d3f632dfef73fc'){
                $cant = (int) $value['productocantidad'];
            }else if($unidadmedida == '5c48723ad5674c32df1b74ff'){
                $cant = $value['productocantidad'];
            }else if($unidadmedida == '5c6482cade58c52f24306155'){
                $cant = $value['productocantidad'];
            }

            $extra1 = procesarProductoExtra($value['extra1'], $value['cant1']);
            $extra2 = procesarProductoExtra($value['extra2'], $value['cant2']);
            $extra3 = procesarProductoExtra($value['extra3'], $value['cant3']);

            $extras = array_merge($extra1, $extra2, $extra3);

            $result[] = [
                'cantidad' => $cant,
                'productoid' => new \MongoDB\BSON\ObjectId($value['productoid']),
                'precioind' => (float) $value['productoprecio'],
                'preciototalsinextras' => (float) $value['productoprecio'] * (float) $value['productocantidad'],
                'preciototalconextras' => (float) $value['productopreciototal'],
                'precioextras' => $value['productoprecioextras'],
                'precioextra1' => $value['precioextra1'],
                'precioextra2' => $value['precioextra2'],
                'precioextra3' => $value['precioextra3'],
                'aclaraciones' => $value['aclaraciones'],
                'extras' => $extras,
                'confirmacion' => $value['confirmacion']
            ];
        }

    }

    //devuelvo el resultado en formato json
    return $result;

}

function procesarProductoExtra($extra, $cant){

    $result = [];

    if(!empty($extra)){

        if( is_array($extra) AND !empty($extra) ){

            foreach ($extra as $e){

                $arr = explode("-", $e);

                $result[] = [
                    'cantidad' => (int) $cant,
                    'producto' => $arr[2],
                    'precio'   => (float) $arr[4]
                ];

            }

        }else{

            $arr = explode("-", $extra);

            $result[] = [
                'cantidad' => (int) $cant,
                'producto' => $arr[2],
                'precio'   => (float) $arr[4]
            ];
        }

    }

    return $result;

}

function procesarImporteTotal($productos){

    $sum = 0;

    if($productos){

        foreach ($productos as $pro){
            $sum = (float) $sum + (float) $pro['preciototalconextras'];
        }
    }

    return $sum;

}

function distanceCalculation($point1_lat, $point1_long, $point2_lat, $point2_long, $unit = 'km', $decimals = 2) {
        // Cálculo de la distancia en grados
        $degrees = rad2deg(acos((sin(deg2rad($point1_lat))*sin(deg2rad($point2_lat))) + (cos(deg2rad($point1_lat))*cos(deg2rad($point2_lat))*cos(deg2rad($point1_long-$point2_long)))));
     
        // Conversión de la distancia en grados a la unidad escogida (kilómetros, millas o millas naúticas)
        switch($unit) {
            case 'km':
                $distance = $degrees * 111.13384; // 1 grado = 111.13384 km, basándose en el diametro promedio de la Tierra (12.735 km)
                break;
            case 'mi':
                $distance = $degrees * 69.05482; // 1 grado = 69.05482 millas, basándose en el diametro promedio de la Tierra (7.913,1 millas)
                break;
            case 'nmi':
                $distance =  $degrees * 59.97662; // 1 grado = 59.97662 millas naúticas, basándose en el diametro promedio de la Tierra (6,876.3 millas naúticas)
        }
        return round($distance, $decimals);
    }

function savePedidoEfectivo($logistica, $data){

    $result = false;

    if($logistica == 'delivery'){

        //procedo a guardarlos en la bd
        $registro = new \App\Models\MongoDB\Venta;
        $registro->NumeroOrden        = createNumeroPedido();
        $registro->Cliente_id         = $data['cliente'];
        $registro->Empresa_id         = new \MongoDB\BSON\ObjectId($data['empresa']['empresaid']);
        $registro->Sucursal_id        = new \MongoDB\BSON\ObjectId($data['empresa']['sucursalid']);
        $registro->FechaPedido        = Carbon::now();
        $registro->FechaEntrega       = '';
        $registro->FechaCancelado     = '';
        $registro->Items              = $data['items'];
        $registro->ImporteTotal       = (float)($data['importe'] + $data['empresa']['sucursalpreciodelivery']);
        $registro->PrecioEnvio        = (float) $data['empresa']['sucursalpreciodelivery'];
        $registro->EfectivoPago       = (float) $data['cash'];
        $registro->DireccionEnvio     = new \MongoDB\BSON\ObjectId($data['direccion']);
        $registro->MetodoPago         = new \MongoDB\BSON\ObjectId($data['formapago']);
        $registro->EstadoPedido       = $data['estatus'];
        $registro->Logistica_id       = new \MongoDB\BSON\ObjectId($data['logisticaid']);
        $registro->Logistica          = $data['logistica'];
        $registro->Borrado            = $data['borrado'];
        $registro->Activo             = $data['activo'];
        $registro->PagoIDMercadoPago  = '';
        $registro->SesionEmpresa      = $data['sesionempresa'];
        $registro->SesionCart         = $data['sesioncart'];
        $registro->Encargo            = $data['encargo'];
        $registro->FechaEncargo       = $data['posdatado'] ? $data['fechaencargo'] : Carbon::createFromFormat('d/m/Y h:i A', $data['fechaencargo']);
        $registro->TipoPedido         = $data['tipoencargo'];
        $registro->Posdatado          = $data['posdatado'];
        $registro->Repartidor_id      = null;
        $registro->EstadoRepartidor   = new ObjectId('5ca9351ead40cd1f78458861');

    }else if($logistica == 'retiro'){

        //procedo a guardarlos en la bd
        $registro = new \App\Models\MongoDB\Venta;
        $registro->NumeroOrden        = createNumeroPedido();
        $registro->Cliente_id         = $data['cliente'];
        $registro->Empresa_id         = new \MongoDB\BSON\ObjectId($data['empresa']['empresaid']);
        $registro->Sucursal_id        = new \MongoDB\BSON\ObjectId($data['empresa']['sucursalid']);
        $registro->FechaPedido        = Carbon::now();
        $registro->FechaEntrega       = '';
        $registro->FechaCancelado     = '';
        $registro->Items              = $data['items'];
        $registro->ImporteTotal       = (float)($data['importe']);
        //$registro->PrecioEnvio        = (float) $data['empresa']['sucursalpreciodelivery'];
        //$registro->EfectivoPago       = (float) $data['cash'];
        //$registro->DireccionEnvio     = new \MongoDB\BSON\ObjectId($data['direccion']);
        $registro->MetodoPago         = new \MongoDB\BSON\ObjectId($data['formapago']);
        $registro->EstadoPedido       = $data['estatus'];
        $registro->Logistica_id       = new \MongoDB\BSON\ObjectId($data['logisticaid']);
        $registro->Logistica          = $data['logistica'];
        $registro->Borrado            = $data['borrado'];
        $registro->Activo             = $data['activo'];
        $registro->PagoIDMercadoPago  = '';
        $registro->SesionEmpresa      = $data['sesionempresa'];
        $registro->SesionCart         = $data['sesioncart'];
        $registro->Encargo            = $data['encargo'];
        $registro->FechaEncargo       = $data['posdatado'] ? $data['fechaencargo'] : Carbon::createFromFormat('d/m/Y h:i A', $data['fechaencargo']);
        $registro->TipoPedido         = $data['tipoencargo'];
        $registro->Posdatado          = $data['posdatado'];

    }else if($logistica == 'carhop'){

        //procedo a guardarlos en la bd
        $registro = new \App\Models\MongoDB\Venta;
        $registro->NumeroOrden        = createNumeroPedido();
        $registro->Cliente_id         = $data['cliente'];
        $registro->Empresa_id         = new \MongoDB\BSON\ObjectId($data['empresa']['empresaid']);
        $registro->Sucursal_id        = new \MongoDB\BSON\ObjectId($data['empresa']['sucursalid']);
        $registro->FechaPedido        = Carbon::now();
        $registro->FechaEntrega       = '';
        $registro->FechaCancelado     = '';
        $registro->Items              = $data['items'];
        $registro->ImporteTotal       = (float)($data['importe']);
        //$registro->PrecioEnvio        = (float) $data['empresa']['sucursalpreciodelivery'];
        //$registro->EfectivoPago       = (float) $data['cash'];
        //$registro->DireccionEnvio     = new \MongoDB\BSON\ObjectId($data['direccion']);
        $registro->MetodoPago         = new \MongoDB\BSON\ObjectId($data['formapago']);
        $registro->EstadoPedido       = $data['estatus'];
        $registro->Logistica_id       = new \MongoDB\BSON\ObjectId($data['logisticaid']);
        $registro->Logistica          = $data['logistica'];
        $registro->Borrado            = $data['borrado'];
        $registro->Activo             = $data['activo'];
        $registro->PagoIDMercadoPago  = '';
        $registro->Vehiculo           = new \MongoDB\BSON\ObjectId($data['vehiculo']);
        $registro->SesionEmpresa      = $data['sesionempresa'];
        $registro->SesionCart         = $data['sesioncart'];
        $registro->Encargo            = $data['encargo'];
        $registro->FechaEncargo       = $data['posdatado'] ? $data['fechaencargo'] : Carbon::createFromFormat('d/m/Y h:i A', $data['fechaencargo']);
        $registro->TipoPedido         = $data['tipoencargo'];
        $registro->Posdatado          = $data['posdatado'];
        $registro->Carhop          = $data['carhop'];

    }

    //verifico si fue exitoso el insert en la bd
    if($registro->save()){

        restarStock($data['items']);

        //disparo evento
        event(new \App\Events\PedidoEvent( dataPedidoEvent($registro->id) ) );

        $dataMailPedido = dataMailPedido($registro->id, 'pedir');
        //le envio un correo al cliente con la cancelacion
        Mail::to($dataMailPedido['mails'])->queue(new MailPedido($dataMailPedido));

        return $result = true;
    }else{
        return $result;
    }

}

function savePedidoTarjeta($logistica, $data){

    $result = [];

    if($logistica == 'delivery'){

        $orden = createNumeroPedido();

        //procedo a guardarlos en la bd
        $registro = new \App\Models\MongoDB\Venta;
        $registro->NumeroOrden        = $orden;
        $registro->Cliente_id         = $data['cliente'];
        $registro->Empresa_id         = new \MongoDB\BSON\ObjectId($data['empresa']['empresaid']);
        $registro->Sucursal_id        = new \MongoDB\BSON\ObjectId($data['empresa']['sucursalid']);
        $registro->FechaPedido        = Carbon::now();
        $registro->FechaEntrega       = '';
        $registro->FechaCancelado     = '';
        $registro->Items              = $data['items'];
        $registro->ImporteTotal       = (float)($data['importe'] + $data['empresa']['sucursalpreciodelivery']);
        $registro->PrecioEnvio        = (float) $data['empresa']['sucursalpreciodelivery'];
        $registro->EfectivoPago       = (float) $data['cash'];
        $registro->DireccionEnvio     = new \MongoDB\BSON\ObjectId($data['direccion']);
        $registro->MetodoPago         = new \MongoDB\BSON\ObjectId($data['formapago']);;
        $registro->EstadoPedido       = $data['estatus'];
        $registro->Logistica_id       = new \MongoDB\BSON\ObjectId($data['logisticaid']);
        $registro->Logistica          = $data['logistica'];
        $registro->Borrado            = $data['borrado'];
        $registro->Activo             = $data['activo'];
        $registro->PagoIDMercadoPago  = '';
        $registro->SesionEmpresa      = $data['sesionempresa'];
        $registro->SesionCart         = $data['sesioncart'];
        $registro->Encargo            = $data['encargo'];
        $registro->FechaEncargo       = $data['posdatado'] ? $data['fechaencargo'] : Carbon::createFromFormat('d/m/Y h:i A', $data['fechaencargo']);
        $registro->TipoPedido         = $data['tipoencargo'];
        $registro->Posdatado          = $data['posdatado'];
        $registro->Repartidor_id      = null;
        $registro->EstadoRepartidor   = new ObjectId('5ca9351ead40cd1f78458861');

    }else if($logistica == 'retiro'){

        $orden = createNumeroPedido();

        //procedo a guardarlos en la bd
        $registro = new \App\Models\MongoDB\Venta;
        $registro->NumeroOrden        = $orden;
        $registro->Cliente_id         = $data['cliente'];
        $registro->Empresa_id         = new \MongoDB\BSON\ObjectId($data['empresa']['empresaid']);
        $registro->Sucursal_id        = new \MongoDB\BSON\ObjectId($data['empresa']['sucursalid']);
        $registro->FechaPedido        = Carbon::now();
        $registro->FechaEntrega       = '';
        $registro->FechaCancelado     = '';
        $registro->Items              = $data['items'];
        $registro->ImporteTotal       = (float)($data['importe']);
        //$registro->PrecioEnvio        = (float) $data['empresa']['sucursalpreciodelivery'];
        //$registro->EfectivoPago       = (float) $data['cash'];
        //$registro->DireccionEnvio     = new \MongoDB\BSON\ObjectId($data['direccion']);
        $registro->MetodoPago         = new \MongoDB\BSON\ObjectId($data['formapago']);;
        $registro->EstadoPedido       = $data['estatus'];
        $registro->Logistica_id       = new \MongoDB\BSON\ObjectId($data['logisticaid']);
        $registro->Logistica          = $data['logistica'];
        $registro->Borrado            = $data['borrado'];
        $registro->Activo             = $data['activo'];
        $registro->PagoIDMercadoPago  = '';
        $registro->SesionEmpresa      = $data['sesionempresa'];
        $registro->SesionCart         = $data['sesioncart'];
        $registro->Encargo            = $data['encargo'];
        $registro->FechaEncargo       = $data['posdatado'] ? $data['fechaencargo'] : Carbon::createFromFormat('d/m/Y h:i A', $data['fechaencargo']);
        $registro->TipoPedido         = $data['tipoencargo'];
        $registro->Posdatado          = $data['posdatado'];

    }else if($logistica == 'carhop'){

        $orden = createNumeroPedido();

        //procedo a guardarlos en la bd
        $registro = new \App\Models\MongoDB\Venta;
        $registro->NumeroOrden        = $orden;
        $registro->Cliente_id         = $data['cliente'];
        $registro->Empresa_id         = new \MongoDB\BSON\ObjectId($data['empresa']['empresaid']);
        $registro->Sucursal_id        = new \MongoDB\BSON\ObjectId($data['empresa']['sucursalid']);
        $registro->FechaPedido        = Carbon::now();
        $registro->FechaEntrega       = '';
        $registro->FechaCancelado     = '';
        $registro->Items              = $data['items'];
        $registro->ImporteTotal       = (float)($data['importe']);
        //$registro->PrecioEnvio        = (float) $data['empresa']['sucursalpreciodelivery'];
        //$registro->EfectivoPago       = (float) $data['cash'];
        //$registro->DireccionEnvio     = new \MongoDB\BSON\ObjectId($data['direccion']);
        $registro->MetodoPago         = new \MongoDB\BSON\ObjectId($data['formapago']);;
        $registro->EstadoPedido       = $data['estatus'];
        $registro->Logistica_id       = new \MongoDB\BSON\ObjectId($data['logisticaid']);
        $registro->Logistica          = $data['logistica'];
        $registro->Borrado            = $data['borrado'];
        $registro->Activo             = $data['activo'];
        $registro->PagoIDMercadoPago  = '';
        $registro->Vehiculo           = new \MongoDB\BSON\ObjectId($data['vehiculo']);
        $registro->SesionEmpresa      = $data['sesionempresa'];
        $registro->SesionCart         = $data['sesioncart'];
        $registro->Encargo            = $data['encargo'];
        $registro->FechaEncargo       = $data['posdatado'] ? $data['fechaencargo'] : Carbon::createFromFormat('d/m/Y h:i A', $data['fechaencargo']);
        $registro->TipoPedido         = $data['tipoencargo'];
        $registro->Posdatado          = $data['posdatado'];
        $registro->Carhop          = $data['carhop'];

    }

    //verifico si fue exitoso el insert en la bd
    if($registro->save()){

        restarStock($data['items']);

        //disparo evento
        event(new \App\Events\PedidoEvent( dataPedidoEvent($registro->id) ) );

        $dataMailPedido = dataMailPedido($registro->id, 'pedir');
        //le envio un correo al cliente con la cancelacion
        Mail::to($dataMailPedido['mails'])->queue(new MailPedido($dataMailPedido));

        return $result = ['exito' => true, 'orden' => $orden, 'id' =>$registro->_id];
    }else{
        return $result = ['exito' => false, 'orden' => $orden];
    }

}


function transbankSend($data, $emp, $suc){

    //obtengo la url de la api transbank
    $transbank_url = config('app.transbank-url');

    $client = new \GuzzleHttp\Client();
    $response = $client->request('POST', $transbank_url.'/registration', [
        'form_params' => [
            'comercio' => getIDComercioTransbankSinPedido($emp, $suc),
            'mail' => $data,
            'user' => $data,
            'url'  => route('tarjeta-add-post'),
            'tipo' => getTipoTransbankSinPedido($emp, $suc)
        ]
    ]);

    $response = $response->getBody()->getContents();

    $a = json_decode($response);

    return $a->data->url_form;
}

function transbankPayment($tarjeta, $request){

    //obtengo la url de la api transbank
    $transbank_url = config('app.transbank-url');

    $correo = Auth::user()->Correo;

    $confirmacion = session()->get('confirmacion');

    $guardado = savePedidoTarjeta($confirmacion['logistica'], $confirmacion);

    if($guardado['exito']){

        $client = new \GuzzleHttp\Client();
        $response = $client->request('POST', $transbank_url.'/payments', [
            'form_params' => [
                'comercio' => getIDComercioTransbank($guardado['id']),
                'monto' => $confirmacion['importe'],
                'orden' => $guardado['orden'],
                'mail' => $correo,
                'token'  => $tarjeta->TokenUser,
                'tipo' => getTipoTransbank($guardado['id'])
            ]
        ]);

        $response = $response->getBody()->getContents();

        $resultPay = json_decode($response);

        if($resultPay->code == 200){

            $request->session()->forget('cart');
            $request->session()->forget('empresa');
            $request->session()->forget('confirmacion');

            return ['exito' => true, 'msj' => 'Pedido realizado exitosamente'];

        }else{

            App\Models\MongoDB\Venta::destroy($guardado['id']);

            return ['exito' => false, 'msj' => $resultPay->msj];

        }

    }else{

        return ['exito' => false, 'msj' => 'Error al guardar pedido. Consulte al administrador.'];

    }


}


function regresarPago($orden, $pedido){

    //obtengo la url de la api transbank
    $transbank_url = config('app.transbank-url');

    $client = new \GuzzleHttp\Client();
    $response = $client->request('POST', $transbank_url.'/reverse', [
        'form_params' => [
            'comercio' => getIDComercioTransbank($pedido),
            'orden' => $orden,
            'tipo' => getTipoTransbank($pedido)
        ]
    ]);

    $response = $response->getBody()->getContents();

    $result = json_decode($response);

    if($result->code == 200){

        return ['exito' => true, 'msj' => 'exito'];

    }else{

        return ['exito' => false, 'msj' => 'Error al procesar reversa del dinero. Consulte al administrador.'];

    }

}

function regresarPagoMP($orden, $pedido){

    $venta = Venta::find($pedido);
    $empresaid = (string)$venta->Empresa_id;
    $sucursalid = (string)$venta->Sucursal_id;
    $payment_id = $venta->PagoIDMercadoPago;

    $credencialesMP = getAccessTokenMercadoPago($empresaid, $sucursalid);

    //obtengo la url de la api de mercado pag
    $mercadopago_url_api = config('app.mercado-pago-url-api');

    try{

        $client = new \GuzzleHttp\Client();
        $response = $client->request('POST', $mercadopago_url_api.'/payments/'.$payment_id.'/refunds', [
            'query' => [
                'access_token' => $credencialesMP['accessToken']
            ]
        ]);

    }catch (\GuzzleHttp\Exception\ClientException $e){

        return ['exito' => false, 'msj' => 'fallido'];
    }

    //dd($response);

    return ['exito' => true, 'msj' => 'exito'];

}

function dataPedidoEvent($id){

    $result = '';

    $pedidos = Venta::borrado(false)->activo(true)->where('_id', new \MongoDB\BSON\ObjectId($id) )->get();

    if($pedidos){

        foreach ($pedidos as $p){

            $items = [];

            if($p->Items){

                foreach ($p->Items as $i){

                    $extras = [];

                    if( !empty($i['extras']) ){

                        foreach ($i['extras'] as $e){

                            $extras[] = [
                                'cantidad' => $e['cantidad'],
                                'precio' => $e['precio'],
                                'productoid' => Producto::find($e['producto'])->_id,
                                'producto' => Producto::find($e['producto'])->Nombre,
                                'idextrarandom' => str_random(20)
                            ];
                        }
                    }

                    $items[] = [
                        'cantidad' => $i['cantidad'],
                        'productoid' => $i['productoid'],
                        'producto' => Producto::find($i['productoid'])->Nombre,
                        'precioind' => $i['precioind'],
                        'preciototalsinextras' => $i['preciototalsinextras'],
                        'preciototalconextras' => $i['preciototalconextras'],
                        'precioextras' => $i['precioextras'],
                        'precioextra1' => $i['precioextra1'],
                        'precioextra2' => $i['precioextra2'],
                        'precioextra3' => $i['precioextra3'],
                        'aclaraciones' => $i['aclaraciones'],
                        'extras' => $extras,
                        'iditemrandom' => str_random(20)
                    ];

                }

            }

            $result = [
                'id' => $p->_id,
                'orden' => $p->NumeroOrden,
                'clienteid' => $p->Cliente_id,
                'clientenombre' => Cliente::find($p->Cliente_id)->Nombre.' '.Cliente::find($p->Cliente_id)->Apellido,
                'clientecorreo' => Cliente::find($p->Cliente_id)->Correo,
                'clientedireccion' => Cliente::find($p->Cliente_id)->Direccion,
                'clientetelefono' => Cliente::find($p->Cliente_id)->Telefono,
                'clientepais' => empty(Cliente::find($p->Cliente_id)->Pais_id) ? '' : Pais::find(Cliente::find($p->Cliente_id)->Pais_id)->Pais,
                'empresaid' => $p->Empresa_id,
                'empresa' => Empresa::find($p->Empresa_id)->Nombre,
                'empresacuitrut' => Empresa::find($p->Empresa_id)->Cuit_rut,
                'empresacorreo' => Empresa::find($p->Empresa_id)->Correo,
                'empresatelefono' => Empresa::find($p->Empresa_id)->Telefono,
                'empresadireccion' => Empresa::find($p->Empresa_id)->Direccion,
                'sucursalid' => $p->Sucursal_id,
                'sucursal' => Sucursal::find($p->Sucursal_id)->Nombre,
                'sucursaltelefono' => Sucursal::find($p->Sucursal_id)->Telefono,
                'sucursaldireccion' => Sucursal::find($p->Sucursal_id)->Direccion,
                'fechapedido' => $p->FechaPedido->format('d/m/Y h:i A'),
                'fechacortapedido' => $p->FechaPedido->format('d/m/Y'),
                'horapedido' => $p->FechaPedido->format('h:i A'),
                'importetotal' => $p->ImporteTotal,
                'formapago' => (string)$p->MetodoPago,
                'formapagonombre' => Cobranza::find($p->MetodoPago)->Nombre,
                'logistica' => $p->Logistica,
                'estado' => EstatusPedido::find($p->EstadoPedido)->Nombre,
                'color' => EstatusPedido::find($p->EstadoPedido)->Color,
                'precioenvio' => empty($p->PrecioEnvio) ? '' : $p->PrecioEnvio,
                'efectivopago' => isset($p->EfectivoPago) ? (float) $p->EfectivoPago : '',
                'direccionenviopais' => empty($p->DireccionEnvio) ? '' : ClienteDireccion::find($p->DireccionEnvio)->Pais,
                'direccionenviociudad' => empty($p->DireccionEnvio) ? '' : ClienteDireccion::find($p->DireccionEnvio)->Ciudad,
                'direccionenviocalle' => empty($p->DireccionEnvio) ? '' : ClienteDireccion::find($p->DireccionEnvio)->Calle,
                'direccionenviocomuna' => empty($p->DireccionEnvio) ? '' : ClienteDireccion::find($p->DireccionEnvio)->Comuna,
                'direccionenvionumero' => empty($p->DireccionEnvio) ? '' : ClienteDireccion::find($p->DireccionEnvio)->Numero,
                'direccionenviocasa' => empty($p->DireccionEnvio) ? '' : ClienteDireccion::find($p->DireccionEnvio)->CasaDepartamento,
                'vehiculotipo' => empty($p->Vehiculo) ? '' : ClienteVehiculo::find($p->Vehiculo)->Tipo,
                'vehiculomarca' => empty($p->Vehiculo) ? '' : MarcaVehiculo::find(ClienteVehiculo::find($p->Vehiculo)->Marca_id)->Marca,
                'vehiculomodelo' => empty($p->Vehiculo) ? '' : ModeloVehiculo::find(ClienteVehiculo::find($p->Vehiculo)->Modelo_id)->Modelo,
                'vehiculocolor' => empty($p->Vehiculo) ? '' : Color::find(ClienteVehiculo::find($p->Vehiculo)->Color_id)->Color,
                'vehiculopatente' => empty($p->Vehiculo) ? '' : ClienteVehiculo::find($p->Vehiculo)->Patente,
                'items' => $items

            ];

        }


    }

    return $result;

}

function showLogistica($logisticas, $separador){

    $log = [];

    foreach ($logisticas as $l){

        $log[] = \App\Models\MongoDB\Logistica::find((string) $l)->Nombre;
    }

    sort($log);

    return implode($separador, $log);

}

function validateStockProductosRepetirPedido($productos){

    if($productos){

        foreach( $productos as $pro) {

            $cantidad = 0;
            $stock = 0;

            $productoid = (string) $pro['productoid'];
            $cantidad   = (int)$pro['cantidad'];

            $productoDB = Producto::find($productoid);
            $stock = (int)$productoDB->Stock;

            if( ($stock - $cantidad) < 0 ){
                return false;
            }

        }

    }

    return true;

}


function generateAlertaNotificacion($pedidoid, $tiponotificacion){

    $clienteid = Auth::user()->_id;

    $pedido = Venta::find($pedidoid);

    //procedo a guardarlos en la bd
    $registro = new \App\Models\MongoDB\Notificacion;
    $registro->Venta_id            = new ObjectId($pedidoid);
    $registro->Cliente_id          = new ObjectId($clienteid);
    $registro->Empresa_id          = new ObjectId($pedido->Empresa_id);
    $registro->Sucursal_id         = new ObjectId($pedido->Sucursal_id);
    $registro->TipoNotificacion_id = new ObjectId($tiponotificacion);
    $registro->FechaAlerta         = Carbon::now();
    $registro->Borrado             = false;
    $registro->Activo              = true;

    //verifico si fue exitoso el insert en la bd
    if($registro->save()){

        //disparo evento
        event(new \App\Events\AlertaEvent('Alerta generada') );

        return true;
    }else{
        return false;
    }

}
function generarValoracion($pedido,$data){

    $clienteid = Auth::user()->_id;


    //procedo a guardarlos en la bd
    $registro = new \App\Models\MongoDB\Valoracion;
    //$registro->Venta_id            = new ObjectId($pedido->_id);
    $registro->Mesa_id             = new ObjectId($pedido->Mesa_id);
    $registro->Cliente_id          = new ObjectId($clienteid);
    $registro->Empresa_id          = new ObjectId($pedido->Empresa_id);
    $registro->Sucursal_id         = new ObjectId($pedido->Sucursal_id);
    $registro->Valoracion=$data['estrellas'];
    $registro->Comentario=$data['resena'];
    $registro->Borrado             = false;
    $registro->Activo              = true;

    //verifico si fue exitoso el insert en la bd
    if($registro->save()){
        return true;
    }else{
        return false;
    }

}

function generateAlertaCamareroNotificacion($mesaid, $tiponotificacion){

    $clienteid = Auth::guard('usuarios')->user()->_id;

    if($tiponotificacion == '5c668d70de58c52f24306158'){
        $pedido = \App\Models\MongoDB\Venta::find($mesaid);
    }else{
        $pedido = \App\Models\MongoDB\MesaPedido::find($mesaid);
    }

    //procedo a guardarlos en la bd
    $registro = new \App\Models\MongoDB\Notificacion;
    //$registro->Venta_id            = new ObjectId($pedido->_id);
    $registro->Mesa_id             = new ObjectId($pedido->Mesa_id);
    $registro->Cliente_id          = new ObjectId($clienteid);
    $registro->Empresa_id          = new ObjectId($pedido->Empresa_id);
    $registro->Sucursal_id         = new ObjectId($pedido->Sucursal_id);
    $registro->TipoNotificacion_id = new ObjectId($tiponotificacion);
    $registro->FechaAlerta         = Carbon::now();
    $registro->Borrado             = false;
    $registro->Activo              = true;

    //verifico si fue exitoso el insert en la bd
    if($registro->save()){

        //disparo evento
        event(new \App\Events\AlertaCamareroEvent('Alerta generada') );

        return true;
    }else{
        return false;
    }

}

function generateAlertaComensalNotificacion($mesaid, $tiponotificacion){

    $clienteid = Auth::user()->_id;

    if($tiponotificacion == '5c668d70de58c52f24306158'){
        $pedido = \App\Models\MongoDB\Venta::find($mesaid);
    }else{
        $pedido = \App\Models\MongoDB\MesaPedido::find($mesaid);
    }

    //procedo a guardarlos en la bd
    $registro = new \App\Models\MongoDB\Notificacion;
    //$registro->Venta_id            = new ObjectId($pedido->_id);
    $registro->Mesa_id             = new ObjectId($pedido->Mesa_id);
    $registro->Cliente_id          = new ObjectId($clienteid);
    $registro->Empresa_id          = new ObjectId($pedido->Empresa_id);
    $registro->Sucursal_id         = new ObjectId($pedido->Sucursal_id);
    $registro->TipoNotificacion_id = new ObjectId($tiponotificacion);
    $registro->FechaAlerta         = Carbon::now();
    $registro->Borrado             = false;
    $registro->Activo              = true;

    //verifico si fue exitoso el insert en la bd
    if($registro->save()){

        //disparo evento
        event(new \App\Events\AlertaCamareroEvent('Alerta generada') );

        return true;
    }else{
        return false;
    }

}

function generateAlertaMensaje($pedidoid, $tiponotificacion,$texto,$rol){

    $clienteid = Auth::user()->_id;

    $pedido = Venta::find($pedidoid);
    if(!$pedido){
        $pedido = Reserva::find($pedidoid);
    }
    //procedo a guardarlos en la bd
    $registro = new \App\Models\MongoDB\Mensaje;
    $registro->Venta_id            = new ObjectId($pedidoid);
    $registro->Cliente_id          = new ObjectId($clienteid);
    $registro->Empresa_id          = new ObjectId($pedido->Empresa_id);
    $registro->Sucursal_id         = new ObjectId($pedido->Sucursal_id);
    $registro->TipoNotificacion_id = new ObjectId($tiponotificacion);
    $registro->TipoMensaje_id = new ObjectId("5c506b1382ead01ea4fce73a");
    $registro->Texto = $texto;
    $registro->Autor = $clienteid;
    $registro->FechaAlerta         = Carbon::now();
    $registro->Borrado             = false;
    $registro->Activo              = true;
    $registro->Leido              = false;
    $registro->Logistica          = $pedido->Logistica;

    //verifico si fue exitoso el insert en la bd
    if($registro->save()){

        //disparo evento
        event(new \App\Events\AlertaMensajeEvent($texto,(string)$pedido->Cliente_id,$rol,$pedidoid,$pedido->Logistica) );

        return true;
    }else{
        return false;
    }

}
function generateAlertaMensajeSoporte( $tiponotificacion,$texto,$rol){

    $clienteid = Auth::user()->_id;

    //procedo a guardarlos en la bd
    $registro = new \App\Models\MongoDB\MensajeSoporte;
    $registro->Cliente_id          = new ObjectId($clienteid);
    $registro->TipoNotificacion_id = new ObjectId($tiponotificacion);
    $registro->TipoMensaje_id = new ObjectId("5c506b1382ead01ea4fce73a");
    $registro->Texto = $texto;
    $registro->Autor = $clienteid;
    $registro->FechaAlerta         = Carbon::now();
    $registro->Borrado             = false;
    $registro->Activo              = true;
    $registro->Leido              = false;

    //verifico si fue exitoso el insert en la bd
    if($registro->save()){

        //disparo evento
        event(new \App\Events\AlertaMensajeSoporteEvent($texto,(string)$clienteid,$rol,'','') );

        return true;
    }else{
        return false;
    }

}
function regresarStock($productos){

    if($productos){

        foreach( $productos as $pro) {

            $cantidad = 0;
            $productoDB = '';
            $productoid = '';

            $productoid = (string) $pro['productoid'];
            $cantidad   = (int)$pro['cantidad'];

            $productoDB = Producto::find($productoid);
            $productoDB->Stock =  (string) ( ( (int) $productoDB->Stock ) + ($cantidad) );
            $productoDB->save();

        }

        return true;

    }

    return false;

}

function restarStock($productos){

    if($productos){

        foreach( $productos as $pro) {

            $cantidad = 0;
            $productoDB = '';
            $productoid = '';

            $productoid = (string) $pro['productoid'];
            $cantidad   = (int)$pro['cantidad'];

            $productoDB = Producto::find($productoid);
            $productoDB->Stock =  (string) ( ( (int) $productoDB->Stock ) - ($cantidad) );
            $productoDB->save();

        }

        return true;

    }

    return false;

}

function clonarVentaCancelacion($pedido){

    $p = Venta::find($pedido);
    $importe = (float)$p->ImporteTotal;
    $new = $p->replicate();
    $new->ImporteTotal = (float)($importe * -1);

    if($new->save()){
        return true;
    }else{
        return false;
    }

}


function getTipoTransbank($pedido){

    $venta = Venta::find($pedido);
    $empresaid = $venta->Empresa_id;
    $sucursalid = $venta->Sucursal_id;

    $emp = \App\Models\MongoDB\Empresa::find($empresaid);
    $suc = \App\Models\MongoDB\Sucursal::find($sucursalid);

    if( (!empty($suc->CodigoComercioProductivo)) AND (!empty($suc->PrivateKey)) AND (!empty($suc->PublicKey)) ){
        return 's';
    }else if( (!empty($emp->CodigoComercioProductivo)) AND (!empty($emp->PrivateKey)) AND (!empty($emp->PublicKey))){
        return 'e';
    }else{
        return 'e';
    }

}

function getTipoTransbankSinPedido($empresa, $sucursal){

    $empresaid = $empresa;
    $sucursalid = $sucursal;

    $emp = \App\Models\MongoDB\Empresa::find($empresaid);
    $suc = \App\Models\MongoDB\Sucursal::find($sucursalid);

    if( (!empty($suc->CodigoComercioProductivo)) AND (!empty($suc->PrivateKey)) AND (!empty($suc->PublicKey)) ){
        return 's';
    }else if( (!empty($emp->CodigoComercioProductivo)) AND (!empty($emp->PrivateKey)) AND (!empty($emp->PublicKey))){
        return 'e';
    }else{
        return 'e';
    }

}

function getIDComercioTransbank($pedido){

    $venta = Venta::find($pedido);
    $empresaid = $venta->Empresa_id;
    $sucursalid = $venta->Sucursal_id;

    $emp = \App\Models\MongoDB\Empresa::find($empresaid);
    $suc = \App\Models\MongoDB\Sucursal::find($sucursalid);

    if( (!empty($suc->CodigoComercioProductivo)) AND (!empty($suc->PrivateKey)) AND (!empty($suc->PublicKey)) ){
        return (string)$sucursalid;
    }else if( (!empty($emp->CodigoComercioProductivo)) AND (!empty($emp->PrivateKey)) AND (!empty($emp->PublicKey))){
        return (string)$empresaid;
    }else{
        return (string)$empresaid;
    }

}

function getIDComercioTransbankSinPedido($empresa, $sucursal){

    $empresaid = $empresa;
    $sucursalid = $sucursal;

    $emp = \App\Models\MongoDB\Empresa::find($empresaid);
    $suc = \App\Models\MongoDB\Sucursal::find($sucursalid);

    if( (!empty($suc->CodigoComercioProductivo)) AND (!empty($suc->PrivateKey)) AND (!empty($suc->PublicKey)) ){
        return (string)$sucursalid;
    }else if( (!empty($emp->CodigoComercioProductivo)) AND (!empty($emp->PrivateKey)) AND (!empty($emp->PublicKey))){
        return (string)$empresaid;
    }else{
        return (string)$empresaid;
    }

}

function checkTransbank($empresa, $sucursal){

    $empresaid = $empresa;
    $sucursalid = $sucursal;

    $emp = \App\Models\MongoDB\Empresa::find($empresaid);
    $suc = \App\Models\MongoDB\Sucursal::find($sucursalid);

    if( (!empty($suc->CodigoComercioProductivo)) AND (!empty($suc->PrivateKey)) AND (!empty($suc->PublicKey)) ){
        return true;
    }else if( (!empty($emp->CodigoComercioProductivo)) AND (!empty($emp->PrivateKey)) AND (!empty($emp->PublicKey))){
        return true;
    }else{
        return false;
    }

}

function checkMercadoPago($empresa, $sucursal){

    $empresaid = $empresa;
    $sucursalid = $sucursal;

    $emp = \App\Models\MongoDB\Empresa::find($empresaid);
    $suc = \App\Models\MongoDB\Sucursal::find($sucursalid);

    if( (!empty($suc->MercadoPagoSecretID)) AND (!empty($suc->MercadoPagoClientID)) ) {
        return true;
    }else if( (!empty($emp->MercadoPagoSecretID)) AND (!empty($emp->MercadoPagoClientID))  ){
        return true;
    }else{
        return false;
    }

}

function getCredencialesMercadoPago($empresa, $sucursal){

    $empresaid = $empresa;
    $sucursalid = $sucursal;

    $emp = \App\Models\MongoDB\Empresa::find($empresaid);
    $suc = \App\Models\MongoDB\Sucursal::find($sucursalid);

    if( (!empty($suc->MercadoPagoSecretID)) AND (!empty($suc->MercadoPagoClientID)) ) {

        return [
            'clientID' => $suc->MercadoPagoClientID,
            'secretID' => $suc->MercadoPagoSecretID
        ];

    }else if( (!empty($emp->MercadoPagoSecretID)) AND (!empty($emp->MercadoPagoClientID))  ){

        return [
            'clientID' => $emp->MercadoPagoClientID,
            'secretID' => $emp->MercadoPagoSecretID
        ];

    }

}

function getAccessTokenMercadoPago($empresa, $sucursal){

    $empresaid = $empresa;
    $sucursalid = $sucursal;

    $emp = \App\Models\MongoDB\Empresa::find($empresaid);
    $suc = \App\Models\MongoDB\Sucursal::find($sucursalid);

    if( (!empty($suc->MercadoPagoAccessToken)) ) {

        return [
            'accessToken' => $suc->MercadoPagoAccessToken
        ];

    }else if( (!empty($emp->MercadoPagoAccessToken))  ){

        return [
            'accessToken' => $emp->MercadoPagoAccessToken
        ];

    }

}

function removerPedido($id){

    $pedido = \App\Models\MongoDB\Venta::find($id);
    $pedido->delete();
}

function getRealIpAddr()
{
    if (!empty($_SERVER['HTTP_CLIENT_IP']))
    {
        $ip=$_SERVER['HTTP_CLIENT_IP'];
    }
    elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))
    {
        $ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
    }
    else
    {
        $ip=$_SERVER['REMOTE_ADDR'];
    }
    return $ip;
}

function dataMailPedido($pedido, $action){

    $p = Venta::find($pedido);

    if($p){

        $items = [];

        if($p->Items){

            foreach ($p->Items as $i){

                $extras = [];

                if( !empty($i['extras']) ){

                    foreach ($i['extras'] as $e){

                        $extras[] = [
                            'cantidad' => $e['cantidad'],
                            'precio' => $e['precio'],
                            'productoid' => Producto::find($e['producto'])->_id,
                            'producto' => Producto::find($e['producto'])->Nombre,
                            'idextrarandom' => str_random(20)
                        ];
                    }
                }

                $items[] = [
                    'cantidad' => $i['cantidad'],
                    'productoid' => $i['productoid'],
                    'producto' => Producto::find($i['productoid'])->Nombre,
                    'precioind' => $i['precioind'],
                    'preciototalsinextras' => $i['preciototalsinextras'],
                    'preciototalconextras' => $i['preciototalconextras'],
                    'precioextras' => $i['precioextras'],
                    'precioextra1' => $i['precioextra1'],
                    'precioextra2' => $i['precioextra2'],
                    'precioextra3' => $i['precioextra3'],
                    'aclaraciones' => $i['aclaraciones'],
                    'extras' => $extras,
                    'iditemrandom' => str_random(20)
                ];

            }

        }

        if($action == 'cancelar'){
            $subject = 'Cancelación de Pedido';
        }else if($action == 'entregar'){
            $subject = 'Entrega de Pedido';
        }else if($action == 'pedir'){
            $subject = 'Orden de Pedido';
        }

        $precioenvio = empty($p->PrecioEnvio) ? '' : $p->PrecioEnvio;
        $motivoCancelacion = empty($p->MotivoCancelacion) ? '' : $p->MotivoCancelacion;

        if($p->Logistica == 'delivery'){
            $subtotal = ( (float) $p->ImporteTotal) - ( (float) $precioenvio);
            $importeTotal = $p->ImporteTotal;
        }else{
            $subtotal = 0;
            $importeTotal = $p->ImporteTotal;
        }

        $pro = [];
        $cantProducto = count($items);

        for($i = 0; $i < $cantProducto; $i++) {

            $list = [];

            if($items[$i]['extras'] != ''){

                for($j = 0; $j < count($items[$i]['extras']); $j++){

                    $li = '<li>'.$items[$i]['extras'][$j]['cantidad'].' x '.$items[$i]['extras'][$j]['producto'].'</li>';

                    array_push($list, $li);
                }

                if($list){

                    $lis = '<li><span class="pro-text">'.$items[$i]['cantidad'].' x '.$items[$i]['producto'].'</span> &nbsp; <span class="badge badge-dark roboto-mono">'.$items[$i]['aclaraciones'].'</span><ul class="sublist-producto">';
                    foreach ($list as $l){
                        $lis .= $l;
                    }
                    $lis .= '</ul></li>';


                }else{
                    $lis = '<li><span class="pro-text">'.$items[$i]['cantidad'].' x '.$items[$i]['producto'].'</span> &nbsp; <span class="badge badge-dark roboto-mono">'.$items[$i]['aclaraciones'].'</span><ul class="sublist-producto"></ul></li>';
                }

                array_push($pro, $lis);

            }else{

                $liss = '<li><span class="pro-text">'.$items[$i]['cantidad'].' x'.$items[$i]['producto'].'</span> &nbsp; <span class="badge badge-dark">'.$items[$i]['aclaraciones'].'</span></li>';
                array_push($pro, $liss);

            }

        }

        $mailNotificacionPedido = Sucursal::find($p->Sucursal_id)->MailNotificacionPedidosEntrantes;
        $correoCliente = Cliente::find($p->Cliente_id)->Correo;
        $mails = [ $correoCliente ];

        if($mailNotificacionPedido){
            $correoSucursal = Sucursal::find($p->Sucursal_id)->ContactoResponsable['correo'];
            array_push($mails, $correoSucursal);
        }


        $result = [
            'id' => $p->_id,
            'subject' => $subject,
            'orden' => $p->NumeroOrden,
            'clienteid' => $p->Cliente_id,
            'clientenombre' => Cliente::find($p->Cliente_id)->Nombre.' '.Cliente::find($p->Cliente_id)->Apellido,
            'clientecorreo' => $correoCliente,
            'clientedireccion' => Cliente::find($p->Cliente_id)->Direccion,
            'clientetelefono' => Cliente::find($p->Cliente_id)->Telefono,
            'empresaid' => $p->Empresa_id,
            'empresa' => Empresa::find($p->Empresa_id)->Nombre,
            'empresacuitrut' => Empresa::find($p->Empresa_id)->Cuit_rut,
            'empresacorreo' => Empresa::find($p->Empresa_id)->Correo,
            'empresatelefono' => Empresa::find($p->Empresa_id)->Telefono,
            'empresadireccion' => Empresa::find($p->Empresa_id)->Direccion,
            'sucursalid' => $p->Sucursal_id,
            'sucursal' => Sucursal::find($p->Sucursal_id)->Nombre,
            'sucursaltelefono' => Sucursal::find($p->Sucursal_id)->Telefono,
            'sucursaldireccion' => Sucursal::find($p->Sucursal_id)->Direccion,
            'fechap' => $p->FechaPedido->format('Y-m-d H:i:s'),
            'fechapedido' => $p->FechaPedido->format('d/m/Y h:i A'),
            'fechacortapedido' => $p->FechaPedido->format('d/m/Y'),
            'horapedido' => $p->FechaPedido->format('h:i A'),
            'importetotal' => $importeTotal,
            'subtotal' => $subtotal,
            'formapago' => (string)$p->MetodoPago,
            'formapagonombre' => Cobranza::find($p->MetodoPago)->Nombre,
            'logistica' => $p->Logistica,
            'estado' => EstatusPedido::find($p->EstadoPedido)->Nombre,
            'color' => EstatusPedido::find($p->EstadoPedido)->Color,
            'precioenvio' => $precioenvio,
            'efectivopago' => isset($p->EfectivoPago) ? (float) $p->EfectivoPago : '',
            'direccionenviopais' => empty($p->DireccionEnvio) ? '' : ClienteDireccion::find($p->DireccionEnvio)->Pais,
            'direccionenviociudad' => empty($p->DireccionEnvio) ? '' : ClienteDireccion::find($p->DireccionEnvio)->Ciudad,
            'direccionenviocalle' => empty($p->DireccionEnvio) ? '' : ClienteDireccion::find($p->DireccionEnvio)->Calle,
            'direccionenviocomuna' => empty($p->DireccionEnvio) ? '' : ClienteDireccion::find($p->DireccionEnvio)->Comuna,
            'direccionenvionumero' => empty($p->DireccionEnvio) ? '' : ClienteDireccion::find($p->DireccionEnvio)->Numero,
            'direccionenviocasa' => empty($p->DireccionEnvio) ? '' : ClienteDireccion::find($p->DireccionEnvio)->CasaDepartamento,
            'vehiculotipo' => empty($p->Vehiculo) ? '' : ClienteVehiculo::find($p->Vehiculo)->Tipo,
            'vehiculomarca' => empty($p->Vehiculo) ? '' : MarcaVehiculo::find(ClienteVehiculo::find($p->Vehiculo)->Marca_id)->Marca,
            'vehiculomodelo' => empty($p->Vehiculo) ? '' : ModeloVehiculo::find(ClienteVehiculo::find($p->Vehiculo)->Modelo_id)->Modelo,
            'vehiculocolor' => empty($p->Vehiculo) ? '' : Color::find(ClienteVehiculo::find($p->Vehiculo)->Color_id)->Color,
            'vehiculopatente' => empty($p->Vehiculo) ? '' : ClienteVehiculo::find($p->Vehiculo)->Patente,
            'motivocancelacion' => $motivoCancelacion,
            'action' => $action,
            'items' => $items,
            'detalleitems' => $pro,
            'mails' => $mails

        ];

    }

    return $result;

}

function getDayOfWeek(){

    $fechaActual = \Carbon\Carbon::now();
    $diaActual = $fechaActual->dayOfWeek;

    $dias = [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday'
    ];

    return $dias[$diaActual];

}

function getDayOfWeekSpanish(){

    $fechaActual = \Carbon\Carbon::now();
    $diaActual = $fechaActual->dayOfWeek;

    $dias = [
        'Domingo',
        'Lunes',
        'Martes',
        'Miercoles',
        'Jueves',
        'Viernes',
        'Sabado'
    ];

    return $dias[$diaActual];

}

function getHorarioActualSucursal($horarios){

    $dia = getDayOfWeek();

    $horario = $horarios[$dia];

    return ['apertura1' => $horario['apertura1'], 'cierre1' => $horario['cierre1'], 'apertura2' => $horario['apertura2'], 'cierre2' => $horario['cierre2']];

}

function getFormatedHorarioActualSucursal($horario){

    $result = '-';

    if($horario['apertura1'] AND $horario['cierre2']){

        if($horario['cierre1'] AND $horario['apertura2']){
            $result = $horario['apertura1'].' - '.$horario['cierre1'].' / '.$horario['apertura2'].' - '.$horario['cierre2'];
        }else{
            $result = $horario['apertura1'].' - '.$horario['cierre2'];
        }

    }

    return $result;

}

function procesarTipoComercios($sucursales){

    $tipoComercio = [];

    $tipocomercios = (TipoComercio::borrado(false)->activo(true)->orderBy('Orden', 'ASC')->get());
    $comercioSuc = group_by('categoria', $sucursales['data']);

    foreach ($comercioSuc as $key => $value){

        foreach ($tipocomercios as $tc){

            if($tc->_id == $key){
                $tipoComercio[] = [
                    '_id' => $tc->_id,
                    'Nombre' => $tc->Nombre,
                    'Orden' => $tc->Orden
                ];
            }
        }
    }

    $sortedTC = Arr::sort($tipoComercio, function($tipoc)
    {
        // Sort the student's scores by their test score.
        return $tipoc['Orden'];
    });

    return $sortedTC;

}

function getTipoComerciosSucursales($logistica, $latitud, $longitud){

    $logi = '';

    $sucursales = Sucursal::borrado(false)->activo(true)->get();
    if($logistica == 'carhop'){
        $logi = '5c22cf7f5d67e73dd45206e0';
    }else if($logistica == 'delivery'){
        $logi = '5c22d0691032643dd4f3e435';
    }else if($logistica == 'retiro'){
        $logi = '5c22d0741032643dd4f3e436';
    }else if($logistica == 'reserva'){
        $logi = '5c70628060d2653b5c451845';
        $sucursales = Sucursal::borrado(false)->activo(true)->where('TipoComercio_id',new ObjectId('5bee11fcaabd755ee7f23077'))->get();
    }


    $processSucursales    = procesarDataSucursales($logi, $sucursales, $latitud, $longitud);

    if($processSucursales){

        $processTipoComercios = procesarTipoComercios($processSucursales);

        $firstCat = head($processTipoComercios);

        $idCategoria = $firstCat['_id'];
        $nombreCategoria = $firstCat['Nombre'];

    }else{

        $processTipoComercios = '';

        $idCategoria = '';
        $nombreCategoria = '';

    }

    return ['tipocomercio' => $processTipoComercios, 'idCategoria' => $idCategoria, 'nombreCategoria' => $nombreCategoria];

}

function procesarDataSucursales($logistica, $sucursales, $lat, $lng){

    $suc = [];

    if($sucursales->isNotEmpty()){

        foreach ($sucursales as $s){

            if(in_array(new ObjectId($logistica), $s->Logistica)) {

                $pro = Producto::borrado(false)->activo(true)->where('Items', 'exists', false)->where('Sucursal_id', new ObjectId($s->_id))->get();

                if ($pro->isEmpty()) {
                    $emptyPro = true;
                } else {
                    $emptyPro = false;
                }

                if ($s->Geoposicion['coordinates'][0] AND $s->Geoposicion['coordinates'][1]) {
                    $km = calcularDistanciaLatLng($s->Geoposicion['coordinates'][0], $s->Geoposicion['coordinates'][1], $lat, $lng);

                    if ((int)$km >= 0 AND (int)$km <= 50) {

                        $horarios = $s->Horarios;
                        $horario = getHorarioActualSucursal($horarios);
                        $formatedHorario = getFormatedHorarioActualSucursal($horario);
                        
                        $suc['data'][] = array(
                            'id' => $s->_id,
                            'foto' => $s->Foto,
                            'nombre' => $s->Nombre,
                            'empresa' => Empresa::find($s->Empresa_id)->Nombre,
                            'lat' => $s->Geoposicion['coordinates'][0],
                            'lng' => $s->Geoposicion['coordinates'][1],
                            //'abierto' => sucursalOpen($s->HoraApertura, $s->HoraCierre),
                            'abierto' => $s->Abierto,
                            'encargos' => $s->EncargosPostDatados,
                            'direccion' => $s->Direccion,
                            'horario' => $formatedHorario,
                            'cobranza' => $s->Cobranza_id,
                            'preciodelivery' => $s->PrecioDelivery,
                            'logisticasucursal' => $logistica,
                            'logisticasucursalnombre' => strtolower(Logistica::find($logistica)->Nombre),
                            'categoria' => (string)$s->TipoComercio_id,
                            'favorito' => Sucursal::favorited($s->_id),
                            'emptyPro' => $emptyPro,
                            'paisid' => (string) $s->Pais_id,
                            'mediopago' => (string) $s->MetodoPagoTarjetaWeb,
                            'km' => (float)$km

                        );

                    }

                }



            }
        }

    }else{
        $suc['data'] = null;
    }

    return $suc;

}

function getTipoComerciosSucursalesSearch($logistica, $latitud, $longitud, $search){

    $logi = '';

    if($logistica == 'carhop'){
        $logi = '5c22cf7f5d67e73dd45206e0';
    }else if($logistica == 'delivery'){
        $logi = '5c22d0691032643dd4f3e435';
    }else if($logistica == 'retiro'){
        $logi = '5c22d0741032643dd4f3e436';
    }else if($logistica == 'reserva'){
        $logi = '5c70628060d2653b5c451845';
        $sucursales = Sucursal::borrado(false)->activo(true)->where('TipoComercio_id',new ObjectId('5bee11fcaabd755ee7f23077'))->get();
    }


    $processSucursales = procesarDataSucursalesSearch($logi, $latitud, $longitud, $search);

    if($processSucursales){

        $processTipoComercios = procesarTipoComercios($processSucursales);

        $firstCat = head($processTipoComercios);

        $idCategoria = $firstCat['_id'];
        $nombreCategoria = $firstCat['Nombre'];

    }else{

        $processTipoComercios = '';

        $idCategoria = '';
        $nombreCategoria = '';

    }

    return ['tipocomercio' => $processTipoComercios, 'idCategoria' => $idCategoria, 'nombreCategoria' => $nombreCategoria];

}

function procesarDataSucursalesSearch($logistica, $lat, $lng, $search){

    $suc = [];

    $productos = Producto::borrado(false)->activo(true)->where('Nombre', 'like', '%'.$search.'%')->get();

    if($productos){

        $temp = [];

        foreach($productos as $p){

            $arreglo = array(
                'productoid'                    => $p->_id,
                'empresa'                       => (string)$p->Empresa_id,
                'sucursal'                      => (string)$p->Sucursal_id,
                'nombre'                        => $p->Nombre
            );

            $temp[] = $arreglo;

        }

        //agrupo el resultado en base a la empresa
        $sucursalesid = group_by('sucursal', $temp);

        foreach ($sucursalesid as $key => $value){

            $s = Sucursal::find($key);

            if($s->Activo == true AND $s->Borrado == false){

                if(in_array(new ObjectId($logistica), $s->Logistica)) {

                    $pro = Producto::borrado(false)->activo(true)->where('Items', 'exists', false)->where('Sucursal_id', new ObjectId($s->_id))->get();

                    if ($pro->isEmpty()) {
                        $emptyPro = true;
                    } else {
                        $emptyPro = false;
                    }

                    if ($s->Geoposicion['coordinates'][0] AND $s->Geoposicion['coordinates'][1]) {
                        $km = calcularDistanciaLatLng($s->Geoposicion['coordinates'][0], $s->Geoposicion['coordinates'][1], $lat, $lng);

                        $horarios = $s->Horarios;
                        $horario = getHorarioActualSucursal($horarios);
                        $formatedHorario = getFormatedHorarioActualSucursal($horario);

                        $suc['data'][] = array(
                            'id' => $s->_id,
                            'foto' => $s->Foto,
                            'nombre' => $s->Nombre,
                            'empresa' => Empresa::find($s->Empresa_id)->Nombre,
                            'lat' => $s->Geoposicion['coordinates'][0],
                            'lng' => $s->Geoposicion['coordinates'][1],
                            //'abierto' => sucursalOpen($s->HoraApertura, $s->HoraCierre),
                            'abierto' => $s->Abierto,
                            'encargos' => $s->EncargosPostDatados,
                            'direccion' => $s->Direccion,
                            'horario' => $formatedHorario,
                            'cobranza' => $s->Cobranza_id,
                            'preciodelivery' => $s->PrecioDelivery,
                            'logisticasucursal' => $logistica,
                            'logisticasucursalnombre' => strtolower(Logistica::find($logistica)->Nombre),
                            'categoria' => (string)$s->TipoComercio_id,
                            'favorito' => Sucursal::favorited($s->_id),
                            'emptyPro' => $emptyPro,
                            'paisid' => (string) $s->Pais_id,
                            'mediopago' => (string) $s->MetodoPagoTarjetaWeb,
                            'km' => (float)$km

                        );

                    }


                }

            }


        }

    }else{
        $suc['data'] = null;
    }

    return $suc;

}

function removeUserVisitante($user){

    $cliente = Cliente::find($user);
    $cliente->delete();

}

function checkSucursalesByCoordenadas($logistica, $lat, $lng){

    //capturo los datos y los acomodo en un arreglo
    $data = [
        'logistica'  => $logistica,
        'latitud'    => $lat,
        'longitud'   => $lng
    ];

    $logi = '';

    if($data['logistica'] == 'carhop'){
        $logi = '5c22cf7f5d67e73dd45206e0';
    }else if($data['logistica'] == 'delivery'){
        $logi = '5c22d0691032643dd4f3e435';
    }else if($data['logistica'] == 'retiro'){
        $logi = '5c22d0741032643dd4f3e436';
    }else if($data['logistica'] == 'reserva'){
        $logi = '5c70628060d2653b5c451845';
    }

    $sucursales = Sucursal::borrado(false)->activo(true)->get();
    $checkSucursales = procesarDataSucursales($logi, $sucursales, $data['latitud'], $data['longitud']);

    if($checkSucursales){
        return true;
    }else{
        return false;
    }

}

function armarHorarioSucursal($sucursal){

    $schedule = [];

    if($sucursal){

        $suc = Sucursal::find($sucursal);

        $result = '';

        $horarios = $suc->Horarios;

        foreach ($horarios as $key => $value){

            if($value['apertura1'] AND $value['cierre2']){

                if($value['cierre1'] AND $value['apertura2']){
                    $result = $value['apertura1'].' - '.$value['cierre1'].' / '.$value['apertura2'].' - '.$value['cierre2'];
                }else{
                    $result = $value['apertura1'].' - '.$value['cierre2'];
                }

            }else{
                $result = '-';
            }

            $schedule[] = traducirDiasSemanas($key).': '.$result;

        }
        
    }

    return $schedule;

}

function traducirDiasSemanas($value){

    $dias = [
        'sunday' => 'Domingo',
        'monday' => 'Lunes',
        'tuesday' => 'Martes',
        'wednesday' => 'Miercoles',
        'thursday' => 'Jueves',
        'friday' => 'Viernes',
        'saturday' => 'Sabado'
    ];

    return $dias[$value];
}

function abrirMesaCamarero($mesa){

    $m = \App\Models\MongoDB\Mesa::find($mesa);

    $mp = \App\Models\MongoDB\MesaPedido::borrado(false)->activo(true)->where('Mesa_id', new ObjectId($mesa) )->first();

    if($mp){
        return false;
    }else{

        $registro = new \App\Models\MongoDB\MesaPedido;
        $registro->Mesa_id = $mesa;
        $registro->Cliente_id = null;
        //$registro->FechaPedido = Carbon::now();
        $registro->Empresa_id = new ObjectId( (string)$m->Empresa_id);
        $registro->Sucursal_id = new ObjectId( (string)$m->Sucursal_id);
        $registro->Cart = null;
        $registro->Items = null;
        $registro->Empresa = null;
        $registro->Activo = true;
        $registro->Borrado = false;
        $registro->CodigoComensal = generateRandomCodeComensal();
        $registro->Compartido = null;

        if($registro->save()){

            changeEstatusMesa($m->_id, '5c6f83f67ca6ef441b4b42c4');

            return true;
        }else{
            return false;
        }

    }

}

function abrirMesaComensal($mesa, $cliente){

    $m = \App\Models\MongoDB\Mesa::find($mesa);

    $mp = \App\Models\MongoDB\MesaPedido::borrado(false)->activo(true)->where('Mesa_id', new ObjectId($mesa) )->first();

    if($mp){
        return false;
    }else{

        $registro = new \App\Models\MongoDB\MesaPedido;
        $registro->Mesa_id = $mesa;
        $registro->Cliente_id = new ObjectId($cliente);
        //$registro->FechaPedido = Carbon::now();
        $registro->Empresa_id = new ObjectId( (string)$m->Empresa_id);
        $registro->Sucursal_id = new ObjectId( (string)$m->Sucursal_id);
        $registro->Cart = null;
        $registro->Items = null;
        $registro->Empresa = null;
        $registro->Activo = true;
        $registro->Borrado = false;
        $registro->CodigoComensal = generateRandomCodeComensal();
        $registro->Compartido = null;

        if($registro->save()){

            changeEstatusMesa($m->_id, '5c6f83f67ca6ef441b4b42c4');

            return true;
        }else{
            return false;
        }

    }

}

function checkCerrarMesaCamarero($mesa){

    $mp = \App\Models\MongoDB\MesaPedido::borrado(false)->activo(true)->where('Mesa_id', $mesa )->first();

    if($mp){

        if($mp->Cart){
            return 1;
        }else{

            removeReservaMesa($mesa);
            checkMesasEsclavo($mesa);
            deleteCamareroCart($mesa);
            changeEstatusMesa($mesa, '5c6f83e57ca6ef441b4b42c3');
            return 2;
        }

    }else{
        removeReservaMesa($mesa);
        changeEstatusMesa($mesa, '5c6f83e57ca6ef441b4b42c3');
        return 3;
    }

}

function addCamareroCartAndEmpresa($mesapedido, $cart, $empresa){

    $registro = \App\Models\MongoDB\MesaPedido::find($mesapedido);
    $registro->FechaPedido = Carbon::now();
    $registro->Cart = $cart;
    //$registro->Items = procesarItemsPedido($cart);
    $registro->Empresa = $empresa;
    $registro->Confirmacion = false;
    $registro->ConfirmacionBack = true;

    if($registro->save()){

        //disparo evento
        //event(new \App\Events\PedidoEvent( 100) );

        return true;
    }else{
        return false;
    }

}

function updateCamareroCart($mesa, $cart, $empresa){

    $registro = \App\Models\MongoDB\MesaPedido::borrado(false)->activo(true)->where('Mesa_id', $mesa)->first();;

    if($cart AND $empresa){

        $registro->Cart = $cart;
        //$registro->Items = procesarItemsPedido($cart);
        $registro->Empresa = $empresa;
        $registro->Confirmacion = false;
        $registro->ConfirmacionBack = true;

        if($registro->save()){
            //$saveAlerta = generateAlertaCamareroNotificacion($registro->_id, '5c668d60de58c52f24306157');
            return true;

        }

    }else{

        $registro->Cart = $cart;
        //$registro->Items = procesarItemsPedido($cart);
        $registro->Confirmacion = false;
        $registro->ConfirmacionBack = true;

        if($registro->save()){
            //$saveAlerta = generateAlertaCamareroNotificacion($registro->_id, '5c668d60de58c52f24306157');
            return true;

        }

    }

}

function updateComensalCart($mesa, $cart, $empresa){

    $registro = \App\Models\MongoDB\MesaPedido::borrado(false)->activo(true)->where('Mesa_id', $mesa)->first();;

    if($cart AND $empresa){

        $registro->Cart = $cart;
        //$registro->Items = procesarItemsPedido($cart);
        $registro->Empresa = $empresa;
        $registro->Confirmacion = false;
        $registro->ConfirmacionBack = true;

        if($registro->save()){
            //$saveAlerta = generateAlertaComensalNotificacion($registro->_id, '5c668d60de58c52f24306157');
            return true;

        }

    }else{

        $registro->Cart = $cart;
        //$registro->Items = procesarItemsPedido($cart);
        $registro->Confirmacion = false;
        $registro->ConfirmacionBack = true;

        if($registro->save()){
            //$saveAlerta = generateAlertaComensalNotificacion($registro->_id, '5c668d60de58c52f24306157');
            return true;

        }

    }

}

function deleteCamareroCart($mesa){

    $registro = \App\Models\MongoDB\MesaPedido::borrado(false)->activo(true)->where('Mesa_id', $mesa)->first();
    $registro->delete();

}


function savePedidoCamarero($data){

    $result = false;

    //procedo a guardarlos en la bd
    $registro = new \App\Models\MongoDB\Venta;
    $registro->NumeroOrden        = createNumeroPedido();
    $registro->Mesa_id            = new ObjectId($data['mesa']);
    $registro->Usuario_id         = new ObjectId($data['camarero']);
    $registro->Empresa_id         = new \MongoDB\BSON\ObjectId($data['empresa']['empresaid']);
    $registro->Sucursal_id        = new \MongoDB\BSON\ObjectId($data['empresa']['sucursalid']);
    $registro->Realizado          = 'CAMARERO';
    $registro->FechaPedido        = Carbon::now();
    $registro->FechaCancelado     = '';
    $registro->Items              = $data['items'];
    $registro->ImporteTotal       = (float)($data['importe']);
    //$registro->PrecioEnvio        = (float) $data['empresa']['sucursalpreciodelivery'];
    //$registro->EfectivoPago       = (float) $data['cash'];
    //$registro->DireccionEnvio     = new \MongoDB\BSON\ObjectId($data['direccion']);
    $registro->MetodoPago         = new \MongoDB\BSON\ObjectId($data['formapago']);
    $registro->EstadoPedido       = $data['estatus'];
    $registro->Logistica_id       = new \MongoDB\BSON\ObjectId($data['logisticaid']);
    $registro->Logistica          = $data['logistica'];
    $registro->Borrado            = $data['borrado'];
    $registro->Activo             = $data['activo'];

    //verifico si fue exitoso el insert en la bd
    if($registro->save()){

        restarStock($data['items']);

        removeReservaMesa($data['mesa']);

        deleteCamareroCart($data['mesa']);

        changeEstatusMesa($data['mesa'], '5c6f83e57ca6ef441b4b42c3');

        //disparo evento
        event(new \App\Events\PedidoEvent( 150) );

        //$dataMailPedido = dataMailPedido($registro->id, 'pedir');
        //le envio un correo al cliente con la cancelacion
        //Mail::to($dataMailPedido['mails'])->queue(new MailPedido($dataMailPedido));

        return $result = true;
    }else{
        return $result;
    }

}


function cancelarPedidoCamarero($data){

    $result = false;

    //procedo a guardarlos en la bd
    $registro = new \App\Models\MongoDB\Venta;
    $registro->NumeroOrden        = createNumeroPedido();
    $registro->Mesa_id            = new ObjectId($data['mesa']);
    $registro->Usuario_id         = new ObjectId($data['camarero']);
    $registro->Empresa_id         = new \MongoDB\BSON\ObjectId($data['empresa']['empresaid']);
    $registro->Sucursal_id        = new \MongoDB\BSON\ObjectId($data['empresa']['sucursalid']);
    $registro->TipoPedido         = 'CAMARERO';
    $registro->FechaPedido        = Carbon::now();
    $registro->FechaCancelado     = Carbon::now();
    $registro->Items              = $data['items'];
    $registro->ImporteTotal       = (float)($data['importe']);
    //$registro->PrecioEnvio        = (float) $data['empresa']['sucursalpreciodelivery'];
    //$registro->EfectivoPago       = (float) $data['cash'];
    //$registro->DireccionEnvio     = new \MongoDB\BSON\ObjectId($data['direccion']);
    //$registro->MetodoPago         = new \MongoDB\BSON\ObjectId($data['formapago']);
    $registro->EstadoPedido       = new ObjectId('5c0b883a4e71fa4b5c7369c0');
    $registro->Logistica_id       = new \MongoDB\BSON\ObjectId($data['logisticaid']);
    $registro->Logistica          = $data['logistica'];
    $registro->Motivo             = $data['motivo'];
    $registro->Borrado            = $data['borrado'];
    $registro->Activo             = $data['activo'];

    //verifico si fue exitoso el insert en la bd
    if($registro->save()){

        $clonar = clonarVentaCancelacion($registro->_id);

        $regresarStock = regresarStock($data['items']);

        removeReservaMesa($data['mesa']);

        deleteCamareroCart($data['mesa']);

        changeEstatusMesa($data['mesa'], '5c6f83e57ca6ef441b4b42c3');

        //disparo evento
        event(new \App\Events\PedidoEvent( 5 ) );

        $saveAlerta = generateAlertaCamareroNotificacion($registro->_id, '5c668d70de58c52f24306158');

        //$dataMailPedido = dataMailPedido($registro->id, 'pedir');
        //le envio un correo al cliente con la cancelacion
        //Mail::to($dataMailPedido['mails'])->queue(new MailPedido($dataMailPedido));

        return $result = true;
    }else{
        return $result;
    }

}

function mesaActiva($id){

    $mp = \App\Models\MongoDB\MesaPedido::borrado(false)->activo(true)->where('Mesa_id', $id)->first();

    if($mp){
        return true;
    }else{
        return false;
    }

}

function changeEstatusMesa($mesa, $estatus){

    $registro = \App\Models\MongoDB\Mesa::find($mesa);
    $registro->EstadoMesa_id = new ObjectId($estatus);
    $registro->save();

}

function checkCamareroMesa(){

    $mp = findComensalMesaPedido();

    if($mp){
        return true;
    }else{
        return false;
    }

}

function getCodeComensal(){

    $mp = findComensalMesaPedido();

    if($mp){
        return $mp->CodigoComensal;
    }else{
        return '';
    }

}

function getComensalMesa(){

    $mp = findComensalMesaPedido();

    if($mp){
        return (string)$mp->Mesa_id;
    }else{
        return '';
    }

}

function generarNotificacionCamarero($mesaPedido, $accion){

    $mesa = \App\Models\MongoDB\Mesa::find($mesaPedido->Mesa_id);

    //procedo a guardarlos en la bd
    $registro = new \App\Models\MongoDB\NotificacionCamarero;
    $registro->Mesa_id             = new ObjectId($mesaPedido->Mesa_id);
    $registro->Mesa                = $mesa->Numero;
    $registro->Empresa_id          = new ObjectId($mesaPedido->Empresa_id);
    $registro->Sucursal_id         = new ObjectId($mesaPedido->Sucursal_id);
    $registro->TipoNotificacion    = $accion == 'llamar' ? 'llamar' : 'solicitar';
    $registro->FechaAlerta         = Carbon::now();
    $registro->Borrado             = false;
    $registro->Activo              = true;

    //verifico si fue exitoso el insert en la bd
    if($registro->save()){

        $data = ['sucursal_id' => (string)$mesaPedido->Sucursal_id, 'mesa' => $mesa->Numero];

        if($accion == 'llamar'){
            //disparo evento
            event(new \App\Events\LlamarCamareroEvent($data) );
        }else{
            //disparo evento
            event(new \App\Events\SolicitarCuentaCamareroEvent($data) );
        }

        return true;
    }else{
        return false;
    }

}

function generateRandomCodeComensal(){

    $id = str_random(4);

    $validator = \Validator::make(['id'=>$id],['id'=>'unique:MesasPedidos,CodigoComensal']);

    if($validator->fails()){
        return generateRandomCode();
    }

    return strtoupper($id);
}

function findComensalMesaPedido(){

    $clienteid = (string)Auth::user()->_id;

    $mp = \App\Models\MongoDB\MesaPedido::borrado(false)->activo(true)->where('Cliente_id', new ObjectId($clienteid))->first();

    if($mp){
        return $mp;
    }else{

        $mpShared = \App\Models\MongoDB\MesaPedido::borrado(false)->activo(true)->where('Compartido', 'like', '%'.$clienteid.'%')->first();

        return $mpShared;

    }

}

function checkModeComensal(){

    $clienteid = (string)Auth::user()->_id;

    $mp = \App\Models\MongoDB\MesaPedido::borrado(false)->activo(true)->where('Cliente_id', new ObjectId($clienteid))->first();

    if($mp){
        return true;
    }else{

        $mpShared = \App\Models\MongoDB\MesaPedido::borrado(false)->activo(true)->where('Compartido', 'like', '%'.$clienteid.'%')->first();

        if($mpShared){
            return true;
        }else{
            return false;
        }

    }

}

function checkMesasEsclavo($mesa){

    $registro = \App\Models\MongoDB\Mesa::find($mesa);
    $esclavos = $registro->Union ;

    if($esclavos != null){

        foreach ($esclavos as $m){

            changeEstatusMesa($m, '5c6f83e57ca6ef441b4b42c3');
        }

    }

}

function removeReservaMesa($mesa){

    $registro = \App\Models\MongoDB\Mesa::find($mesa);
    $registro->Reserva_id = null;
    $registro->save();

}

function generateNotificacionReserva($reserva, $tipo){

    $r = \App\Models\MongoDB\Reserva::find($reserva);

    //procedo a guardarlos en la bd
    $registro = new \App\Models\MongoDB\NotificacionReserva;
    $registro->Reserva_id          = new ObjectId((string)$reserva);
    $registro->Sucursal_id         = new ObjectId((string)$r->Sucursal_id);
    $registro->TipoNotificacion_id = new ObjectId((string)$tipo);
    $registro->FechaAlerta         = Carbon::now();
    $registro->Borrado             = false;
    $registro->Activo              = true;

    //verifico si fue exitoso el insert en la bd
    if($registro->save()){

        //disparo evento
        event(new \App\Events\AlertaNotificacionReservaEvent('Alerta generada') );

        return true;
    }else{
        return false;
    }

}

function generateLog($tipo, $guardia){

    $app = '5c9a7369c2817d27395dc5aa'; //tipo de aplicacion - App
    $tipoLog = '';
    $result = false;
    $clienteid = '';
    $usuarioid = '';
    $mixto = false;

    if($guardia == 'web'){
        $clienteid = (string)Auth::user()->_id;
    }else if($guardia == 'usuarios'){
        $usuarioid = (string)Auth::guard('usuarios')->user()->_id;
        $mixto = true;
    }

    if($tipo == 'inicio'){
        $tipoLog = '5c9a7288c2817d27395dc5a9';
    }else if($tipo == 'cierre'){
        $tipoLog = '5c9a72dc3eed3c27392b7eed';
    }

    if( ($tipoLog AND $clienteid) OR ($tipoLog AND $usuarioid) ){

        //procedo a guardarlos en la bd
        $registro = new \App\Models\MongoDB\Log;
        $registro->Aplicacion_id       = new ObjectId($app);
        $registro->Cliente_id          = $clienteid == '' ? null : new ObjectId($clienteid);
        $registro->Usuario_id          = $usuarioid == '' ? null : new ObjectId($usuarioid);
        $registro->TipoLog_id          = new ObjectId($tipoLog);
        $registro->Mixto               = $mixto;
        $registro->Fecha               = Carbon::now();
        $registro->Borrado             = false;
        $registro->Activo              = true;

        //verifico si fue exitoso el insert en la bd
        if($registro->save()){
            $result = true;
        }else{
            $result = false;
        }

    }

    return $result;

}

function generateLogRepartidor($pedido, $tipo){

    $app = '5c9a7369c2817d27395dc5aa'; //tipo de aplicacion - Backoffice
    $result = false;

    $usuarioid = (string)Auth::guard('usuarios')->user()->_id;

    if($tipo == 'disponible'){
        $estatus = '5ca9351ead40cd1f78458861';
    }else if($tipo == 'asignado'){
        $estatus = '5ca9356b0918811f784dd50f';
    }else if($tipo == 'entregado'){
        $estatus = '5ca9358d0918811f784dd511';
    }else if($tipo == 'entregando'){
        $estatus = '5ca935a00918811f784dd512';
    }else if($tipo == 'cancelado'){
        $estatus = '5ca9357c0918811f784dd510';
    }

    if( ($estatus AND $usuarioid) ){

        //procedo a guardarlos en la bd
        $registro = new \App\Models\MongoDB\LogRepartidor;
        $registro->Aplicacion_id       = new ObjectId($app);
        $registro->Usuario_id          = new ObjectId($usuarioid);
        $registro->Venta_id            = new ObjectId($pedido);
        $registro->EstadoRepartidor    = new ObjectId($estatus);
        $registro->Fecha               = Carbon::now();
        $registro->Borrado             = false;
        $registro->Activo              = true;

        //verifico si fue exitoso el insert en la bd
        if($registro->save()){
            $result = true;
        }else{
            $result = false;
        }

    }

    return $result;

}

function armarDireccionEnvio($casa, $numero, $comuna, $calle, $ciudad, $pais){

    if($pais == 'Argentina'){
        return implode(',', [$ciudad, $calle, $numero, $casa]);

    }else if($pais == 'Chile'){
        return implode(',', [$ciudad, $comuna, $calle, $numero, $casa]);
    }else{
        return implode(',', [$ciudad, $comuna, $calle, $numero, $casa]);
    }

}

function cancelacionPedidoRepartidorReturnMoney($pedido){

    $registro = Venta::find($pedido);

    $pais = (string) $registro->SesionEmpresa['paisid'];
    $mediopago = (string) $registro->SesionEmpresa['mediopago'];

    $orden = $registro->NumeroOrden;
    $items = $registro->Items;

    //metodo de pago: tarjeta
    if( (string) $registro->MetodoPago == '5b7e4cde589bd25309f878cc'){

        if($pais == '586f91fff8c715650b244841'){

            $backMoney = regresarPagoMP($orden, $pedido);

        }else if($pais == '586f9204f8c715650b244842'){

            if($mediopago == '5c379ffa935216237bbe4b64'){
                $backMoney = regresarPago($orden, $pedido);
            }else if($mediopago == '5c37a1086e0737237be49faf'){
                $backMoney = regresarPagoMP($orden, $pedido);
            }

        }

        $regresarStock = regresarStock($items);

        if($backMoney['exito']){
            return true;
        }else{
            return false;
        }

    }else{

        $regresarStock = regresarStock($items);

        return true;
    }
}
