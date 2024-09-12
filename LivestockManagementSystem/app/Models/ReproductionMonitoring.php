<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReproductionMonitoring extends Model
{
    use HasFactory;

    protected $fillable = [
        'dam_id',
        'last_breeding_date',
        'calving_interval',
        'pregnancy_count',
        'successful_pregnancies',
        'stillbirths',
    ];

    public function femaleAnimal()
    {
        return $this->belongsTo(Livestock::class, 'dam_id');
    }
}
