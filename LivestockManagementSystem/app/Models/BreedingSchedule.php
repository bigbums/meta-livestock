<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BreedingSchedule extends Model
{
    use HasFactory;

    protected $fillable = ['livestock_id', 'scheduled_date', 'breeding_method'];

    public function livestock()
    {
        return $this->belongsTo(Livestock::class);
    }

    public function breedingRecords()
    {
        return $this->hasMany(BreedingRecord::class);
    }
}
