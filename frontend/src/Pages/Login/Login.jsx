import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import MainHeader from "../../Components/MainHeader/MainHeader";
import TopBar from "../../Components/TopBar/TopBar";
import { useForm } from "../../hooks/useForm";
import ReCAPTCHA from "react-google-recaptcha";
import {
  requiredValidator,
  minValidator,
  maxValidator,
  emailValidator,
} from "../../Validator/rules";
import "./Login.css";
import Input from "../../Components/Form/Input/Input";
import Button from "../../Components/Form/Buuton/Button";
import AuthContext from "../../Context/AuthContext";
import swal from "sweetalert";

export default function Login() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [isRecapchaValid, setIsRecapchaValid] = useState(false);
  const [formState, onInputHandler] = useForm(
    {
      username: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false,
  );
  const useLogin = (event) => {
    event.preventDefault();

    const loginUser = {
      identifier: formState.inputs.username.value,
      password: formState.inputs.password.value,
    };
    fetch("http://localhost:4000/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginUser),
    })
      .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(text);
          });
        } else {
          return res.json();
        }
      })
      .then((result) => {
        console.log(result);
        authContext.login({}, result.accessToken);
        swal({
          title: "ورود شما با موفقیت انجام شد",
          icon: "success",
          button: " حله منو ببر به صفحه اصلی",
        }).then((value) => {
          navigate("/");
        });
      })
      .catch((err) => {
        swal({
          title: "همجین کاربری یافت نشد",
          icon: "error",
          button: " تلاش دوباره",
        });
      });
  };
  const onChangeRecapchaHandler = () => {
    setIsRecapchaValid(true);
  };
  return (
    <>
      <TopBar />
      <MainHeader />

      <section class='login-register'>
        <div class='login'>
          <span class='login__title'>ورود به حساب کاربری</span>
          <span class='login__subtitle'>
            خوشحالیم دوباره میبینیمت دوست عزیز :)
          </span>
          <div class='login__new-member'>
            <span class='login__new-member-text'>کاربر جدید هستید؟</span>
            <Link class='login__new-member-link' to='/register'>
              ثبت نام
            </Link>
          </div>
          <form action='#' class='login-form'>
            <div class='login-form__username'>
              <Input
                className='login-form__username-input'
                type='text'
                id='username'
                placeholder='نام کاربری یا آدرس ایمیل'
                element='input'
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                  // emailValidator(),
                ]}
                onInputHandler={onInputHandler}
              />

              <i class='login-form__username-icon fa fa-user'></i>
            </div>
            <div class='login-form__password'>
              <Input
                className='login-form__password-input'
                type='text'
                id='password'
                placeholder='رمز عبور'
                element='input'
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
              />

              <i class='login-form__password-icon fa fa-lock-open'></i>
            </div>
            <div class='login-form__password'>
              <ReCAPTCHA
                sitekey='6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
                onChange={onChangeRecapchaHandler}
              />
              ,
            </div>
            <Button
              className={`login-form__btn ${formState.isFormValid
                ? "login-form__btn-success"
                : "login-form__btn-error"
                }`}
              type='submit'
              onClick={useLogin}
              disabled={!formState.isFormValid}>
              <i class='login-form__btn-icon fas fa-sign-out-alt'></i>
              <span class='login-form__btn-text'>ورود</span>
            </Button>
            <div className='login-form__password-setting'>
              <label class='login-form__password-remember'>
                <input class='login-form__password-checkbox' type='checkbox' />
                <span class='login-form__password-text'>
                  مرا به خاطر داشته باش
                </span>
              </label>
              <label class='login-form__password-forget'>
                <a class='login-form__password-forget-link' href='#'>
                  رمز عبور را فراموش کرده اید؟
                </a>
              </label>
            </div>
          </form>
          <div class='login__des'>
            <span class='login__des-title'>سلام کاربر محترم:</span>
            <ul class='login__des-list'>
              <li class='login__des-item'>
                لطفا از مرورگر های مطمئن و بروز مانند گوگل کروم و فایرفاکس
                استفاده کنید.
              </li>
              <li class='login__des-item'>
                ما هرگز اطلاعات محرمانه شمارا از طریق ایمیل درخواست نمیکنیم.
              </li>
              <li class='login__des-item'>
                لطفا کلمه عبور خود را در فواصل زمانی کوتاه تغییر دهید.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
