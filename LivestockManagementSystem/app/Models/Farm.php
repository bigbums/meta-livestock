<?php

// app/Models/Farm.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Farm extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'address', 'contact_number', 'user_id', 'location_id'];

    /**
     * Get the user that owns the farm.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the location associated with the farm.
     */
    public function location()
    {
        return $this->belongsTo(Location::class);
    }
}
