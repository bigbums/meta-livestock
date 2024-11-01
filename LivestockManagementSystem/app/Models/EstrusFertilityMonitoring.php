<?php

// app/Models/EstrusFertilityMonitoring.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EstrusFertilityMonitoring extends Model
{
    use HasFactory;

    protected $fillable = ['livestock_id', 'monitoring_date', 'estrus_status', 'fertility_status', 'assessment_notes', 'recommendation'];

    public function livestock()
    {
        return $this->belongsTo(Livestock::class);
    }
}
