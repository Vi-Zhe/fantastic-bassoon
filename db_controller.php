<?php

class DbController{
    private static $DB_NAME = 'web0812';
    private static $DB_HOST = 'localhost';
    private static $DB_LOGIN = 'root';
    private static $DB_PASSWORD = '';

    protected $link = null;

    function __construct(){
        $this->connect();
    }


    function __destruct(){
        mysqli_close($this->link);
        $this->link = null;
    }

    private function connect(){
        $this->link = mysqli_connect(
            $this::$DB_HOST,
            $this::$DB_LOGIN,
            $this::$DB_PASSWORD,
            $this::$DB_NAME
        );
    }


    public function login($login, $password){
        $res = [];
        $login = htmlspecialchars($login);
        $password = htmlspecialchars($password);

        $query = "SELECT * FROM users WHERE LOGIN='$login' AND PASSWORD='$password' LIMIT 1";
        $resDb = mysqli_query($this->link, $query);

        if($user = mysqli_fetch_assoc($resDb)){
            if($user['ACTIVE']){
                $query = "SELECT TOKEN FROM tokens WHERE LOGIN={$user['ID']} LIMIT 1";
                $resDb = mysqli_query($this->link, $query);
                if($token = mysqli_fetch_assoc($resDb)){
                    $res['token'] = $token['TOKEN'];
                }
                else{
                    $token = sha1($login . $password);
                    $query = "INSERT INTO tokens(TOKEN, LOGIN) VALUES ('$token', {$user['ID']})";
                    $resDb = mysqli_query($this->link, $query);
                    // if($resDb){
                        $res['token'] = $token;
                    // }
                }
            }
        }
        else{
            $query = "INSERT INTO users(LOGIN, PASSWORD) VALUES('$login', '$password')";
            mysqli_query($this->link, $query);
            $id = mysqli_insert_id($this->link);
            if($id > 0){
                $token = sha1($login . $password);
                $query = "INSERT INTO tokens(TOKEN, LOGIN) VALUES ('$token', $id)";
                $resDb = mysqli_query($this->link, $query);
                $res['token'] = $token;
            }
        }
        return $res;
    }

    // abstract function test();

}

class DbControllerApi extends DbController{
    function __construct(){
        parent::__construct();
    }
    public function test(){

    }
}


interface Api{
    public function connect();

}



class TestApi implements Api{
    public function connect(){
        
    }
}