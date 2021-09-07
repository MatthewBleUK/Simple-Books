<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Dashboard</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

        <link rel="stylesheet" href="{{ asset('css/dashboard.css') }}">

    </head>
    <body class="antialiased">

        <div id="mySidenav" class="sidenav">
            <div class="container">
                <h3 class="title">Add a Transaction</h3>

                <form action="{{ route('store') }}" method="post">
                    @csrf
                    <div class="row">
                        <div class="input-container">
                            <label for="name">Transaction Name: </label><br>
                            <input type="text" name="name" placeholder="Enter a transaction name">
                        </div>

                        <div class="input-container">
                            <label for="date">Date: </label><br>
                            <input type="date" name="date" placeholder="Enter a date">
                        </div>
                    </div>

                    <div class="row">
                        <div class="input-container">
                            <label for="amount">Amount: </label><br>
                            <input type="text" name="amount" placeholder="Enter a amount">
                        </div>
                        
                        <div class="input-container">
                            <label for="category">Category: </label><br>
                            <select name="category">
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                                <option value="personal">Personal</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label for="tags">Tags: </label><br>
                        <input type="text" name="tags" placeholder="Enter a tag">
                    </div>
                    
                    <div class="row">
                        <label for="notes">Notes: </label>
                        <textarea rows="4" cols="50" name="notes"></textarea>
                    </div>
                    
                    <div class="form-buttons">
                        <button type="submit">Add Transaction</button>
                        <a onclick="closeNav()">Cancel</a>
                    </div>
                </form>
                
            </div>
        </div>

        <div id="main">
            <!--<h1>Dashboard</h1>
            <p>Welcome {{ auth()->user()->name }}</p>-->

            <div id="nav-bar">
                <div class="container">
                    <ul class="float-left">
                        <li class="logo"><span>Sole Trader Books</span></li>
                    </ul>
        
                    <ul class="float-right">
                        <li class="user">
                            <span>{{ auth()->user()->name }}</span>
                            <i class="white-arrow down"></i>
                        </li>
                    </ul>
                </div>
            </div>
        
            <div id="transaction-stats">
                <div class="container">
                    <span class="title">Transactions</span>
                    
                    <div class="business-profits">
                        <span class="value">£1143.54</span>
                        <span class="value-title">Profits / Losses</span>
                    </div>
                
                    <div class="business-incomes">
                        <span class="value">£1221.54</span>
                        <span class="value-title">Business Income</span>
                    </div>
                    
                    <div class="business-expenses">
                        <span class="value">-£78</span>
                        <span class="value-title">Business Expenses</span>
                    </div>
                </div>
            </div>
        
            <div id="add-transactions-box">
                <div class="container">
                    <span>Add a Transaction:</span>
                    <form action="">
                        <label for="name">Name:</label>
                        <input type="text" placeholder="Name" name="name"><br>
                        <label for="amount">Amount:</label>
                        <input type="text" placeholder="Amount" name="amount"><br>
                        <label for="date">Date:</label>
                        <input type="date" name="date"><br>
                        <label for="category">Category:</label>
                        <input type="text" placeholder="Category" name="category"><br>
                        <label for="tags">Tags:</label>
                        <input type="text" placeholder="Tags" name="tags"><br>
        
                        <input type="submit" value="Add Transaction">
                    </form>
                </div>
            </div>
        
            <div id="transactions-edit-bar">
                <div class="container">
                    <input type="button" value="Add Transaction" class="button" onclick="openNav()">
        
                    <div id="edit-buttons">
                        <input type="button" value="Edit Transaction" class="button">
                        <input type="button" value="Delete Transaction" class="button">
                    </div>
                </div>
            </div>
        
            <div id="transactions">
                <div class="container">
                    <table id="transactions-table">
                        <tr>
                            <td><input type="checkbox"></td>
                            <th>Date</th>
                            <th>Transaction</th>
                            <th>Amount</th>
                            <th>Category</th>
                            <th>Tags</th>
                        </tr>
        
                        @if ($transactions->count()) 
                            @foreach($transactions as $transaction)
                                <tr>
                                    <td><input type="checkbox"></td>
                                    <td contenteditable='true'>{{ $transaction->date }}</td>
                                    <td contenteditable='true'>{{ $transaction->name }}</td>
                                    <td contenteditable='true'>{{ $transaction->amount }}</td>
                                    <td contenteditable='true'>{{ $transaction->category }}</td>
                                    <td contenteditable='true'>{{ $transaction->tags }}</td>
                                    <td onclick="openNav()"><i class="arrow right"></i></td>
                                </tr>
                            @endforeach
                        @else
                            <p>There are no transactions</p>
                        @endif                        
                    </table>
                </div>
            </div>


            
        
            <div id="utility-bar">
                <div class="container">
                    <!--<button class="button">Import Transactions</button>-->
                    <input type="button" class="button" onclick="tableToExcel('transactions-table', 'name', 'myfile.xls')" value="Download Report">
                </div>
            </div>
            
            <form action="{{ route('logout') }}" method="post">
                @csrf
                <button type="submit">Logout</button>
            </form>
        </div>

        <script src="{{ asset('js/jquery-3.6.0.js') }}"></script>
        <script src="{{ asset('js/scripts.js') }}"></script>
    </body>
</html>
