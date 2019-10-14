<?php

namespace App\Models\MongoDB;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class QuestionAnswers extends Eloquent
{
    protected $connection = 'mongodb';
    protected $table = 'QuestionAnswers';

}

