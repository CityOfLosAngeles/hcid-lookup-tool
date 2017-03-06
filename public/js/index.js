$(document).ready(()=>{
    console.log('ready');

  $('#fileSubmit').submit((event)=>{
      event.preventDefault();
      let file = $('#file').fileTransfer.files[0];
     console.log(file)
    
  })
})