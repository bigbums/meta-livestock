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
        Schema::create('breeding_pairs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('breeding_program_id')->constrained()->onDelete('cascade');
            $table->unsignedBigInteger('female_livestock_id')->constrained('livestock')->onDelete('cascade');
            $table->unsignedBigInteger('male_livestock_id')->constrained('livestock')->onDelete('cascade');
            $table->date('breeding_date');
            $table->enum('method', ['Natural', 'Artificial Insemination'])->default('Natural');
            $table->enum('success_status', ['Successful', 'Unsuccessful', 'Pending'])->default('Pending');
            $table->integer('offspring_count')->default(0);
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('breeding_pairs');
    }
};
