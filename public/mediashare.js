const shareButton = document.getElementById('share-button')
const shareDialog = document.getElementById('share-dialog');
const closeButton = document.getElementById('close-button');
const copyButton = document.getElementById('copy-link');
shareButton.addEventListener('click', event => {
    console.log(shareButton)
  if (navigator.share) { 
   navigator.share({
      title: 'WebShare API Demo',
      url: 'https://codepen.io/ayoisaiah/pen/YbNazJ'
    }).then(() => {
      console.log('Thanks for sharing!');
    })
    .catch(console.error);
    } else {
        shareDialog.classList.add('is-open');
        console.log('Thanks for sharing!');
        
    }
});

closeButton.addEventListener('click', event => {
  shareDialog.classList.remove('is-open');
});

copyButton.addEventListener('click', function(event) {  
    var emailLink = document.getElementById('link') 
    console.log(emailLink) 
    var range = document.createRange();  
    range.selectNode(emailLink);  
    window.getSelection().addRange(range);  
  
    try {  
      // Now that we've selected the anchor text, execute the copy command  
      var successful = document.execCommand('copy');  
      var msg = successful ? 'successful' : 'unsuccessful';  
      console.log('Copy email command was ' + msg);  
    } catch(err) {  
      console.log('Oops, unable to copy');  
    }  
  
    // Remove the selections - NOTE: Should use
    // removeRange(range) when it is supported  
    window.getSelection().removeAllRanges();  
  });



// https://codepen.io/ayoisaiah/pen/YbNaz