<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BreedingManagement extends Model
{
    use HasFactory;

    protected $table = 'breeding_management';

    protected $fillable = [
        'livestock_id',
        'breeding_type',
        'breeding_date',
        'expected_delivery_date',
        'actual_delivery_date',
        'offspring_count',
        'status',
        'notes',
    ];

    // Relationship with Livestock
    public function livestock()
    {
        return $this->belongsTo(Livestock::class);
    }
}
