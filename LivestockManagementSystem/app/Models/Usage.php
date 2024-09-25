<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usage extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description'];

    // Define relationships if needed
    public function species()
    {
        return $this->belongsToMany(Species::class);
    }
}
