console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();
  // Ready to Transfer click listener
  $('#viewKoalas').on('click', '.transfer', handleTransferClick)
}); // end doc ready

function handleTransferClick(){
  readyToTransfer($(this).data('id'), 'N');
}

function readyToTransfer(koalaId, yesOrNo){
  $.ajax({
    method: "PUT",
    url: `/koalas/${koalaId}`,
    data: {
      ready_to_transfer: `${yesOrNo}`
    }
  })
  .then(response => {
    console.log('Ready for transfer');
    getKoalas();
  })
  .catch(err => {
    console.log(err);
  });
}

function setupClickListeners() {
  $('#viewKoalas').on('click', '.deleteBtn', deleteKoalaHandler);

  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // input validation -- could make required field background to red via jquery toggle class
    if ($('#nameIn').val() == '' || $('#ageIn').val() == '' || 
    $('#genderIn').val() == '' || $('#readyForTransferIn').val() == '' ) {
      alert('Please fill in all required information');
      return;
    }

    let koalaToSend = {
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      gender: $('#genderIn').val(),
      readyForTransfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val(),
    };
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );
  }); 
}

function deleteKoalaHandler() {
  deleteKoala($(this).data("id"))
}

function deleteKoala(koalaId) {
  $.ajax({
    method: 'DELETE',
    url: `/koalas/${koalaId}`
  }).then(response => {
    console.log(`deleted koala with id of ${koalaId}`);
    getKoalas();
  }).catch(err => {
    alert('there was a problem deleting that koala, try again', err);
  });
}//end deleteKoala

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
    $.ajax({
        method: 'GET',
        url: '/koalas'
    }).then(function (response) {
      console.log(response);
      renderKoalas(response);
    }).catch(function(error) {
      console.log('error in GET on client.js', error);
    });  
} // end getKoalas

function renderKoalas(koalas) {
  $('#viewKoalas').empty();

  for(let i = 0; i < koalas.length; i++) {
    let koala = koalas[i];
    console.log('in render koalas', koala);

    //for each koala, append a new row to table
    if (koala.ready_to_transfer === 'N'){
    $('#viewKoalas').append(`
    <tr>
      <td>${koala.name}</td>
      <td>${koala.age}</td>
      <td>${koala.gender}</td>
      <td>${koala.ready_to_transfer}</td>
      <td>${koala.notes}</td>
      <td><button class="deleteBtn btn btn-danger" data-id="${koala.id}">Delete</button></td>
      <td><button class="transfer btn btn-info" data-id="${koala.id}">Ready for Transfer</button></td>
    </tr>
    `)}else{
      $('#viewKoalas').append(`
      <tr>
        <td>${koala.name}</td>
        <td>${koala.age}</td>
        <td>${koala.gender}</td>
        <td>${koala.ready_to_transfer}</td>
        <td>${koala.notes}</td>
        <td><button class="deleteBtn btn btn-danger" data-id="${koala.id}">Delete</button></td>
      </tr>
    `)
    }
  }
}//end renderDOM

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
 
  $.ajax({
    type: 'POST',
    url: '/koalas',
    data: newKoala,
}).then( function (response) {
  $('#nameIn').val('');
  $('#ageIn').val('');
  $('#genderIn').val('');
  $('#readyForTransferIn').val('');
  $('#notesIn').val('');
  getKoalas();

});


}
