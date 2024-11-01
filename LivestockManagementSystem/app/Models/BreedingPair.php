<?php

// app/Models/BreedingPair.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BreedingPair extends Model
{
    use HasFactory;

    protected $fillable = ['breeding_program_id', 'female_livestock_id', 'male_livestock_id', 'breeding_date', 'method', 'success_status', 'offspring_count', 'notes'];

    public function breedingProgram()
    {
        return $this->belongsTo(BreedingProgram::class);
    }
}
