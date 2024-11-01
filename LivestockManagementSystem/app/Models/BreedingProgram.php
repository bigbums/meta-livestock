<?php

// app/Models/BreedingProgram.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BreedingProgram extends Model
{
    use HasFactory;

    protected $fillable = ['program_name', 'description', 'start_date', 'end_date', 'target_offspring_count', 'livestock_group_id'];

    public function livestockGroup()
    {
        return $this->belongsTo(LivestockGroup::class);
    }

    public function breedingPairs()
    {
        return $this->hasMany(BreedingPair::class);
    }
}
