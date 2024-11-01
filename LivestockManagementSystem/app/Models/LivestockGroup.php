<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LivestockGroup extends Model
{
    use HasFactory;

    // The table associated with the model (optional if following Laravel conventions)
    protected $table = 'livestock_groups';

    // The attributes that are mass assignable
    protected $fillable = [
        'name', // Name of the livestock group
        'description', // Description or purpose of the group
        // 'criteria_key',
        // 'criteria_value',
    ];

    // Access the criteria field as JSON
    // protected $casts = [
    //     'criteria' => 'array',
    // ];

    /**
     * Relationship with FeedSchedule.
     */
    public function feedSchedules()
    {
        return $this->hasMany(FeedSchedule::class, 'livestock_group_id');
    }

    /**
     * Relationship with FeedDistribution.
     */
    public function feedDistributions()
    {
        return $this->hasMany(FeedDistribution::class, 'livestock_group_id');
    }

    // public function criteria()
    // {
    //     return $this->hasMany(GroupCriteria::class);
    // }

    // public function groupCriteria()
    // {
    //     return $this->belongsToMany(GroupCriteria::class, 'group_criteria_livestock_group');
    // }

    public function criteria()
    {
        return $this->belongsToMany(GroupCriteria::class, 'group_criteria_livestock_group', 'livestock_group_id', 'group_criteria_id');
    }

    public function livestock()
    {
        return $this->belongsToMany(Livestock::class, 'livestock_group_livestock', 'livestock_group_id', 'livestock_id');
    }
}
