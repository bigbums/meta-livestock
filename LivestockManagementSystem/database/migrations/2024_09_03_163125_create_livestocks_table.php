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
        Schema::create('livestocks', function (Blueprint $table) {
            $table->id();
            $table->string('type');  // Type of livestock (e.g., cattle, sheep)
            $table->string('breed');  // Breed of livestock
            $table->date('date_of_birth');  // Date of birth
            $table->enum('gender', ['Male', 'Female']);  // Gender of livestock
            $table->string('rfid_tag')->unique();  // RFID Tag for identification
            $table->string('herd_id')->unique();  // Herd Tag for identification
            $table->string('name')->nullable();  // Animal name identification
            $table->foreignId('owner_id')->constrained('users');  // Foreign key to owner (user)            
            $table->timestamps();  // Timestamps for created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('livestocks');
    }
};
