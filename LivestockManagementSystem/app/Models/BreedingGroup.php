<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BreedingGroup extends Model
{
    use HasFactory;

    protected $fillable = [
        'breeding_group_name',
        'group_type', // pair or multiple
        'start_date',
        'male_count',
        'female_count',
        'end_date',
        'location',
        'notes',
        'breeding_program_id',
    ];

    public function livestocks()
    {
        return $this->belongsToMany(Livestock::class, 'breeding_group_livestock')
            ->withPivot('role', 'join_date', 'leave_date')
            ->withTimestamps();
    }

    public function species()
    {
        return $this->belongsTo(Species::class);
    }
}
