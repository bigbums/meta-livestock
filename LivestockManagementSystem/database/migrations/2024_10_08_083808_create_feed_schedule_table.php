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
        Schema::create('feed_schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('livestock_group_id')->constrained()->onDelete('cascade'); // Foreign key for livestock group reference
            $table->foreignId('feed_type_id')->constrained()->onDelete('cascade'); // Foreign key for feed reference
            $table->decimal('quantity', 10, 2); // Amount of feed for each distribution
            $table->decimal('approved_quantity', 10, 2)->nullable(); // Approved feed quantity
            $table->string('approver')->nullable(); // Person or system approving the feed schedule
            $table->string('feed_location')->nullable(); // Location where the feed is stored or taken from
            $table->string('frequency');
            $table->string('occurrence')->nullable(); // How often feed is given (e.g., daily, weekly)
            $table->time('time_of_day'); // Time feed is scheduled (e.g., 08:00:00)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('feed_schedules');
    }
};
