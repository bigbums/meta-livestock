<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BreedingRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'livestock_id',
        'breeding_schedule_id',
        'breeding_date',
        'expected_delivery_date',
        'actual_delivery_date',
        'breeding_method',
        'offspring_count',
        'is_successful',
        'status',
        'notes'
    ];

    public function maleLivestock()
    {
        return $this->belongsTo(Livestock::class, 'sire_id');
    }

    public function femaleLivestock()
    {
        return $this->belongsTo(Livestock::class, 'dam_id');
    }

    public function breedingSchedule()
    {
        return $this->belongsTo(BreedingSchedule::class);
    }
}
