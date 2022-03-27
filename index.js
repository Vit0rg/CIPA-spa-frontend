const body = document.querySelector("body");
const fx = document.querySelectorAll(".fx");
const section = document.querySelectorAll("main section");
const theme = document.querySelector(".fx span");
const h1 = document.querySelector("main h1");
const section_options = document.querySelectorAll(".section_options");
const section_items = document.querySelectorAll(".section_items li");
let show_all = true;

/*Event Listeners*/
//Trocar tema:
fx[0].addEventListener("click", change_theme);
//Sidebar responsiva:
if(window.innerWidth > 959)
{
  fx.forEach(element => 
  {
    element.addEventListener("mouseenter", expand_li);
    element.parentNode.addEventListener("mouseleave", collapse_li);
  });
}
//Seleção de página(section):
for( i = 0; i<5; i++)
{
  fx[i+1].addEventListener("click", change_main);
}
//Menu section:
section_options.forEach(section_option => 
{
  Array.from(section_option.children).forEach(option => 
  {
    if (option == section_option.children[0])
    {
      option.addEventListener("click", function()
      {
        show_messages(section_option.parentNode.children[1].children,
                      "all");
      });
      return;
    }
    
    option.addEventListener("click", function()
    {
      show_messages(section_option.parentNode.children[1].children,
                    option.classList[0]);
    });
    
  });
});
//Itens section:
section_items.forEach(item => 
{
  item.children[0].addEventListener("click", li_to_card);
});

/*Functions*/
function change_theme()
{
  body.classList.toggle("invert");
  this.children[0].classList.toggle("bxs-sun");
  this.children[0].classList.toggle("bxs-moon");
  theme.innerText === "Dia"? theme.innerText = "Noite" : theme.innerText = "Dia";
}

function expand_li()
{
  this.parentNode.parentNode.classList.add("expand-li");
}

function collapse_li()
{
  fx.forEach(element => 
  {
    element.parentNode.parentNode.classList.remove("expand-li");
  });
}

function change_main()
{
  //console.log(this.classList.item(1));
  section.forEach(element => 
  {
    if(element.classList.contains(this.classList.item(1)))
    {
      element.classList.remove("hidden");
      h1.innerText = this.classList.item(1);
      return;
    } 
    element.classList.add("hidden");
  });

  if (this.classList.item(1) == "irregular")
  {
    h1.innerText = "Entrada/Saída irregular";
  }
}

function show_messages(lista, tipo)
{
  if(tipo == "all")
  {
    show_all = true;
    Array.from(lista).forEach(element => 
    {
      element.classList.remove("li_to_card"); 
      element.children[0].classList.remove("hidden");
      element.children[1].children[0].classList.add("hidden");
      element.classList.remove("hidden");  
    });
    return;
  }

  Array.from(lista).forEach(element => 
  {
    show_all = false;
    element.classList.remove("li_to_card");
    element.children[0].classList.remove("hidden");
    element.children[1].children[0].classList.add("hidden");
    element.classList.contains(tipo)? 
    element.classList.remove("hidden")
    :
    element.classList.add("hidden");
  });
}

function li_to_card()
{
  Array.from(this.parentNode.parentNode.children).forEach(element => 
  {
    if(element == this.parentNode)
    {
      element.classList.add("li_to_card");
      element.children[0].classList.add("hidden");
      //Reveal close button:
      element.children[1].children[0].classList.remove("hidden");
      element.children[1].children[0].addEventListener("click", close_card);
      return;
    }
    element.classList.add("hidden");
  });
}

function close_card()
{ 
  show_all == true?
  show_messages(this.parentNode.parentNode.parentNode.children, "all")
  :
  show_messages(this.parentNode.parentNode.parentNode.children, this.parentNode.parentNode.classList[0]);
  
}
