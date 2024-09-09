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
        Schema::create('cities', function (Blueprint $table) {
            $table->id();
            // $table->bigInteger('state_id')->foreignId('state_id')->constrained()->onDelete('cascade');
            $table->string('name')->unique();
            $table->bigInteger('state_id')->foreignId('state_id')->constrained('states')->onDelete('cascade'); // Assuming a 'states' table exists
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->string('postal_code')->nullable();
            $table->string('unlocode')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cities');
    }
};
