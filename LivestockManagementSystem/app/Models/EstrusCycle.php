<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EstrusCycle extends Model
{
    use HasFactory;

    protected $fillable = ['livestock_id', 'start_date', 'end_date', 'activity_level', 'temperature_change', 'behavior_notes'];

    public function livestock()
    {
        return $this->belongsTo(Livestock::class);
    }
}
