import React from 'react'
import "./Contact.css"
import Footer from "../../Components/Footer/Footer";
import MainHeader from "../../Components/MainHeader/MainHeader";
import TopBar from "../../Components/TopBar/TopBar";
import Input from "../../Components/Form/Input/Input";
import Button from "../../Components/Form/Buuton/Button";
import { useForm } from "../../hooks/useForm";
import swal from "sweetalert";
import { useNavigate } from 'react-router';
import {
  requiredValidator,
  minValidator,
  maxValidator,
  emailValidator,
  phoneNumberValidator,
} from "../../Validator/rules";
export default function Contact() {
  const navigate = useNavigate();

    const [formState, onInputHandler] = useForm(
        {
          name: {
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
          textarea: {
            value: "",
            isValid: false,
          },
        },
        false,
      );
      const onContactHandler = (event) => {
        event.preventDefault()
        const newContact = {
          name: formState.inputs.name.value, 
          email: formState.inputs.email.value,
          phone: formState.inputs.phone.value, 
          body: formState.inputs.textarea.value,
        }
        fetch("http://localhost:4000/v1/contact" , {
          method: "POST" ,
          headers : { "Content-Type" : "application/json"}
          , body : JSON.stringify(newContact)
        })
        .then(res => {
          res.json()
          console.log(res);
          if(res.ok){
            swal({
              title: "پیام شما با موفقیت به مدیران سایت ارسال شد",
              icon: "success",
              button: " حله منو ببر به صفحه اصلی",
            }).then((value) => {
              navigate("/");
            });
          }
        })
      }
  return (
    <>
    <TopBar />
    <MainHeader />
    <section class='login-register'>
        <div class='login register-form'>
          <span class='login__title'>ثبت نظرات</span>
          <span class='login__subtitle'>خوشحالیم قراره که با نظرت به ما کمک کنی</span>
          
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
            <div class='login-form__password'>
              <Input
                className='login-form__password-input'
                type='text'
                id='textarea'
                placeholder="لطفا نظر خود را در اینجا وارد کنید"
                element='textarea'
                validations={[
                  requiredValidator(),
                  minValidator(11),
                ]}
                onInputHandler={onInputHandler}
              />

              <i class='login-form__password-icon fa fa-envelope-open'></i>
            </div>
            <Button
              className={`login-form__btn ${
                formState.isFormValid
                  ? "login-form__btn-success"
                  : "login-form__btn-error"
              }`}
              type='submit'
              onClick={event => onContactHandler(event)}
              disabled={!formState.isFormValid}>
              <i class='login-form__btn-icon fas fa-sign-out-alt'></i>
              <span class='login-form__btn-text'> ثبت نظر</span>
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
  )
}
