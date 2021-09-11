<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;

class DashboardController extends Controller
{

    public function __construct() 
    {
        $this->middleware(['auth']);
    } 

    public function index ()
    {   
        $transactions = Transaction::orderBy('date', 'desc')->get()->where('user_id', auth()->user()->id);
    
        $income = $transactions->where('category', 'Income')->sum('amount');
        $expenses = $transactions->where('category', 'Expense')->sum('amount');

        $total = $income - $expenses;
        $minus = '';
        
        if(strpos($total, "-") !== false) {
            $total = str_ireplace('-', ' ', $total);
            $minus = '-';
        } 

        return view('dashboard', [
            'transactions' => $transactions,
            'income' => $income,
            'total' => $total,
            'minus' => $minus,
            'expenses' => $expenses
        ]);
    }
}
