<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description'];

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_role');
    }

    // Define the many-to-many relationship with Privilege
    public function privileges()
    {
        return $this->belongsToMany(Privilege::class, 'role_privilege');
    }
}
