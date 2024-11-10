<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('product_images', function (Blueprint $table) {
            $table->string('product_name');
            $table->string('size');
            $table->string('color');
            $table->foreign(['product_name', 'color', 'size'])->on('product_variations')->references(['product_name', 'color', 'size'])->cascadeOnDelete()->cascadeOnUpdate();
            $table->string('image');
            $table->primary('image');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_images');
    }
};
