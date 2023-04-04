//getting necesaries DOM elements
const formContainer = document.querySelector('#formContainer');
const firstNext = document.querySelector('#next');
const topic = document.querySelector('#input1');
const invalidTopic = document.querySelector('#invalidTopic');

const formContainer2 = document.querySelector('#formContainer2');
const secondNext = document.querySelector('#next2');
const age = document.querySelector('#input2');
const invalidAge = document.querySelector('#invalidAge');

const formContainer3 = document.querySelector('#formContainer3');
const thirdNext = document.querySelector('#next3');
const degree = document.querySelector('#input3');
const invalidDegree = document.querySelector('#invalidDegree');

const formContainer4 = document.querySelector('#formContainer4');
const fourNext = document.querySelector('#next4');
const radios = document.getElementsByName('level');
Array.from(radios).forEach((value) =>{
  value.addEventListener('focus',() =>{
    value.checked = true;
  })
})
let levelInput;
let levelName;
const invalidLevel = document.querySelector('#invalidLevel');

const loadingSection = document.querySelector('#loading');

const errorSection = document.querySelector('#error');
const erorrMessage = document.querySelector('#errorMessage');
const tryAgain = document.querySelector('#tryAgain');

const resultSection = document.querySelector('#resultSection');
const result = document.querySelector('#result');
const inputResult = Array.from(document.querySelectorAll('.inputResult'));
const invalidResult = Array.from(document.querySelectorAll('.invalidResult'));
const newAnswer = document.querySelector('#new');
const loadResultIcon = document.querySelector('#loadResultIcon');
//animation's global variables
let toolactive = false;
let shakeButtonActive = false;

const copyTooltip = document.querySelector('#copy_tooltip');
const copybutton = document.querySelector('#copy');
copybutton.addEventListener('click', async ()=>{
  try {
    await navigator.clipboard.writeText(result.textContent)
    tooltipanimation(2000,100);
  } catch (error) {
    console.error('something went wrong!');
  }
})


//fucntion to hide the current section, and then show the next one with the current entry animation
function hideAndShow(hideElement, showElement){
  hideElement.classList.add('hidden');
  hideElement.classList.toggle('anima');

  showElement.classList.remove('hidden');
  showElement.classList.toggle('anima');
}

//this function allow me to handle request to the api in a easy way
async function fetchData(urlAPi) {
  const response = await fetch(urlAPi);
  const data = await response.json();
  return data;
}

//this function help me to create the api url to make the request
function getUrl(topic,age,degree,level){
  return `https://explainmethisbackend.onrender.com/?topic=${topic}&age=${age}&degree=${degree}&level=${level}`
}

// This tigger a typing animation
function typingAnimation(element){
  //to tigger the css animation, we need to add the class type
  // to the element to be animated, and we need to update the 
  // css variable with the number of characters that the text element
  // has
  element.classList.remove('type');
  element.offsetWidth;
  let root = document.documentElement;
  let characters = element.textContent.length;
  root.style.setProperty('--n', characters)
  element.classList.add('type');
}

// Function to tigger animation tooltip
function tooltipanimation(outTime,inTime){
  if (!toolactive){ 
    //toolactive variable ensure you cannot tigger the animation 
    //if anohter tooltip animation haven't fisinished yet
    toolactive = true;
    copyTooltip.classList.add('active');
    setTimeout(() =>{
    copyTooltip.classList.remove('active');

    //restart the animation
    copyTooltip.offsetWidth;

    copyTooltip.classList.add('inactive');
    setTimeout(() =>{
      copyTooltip.classList.remove('inactive');
      toolactive = false;
    },inTime)
  },outTime)
  }
}

function shakeButtonAnimation(time,button){
  if (!shakeButtonActive){ 
    //toolactive variable ensure you cannot tigger the animation 
    //if anohter tooltip animation haven't fisinished yet
    shakeButtonActive = true;
    button.classList.add('error');
    setTimeout(() =>{
      button.classList.remove('error');

      //restart the animation
      button.offsetWidth;
      shakeButtonActive = false;
  },time)
  }
}

function findlabelandset(labelText,value){
  
  const topicResult = inputResult.find((value) => Array.from(value.labels)[0].textContent == labelText);
  if (topicResult.tagName != "SELECT"){
    topicResult.value = value;
  }
  else{
    const option = Array.from(topicResult.options).find((item) => item.text == value.trim());
    option.selected = true;
  }
  

}
function isvalueValid(value){
  // this is a function that target text that is empty or has just white space using a regex expression
  return !(!/\S/.test(value))
}

//
async function loadResultSection(topic,age,degree,level){
  try {
    const response = await fetchData(getUrl(topic,age,degree,level));
    console.log('hol')
    // remove all the unnecesary break lines
    const answer = response.choices[0].text.replace(/(\r\n|\n|\r)/gm, "");
    result.innerText = answer;
    console.log(answer)
    
  } catch (error) {
    throw new Error(error);
  }
}

function invalidInputState(input, errorElement){
  errorElement?.classList.remove('invisible');
  input.classList.add('invalidClass');
  // shakeButtonAnimation(200,firstNext);
  //This addeventlistener tigger the invalid state if the user still witout fullfil the requements
  input.addEventListener('input', ()=>{
    if (isvalueValid(input.value) && input.checkValidity()){
      errorElement?.classList.add('invisible');
      input.classList.remove('invalidClass');
    } 
    else{
      errorElement?.classList.remove('invisible');
      input.classList.add('invalidClass');
    }
  })
}



//All the events of the "next" botton in every screen

firstNext.addEventListener('click',(e) =>{
  e.preventDefault();

  if (isvalueValid(topic.value)){
    hideAndShow(formContainer,formContainer2);
    //finding the input relate to topic in the result section and set the value of this input's screeen to it
    findlabelandset('Topic',topic.value);
  }else{
    invalidInputState(topic,invalidTopic);
    shakeButtonAnimation(200,firstNext);
  }
})

secondNext.addEventListener('click',(e) =>{
  e.preventDefault();

  //this botton it's kinda special 'cause the function 


  //checkvalidity check that the input match with just numbers (pattern attribute at html)
  if (age.checkValidity() && isvalueValid(age.value)){
    hideAndShow(formContainer2,formContainer3);
    findlabelandset('Age',age.value);
  }else{
    invalidInputState(age,invalidAge);
    shakeButtonAnimation(200,secondNext);
    // shakeButtonAnimation(200,secondNext);
    // invalidAge.classList.remove('invisible');
    // age.classList.add('invalidClass');
    // age.addEventListener('input',()=>{
    //   console.log(age.value)
    //   if (age.value === ""){
    //     invalidAge.classList.remove('invisible');
    //     age.classList.add('invalidClass');
    //   }
    //   if(age.checkValidity() && age.value !==""){
    //     console.log('here')
    //     invalidAge.classList.add('invisible');
    //     age.classList.remove('invalidClass');
    //   }
    // })
  }
})

thirdNext.addEventListener('click', (e) =>{ 
  e.preventDefault(); 
  if (isvalueValid(degree.value)){
    hideAndShow(formContainer3,formContainer4);
    findlabelandset('Degree',degree.value)
  }else{
    invalidInputState(degree,invalidDegree);
    shakeButtonAnimation(200,firstNext);
  }
})

//in the last next event, afther confirm the radio input, we tiggerd the api call to OpenAI
fourNext.addEventListener('click', (e) =>{ 
  e.preventDefault();
  //finding the input that has been checked
  levelInput = Array.from(radios).find(radio => radio.checked) || null;
  //if input === null the users doesn't select anything to i tigger 
  if (levelInput === null){
    shakeButtonAnimation(200,fourNext);
    invalidLevel.classList.remove('invisible');
    Array.from(radios).forEach((value)=>{
      value.addEventListener('change',()=>{
        invalidLevel.classList.add('invisible');
      })
    })
    return;
  }

  // getting the label relate to the input (there's just one so it would always be the 0 index)
  levelName = levelInput?.labels?.item(0).textContent.trim();
  // console.log(levelName)
  findlabelandset('Level',levelName);
  hideAndShow(formContainer4,loadingSection);
  
  (async () => {
    try {
      await loadResultSection(topic.value,age.value,degree.value,levelName);
      typingAnimation(result);
      hideAndShow(loadingSection,resultSection);
    } catch (error) {
      erorrMessage.innerText = error;
      hideAndShow(loadingSection,errorSection);
    }
    
    
  })();
})

tryAgain.addEventListener('click', async ()=>{
  try {
    hideAndShow(errorSection,loadingSection);
    await loadResultSection(topic.value,age.value,degree.value,levelName);
    typingAnimation(result);
    hideAndShow(loadingSection,resultSection);
  } catch (error) {
    erorrMessage.innerText = error;
    hideAndShow(loadingSection,errorSection);
  }
})

inputResult.forEach((value) =>{
  value.addEventListener('input', () => {
      newAnswer.disabled = false;
      
  })
})

newAnswer.addEventListener('click',async ()=>{
  try{
    //find if there's an input with an invalid value
    const someinvalid = inputResult.some((item) =>{
      if(!(item.checkValidity() && isvalueValid(item.value)) && item.tagName !=="SELECT"){
        return true;
      }
    })
    //if there's one of the inputs wrong, look for the rest that could be wrong
    //and apply to each of them the invalid states to say the user that he needs to change something,
    //after that, return to not continue with the event.
    if (someinvalid){ 
      inputResult.forEach((item,index) =>{
        if(!(item.checkValidity() && isvalueValid(item.value)) && item.tagName !=="SELECT"){
          console.log(invalidResult[index])
          invalidInputState(item,invalidResult[index]);
          shakeButtonAnimation(200,newAnswer);
        }
      })
      return;
    }
    loadResultIcon.classList.remove('hidden');
    inputResult.forEach((item,index) =>{
      item.disabled = true;
    });

    (async () => {
      try {
        const resultInputvalues = inputResult.map(item => item.value);
        await loadResultSection(...resultInputvalues);
        loadResultIcon.classList.add('hidden');
        inputResult.forEach((item,index) =>{
          item.disabled = false;
        });
        newAnswer.disabled = true;
        typingAnimation(result);
        
      } catch (error) {
        console.error(error)
        erorrMessage.innerText = error;
        hideAndShow(resultSection,errorSection);
      }
    })();
  }
   catch (error) {
    console.error(error)
  }
})