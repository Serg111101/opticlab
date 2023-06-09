
import "./modal.scss"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import axios from 'axios';

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const URL = process.env.REACT_APP_BASE_URL


function Modal({active, setActive,}:any) {
 
     const navigate=useNavigate()
 const [inputActive, setIputActive] = useState(true)

 const userRef:any = useRef();
    const errRef:any = useRef();

    const [user, setUser] = useState<any>('');
    const [validName, setValidName] = useState(false);
    // const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    // const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    // const [matchFocus, setMatchFocus] = useState(false);

    // const [errMsg, setErrMsg] = useState('');
    // const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(user);
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        // setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        // if button enabled with JS hack
        // const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v2) {
            // setErrMsg("Invalid Entry");
            return;
        }
        try {
            
            await  axios({
                method: 'post',
                url: URL + 'api/v1/users/add',
                data: {
                  email: user,
                  password: pwd
                }
              });
            // setSuccess(true);
            //clear state and controlled inputs
            setUser('');
            setPwd('');
            setMatchPwd('');
            navigate('/')
        } catch (err:any) {
            if (!err?.response) {
                // setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                // setErrMsg('Username Taken');
            } else {
                // setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
     }

  return (


    <div className={active ? 'modal active' : "modal"} onClick={()=>setActive(false)}>
        <div className={active ? 'modal_content active' : "modal_content"} onClick={e=>e.stopPropagation()}>
              <div className='contain'>
                <h1>Registration on the site</h1>
                <form onSubmit={handleSubmit} className='containform'>
                    <div className='inputers'>
                        <p>email</p>
                      <input
                     type="text"
                     id="username"
                     ref={userRef}
                     autoComplete="off"
                     onChange={(e) => setUser(e.target.value)}
                     value={user}
                     required
                     aria-invalid={validName ? "false" : "true"}
                     aria-describedby="uidnote"
                    //  onFocus={() => setUserFocus(true)}
                    //  onBlur={() => setUserFocus(false)}
                 />


                         <p>password</p>
                     <input
                     type="password"
                     id="password"
                     onChange={(e) => setPwd(e.target.value)}
                     value={pwd}
                     required
                     aria-invalid={validPwd ? "false" : "true"}
                     aria-describedby="pwdnote"
                    //  onFocus={() => setPwdFocus(true)}
                    //  onBlur={() => setPwdFocus(false)}
                 />



                         <p>password</p>
                    <input
                     type="password"
                     id="confirm_pwd"
                     onChange={(e) => setMatchPwd(e.target.value)}
                     value={matchPwd}
                     required
                     aria-invalid={validMatch ? "false" : "true"}
                     aria-describedby="confirmnote"
                    //  onFocus={() => setMatchFocus(true)}
                    //  onBlur={() => setMatchFocus(false)}
                 />


                         <p>Company Name</p>
                    <input type="text" disabled={inputActive}  />
                    </div>
                    <div className='users'>
                         <div className='user1'>
                        <p>User</p>
                         <input type="checkbox" checked={inputActive} onClick={()=>setIputActive(!inputActive)}/>
                         </div>
                         <div className='user2'>
                         <p>Company</p>
                         <input type="checkbox" checked={!inputActive} onClick={()=>setIputActive(!inputActive)} />
                         </div>
                    </div>
                    <div className='registraciabutton'>

                       <button disabled={!validName || !validPwd || !validMatch ? true : false} >Sign Up</button>

                    <button onClick={()=>navigate(0)}>Go Back</button>
                    
                    </div>
                             

                    </form>
                </div>
              </div>
        </div>

    
  )
}

export default Modal