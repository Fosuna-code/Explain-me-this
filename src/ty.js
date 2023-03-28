let toolactive = false;
const inputResult = Array.from(document.querySelectorAll('.inputResult'))
const newAnswer = document.querySelector('#new');
console.log(inputResult)
// newAnswer.disabled = false;
inputResult.forEach((value,index) =>{
    value.addEventListener('input', () => {
        newAnswer.disabled = false;
    })
})

function tooltipanimation(outTime,inTime){
  if (!toolactive){
    toolactive = true;
    console.log(toolactive)
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

const copyTooltip = document.querySelector('#copy_tooltip');
const copybutton = document.querySelector('#copy');
copybutton.addEventListener('click', async ()=>{
  try {
    await navigator.clipboard.writeText(result.textContent)
    tooltipanimation(2000,100);
  } catch (error) {
    console.error(error);
  }
})

