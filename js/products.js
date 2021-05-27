let productCount = document.querySelector('#productCount');
let table = document.querySelector("#productList");
const url = "https://vue3-course-api.hexschool.io/";
const path = "jasmin";
const app = {
  data: {
    products: [],
  },
  getData() { 
    axios.get(`${url}api/${path}/admin/products`)
    .then((res) => {
      this.data.products = res.data.products;
        this.render();
    });
  },
  render() {
    console.log(this);
    let productNum = 0;
    let str = "";
    this.data.products.forEach((item)=> {
      productNum++;
      str += `
        <tr>
        <td>${item.title}</td>
        <td width="120">${item.origin_price}</td>
        <td width="120">${item.price}</td>
        <td width="100">
          <span class="${item.is_enabled ? 'text-success' : 'text-secondary'}">
            ${item.is_enabled ? '啟用' : '未啟用'}</span>
        </td>
        <td width="120">
          <button type="button" class="btn btn-sm btn-outline-danger move deleteBtn" 
          data-action="remove" data-id="${item.id}">刪除</button>
        </td>
        </tr>
          `;
    })
    table.innerHTML = str;
    productCount.innerHTML = productNum;
    const deleteBtn = document.querySelectorAll('.deleteBtn');
    deleteBtn.forEach((btn)=>{
      btn.addEventListener('click',this.deleteProducts);
    })
  },
  deleteProducts(evt) {
    const id = evt.target.dataset.id;
    axios.delete(`${url}api/${path}/admin/product/${id}`)
    .then((rep)=> {
      console.log(id);
      console.log(rep);
      app.getData();
    });
  },
  init() {
    // 取出 Cookie
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;
    this.getData();
  }
}
app.init();

