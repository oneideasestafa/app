<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Str;

class AgregarCampoApiTokenTablaUsuario extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('Usuarios', function ($table) {
            $table->string('api_token', 80)->after('Password')
                                ->unique()
                                ->nullable()
                                ->default(null);
        });       
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('Usuarios', function ($table) {
            $table->dropColumn(['api_token']);
        });        
    }
}
