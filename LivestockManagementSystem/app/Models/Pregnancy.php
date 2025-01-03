<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pregnancy extends Model
{
    use HasFactory;

    protected $fillable = [
        'livestock_id',
        'breeding_date',
        'pregnancy_status',
        'detection_method',
        'detection_date',
        'expected_delivery_date',
        'notes',
    ];

    public function livestock()
    {
        return $this->belongsTo(Livestock::class);
    }
}
