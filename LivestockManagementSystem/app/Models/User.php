<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable, HasApiTokens, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'firstname',
        'lastname',
        'username',
        'email',
        'password',
        'role_id',
        'status',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];


    /**
     * Dates to be handled as Carbon instances for soft delete.
     *
     * @var array<int, string>
     */

    protected $dates = ['deleted_at']; // Soft delete support



    /**
     * Define relationship with Role.
     * Each user belongs to a single role.
     */

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    /**
     * Helper method to check if the user has a specific role.
     */

    public function hasRole($role)
    {
        return $this->role && $this->role->name === $role;
    }


    // If you want to directly access user privileges (through roles)
    public function privileges()
    {
        return $this->role ? $this->role->privileges : collect();
    }

    /**
     * Boot method to set default role and status when creating a user.
     */

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($user) {
            // Set default role as "User" if no role is provided
            if (!$user->role_id) {
                $defaultRole = Role::where('name', 'User')->first();
                $user->role_id = $defaultRole ? $defaultRole->id : null;
            }

            // Set default status as "inactive"
            if (!$user->status) {
                $user->status = 'inactive';
            }
        });
    }

    public function posts()
    {

        return $this->hasMany(Post::class);
    }
}
