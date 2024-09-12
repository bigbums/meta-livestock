<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedigree extends Model
{
    use HasFactory;

    protected $fillable = ['livestock_id', 'sire_id', 'dam_id', 'generation'];

    public function livestock()
    {
        return $this->belongsTo(Livestock::class);
    }

    public function sire()
    {
        return $this->belongsTo(Livestock::class, 'sire_id');
    }

    public function dam()
    {
        return $this->belongsTo(Livestock::class, 'dam_id');
    }
}
