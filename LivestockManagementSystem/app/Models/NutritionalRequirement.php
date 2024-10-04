<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NutritionalRequirement extends Model
{
    use HasFactory;

    protected $fillable = [
        'species_id',
        'breed_id',
        'age_range',
        'weight_range',
        'health_status',
        'production_type',
        'requirement_type',
        'requirement_value',
    ];

    public function species()
    {
        return $this->belongsTo(Species::class);
    }

    public function breed()
    {
        return $this->belongsTo(Breed::class);
    }
}
