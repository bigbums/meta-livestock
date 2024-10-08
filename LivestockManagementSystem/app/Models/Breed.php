<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Breed extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'species_id',


    ];

    // A breed belongs to a species
    public function species()
    {
        return $this->belongsTo(Species::class);
    }
}
