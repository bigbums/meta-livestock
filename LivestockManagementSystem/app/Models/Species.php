<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Species extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'sub_species',
        'african',
        'location'
    ];

    // A species can have many breeds
    public function breeds()
    {
        return $this->hasMany(Breed::class);
    }
}
