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
        Schema::create('feeding_management', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('livestock_id')->foreignId('livestock_id')->constrained('livestocks')->onDelete('cascade');
            $table->date('feeding_date');
            $table->string('feed_type'); // e.g., Hay, Grain, Silage
            $table->decimal('quantity', 8, 2); // Quantity in kg or lbs
            $table->string('unit'); // kg, lbs, etc.
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('feeding_management');
    }
};
