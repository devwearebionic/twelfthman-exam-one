<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;

use App\Repository\Interfaces\ImageInterface as ImageRepository;
use DB;
use Carbon\Carbon;

class ImageController extends Controller
{

    protected $imageRepository;

    public function __construct(
        ImageRepository $imageRepository){

        $this->imageRepository   = $imageRepository;

    }

    public function show(Request $request){

        $id = $request->route('id');

        if( !( $id > 0 ) ){

            $response = [
                'status' => false,
                'message' => 'No image found'
            ];

            return response()->json($response, Response::HTTP_OK);

        }

        $image = $this->imageRepository->getById($id);

        if( !$image ){

            $response = [
                'status' => false,
                'message' => 'No image found'
            ];

        }
        else{

            $response = [
                'status'  => true,
                'message' => 'Image successfully fetched',
                'data'    => $image
            ];

        }

        return response()->json($response, Response::HTTP_OK);

    }

    public function store(Request $request)
    {

        DB::beginTransaction();

        $imageData = [
            'url'                 => $request->get('url'),
            'status'              => 1,
            'filename'            => $request->get('original'),
            'description'         => $request->get('description'),
            'created_at'          => Carbon::now()
        ];

        $imageId = $this->imageRepository->insert($imageData);

        if( $imageId <= 0 ){

            DB::rollback();

            $response = [
                'status'  => false,
                'message' => 'Save image failed'
            ];
            
            return response()->json($response, Response::HTTP_INTERNAL_SERVER_ERROR);

        }

        DB::commit();

        $response = [
            'status'  => true,
            'message' => 'Image save successfully'
        ];
        
        return response()->json($response, Response::HTTP_CREATED);

    }

    
    public function active(){

        $active = $this->imageRepository->active();

        if( !$active ){

            $response = [
                'status' => false,
                'message' => 'No images found'
            ];

        }
        else{

            $response = [
                'status'  => true,
                'message' => 'Active images successfully fetched',
                'data'    => $active
            ];

        }

        return response()->json($response, Response::HTTP_OK);

    }

    public function deleted(){

        $deleted = $this->imageRepository->deleted();

        if( !$deleted ){

            $response = [
                'status' => false,
                'message' => 'No images found'
            ];

        }
        else{

            $response = [
                'status'  => true,
                'message' => 'Deleted images successfully fetched',
                'data'    => $deleted
            ];

        }

        return response()->json($response, Response::HTTP_OK);

    }

    public function delete(Request $request){

        $id = $request->route('id');

        if( !( $id > 0 ) ){

            $response = [
                'status' => false,
                'message' => 'No image found'
            ];

            return response()->json($response, Response::HTTP_OK);

        }

        $data = [
            'status' => 2
        ];

        $image = $this->imageRepository->update($id,$data);

        if( !$image ){

            $response = [
                'status' => false,
                'message' => 'No image found'
            ];

        }
        else{

            $response = [
                'status'  => true,
                'message' => 'Image successfully deleted'
            ];

        }

        return response()->json($response, Response::HTTP_OK);

    }

    public function restore(Request $request){

        $id = $request->get('id');

        if( !( $id > 0 ) ){

            $response = [
                'status' => false,
                'message' => 'No image found'
            ];

            return response()->json($response, Response::HTTP_OK);

        }

        $data = [
            'status' => 1
        ];

        $image = $this->imageRepository->update($id,$data);

        if( !$image ){

            $response = [
                'status' => false,
                'message' => 'No image found'
            ];

        }
        else{

            $response = [
                'status'  => true,
                'message' => 'Image successfully restored'
            ];

        }

        return response()->json($response, Response::HTTP_OK);

    }

    public function upload(Request $request)
    {

        if( $request->hasFile('photo') ){

            $extension = strtolower( $request->file('photo')->getClientOriginalExtension() );
            $filename_path = md5(date('Ymdhis').uniqid()).".".$extension;
            $request->file('photo')->move(public_path("image/"), $filename_path);

            $response = [
                'status'     => true,
                'message'    => 'Image uploaded successfully',
                'filename'   => $filename_path,
                'original'   => $request->file('photo')->getClientOriginalName()
            ];

            return response()->json($response, Response::HTTP_OK);

        }

        $response = [
            'status'  => false,
            'message' => 'Uploading Image failed'
        ];
        
        return response()->json($response, Response::HTTP_INTERNAL_SERVER_ERROR);

    }

    public function download(Request $request){

        $id = $request->get('id');

        if( !( $id > 0 ) ){

            $response = [
                'status' => false,
                'message' => 'No image found'
            ];

            return response()->json($response, Response::HTTP_OK);

        }

        $image = $this->imageRepository->getById($id);

        if( !$image ){

            $response = [
                'status' => false,
                'message' => 'No image found'
            ];

        }
        else{

            $response = [
                'status'  => true,
                'message' => 'Image successfully fetched',
                'data'    => $image
            ];

        }

        return response()->download(public_path('image/'.$image->url),$image->filename);


    }

}