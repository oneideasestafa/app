<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GeneralAppController extends Controller
{
  public function getClientTimeOffset (Request $request) {
    $clientTime = $request->query('t');

    if (!$clientTime) {
      return response('', 400);
    }

    $timeServer = '0.pool.ntp.org';
    $timeCvd = $this->queryTimeServer($timeServer, 13);

    if ($timeCvd[1]) {
      return response('', 500);
    }

    $value = bin2hex($timeCvd[0]);

    return response($value);
  }

  private function queryTimeServer ($timeServer, $socket) {
    # parameters: server, socket, error code, error text, timeout
    $fp = fsockopen($timeServer, $socket, $err, $errstr, 5);

    if($fp)
    {
        fputs($fp, "\n");
        $timevalue = fread($fp, 49);
        fclose($fp); # close the connection
    }
    else
    {
        $timevalue = " ";
    }

    $ret = array();
    $ret[] = $timevalue;
    $ret[] = $err;     # error code
    $ret[] = $errstr;  # error text
    
    return($ret);
  } 
}
