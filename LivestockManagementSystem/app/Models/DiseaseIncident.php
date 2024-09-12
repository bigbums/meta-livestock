<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DiseaseIncident extends Model
{
    use HasFactory;

    protected $fillable = [
        'health_record_id',
        'disease_name',
        'incident_date',
        'severity',
        'symptoms',
        'prevention_measures',
        'control_measures',
        'treatment_given',
    ];

    public function healthRecord()
    {
        return $this->belongsTo(HealthRecord::class);
    }
}
