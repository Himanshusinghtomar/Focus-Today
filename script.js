const checkBoxList = document.querySelectorAll('.check-box')
const inputBox = document.querySelectorAll('.goal-inp')
const errorLabel = document.querySelector('.error-label')
const progressBar = document.querySelector('.progress-bar')
const progressValue = document.querySelector('.progress-value')
const progressLabel = document.querySelector('.progress-label')


const allQuotes = [
    'Raise the bar ,by completing your goals!',
    'Well begun is half done!',
    'Jst a step away, keep going!',
    'whoa! You just completed all the goals, time for chill :) '
]

const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {
    first:{
        name: '',
        completed: false
    },
    second:{
        name: '',
        completed: false
    },
    third:{
        name: '',
        completed: false
    }
}

let completedGoalsCount = Object.values(allGoals).filter((goal) => goal.complete).length
progressValue.style.width = `${completedGoalsCount / 3*100}%`
progressValue.firstElementChild.innerHTML = `${completedGoalsCount}/3 Completed`
progressLabel.innerText = allQuotes[completedGoalsCount]

checkBoxList.forEach((checkbox) => {
    checkbox.addEventListener('click',(e) => {

        const inputValueCheck = [...inputBox].every((e) => {
            return e.value 
        })

        if(inputValueCheck)
        {
            checkbox.parentElement.classList.toggle('completed')
            // progressValue.style.width = '33%'
            const inputId = checkbox.nextElementSibling.id
            allGoals[inputId].complete = !allGoals[inputId].complete
            completedGoalsCount = Object.values(allGoals).filter((goal) => goal.complete).length
            progressValue.style.width = `${completedGoalsCount / 3*100}%`
            progressValue.firstElementChild.innerHTML = `${completedGoalsCount}/3 Completed`
            progressLabel.innerText = allQuotes[completedGoalsCount]
            localStorage.setItem('allGoals',JSON.stringify(allGoals))
        }
        else
        {
            progressBar.classList.add('show-error')
        }
        
     })
})

inputBox.forEach((input) => {

    input.value = allGoals[input.id].name
    

    if(allGoals[input.id].complete)
    {
        input.parentElement.classList.add('completed')
    }

    input.addEventListener(('focus') , () => {
        progressBar.classList.remove('show-error')
    })

    input.addEventListener('input',(e) =>{
        if(allGoals[input.id].complete)
        {
            input.value = allGoals[input.id].name
            return
        }
        
        allGoals[input.id] = {
            name : input.value,
            completed: false, 
        }
        
        localStorage.setItem('allGoals',JSON.stringify(allGoals))
    })
})
