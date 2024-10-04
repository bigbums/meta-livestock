<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeedingManagement extends Model
{
    use HasFactory;

    use HasFactory;

    protected $table = 'feeding_management';

    protected $fillable = [
        'livestock_id',
        'feeding_date',
        'feed_type',
        'feed_lot',
        'livestock_qty',
        'quantity',
        'unit',
        'notes',
    ];

    // Relationship with Livestock
    public function livestock()
    {
        return $this->belongsTo(Livestock::class);
    }
}
