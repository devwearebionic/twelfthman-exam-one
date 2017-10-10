<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use App\Repository\Eloquent\EloquentImage;
use App\Image;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $app = $this->app;

        // Register User Repository

        $app->bind('App\Repository\Interfaces\ImageInterface',function(){

          return new EloquentImage(

            new Image

            );

        });
    }
}
