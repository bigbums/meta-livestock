<?php

// database/migrations/xxxx_xx_xx_xxxxxx_create_audits_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAuditsTable extends Migration
{
    public function up()
    {
        Schema::create('audits', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->foreignId('user_id')->nullable()->constrained('users')->onDelete('cascade');
            $table->string('action'); // Action performed
            $table->string('auditable_type')->nullable(); // Model being audited
            $table->unsignedBigInteger('auditable_id')->nullable(); // Model ID being audited
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('audits');
    }
}
