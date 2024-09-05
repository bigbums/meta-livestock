<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    use HasFactory;

    protected $fillable = [
        'location_id',
        'total_count'
    ];

    public function location()
    {
        return $this->belongsTo(Location::class);
    }
}
