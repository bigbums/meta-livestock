<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeedSchedule extends Model
{
    protected $fillable = [
        'livestock_group_id',
        'feed_type_id',
        'quantity',
        'approved_quantity', // Added field
        'approver',          // Added field
        'feed_location',     // Added field
        'frequency',
        'time_of_day',
        'occurrence',
    ];

    public function livestockGroup()
    {
        return $this->belongsTo(LivestockGroup::class);
    }

    public function feed()
    {
        return $this->belongsTo(Feed::class);
    }

    public function feedDistributions()
    {
        return $this->hasMany(FeedDistribution::class);
    }
}
