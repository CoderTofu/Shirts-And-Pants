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
        Schema::create('products', function (Blueprint $table) {
            $table->string('product_name');
            $table->string('description');
            $table->enum('type', ['shirt', 'pants']);
            $table->enum('gender', ['M', 'F', 'Unisex']);
            $table->float('price');
            $table->timestamps();
            $table->primary(['product_name', 'gender']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
