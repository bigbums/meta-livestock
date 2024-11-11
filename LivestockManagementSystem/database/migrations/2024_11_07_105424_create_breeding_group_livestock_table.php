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
        Schema::create('breeding_group_livestock', function (Blueprint $table) {
            $table->id();
            $table->foreignId('breeding_group_id')->constrained('breeding_groups')->onDelete('cascade'); // Assume breeding_groups table exists
            $table->foreignId('livestock_id')->constrained('livestocks')->onDelete('cascade'); // Assume livestocks table exists            
            $table->enum('role', ['male', 'female']);
            $table->date('join_date')->nullable();
            $table->date('leave_date')->nullable();
            $table->string('status')->default('active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('breeding_group_livestock');
    }
};
