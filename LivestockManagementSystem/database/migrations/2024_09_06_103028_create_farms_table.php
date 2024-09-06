<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('farms', function (Blueprint $table) {
            $table->id();
            $table->string('farm_name');
            $table->foreignId('owner_id')->constrained('users')->onDelete('cascade');
            $table->string('contact_number')->nullable();
            $table->float('size')->nullable();
            $table->enum('farm_type', ['Dairy', 'Poultry', 'Mixed', 'Crop']);
            $table->foreignId('location_id')->nullable()->constrained('locations')->onDelete('set null');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('farms');
    }
};
