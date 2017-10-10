<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ImageTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $images = [
            [
                'url'                 => 'image-1.jpg',
                'description'         => 'Who we are'
            ],
            [
                'url'                 => 'image-2.jpg',
                'description'         => 'Partnership rationale'
            ],
            [
                'url'                 => 'image-3.jpg',
                'description'         => 'Partnership rationale'
            ],
            [
                'url'                 => 'image-4.jpg',
                'description'         => 'The opportunity'
            ],
            [
                'url'                 => 'image-5.jpg',
                'description'         => 'Our clubs'
            ],
        ];

        foreach($images as $image) {
            DB::table('image_table')->insert([
                'url'           => $image['url'],
                'status'        => 1,
                'description'   => $image['description'],
                'created_at'    => Carbon::now()
            ]);
        }
    }
}
