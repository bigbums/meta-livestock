<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Livestock extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'breed',
        'date_of_birth',
        'gender',
        'rfid_tag',
        'herd_id',
        'owner_id'
    ];

    public function owner()
    {
        return $this->belongsTo(User::class);
    }

    // Relationship with Breeding
    public function breeding()
    {
        return $this->hasMany(BreedingManagement::class);
    }
}
