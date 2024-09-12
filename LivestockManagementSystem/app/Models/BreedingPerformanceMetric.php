<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BreedingPerformanceMetric extends Model
{
    use HasFactory;

    protected $fillable = [
        'breeding_record_id',
        'conception_rate',
        'litter_size',
        'weaning_rate',
    ];

    public function breedingRecord()
    {
        return $this->belongsTo(BreedingRecord::class);
    }
}
