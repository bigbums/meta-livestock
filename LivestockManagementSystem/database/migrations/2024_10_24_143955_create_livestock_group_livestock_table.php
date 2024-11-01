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
        Schema::create('livestock_group_livestock', function (Blueprint $table) {
            $table->id();
            // Foreign key to livestock_groups table
            $table->unsignedBigInteger('livestock_group_id')->constrained('livestock_groups')->onDelete('cascade');

            // Foreign key to livestock table
            $table->unsignedBigInteger('livestock_id')->constrained('livestocks')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('livestock_group_livestock');
    }
};
