const loadPhone =async (searchText = 'a', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll)
}

const displayPhones = (phones, isShowAll) =>{
    // console.log(phones);
    //1.
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    // show all
    const showAllBtn =document.getElementById('show-all');
    if(phones.length > 12 && !isShowAll){
        showAllBtn.classList.remove('hidden')
    }else{
        showAllBtn.classList.add('hidden')
    }
    // console.log('is show all', isShowAll);
    // Display only first 12 items if not show all
   if(!isShowAll){
    phones = phones.slice(0,12);
   }
     
    phones.forEach(phone => {
        // console.log(phone);
        
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
                    <button onclick="handleShowDetail('${phone.slug}'); show_details_modal.showModal()" class="btn btn-primary">Show Details</button>
                  </div>
                </div>
        
        `;
        //Append child
        phoneContainer.appendChild(phoneCard);
    });
    // hide loading spinner
    toggleLoadingSpinner(false)
}

// 
const handleShowDetail =async (id) => {
// console.log('handle show click' , id);
const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
const data = await res.json();
const phone = data.data;
showPhoneDetails(phone);
}

const showPhoneDetails = (phone) => {
    console.log(phone);
    const showDetiailsContainer = document.getElementById('show_details_container');
    showDetiailsContainer.innerHTML = `
   <div class="space-y-1">
   <img class="rounded-xl mx-auto mb-3" src="${phone.image}" alt="">
   <p class="font-bold text-2xl text-blue-600"> Name: ${phone.name}</p>
   <p class="font-bold text-lg"> <span>Brand: ${phone.brand} </span></p>
   <p class="font-bold text-sm"> <span>Storage: ${phone.mainFeatures.storage} </span></p>
   <p class="font-bold text-sm"> <span>ChipSet: ${phone.mainFeatures.chipSet} </span></p>
   <p class="font-bold text-sm"> <span>Sensors: ${phone?.mainFeatures?.sensors} </span></p>
   <p class="font-bold text-sm">display: <span> ${phone.mainFeatures.displaySize} </span></p>
   <p class="font-bold text-sm">GPS: <span> ${phone?.others?.GPS || 'No GPS'} </span></p>
   </div>
    
    
    `;
    // show the modal
    show_details_modal.showModal()
}

// Handle search button
const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true)
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value ;
    //  searchField.value = ' ';
    loadPhone(searchText, isShowAll);
   
    
}
document.getElementById('search-field').addEventListener('keypress', function(event){
    if(event.key === 'Enter'){
        event.preventDefault();
        document.getElementById('searchBtn').click()
    }
})

// loadPhone(searchText)

// spinner
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden')
    }else{
        loadingSpinner.classList.add('hidden')
    }
}

// handle show all 
const handleShowAll = () => {
    handleSearch(true);
}

loadPhone()