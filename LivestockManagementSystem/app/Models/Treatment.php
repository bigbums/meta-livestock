<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Treatment extends Model
{
    use HasFactory;
    protected $table = 'treatments';

    protected $fillable = [
        'livestock_id',
        'diagnosis',
        'treatment_goals',
        'medications',
        'therapies',
        'surg_proced',
        'monitoring_plan',
        'follow_up_care',
        'consent',
        'assessment',
        'notes',
    ];

    /**
     * Get the livestock that owns the treatment plan.
     */
    public function livestock()
    {
        return $this->belongsTo(Livestock::class);
    }
}
