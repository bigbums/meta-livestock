<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Livestock extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'species',
        'type',
        'breed',
        'date_of_birth',
        'location',
        'gender',
        'tag_id',
        'species_id',
        'breed_id',
        'herd_id',
        'health_status',
        'owner_id',
        'qr_code',  // Add QR code to fillable
        'barcode',  // Add Barcode to fillable
        'facial_recognition_data',  // Add facial recognition data to fillable
        'thermal_imaging_data',  // Add thermal imaging data to fillable
        'other_biometric_data',  // Add other biometric data to fillable

    ];

    // Cast fields to array or JSON if needed
    protected $casts = [
        'facial_recognition_data' => 'array',
        'thermal_imaging_data' => 'array',
        'other_biometric_data' => 'array',
    ];

    public function owner()
    {
        return $this->belongsTo(User::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }


    // Relationship with Breeding
    public function breeding()
    {
        return $this->hasMany(BreedingManagement::class);
    }

    public function breedingRecords()
    {
        return $this->hasMany(BreedingRecord::class);
    }

    public function breedingSchedules()
    {
        return $this->hasMany(BreedingSchedule::class);
    }

    public function pedigree()
    {
        return $this->hasOne(Pedigree::class);
    }

    public function sireOf()
    {
        return $this->hasMany(Pedigree::class, 'sire_id');
    }

    public function damOf()
    {
        return $this->hasMany(Pedigree::class, 'dam_id');
    }

    public function species()
    {
        return $this->belongsTo(Species::class);
    }

    public function breed()
    {
        return $this->belongsTo(Breed::class);
    }

    public function treatmentPlans()
    {
        return $this->hasMany(Treatment::class);
    }
}
