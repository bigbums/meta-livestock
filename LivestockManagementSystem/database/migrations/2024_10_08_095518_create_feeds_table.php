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
        Schema::create('feeds', function (Blueprint $table) {
            $table->id();
            $table->string('feed_name');
            $table->string('feed_description');
            $table->foreignId('feed_type_id')->constrained('feed_types')->onDelete('cascade'); // Foreign key to feed types
            $table->string('units_of_measure');
            // $table->decimal('approved_quantity', 8, 2);
            $table->text('nutritional_value')->nullable();
            $table->string('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('feeds');
    }
};
