<?php

namespace App\Http\Controllers;

use DB;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index(){
        return Product::all();
    }

    public function store(Request $request){
        $product = Product::create($request->all());
        return response()->json($product,201);
    }
    public function show($id){
        return Product::findOrFail($id);
    }
    public function update(Request $request, $id){
        $product = Product::findOrFail($id);
        $product->update($request->all());
        return response()->json($product, 200);
    }

    public function destroy($id)
    {
        Product::findOrFail($id)->delete();
        return response()->json(['message' => 'Product deleted successfully'], 204);
    }
    public function search(Request $request){
        $q = $request->input("q");
        $products = Product::whereRaw('name LIKE ?', ["%$q%"])->get();
        return response()->json($products,201);
    }
}
