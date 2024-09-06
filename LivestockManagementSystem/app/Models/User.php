<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

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
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'user_role');
    }

    // If you want to directly access user privileges (through roles)
    public function privileges()
    {
        return $this->role->privileges();
    }

    protected static function boot()
    {
        parent::boot();

        // Assign default role and status when creating a user
        static::creating(function ($user) {
            // Set default role as "User" if no role is provided
            if (!$user->role_id) {
                $defaultRole = Role::where('name', 'User')->first();
                $user->role_id = $defaultRole->id;
            }

            // Set default status as "inactive"
            $user->status = 'inactive';
        });
    }
}
