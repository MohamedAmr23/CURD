let products=[]
getData()
function getData(){
    fetch('http://localhost:2000/products/')
    .then((response)=>response.json())
    .then((ResponseData)=>{
        if(ResponseData.message==='success'){
            products=ResponseData.data
            showData()
        }
        // console.log(products)
    })
    
}

function showData(){
    var cartona=``
    for(let index=0;index<products.length;index++){
        cartona+=`
             <tr>
                    <td>${products[index].name}</td>
                    <td>${products[index].price}</td>
                    <td>${products[index].describtion}</td>
                    <td>
                        <button onclick="deleteProduct(${products[index].id})" class="btn btn-danger">Delete</button>
                        <button onclick="updateProduct(${products[index].id})" class="btn btn-success">Update</button>
                    </td>
                </tr>
        `
    }
    document.getElementById('tbody').innerHTML=cartona
}

function getInputValue(){
    let productName=document.getElementById('productName').value
    let productPrice=document.getElementById('productPrice').value
    let productDesc=document.getElementById('productDesc').value

    let productObj={
        name:productName,
        price:productPrice,
        description:productDesc,
    }
    ApiCURD("POST",productObj)
}

function ApiCURD(endPoint,body){
    
    fetch('http://localhost:2000/products/',{
        method: endPoint, 
        body: JSON.stringify(body),
        headers: { 
            "Content-type": "application/json; charset=UTF-8"
        } 
    })
    .then(response => response.json()) 
    .then((data)=>{
        if(data.message=='success'){
            getData()
        }
    })
}

function deleteProduct(id){
    ApiCURD("DELETE",{id})
}

function updateProduct(id) {
   
    let productToUpdate = products.find(product => product.id === id);

 
    document.getElementById('productName').value = productToUpdate.name;
    document.getElementById('productPrice').value = productToUpdate.price;
    document.getElementById('productDesc').value = productToUpdate.description;

   
    document.getElementById('saveButton').style.display = 'inline-block';
    document.getElementById('add').style.display = 'none';

 
    document.getElementById('saveButton').setAttribute("onclick", `saveUpdate(${id})`);
}

function saveUpdate(id) {
   
    let updatedName = document.getElementById('productName').value;
    let updatedPrice = document.getElementById('productPrice').value;
    let updatedDesc = document.getElementById('productDesc').value;


    let updatedProduct = {
        id: id,
        name: updatedName,
        price: updatedPrice,
        description: updatedDesc
    };


    ApiCURD("PUT", updatedProduct);


    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productDesc').value = '';

    document.getElementById('saveButton').style.display = 'none';
    document.getElementById('add').style.display = 'inline-block';
}
