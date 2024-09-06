<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HandlingEventManagement extends Model
{
    use HasFactory;

    protected $table = 'handling_event_management';


    protected $fillable = [
        'livestock_id',
        'event_type',
        'event_date',
        'description',
        'handler_name',
        'cost',
    ];

    // Relationship with Livestock model
    public function livestock()
    {
        return $this->belongsTo(Livestock::class);
    }
}
