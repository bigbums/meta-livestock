<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feed extends Model
{
    protected $fillable = ['feed_name', 'feed_type_id', 'units_of_measure', 'nutritional_value'];

    public function feedSchedules()
    {
        return $this->hasMany(FeedSchedule::class);
    }
}
