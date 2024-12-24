<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EstrusSensorData extends Model
{
    use HasFactory;

    protected $fillable = ['livestock_id', 'timestamp', 'activity_level', 'temperature', 'heart_rate'];

    public function livestock()
    {
        return $this->belongsTo(Livestock::class);
    }
}
