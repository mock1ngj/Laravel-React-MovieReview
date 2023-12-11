<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movies extends Model
{
    use HasFactory;
    protected $table = "movieList";
    protected $primaryKey = "id";
    public $timestamps = false;

    protected $fillable = [
        'movieTitle',
        'movieDescription',
        'image',
    ];

    //tells the relation
    public function movieTitle()
    {
        
        return $this->belongsToMany(Reviews::class);
    }
}
