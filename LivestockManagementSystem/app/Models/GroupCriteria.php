<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GroupCriteria extends Model
{
    use HasFactory;

    protected $table = 'group_criteria';

    protected $fillable = ['key', 'value'];

    // Define the relationship with LivestockGroup
    // public function livestockGroup()
    // {
    //     return $this->belongsTo(LivestockGroup::class);
    // }

    public function livestockGroups()
    {
        return $this->belongsToMany(LivestockGroup::class, 'group_criteria_livestock_group');
    }
}
