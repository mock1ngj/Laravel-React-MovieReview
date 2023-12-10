<?php

namespace App\Http\Controllers;

use App\Models\Movies;
use App\Models\Reviews;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

use function PHPUnit\Framework\isEmpty;

class MovieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $movies = Movies::all();
        return response()->json($movies, 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fileName = $request->image->getClientOriginalName();
        $filePath = 'storage/photos/' . $fileName;
        Storage::putFileAs('/public/photos', $request->image, $fileName);
        $data = array(
            'movieTitle'=> $request->movieTitle,
            'movieDescription' => $request->movieDescription,
            'image'=> $filePath,
        );
        Movies::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

        $data = array(
            'movieTitle' => $request->movieTitle,
            'movieDescription' => $request->movieDescription,
        );

        if ($request->has('image')) {
            $fileName = $request->image->getClientOriginalName();
            $filePath = 'storage/photos/' . $fileName;
            Storage::putFileAs('/public/photos', $request->image, $fileName);
            $data = array_merge($data, ['image'=> $filePath]);
        }
        $movies = Movies::find($id);
        $movies->movieTitle()->update(['movieTitle' => $request->movieTitle]);
        $movies->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $movies = Movies::find($id);
        $movies->movieTitle()->delete();
        $movies->delete();
    }
}
