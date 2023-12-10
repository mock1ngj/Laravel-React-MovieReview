<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movies extends Model
{
    use HasFactory;
    protected $table = "movieList";
    protected $primaryKey = "movieTitle";
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'movieTitle',
        'movieDescription',
        'image',
    ];

    //tells the relation
    public function movieTitle()
    {
        
        return $this->hasMany(Reviews::class, 'movieTitle', 'movieTitle');
    }
}
