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
        Schema::create('species_usage', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('species_id')->constrained('species')->onDelete('cascade');
            $table->bigInteger('usage_id')->constrained('usages')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('species_usage');
    }
};
