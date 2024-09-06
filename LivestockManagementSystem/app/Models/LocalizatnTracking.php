<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LocalizatnTracking extends Model
{
    use HasFactory;

    protected $table = 'localization_tracking';

    protected $fillable = [
        'livestock_id',
        'latitude',
        'longitude',
        'timestamp',
        'speed',
        'direction',
    ];

    // Relationship with Livestock model
    public function livestock()
    {
        return $this->belongsTo(Livestock::class);
    }
}
