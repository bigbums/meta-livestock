<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeedDistribution extends Model
{
    protected $fillable = [
        'feed_schedule_id',
        'distribution_time',
        'actual_quantity_distributed',
        'distributed_by',
        'feed_by_user' // Added field
    ];

    public function feedSchedule()
    {
        return $this->belongsTo(FeedSchedule::class);
    }
}
