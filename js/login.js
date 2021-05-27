const username = document.querySelector('#username');
const password = document.querySelector('#password');
const form = document.querySelector('#form');

const url = 'https://vue3-course-api.hexschool.io/'; // 請加入站點
const path = 'jasmin'; // 請加入個人 API Path path=/


function onSubmit(event) {
    event.preventDefault();
    const user = {
        username:username.value,
        password:password.value
    }
    axios.post(`${url}admin/signin`,user).then((res) => {
        console.log(res);
      if(res.data.success){
          console.log(res.data.success)
        const token = res.data.token;
        const expired = res.data.expired;
        document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`;
        window.location = 'products.html';  //登入成功就跳轉頁面
      } else {
        alert(res.data.message);  //錯誤就跳提示訊息
      }
    }).catch((error) => {
      console.log(error);
    });

      // 以下為示範程式碼
  // const api = 'http://localhost:3000/admin/signin';
  // const user = {
  //   username: username.value,
  //   password: password.value,
  // }
  // axios.post(api, user).then((response) => {
  //   if(response.data.success){
  //     const { token, expired } = response.data;
  //     // 寫入 cookie token
  //     // expires 設置有效時間
  //     window.location = 'products.html';
  //   } else {
  //     alert(response.data.message);
  //   }
  // }).catch((error) => {
  //   console.log(error);
  // });
}
form.addEventListener('submit', onSubmit)