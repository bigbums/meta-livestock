<?php

// app/Models/City.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'state_id', 'latitude', 'longitude'];

    /**
     * Get the state associated with the city.
     */
    public function state()
    {
        return $this->belongsTo(State::class);
    }
}
