<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeedType extends Model
{
    use HasFactory;
    protected $fillable = ['feed_type_name', 'feed_type_variant_name', 'feed_type_desc', 'feed_type_notes'];
}
