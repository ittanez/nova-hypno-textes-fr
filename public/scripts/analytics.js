// Google Analytics optimisé (différé 8s)
setTimeout(function(){
  const s=document.createElement('script');
  s.src='https://www.googletagmanager.com/gtag/js?id=G-5W9ZQEJKLF';
  s.async=true;
  document.head.appendChild(s);
  s.onload=function(){
    window.dataLayer=window.dataLayer||[];
    function gtag(){dataLayer.push(arguments);}
    gtag('js',new Date());gtag('config','G-5W9ZQEJKLF');
  };
},8000);
