import React from "react";
import { Link, json } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import MainHeader from "../../Components/MainHeader/MainHeader";
import Topbar from "../../Components/Topbar/Topbar";
import Input from "../../Components/Form/Input/Input";
import Button from "../../Components/Form/Buuton/Button";
import { useForm } from "../../hooks/useForm";
import {
  requiredValidator,
  minValidator,
  maxValidator,
  emailValidator,
  phoneNumberValidator,
} from "../../Validator/rules";

import "./Register.css";

export default function Register() {
  const [formState, onInputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      username: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
    },
    false,
  );

  const useRegister = (event) => {
    event.preventDefault();
    let newUser = {
      username: formState.inputs.username.value,
      email: formState.inputs.email.value,
      password: formState.inputs.password.value,
      confirmPassword: formState.inputs.password.value,
      name: formState.inputs.name.value,
      phone: formState.inputs.phone.value,
    };
    console.log(JSON.stringify(newUser));
    fetch("http://localhost:4000/v1/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  };

  return (
    <>
      <Topbar />
      <MainHeader />

      <section class='login-register'>
        <div class='login register-form'>
          <span class='login__title'>ساخت حساب کاربری</span>
          <span class='login__subtitle'>خوشحالیم قراره به جمع ما بپیوندی</span>
          <div class='login__new-member'>
            <span class='login__new-member-text'>قبلا ثبت‌نام کرده‌اید؟ </span>
            <Link class='login__new-member-link' to='/login'>
              وارد شوید
            </Link>
          </div>
          <form action='#' class='login-form'>
            <div class='login-form__username'>
              <Input
                className='login-form__username-input'
                type='text'
                id='name'
                placeholder='نام و نام خانوادگی'
                element='input'
                validations={[
                  requiredValidator(),
                  minValidator(6),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
              />

              <i class='login-form__username-icon fa fa-user'></i>
            </div>
            <div class='login-form__username'>
              <Input
                className='login-form__username-input'
                type='text'
                id='username'
                placeholder='نام کاربری'
                element='input'
                validations={[
                  requiredValidator(),
                  minValidator(6),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
              />

              <i class='login-form__username-icon fa fa-user'></i>
            </div>
            <div class='login-form__password'>
              <Input
                className='login-form__password-input'
                type='email'
                id='email'
                placeholder='آدرس ایمیل'
                element='input'
                validations={[requiredValidator(), emailValidator()]}
                onInputHandler={onInputHandler}
              />

              <i class='login-form__password-icon fa fa-envelope'></i>
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
              <Input
                className='login-form__password-input'
                type='text'
                id='phone'
                placeholder='شماره تلفن'
                element='input'
                validations={[
                  requiredValidator(),
                  phoneNumberValidator(),
                  minValidator(11),
                ]}
                onInputHandler={onInputHandler}
              />

              <i class='login-form__password-icon fa fa-phone'></i>
            </div>
            <Button
              className={`login-form__btn ${
                formState.isFormValid
                  ? "login-form__btn-success"
                  : "login-form__btn-error"
              }`}
              type='submit'
              onClick={useRegister}
              disabled={!formState.isFormValid}>
              <i class='login-form__btn-icon fas fa-sign-out-alt'></i>
              <span class='login-form__btn-text'>ورود</span>
            </Button>
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
