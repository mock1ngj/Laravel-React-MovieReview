<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reviews extends Model
{
    use HasFactory;
    protected $table = "userReviews";
    protected $primaryKey = "id";
    public $timestamps = false;
    protected $fillable = [
        'user',
        'movieID',
        'review',
        'ratings',
    ];

    public function movieTitle()
    {
        return $this->belongsTo(Movies::class, 'id', 'movieID');
    }
}
