<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserLanguagePreference extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'language_code'];

    public function language()
    {
        return $this->belongsTo(Language::class, 'language_code', 'code');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
