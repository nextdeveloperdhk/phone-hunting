const loadPhone =async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones)
}

const displayPhones = phones =>{
    console.log(phones);
    //1.
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = ' ';
    // show all
    const showAll =document.getElementById('show-all');
    if(phones.length > 12){
        showAll.classList.remove('hidden')
    }else{
        showAll.classList.add('hidden')
    }

    phones = phones.slice(0,12);
     
    phones.forEach(phone => {
        console.log(phone);
        
        //2. create a div
        const phoneCard = document.createElement('div');
        // phoneCard.classList.add('card w-96 bg-grey-100 shadow-xl');
        phoneCard.classList = `card  bg-grey-100 shadow-md`;
       
        //3.Set inner HTML
        phoneCard.innerHTML = `
        <figure class="px-10 pt-10">
                  <img src="${phone.image}" alt="phone" class="rounded-xl" />
                </figure>
                <div class="card-body items-center text-center">
                  <h2 class="card-title">${phone.phone_name}</h2>
                  <p>Brand: ${phone.brand}</p>
                  <div class="card-actions">
                    <button class="btn btn-primary">Buy Now</button>
                  </div>
                </div>
        
        `;
        //Append child
        phoneContainer.appendChild(phoneCard)
    })
}

// Handle search button
const handleSearch = () =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value ;
     searchField.value = ' ';
    loadPhone(searchText);
   
    
}
document.getElementById('search-field').addEventListener('keypress', function(event){
    if(event.key === 'Enter'){
        event.preventDefault();
        document.getElementById('searchBtn').click()
    }
})

// loadPhone(searchText)