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
        Schema::create('group_criteria_livestock_group', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('livestock_group_id')->constrained('livestock_groups')->onDelete('cascade'); // Foreign key to LivestockGroup
            $table->unsignedBigInteger('group_criteria_id')->constrained('group_criteria')->onDelete('cascade'); // Foreign key to LivestockGroup
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('group_criteria_livestock_group');
    }
};
