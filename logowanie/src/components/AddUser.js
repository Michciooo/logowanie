import React, { useState,useEffect ,useCallback} from 'react';
import Card from '../UI/Card';
import classes from './AddUser.module.css'
import Button from '../UI/Button';
import Errormodal from '../UI/Errormodal';
import { keyboard } from '@testing-library/user-event/dist/keyboard';
function AddUser(){
    const [name , setname] = useState('')
    const [age , setage] = useState('')
    const [email , setemail] = useState('')
    const [password , setpassword] = useState('')
    const[errormodal , seterrormodal] = useState(null)

    function changeHandler(event){
        setname(event.target.value);
    }
    function changeHandler2(event){
        setage(event.target.value);
    }
    function changeHandler3(event){
        setemail(event.target.value);
    }
    function changeHandler4(event){
        setpassword(event.target.value)
    }


    async function addUserhandler(event){
        event.preventDefault();
        if (!funkcja()) {
            return;
        }
        
        const object ={
            mykey: [name,age,email,password],
        }
        const res = await fetch('https://testowa-b2823-default-rtdb.firebaseio.com/logowanie.json',
        {
            method:'POST',
            body:JSON.stringify({'Nazwa : ':name,'Wiek : ':age,'E-mail: ':email,'Hasło :':password}),
            headers:{
                'Content-type': 'aplication.json'
            }
        }
        )
        const data = await res.json();


        setage('')
        setname('')
        setemail('')
        setpassword('')
    }

    function funkcja() {
        let a = true;
        if (+age < 1) {
            seterrormodal({
                title: 'Błędny wiek',
                msg:'Wiek musi być większy od 0'
            });
            a = false;
        } else if (name.length <= 5) {
            seterrormodal({
                title: 'Błędna nazwa',
                msg: 'Nazwa musi być dłuższa niż 5 znaków'
            });
            a = false;
        } else if (password.length <= 7) {
            seterrormodal({
                title: 'Hasło musi być silniejsze',
                msg: 'Hasło musi mieć co najmniej 8 znaków'
            });
            a = false;
        } else if (!password.match(/[0-9]/)) {
            seterrormodal({
                title: 'Hasło musi być silniejsze',
                msg: 'Hasło musi zawierać 1 cyfrę'
            });
            a = false;
        } else if (!password.match(/[A-Z]/)) {
            seterrormodal({
                title: 'Hasło musi być silniejsze',
                msg: 'Hasło musi mieć 1 dużą literę'
            });
            a = false;
        }
        return a;
    }
    const getdatahandler = useCallback(async ()=>{
        const res=await fetch('https://testowa-b2823-default-rtdb.firebaseio.com/logowanie.json')
        const data=await res.json();

        const loadeddata = []
        for(const key in data){
            loadeddata.push({
                moj:data[key],
            });
        }
    },[]);

useEffect(() => {
    getdatahandler();
  },[]
  );

    const errorhandler = () =>{
        seterrormodal(null)
    }
    return (
    <>
        
        <Card className={classes.input}>
        {errormodal && <Errormodal title={errormodal.title} msg={errormodal.msg}
                                            removerror = {errorhandler}/>}
        <form onSubmit={addUserhandler}>
            <label htmlFor='username'>
                username
            </label>
            <input id='username' type='text' onChange={changeHandler} value={name}/>
            <label htmlFor='age'>age</label>
            <input id='age' type='number' onChange={changeHandler2} value={age}></input>
            <label htmlFor='email'>
                email
            </label>
            <input id='email' type='email' onChange={changeHandler3} value={email}></input>
            <label htmlFor='password'>
                password
            </label>
            <input id='password' type='password' onChange={changeHandler4} value={password}></input>

            <Button mytype='submit'>Add user</Button>
        </form>
        <div className="blok">
            <div>{name}</div><br/>
            <div>{age}</div><br/>
            <div>{email}</div><br/>
            <div>{password}</div>
       </div>
        </Card>
    </> 
    )
}
export default AddUser;
