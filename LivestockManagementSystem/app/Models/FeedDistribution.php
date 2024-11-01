<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeedDistribution extends Model
{
    use HasFactory;

    protected $fillable = [
        'feed_schedule_id',
        'livestock_group_id',
        'livestock_id',
        'distribution_time',
        'actual_quantity_distributed',
        'variance',
        'distributed_by',
        'feed_by_user',
        'comment'
    ];

    public function feedschedule()
    {
        return $this->belongsTo(FeedSchedule::class, 'feed_schedule_id');
    }

    public function livestockGroup()
    {
        return $this->belongsTo(LivestockGroup::class, 'livestock_group_id');
    }

    public function livestock()
    {
        return $this->belongsTo(Livestock::class, 'livestock_id');
    }

    // public function livestock()
    // {
    //     return $this->belongsToMany(Livestock::class, 'livestock_group_livestock', 'livestock_group_id', 'livestock_id');
    // }
}
