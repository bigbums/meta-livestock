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
        Schema::create('pregnancy', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('livestock_id')->constrained('livestock')->onDelete('cascade');
            $table->date('breeding_date');
            $table->enum('pregnancy_status', ['positive', 'negative', 'pending'])->default('pending');
            $table->string('detection_method')->nullable();
            $table->date('detection_date')->nullable();
            $table->date('expected_delivery_date')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pregnancy');
    }
};
