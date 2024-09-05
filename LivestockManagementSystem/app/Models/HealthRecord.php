<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HealthRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'livestock_id',
        'date',
        'vitals',
        'diagnosis',
        'treatment',
        'notes'
    ];

    protected $casts = [
        'vitals' => 'array',  // Cast the 'vitals' column to an array
    ];

    public function livestock()
    {
        return $this->belongsTo(Livestock::class);  // Define a relationship to the Livestock model
    }
}
