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
        Schema::create('breeding_management', function (Blueprint $table) {
            $table->id();
            $table->foreignId('livestock_id')->constrained('livestocks')->onDelete('cascade');
            $table->string('breeding_type'); // e.g., Artificial Insemination, Natural
            $table->date('breeding_date');
            $table->date('expected_delivery_date')->nullable();
            $table->date('actual_delivery_date')->nullable();
            $table->integer('offspring_count')->nullable();
            $table->enum('status', ['pending', 'confirmed', 'failed'])->default('pending');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('breeding_management');
    }
};
