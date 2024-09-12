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
        Schema::create('breeding_performance_metrics', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('breeding_record_id')->foreignId('breeding_record_id')->constrained('breeding_records')->onDelete('cascade');
            $table->float('conception_rate')->nullable();
            $table->integer('litter_size')->nullable();
            $table->integer('weaning_rate')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('breeding_performance_metrics');
    }
};
