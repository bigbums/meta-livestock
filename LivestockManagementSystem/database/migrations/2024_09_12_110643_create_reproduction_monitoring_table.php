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
        Schema::create('reproduction_monitoring', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('dam_id')->foreignId('dam_id')->constrained('livestocks')->onDelete('cascade');
            $table->date('last_breeding_date')->nullable();
            $table->integer('calving_interval')->nullable(); // Days between successive calvings
            $table->integer('pregnancy_count')->default(0);
            $table->integer('successful_pregnancies')->default(0);
            $table->integer('stillbirths')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reproduction_monitoring');
    }
};
